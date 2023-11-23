import * as React from "react"
import type { SvgProps } from "react-native-svg";
import Svg, { Path, Circle } from "react-native-svg"

const Timeplate = (props: SvgProps) => (
    <Svg
        fill="none"
        height={21}
        stroke="#9EA9BC"
        width={21}
        {...props}
    >
        <Path
            d="M10 5v5a1 1 0 0 0 1 1h4.5"
            strokeLinecap="round"
            strokeWidth={1.5}
        />
        <Circle cx={10.5} cy={10.5} r={9.75} strokeWidth={1.5} />
    </Svg>
)
export default Timeplate
