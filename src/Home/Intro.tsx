import "../style/Intro.css"
import 'animate.css'
import {ArrowRightOutlined} from '@ant-design/icons'
const Intro = () => {
    return (
        <div className="all-bg">
            <div className="bg-intro-1">
                <img className="animate__animated animate__fadeInUp" src="https://lh3.googleusercontent.com/i33KHsuWnOLQYNW5yb7ylx7Y0WNkCWV8SnQR0Dmq86aOmyOCVTxXtLcOOeHUQGK-JoYvEVkhypqcM4p8dMu45L-So0rmnewbdQ=rw-w1076" alt="" style={{width: "1200px"}}/>
            </div>
            <div className="bg-intro-2">
                <div className="left animate__animated animate__fadeInLeft">
                    <h2 style={{fontWeight:"bold"}} className="maven-pro-uniquifier">Get Your Minerals & <br /> Vitamins</h2>
                    <p className="maven-pro-uniquifier" style={{fontSize: "16px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing <br /> elit. Ut elit tellus, luctus nec ullamcorper mattis, <br /> pulvinar dapibus leo.</p>
                    <button className="maven-pro-uniquifier" style={{color: "white", fontSize: "16px", fontWeight: "bold"}}>Explore <ArrowRightOutlined style={{paddingLeft: "7px"}} /></button>
                </div>
                <div className="right animate__animated animate__zoomIn">
                    <img src="https://lh3.googleusercontent.com/FjKbo8_FYoyNsnX75LAtTuoc-ZdYxrspOQJO2I-zsEwbQc3DL0T235Eli31fhT09WY77dBUniVBbW-XYaM3hO5HXLrs_FZyDGw=rw-w742" alt="" style={{height: "450px", width: "380px"}} />
                </div>
            </div>
        </div>
    );
};

export default Intro;