import { accessPage } from "~/models/page.server";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Page } from "@prisma/client";
import invariant from "tiny-invariant";
import { BlockRenderer } from "~/components/BlockRenderer";

type LoaderData = { page: Page };

export const loader: LoaderFunction = async ({ request, params }) => {

  invariant(params.pageSlug, "page not found");

  const page = await accessPage({ slug: params.pageSlug });

  if (!page) {
    throw new Response("Not Found", { status: 404 });
  }

  // throw 404 if article is not published.
  if (page.publishedAt > new Date) {
    throw new Response("Not Found", { status: 404 });
  }
  
  return json<LoaderData>({ page });

};


export default function PageRenderer() {

  const { page } = useLoaderData<LoaderData>();

  const blocks = JSON.parse(page.blocks)
  
  return (
    <main className="relative">
      <BlockRenderer data={blocks}/>
    </main>
  );
}
