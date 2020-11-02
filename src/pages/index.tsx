import Layout, { siteTitle } from '../components/layout';

import { BlogPostPreview } from 'types';
import { FaArrowDown } from 'react-icons/fa';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import PostPreview from 'components/post-preview';
import React from 'react';
import { getSortedPosts } from '../lib/posts';
import utilsStyles from 'styles/utils.module.css';

interface HomePageProps {
  allPostsData: BlogPostPreview[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const allPostsData = getSortedPosts();
  return { props: { allPostsData } };
};

const HomePage: React.FC<HomePageProps> = ({ allPostsData }) => {
  return (
    <Layout title={siteTitle}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <main className="space-y-32">
        <section className="max-w-3xl px-4 mx-auto space-y-6">
          <h1 className="text-4xl font-bold">{siteTitle}</h1>
          <p className="text-xl">
            Full-stack developer and tech guide. Jamstack + React = ♡. Fighting to defy gravity in gymnastics. Probably
            thinking of where to travel next.
          </p>
          <p className="text-xl">
            Constantly learning at{' '}
            <a className="text-pine link" href="https://futurice.com/">
              Futurice
            </a>{' '}
            in Stockholm.
          </p>
        </section>

        <section className="max-w-4xl px-4 mx-auto space-y-2">
          <div className="flex items-center px-6 space-x-2 text-sm font-bold uppercase text-soft">
            <p>Start reading here</p>
            <FaArrowDown size="14" />
          </div>
          <ul className={utilsStyles.postGrid}>
            {allPostsData.slice(0, 4).map((item, index) => (
              <li key={item.id}>
                <Link href="/blog/[...slug]" as={`/blog/${item.slug.join('/')}`}>
                  <a>
                    <PostPreview
                      title={item.title}
                      intro={item.intro}
                      readTime={item.readTime.text}
                      highlight={index === 0}
                    />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section />
      </main>
    </Layout>
  );
};

export default HomePage;
