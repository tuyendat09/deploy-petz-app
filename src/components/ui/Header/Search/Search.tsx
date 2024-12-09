import { motion } from "framer-motion";
import SearchInput from "./SearchInput";
import SearchProduct from "./SearchProduct";
import SearchBody from "./SearchBody";
import useHandleSearch from "./useHandleSearch";

const variant = {
  hidden: { opacity: 0, translateX: 40 },
  visible: { opacity: 1, translateX: 0 },
};

export default function Search() {
  const { handleSearch, products } = useHandleSearch();

  return (
    <motion.div
      variants={variant}
      initial={"hidden"}
      exit={"hidden"}
      animate={"visible"}
      className="glass mt-4 w-full origin-right rounded-[15px] shadow-sm"
    >
      <SearchInput handleSearch={handleSearch} />
      <SearchBody productAmount={products ? products?.products.length : 0}>
        {products?.products.length === 0 && <p className="text-[15px] text-gray-700">No product match your search.</p>}
        {products?.products.map((product) => (
          <SearchProduct
            key={product._id}
            productImg={product.productThumbnail}
            productPrice={product.productOption[0].productPrice}
            productSalePercent={product.salePercent}
            productName={product.productName}
            productSlug={product.productSlug}
          />
        ))}
      </SearchBody>
    </motion.div>
  );
}
