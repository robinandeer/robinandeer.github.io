import React from 'react';

type Props = React.HTMLProps<HTMLAnchorElement>

const Anchor: React.FC<Props> = ({className, ...props}) => {
	const allProps: Props = {
		...props,
		rel: props.target === '_blank' ? 'noopener noreferrer' : props.rel,
	};

	return (
		// eslint-disable-next-line react/jsx-no-target-blank
		<a
			className={[
				'font-medium',
				'rounded',
				'cursor-pointer',
				'underline',
				'focus:outline-none',
				'focus:ring-2',
				'focus:ring-yellow-500',
				'focus:ring-opacity-50',
				className,
			].join(' ')}
			{...allProps}
		/>
	);
};

export default Anchor;
