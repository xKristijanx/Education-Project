import { useState } from "react";
import Nav from "./Nav";
import {db, storage } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AdminAddProduct () {

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [ime, setIme] = useState("");
    const [snaga, setSnaga] = useState("");
    const [tip, setTip] = useState("");
    const [boja, setBoja] = useState("");
    const [cijena, setCijena] = useState("");
    const [slika, setSlika] = useState(null);
    const [opis, setOpis] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSubmit (e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!brand || !ime || !model || !snaga || !tip || !cijena) {
            setError("Molimo ispunite obavezna polja.");
            return;
        }

        setLoading(true);

        try {
            let imageUrl = "";

            if(slika) {
                const imageRef = ref (
                    storage,
                    `products/${brand}_${model}_${Date.now()}`
                );

                await uploadBytes(imageRef, slika);
                imageUrl = await getDownloadURL(imageRef);
            }

            const productData = {
                brand,
                model,
                ime,
                snaga_kW: Number(snaga),
                tip,
                boja,
                cijena: Number(cijena),
                opis,
                imageUrl,
                createdAt: serverTimestamp()
            };

            await addDoc(collection(db, "products"), productData);

            setSuccess("Proizvod je uspjesno dodan!");

              setBrand("");
              setModel("");
              setIme("");
              setSnaga("");
              setTip("");
              setBoja("");
              setCijena("");
              setSlika(null);
              setOpis("");

              e.target.reset?.();

        }
        catch(error) {
            console.error(`Došlo je do greske pri spremanju proizvoda: ${error}`)
            setError(`Došlo je do greške pri spremanju proizvoda: ${error}`);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <header>
                <Nav />
            </header>
            <h2 className="product-header">Dodajte novi proizvod</h2>
            <form className="product-add-form" onSubmit={handleSubmit}>
                <label>Brand</label>
                <select className="product-field" name="brand" value={brand} onChange={(e) => setBrand(e.target.value)} required>
                    <option value="">Odaberite brand</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Midea">Midea</option>
                    <option value="Gree">Gree</option>
                    <option value="Korel">Korel</option>
                    <option value="Fujitsu">Fujitsu</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Mitsubishi Electric">Mitsubishi Electric</option>
                    <option value="QTherm">QTherm</option>
                    <option value="Toshiba">Toshiba</option>
                </select>

                <label>Model</label>
                <input className="product-field" name="model" value={model} onChange={(e) => setModel(e.target.value)} placeholder="*" required/>

                <label>Snaga (kW)</label>
                <input className="product-field" name="snaga_kW" value={snaga} type="number" onChange={(e) => setSnaga(e.target.value)} placeholder="*" required />

                <label>Ime</label>
                <input className="product-field" name="ime" value={ime} onChange={(e) => setIme(e.target.value)} placeholder="*" required />

                <label>Tip</label>
                <input className="product-field" name="tip" value={tip} onChange={(e) => setTip(e.target.value)} placeholder="*" required />

                <label>Boja</label>
                <input className="product-field" name="boja" value={boja} onChange={(e) => setBoja(e.target.value)} />

                <label>Cijena</label>
                <input className="product-field" name="cijena" value={cijena} type="number" onChange={(e) => setCijena(e.target.value)} placeholder="*" required />

                <label>Slika</label>
                <input className="product-field" type="file" accept="image/*" onChange={(e) => setSlika(e.target.files[0])} required />

                <label>Opis</label>
                <input className="product-field" name="opis" value={opis} onChange={(e) => setOpis(e.target.value)} />

                <button className="product-btn" type="submit" disabled={loading}>{loading ? "Spremanje..." : "Dodajte produkt"}</button>

                {error && <p className="form-error">{error}</p>}
                {success && <p className="form-success">{success}</p>}
            </form>
        </div>
    )
}

export default AdminAddProduct;