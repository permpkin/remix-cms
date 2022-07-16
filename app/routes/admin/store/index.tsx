import { PageHeading } from "~/components/admin/PageHeading";
import { PageWrapper } from "~/components/admin/PageWrapper";
import { Table } from "~/components/admin/Table";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Product } from "@prisma/client";

import { db } from "~/utils/db.server";

type LoaderData = { products: Array<Product> };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    products: await db.product.findMany(),
  };
  return json(data);
};


export default function AdminPage() {

  const { products } = useLoaderData<LoaderData>();

  return (
    <PageWrapper>
      <PageHeading crumbs={[
        { label: 'Store', path: '/store' }
      ]}>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          Add Product
        </button>
      </PageHeading>
      <Table
        columns={[
          'id',
          'title',
          'createdAt'
        ]}
        data={products}
      />
    </PageWrapper>
  );
}
