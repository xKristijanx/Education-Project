import Montaza from "../../images/Montaza.png"
import Servis from "../../images/Servis.png"
import Brands from "../../images/Brands.png"
import { useRef, useState, useEffect } from "react";

function MarketingBlocks () {

    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref1.current) return;

            const top1 = ref1.current.getBoundingClientRect().top;
            const windowHeight1 = window.innerHeight;

            if (top1 < windowHeight1 * 0.5) {
                setVisible1(true);
            }
            else {
                setVisible1(false);
            }

            if (!ref2.current) return;

            const top2 = ref2.current.getBoundingClientRect().top;
            const windowHeight2 = window.innerHeight;

            if (top2 < windowHeight2 * 0.7) {
                setVisible2(true);
            }
            else {
                setVisible2(false);
            }

            if (!ref3.current) return;

            const top3 = ref3.current.getBoundingClientRect().top;
            const windowHeight3 = window.innerHeight;

            if (top3 < windowHeight3 * 0.7) {
                setVisible3(true);
            }
            else {
                setVisible3(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
        
    }, []);

    return (
        <section className="structure1">
                <h2 className="header2">Zašto odabrati LV Servis?</h2>
                
                <article ref={ref1} className={`marketing-block1 align-left market-block-transf1 ${visible1 ? "active" : ""}`}>
                <h3 className="header3">Prodaja kvalitetnih klima uređaja.</h3>
                <div className="marketing1">
                    <img src={Brands} alt="Izbor-klima-logo" className="responsive-img"/>
                    <p className="article-pharagraph">Nudimo širok izbor klima uređaja svih brendova po pristupačnim cijenama — za dom ili poslovni prostor.</p>
                </div>
                </article>

                <article ref={ref2} className={`marketing-block1 align-right market-block-transf2 ${visible2 ? "active" : ""}`}>
                <h3 className="header3">Stručna montaža i ugradnja.</h3>
                <div className="marketing2">
                    <p className="article-pharagraph">Naš tim osigurava profesionalnu i brzu montažu s dugogodišnjim iskustvom u klimatizaciji svih vrsta prostora.</p>
                    <img src={Montaza} alt="Montaza-klima-logo" className="responsive-img"/>
                </div>
                </article>

                <article ref={ref3} className={`marketing-block1 align-left market-block-transf1 ${visible3 ? "active" : ""}`}>
                <h3 className="header3">Servis i održavanje</h3>
                <div className="marketing1">
                    <img src={Servis} alt="Servis-klima-logo" className="responsive-img2"/>
                    <p className="article-pharagraph">Redovitim održavanjem i pravovremenim popravcima osiguravamo dugotrajan i učinkovit rad vaših klima uređaja.</p>
                </div>
                </article>
            </section>
    )
}

export default MarketingBlocks;