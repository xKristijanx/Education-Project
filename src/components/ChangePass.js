import Nav from "./Nav";
import { useState } from "react";
import { useAuth } from "../services/AuthContext";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";

function ChangePass () {

    const { user } = useAuth();

    const [ oldPassword, setOldPassword ] = useState("");
    const [ newPassword, setNewPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ error, setError ] = useState("");
    const [ success, setSuccess ] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!user) {
            setError("Prijavite se da biste promjenili lozinku.")
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Nove lozinke se ne podudaraju.")
            return;
        }
        if (newPassword.length < 6) {
            setError("Nova lozinka mora imati barem 6 znakova.")
            return;
        }

        try {
            const credential = EmailAuthProvider.credential (
                user.email,
                oldPassword
            );

            await reauthenticateWithCredential (user, credential);

            await updatePassword (user, newPassword);

            setSuccess("Lozinka je uspjesno promijenjena.")
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
        catch (error) {
            console.error(`Greska kod promjene lozinke:, ${error}`);
            setError("Neispravna stara lozinka ili je došlo do greške. Pokušajte ponovno.");
        }
    }


    return (
        <div>
            <form className="pass-change" onSubmit={handleSubmit}>
                <label>Stara lozinka</label>
                <input type="password" required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}></input>
                <label>Nova lozinka</label>
                <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
                <label>Potvrdite novu lozinku</label>
                <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>

                {error && <p className="error-text">{error}</p>}
                {success && <p className="success-text">{success}</p>}
                <button type="submit" className="pass-change-btn">Promjenite lozinku</button>
            </form>
        </div>
    )
}

export default ChangePass;