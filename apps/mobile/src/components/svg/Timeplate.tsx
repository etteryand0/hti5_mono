import * as React from "react"
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg"

const Timeplate = (props: SvgProps) => (
    <Svg
        fill="#9EA9BC"
        height={22}
        width={22}
        {...props}
    >
        <Path
            d="M11.5.844A10.156 10.156 0 1 0 21.656 11 10.167 10.167 0 0 0 11.5.844Zm0 18.75A8.594 8.594 0 1 1 20.094 11a8.603 8.603 0 0 1-8.594 8.594ZM17.75 11a.781.781 0 0 1-.781.781H11.5a.781.781 0 0 1-.781-.781V5.531a.781.781 0 1 1 1.562 0v4.688h4.688a.781.781 0 0 1 .781.781Z"
        />
    </Svg>
)
export default Timeplate
