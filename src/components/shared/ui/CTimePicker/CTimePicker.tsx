import React from 'react';
import { Space, TimePicker, TimePickerProps as AntdTimePickerProps } from 'antd';
import dayjs from 'dayjs';

interface CTimePickerProps extends AntdTimePickerProps {
}

const CTimePicker = (props: CTimePickerProps) => (
  <Space wrap>
    <TimePicker 
      defaultValue={dayjs('12:08:23', 'HH:mm:ss')}
      size="large" 
      {...props} 
    />
  </Space>
);

export default CTimePicker;
