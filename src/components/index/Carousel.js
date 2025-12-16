import { useRef, useState, useEffect } from "react";
import Placeholder from "../../images/Placeholder.jpg"
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

function Carousel () {

    const scrollRef = useRef(null);
    const [ visibleItems, setVisibleItems ] = useState (4);
    const [ products, setProducts ] = useState([]);

    function getRandomItems(array, count) {
        if (array.length <= count) return array;

        const shuffled = [...array].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }

    useEffect (() => {
        const fetchProducts = async () => {
            try {
                const productsRef = collection(db, "products");
                const snapshot = await getDocs(productsRef);

                const allProducts = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                const randomEight = getRandomItems(allProducts, 8);
                setProducts(randomEight);
            }
            catch(error){
                console.error(`Doslo je do greske kod preuzimanja: ${error}`)
            }
        }
        fetchProducts();
    }, [])

    console.log(products);

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
            return () => window.removeEventListener("resize", handleResize);
    },[]);  

    const scrollOneSlot = (direction) => {
        const el = scrollRef.current;
        if (!el) return;

        const firstItem = el.querySelector(".carousel-item");
        if (!firstItem) return;

        const itemWidth = firstItem.getBoundingClientRect().width;

        const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap) || 0;

        const step = itemWidth + gap;

        el.scrollBy({ left: direction * step, behavior: "smooth" });
    };

    const ScrollLeft = () => scrollOneSlot(-1);
    const ScrollRight = () => scrollOneSlot(1);

    function formatPrice(value) {
        if (!value && value !==0 ) return "";

        else {
            return Number(value).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2 
            });
        }
    }



    return (
             <section>
                <h2 className="marketing-sell">Pronađite idealnu klimu za vaš dom ili ured — brzo i jednostavno!</h2>
                <div className="carousel-arrows">
                <button className="carousel-arrow arrow-margin-right" onClick={ScrollLeft}>&#10094;</button> 
                <div className="carousel-window" style={{ "--items": visibleItems }}>
                    <div className="carousel-scroll" ref={scrollRef}>
                        {products.map(product => (
                            <article className="carousel-item" key={product.id}>
                                <img className="carousel-img" src={product.slika || product.imageUrl || Placeholder} alt={`${product.brand || ""} ${product.model || ""}`} />
                                <p className="carousel-info product-name">{product.ime}</p>
                                <p className="carousel-info">Brand: {product.brand}</p>
                                <p className="carousel-info">Model: {product.model}</p>
                                <p className="carousel-info">Snaga: {product.snaga_kW} kW</p>
                                <p className="carousel-info">Cijena: {formatPrice(product.cijena)} €</p>
                            </article>
                        ))}
                    </div>
                </div>
                <button className="carousel-arrow arrow-margin-left" onClick={ScrollRight}>&#10095;</button> 
                </div>
            </section>
    )
}

export default Carousel;