
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Instagram, Facebook } from 'lucide-react';
import './Header.css'; // We will create this specific CSS for complex animations

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Início', path: '/' },
        { name: 'Sobre', path: '/sobre' },
        { name: 'Comunicação Visual', path: '/comunicacao-visual' },
        { name: 'Materiais Políticos', path: '/campanhas-politicas' },
        { name: 'Brindes', path: '/brindes' },
        { name: 'Confecção', path: '/confeccao' },
    ];

    const currentPath = location.pathname;

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                <div className="logo">
                    <Link to="/">
                        <img src="/images/logo-full.png" alt="SKV Comunicação Visual" className="logo-img" />
                    </Link>
                </div>{/* Desktop Nav */}
                <nav className="desktop-nav">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-link ${currentPath === link.path ? 'active' : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a href="https://wa.me/5511970392910" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        Solicitar Orçamento
                    </a>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Nav Overlay */}
                <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
                    <div className="mobile-nav-content">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="mobile-nav-link"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a href="https://wa.me/5511970392910" className="btn btn-primary mobile-cta">
                            Falar no WhatsApp
                        </a>
                        <div className="social-links">
                            <a href="https://www.instagram.com/skvcomunicacao/%20" target="_blank"><Instagram /></a>
                            <a href="https://www.facebook.com/skvcomunicacao/" target="_blank"><Facebook /></a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
