import React, { useState, useMemo } from 'react';
import './BrindesCatalog.css';

// We will load this data dynamically or from a separate file
import brindesData from '../brindes.json';

const BrindesCatalog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [visibleCount, setVisibleCount] = useState(24);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Robust data loading: handle array (production) or object wrapper (debug/PowerShell)
    const products = Array.isArray(brindesData) ? brindesData : (brindesData.value || []);

    // Filter products based on search
    const filteredProducts = useMemo(() => {
        if (!searchTerm) return products;
        const lowerTerm = searchTerm.toLowerCase();
        return products.filter(product =>
            product.title.toLowerCase().includes(lowerTerm) ||
            product.id.toString().includes(lowerTerm)
        );
    }, [searchTerm, products]);

    // Pagination (Simple load more)
    const showMore = () => setVisibleCount(prev => prev + 24);

    return (
        <div className="brindes-catalog">
            <div className="catalog-controls">
                <input
                    type="text"
                    placeholder="Buscar por código..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="catalog-search"
                />
            </div>

            <div className="catalog-grid">
                {filteredProducts.slice(0, visibleCount).map(product => (
                    <div
                        key={product.id}
                        className="catalog-item"
                        onClick={() => setSelectedProduct(product)}
                    >
                        <div className="catalog-img-wrapper">
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                loading="lazy"
                            />
                            {product.images.length > 1 && (
                                <span className="variant-badge">+{product.images.length - 1}</span>
                            )}
                        </div>
                        <div className="catalog-info">
                            <span className="product-code">{product.title.replace(/ \d{4,}$/, '')}</span>
                        </div>
                    </div>
                ))}
            </div>

            {visibleCount < filteredProducts.length && (
                <button onClick={showMore} className="btn btn-outline btn-load-more">
                    Carregar Mais
                </button>
            )}

            {/* Modal for details/variants */}
            {selectedProduct && (
                <div className="catalog-modal-overlay" onClick={() => setSelectedProduct(null)}>
                    <div className="catalog-modal" onClick={e => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setSelectedProduct(null)}>×</button>
                        <h3>{selectedProduct.title.replace(/ \d{4,}$/, '')}</h3>
                        <div className="modal-gallery">
                            {selectedProduct.images.map((img, idx) => (
                                <img key={idx} src={img} alt={`${selectedProduct.title} - ${idx}`} />
                            ))}
                        </div>
                        <a
                            href={`https://wa.me/5511970392910?text=Olá, tenho interesse no brinde código: ${selectedProduct.id}`}
                            className="btn btn-primary btn-whatsapp"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Solicitar Orçamento
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrindesCatalog;
