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
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ itemsPerPage, setItemsPerPage ] = useState(8);
    const [ searchTerm, setSearchTerm ] = useState("");
    const [ editOpen, setEditOpen ] = useState(false);
    const [ editProduct, setEditProduct ] = useState(null); 

    const { user, role } = useAuth();

    const profilePicRef = useRef(null);
    const [profilePic, setProfilePic] = useState(Placeholder);

    const[ selectedBrand, setSelectedBrand ] = useState ("all");
    const brandList = ["all", ...new Set(products.map(p => p.brand).filter(Boolean))];
    const filteredProducts = selectedBrand === "all" ? products : products.filter(p => p.brand === selectedBrand);

    const normalized = searchTerm.trim().toLowerCase();

    const searchedProducts = !normalized ? filteredProducts : filteredProducts.filter(p => {
        const brand = (p.brand ?? "").toLowerCase();
        const ime = (p.ime ?? "").toLowerCase();
        const model = (p.model ?? "").toLowerCase();

        return (
            brand.includes(normalized) || ime.includes(normalized) || model.includes(normalized)
        );
    });

    const totalPages = Math.max(1, Math.ceil(searchedProducts.length / itemsPerPage))

    const startIndex = (currentPage - 1) * itemsPerPage;
    const pagedProducts = searchedProducts.slice(startIndex, startIndex + itemsPerPage);

    useEffect (() => {
        setCurrentPage(1);
    }, [selectedBrand, itemsPerPage, searchTerm]);

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

            setProducts(prev => prev.filter(p => p.id !== productId));
        }

        catch(error) {
            console.error(`Doslo je do greske kod brisanja: ${error}`);
        }
    }

    async function handleSaveEdit () {
        if (!editProduct?.id) return;

        try {
            await updateDoc(doc(db, "products", editProduct.id), {
                brand: editProduct.brand ?? "",
                ime: editProduct.ime ?? "",
                model: editProduct.model ?? "",
                snaga_kW: editProduct.snaga_kW === "" ? "" : Number(editProduct.snaga_kW),
                tip: editProduct.tip ?? "",
                cijena: editProduct.cijena === "" ? "" : Number(editProduct.cijena)
            })

            setProducts(prev => prev.map(p => (p.id === editProduct.id ? { ...p, ...editProduct } : p))
            );
            
            setEditOpen(false);
            setEditProduct(null);
        }
        catch (error) {
            console.error(`Greska kod spremanja: ${error}`)
        }
    }

    return (
        <div>
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

           <div className={`table-wrapper ${showtable ? "open" : ""}`}>
                {/* search by name, brand or model */}
                <div className="brand-btn-filter">
                        {brandList.map((brand) => (
                            <button key={brand} type="button" onClick= {() => setSelectedBrand(brand)} className={selectedBrand === brand ? "active" : ""}>{brand}</button>
                        )
                        )}
                </div>

                <div className="search-par">
                    <input className="searched-products" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Pretrazite(brand/model/ime)..." />
                    {searchTerm && (<button className="search-par-btn" type="button" onClick={() => setSearchTerm("")}>Clear</button>)}
                </div>

                <div className="table-win">
                    <table className={`product-table`}>
                        <thead>
                            <tr>
                                <th>Brand</th>
                                <th>Ime</th>
                                <th>Model</th>
                                <th>Snaga (kW)</th>
                                <th>Tip</th>
                                <th>Cijena</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagedProducts.map(product => (
                                <tr key={product.id}>
                                    <td>{product.brand}</td>
                                    <td>{product.ime}</td>
                                    <td>{product.model}</td>
                                    <td>{product.snaga_kW}</td>
                                    <td>{product.tip}</td>
                                    <td>{product.cijena} €</td>
                                    <td><button className="paged-prod-btn1" onClick={() => handleDelete(product.id)}>Ukloni</button></td>
                                    <td><button className="paged-prod-btn2" onClick={() => { setEditProduct(product); setEditOpen(true); }}>Uredi</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination-products">
                    <button type="button" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>{"<"} Previous</button>
                        <span>{currentPage} / {totalPages}</span>
                    <button type="button" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next {">"}</button>
                </div>
            </div>

            <div className="modal-block">
                 {editOpen && editProduct && (
                    <div className="modal-backdrop" onClick={() => {setEditOpen(false); setEditProduct(null);}}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <h3>Uredi proizvod</h3>
                            <label>Brand</label>
                            <input type="text" placeholder="Brand" value={editProduct.brand ?? ""} onChange={(e) => { setEditProduct(prev => ({...prev, brand: e.target.value}))}} />
                            <label>Ime</label>
                            <input type="text" placeholder="Ime" value={editProduct.ime ?? ""} onChange={(e) => setEditProduct(p => ({ ...p, ime: e.target.value }))} />
                            <label>Model</label>
                            <input type="text" placeholder="Model" value={editProduct.model ?? ""} onChange={(e) => setEditProduct(p => ({ ...p, model: e.target.value }))} />
                            <label>Snaga (kW)</label>
                            <input type="number" placeholder="kW" value={editProduct.snaga_kW ?? ""} onChange={(e) => setEditProduct(p => ({ ...p, snaga_kW: e.target.value }))} />
                            <label>Tip</label>
                            <input type="text" placeholder="Tip" value={editProduct.tip ?? ""} onChange={(e) => setEditProduct(p => ({ ...p, tip: e.target.value }))} />
                            <label>Cijena (€)</label>
                            <input type="number" placeholder="€" value={editProduct.cijena ?? ""} onChange={(e) => setEditProduct(p => ({ ...p, cijena: e.target.value }))} />
                            <button className="modal-btn1" type="button" onClick={handleSaveEdit}>Spremi</button>
                            <button className="modal-btn2" type="button" onClick={() => {setEditOpen(false); setEditProduct(null);}}>Zatvori</button>
                        </div>
                    </div>
                 )}
            </div>
        </div>
    )
}

export default AdminUserSettings;