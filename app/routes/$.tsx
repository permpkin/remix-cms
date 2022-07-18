import { accessPage } from "~/models/page.server";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import type { Page } from "@prisma/client";
import invariant from "tiny-invariant";
import { BlockRenderer } from "~/components/BlockRenderer";
import { Page404 } from "~/components/404";

type LoaderData = { page: Page };

export const loader: LoaderFunction = async ({ request, params }) => {

  invariant(params['*'], "page not found");

  const page = await accessPage({ slug: params['*'] });

  if (!page) {
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

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <Page404/>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}