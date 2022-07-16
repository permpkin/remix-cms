import { PageHeading } from "~/components/admin/PageHeading";
import { PageWrapper } from "~/components/admin/PageWrapper";
import { Table } from "~/components/admin/Table";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import type { Customer } from "@prisma/client";

import { db } from "~/utils/db.server";
import { Button } from "~/components/admin/Button";

type LoaderData = { customers: Array<Customer> };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    customers: await db.customer.findMany(),
  };
  return json(data);
};


export default function AdminPage() {

  const { customers } = useLoaderData<LoaderData>();
  const navigation = useNavigate()

  const addNew = () => {
    navigation('./new')
  }

  return (
    <PageWrapper>
      <PageHeading crumbs={[
        { label: 'Store', path: '/store' },
        { label: 'Customers', path: '/store/customers' }
      ]}>
        <Button onClick={addNew}>
          Add Customer
        </Button>
      </PageHeading>
      <Table
        columns={[
          'id',
          'email',
          'orders',
          'createdAt'
        ]}
        data={customers}
      />
    </PageWrapper>
  );
}
