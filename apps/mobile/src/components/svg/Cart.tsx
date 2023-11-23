import * as React from "react"
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg"

const Cart = (props: SvgProps) => (
    <Svg
        fill="none"
        height={22}
        stroke="#9EA9BC"
        width={25}
        {...props}
    >
        <Path
            d="M1.066 1.934h4.148l1.26 10.678a1.699 1.699 0 0 0 1.698 1.443h10.7a1.699 1.699 0 0 0 1.7-1.155l2.258-6.794a1.697 1.697 0 0 0-.238-1.528 1.698 1.698 0 0 0-1.46-.714H5.59M18.584 20a.85.85 0 1 1 0-1.7.85.85 0 0 1 0 1.7Zm-11.04 0a.85.85 0 1 1 0-1.699.85.85 0 0 1 0 1.699Z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
        />
    </Svg>
)
export default Cart
