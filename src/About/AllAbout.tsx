import { useRef } from "react";
import ContentAbout from "./ContentAbout";
import Counter from "./Counter";
import IntroAbout from "./IntroAbout";
import OurTeam from "./OurTeam";

const AllAbout = () => {
    const listRef = useRef<HTMLDivElement | null>(null);
    return (
        <div style={{marginTop: 75}}>
            <IntroAbout listRef={listRef}></IntroAbout>
            <ContentAbout ref={listRef}></ContentAbout>
            <Counter></Counter>
            <OurTeam></OurTeam>
        </div>
    );
};

export default AllAbout;