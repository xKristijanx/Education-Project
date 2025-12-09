import { Link } from "react-router-dom";

function Footer () {
    return (
        <footer>
            <div className="footer-contact footer-margin">
                <p>Adresa:</p>
                <p>Telefon:</p>
                <p>Email:</p>
            </div>
            <div className="footer-socials footer-margin">
                <Link to="https://www.facebook.com/?locale=hr_HR" target="_blank"><img className="media-fav" src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" width="16" height="16"/>Facebook</Link>
                <Link to="https://www.instagram.com/" target="_blank">  <img className="media-fav" src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" width="16" height="16" />Instagram</Link>
            </div>
            <div className="footer-legal footer-margin">
                <Link to="terms" target="_blank"></Link>
                <Link to="privacy" target="_blank"></Link>
                <p>&copy; 2025 LV Servis j.d.o.o. Sva prava pridržana.</p>
            </div>
        </footer>
    );
}

export default Footer;