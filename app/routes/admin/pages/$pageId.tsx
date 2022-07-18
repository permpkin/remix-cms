import { CalendarIcon, CheckIcon, ExternalLinkIcon, EyeIcon } from "@heroicons/react/outline";
import invariant from "tiny-invariant";
import { BlockEditor } from "~/components/admin/BlockEditor";
import { PageHeading } from "~/components/admin/PageHeading";
import { PageWrapper } from "~/components/admin/PageWrapper";
import { SelectField } from "~/components/forms/SelectField";
import { SlugField } from "~/components/forms/SlugField";
import { TextAreaField } from "~/components/forms/TextAreaField";
import { TextField } from "~/components/forms/TextField";
import { getPage } from "~/models/page.server";

import { Menu, Transition } from '@headlessui/react'

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
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

const statuses = [
  'Draft',
  'Scheduled',
  'Published',
  'Private'
]

export default function AdminPage() {

  const { page } = useLoaderData<LoaderData>();

  const [blocks, setBlocks] = useState(JSON.parse(page.blocks))

  const [status, setStatus] = useState(page.status || statuses[0])

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
              <div className="relative inline-flex shadow-sm rounded-md sm:shadow-none sm:space-x-3 w-full">
                <span className="inline-flex sm:shadow-sm w-full">
                  <Link
                    to={`/${page.slug}`}
                    className="relative inline-flex flex-1 items-center justify-center px-4 py-1 rounded-l-md border border-gray-300 bg-white text-xs font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600"
                  >
                    <ExternalLinkIcon className="mr-1 h-4 w-4 text-gray-400" aria-hidden="true" />
                    <span>Preview</span>
                  </Link>
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className='hidden sm:inline-flex flex-1 -ml-px relative items-center justify-center px-4 py-1 border border-gray-300 bg-white text-xs font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600'>
                      <EyeIcon className="mr-1 h-4 w-4 text-gray-400" aria-hidden="true" />
                      <span>{page.status}</span>
                    </Menu.Button>
                    <Menu.Items className="absolute z-10 left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                      {statuses.map((item, index) => (
                        <Menu.Item
                          key={`${index}-${item}`}
                        >
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-violet-500 text-white' : 'text-gray-900'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {item}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                      </div>
                    </Menu.Items>
                  </Menu>
                  <button
                    type="button"
                    className="relative inline-flex flex-1 items-center justify-center px-4 py-1 rounded-r-md border border-indigo-600 bg-indigo-500 hover:bg-indigo-600 text-xs font-medium text-indigo-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600"
                  >
                    <CheckIcon className="mr-1 h-4 w-4 text-indigo-50" aria-hidden="true" />
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
