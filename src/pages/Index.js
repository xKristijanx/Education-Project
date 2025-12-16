import { Link } from "react-router-dom";
import Header_image from "../images/Header-image.jpg"
import Logo from "../images/Logo.png"
import Nav from "../components/Nav";
import Carousel from "../components/index/Carousel";
import MarketingBlocks from "../components/index/MarketingBlocks";
import HeaderCarousel from "../components/index/HeaderCarousel";
import LogoBrands from "../components/index/LogoBrands";
import Reviews from "../components/index/Reviews";
import Footer from "../components/Footer";

function Index () {
    return (
        <div>
        <main>
        <div className="logo-wrapper">
             <img className="header-logo" src={Logo} alt="header-logo"/>
        </div>
        <p className="header-text">Specijalisti za montažu, servis i hitne intervencije klimatizacijskih sustava.</p>
        <HeaderCarousel />
        <Carousel />
        <MarketingBlocks />
        <LogoBrands />
        <Reviews />
        </main>
        </div>
    );
}

export default Index;