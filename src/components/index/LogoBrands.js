import { useEffect, useState } from "react";

function LogoBrands () {

    const brands = [
        "Toshiba",
        "Samsung",
        "Midea",
        "Korel",
        "Mitsubishi",
        "Gree",
        "Fujitsu",
        "Hyundai",
        "QTherm"
    ]

    const [angle, setAngle] = useState(0);

    useEffect(() => {
        let frame;

        const animate = () => {
            setAngle(prev => prev + 0.003);
            frame = requestAnimationFrame(animate);
        };

        frame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frame);
    }, []);

    const radius = 180;

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
                                key={brand}
                                className="brand"
                                style={{transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`}}
                            >
                                <div className="brand-inner">
                                    {brand}
                                    {<img src=""/>}
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


