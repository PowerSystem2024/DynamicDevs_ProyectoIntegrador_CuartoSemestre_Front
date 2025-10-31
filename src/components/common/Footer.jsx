import { Container } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import "./Footer.css";
import { useEffect, useRef } from "react";

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) footerRef.current.classList.add("visible");
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
  }, []);

  return (
    <footer ref={footerRef} className="footer mt-auto">
      <div className="footer-glow"></div>
      <Container className="text-center py-4">
        <div className="footer-separator"></div>

        <p className="footer-text mb-3">
          © 2025 <span className="brand">DynamicDevs</span> — Todos los derechos reservados.
        </p>

        <div className="social-icons">
          <a href="#" className="icon facebook" aria-label="Facebook"><FaFacebook /></a>
          <a href="#" className="icon instagram" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" className="icon twitter" aria-label="Twitter"><FaTwitter /></a>
          <a href="#" className="icon linkedin" aria-label="LinkedIn"><FaLinkedin /></a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;






