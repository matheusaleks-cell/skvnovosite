import { ArrowRight, Box, Layout, Printer, Users, Clock, Headset, Smile, CheckCircle, ThumbsUp, ShieldCheck, MessageCircle, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Counter from '../components/Counter';
import CategoryCarousel from '../components/CategoryCarousel';
import products from '../products.json';
import './Home.css';

const Home = () => {
    // Select specific products that represent the company's capabilities well
    const highlightProducts = products.filter(p =>
        p.title.toLowerCase().includes('fachada') ||
        p.title.toLowerCase().includes('adesivo') ||
        p.title.toLowerCase().includes('uniforme') ||
        p.title.toLowerCase().includes('banner')
    ).slice(0, 6); // Balanced grid

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container hero-content">
                    <span className="hero-tag">Comunicação Visual & Confecção</span>
                    <h1 className="hero-heading">
                        Agilidade e Qualidade na <br />
                        <span className="text-gradient">Impressão</span>
                    </h1>
                    <p className="hero-lead">
                        Há mais de 18 anos entregando qualidade, agilidade e resultado em nossos materiais. Conheça nossos produtos clicando abaixo.
                    </p>
                    <div className="hero-actions">
                        <Link to="/comunicacao-visual" className="btn btn-primary">
                            Ver Produtos
                        </Link>
                        <Link to="/confeccao" className="btn btn-outline">
                            Ver Confecção
                        </Link>
                    </div>
                </div>
            </section>

            {/* Client Trust Bar */}
            <section className="clients-bar animate-on-scroll fade-in">
                <div className="container">
                    <p className="clients-label">Clientes que confiam em nós:</p>
                    <div className="clients-grid">
                        <img src="/images/clients/itau.png" alt="Itaú" className="client-logo-img animate-on-scroll fade-up delay-100" style={{ height: '35px', filter: 'grayscale(100%)', opacity: 0.7 }} />
                        <img src="/images/clients/sindicato.png" alt="Sindicato" className="client-logo-img animate-on-scroll fade-up delay-200" style={{ height: '40px', filter: 'grayscale(100%)', opacity: 0.7 }} />
                        <img src="/images/clients/imigrantes.png" alt="Imigrantes" className="client-logo-img animate-on-scroll fade-up delay-300" style={{ height: '40px', filter: 'grayscale(100%)', opacity: 0.7 }} />
                        <img src="/images/clients/tirolez.svg" alt="Tirolez" className="client-logo-img animate-on-scroll fade-up delay-400" style={{ height: '45px', filter: 'grayscale(100%)', opacity: 0.7 }} />
                    </div>
                </div>
            </section>

            {/* Features Grid (Compromisso) */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header animate-on-scroll fade-up">
                        <h2 className="section-title">COMPROMISSO COM SUA MARCA, <br /> EXCELÊNCIA EM CADA DETALHE.</h2>
                        <p className="section-description">
                            Esteja ao lado de um parceiro comprometido, que valoriza a sua imagem e entende a necessidade de ter produtos com qualidade superior, preços justos e que seja responsável com prazos.
                        </p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card animate-on-scroll fade-up delay-100">
                            <div className="feature-icon-circle"><Clock size={28} /></div>
                            <h3>PRAZO CUMPRIDO À RISCA</h3>
                            <p>Entrega no dia certo, como combinado. Sempre.</p>
                        </div>
                        <div className="feature-card animate-on-scroll fade-up delay-200">
                            <div className="feature-icon-circle"><Headset size={28} /></div>
                            <h3>SUPORTE TÉCNICO</h3>
                            <p>Ajudamos você com arquivos, layouts e materiais.</p>
                        </div>
                        <div className="feature-card animate-on-scroll fade-up delay-300">
                            <div className="feature-icon-circle"><Smile size={28} /></div>
                            <h3>ATENDIMENTO HUMANIZADO</h3>
                            <p>Você fala com pessoas reais, que se importam com o seu resultado.</p>
                        </div>
                        <div className="feature-card animate-on-scroll fade-up delay-100">
                            <div className="feature-icon-circle"><CheckCircle size={28} /></div>
                            <h3>MATERIAIS 100% DE QUALIDADE</h3>
                            <p>Trabalhamos apenas com insumos que garantem durabilidade.</p>
                        </div>
                        <div className="feature-card animate-on-scroll fade-up delay-200">
                            <div className="feature-icon-circle"><ThumbsUp size={28} /></div>
                            <h3>MAIS DE 18 ANOS DE EXPERIÊNCIA</h3>
                            <p>Tradição, confiança e evolução constante no que fazemos.</p>
                        </div>
                        <div className="feature-card animate-on-scroll fade-up delay-300">
                            <div className="feature-icon-circle"><ShieldCheck size={28} /></div>
                            <h3>RESPONSABILIDADE COM SUA IMAGEM</h3>
                            <p>Respeitamos sua identidade visual em cada detalhe.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Corporate Pillars (Quick Access) */}
            <section className="container animate-on-scroll fade-up">
                <div style={{ marginTop: '4rem' }}>
                    <CategoryCarousel />
                </div>
            </section>

            {/* Catalog Preview */}
            <section className="catalog-section" style={{ background: 'var(--bg-main)' }}>
                <div className="container">
                    <div className="section-header animate-on-scroll fade-up">
                        <span className="section-tag">Nossa Produção</span>
                        <h2 className="section-title">Confira Nossos Produtos</h2>
                        <p className="section-description">
                            Sinalização, marketing visual e itens personalizados para sua empresa.
                        </p>
                    </div>

                    <div className="catalog-grid">
                        {highlightProducts.map((product, index) => (
                            <div key={product.id} className={`animate-on-scroll fade-up delay-${(index % 3 + 1) * 100}`}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '4rem' }} className="animate-on-scroll fade-in delay-300">
                        <Link to="/produtos" className="btn btn-outline">
                            Visualizar Todo o Catálogo
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section (Nossos Números) */}
            <section className="stats-section">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 className="section-title animate-on-scroll fade-up">Nossos Números</h2>
                    <div className="animate-on-scroll scale-in delay-200" style={{ width: '100px', height: '4px', background: 'var(--border-color)', margin: '0 auto 4rem' }}></div>

                    <div className="stats-home-grid">
                        <div className="stat-home-item animate-on-scroll fade-up delay-100">
                            <span className="stat-number">
                                <Counter end={18} prefix="+" />
                            </span>
                            <span className="stat-label">Anos de Atuação no Mercado</span>
                        </div>
                        <div className="stat-home-item animate-on-scroll fade-up delay-200">
                            <span className="stat-number">
                                <Counter end={4} prefix="+" suffix="mil" />
                            </span>
                            <span className="stat-label">Clientes Atendidos</span>
                        </div>
                        <div className="stat-home-item animate-on-scroll fade-up delay-300">
                            <span className="stat-number">
                                <Counter end={6.3} prefix="+" suffix="mi" decimals={1} />
                            </span>
                            <span className="stat-label">Peças Produzidas</span>
                        </div>
                        <div className="stat-home-item animate-on-scroll fade-up delay-400">
                            <span className="stat-number">
                                <Counter end={8} prefix="+" suffix="mil" />
                            </span>
                            <span className="stat-label">Projetos Visuais</span>
                        </div>
                    </div>

                    <div className="testimonial-box animate-on-scroll scale-in delay-500">
                        <p className="testimonial-text">
                            "Já fizemos diversos projetos com a SKV e sempre fomos atendidos com agilidade e respeito. Os produtos têm excelente durabilidade e o suporte é excelente."
                        </p>
                        <p className="testimonial-author">PAULO ROBERTO</p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-home-section">
                <div className="container contact-home-grid animate-on-scroll slide-in-left">
                    <div className="contact-info-box">
                        <h3 className="contact-home-title">VENHA NOS CONHECER</h3>
                        <p className="contact-home-address">
                            Rua das Orquídeas, 748 – Vila Marchi<br />
                            Assunção – São Bernardo do Campo – SP<br />
                            CEP 09810-390
                        </p>

                        <h3 className="contact-home-title mt-lg">CONTATO</h3>

                        <div className="contact-home-list">
                            <a href="https://wa.me/5511970392910" className="contact-link"><MessageCircle size={18} /> +55 11 97039-2910</a>
                            <a href="tel:+551143561846" className="contact-link"><Phone size={18} /> +55 11 4356-1846</a>
                            <a href="mailto:comercial@silkvision.com.br" className="contact-link"><Mail size={18} /> comercial@silkvision.com.br</a>
                        </div>

                        <h3 className="contact-home-title mt-lg">REDES SOCIAIS</h3>
                        <div className="contact-social-icons">
                            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Facebook size={24} /></a>
                            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Instagram size={24} /></a>
                        </div>
                    </div>
                    <div className="contact-image-box">
                        <img src="https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=2070&auto=format&fit=crop" alt="Produção SKV" className="contact-image-cover" />
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
