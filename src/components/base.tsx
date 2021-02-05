import * as React from 'react';

import { HiArrowNarrowRight } from 'react-icons/hi';

export interface BaseElementProps {
  className?: string;
}

export const Paragraph: React.FC<BaseElementProps> = ({ children, className }) => (
  <p className={['text-lg leading-relaxed text-gray-800 dark:text-gray-200', className].join(' ')}>{children}</p>
);

export const Heading2: React.FC<BaseElementProps> = ({ children, className }) => (
  <h2 className={['text-3xl font-medium text-indigo-800 dark:text-yellow-400', className].join(' ')}>{children}</h2>
);

export const Heading3: React.FC<BaseElementProps> = ({ children, className }) => (
  <h3 className={['text-xl font-medium text-black dark:text-gray-200', className].join(' ')}>{children}</h3>
);

export const List: React.FC = ({ children }) => <ul className="space-y-4">{children}</ul>;

export const OrderedList: React.FC = ({ children }) => (
  <ol className="space-y-4">
    {React.Children.map(children, (child, index) =>
      React.isValidElement(child) ? React.cloneElement(child, { order: index + 1 }) : child,
    )}
  </ol>
);

const UnorderedListItem: React.FC = ({ children }) => (
  <li className="flex flex-row space-x-4 list-none">
    <HiArrowNarrowRight className="flex-shrink-0 text-fuchsia-700 dark:text-fuchsia-600" />
    <div className="relative -top-1.5">
      <Paragraph>{children}</Paragraph>
    </div>
  </li>
);

const OrderedListItem: React.FC<{ order: number }> = ({ children, order }) => (
  <li className="flex flex-row space-x-4 list-none">
    <div className="relative mt-px text-sm font-medium top-1 text-fuchsia-700 dark:text-fuchsia-600">{order}.</div>
    <Paragraph>{children}</Paragraph>
  </li>
);

export const ListItem: React.FC<{ order?: number }> = ({ order, ...props }) =>
  order ? <OrderedListItem order={order} {...props} /> : <UnorderedListItem {...props} />;

export const PreformattedText: React.FC<BaseElementProps> = ({ children, className }) => (
  <pre className={['md:rounded', className].join(' ')}>{children}</pre>
);

export const EmphasisText: React.FC<BaseElementProps> = ({ children, className }) => (
  <em className={['text-rose-600 dark:text-indigo-500', className].join(' ')}>{children}</em>
);

export const InlineCode: React.FC<BaseElementProps> = ({ children, className }) => (
  <code
    className={[
      'py-1 px-2 bg-coolGray-200 rounded text-base whitespace-nowrap dark:bg-coolGray-700 dark:text-gray-300',
      className,
    ].join(' ')}
  >
    {children}
  </code>
);

export const Anchor: React.FC<React.HTMLProps<HTMLAnchorElement>> = ({ className, ...props }) => (
  <a className={['text-indigo-500 dark:text-rose-500 hover:underline', className].join(' ')} {...props} />
);

export const StrongText: React.FC<BaseElementProps> = ({ children, className }) => (
  <strong className={['font-medium', className].join(' ')}>{children}</strong>
);

export const HorizontalRule: React.FC<BaseElementProps> = ({ className }) => (
  <hr className={['border-2 border-warmGray-200 dark:border-warmGray-800', className].join(' ')} />
);

export const Blockquote: React.FC<BaseElementProps> = ({ children, className }) => (
  <blockquote
    className={['border-l-8 dark:bg-warmGray-800 bg-coolGray-100 p-4 border-warmGray-700 md:rounded', className].join(
      ' ',
    )}
  >
    {children}
  </blockquote>
);
