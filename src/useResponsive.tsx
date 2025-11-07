import { useEffect, useState } from "react";

function useResponsive(){
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(()=>{
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return ()=> window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = width <= 768;
    return {isMobile};
}

export default useResponsive;