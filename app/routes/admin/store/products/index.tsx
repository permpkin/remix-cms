import { PageHeading } from "~/components/admin/PageHeading";
import { PageWrapper } from "~/components/admin/PageWrapper";
import { Table } from "~/components/admin/Table";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import type { Product } from "@prisma/client";

import { db } from "~/utils/db.server";
import { Button } from "~/components/admin/Button";

type LoaderData = { products: Array<Product> };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    products: await db.product.findMany(),
  };
  return json(data);
};


export default function AdminPage() {

  const { products } = useLoaderData<LoaderData>();
  const navigation = useNavigate()

  const addNew = () => {
    navigation('./new')
  }

  return (
    <PageWrapper>
      <PageHeading crumbs={[
        { label: 'Store', path: '/store' },
        { label: 'Products', path: '/store/products' }
      ]}>
        <Button onClick={addNew}>
          Add Product
        </Button>
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
