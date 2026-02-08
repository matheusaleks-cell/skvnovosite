import { useParams, useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import BrindesCatalog from '../components/BrindesCatalog';
import products from '../products.json';
import './Category.css';

const Category = () => {
    const location = useLocation();
    const pathname = location.pathname;

    // Route Configuration
    const categoryConfig = {
        '/comunicacao-visual': {
            name: 'Comunicação Visual',
            title: <>Comunicação visual que <span className="text-highlight">valoriza sua marca</span> em cada espaço.</>,
            desc: 'Somos especialistas em comunicação visual que valoriza a identidade da sua empresa em cada material. Criamos e produzimos placas de sinalização, adesivos, lonas, banners, windbanners, além de envelopamento de veículos e outros itens personalizados.',
            heroImage: '/images/products/windbanner-full.png',
            heroAlt: 'Comunicação Visual SKV',
            list: [
                'Entrega e instalação em toda <strong>Grande São Paulo</strong>.'
            ],
            buttonText: 'SOLICITAR ORÇAMENTO',
            buttonLink: 'https://wa.me/5511970392910'
        },
        '/confeccao': {
            name: 'Confecção',
            title: <><span className="text-highlight">Do tecido à personalização:</span> tudo para vestir sua marca com excelência.</>,
            desc: 'Nossa linha de confecção é ideal para quem busca qualidade, durabilidade e excelente custo-benefício. Produzimos camisetas, polos, uniformes, calças, blusas de moletom e aventais com tecidos de alto padrão como algodão, malha PV, dry fit, brim, sarja e outros.',
            heroImage: '/images/products/moletom.png',
            heroAlt: 'Confecção SKV',
            list: [
                'Pedido mínimo de <strong>10 peças</strong>.',
                '<strong>Entrega em todo Brasil.</strong>',
                'Temos compromisso com seu prazo.'
            ],
            buttonText: 'SOLICITAR ORÇAMENTO',
            buttonLink: 'https://wa.me/5511970392910'
        },
        '/campanhas-politicas': {
            name: 'Campanhas Políticas',
            title: <><span className="text-highlight">Visibilidade total</span> para sua campanha eleitoral.</>,
            desc: 'Material completo para sua campanha: WindBanner, Bandeiras, Adesivo perfurado, Santinhos, Praguinhas, Adesivo Para-choque e muito mais. Garantimos rapidez na produção para acompanhar o ritmo da eleição.',
            heroImage: '/images/products/politico-carousel.png?v=2', // Matched with Carousel
            heroAlt: 'Campanhas Políticas',
            list: [
                'Impressão de <strong>Alta Velocidade</strong>.',
                'Material conforme legislação eleitoral.',
                'Entrega expressa.'
            ],
            buttonText: 'SOLICITAR ORÇAMENTO',
            buttonLink: 'https://wa.me/5511970392910'
        },
        '/brindes': {
            name: 'Brindes',
            title: <>Brindes Corporativos<br />que marcam presença.</>,
            desc: 'Copos, canecas, chaveiros e diversos itens personalizados para sua marca. O brinde ideal para fidelizar clientes e valorizar colaboradores.',
            heroImage: '/images/brindes-hero.jpg?v=3',
            heroAlt: 'Brindes Personalizados',
            list: [
                'Diversas opções de personalização.',
                'Atendemos pequenas e grandes tiragens.',
                'Excelente acabamento.'
            ],
            buttonText: 'FALAR COM CONSULTOR',
            buttonLink: 'https://wa.me/5511970392910'
        },
        '/produtos': {
            name: 'Todos',
            title: 'Catálogo Completo',
            desc: 'Confira nossa linha completa de soluções em comunicação visual e confecção.',
            heroImage: null,
            buttonText: 'FALAR COM CONSULTOR',
            buttonLink: 'https://wa.me/5511970392910'
        }
    };

    const currentConfig = categoryConfig[pathname] || categoryConfig['/produtos'];

    // Filter Products
    const filteredProducts = currentConfig.name === 'Todos'
        ? products
        : products.filter(p => p.category === currentConfig.name);

    return (
        <div className="category-page">
            <header className="category-header">
                <div className="container category-hero">
                    <div className="category-content">
                        <h1 className="category-title">{currentConfig.title}</h1>
                        <p className="category-lead">{currentConfig.desc}</p>

                        {currentConfig.list && (
                            <ul className="category-list">
                                {currentConfig.list.map((item, index) => (
                                    <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
                                ))}
                            </ul>
                        )}

                        <a href={currentConfig.buttonLink} className="btn btn-quote" style={{ marginTop: '2rem' }} target="_blank" rel="noopener noreferrer">
                            {currentConfig.buttonText}
                        </a>
                    </div>

                    {currentConfig.heroImage && (
                        <div className="category-image-wrapper">
                            <img
                                src={currentConfig.heroImage}
                                alt={currentConfig.heroAlt}
                                className="category-hero-image"
                            />
                        </div>
                    )}
                </div>
            </header>

            <section className="container">
                {pathname.includes('/brindes') ? (
                    <BrindesCatalog />
                ) : (
                    filteredProducts.length > 0 ? (
                        <div className="category-grid">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-products">
                            <p>Em breve novos produtos nesta categoria.</p>
                        </div>
                    )
                )}
            </section>
        </div>
    );
};

export default Category;
