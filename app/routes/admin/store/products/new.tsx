import { Button } from "~/components/admin/Button";
import { PageHeading } from "~/components/admin/PageHeading";
import { PageWrapper } from "~/components/admin/PageWrapper";

export default function AdminPage() {

  const save = () => {
    //
  }

  return (
    <PageWrapper>
      <PageHeading crumbs={[
        { label: 'Store', path: '/store' },
        { label: 'Products', path: '/store/products' },
        { label: 'New Product', path: '/store/products/new' }
      ]}>
        <Button onClick={save}>
          Add Product
        </Button>
      </PageHeading>
    </PageWrapper>
  );
}
