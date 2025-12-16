import { useState } from "react";
import Nav from "../components/Nav";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoginError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        }
        catch (error){
            console.log(`Login error: ${error}`);
            setLoginError("Pogresan email ili lozinka.");
        }
    }
   

    return (
        <div>
            <div className="login-form">
                <h2>Prijavite se</h2>
            <form onSubmit={handleSubmit}>
                <input className="login-style1" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                <input className="login-style1" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required ></input>
                {loginError && <p className="error-text">{loginError}</p>}
                <button className="log-reg-button log-reg-margin" type="submit">Prijavi se</button>
            </form>
                <h3 className="login-style2">Niste Registrirani?</h3>
                <Link className="log-reg-button" to="/register">Registrirajte se</Link>
            </div>
        </div>
    )
}

export default Login;