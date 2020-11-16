import { BlogPost, BlogPostPreview } from 'types';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getPostData, getPreviousAndNextPost, getSortedPosts } from 'lib/posts';

import Date from 'components/date';
import Head from 'next/head';
import Layout from 'components/layout';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import markdownStyles from 'styles/markdown.module.css';

interface PostPageProps {
  postData: BlogPost;
  prevPost: BlogPostPreview | null;
  nextPost: BlogPostPreview | null;
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
  const prevAndNextPost = getPreviousAndNextPost(id);
  return {
    props: { postData, ...prevAndNextPost },
  };
};

const PostPage: React.FC<PostPageProps> = ({ postData, prevPost, nextPost }) => {
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

      <article className="max-w-3xl px-4 py-6 mx-auto space-y-10">
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

      <footer className="flex flex-col items-center justify-center max-w-4xl px-4 pt-16 pb-32 mx-auto space-y-6 border-t border-border sm:flex-row sm:justify-between sm:space-y-0">
        {nextPost ? (
          <div className="space-y-1">
            <p className="pl-1 text-sm font-bold text-center text-soft sm:text-left">Next post</p>
            <Link href="/blog/[...slug]" as={`/blog/${nextPost.slug.join('/')}`}>
              <a className="block px-4 py-3 font-bold rounded-lg text-text bg-raised-background hover:bg-border">
                {nextPost.title}
              </a>
            </Link>
          </div>
        ) : (
          <div />
        )}
        {prevPost && (
          <div className="space-y-1">
            <p className="pr-1 text-sm font-bold text-center text-soft sm:text-right">Previous post</p>
            <Link href="/blog/[...slug]" as={`/blog/${prevPost.slug.join('/')}`}>
              <a className="block px-4 py-3 font-bold rounded-lg text-text bg-raised-background hover:bg-border">
                {prevPost?.title}
              </a>
            </Link>
          </div>
        )}
      </footer>
    </Layout>
  );
};

export default PostPage;
