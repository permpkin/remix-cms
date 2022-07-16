import { PageHeading } from "~/components/admin/PageHeading";
import { PageWrapper } from "~/components/admin/PageWrapper";
import { Table } from "~/components/admin/Table";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { File } from "@prisma/client";

import { db } from "~/utils/db.server";
import { Button } from "~/components/admin/Button";

type LoaderData = { files: Array<File> };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    files: await db.file.findMany(),
  };
  return json(data);
};


export default function AdminPage() {

  const { files } = useLoaderData<LoaderData>();

  const addNew = () => {
    // upload
  }

  return (
    <PageWrapper>
      <PageHeading crumbs={[
        { label: 'Files', path: '/files' }
      ]}>
        <Button onClick={addNew}>
          Upload File
        </Button>
      </PageHeading>
      <div className="p-5">
        <div className="mt-1 border-2 border-gray-300 border-dashed rounded-md px-6 pt-5 pb-6 flex justify-center">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
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
