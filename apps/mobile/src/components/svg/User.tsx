import * as React from "react"
import type { SvgProps } from "react-native-svg";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

const User = (props: SvgProps) => (
    <Svg
        fill="none"
        height={20}
        stroke="#9EA9BC"
        width={25}
        {...props}
    >
        <G
            clipPath="url(#a)"
            strokeLinecap="round"
            strokeWidth={1.8}
        >
            <Path d="M12.5 8.982a4.215 4.215 0 0 1-2.946-1.194 4.029 4.029 0 0 1-1.22-2.88c0-1.08.438-2.117 1.22-2.881A4.215 4.215 0 0 1 12.5.833c1.105 0 2.165.43 2.946 1.194.782.764 1.22 1.8 1.22 2.88 0 1.081-.438 2.117-1.22 2.881A4.215 4.215 0 0 1 12.5 8.982ZM5.186 19.167a1.019 1.019 0 0 1-1.019-1.019v0c0-1.62.658-3.175 1.83-4.321a6.323 6.323 0 0 1 4.42-1.79h4.167c1.657 0 3.247.644 4.42 1.79a6.043 6.043 0 0 1 1.83 4.321v0" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path d="M0 0h25v20H0z" fill="#fff" />
            </ClipPath>
        </Defs>
    </Svg>
)
export default User
