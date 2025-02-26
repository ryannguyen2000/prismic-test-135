import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import ImageCompo from "@/components/commons/image";
import { CSSProperties } from "react";
import _ from "lodash";

/**
 * Props for `Image`.
 */
export type ImageProps = SliceComponentProps<Content.ImageSlice> & {
  data?: any;
  style?: CSSProperties;
};

/**
 * Component for "Image" Slices.
 */
const Image = ({ slice, data, style }: ImageProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      style={{ width: "100%", height: "100%" }}
    >
      <ImageCompo data={data} style={style} />
    </section>
  );
};

export default Image;
