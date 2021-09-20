import React from 'react';
import {RiArrowLeftCircleFill} from 'react-icons/ri';

const BackLink: React.FC = ({children, ...props}) => (
	// eslint-disable-next-line react/jsx-no-target-blank
	<a className="text-gray-700 dark:text-gray-300 text-base hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-50 active:bg-gray-200 dark:active:bg-gray-600 rounded inline-block px-2 py-1 -ml-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50" {...props}>
		<div className="flex items-center gap-1">
			<RiArrowLeftCircleFill className="w-5 h-5"/>
			{children}
		</div>
	</a>
);

export default BackLink;
