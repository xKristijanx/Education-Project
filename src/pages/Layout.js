import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="page">
      <header><Nav /></header>

      <main className="page-main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;