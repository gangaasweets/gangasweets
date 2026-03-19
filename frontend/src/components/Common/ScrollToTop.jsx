import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const scroll = () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
        };
        
        const animationId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationId);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
