import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import './CartStepper.css';
const steps = ['Giỏ hàng', 'Đặt hàng', 'Thanh toán', 'Hoàn thành đơn'];

export default function CartStepper ({ activeStep }: { activeStep: number }) {
  return (
    <Box sx={{ width: '900px' }} className="border border-gray-200 p-[20px] rounded-tl-[20px] rounded-br-[20px]">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => {
          return (
            <Step key={label} className='custom-steps'>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}