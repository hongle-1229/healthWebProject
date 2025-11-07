import { useRef } from "react";
import ContentBlog from "./ContentBlog";
import IntroBlog from "./IntroBlog"

const AllBlog = () => {
    const listRef = useRef<HTMLDivElement|null>(null);
    return (
        <div style={{marginTop: 75}}>
            <IntroBlog listRef={listRef}></IntroBlog>
            <ContentBlog ref={listRef}></ContentBlog>
        </div>
    );
};

export default AllBlog;