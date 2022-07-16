import { PageHeading } from "~/components/admin/PageHeading";
import { PageWrapper } from "~/components/admin/PageWrapper";
import { Table } from "~/components/admin/Table";

// import type { LoaderFunction } from "@remix-run/node";
// import { json } from "@remix-run/node";
// import { useLoaderData } from "@remix-run/react";
// import type { Page } from "@prisma/client";

// import { db } from "~/utils/db.server";

// type LoaderData = { pages: Array<Page> };

// export const loader: LoaderFunction = async () => {
//   const data: LoaderData = await db.page.findUniqueOrThrow({

//   })
//   return json(data);
// };


export default function AdminPage() {

  // const { pages } = useLoaderData<LoaderData>();

  return (
    <PageWrapper>
      <PageHeading crumbs={[
        { label: 'Pages', path: '/pages' },
        { label: 'New Page', path: '/pages/new' }
      ]}/>
      <div className="flex-1 relative z-0 flex overflow-hidden">
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
          {/* Start main area*/}
          <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
            <div className="h-full border-2 border-gray-200 border-dashed rounded-lg" />
          </div>
          {/* End main area */}
        </main>
        <aside className="hidden relative xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200 overflow-y-auto">
          {/* Start secondary column (hidden on smaller screens) */}
          <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
            <div className="h-full border-2 border-gray-200 border-dashed rounded-lg" />
          </div>
          {/* End secondary column */}
        </aside>
      </div>
    </PageWrapper>
  );
}
