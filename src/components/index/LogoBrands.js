import { useEffect, useState } from "react";
import Toshiba from "../../assets/Toshiba.png"
import Fujitsu from "../../assets/Fujitsu.png"
import Korel from "../../assets/Korel.png"
import Midea from "../../assets/Midea.png"
import QTherm from "../../assets/QTherm.png"
import Samsung from "../../assets/Samsung.png"

function LogoBrands () {

    const brands = [
        {name: "Toshiba", logo: Toshiba },
        {name: "Fujitsu", logo: Fujitsu },
        {name: "Korel", logo: Korel },
        {name: "Midea", logo: Midea },
        {name: "QTherm", logo: QTherm },
        {name: "Samsung", logo: Samsung },
    ]

    const [ angle, setAngle ] = useState(0);
    const [ radius, setRadius ] = useState(150);

    useEffect(() => {
        let frame;

        const animate = () => {
            setAngle(prev => prev + 0.003);
            frame = requestAnimationFrame(animate);
        };

        frame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frame);
    }, []);

    useEffect (() => {
        function updateRadius() {
            if (window.innerWidth < 500) {
                setRadius(120);
            }
            else if ( window.innerWidth < 700) {
                setRadius(140);
            }
            else {
                setRadius(180);
            }

        }

        updateRadius();

        window.addEventListener("resize", updateRadius);
        return () => window.removeEventListener("resize", updateRadius);
    }, [])

    return (
        <section>
            <article>
                <h2 className="header2">BRENDOVI U NAŠOJ PONUDI</h2>
                <div className="logo-brands">
                    <div className="logo-spin">
                      {brands.map((brand, index) => {
                        const step = (2 * Math.PI) / brands.length;
                        const a = angle + index * step;
                        const x = Math.cos(a) * radius;
                        const y = Math.sin(a) * radius;

                        return ( 
                            <div 
                                key={brand.name}
                                className="brand"
                                style={{transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`}}
                            >
                                <div className="brand-inner">
                                    {<img className="brand-imgs" src={brand.logo} alt={brand.name}/>}
                                </div>
                                
                            </div>
                        )
                      })}
                    </div>
                </div>
            </article>
        </section>
    );
}

export default LogoBrands;


