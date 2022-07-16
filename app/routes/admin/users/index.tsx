import { PageHeading } from "~/components/admin/PageHeading";
import { PageWrapper } from "~/components/admin/PageWrapper";
import { Table } from "~/components/admin/Table";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import type { User } from "@prisma/client";

import { db } from "~/utils/db.server";
import { Button } from "~/components/admin/Button";

type LoaderData = { users: Array<User> };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    users: await db.user.findMany(),
  };
  return json(data);
};


export default function AdminPage() {

  const { users } = useLoaderData<LoaderData>();
  const navigation = useNavigate()

  const addNew = () => {
    navigation('./new')
  }

  return (
    <PageWrapper>
      <PageHeading crumbs={[
        { label: 'Users', path: '/users' }
      ]}>
        <Button onClick={addNew}>
          Add User
        </Button>
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
