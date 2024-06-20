import { Outlet } from "react-router-dom";
import { Header } from "../components/header/header";
import { Footer } from "../components/footer/footer";

export function Layout() {
  return (
    <div className="wrapper">
      <Header />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
