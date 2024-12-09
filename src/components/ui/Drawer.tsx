import React, { useEffect, useState } from 'react';
import { Checkbox, Drawer } from 'antd';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Box, Collapse } from '@mui/material';
import type { CheckboxProps } from 'antd';
import { useGetProductsQuery } from '@/libs/features/services/product';
import { useGetCategoriesQuery } from '@/libs/features/services/categories';
import { Categories } from "@/types/Categories";
interface CDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: string[];
  category: string[];
  priceRange: { from: string; to: string };
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
  setCategory: React.Dispatch<React.SetStateAction<string[]>>;
  setPriceRange: React.Dispatch<React.SetStateAction<{ from: string; to: string }>>;
}

const CDrawer: React.FC<CDrawerProps> = ({ category, setCategory, priceRange, setPriceRange, filters, setFilters, open, onClose, setPage }) => {
  const { refetch, data, isLoading } = useGetProductsQuery({ limit: 999 });
  const { data: categories } = useGetCategoriesQuery();
  const [sizes, setSizes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [openState, setOpenState] = useState<{ [key: string]: boolean }>({
    section1: false,
    section2: false,
    section3: false
  });
  const formatCurrency = (value: string) => {
    let formattedValue = value.replace(/[^\d.-]/g, '');
    const numValue = parseFloat(formattedValue);
    if (isNaN(numValue)) return '';
    return numValue.toLocaleString();
  };
  const toggleSection = (key: string) => {
    setOpenState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  useEffect(() => {
    const newSizes = data?.products?.flatMap((product) =>
      product.productOption?.map((option) => option.name) || []
    );
    const allPrices = data?.products?.flatMap((product) =>
      product.productOption?.map((option) => option.productPrice) || []
    );
    const filteredPrices = allPrices?.filter(price => price !== undefined && price !== null);
    const maxPrice = filteredPrices && filteredPrices.length > 0 ? Math.max(...filteredPrices) : 0;

    setMaxPrice(maxPrice);
    const uniqueSizes = Array.from(new Set(newSizes));
    setSizes(uniqueSizes);
  }, [data]);

  const onChange: CheckboxProps['onChange'] = (e) => {
    const { checked, value } = e.target;
    setPage(1);
    if (checked) {
      setFilters((prev) => [...prev, value]);
    } else {
      setFilters((prev) => prev.filter((item) => item !== value));
    }
  }
  
  const onPrice = (type: 'from' | 'to', value: string) => {
    const formattedValue = formatCurrency(value);

    setPriceRange((prev) => ({
      ...prev,
      [type]: formattedValue
    }));
  };

  const onCategoryFilter: CheckboxProps['onChange'] = (e) => {
    const { checked, value } = e.target;
    setPage(1);
    if (checked) {
      setCategory((prev) => [...prev, value]);
    } else {
      setCategory((prev) => prev.filter((item) => item !== value));
    }
  }
  return (
    <Drawer title="Tìm theo" onClose={onClose} open={open}>
      <div>
        <div>
          <button onClick={() => toggleSection('section1')} className={`w-[100%] bg-[#f7f7f3] border-1 ${openState.section1 ? 'border-[#a8a87b]' : 'border-none'} flex flex-row items-center justify-between rounded-[6px] px-[15px] py-[10px]`}>
            <span className='text-[14px] font-[500]'>Kích thước</span>
            <Icon icon="lsicon:down-filled" width={20} />
          </button>
          <Collapse in={openState.section1}>
            <Box className='flex flex-col gap-[8px] mt-[10px]'>
              {sizes.map((size, i) => {
                return (
                  <Checkbox 
                    className='font-[400]' 
                    key={i} 
                    onChange={onChange}
                    value={size}
                  >
                    {size}
                  </Checkbox>
                )
              })}
            </Box>
          </Collapse>
          <button onClick={() => toggleSection('section2')} className={`mt-[15px] w-[100%] bg-[#f7f7f3] border-1 ${openState.section2 ? 'border-[#a8a87b]' : 'border-none'} flex flex-row items-center justify-between rounded-[6px] px-[15px] py-[10px]`}>
            <span className='text-[14px] font-[500]'>Mức giá</span>
            <Icon icon="lsicon:down-filled" width={20} />
          </button>
          <Collapse in={openState.section2}>
            <Box className='flex flex-col gap-[8px] mt-[10px]'>
              <h1>Giá lớn nhất là <b className='font-[500]'>{formatCurrency(maxPrice.toString())}</b></h1>
              <input value={priceRange.from} className='border border-[#E9EAEB] px-[10px] py-[10px] outline-none' name='fromPrice' type='text' placeholder='Từ' onChange={(e) => onPrice('from', e.target.value)} />
              <input value={priceRange.to} className='border border-[#E9EAEB] px-[10px] py-[10px] outline-none' name='toPrice' type='text' placeholder='Đến' onChange={(e) => onPrice('to', e.target.value)} />
            </Box>
          </Collapse>
          <button onClick={() => toggleSection('section3')} className={`mt-[15px] w-[100%] bg-[#f7f7f3] border-1 ${openState.section1 ? 'border-[#a8a87b]' : 'border-none'} flex flex-row items-center justify-between rounded-[6px] px-[15px] py-[10px]`}>
            <span className='text-[14px] font-[500]'>Loại</span>
            <Icon icon="lsicon:down-filled" width={20} />
          </button>
          <Collapse in={openState.section3}>
            <Box className='flex flex-col gap-[8px] mt-[10px]'>
              {categories?.map((item: Categories, i: number) => {
                return (
                  <Checkbox 
                    className='font-[400]' 
                    key={i} 
                    onChange={onCategoryFilter}
                    value={item._id}
                  >
                    {item.categoryName}
                  </Checkbox>
                );
              })}
            </Box>
          </Collapse>
        </div>
      </div>
    </Drawer>
  );
};

export default CDrawer;
