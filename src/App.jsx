import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Rugby from './pages/Rugby';
import RugbySquad from './pages/RugbySquad';
import RugbyCoachingStaff from './pages/RugbyCoachingStaff';
import RugbyFixtures from './pages/RugbyFixtures';
import Store from './pages/Store';
import ContactUs from './pages/ContactUs';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/rugby" element={<Rugby />} />
          <Route path="/rugby/squad" element={<RugbySquad />} />
          <Route path="/rugby/coaching-staff" element={<RugbyCoachingStaff />} />
          <Route path="/rugby/fixtures" element={<RugbyFixtures />} />
          <Route path="/store" element={<Store />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
