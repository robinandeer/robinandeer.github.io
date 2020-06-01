import React from 'react';

type LogoProps = {
  color?: string;
  size?: string | number;
};

const Logo: React.FC<LogoProps> = ({ color = 'currentColor', size = 67 }) => (
  <svg width={size} height={size} viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="47" cy="39" r="20" fill={color} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M34.5707 20.3578C28.2793 23.7274 23.9999 30.3639 23.9999 38C23.9999 40.8107 24.5797 43.486 25.6262 45.9129C25.092 45.9704 24.5494 46 23.9999 46C15.7156 46 8.99988 39.2843 8.99988 31C8.99988 22.7157 15.7156 16 23.9999 16C28.1239 16 31.8591 17.6642 34.5707 20.3578Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.2721 14.2475C12.7504 15.4457 7.70472 20.8619 7.06792 27.5633C2.97578 26.3102 0 22.5026 0 18C0 12.4772 4.47715 8 10 8C14.1957 8 17.788 10.584 19.2721 14.2475Z"
      fill={color}
    />
  </svg>
);

export default Logo;