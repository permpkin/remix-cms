import { PageHeading } from "~/components/admin/PageHeading";
import { PageWrapper } from "~/components/admin/PageWrapper";
import { Table } from "~/components/admin/Table";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import type { Page } from "@prisma/client";

import { db } from "~/utils/db.server";

type LoaderData = { pages: Array<Page> };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    pages: await db.page.findMany(),
  };
  return json(data);
};


export default function AdminPage() {

  const { pages } = useLoaderData<LoaderData>();
  const navigation = useNavigate()

  const addNew = () => {
    navigation('./new')
  }

  return (
    <PageWrapper>
      <PageHeading crumbs={[
        { label: 'Pages', path: '/pages' }
      ]}>
        <button
          type="button"
          onClick={addNew}
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          Add Page
        </button>
      </PageHeading>
      <Table
        columns={[
          'id',
          'title',
          'createdAt'
        ]}
        data={pages}
      />
    </PageWrapper>
  );
}
