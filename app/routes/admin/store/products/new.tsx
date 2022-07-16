import { PageHeading } from "~/components/admin/PageHeading";
import { PageWrapper } from "~/components/admin/PageWrapper";
import { Table } from "~/components/admin/Table";

export default function AdminPage() {

  return (
    <PageWrapper>
      <PageHeading crumbs={[
        { label: 'Store', path: '/store' },
        { label: 'Products', path: '/store/products' },
        { label: 'New Product', path: '/store/products/new' }
      ]}>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          Save
        </button>
      </PageHeading>
    </PageWrapper>
  );
}
