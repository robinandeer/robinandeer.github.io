import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useCallback } from 'react';
import { getPostData, getSortedPosts } from 'lib/posts';

import { BlogPost } from 'types';
import Date from 'components/date';
import { FiShare } from 'react-icons/fi';
import Head from 'next/head';
import Layout from 'components/layout';
import { ParsedUrlQuery } from 'querystring';
import markdownStyles from 'styles/markdown.module.css';

interface PostPageProps {
  postData: BlogPost;
}

interface PageParams extends ParsedUrlQuery {
  slug: string[];
}

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
  const posts = getSortedPosts();
  const paths = posts.map((item) => ({ params: { slug: item.slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  const id = (params.slug as string[]).join('-');
  const postData = await getPostData(id);
  return {
    props: { postData },
  };
};

const PostPage: React.FC<PostPageProps> = ({ postData }) => {
  const handleClickShare = useCallback(async () => {
    try {
      await navigator.share({
        title: `Robin Andeer | ${postData.title}`,
        url: window.location.href,
      });
    } catch (error) {
      console.warn(error);
    }
  }, []);

  return (
    <Layout title={postData.title}>
      <Head>
        <title>{postData.title} - Robin Andeer</title>
        <meta name="description" content={postData.intro} />
        {postData.tags && <meta name="keywords" content={postData.tags} />}

        {/* Facebook/OpenGraph + Twitter */}
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={postData.intro} />
        {postData.image && <meta property="og:image" content={postData.image} />}
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${postData.id}`} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={postData.title} />
        <meta name="twitter:description" content={postData.intro} />
        {postData.image && (
          <meta name="twitter:image" content={[process.env.NEXT_PUBLIC_SITE_URL, postData.image].join('')} />
        )}
      </Head>
      <article className="max-w-3xl px-4 pt-6 pb-32 mx-auto space-y-10">
        <header>
          <h1 className="text-4xl font-bold">{postData.title}</h1>
          <div className="font-bold uppercase text-soft">
            <Date dateString={postData.date} /> <span className="text-xl leading-none">⌁</span> {postData.readTime.text}
          </div>
        </header>
        <main>
          <div className={markdownStyles['markdown']} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </main>
        {navigator.share && (
          <footer className="fixed bottom-0 right-0 p-4 lg:p-8">
            <button
              className="flex items-center justify-center w-16 h-16 space-x-2 text-lg font-bold transition-shadow duration-100 rounded-full shadow-lg hover:shadow-xl bg-rose"
              onClick={handleClickShare}
            >
              <FiShare size="24" />
            </button>
          </footer>
        )}
      </article>
    </Layout>
  );
};

export default PostPage;
