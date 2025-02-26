import BackgroundCompo from "@/components/commons/background";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { CSSProperties } from "react";

/**
 * Props for `Background`.
 */
export type BackgroundProps = SliceComponentProps<Content.BackgroundSlice> & {
  data?: any;
  style?: CSSProperties;
};

/**
 * Component for "Background" Slices.
 */
const Background = ({ slice, data, style }: BackgroundProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <BackgroundCompo data={data} style={style} />
    </section>
  );
};

export default Background;
