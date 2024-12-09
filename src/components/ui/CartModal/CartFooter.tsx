import Link from "next/link";
import Button from "@/components/ui/Button";
export default function CartFooter() {
  return (
    <div>
      <div className="flex items-center p-4 text-white">
        <h1 className="text-lg font-medium">Subtotal :</h1>
        <p className="ml-auto">149.00$</p>
      </div>
      <Button additionClass="w-full">
        <Link href="/cart">Proceed to checkout</Link>
      </Button>
    </div>
  );
}
