import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import {doc, setDoc } from "firebase/firestore";
import Nav from "../components/Nav";
import { Link, useNavigate } from "react-router-dom";


function Register () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailerror, setEmailError] = useState("");
    const [passworderror, setPasswordError] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        setEmailError("");
        setPasswordError("");    


        console.log("Email:", email);
        console.log("Password:", password);

        let hasError = false;

        if (email.trim() === "") {
            setEmailError("Email ne smije biti prazan.");
            hasError = true;
        }

        if (password.length < 6) {
            setPasswordError("Lozinka mora imati barem 6 znakova");
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            //1. We are getting the UID of the new user
            const uid = userCredential.user.uid;

            //2. We are creating a document in "users" collection with the forementioned UID
            await setDoc(doc(db, "users", uid), {
                email: email,
                role: "user",
                createdAt: new Date()
            });

            //3. After everything is completed redirect me to the homepage
            navigate("/");
        }
        catch (error) {
            alert(`Greska: ${error.code || error.message}`);
        }
    }


    return (
        <div>
            <div className="login-form">
                <h2>Registracija</h2>
            <form onSubmit={handleSubmit}>
                <input className="login-style1" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                {emailerror && <p className="error-text">{emailerror}</p>}
                <input className="login-style1" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                {passworderror && <p className="error-text">{passworderror}</p>}
                <button className="log-reg-button log-reg-margin" type="submit">Registriraj se</button>
            </form>
                <h3 className="login-style2">Imate racun?</h3>
                <Link className="log-reg-button" to="/login">Prijavite se</Link>
            </div>
        </div>
    )
}


export default Register;