import { BlogPostGroup } from 'types';
import { FaArrowDown } from 'react-icons/fa';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from 'components/layout';
import Link from 'next/link';
import PostPreview from 'components/post-preview';
import React from 'react';
import { getGroupedPosts } from 'lib/posts';
import utilsStyles from 'styles/utils.module.css';

interface PageProps {
  allGroupsData: BlogPostGroup[];
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const allGroupsData = getGroupedPosts();
  return {
    props: { allGroupsData },
  };
};

const BlogPage: React.FC<PageProps> = ({ allGroupsData }) => {
  return (
    <Layout title="Blog">
      <Head>
        <title>Blog - Robin Andeer</title>
        <meta property="og:title" content="Blog - Robin Andeer" />
      </Head>

      <div className="space-y-24">
        <section className="max-w-3xl px-4 mx-auto space-y-6">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="text-xl">
            This is my space to write about my learning and share the things I find interesting in a longer format.
          </p>
        </section>

        <section className="max-w-4xl px-4 mx-auto space-y-24">
          <div className="space-y-2">
            <div className="flex items-center px-6 space-x-2 text-base font-bold uppercase text-soft">
              <p>My latest post</p>
              <FaArrowDown size="14" />
            </div>

            <ul className={utilsStyles.postGrid}>
              {allGroupsData[0].posts.map((item, index) => (
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
          </div>

          {allGroupsData.slice(1).map((item) => (
            <div key={item.year} className="space-y-2">
              <p className="flex items-center px-6 space-x-2 text-base font-bold uppercase text-soft">
                Posts from {item.year}
              </p>

              <ul className={utilsStyles.postGrid}>
                {item.posts.map((item) => (
                  <li key={item.id}>
                    <Link href="/blog/[...slug]" as={`/blog/${item.slug.join('/')}`}>
                      <a>
                        <PostPreview title={item.title} intro={item.intro} readTime={item.readTime.text} />
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <div className="h-4" />
      </div>
    </Layout>
  );
};

export default BlogPage;
