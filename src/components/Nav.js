import { Link, useNavigate } from "react-router-dom";
import React, {useEffect, useState} from "react";
import { useAuth } from "../services/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import SlideIn from "../images/Slide_in.png"


function Nav () {

    const navigate = useNavigate();
    
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, role } = useAuth();

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    }

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    }

    return (
         <nav className={`nav ${menuOpen ? 'nav-open' : ""}`}>
                { !menuOpen && (<div className="menu-toggle" onClick={toggleMenu}></div>)}
                <ul className="nav-list">
                    <li><Link to="/">POČETNA</Link></li>
                    <li><Link to="/shop">SHOP</Link></li>
                    <li><Link to="/oNama">O NAMA</Link></li>
                    <li><Link to="/kontakt">KONTAKT</Link></li>
                    {user === null && (<>
                    <li><Link to="/login">PRIJAVA</Link></li>
                    </>)}
                    {user !== null && (
                    <>
                        {role !== "admin" && (
                            <li><Link to="/AdminUserSettings" className="user-fav">👤</Link></li>
                        )}
                        {role === "admin" && (
                            <li><Link to="/AdminUserSettings">👤ADMIN</Link></li>
                        )}
                     <li><button onClick={handleLogout} className="logout-btn">ODJAVA</button></li>
                    </>
                    )}
                    { menuOpen && (
                        <li className="slide-in-prnt" onClick={toggleMenu}>
                          <img className="slide-in-img" src={SlideIn} />
                        </li>)
                    }
                </ul>
         </nav>
    )
}

export default Nav;