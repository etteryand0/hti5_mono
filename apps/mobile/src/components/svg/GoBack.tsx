import * as React from "react"
import type { SvgProps } from "react-native-svg";
import Svg, { Rect, Path } from "react-native-svg"

const GoBack = (props: SvgProps) => (
    <Svg
        fill="none"
        height={38}
        width={38}
        {...props}
    >
        <Rect fill="none" height={36} rx={6} width={36} x={1} y={1} />
        <Rect
            height={36}
            rx={6}
            stroke="#F3F3F5"
            strokeWidth={2}
            width={36}
            x={1}
            y={1}
        />
        <Path
            d="M13.793 18.793a1 1 0 0 0 0 1.414l6.364 6.364a1 1 0 0 0 1.414-1.414L15.914 19.5l5.657-5.657a1 1 0 0 0-1.414-1.414l-6.364 6.364ZM15.5 18.5h-1v2h1v-2Z"
            fill="#999898"
        />
    </Svg>
)
export default GoBack
