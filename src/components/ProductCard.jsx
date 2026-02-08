
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const handleImageError = (e) => {
        e.target.src = 'https://placehold.co/600x400?text=SKV+Produto';
    };

    return (
        <Link to={`/produto/${product.slug}`} className="product-card">
            <div className="product-image-container">
                <img
                    src={product.image}
                    alt={product.title}
                    onError={handleImageError}
                    className="product-image"
                />
                <div className="product-overlay">
                    <span className="btn-icon">
                        <ArrowRight size={20} />
                    </span>
                </div>
            </div>
            <div className="product-content">
                <span className="product-category">{product.category}</span>
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">
                    {product.description.substring(0, 80)}...
                </p>
                <span className="link-text">Ver Detalhes</span>
            </div>
        </Link>
    );
};

export default ProductCard;
