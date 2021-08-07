import React, { useEffect } from "react";
import FlipCountdown from "@rumess/react-flip-countdown";
import "../css/Timer.scss";

export default function Timer({ setTransition }) {
    // let date = new Date("1 Jan 2022");  // If you want to fire it up in 1 jan 2022
    let date = new Date();
    let dayArray = date.toLocaleDateString().split("/");
    let day = `${dayArray[2]}-${dayArray[0]}-${dayArray[1]}`;
    // time = time[0];
    let time = `${date.getHours()}:${date.getMinutes()}:${
        date.getSeconds() + 11
    }`;

    let gradientArray = [
        "linear-gradient(180deg, #2f6ed3 5%, #5095e4 20%, #5095e4 60%, #2f6ed3 95%)",
        "radial-gradient(circle at 50% 100%, #e82d74, #e82d74, #4380d3, #32c5fe)",
        "radial-gradient(circle at 0 60%, #ff006c, transparent), radial-gradient(circle at 70% 0, aqua, transparent), radial-gradient(circle at 70% 70%, yellow, yellow, transparent)",
        "linear-gradient(90deg, #405efa, #e2497f)",
        "linear-gradient(to right, #ee0979, #ff6a00)",
        "linear-gradient(to right, #0099f7, #f11712)",
        "radial-gradient(circle at 73.72% 16.59%, #7e75ff, transparent 67%),radial-gradient(circle at 57.61% 47.34%, #73ffab, transparent 61%),radial-gradient(circle at 16.54% 29.68%, #ffff4a, transparent 58%),radial-gradient(circle at 13.47% 89.5%, #ff94fb, transparent 67%),radial-gradient(circle at 92.61% 88.74%, #ff722b, transparent 61%),radial-gradient(circle at 50% 50%, #ff52dc, #ff52dc 100%)",
        "radial-gradient(circle at 8.71% 13.39%, #7474BF, transparent 100%),radial-gradient(circle at 98.02% 70.02%, #348AC7, transparent 100%),radial-gradient(circle at 7.47% 87.98%, #00ffee, transparent 100%),radial-gradient(circle at 50% 50%, #ff52dc, #ff52dc 100%)",
        "radial-gradient(circle at 6.08% 63.62%, #50135c, transparent 100%),radial-gradient(circle at 98.02% 29.98%, #ff4242, transparent 100%),radial-gradient(circle at 50% 50%, #ff52dc, #ff52dc 100%)",
        "radial-gradient(circle at 1.98% 31.05%, #00c6ff, transparent 100%),radial-gradient(circle at 98.02% 10.05%, #0072ff, transparent 100%),radial-gradient(circle at 50% 50%, #ff52dc, #ff52dc 100%)",
        "radial-gradient(circle at 1.98% 5.02%, #D38312, transparent 100%),radial-gradient(circle at 98.02% 28.01%, #A83279, transparent 100%),radial-gradient(circle at 50% 50%, #ff52dc, #ff52dc 100%)",
    ];

    useEffect(() => {
        let container = document.querySelector(".timer");

        for (let i = 0; i < gradientArray.length - 1; i++) {
            setTimeout(() => {
                container.style.background = gradientArray[i];
                console.log(container.style.background);
            }, i * 1000 + 300);
        }
        setTimeout(() => {
            setTransition(true);
        }, 13000);
    }, []);
    return (
        <div className="timer">
            <p>New Year Is Coming!!!</p>
            <h1>💥{new Date().getFullYear() + 1}💥</h1>

            <FlipCountdown
                hideYear
                theme="dark"
                size="medium"
                titlePosition="bottom"
                monthTitle="Months"
                dayTitle="Days"
                hourTitle="Hours"
                minuteTitle="Minutes"
                secondTitle="Seconds"
                endAtZero
                endAt={`${day} ${time}`} // Date/Time
            />
        </div>
    );
}
