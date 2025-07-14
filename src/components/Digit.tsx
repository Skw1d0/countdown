interface DigitParams {
    value: number;
    label: string;
    glowEffect: "none" | "purple" | "yellow"
}

const Digit = (props: DigitParams) => {
    return (
        <div className={"card " + (props.glowEffect ? props.glowEffect : "")}>
            <span className="card-label ">{props.label}</span>
            {props.value}
        </div>
    )
}

export default Digit;