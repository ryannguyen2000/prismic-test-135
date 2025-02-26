import { notFound } from "next/navigation";
import { Fragment } from "react";
import { createClient } from "@/prismicio";

import ClientWrapper from "@/components/grid-systems/ClientWrapGridSystem";
import _ from "lodash";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const { uid } = await params;

  const pagePrismic = await client
    .getByUID("page", uid)
    .catch(() => notFound());

  const documentId = _.get(pagePrismic, "id", "");

  return (
    <Fragment>
      <ClientWrapper
        layoutId={uid}
        {...pagePrismic.data}
        documentId={documentId}
      />
    </Fragment>
  );
}

export async function generateMetadata() {
  const client = createClient();
  const pages = await client.getAllByType("page");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
