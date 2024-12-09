import FormEditProduct from "@/components/admin/Shop/EditProduct/FormEditProduct";

export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  return <FormEditProduct slug={slug} />;
}
