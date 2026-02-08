import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, MessageCircle, ShieldCheck, Clock } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import products from '../products.json';
import './ProductDetail.css';

const ProductDetail = () => {
    const { slug } = useParams();
    const product = products.find(p => p.slug === slug);

    if (!product) {
        return (
            <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
                <h2>Produto não encontrado</h2>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '2rem' }}>Voltar para Início</Link>
            </div>
        );
    }

    // Related Products
    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    const handleImageError = (e) => {
        e.target.src = 'https://placehold.co/800x600?text=SKV+Produto';
    };

    return (
        <div className="product-detail-page">
            {/* Breadcrumbs */}
            <div className="breadcrumbs">
                <div className="container">
                    <Link to={`/${product.category === 'Comunicação Visual' ? 'comunicacao-visual' : 'confeccao'}`} className="breadcrumb-link">
                        <ArrowLeft size={16} /> Voltar para {product.category}
                    </Link>
                </div>
            </div>

            <div className="container detail-grid">
                {/* Image Column */}
                <div className="detail-image-wrapper">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="detail-image"
                        onError={handleImageError}
                    />
                </div>

                {/* Content Column */}
                <div className="detail-content">
                    <div className="detail-info-group">
                        <div className="detail-meta-row">
                            <span className="meta-label">Category</span>
                            <Link to={`/${product.category === 'Comunicação Visual' ? 'comunicacao-visual' : 'confeccao'}`} className="meta-link">
                                {product.category}
                            </Link>
                        </div>
                        {product.tags && (
                            <div className="detail-meta-row">
                                <span className="meta-label">Tags</span>
                                <span className="meta-tags">
                                    {product.tags.join(', ')}
                                </span>
                            </div>
                        )}
                    </div>

                    <h1 className="detail-title">{product.title}</h1>

                    <div className="detail-description">
                        {product.description.split('\n').map((line, i) => (
                            line.trim() && <p key={i}>{line}</p>
                        ))}
                    </div>

                    <div className="detail-cta-box">
                        <a
                            href={`https://wa.me/5511970392910?text=Olá, gostaria de um orçamento para: ${product.title}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-quote"
                        >
                            PEDIR ORÇAMENTO
                        </a>
                    </div>

                    <div className="trust-badges">
                        <div className="trust-item">
                            <div className="trust-icon-box">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="trust-icon"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                            </div>
                            <span className="trust-text">FRETE PARA TODO PAÍS</span>
                        </div>
                        <div className="trust-item">
                            <div className="trust-icon-box">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="trust-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                            </div>
                            <span className="trust-text">SEGURANÇA NA COMPRA</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Section */}
            {relatedProducts.length > 0 && (
                <section className="container related-section">
                    <h2 className="related-title">Produtos Relacionados</h2>
                    <div className="related-products-grid">
                        {relatedProducts.map(related => (
                            <ProductCard key={related.id} product={related} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProductDetail;
