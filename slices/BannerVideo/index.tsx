import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import BannerVideoCompo from "@/components/commons/bannerVideo";
import { CSSProperties } from "react";

/**
 * Props for `BannerVideo`.
 */
export type BannerVideoProps = SliceComponentProps<Content.BannerVideoSlice> & {
  data?: any;
  style?: CSSProperties;
};

/**
 * Component for "BannerVideo" Slices.
 */
const BannerVideo = ({ slice, data, style }: BannerVideoProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <BannerVideoCompo data={data} style={style} />
    </section>
  );
};

export default BannerVideo;
