import ContentHome from "./ContentHome";
import Intro from "./Intro";
import TypeVitamin from "./TypeVitamin";

const AllHome = () => {
    return (
        <div style={{marginTop: 75}}>
            <Intro></Intro>
            <ContentHome></ContentHome>
            <TypeVitamin></TypeVitamin>
        </div>
    );
};

export default AllHome;