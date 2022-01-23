---
title: Remix Concepts in Next.js
category: tutorials
author: Robin Andeer
date: 2022-01-15
tags: tutorial, programming, web development, nextjs, remix, react
intro: Re-implementing Remix-features in Next.js to find out what I'm really missing out on.
image: /images/remix-concepts-in-nextjs.png
imageWidth: 1200
imageHeight: 628
imageAlt: Large Remix Run logo
---

[Remix](https://remix.run) is a new full stack web framework built on-top of React Router. It's been on my radar for quite a while so I was eager to dive into the [getting started tutorial](https://remix.run/docs/en/v1/tutorials/blog) after they launched their first stable release (v1).

My initial impressions are very possitive. The framework has certainly come a long way in a short amount of time. On top of that, it manages to innovate in a few areas that I wanted to share some thoughts on.

## [Next.js](https://nextjs.org/), my go-to framework

Next.js has been my baseline for any web project for the past 4-5 years. Every new release continues to surprise and impress me. It's developed into a highy polished and versetile framework and there's really no going wrong with it. I especially appreciate how closely it tracks the official React roadmap.

## Head to head

Remix borrows a lot from Next.js (the file-based routing, module export API, etc.) However, it innovates on top of that foundation to the point that I'm starting to feel just a little bit jealous. That's why I decided to implement Remix's [_Developer Blog_ tutorial](https://remix.run/docs/en/v1/tutorials/blog) - but in Next.js to get a better idea of what I'm really missing out on.

You can see the end-result in the following repo:

- Remix: [robinandeer/remix-concepts-in-nextjs/tree/remix](https://github.com/robinandeer/remix-concepts-in-nextjs/tree/remix)
- Next.js: [robinandeer/remix-concepts-in-nextjs](https://github.com/robinandeer/remix-concepts-in-nextjs) ([deployment](https://remix-concepts-in-nextjs.vercel.app))

> According to the Remix Discord it's not possible to deploy the Remix version to platforms like [Vercel](https://vercel.com/), [Fly.io](https://fly.io/), or [render.com](https://render.com/). It does feel dissapointing that the official tutorial isn't directly deployable to most of the modern platforms 🤷‍♂️. Still the same file system-based markdown storage was compatible with Next.js/Vercel.

Let's break down the main areas where I see Remix innovating so far, and how to accomplish the same things in Next.js.

## Form handling

If you are not yet familiar with forms in Remix, I recommend first getting up to speed on [Data writes](https://remix.run/docs/en/v1/guides/data-writes#plain-html-forms).

I've really enjoyed working with forms in Remix. By relying on web standards, they are able to simplify things while enabling progressive enhancement. I've struggled _a lot_ with forms in React so I'm happy they adress this topic.

What I especially like is how doing form handling and validation server-side is a great _separation of concern_. Bundling some version of [Joi](https://github.com/sideway/joi) in the browser to validate inputs client-side never felt quite right to me. And now I think I might never do so again.

### Remix-forms in Next.js

So can we achieve something like this in Next.js? It's not so far off as you might think. I believe we have all the building blocks already. We can even make the form work with JavaScript disabled - just like in Remix!

Here's the solution I came up with in a Page-component that renders a simplified "new post form":

```typescript
function NewPostPage() {
  const {submission, errors, formProps} = useForm({
    action: '/api/posts',
  });

  return (
    <form {...formProps}>
      <p>
        <label>
          Post title: {' '}
          {errors?.title ? <em>Title is required</em> : null}
          <input type="text" name="title" />
        </label>
      </p>

      <p>
        <button type="submit">
          {submission ? 'Creating post...' : 'Create post'}
        </button>
      </p>
    </form>
  );
}
```

Full example: [src/pages/admin/new.tsx](https://github.com/robinandeer/remix-concepts-in-nextjs/blob/main/src/pages/admin/new.tsx)

### The `useForm` hook

```typescript
export function useForm(action) {
  const [{submission, errors}, setFormState] = useState(
    {submission: false, errors: null}
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormState({submission: true, errors: null});

    const response = await fetch(action, {
      method: 'post',
      body: new FormData(event.currentTarget),
    });

    if (response.ok) {
      setFormState({submission: false, errors: null});
      if (response.redirected) {
        router.push(response.url);
      }
    } else {
      const {errors} = await response.json();
      setFormState({submission: false, errors});
    }
  };

  const formProps = {
    action,
    method,
    onSubmit: handleSubmit,
  };

  return {submission, errors, formProps};
}
```

Full example: [src/use-form.ts](https://github.com/robinandeer/remix-concepts-in-nextjs/blob/main/src/use-form.ts).

First we need a generic hook that does the following:

1. Submits the form data to a given endpoint
1. Keeps track of some state telling us when the form is "submitting"
1. Returning validation errors reported by the server
1. Forwarding any redirects that the server responds with

This replaces the main functionality provided through the Remix-hooks as well as the `<Form />` component.

### Using an API route to handle form submission

```typescript
export default async function newPost(req, res) {
  const {title} = await getFormData(req);

  const errors = {};
  if (!title) {
    errors.title = true;
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({errors});
  }

  await createPost({title, slug, markdown});
  res.redirect('/admin');
}
```

Full example: [src/pages/api/posts/index.ts](https://github.com/robinandeer/remix-concepts-in-nextjs/blob/main/src/pages/api/posts/index.ts).

To replace the `action`-handler from Remix we use an API route. It's responsible for handling the form submission and validating the input. This is essentially the same as in Remix although we miss out on the benefits that come from co-location with the page component. We also need to manually polyfill the `FormData` API (I used `formiddable`) to be able to use it in Node.

## SSR all the way

Again, start by making sure you know how Remix handles [Data Loading](https://remix.run/docs/en/v1/guides/data-loading).

If you chose the red JAMStack-pill, you might be sceptical about server-rendering. However, [Ryan](https://twitter.com/ryanflorence), [Michael](https://twitter.com/mjackson), and [Kent](https://twitter.com/kentcdodds) makes a convincing argument that [SSR is the way to go](https://remix.run/blog/remix-vs-next#why-the-apps-are-fast). There's some liberty in that. Instead of deciding between SSR, SSG, or ISG for each page I can get on with my life and focus on more domain-specific problems.

The theme here really is a return to how things used to work (server rendered and relying on web standards) but with the twist that React is just one hook away to progressively add interactivity to any page. A quite elegant by-product is how much of the Remix site works even with JavaScript disabled. Especially for projects that are less apps and more websites this approach makes a great deal of sense.

[Lee Robinson](https://twitter.com/leeerob) provides some nuance in this Twitter-thread claiming the benefits or static hosting when availability is your primary concern:

<blockquote className="twitter-tweet"><p lang="en" dir="ltr">1/ How can I optimize my frontend for the best availability? <br /><br />I want to guarantee customers will almost never see a broken page.<br /><br />What would the architecture and infrastructure look like?</p>&mdash; Lee Robinson (@leeerob) <a href="https://twitter.com/leeerob/status/1484668682445930500?ref_src=twsrc%5Etfw">January 21, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

My takeaway is still that SSR is a viable option for a variety of scenarios and can significantly reduce client-side complexity. Many times it's worth loading data on the server for no other reason than to avoid "spinnmageddon".

### Next.js leading the way

```typescript
export const getServerSideProps = async () => ({
  props: {
    posts: await getPosts(),
  },
});

export default function Posts({posts}) {
  return (
    <ul>
      {posts.map(post => (
        <li key={post.slug}>
          <Link href={`/posts/${post.slug}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

Full example: [src/pages/index.tsx](https://github.com/robinandeer/remix-concepts-in-nextjs/blob/main/src/pages/index.tsx)

Next.js already has excellent SSR-support through `getServerSideProps`. The main difference from the Remix `loader`-function seems to be that the data is accessed through a hook in Remix and directly through page props in Next.js.

## Nested routes

If you need a refresher on this topic, take a look at Remix's guide on [Layout Routes](https://remix.run/docs/en/v1/api/conventions#layout-routes).

I remember being introduced to nested routing in [Ember.js](https://emberjs.com/) a long long time ago. It always felt like a powerful concept if you were building e.g. an email client with a standard sidebar layout. However, in projects I've worked on I haven't seen the use case pop-up more than a few times. It could be because these sites were built with mobile-first in mind where you naturally focus on pages that have a single concern. Therefore, I wouldn't say it's a killer feature for me.

### Using layout components

My Next.js solution uses a [simple layout component](https://github.com/robinandeer/remix-concepts-in-nextjs/blob/main/src/components/admin-layout.tsx).

```typescript
import AdminLayout from '~/components/admin-layout';

export default function AdminPage({posts}: Props) {
  return (
    <AdminLayout posts={posts}>
      <p>
        <Link href="/admin/new">Create a New Post</Link>
      </p>
    </AdminLayout>
  );
}
```

Totally doable and with a lot less magic than the Remix version. However, for deeply nested routes it does get complicated to [pass all page props](https://github.com/robinandeer/remix-concepts-in-nextjs/blob/main/src/pages/admin/posts/%5Bslug%5D/edit.tsx) while keeping the solution [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

## Conclusion

That was a lot! Thanks for sticking with it to the end. I certainly learned a lot from just going through the simple Remix getting started tutorial. There's plenty of great ideas to get inspired by and some you can take advantage of without fully committing to a new framework.

> If you wanna dig deeper into the "remixed" Next.js-version of the developer blog, do check out [the full project repo](https://github.com/robinandeer/remix-concepts-in-nextjs).

I will keep an eye on Remix for sure. They've come a long way but Next.js is still more mature (Fast Refresh), more feature complete (i18n), and more closely tracks the future of React which is why I will probably stick with it for the time being. However, I will keep learning and stealing the best Remix ideas to improve my own projects.

<blockquote className="twitter-tweet"><p lang="en" dir="ltr">Remix started with the hard part (the bridge between the client and server) and is working its way further up and down the stack from there.<a href="https://twitter.com/remix_run?ref_src=twsrc%5Etfw">@remix_run</a> isn&#39;t done, but the hard part is. And you can feel it when you&#39;re building/using remix apps.<a href="https://t.co/EYM4eajR41">https://t.co/EYM4eajR41</a></p>&mdash; Kent C. Dodds 💿 (@kentcdodds) <a href="https://twitter.com/kentcdodds/status/1482847024101740547?ref_src=twsrc%5Etfw">January 16, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
