import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { Layout } from "./components/layout/Layout";
import { Hero } from "./components/sections/Hero";
import { Metrics } from "./components/sections/Metrics";
import { Services } from "./components/sections/Services";
import { Process } from "./components/sections/Process";
import { Coverage } from "./components/sections/Coverage";
import { AboutPreview } from "./components/sections/AboutPreview";
import { ContactPreview } from "./components/sections/ContactPreview";
import { NewsPreview } from "./components/sections/NewsPreview";
import { WhatsAppButton } from "./components/common/WhatsAppButton";
import { ServicesPage } from "./pages/ServicesPage";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Privacy } from "./pages/Privacy";
import { News } from "./pages/News";

const Home = () => (
    <>
        <Hero />
        <Metrics />
        <Services />
        <Process />
        <Coverage />
        <AboutPreview />
        <NewsPreview />
        <ContactPreview />
    </>
);

function App() {
    return (
        <MotionConfig reducedMotion="user">
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/servicios" element={<ServicesPage />} />
                    <Route path="/nosotros" element={<About />} />
                    <Route path="/noticias" element={<News />} />
                    <Route path="/contacto" element={<Contact />} />
                    <Route path="/aviso-de-privacidad" element={<Privacy />} />
                    <Route path="*" element={<Home />} />
                </Route>
            </Routes>
            <WhatsAppButton />
        </Router>
        </MotionConfig>
    );
}

export default App;
