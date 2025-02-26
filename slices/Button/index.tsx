import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import ButtonCompo from "@/components/commons/button";
import { CSSProperties, JSX } from "react";

/**
 * Props for `Button`.
 */
export type ButtonProps = SliceComponentProps<Content.ButtonSlice> & {
  data?: any;
  style?: CSSProperties;
};

/**
 * Component for "Button" Slices.
 */
const Button = ({ slice, data, style }: ButtonProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <ButtonCompo data={data} style={{ ...style }} />
    </section>
  );
};

export default Button;
