import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "./components/About";
import Contact from "./components/Contact";
import Technologies from "./components/Technologies";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Portfolio from "./components/Portfolio";
import Blogs from "./components/Blogs";
import BlogDetails from "./components/BlogDetails";
import SocialLinks from "./components/SocialLinks";
import Footer from "./components/Footer";

import Admin from "./components/admin";
import AdminLogin from "./components/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";

import ThemeProvider from "./components/ThemeProvider";

function PortfolioPage() {
  return (
    <>
      <NavBar />

      <Home />

      <About />

      <Portfolio />

      <Technologies />

      <Blogs />

      <Contact />

      <Footer />

      <SocialLinks />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>

          {/* PUBLIC PORTFOLIO */}
          <Route
            path="/"
            element={<PortfolioPage />}
          />

          {/* ADMIN LOGIN */}
          <Route
            path="/admin"
            element={<AdminLogin />}
          />

          {/* ADMIN DASHBOARD */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />

          {/* BLOG DETAILS */}
          <Route
            path="/blog/:id"
            element={<BlogDetails />}
          />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;