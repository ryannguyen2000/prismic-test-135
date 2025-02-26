"use client";

import _ from "lodash";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { componentRegistry } from "@/lib/slices";
import { CONFIGS } from "@/configs";

import { getDeviceSize } from "@/lib/utils";
import { rebuilComponentMonaco } from "@/app/actions/use-layout";

import LoadingPage from "./loadingPage";
import { GridSystemProps, RenderGripProps, RenderSliceProps } from "./types";
import {
  GapGrid,
  GridItem,
  GridRow,
  mapAlineItem,
  mapJustifyContent,
  SpanCol,
  SpanRow,
} from "./const";
import NotFound from "./404";

const RenderSlice = ({ slice, slices }: RenderSliceProps) => {
  if (!slice) return null;

  const styleDevice: string = getDeviceSize() as string;

  const key = slice?.id?.split("$")[0];
  const SliceComponent =
    componentRegistry[key as keyof typeof componentRegistry];
  const data = slices.find((sli) => sli.id === slice?.id) || null;

  if (!SliceComponent && !slice?.childs) return null;

  const isGrid = slice?.type === "grid" ? "grid" : "";
  const isFlexBox = slice?.type === "flex";
  const isButton = key === "button";

  const styleSlice =
    (slice[styleDevice] as React.CSSProperties) || slice?.style;

  const sliceClasses = [
    slice?.colspan ? SpanCol(Number(slice.colspan)) : "",
    slice?.rowspan ? SpanRow(Number(slice.rowspan)) : "",
    slice?.rows ? GridRow(Number(slice.rows)) : "",
    slice?.gap ? GapGrid(Number(slice.gap)) : "",
    isGrid,
    isFlexBox && mapJustifyContent(slice?.justifyContent),
    isFlexBox && mapAlineItem(slice?.alignItems),
    isFlexBox && "flex",
  ]
    .filter(Boolean)
    .join(" ");

  const inlineStyles: React.CSSProperties = {
    ...(styleSlice || {}),
    gridTemplateColumns: isGrid ? `repeat(${slice?.columns}, 1fr)` : "",
  };

  const content =
    SliceComponent && data ? (
      <SliceComponent
        slice={data}
        style={styleSlice}
        data={_.get(slice, "dataSlice")}
      />
    ) : (
      slice?.childs && <RenderGrid slices={slices} items={slice.childs} />
    );

  return sliceClasses || Object.keys(inlineStyles).length ? (
    <div className={`${sliceClasses}`} style={isButton ? {} : inlineStyles}>
      {content}
    </div>
  ) : null;
};

const RenderGrid = ({ slices, items }: RenderGripProps) => {
  return (
    <>
      {_.map(items, (i, index) => (
        <RenderSlice key={index} slice={i} slices={slices} dataSlice={{}} />
      ))}
    </>
  );
};

/**
 * layoutId from param router
 * page is layoutAPI
 * slices from prismic
 */
const GridSystemContainer = ({ page, slices, deviceType }: GridSystemProps) => {
  const [layout, setLayout] = useState<GridItem | null>(null);
  const config = layout || page;
  const [refreshKey, setRefreshKey] = useState(0);
  const previousComponentRef = useRef(null);

  const MonacoContainerRoot = useMemo(() => {
    return dynamic(() => import("@/components/grid-systems/monacoContainer"), {
      ssr: false,
      loading: () => <LoadingPage />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]); // ✅

  const content = (
    <div className="mx-auto flex justify-center">
      {config?.childs ? (
        <div className="w-full flex flex-col justify-center">
          <RenderGrid items={config.childs} slices={slices} />
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );

  useEffect(() => {
    const socket = io(CONFIGS.SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket"],
    });
    socket.on("connected", () => console.log("connected"));
    socket.on("return-json", async (data) => {
      if (data?.component && data.component !== previousComponentRef.current) {
        previousComponentRef.current = data.component; // Track previous value
        setRefreshKey((prev) => prev + 1);
        await rebuilComponentMonaco(data.component);
      }
      if (data?.layout) {
        setTimeout(() => setLayout(data.layout[deviceType]), 0);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [deviceType]);

  if (!MonacoContainerRoot || typeof MonacoContainerRoot !== "function") {
    return <>{content}</>;
  }

  return (
    <div className="overflow-hidden">
      <MonacoContainerRoot key={refreshKey}>{content}</MonacoContainerRoot>
    </div>
  );
};

export default GridSystemContainer;
