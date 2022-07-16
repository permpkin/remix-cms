import { PageHeading } from "~/components/admin/PageHeading";
import { PageWrapper } from "~/components/admin/PageWrapper";
import { Table } from "~/components/admin/Table";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { User } from "@prisma/client";

import { db } from "~/utils/db.server";

type LoaderData = { users: Array<User> };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    users: await db.user.findMany(),
  };
  return json(data);
};


export default function AdminPage() {

  const { users } = useLoaderData<LoaderData>();

  return (
    <PageWrapper>
      <PageHeading title='Users' description='Showing 0 of 0 Users.'>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          Add User
        </button>
      </PageHeading>
      <Table
        columns={[
          'id',
          'email',
          'createdAt'
        ]}
        data={users}
      />
    </PageWrapper>
  );
}
