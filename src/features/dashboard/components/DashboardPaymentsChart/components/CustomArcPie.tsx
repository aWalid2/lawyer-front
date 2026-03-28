

const polarToCartesian = (cx: number, cy: number, radius: number, angleInDegrees: number) => {
    const radian = (Math.PI / 180) * angleInDegrees;
    return {
        x: cx + radius * Math.cos(radian),
        y: cy - radius * Math.sin(radian),
    };
};

export const CustomArcPie = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    const radius = (innerRadius + outerRadius) / 2;
    const strokeWidth = outerRadius - innerRadius;

    if (Math.abs(startAngle - endAngle) >= 360) {
        return <circle cx={cx} cy={cy} r={radius} fill="none" stroke={fill} strokeWidth={strokeWidth} />;
    }

    const start = polarToCartesian(cx, cy, radius, startAngle);
    const end = polarToCartesian(cx, cy, radius, endAngle);

    const largeArcFlag = Math.abs(startAngle - endAngle) > 180 ? 1 : 0;
    const sweepFlag = startAngle > endAngle ? 1 : 0;

    const d = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;

    return (
        <path
            d={d}
            fill="none"
            stroke={fill}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="outline-none"
            style={{ transition: 'all 300ms ease' }}
        />
    );
}
