import "../style/ContentAbout.css"
import "animate.css"
const ContentAbout = () => {
    
    return (
        <div>
            {/* block 1 */}
            <div style={{ display: "flex" }}>
                <div className="block-left-1">
                    <img src="https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL2JlY29taW5nLWRvY3Rvci5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjgyOH19fQ==" alt="image" />
                </div>
                <div className="block-right-1">
                    <h1 className="animate__animated animate__shakeX" style={{ fontWeight: "bold" }}>#1 At Reliability In Terms Of Appointments</h1>
                    <h3 style={{ lineHeight: "1.5" }}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</h3>
                </div>
            </div>
            {/* block 2 */}
            <div style={{ display: "flex" }}>
                <div className="block-left-2">
                    <h1 className="animate__animated animate__shakeX" style={{ fontWeight: "bold" }}>#1 At Reliability In Terms Of Appointments</h1>
                    <h3 style={{ lineHeight: "1.5" }}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</h3>
                </div>
                <div className="block-right-2">
                    <img src="https://east.optum.com/wp-content/uploads/2024/04/PCP-followup_708x568.jpg" alt="image" />
                </div>
            </div>
        </div>
    );
};

export default ContentAbout;