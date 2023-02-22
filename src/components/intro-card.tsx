import {CgCrowdfire} from 'react-icons/cg';
import React from 'react';

interface Props {
	children: React.ReactNode;
}

const IntroCard = ({children}: Props) => (
	<div className='flex flex-row gap-3 sm:gap-6 items-center card padded'>
		<div className='rounded-full w-12 h-12 bg-black flex-shrink-0 flex items-center justify-center'>
			<CgCrowdfire className='text-white w-8 h-8'/>
		</div>
		<div>
			<div className='flex items-center gap-1'>
				<h1 className='text-xl font-medium'>Hey, I&rsquo;m Robin</h1>
			</div>
			<p className='text-base text-gray-600 dark:text-gray-100'>{children}</p>
		</div>
	</div>
);

export default IntroCard;
