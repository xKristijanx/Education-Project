import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

function Kontakt () {
    return (
        <div>
            <div className="header-space"></div>
            <main className="kontakt">
                <div>
                    <h1 className="kontakt-header">Kontaktirajte nas</h1>
                    <form className="contact-form" action="" method="" name="">
                    
                        <label for="name">Ime I prezime:</label>
                        <input className="kontakt-style1" type="text" id="name" name="name" placeholder="Ime I prezime" required />
                        <div className="kontakt-row1">
                            <div className="kontakt-column1">  
                                <label className="label-space" for="email">Email adresa:</label>
                                <input className="kontakt-style2 kontakt-width" type="email" id="email" name="email" placeholder="Email" required />
                            </div> 
                            <div className="kontakt-column1">  
                                <label className="label-space" for="number">Broj mobitela</label>
                                <input className="kontakt-style2 kontakt-width" type="number" id="number" name="number" placeholder="Broj Mobitela" required />
                            </div> 
                        </div>
                        <label for="message">Poruka</label>
                        <textarea id="message" name="message" rows="10" required></textarea>

                        <button className="submit-button" type="submit">POŠALJI</button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Kontakt;