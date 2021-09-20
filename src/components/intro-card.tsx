import React from 'react';
import {GiHand} from 'react-icons/gi';
import {RiContrastFill} from 'react-icons/ri';

const IntroCard: React.FC = ({children}) => (
	<div className="flex flex-row gap-3 sm:gap-6 items-center card">
		<div className="rounded-full w-12 h-12 bg-gray-200 dark:bg-gray-300 flex-shrink-0 flex items-center justify-center">
			<RiContrastFill className="text-white w-10 h-10"/>
		</div>
		<div>
			<div className="flex items-center gap-1">
				<h1 className="text-xl font-medium">Hey, I’m Robin</h1>
				<GiHand className="w-6 h-6"/>
			</div>
			<p className="text-base text-gray-600 dark:text-gray-200">{children}</p>
		</div>
	</div>
);

export default IntroCard;
