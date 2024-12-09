import React from 'react';
import { ConfigProvider, DatePicker, DatePickerProps } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
dayjs.locale('vi');

export const CDatePicker = (props: DatePickerProps) => (
  <ConfigProvider locale={viVN}>
    <DatePicker format="DD-MM-YYYY" {...props} />
  </ConfigProvider>
);
