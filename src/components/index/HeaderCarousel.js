import { useEffect, useRef } from "react"
import Landing_img1 from "../../images/Landing_img1.png"
import Landing_img2 from "../../images/Landing_img2.png"
import Landing_img3 from "../../images/Landing_img3.png"

function HeaderCarousel () {

    const blockRef = useRef(null);
    const indexRef = useRef(0);

    useEffect (() => {
        const interval = setInterval(() => {
            const block = blockRef.current;
            if (!block) return;

            indexRef.current += 1;  
            block.style.transition = "transform 0.8s ease-in-out"; 
            block.style.transform = `translateX(-${indexRef.current * 100}%)`; 

            if (indexRef.current === 3) {
                setTimeout(() => {
                    block.style.transition = "none";
                    block.style.transform = "translateX(0)";
                    indexRef.current = 0;
                }, 800);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="header-img-overflow">
            <div className="imgs-block" ref={blockRef}>
                <img src={Landing_img1} className="header-image" />
                <img src={Landing_img2} className="header-image" />
                <img src={Landing_img3} className="header-image" />
                <img src={Landing_img1} className="header-image" />
            </div>
        </div>
    );
}

export default HeaderCarousel;