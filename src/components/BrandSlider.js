import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Toshiba from "../assets/Toshiba.png"
import Fujitsu from "../assets/Fujitsu.png"
import Korel from "../assets/Korel.png"
import Midea from "../assets/Midea.png"
import QTherm from "../assets/QTherm.png"


function BrandSlider () {

    const [ index, setIndex ] = useState(0);
    const [ products, setProducts ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);


    const itemsPerPage = 6;

    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const goPrev = () => {
        setCurrentPage(p => Math.max(1, p - 1));
    };

    const goNext = () => {
        setCurrentPage(p => Math.min(totalPages, p + 1));
    };

    const currentProducts = products.slice(startIndex, endIndex);


    const brands = [
        {name: "Toshiba", logo: Toshiba },
        {name: "Midea", logo: Midea },
        {name: "Korel", logo: Korel },
        {name: "QTherm", logo: QTherm },
        {name: "Fujitsu", logo: Fujitsu }
    ]

    const selectedBrand = brands[index]?.name

    useEffect (() => {
        setCurrentPage(1);
    }, [selectedBrand]);

    useEffect (() => {
        async function fetchProductsByBrand () {
            try {
                const productsRef = collection(db, "products");
                const que = query(productsRef, where("brand", "==", selectedBrand));

                const snapshot = await getDocs(que);

                const items = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setProducts(items);
            }
            catch (error) {
                console.error(`Doslo je do greske kod dohvacanja produkata: ${error}`)
            }
        }
       if (selectedBrand) fetchProductsByBrand();
    }, [selectedBrand]);
    

    return (
        <div>
            <section className="brand-slider">
                <h2>ODABERITE BREND</h2>

                <div className="brand-slider-logos">
                    <div className="brand-logo-item">
                        <img src={Toshiba} alt="Toshiba" />
                    </div>
                    <div className="brand-logo-item">
                        <img src={Midea} alt="Midea" />
                    </div>
                    <div className="brand-logo-item">
                        <img src={Korel} alt="Korel" />
                    </div>
                    <div className="brand-logo-item">
                        <img src={QTherm} alt="QTherm" />
                    </div>
                    <div className="brand-logo-item">
                        <img src={Fujitsu} alt="Fujitsu" />
                    </div>
                </div>

                <div>
                    <input type="range" className="brand-slider-input" min="0" max="4" step="1" value={index} onChange={(e) => setIndex(Number(e.target.value))}/>
                </div>
            {/* <div className="brand-slider-output">
                    <h3>Odabrani brand index: {brands[index].name}</h3>
                </div> */}
            </section>
            <div className="shop-block">
                    {products.length === 0 ? (
                        <p className="shop-empty">Nema proizvoda za ovaj brand.</p>
                    ) : (
                        <div className="shop-wrapper">
                            <ul className="shop-items">
                                {currentProducts.map(product => (
                                    <li className="shop-item" key={product.id}>
                                        <div className="shop-item-img">
                                            <img
                                            src={product.imageUrl}
                                            alt={product.ime || product.model}
                                            />
                                        </div>
                                        <div className="shop-item-info">
                                            <h3 className="shop-item-title">
                                            {product.ime || product.model}
                                            </h3>
                                            <p className="shop-item-sub">
                                            {product.brand} • {product.model}
                                            </p>
                                            <p className="shop-item-power">
                                            {product.snaga_kW} kW • {product.tip}
                                            </p>
                                            <p className="shop-item-price">
                                            {product.cijena} €
                                            </p>
                                        </div>
                                     </li>
                                ))}
                            </ul>
                        </div>
                    )}
            </div>
                <div className="pagination-products">
                        <button type="button" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>{"<"} Previous</button>
                            <span>{currentPage} / {totalPages}</span>
                        <button type="button" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next {">"}</button>
                </div>
        </div>
    )
}

export default BrandSlider;