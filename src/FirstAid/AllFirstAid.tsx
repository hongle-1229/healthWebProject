import Banner from "./Banner";
import { useRef } from "react"; 
import FirstAidPage from "./FirstAidPage";

const AllFirstAid = () => {
    const listRef = useRef<HTMLDivElement | null>(null);
    return (
        <div style={{marginTop: 75}}>
            <Banner listRef={listRef}></Banner>
            <FirstAidPage ref={listRef}></FirstAidPage>
        </div>
    );
};

export default AllFirstAid;