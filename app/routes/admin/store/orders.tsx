import { PageHeading } from "~/components/admin/PageHeading";
import { PageWrapper } from "~/components/admin/PageWrapper";
import { Table } from "~/components/admin/Table";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Order } from "@prisma/client";

import { db } from "~/utils/db.server";

type LoaderData = { orders: Array<Order> };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    orders: await db.order.findMany(),
  };
  return json(data);
};


export default function AdminPage() {

  const { orders } = useLoaderData<LoaderData>();

  return (
    <PageWrapper>
      <PageHeading crumbs={[
        { label: 'Store', path: '/store' },
        { label: 'Orders', path: '/store/orders' }
      ]}>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          Add Order
        </button>
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
