import Nav from "./Nav";
import Placeholder from "../images/Placeholder.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { useRef, useState, useEffect } from "react";
import { db, storage } from "../firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, deleteDoc } from "firebase/firestore"

function AdminUserSettings () {

    const [ showtable, setShowTable ] = useState(false);
    const [ products, setProducts ] = useState([]);

    const { user, role } = useAuth();

    const profilePicRef = useRef(null);
    const [profilePic, setProfilePic] = useState(Placeholder);

    useEffect (() => {
        if (user?.photoURL) {
            setProfilePic(user.photoURL);
        }
    }, [user]);

   
    async function fetchProducts () {
        try {
            const querySnapshot = await getDocs(collection(db, "products"));

            const items = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setProducts(items);
        }
        catch(error){
            console.error(`Greška pri dohvaćanju proizvoda: ${error}`);
        }
    }

    useEffect (() => {
        if (role === "admin") {
            fetchProducts();       
        }
    }, [role])

    async function profilePicChange(e) {
        const file = e.target.files[0];
        if (!file || !user) return;

        const imageUrl = URL.createObjectURL(file);
        setProfilePic(imageUrl);

        

        try {
            const storageRef = ref(storage,`profilePictures/${user.uid}`);

            await uploadBytes(storageRef, file);

            const downloadURL = await getDownloadURL(storageRef);

            setProfilePic(downloadURL);

            const userDocRef = doc(db, "users", user.uid);
            await updateDoc (userDocRef, {photoURL: downloadURL});

            await updateProfile(user, {photoURL: downloadURL });

            console.log("Profilna slika promjenjena:", downloadURL);
        }
        catch (error) {
            console.error(`Greska ${error} kod uploada.`)
        }
            
    }

    async function handleDelete (productId) {

        const confirmDelete = window.confirm("Jeste li sigurni da zelite obrisati proizvod?");
        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(db, "products", productId));

            setProducts([]);
            fetchProducts();
        }

        catch(error) {
            console.error(`Doslo je do greske kod brisanja: ${error}`);
        }
    }

    return (
        <div>
            <header>
             <Nav />
             </header>
             <div className="ad-us-box">
                <div className="ad-us-box-wrap">
                    <img src={profilePic} className="user-profile-img" alt="Profilna slika"></img>
                    <ul className="user-sett">
                        <li className="user-nm">Korisnik</li>
                        <li><Link to="#" onClick={() => profilePicRef.current.click()}>Promjenite sliku</Link></li>
                        <li><Link to="/changepass">Promjenite lozinku</Link></li>
                    </ul>
                    <input type="file" accept="image/*" style={{display:"none"}} ref={profilePicRef} onChange={profilePicChange}></input>
                </div>
                <hr className="admin-split"/>
                {role === "admin" && (
                    <>
                    <h3 className="admin-nm">Admin opcije</h3>
                    <ul className="admin-sett">
                        <li><Link to="/adminaddproduct">Dodajte proizvod</Link></li>
                        <li><button onClick={() => setShowTable(prev => !prev)}>Prikaz proizvoda</button></li>
                    </ul>
                    </>
                )}
            </div>
            <div className={`table-win ${showtable ? "" : "hide-table"}`}>
                <table className={`product-table`}>
                    <thead>
                        <tr>
                            <td>Brand</td>
                            <td>Ime</td>
                            <td>Model</td>
                            <td>Snaga (kW)</td>
                            <td>Tip</td>
                            <td>Cijena</td>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.brand}</td>
                                <td>{product.ime}</td>
                                <td>{product.model}</td>
                                <td>{product.snaga_kW}</td>
                                <td>{product.tip}</td>
                                <td>{product.cijena} €</td>
                                <td><button onClick={() => handleDelete(product.id)}>Ukloni</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminUserSettings;