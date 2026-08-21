import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Rugby from "./pages/Rugby";
import RugbySquad from "./pages/RugbySquad";
import RugbyCoachingStaff from "./pages/RugbyCoachingStaff";
import RugbyFixtures from "./pages/RugbyFixtures";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ContactUs from "./pages/ContactUs";
import NewsArticle from "./pages/NewsArticle";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./context/CartContext";

export default function App() {
  // const [theme, setTheme] = useState(() => {
  //   const savedTheme = window.localStorage.getItem("jaffna-bulls-theme");
  //   return savedTheme === "dark" ? "dark" : "light";
  // });

  const [theme, setTheme] = useState("dark");

  // useEffect(() => {
  //   document.documentElement.dataset.theme = theme;
  //   window.localStorage.setItem("jaffna-bulls-theme", theme);
  // }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.theme = "dark";
  }, []);

  return (
    <CartProvider>
      <div className="app">
        <ScrollToTop />
        <Navbar
          theme={theme}
          onToggleTheme={() =>
            setTheme((current) => (current === "dark" ? "light" : "dark"))
          }
        />
        <main>
          <Routes>
            <Route path="/" element={<Home theme={theme} />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/rugby" element={<Rugby />} />
            <Route path="/rugby/squad" element={<RugbySquad />} />
            <Route
              path="/rugby/coaching-staff"
              element={<RugbyCoachingStaff />}
            />
            <Route path="/rugby/fixtures" element={<RugbyFixtures />} />
            <Route path="/store" element={<Store />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/news/:slug" element={<NewsArticle />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
