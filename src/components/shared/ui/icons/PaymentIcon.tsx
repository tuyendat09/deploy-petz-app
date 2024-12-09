import React from 'react';

export const PaymentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60 60"
    style={{ maxWidth: '100%' }}
    height="100%"
    {...props}
  >
    <path
      d="M9,49h42c2.8,0,5-2.2,5-5V16c0-2.8-2.2-5-5-5H9c-2.8,0-5,2.2-5,5v28C4,46.8,6.2,49,9,49z M51,47H9c-1.7,0-3-1.3-3-3V28h48v16C54,45.7,52.7,47,51,47z M9,13h42c1.7,0,3,1.3,3,3v4H6v-4C6,14.3,7.3,13,9,13z"
      fill="currentColor"
    />
    <path
      d="M16.3,32h-2c-2.2,0-4,1.8-4,4v2c0,2.2,1.8,4,4,4h2c2.2,0,4-1.8,4-4v-2C20.3,33.8,18.5,32,16.3,32z"
      fill="currentColor"
    />
    <rect
      x="23.3"
      y="34.3"
      width="26.5"
      height="2"
      fill="currentColor"
    />
    <rect
      x="23.3"
      y="38.3"
      width="21.5"
      height="2"
      fill="currentColor"
    />
  </svg>
);
