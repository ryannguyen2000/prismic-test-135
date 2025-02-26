import DiscriptionCompo from "@/components/commons/discription";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { CSSProperties } from "react";

/**
 * Props for `Discription`.
 */
export type DiscriptionProps = SliceComponentProps<Content.DiscriptionSlice> & {
  data?: any;
  style?: CSSProperties;
};

/**
 * Component for "Discription" Slices.
 */
const Discription = ({ slice, data, style }: DiscriptionProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <DiscriptionCompo data={data} style={style} />
    </section>
  );
};

export default Discription;
