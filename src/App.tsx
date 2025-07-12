import "./App.css";
import {useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";

function App() {
    const [to, setTo] = useState<Dayjs | null>(null);
    const [years, setYears] = useState(0);
    const [months, setMonths] = useState(0);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);

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

        // if (!newTo.isAfter(dayjs())) {
        //     alert("Datumswert muss nach dem heutigem Datum sein.");
        //     return;
        // }

        setTo(newTo);
    };

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
            <input
                style={{maxWidth: "150px"}}
                type="date"
                onChange={(e) => handleChangeTo(e.target.value)}
                value={!to ? "" : to.format("YYYY-MM-DD")}
            />
            <div className="timer-container">
                <div className="card-container">
                    <p className="card">
                        <span className="card-label">Jahre</span>
                        {years}
                    </p>
                    <p className="card">
                        <span className="card-label">Monate</span>
                        {months}
                    </p>
                    <p className="card" style={{marginRight: "10px"}}>
                        <span className="card-label">Tage</span>
                        {days}
                    </p>
                </div>
                <div className="card-container">
                    <p className="card">
                        <span className="card-label">Stunden</span>
                        {hours}
                    </p>
                    <p className="card">
                        <span className="card-label">Minuten</span>
                        {minutes}
                    </p>
                </div>
            </div>
        </>
    );
}

export default App;
