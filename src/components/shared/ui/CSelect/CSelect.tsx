import React from 'react';
import { Select, Space, SelectProps } from 'antd';
import './index.css';

interface CSelectProps extends SelectProps<string> {
  handleChange?: (value: string) => void;
  options: { value: string; label: React.ReactNode }[];
}

const CSelect = ({ handleChange, options, ...props }: CSelectProps) => (
  <Space wrap>
    <Select
      defaultValue="en"
      onChange={handleChange}
      options={options}
      className='w-[90px] custom-select'
      {...props}
    />
  </Space>
);

const CServiceSelect = ({ defaultValue, handleChange, options, ...props }: CSelectProps) => (
  <Space wrap>
    <Select
      defaultValue="Select a service"
      onChange={handleChange}
      options={options}
      {...props}
    />
  </Space>
);
export {CSelect, CServiceSelect};
