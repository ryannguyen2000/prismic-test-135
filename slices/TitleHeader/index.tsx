import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TitleHeader`.
 */
export type TitleHeaderProps = SliceComponentProps<Content.TitleHeaderSlice>;

/**
 * Component for "TitleHeader" Slices.
 */
const TitleHeader: FC<TitleHeaderProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for title_header (variation: {slice.variation})
      Slices
    </section>
  );
};

export default TitleHeader;
