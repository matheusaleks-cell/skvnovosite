import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import './BrindesCatalog.css';

// We will load this data dynamically or from a separate file
import brindesData from '../brindes.json';

const BrindesCatalog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [visibleCount, setVisibleCount] = useState(24);
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Robust data loading
    const products = useMemo(() => {
        console.log("Brindes Data Raw:", brindesData);
        if (Array.isArray(brindesData)) return brindesData;
        if (brindesData && brindesData.value) return brindesData.value;
        return [];
    }, []);

    console.log("Parsed Products:", products.length);

    // Get unique categories
    const categories = useMemo(() => {
        const cats = new Set(products.map(p => p.subcategory || 'Outros'));
        return ['Todos', ...Array.from(cats).sort()];
    }, [products]);

    // Filter products based on search and category
    const filteredProducts = useMemo(() => {
        let result = products;

        if (selectedCategory !== 'Todos') {
            result = result.filter(p => (p.subcategory || 'Outros') === selectedCategory);
        }

        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(product =>
                product.title.toLowerCase().includes(lowerTerm) ||
                product.id.toString().includes(lowerTerm)
            );
        }
        return result;
    }, [searchTerm, selectedCategory, products]);

    // Pagination (Simple load more)
    const showMore = () => setVisibleCount(prev => prev + 24);

    return (
        <div className="brindes-catalog">
            <div className="catalog-controls">
                <div className="catalog-categories">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => {
                                setSelectedCategory(cat);
                                setVisibleCount(24); // Reset pagination
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="catalog-search-wrapper">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por código ou nome..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="catalog-search"
                    />
                </div>
            </div>

            {products.length === 0 ? (
                <div className="no-products">
                    <h3>Carregando catálogo...</h3>
                    <p>Se demorar, recarregue a página.</p>
                </div>
            ) : (
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
            )}

            {products.length > 0 && visibleCount < filteredProducts.length && (
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
