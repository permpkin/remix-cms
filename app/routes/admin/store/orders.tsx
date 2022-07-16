import { PageHeading } from "~/components/admin/PageHeading";
import { PageWrapper } from "~/components/admin/PageWrapper";
import { Table } from "~/components/admin/Table";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import type { Order } from "@prisma/client";

import { db } from "~/utils/db.server";
import { Button } from "~/components/admin/Button";

type LoaderData = { orders: Array<Order> };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    orders: await db.order.findMany(),
  };
  return json(data);
};


export default function AdminPage() {

  const { orders } = useLoaderData<LoaderData>();
  const navigation = useNavigate()

  const addNew = () => {
    navigation('./new')
  }

  return (
    <PageWrapper>
      <PageHeading crumbs={[
        { label: 'Store', path: '/store' },
        { label: 'Orders', path: '/store/orders' }
      ]}>
        <Button onClick={addNew}>
          Add Order
        </Button>
      </PageHeading>
      <Table
        columns={[
          'id',
          'customer',
          'products',
          'createdAt'
        ]}
        data={orders}
      />
    </PageWrapper>
  );
}
