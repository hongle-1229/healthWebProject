import { useRef } from "react";
import Banner from "./Banner";
// import IntroProduct from "./IntroProduct"
import ProductHome from "./ProductHome";


const AllProduct = () => {
    const listRef = useRef<HTMLDivElement | null>(null);
    return (
        <div>
            <Banner listRef={listRef}></Banner>
            <ProductHome ref={listRef}></ProductHome>
        </div>
    );
};

export default AllProduct;