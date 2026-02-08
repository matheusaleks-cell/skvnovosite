import { Facebook, Instagram, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-grid">

                {/* Brand Column */}
                <div className="footer-brand">
                    <Link to="/">
                        <img src="/images/logo-full.png" alt="SKV Comunicação Visual" className="footer-logo" />
                    </Link>
                    <p>
                        Infraestrutura completa para comunicação visual e confecção corporativa.
                        Qualidade industrial, prazo garantido e acabamento de excelência para sua marca.
                    </p>
                    <div className="footer-social">
                        <a href="https://www.facebook.com/skvcomunicacao/" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '0.6rem', borderRadius: '50%' }}>
                            <Facebook size={20} />
                        </a>
                        <a href="https://www.instagram.com/skvcomunicacao/" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '0.6rem', borderRadius: '50%' }}>
                            <Instagram size={20} />
                        </a>
                    </div>
                </div>

                {/* Links Column */}
                <div>
                    <h4 className="footer-heading">Navegação</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Início</Link></li>
                        <li><Link to="/sobre">Sobre a SKV</Link></li>
                        <li><Link to="/comunicacao-visual">Comunicação Visual</Link></li>
                        <li><Link to="/confeccao">Linha de Confecção</Link></li>
                    </ul>
                </div>

                {/* Contact Column */}
                <div>
                    <h4 className="footer-heading">Central de Atendimento</h4>
                    <ul className="footer-contact footer-links">
                        <li>
                            <MapPin size={20} className="footer-contact-icon" />
                            <a href="https://share.google/DKHgkdp1efwDhXTTQ" target="_blank" rel="noopener noreferrer">
                                Rua das Orquídeas, 748 <br />
                                Vila Marchi – São Bernardo do Campo/SP
                            </a>
                        </li>
                        <li>
                            <Phone size={20} className="footer-contact-icon" />
                            <div>
                                <span>+55 11 4356-1846</span>
                                <a href="https://wa.me/5511970392910" className="contact-highlight">
                                    +55 11 97039-2910
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p className="footer-copy">
                        &copy; {new Date().getFullYear()} <strong>SKV Comunicação Visual & Confecção</strong>. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
