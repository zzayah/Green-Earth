import React, { useMemo, useState } from "react";
import * as d3 from "d3";
import styles from "./sandbox.module.css";

const MARGIN_X = 150;
const MARGIN_Y = 50;
const INFLEXION_PADDING = 20; // space between donut and label inflexion point

const colors = [
    "#e0ac2b",
    "#e85252",
    "#6689c6",
    "#9a6fb0",
    "#a53253",
    "#69b3a2",
];

const Sandbox = ({ width, height, data }) => {
    const [hoveredSlice, setHoveredSlice] = useState(null);

    const radius = Math.min(width - 2 * MARGIN_X, height - 2 * MARGIN_Y) / 2;
    const innerRadius = radius / 2;

    const pie = useMemo(() => {
        const pieGenerator = d3.pie().value((d) => d.value);
        return pieGenerator(data);
    }, [data]);

    const arcGenerator = d3.arc();

    return (
        <svg width={width} height={height} style={{ display: "inline-block" }}>
            <g transform={`translate(${width / 2}, ${height / 2})`} className={styles.container}>
                {pie.map((grp, i) => {
                    const sliceInfo = {
                        innerRadius,
                        outerRadius: radius,
                        startAngle: grp.startAngle,
                        endAngle: grp.endAngle,
                    };
                    const centroid = arcGenerator.centroid(sliceInfo);
                    const slicePath = arcGenerator(sliceInfo);
                    const label = grp.data.name + " (" + grp.value + ")";
                    const isHovered = hoveredSlice === i;

                    return (
                        <g
                            key={i}
                            className={`${styles.slice} ${isHovered ? styles.hovered : ""}`}
                            onMouseEnter={() => setHoveredSlice(i)}
                            onMouseLeave={() => setHoveredSlice(null)}
                        >
                            <path d={slicePath} fill={colors[i]} />
                            <circle cx={centroid[0]} cy={centroid[1]} r={isHovered ? 6 : 2} fill="white" />
                            {isHovered && (
                                <text
                                    x={centroid[0]}
                                    y={centroid[1]}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize={14}
                                >
                                    {label}
                                </text>
                            )}
                        </g>
                    );
                })}
            </g>
        </svg>
    );
};

export default Sandbox;
