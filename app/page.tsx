import ClientWrapper from "@/components/grid-systems/ClientWrapGridSystem";
import { createClient } from "@/prismicio";
import { Fragment } from "react";
import _ from "lodash";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = 60;
const pageName = "home";

export default async function Home() {
  const client = createClient();

  const page = await client.getByUID("page", pageName).catch(() => notFound());

  const documentId = _.get(page, "id", "");

  const layoutId = pageName;

  return (
    <Fragment>
      <ClientWrapper
        layoutId={layoutId}
        {...page.data}
        documentId={documentId}
      />
    </Fragment>
  );
}
