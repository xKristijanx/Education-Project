import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function ONama () {

    const para1 = useRef(null);
    const para2 = useRef(null);
    const para3 = useRef(null);

    useEffect (() => {
        para1.current.classList.add("active")

        const timeout = setTimeout(() => {
            para2.current.classList.add("active")
        }, 2000);

        const timeout2 = setTimeout(() => {
            para3.current.classList.add("active")
        }, 4000);

        return () => {
            clearTimeout(timeout);
            clearTimeout(timeout2);
        }

    }, []);

    return (
        <div className="page">
            <main>
                <div className="o-nama-cont">
                    <h1 className="o-nama-header">O nama</h1>
                    <div className="onm-ovr" ref={para1}>
                        <p className="o-nama-para">
                            Mi smo stručnjaci za klimatizaciju — bavimo se isključivo ugradnjom, servisom i održavanjem klima-uređaja. 
                            Naša je misija da u vaš dom ili ured donesemo ugodnu, zdravu i kontroliranu klimu — bilo da vam treba nova instalacija, redovno održavanje ili brzi servis kada klima zakaže.
                        </p> 
                    </div>
                    <div className="onm-ovr" ref={para2}>
                        <p className="o-nama-para">
                            Radimo brzo, profesionalno i pouzdano: pregledamo prostor, predložimo optimalno rješenje i osiguramo da klima radi učinkovito i sigurno.
                            Za nas je važno da korisnici budu zadovoljni — zato svaki posao odrađujemo s pažnjom na detalje.
                        </p>
                    </div>
                    <div className="onm-ovr" ref={para3}>
                        <p className="o-nama-para">
                            S dugogodišnjim iskustvom i individualnim pristupom, našim klijentima nudimo sigurna i profesionalna rješenja prilagođena prostoru i potrebama.
                        </p>
                    </div>
                </div>
                   <div className="map-wrapper">
                        <MapContainer
                            className="leaflet-map"
                            center={[46.3057, 16.3366]}   // Varaždin primjer
                            zoom={13}
                            scrollWheelZoom={false}
                        >
                        <TileLayer
                            attribution='&copy; OpenStreetMap contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={[46.3057, 16.3366]}>
                        <Popup>
                                LV Servis<br />Montaža i servis klima uređaja
                        </Popup>
                        </Marker>
                        </MapContainer>
                    </div>
            </main>
        </div>
    ); 
} 

export default ONama;