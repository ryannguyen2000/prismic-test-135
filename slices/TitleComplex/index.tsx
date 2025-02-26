import TitleComplexCompo from "@/components/commons/titleComplex";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { CSSProperties } from "react";
import { JSX } from "react/jsx-runtime";

/**
 * Props for `TitleComplex`.
 */
export type TitleComplexProps =
  SliceComponentProps<Content.TitleComplexSlice> & {
    data?: any;
    style?: CSSProperties;
  };

/**
 * Component for "TitleComplex" Slices.
 */
const TitleComplex = ({
  slice,
  data,
  style,
}: TitleComplexProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <TitleComplexCompo data={data} style={style} />
    </section>
  );
};

export default TitleComplex;
