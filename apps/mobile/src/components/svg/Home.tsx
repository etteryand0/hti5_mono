import * as React from "react"
import type { SvgProps } from "react-native-svg";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

const Home = (props: SvgProps) => (
    <Svg
        fill="none"
        height={22}
        width={23}
        {...props}
    >
        <G
            clipPath="url(#a)"
            strokeLinecap="round"
            strokeWidth={1.8}
        >
            <Path d="M21.5 9.889 12.164 1.59a1 1 0 0 0-1.328 0L1.5 9.889M2.611 13.222V20a1 1 0 0 0 1 1H19.39a1 1 0 0 0 1-1v-6.778" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path d="M0 .5h23v21H0z" fill={props.stroke} />
            </ClipPath>
        </Defs>
    </Svg>
)
export default Home
