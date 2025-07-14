import "./App.css";
import {useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import Digit from "./components/Digit.tsx";

function App() {
    const [to, setTo] = useState<Dayjs | null>(null);
    const [years, setYears] = useState(0);
    const [months, setMonths] = useState(0);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [glowEffect, setGlowEffect] = useState<"none" | "purple" | "yellow">("none");


    const getDifferenceString = (
        from: Dayjs | null,
        to: Dayjs | null
    ): {
        years: number;
        months: number;
        days: number;
        hours: number;
        minutes: number;
    } => {
        if (!from || !to)
            return {
                years: 0,
                months: 0,
                days: 0,
                hours: 0,
                minutes: 0,
            };

        let start = from;
        const end = to;

        const years = end.diff(start, "year");
        start = start.add(years, "year");

        const months = end.diff(start, "month");
        start = start.add(months, "month");

        const days = end.diff(start, "day");
        start = start.add(days, "day");

        const hours = end.diff(start, "hour");
        start = start.add(hours, "hour");

        const minutes = end.diff(start, "minute");

        return {years, months, days, hours, minutes};
    };

    const setNewTimerVariables = () => {
        const {years, months, days, hours, minutes} = getDifferenceString(
            dayjs(),
            !to ? null : to,
        );

        setYears(years);
        setMonths(months);
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
    };

    const handleChangeTo = (value: string) => {
        const newTo = value === "" ? null : dayjs(value);
        setTo(newTo);
    };

    const handleChangeGlowEffect = (value: string) => {
        if (value === "none") {
            setGlowEffect("none");
            return;
        } else if (value === "purple") {
            setGlowEffect("purple");
            return;
        } else if (value === "yellow") {
            setGlowEffect("yellow");
            return;
        }

        setGlowEffect("none");
    }

    useEffect(() => {
        setNewTimerVariables();
    }, [to]);

    useEffect(() => {
        const interval = setInterval(() => {
            setNewTimerVariables();
        }, 1000);

        return () => clearInterval(interval);
    }, [to]);

    return (
        <>
            {to && (
                <title>{`${years}y ${months}m ${days}d ${hours}h ${minutes}m`}</title>
            )}
            <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                <input
                    style={{maxWidth: "150px"}}
                    type="date"
                    onChange={(e) => handleChangeTo(e.target.value)}
                    value={!to ? "" : to.format("YYYY-MM-DD")}
                />
                <select name="glow" value={glowEffect}
                        onChange={(e) => handleChangeGlowEffect(e.target.value)}
                        style={{width: "150px"}}>
                    <option value="none">kein Effect</option>
                    <option value="purple">violett</option>
                    <option value="yellow">orange</option>
                </select>
            </div>
            <div className="timer-container">
                <div className="card-container">
                    <Digit value={years} label={"Jahre"} glowEffect={glowEffect}/>
                    <Digit value={months} label={"Monate"} glowEffect={glowEffect}/>
                    <Digit value={days} label={"Tage"} glowEffect={glowEffect}/>
                </div>
                <div className="card-container">
                    <Digit value={hours} label={"Stunden"} glowEffect={glowEffect}/>
                    <Digit value={minutes} label={"Minuten"} glowEffect={glowEffect}/>
                </div>
            </div>
        </>
    );
}

export default App;
