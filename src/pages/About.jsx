import { useEffect } from 'react';
import { Star, Truck, UserCheck, ShoppingCart, CreditCard, DollarSign, Headphones, Truck as TruckIcon } from 'lucide-react';
import './About.css';

const About = () => {
    useEffect(() => {
        // Load Elfsight script dynamically
        const script = document.createElement('script');
        script.src = "https://elfsightcdn.com/platform.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="about-page">
            {/* 1. Header & Text Block */}
            <header className="about-header">
                <div className="container">
                    <h1 className="about-title-block">
                        Materiais Que Geram Resultados
                    </h1>
                    <div className="about-text-block">
                        <p>
                            Na <strong>SKV Comunicação</strong>, nosso compromisso é oferecer materiais de alta qualidade, que garantem não apenas resultados visíveis, mas também durabilidade e um acabamento impecável. Trabalhamos com agilidade para atender às suas necessidades no prazo, sempre com foco em confiança e segurança, assegurando que sua marca ou evento se destaque de forma profissional e eficaz. Com soluções personalizadas e atenção aos detalhes, entregamos produtos que fazem a diferença e geram resultados reais para o seu negócio!
                        </p>
                    </div>
                </div>
            </header>

            {/* 2. Feature Cluster Section */}
            <section className="feature-cluster-section">
                <div className="container feature-cluster-grid">

                    {/* Left Column */}
                    <div className="feature-col left">
                        <div className="feature-item">
                            <div className="feature-icon"><Star size={40} strokeWidth={1.5} /></div>
                            <h3>EXCELÊNCIA EM QUALIDADE</h3>
                            <p>Oferecemos produtos de alta qualidade, garantindo durabilidade e satisfação.</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon"><UserCheck size={40} strokeWidth={1.5} /></div>
                            <h3>QUALIDADE EM ATENDIMENTO</h3>
                            <p>Atendimento personalizado, sempre focado nas suas necessidades e expectativas.</p>
                        </div>
                    </div>

                    {/* Center Image */}
                    <div className="feature-center-image">
                        <img src="/images/about-collage.png" alt="SKV Destaque" className="main-img" />
                        <div className="gradient-overlay"></div>
                        <div className="skv-overlay-logo">
                            <img src="/images/about-logo.png" alt="SKV" />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="feature-col right">
                        <div className="feature-item">
                            <div className="feature-icon"><Truck size={40} strokeWidth={1.5} /></div>
                            <h3>AGILIDADE NA ENTREGA</h3>
                            <p>Comprometidos com prazos, entregamos seus produtos com rapidez e eficiência.</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon"><ShoppingCart size={40} strokeWidth={1.5} /></div>
                            <h3>VARIEDADE DE PRODUTOS</h3>
                            <p>Diversos produtos personalizados, adaptados para diferentes ocasiões e segmentos.</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* 3. Benefits Bar */}
            <section className="benefits-bar">
                <div className="container benefits-grid">
                    <div className="benefit-item">
                        <div className="benefit-icon"><TruckIcon size={32} /></div>
                        <span>FRETE PARA TODO O PAÍS</span>
                    </div>
                    <div className="benefit-item">
                        <div className="benefit-icon"><CreditCard size={32} /></div>
                        <span>PAGAMENTO SEGURO</span>
                    </div>
                    <div className="benefit-item">
                        <div className="benefit-icon"><DollarSign size={32} /></div>
                        <span>MELHOR CUSTO BENEFÍCIO</span>
                    </div>
                    <div className="benefit-item">
                        <div className="benefit-icon"><Headphones size={32} /></div>
                        <span>ATENDIMENTO PERSONALIZADO</span>
                    </div>
                </div>
            </section>

            {/* 4. Instagram Feed Section */}
            <section className="instagram-section">
                <div className="container">
                    <div className="instagram-header-styled">
                        <h2>
                            <span className="orange-text">Confira</span> nosso trabalho e
                            <span className="orange-text"> siga</span> nosso perfil no Instagram
                            <a href="https://www.instagram.com/skvcomunicacao/" target="_blank" rel="noopener noreferrer" className="insta-handle"> @skvcomunicacao</a>
                        </h2>
                    </div>

                    {/* Elfsight Widget Container */}
                    <div className="elfsight-app-18a687a1-6bdb-4006-b468-e946d7c47b99" data-elfsight-app-lazy></div>
                </div>
            </section>
        </div>
    );
};

export default About;
