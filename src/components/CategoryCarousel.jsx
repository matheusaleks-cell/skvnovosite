import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import './CategoryCarousel.css';

const CategoryCarousel = () => {
    const scrollRef = useRef(null);

    const categories = [
        {
            title: "Comunicação Visual",
            desc: "Adesivos, Banners, Faixas e muito mais para divulgar sua marca.",
            link: "/comunicacao-visual",
            image: "/images/products/fachadas.jpg?v=2",
            cta: "Ver Opções"
        },
        {
            title: "Confecção",
            desc: "Uniformes, Camisetas Promocionais e Aventais personalizados.",
            link: "/confeccao",
            image: "/images/products/confeccao-carousel.jpg?v=2",
            cta: "Ver Modelos"
        },
        {
            title: "Materiais Políticos",
            desc: "Santinhos, Bandeiras, Praguinhas e tudo para sua campanha eleitoral.",
            link: "/campanhas-politicas",
            image: "/images/products/politico-carousel.png?v=2",
            cta: "Ver Opções"
        },
        {
            title: "Brindes Personalizados",
            desc: "Copos, Canecas, Chaveiros e itens para fidelizar seu cliente.",
            link: "/brindes",
            image: "/images/products/brindes-carousel.png?v=2",
            cta: "Acessar Catálogo"
        }
    ];

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 350; // Approximated card width + gap
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="carousel-wrapper">
            <button className="carousel-nav-btn left" onClick={() => scroll('left')}>
                <ChevronLeft size={24} />
            </button>

            <div className="carousel-container" ref={scrollRef}>
                {categories.map((cat, index) => (
                    <Link to={cat.link} key={index} className="pillar-card carousel-card">
                        <div className="pillar-image-container">
                            <img
                                src={cat.image}
                                alt={cat.title}
                                className="pillar-image"
                                style={cat.style || {}}
                            />
                        </div>
                        <div className="pillar-content-wrapper">
                            <h3 className="pillar-title">{cat.title}</h3>
                            <p className="pillar-description">{cat.desc}</p>
                            <span className="pillar-link">
                                {cat.cta} <ArrowRight size={18} />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            <button className="carousel-nav-btn right" onClick={() => scroll('right')}>
                <ChevronRight size={24} />
            </button>
        </div>
    );
};

export default CategoryCarousel;
