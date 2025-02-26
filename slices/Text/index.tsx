import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import TextCompo from "@/components/commons/text";
import { CSSProperties } from "react";

/**
 * Props for `Text`.
 */
export type TextProps = SliceComponentProps<Content.TextSlice> & {
  data?: any;
  style?: CSSProperties;
};

/**
 * Component for "Text" Slices.
 */
const Text = ({ slice, data, style }: TextProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <TextCompo data={data} style={style} />
    </section>
  );
};

export default Text;
