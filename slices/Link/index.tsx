import LinkCompo from "@/components/commons/link";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { CSSProperties } from "react";

/**
 * Props for `Link`.
 */
export type LinkProps = SliceComponentProps<Content.LinkSlice> & {
  data?: any;
  style?: CSSProperties;
};

/**
 * Component for "Link" Slices.
 */
const Link = ({ slice, data, style }: LinkProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <LinkCompo data={data} style={style} />
    </section>
  );
};

export default Link;
