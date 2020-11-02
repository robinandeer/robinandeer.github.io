import { GetStaticPaths, GetStaticProps } from 'next';
import { getPostData, getSortedPosts } from 'lib/posts';

import { BlogPost } from 'types';
import Date from 'components/date';
import Head from 'next/head';
import Layout from 'components/layout';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
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
  return (
    <Layout title={postData.title}>
      <Head>
        <title>{postData.title} - Robin Andeer</title>
        <meta name="description" content={postData.intro} key="description" />
        {postData.tags && <meta name="keywords" content={postData.tags} key="keywords" />}

        {/* Facebook/OpenGraph + Twitter */}
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={postData.intro} />
        <meta
          property="og:image"
          content={[process.env.NEXT_PUBLIC_SITE_URL, postData.image || '/images/twitter-card.png'].join('')}
        />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${postData.id}`} />

        <meta name="twitter:title" content={postData.title} />
        <meta name="twitter:description" content={postData.intro} />
        <meta
          name="twitter:image"
          content={[process.env.NEXT_PUBLIC_SITE_URL, postData.image || '/images/twitter-card.png'].join('')}
        />
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
      </article>
    </Layout>
  );
};

export default PostPage;
