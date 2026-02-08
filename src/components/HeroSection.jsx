
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = ({ title, subtitle, ctaText, ctaLink, backgroundImage }) => {
    return (
        <section className="hero-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="hero-overlay"></div>
            <div className="container hero-content">
                <h1 className="heading-pro hero-title animate-fade-in">
                    {title}
                </h1>
                {subtitle && (
                    <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        {subtitle}
                    </p>
                )}
                {ctaText && (
                    <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <Link to={ctaLink} className="btn btn-primary">
                            {ctaText} <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default HeroSection;
