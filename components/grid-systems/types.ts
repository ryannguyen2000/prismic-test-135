import { Content } from "@prismicio/client";
import { GridItem } from "./const";

export interface GridSystemProps
  extends Content.PageDocument,
    Content.PageDocumentData {
  page?: GridItem;
  layoutId?: string;
  deviceType: string;
}

export type SliceItemsType =
  | Content.PageDocumentDataSlicesSlice
  | Content.PageDocumentDataSlicesSlice;

export type RenderGripProps = {
  slices: SliceItemsType[];
  items: GridItem[];
  grid?: any;
};

export type RenderSliceProps = {
  slice: GridItem | null | undefined;
  slices: SliceItemsType[];
  dataSlice: any;
};

export type MonacoFunctionsProps = {
  slice: GridItem | null | undefined;
  slices: SliceItemsType[];
};
