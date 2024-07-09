import React from "react";
import "./style.css";
import footer from "../../../Images/footer/footerbg2.png";
import { Container } from "react-bootstrap";
import FooterContent from "./footercontent";

function Footer() {
  return (
    <Container className="footerbg p-0">
      <div className="footerTop">
        <FooterContent />
      </div>
      <img src={footer} alt="" srcset="" className="footermid w-100" />
      <div className="footerbot text-white">
        <p className="copyright mb-0 text-center">
          <i class="fas fa-registered" /> SubLinks - Criado por{" "}
          <a
            href="https://mavsleo.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mav's Leo Web design
          </a>
        </p>
      </div>
    </Container>
  );
}

export default Footer;
