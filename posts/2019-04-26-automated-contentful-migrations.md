---
title: Automated Contentful migrations
category: tutorial
author: Robin Andeer
date: 2019-04-26
tags: tutorials, javascript, contentful
intro: How to use the official migration tool & model content as code.
---

Did you know that Contentful has a [migration tool](https://github.com/contentful/contentful-migration)? Although it's currently in BETA, it's already very useful and I'd recommend investigating it whether you're starting from scratch or planning to further develop an existing Contentful space.

In this guide I'll go over the motivation behind automating migrations, give you an intro to how they are scripted, and finally point you to some additional resources.

> Not sure what Contentful is? Have a look at this [intro to headless CMS:s](https://headlesscms.org/about).

## What is this tool about? 🤔

As Contentful puts it: the migration tool helps you "describe and execute changes to your content model and transform entry content."

## Motivation 🙌

- **Documented and versioned content types**

  Contentful's web UI is great for exploring all the options available to you. However, defining your content types in code helps you document the specifics of your setup, version it, and makes it possible to automatically setup a new space/environment with _one single command_.

- **Automated and predictable migrations**

  Whenever you make changes to your models or content, you can describe what should happen, make sure it will work as expected, execute the updates it in one command, and repeat the _exact same updates_ to any environment.

## How to script Contentful migrations ✅

On a high level there are three steps to perform a migration:

1. Install and configure the Contentful CLI
1. Write your migration script
1. Apply the migration using the CLI

> I will use the official Contentful command line interface for this tutorial, but it could be worth knowing that it's possible to integrate the library in your own Node.js scripts by installing it as a module. Pretty neat!

### 1. Install and configure the Contentful CLI

The command line interface is installed using `npm` by running the command:

```bash
npm install -g contentful-cli
```

You also need a Contentful space and a few API keys. Log into Contentful, select your space, and go to:

1. "Settings > General settings" and copy your "Space ID"
1. "Settings > API keys", click "Content management tokens", and "Generate personal token".

### 2. Write your migration scripts

To give you an idea of the migration language, here's an example of how we can setup a couple of connected content models.

```javascript
// 01-add-blog-post.js

module.exports = (migration, context) => {
  // 1. create a new blog post content type
  const blogPost = migration.createContentType('blogPost').name('Blog Post').description('Blog post model');

  // 2. add fields to our content type
  blogPost.createField('title').type('Symbol').name('Title').required(true);

  blogPost.createField('body').type('Text').name('Body').required(true);

  blogPost.createField('author').type('Text').name('Author name').required(true);

  // 3. make the "title" field, the display field property
  blogPost.displayField('title');
};
```

### 3. Apply the migration using the CLI

Use the Contentful CLI to execute the migration:

```bash
contentful space migration --space-id XXXXXXXXX --access-token "XXXXXXXXXXX" ./01-add-blog-post.js
```

The command first runs through your code and checks that you haven't made any errors. It then summarizes the updates so you can review before committing to the applying them. If you accept, the changes will be applied sequentially.

### 4. Bonus: add author content type and migrate blog posts

Let's say that we've outgrown our first content model. We realize that we want to store more information about our blog post authors so we decide to break them out into separate, connected models. This is how we could write that migration:

```javascript
// 02-add-author.js

module.exports = (migration) => {
  // 1. create a new content type for our author model
  const author = migration.createContentType('author').name('Author').description('A blog post author');

  author.createField('firstName').type('Symbol').name('First name');
  author.createField('lastName').type('Symbol').name('Last name');
  author.displayField('firstName');

  // 2. grab a reference to our existing blog post model
  const blogPost = migration.editContentType('blogPost');

  // 3. create a new placeholder field for the blog post/author link
  blogPost.createField('authorRef').type('Link').linkType('Entry').name('The author');

  // 4. perform the migration by creating and linking authors to blog posts
  migration.deriveLinkedEntries({
    contentType: 'blogPost',
    derivedContentType: 'author',
    from: ['author'],
    toReferenceField: 'authorRef',
    derivedFields: ['firstName', 'lastName'],
    identityKey: (fromFields) => {
      // define the criterion for when to create a new author and when to
      // link an already created "author" entry.
      return fromFields.author['en-US'].toLowerCase(' ', '-');
    },
    shouldPublish: true,
    derivedEntryForLocale: (inputFields, locale) => {
      const [firstName, lastName] = inputFields.author[locale].split(' ');
      return { firstName, lastName };
    },
  });

  // 5. delete and replace the old author field with the new one
  blogPost.deleteField('author');
  blogPost.changeField('authorRef', 'author');
};
```

We can now run the migration like before:

```bash
contentful space migration --space-id XXXXXXXXX --access-token "XXXXXXXXXXX" ./02-add-author.js
```

Pay attention to the fact that we are just writing regular JavaScripts here which means that we are totally free to use features like async/await inside e.g. the `derivedEntryForLocale` function and pull in any external dependencies that we might need.

It might also be worth noting that the changes are not applied atomically so it might still happen that some of the updates are added while later ones are not. This happens in case e.g. some of the code inside your `derivedEntryForLocale` function would raise an exception.

## More resources

- You should have a look at the [introductory blog post](https://www.contentful.com/blog/2017/09/18/using-the-contentful-migration-cli/) to get an overall idea of the motivation for why Contentful built the tool in the first place. Just be mindful that some of the technical details like the command line interface has since changed.
- Have a look at the documentation for "[Scripting migrations](https://www.contentful.com/developers/docs/tutorials/general/scripting-migrations/)" which works as great guide to some of the most useful features of migrations.
- You will also refer to the [JS library documentation](https://github.com/contentful/contentful-migration) on GitHub.
- Finally, there is a [folder with examples](https://github.com/contentful/contentful-migration/tree/master/examples) for some of the more advanced use cases.

---

I hope you found this tutorial useful! If you learned something new, please consider sharing it with your friends and colleagues 💬
