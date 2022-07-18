import { PageHeading } from "~/components/admin/PageHeading";
import { PageWrapper } from "~/components/admin/PageWrapper";
import { Table } from "~/components/admin/Table";

import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import type { Page } from "@prisma/client";

import { db } from "~/utils/db.server";
import { Button } from "~/components/admin/Button";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";
import { createPage } from "~/models/page.server";

type LoaderData = { pages: Array<Page> };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    pages: await db.page.findMany(),
  };
  return json(data);
};

type ActionData = {
  errors?: {
    title?: string;
    body?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {

  await requireUserId(request);

  const formData = await request.formData();

  const formAction = formData.get('action')

  if (formAction === "new") {
    
    const page = await createPage({
      title: "",
      slug: "",
      status: "Draft",
      description: "",
      schema: "",
      blocks: "[]",
      publishAt: new Date
    } as Page);

    return redirect(`/admin/pages/${page.id}`);

  }

  // const page = await createPage({ title, slug, userId });

  // return redirect(`/pages`);

}


export default function AdminPage() {

  const { pages } = useLoaderData<LoaderData>();

  const refresh = () => {
    //
  }

  return (
    <PageWrapper>
      <PageHeading crumbs={[
        { label: 'Pages', path: '/pages' }
      ]} actions={(
        <Form method="post">
          <input type="hidden" name="action" value="new"/>
          <Button type="submit">
            Add Page
          </Button>
        </Form>
      )}>
        {/* <Button onClick={refresh}>
          Refresh
        </Button> */}
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
