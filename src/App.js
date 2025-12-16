import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index"
import Kontakt from "./pages/Kontakt"
import ONama from "./pages/ONama"
import Shop from "./pages/Shop"
import Login from "./pages/Login";      
import Register from "./pages/Register"; 
import AdminUserSettings from './components/AdmindUserSettings';
import AuthProvider  from "./services/AuthContext";
import { useEffect } from 'react';
import ChangePass from './components/ChangePass';
import AdminAddProduct from './components/AdminAddProduct';
import Layout from "./pages/Layout";


function App() {

  useEffect(() => {
    function logInfo() {
        console.clear();
        console.log("window.innerWidth:", window.innerWidth);
        console.log("visualViewport.width:", window.visualViewport?.width);
        console.log("devicePixelRatio:", window.devicePixelRatio);
    }

    logInfo();
    window.addEventListener("resize", logInfo);

    return () => window.removeEventListener("resize", logInfo);
    }, []);
    
    return (
        <AuthProvider>
          <BrowserRouter>
              <Routes>

                  <Route element={<Layout />}>

                      <Route path="/" element={<Index />} />
                      <Route path="/kontakt" element={<Kontakt />} />
                      <Route path="/onama" element={<ONama />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/adminusersettings" element={<AdminUserSettings />} />
                      <Route path="/changepass" element={<ChangePass />} />
                      <Route path="/adminaddproduct" element={<AdminAddProduct />} />

                  </Route>

              </Routes>
          </BrowserRouter>
        </AuthProvider>
    )
}

export default App;
