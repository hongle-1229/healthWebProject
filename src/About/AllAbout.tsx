import ContentAbout from "./ContentAbout";
import Counter from "./Counter";
import IntroAbout from "./IntroAbout";
import OurTeam from "./OurTeam";

const AllAbout = () => {
    return (
        <div>
            <IntroAbout></IntroAbout>
            <ContentAbout></ContentAbout>
            <Counter></Counter>
            <OurTeam></OurTeam>
        </div>
    );
};

export default AllAbout;