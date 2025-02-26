import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import TitleHeaderGradientCompo from "@/components/commons/titleHeaderGradient";
import { CSSProperties } from "react";

/**
 * Props for `TitleHeaderGradient`.
 */
export type TitleHeaderGradientProps =
  SliceComponentProps<Content.TitleHeaderGradientSlice> & {
    data?: any;
    style?: CSSProperties;
  };

/**
 * Component for "TitleHeaderGradient" Slices.
 */
const TitleHeaderGradient = ({
  slice,
  data,
  style,
}: TitleHeaderGradientProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <TitleHeaderGradientCompo data={data} style={style} />
    </section>
  );
};

export default TitleHeaderGradient;
