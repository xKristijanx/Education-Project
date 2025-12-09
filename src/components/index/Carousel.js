import { useRef, useState, useEffect } from "react";
import Placeholder from "../../images/Placeholder.jpg"

function Carousel () {

    const scrollRef = useRef(null);
    const [visibleItems, setVisibleItems] = useState (4);

    useEffect (() => {
        const handleResize = () => {
            
            if (window.innerWidth <= 650) {
                setVisibleItems (1);
            }
            else if (window.innerWidth <= 850){
                setVisibleItems (2);
            }
            else if (window.innerWidth <= 1200){
                setVisibleItems (3);
            }
            else {
                setVisibleItems (4);
            }
        };

            handleResize();
            window.addEventListener("resize", handleResize);
    },[]);  

        const ScrollLeft = () => {
        if (!scrollRef.current) return;

        const firstItem = scrollRef.current.querySelector(".carousel-item");
        if (!firstItem) return;

        const itemRect = firstItem.getBoundingClientRect();
        const styles = window.getComputedStyle(firstItem);
        const marginLeft = parseFloat(styles.marginLeft) || 0;
        const marginRight = parseFloat(styles.marginRight) || 0;

        const itemWidth = itemRect.width + marginLeft + marginRight;

        scrollRef.current.scrollBy({
        left: -itemWidth,
        behavior: "smooth",
        });
    };

    const ScrollRight = () => {
        if (!scrollRef.current) return;

        const firstItem = scrollRef.current.querySelector(".carousel-item");
        if (!firstItem) return;

        const itemRect = firstItem.getBoundingClientRect();
        const styles = window.getComputedStyle(firstItem);
        const marginLeft = parseFloat(styles.marginLeft) || 0;
        const marginRight = parseFloat(styles.marginRight) || 0;

        const itemWidth = itemRect.width + marginLeft + marginRight;

        scrollRef.current.scrollBy({
        left: itemWidth,
        behavior: "smooth",
        });
    };



    return (
             <section>
                <h2 className="marketing-sell">Pronađite idealnu klimu za vaš dom ili ured — brzo i jednostavno!</h2>
                <div className="carousel-arrows">
                <button className="carousel-arrow arrow-margin-right" onClick={ScrollLeft}>&#10094;</button> 
                <div className="carousel-window">
                    <div className="carousel-scroll" ref={scrollRef}>
                        <article className="carousel-item">
                            <img className="carousel-img" src={Placeholder}/>
                            <p className="carousel-info">Description text</p>
                            <p className="carousel-info">Data</p>
                            <button className="carousel-button">Saznajte više</button>
                        </article>
                        <article className="carousel-item">
                            <img className="carousel-img" src={Placeholder}/>
                            <p className="carousel-info">Description text</p>
                            <p className="carousel-info">Data</p>
                            <button className="carousel-button">Saznajte više</button>
                        </article>
                        <article className="carousel-item">
                            <img className="carousel-img" src={Placeholder}/>
                            <p className="carousel-info">Description text</p>
                            <p className="carousel-info">Data</p>
                            <button className="carousel-button">Saznajte više</button>
                        </article>
                        <article className="carousel-item">
                            <img className="carousel-img" src={Placeholder}/>
                            <p className="carousel-info">Description text</p>
                            <p className="carousel-info">Data</p>
                            <button className="carousel-button">Saznajte više</button>
                        </article>
                        <article className="carousel-item">
                            <img className="carousel-img" src={Placeholder}/>
                            <p className="carousel-info">Description text</p>
                            <p className="carousel-info">Data</p>
                            <button className="carousel-button">Saznajte više</button>
                        </article>
                        <article className="carousel-item">
                            <img className="carousel-img" src={Placeholder}/>
                            <p className="carousel-info">Description text</p>
                            <p className="carousel-info">Data</p>
                            <button className="carousel-button">Saznajte više</button>
                        </article>
                        <article className="carousel-item">
                            <img className="carousel-img" src={Placeholder}/>
                            <p className="carousel-info">Description text</p>
                            <p className="carousel-info">Data</p>
                            <button className="carousel-button">Saznajte više</button>
                        </article>
                        <article className="carousel-item">
                            <img className="carousel-img" src={Placeholder}/>
                            <p className="carousel-info">Description text</p>
                            <p className="carousel-info">Data</p>
                            <button className="carousel-button">Saznajte više</button>
                        </article>
                    </div>
                </div>
                <button className="carousel-arrow arrow-margin-left" onClick={ScrollRight}>&#10095;</button> 
                </div>
            </section>
    )
}

export default Carousel;