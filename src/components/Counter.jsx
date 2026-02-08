import { useState, useEffect, useRef } from 'react';

const Counter = ({ end, duration = 2000, prefix = '', suffix = '', decimals = 0 }) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    let startTime = null;
                    const start = 0;

                    const animate = (currentTime) => {
                        if (!startTime) startTime = currentTime;
                        const progress = Math.min((currentTime - startTime) / duration, 1);

                        // Easing function (easeOutExpo)
                        const easeOut = 1 - Math.pow(2, -10 * progress);

                        const currentVal = start + (end - start) * easeOut;
                        setCount(currentVal);

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            setCount(end);
                        }
                    };

                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [end, duration]);

    return (
        <span ref={elementRef}>
            {prefix}{count.toFixed(decimals).replace('.', ',')}{suffix}
        </span>
    );
};

export default Counter;
