import { PageHeading } from "~/components/admin/PageHeading";
import { PageWrapper } from "~/components/admin/PageWrapper";
import { Table } from "~/components/admin/Table";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { File } from "@prisma/client";

import { db } from "~/utils/db.server";

type LoaderData = { files: Array<File> };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    files: await db.file.findMany(),
  };
  return json(data);
};


export default function AdminPage() {

  const { files } = useLoaderData<LoaderData>();

  return (
    <PageWrapper>
      <PageHeading crumbs={[
        { label: 'Files', path: '/files' }
      ]}>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          Upload File
        </button>
      </PageHeading>
      <Table
        columns={[
          'id',
          'filename',
          'mimetype',
          'sizeKb'
        ]}
        data={files}
      />
    </PageWrapper>
  );
}
