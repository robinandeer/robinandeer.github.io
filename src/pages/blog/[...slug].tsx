import * as Base from 'components/base';

import { GetStaticPaths, GetStaticProps } from 'next';
import Image, { ImageProps } from 'next/image';
import { POSTS_PATH, postFilePaths } from 'utils';

import { FrontMatter } from 'types';
import { ParsedUrlQuery } from 'querystring';
import fs from 'fs';
import hydrate from 'next-mdx-remote/hydrate';
import matter from 'gray-matter';
import path from 'path';
import prism from 'remark-prism';
import renderToString from 'next-mdx-remote/render-to-string';

function ProseImage(props: ImageProps) {
  return (
    <div className="-mx-4">
      <Image {...props} />
    </div>
  );
}

const ProseHeading2: React.FC = ({ children }) => <Base.Heading2 className="pt-6">{children}</Base.Heading2>;

const COMPONENTS = {
  Image: ProseImage,
  p: Base.Paragraph,
  h2: ProseHeading2,
  h3: Base.Heading3,
  ul: Base.List,
  ol: Base.OrderedList,
  li: Base.ListItem,
  pre: Base.PreformattedText,
  em: Base.EmphasisText,
  inlineCode: Base.InlineCode,
  a: Base.Anchor,
  strong: Base.StrongText,
  hr: Base.HorizontalRule,
  blockquote: Base.Blockquote,
};

interface PageProps {
  source: string;
  frontMatter: FrontMatter;
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${(params.slug as string[]).join('-')}.md`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await renderToString(content, { components: COMPONENTS, mdxOptions: { remarkPlugins: [prism] } });

  return {
    props: {
      source: mdxSource,
      frontMatter: {
        ...data,
        date: data.date.toString(),
      } as FrontMatter,
    },
  };
};

interface PageParams extends ParsedUrlQuery {
  slug: string[];
}

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
  const paths = postFilePaths
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug: [...slug.split('-').slice(0, 3), slug.split('-').slice(3).join('-')] } }));

  return {
    paths,
    fallback: false,
  };
};

const BlogPostPage: React.FC<PageProps> = ({ source, frontMatter }) => {
  const content = hydrate(source, { components: COMPONENTS });
  return (
    <div className="pb-24 bg-white dark:bg-warmGray-900">
      <header className="flex flex-col justify-center h-64 max-w-3xl p-6 mx-auto space-y-1 md:items-center md:h-72 lg:h-96">
        <div className="text-sm font-medium uppercase text-fuchsia-400 md:text-center">{frontMatter.category}</div>
        <h1 className="text-3xl font-medium md:text-4xl dark:text-gray-200 md:text-center">{frontMatter.title}</h1>
      </header>
      <main className="max-w-3xl px-4 pb-6 mx-auto space-y-6 prose lg:pb-10">{content}</main>
    </div>
  );
};

export default BlogPostPage;
