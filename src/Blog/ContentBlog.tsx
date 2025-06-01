import axios from "axios";
import { useEffect, useState } from "react";
import "../style/ContentBlog.css"

interface News {
    NewsTitle: string;
    ImageNews: string;
    NewsDescription: string;
    SourceNews: string;
    PublishAt: string;
}

const ContentBlog = () => {
    const [blog, setBlog] = useState<News[]>([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/news")
            .then((response) => {
                setBlog(response.data);
            })
            .catch((error) => console.log("Lỗi lấy bài viết: ", error));
    }, []);

    return (
        <div className="blog-container">
            {blog.map((item, index) => (
                <div className="blog-card" key={index}>
                    <img src={item.ImageNews} alt="news" className="blog-img" />
                    {/* <span className="blog-category">Covid</span> */}
                    <h2 className="blog-title">{item.NewsTitle}</h2>
                    <p className="blog-desc">{item.NewsDescription}</p>
                    <a className="blog-readmore" href={item.SourceNews} target="_blank" rel="noopener noreferrer">Read more</a>
                    <a style={{textDecoration: "none"}} href={item.SourceNews}><button className="blog-button">Read more <span>→</span></button></a>
                </div>
            ))}
        </div>
    );
};

export default ContentBlog;
