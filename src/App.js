import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Hero } from "./components/sections/Hero";
import { Metrics } from "./components/sections/Metrics";
import { Services } from "./components/sections/Services";
import { Process } from "./components/sections/Process";
import { AboutPreview } from "./components/sections/AboutPreview";
import { BlogPreview } from "./components/sections/BlogPreview";
import { ContactPreview } from "./components/sections/ContactPreview";
import { WhatsAppButton } from "./components/common/WhatsAppButton";
import { ServicesPage } from "./pages/ServicesPage";
import { About } from "./pages/About";
import { Blog } from "./pages/Blog";
import { NewsDetail } from "./pages/NewsDetail";
import { Contact } from "./pages/Contact";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";

const Home = () => (
    <>
        <Hero />
        <Metrics />
        <Services />
        <Process />
        <AboutPreview />
        <BlogPreview />
        <ContactPreview />
    </>
);

function App() {
    return (
        <Router basename="/impo-escobedo-lagos">
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/servicios" element={<ServicesPage />} />
                    <Route path="/nosotros" element={<About />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<NewsDetail />} />
                    <Route path="/contacto" element={<Contact />} />
                </Route>
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
            </Routes>
            <WhatsAppButton />
        </Router>
    );
}

export default App;
