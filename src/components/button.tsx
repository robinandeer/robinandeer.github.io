import type {ComponentPropsWithoutRef, FC} from 'react';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  type: ComponentPropsWithoutRef<'button'>['type']
}

type LinkProps = ComponentPropsWithoutRef<'a'>

type Props = ButtonProps | LinkProps

const hasHref = (props: Props): props is LinkProps => 'href' in props;

const Button: FC<Props> = ({className, ...props}) => {
	const baseProps = {
		className: [
			'rounded-lg',
			'py-2',
			'bg-gray-50',
			'hover:bg-opacity-90',
			'active:bg-opacity-100',
			'dark:bg-gray-500',
			'dark:bg-opacity-90',
			'dark:hover:bg-opacity-80',
			'dark:active:bg-opacity-90',
			'text-gray-900',
			'dark:text-gray-50',
			'font-medium',
			'text-base',
			'text-center',
			'focus:outline-none',
			'focus:ring-2',
			'focus:ring-yellow-500',
			'focus:ring-opacity-50',
			className,
		].join(' '),
	};

	if (hasHref(props)) {
		const extraProps = {
			...(props.href?.startsWith('http') ? {target: '_blank', rel: 'noopener noreferrer'} : {}),
		};

		// eslint-disable-next-line react/jsx-no-target-blank
		return <a {...props} {...baseProps} {...extraProps}/>;
	}

	// @ts-ignore - button type mismatch
	// eslint-disable-next-line react/button-has-type
	return <button {...props} {...baseProps}/>;
};

export default Button;
