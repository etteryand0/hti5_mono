import * as React from "react"
import type { SvgProps } from "react-native-svg";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

const Search = (props: SvgProps) => (
    <Svg
        fill="none"
        height={22}
        stroke="#9EA9BC"
        width={22}
        {...props}
    >
        <G clipPath="url(#a)" strokeWidth={1.8}>
            <Path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16Z" />
            <Path d="m21 21-4-4" strokeLinecap="round" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path d="M0 0h22v22H0z" fill="#fff" />
            </ClipPath>
        </Defs>
    </Svg>
)
export default Search
