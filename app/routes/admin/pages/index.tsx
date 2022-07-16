import { PageHeading } from "~/components/admin/PageHeading";
import { PageWrapper } from "~/components/admin/PageWrapper";
import { Table } from "~/components/admin/Table";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import type { Page } from "@prisma/client";

import { db } from "~/utils/db.server";
import { Button } from "~/components/admin/Button";

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
        <Button onClick={addNew}>
          Add Page
        </Button>
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
