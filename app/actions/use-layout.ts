// "use client";

import { useRef } from "react";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
  return res.json();
};

export function useLayoutDataAPI(documentId: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const prevComponentRef = useRef<string | null>(null); // Lưu component trước đó

  const { data: layoutData, error: layoutError } = useSWR(
    documentId ? `${API_URL}/api/layoutJsons/${documentId}` : null,
    fetcher,
    { revalidateOnFocus: false, refreshInterval: 60000 }
  );

  const { data: documentData, error: documentError } = useSWR(
    documentId ? `${API_URL}/api/componentJsons/${documentId}` : null,
    fetcher,
    { revalidateOnFocus: false, refreshInterval: 60000 }
  );

  if (layoutError || documentError) {
    console.error(
      "❌ Error fetching layout or component:",
      layoutError || documentError
    );
    return { layout: {}, component: {}, isLoading: false };
  }

  if (!layoutData || !documentData)
    return { layout: {}, component: {}, isLoading: true };

  // 🔥 Kiểm tra component string có hợp lệ không
  const componentString = documentData?.result?.component?.trim();
  if (!componentString || typeof componentString !== "string") {
    console.error("❌ Error: componentString is missing or invalid.");
    return { layout: layoutData.result ?? {}, component: {}, isLoading: false };
  }

  // 🔥 Chỉ rebuild component nếu componentString thay đổi
  if (componentString !== prevComponentRef.current) {
    console.log("🔄 Rebuilding component...");
    rebuilComponentMonaco(componentString);
    prevComponentRef.current = componentString; // Cập nhật component cũ
  }

  return {
    layout: layoutData.result.layoutJson ?? {},
    component: componentString,
    isLoading: false,
  };
}

export async function rebuilComponentMonaco(componentString: string) {
  try {
    if (!componentString || typeof componentString !== "string") {
      console.error("Error: Invalid componentString", componentString);
      return;
    }

    const response = await fetch(`http://localhost:3000/api`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: componentString,
    });

    await response.text();
  } catch (error) {
    console.error("Build failed:", error);
  }
}
