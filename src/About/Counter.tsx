import { useEffect } from "react";
import "../style/Counter.css";
import "animate.css";
const Counter = () => {
    useEffect(() => {
        const counters = document.querySelectorAll('.counter-number');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target as HTMLElement;
                    const target = Number(counter.getAttribute('data-target'));
                    let count = 0;
                    const interval = setInterval(() => {
                        count += 1;
                        counter.textContent = count.toString();
                        if (count >= target) {
                            clearInterval(interval);
                            counter.textContent = target.toString();
                        }
                    }, 10);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }, []);
    return (
        <div>
            {/* ++ */}
            <div className="stat-section">
                <h1 className="stat-title animate__animated animate__bounceInLeft">Thống kê</h1>
                <div className="counter-wrapper">
                    <div className="counter">
                        <h2 className="counter-number" data-target="350">0</h2>
                        <p>Khách hàng hài lòng</p>
                    </div>

                    <div className="counter">
                        <h2 className="counter-number" data-target="50">0</h2>
                        <p>Đội ngũ</p>
                    </div>

                    <div className="counter">
                        <h2 className="counter-number" data-target="200">0</h2>
                        <p>Sản phẩm</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Counter;