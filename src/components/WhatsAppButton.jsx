
import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
    const [messageIndex, setMessageIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const messages = [
        "Fale com a nossa equipe 👋",
        "Precisa de ajuda? Nos chame!",
        "Orçamento rápido aqui! ⚡",
        "Dúvidas? Estamos online 🟢"
    ];

    useEffect(() => {
        // Show after 2 seconds
        const timer = setTimeout(() => setIsVisible(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 4000); // Rotate every 4 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`whatsapp-float-container ${isVisible ? 'visible' : ''}`}>
            <div className="whatsapp-message-bubble">
                <span className="whatsapp-message-text">
                    {messages[messageIndex]}
                </span>
            </div>
            <a
                href="https://wa.me/5511970392910"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-float-btn"
                aria-label="Falar no WhatsApp"
            >
                <div className="whatsapp-icon-pulse"></div>
                <MessageCircle size={32} strokeWidth={2.5} />
            </a>
        </div>
    );
};

export default WhatsAppButton;
