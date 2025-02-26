import IconCompo from "@/components/commons/icon";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { CSSProperties } from "react";

/**
 * Props for `Icon`.
 */
export type IconProps = SliceComponentProps<Content.TextSlice> & {
  data?: any;
  style?: CSSProperties;
};

/**
 * Component for "Icon" Slices.
 */
const Icon = ({ slice, data, style }: IconProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <IconCompo data={data} style={style} />
    </section>
  );
};

export default Icon;
