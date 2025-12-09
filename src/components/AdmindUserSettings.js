import Nav from "./Nav";
import Placeholder from "../images/Placeholder.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { useRef, useState } from "react";
import { db, storage } from "../firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

function AdminUserSettings () {

    const { user, role } = useAuth();

    const profilePicRef = useRef(null);
    const [profilePic, setProfilePic] = useState(Placeholder);

    async function profilePicChange(e) {
        const file = e.target.files[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setProfilePic(imageUrl);

        /*

        try {
            const storageRef = ref(storage,`profilePictures/${user.uid}`);

            await uploadBytes(storageRef, file);

            const downloadURL = await getDownloadURL(storageRef);

            setProfilePic(downloadURL);

            const userDocRef = doc(db, "users", user.uid);
            await updateDoc (userDocRef, {photoURL: downloadURL});

            console.log("Profilna slika promjenjena:", downloadURL);
        }
        catch (error) {
            console.error(`Greska ${error} kod uploada.`)
        }
            */
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
                        <li><Link>Prikaz proizvoda</Link></li>
                    </ul>
                    </>
                )}
            </div>
        </div>
    )
}

export default AdminUserSettings;