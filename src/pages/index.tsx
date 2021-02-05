import { EncodableFrontMatter, FrontMatter } from 'types';
import { HiArrowDown, HiArrowRight } from 'react-icons/hi';
import { POSTS_PATH, postFilePaths } from 'utils';

import { GetStaticProps } from 'next';
import Link from 'next/link';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

interface BlogPost {
  content: string;
  data: EncodableFrontMatter;
  filePath: string;
}

interface PageProps {
  posts: BlogPost[];
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const posts = postFilePaths
    .map((filePath) => {
      const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
      const { content, data } = matter(source);

      return {
        content,
        data: data as FrontMatter,
        filePath,
      };
    })
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map<BlogPost>((item) => ({
      ...item,
      data: {
        ...item.data,
        date: item.data.date.toString(),
      },
    }));

  return { props: { posts } };
};

const HomePage: React.FC<PageProps> = ({ posts }) => {
  return (
    <div className="flex flex-col py-12 mx-auto lg:flex-row max-w-7xl lg:py-0 lg:h-screen lg:space-x-12">
      <header className="px-6 pb-12 space-y-2 lg:py-12 lg:flex-1">
        <p className="space-x-2 text-base uppercase text-cyan-600 dark:text-cyan-500">Introduction</p>
        <h1 className="text-3xl font-medium text-warmGray-700 dark:text-warmGray-300">Hey, I&apos;m Robin Andeer</h1>
        <p className="text-lg text-warmGray-700 dark:text-warmGray-300">
          Full-stack developer and tech guide. Jamstack + React = ♡. Fighting to defy gravity in gymnastics. Probably
          thinking of where to travel next.
        </p>
        <p className="text-lg text-warmGray-700 dark:text-warmGray-300">
          Constantly learning at{' '}
          <a href="https://futurice.com/" target="_blank" rel="noreferrer" className="text-emerald-600">
            Futurice
          </a>{' '}
          in Stockholm.
        </p>
      </header>
      <div className="border-b border-warmGray-200 dark:border-warmGray-800 lg:border-r lg:border-t-0" />
      <main className="px-6 pt-12 space-y-6 lg:overflow-y-scroll lg:flex-1">
        <p className="space-x-2 text-base uppercase text-cyan-600 dark:text-cyan-500">Latest posts</p>
        <div className="space-y-6 lg:space-y-10">
          {posts.slice(0, 5).map((post) => {
            const id = post.filePath.replace(/\.md$/, '');
            const slug = [...id.split('-').slice(0, 3), id.split('-').slice(3).join('-')];

            return (
              <div key={post.filePath} className="space-y-6">
                <Link href={['/blog', ...slug].join('/')}>
                  <a className="block max-w-xl space-y-2 group">
                    <h2 className="text-xl font-medium text-warmGray-900 dark:text-warmGray-200">{post.data.title}</h2>
                    <p className="text-base dark:text-warmGray-300 text-warmGray-700">{post.data.intro}</p>
                    <p className="flex flex-row items-center space-x-2 text-base font-medium opacity-40 text-warmGray-600 dark:text-warmGray-400 group-hover:text-warmGray-900 dark:group-hover:text-warmGray-200 group-hover:opacity-100">
                      <span>Read more</span>
                      <HiArrowRight
                        size={16}
                        className="transition-transform transform -translate-x-1 opacity-0 text-rose-500 group-hover:opacity-100 group-hover:translate-x-0"
                      />
                    </p>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
        <button className="flex flex-row items-center justify-center w-full h-10 rounded bg-cyan-100 text-cyan-600 hover:bg-cyan-200">
          All posts
        </button>
      </main>
    </div>
  );
};

export default HomePage;
