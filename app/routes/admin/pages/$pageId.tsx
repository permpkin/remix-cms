import { CalendarIcon, CheckIcon, EyeIcon } from "@heroicons/react/outline";
import invariant from "tiny-invariant";
import { BlockEditor } from "~/components/admin/BlockEditor";
import { Button } from "~/components/admin/Button";
import { PageHeading } from "~/components/admin/PageHeading";
import { PageWrapper } from "~/components/admin/PageWrapper";
import { Table } from "~/components/admin/Table";
import { SelectField } from "~/components/forms/SelectField";
import { SlugField } from "~/components/forms/SlugField";
import { TextAreaField } from "~/components/forms/TextAreaField";
import { TextField } from "~/components/forms/TextField";
import { getPage } from "~/models/page.server";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Page } from "@prisma/client";
import { useState } from "react";

// import { db } from "~/utils/db.server";

type LoaderData = { page: Page };

// export const loader: LoaderFunction = async () => {
//   const data: LoaderData = await db.page.findUniqueOrThrow({

//   })
//   return json(data);
// };

export const loader: LoaderFunction = async ({ request, params }) => {
  // const userId = await requireUserId(request); // is this the session check?
  invariant(params.pageId, "pageId not found");

  const page = await getPage({ id: params.pageId });
  if (!page) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ page });
};


export default function AdminPage() {

  const { page } = useLoaderData<LoaderData>();

  const [blocks, setBlocks] = useState(JSON.parse(page.blocks))

  console.log('page', page)

  return (
    <PageWrapper>
      <div className="flex-1 relative z-0 flex overflow-hidden">
        <div className="flex-1">
          <PageHeading crumbs={[
            { label: 'Pages', path: '/pages' },
            { label: `${page.title}`, path: `/pages/${page.id}` }
          ]}/>
          <section className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            {/* Start main area*/}
            <BlockEditor data={blocks} onChange={()=>{}}/>
            {/* End main area */}
          </section>
        </div>
        <aside className="hidden bg-gray-50 relative xl:flex xl:flex-col flex-shrink-0 w-96 border-l border-gray-200 overflow-y-auto p-5">
          {/* Start secondary column (hidden on smaller screens) */}
          <div className="flex-grow">
            <div>
              <div className="relative z-0 inline-flex shadow-sm rounded-md sm:shadow-none sm:space-x-3 w-full">
                <span className="inline-flex sm:shadow-sm w-full">
                  <button
                    type="button"
                    className="relative inline-flex flex-1 items-center justify-center px-4 py-1 rounded-l-md border border-gray-300 bg-white text-xs font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                  >
                    <EyeIcon className="mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span>{page.status}</span>
                  </button>
                  <button
                    type="button"
                    className="hidden sm:inline-flex flex-1 -ml-px relative items-center justify-center px-4 py-1 border border-gray-300 bg-white text-xs font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                  >
                    <CalendarIcon className="mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span>Schedule</span>
                  </button>
                  <button
                    type="button"
                    className="relative inline-flex flex-1 items-center justify-center px-4 py-1 rounded-r-md border border-green-600 bg-green-500 hover:bg-green-600 text-xs font-medium text-green-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"
                  >
                    <CheckIcon className="mr-1 h-5 w-5 text-green-50" aria-hidden="true" />
                    <span>Save</span>
                  </button>
                </span>
              </div>
            </div>
            <div className="mt-3">
              {/* <TextField label={"Page Title"}/> */}
              <SlugField label="Page Title" placeholder="Page Title" value={page.title} slug={page.slug}/>
            </div>
            <div className="mt-3">
              <TextAreaField label="Page Description" description="Leave empty to use site default description." value={page.description}/>
            </div>
            <div className="mt-3">
              <SelectField/>
            </div>
            <div className="mt-3">
              <TextField label="Schema Type" description="define schema.org type definition." value={page.schema}/>
            </div>
          </div>
          {/* End secondary column */}
        </aside>
      </div>
    </PageWrapper>
  );
}
