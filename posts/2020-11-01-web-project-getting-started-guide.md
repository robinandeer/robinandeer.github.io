---
title: Web Project - Getting Started Guide
category: tutorial
author: Robin Andeer
date: 2020-11-01
tags: tutorial, javascript, react, nextjs, tailwind
intro: A step-by-step guide to setup TypeScript, Next.js, Tailwind CSS, ESLint, and Testing Library in 2020.
image: /images/web-project-intro.png
imageAlt: Graph of web frameworks
imageWidth: 2024
imageHeight: 1012
---

**tl;dr**: the complete example repo is here: [robinandeer/web-project](https://github.com/robinandeer/web-project).

I dislike using templates when I start new projects. The boilerplate code makes it hard to understand how all the pieces fit together. Taking the time to integrate the different tools really feels worth it to me. That way, I'm also confident that I stay up-to-date with the latest good practices.

This post will be a no-nonsense step-by-step setup guide to start a new web project. I will integrate the tools I personally use to tackle various challenges.

**Tech stack**:

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/) + [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Eslint](https://eslint.org/) + [Prettier](https://prettier.io/)
- [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/)

Let's get started!

## Create a new project

Setup a basic JS project.

```bash
mkdir -p web-project
cd web-project

yarn init
> success Saved package.json
```

Now we can start installing dependencies.

## Setup TypeScript

Install a local copy of TypeScript as a development dependency.

```bash
yarn add --dev typescript
```

Configure TypeScript by adding a `tsconfig.json` file in the root of the project:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve"
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## Setup Next.js

Install Next.js along with some additional TypeScript type definitions:

```bash
yarn add next react react-dom

yarn add --dev @types/node @types/react
```

In `package.json`, add the following NPM scripts:

```json
// package.json

{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

Create a `next-env.d.ts` file to add type definitions for Next.js:

```javascript
/// <reference types="next" />
/// <reference types="next/types/global" />
```

Add an initial Next.js page:

```javascript
// src/pages/index.tsx

const IndexPage: React.FC = () => {
  return <h1>Hello, Next!</h1>
}

export default IndexPage
```

I like to collect all the source files under a `src` directory but you do as you wish.

Enable [absolute imports](https://nextjs.org/docs/advanced-features/module-path-aliases) to make it easier to import components/modules by updating `tsconfig.json`:

```json
// tsconfig.json

{
  "compilerOptions": {
    "baseUrl": "./src"
  }
}
```

You should now be able to start the development server and go to [`http://localhost:3000/`](http://localhost:3000/):

```bash
yarn dev
```

<figure><img src="/images/web-project-setup-next.png" alt="Browser window with heading" /></figure>

## Setup Tailwind CSS

Let's move on to the CSS setup. First, install Tailwind:

```bash
yarn add --dev tailwindcss
```

Create a basic `tailwind.config.js` file in the root directory:

```js
// tailwind.config.js

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  important: true,
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  theme: {},
  variants: {},
  plugins: [],
}
```

The "future" section enables upcoming Tailwind features that will make future migrations easier.

> Remember to update the "purge" glob-list to include all your React components!

Since Tailwind is a PostCSS plugin, add a `postcss.config.js` file to configure PostCSS:

```js
// postcss.config.js

module.exports = {
  plugins: ['tailwindcss'],
}
```

Also install the `postcss-preset-env` module which transforms modern CSS into something most browsers understand.

```bash
yarn add --dev postcss-preset-env
```

Update the PostCSS config and enable [stage 3 features](https://cssdb.org/):

```javascript
// postcss.config.js

module.exports = {
  plugins: [
    'tailwindcss',
    [
      'postcss-preset-env',
      {
        stage: 3,
      },
    ],
  ],
}
```

Finally, add a global CSS file:

```css
/* src/styles/global.css */

@tailwind base;

/* Write your own custom base styles here */

/* Start purging... */
@tailwind components;
/* Stop purging. */

/* Write your own custom component styles here */

/* Start purging... */
@tailwind utilities;
/* Stop purging. */

/* Your own custom utilities */
```

Override the root Next.js App component and import the global CSS file in `src/pages/_app.tsx`.

```typescript
// src/pages/_app.tsx

import '../styles/global.css'

import { AppProps } from 'next/app'

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

export default App
```

Finally, update the index page to include a Tailwind CSS utility class:

```html
<!-- src/pages/index.tsx -->

<h1 className="text-purple-600">Hello, Next!</h1>
```

Run `yarn dev` and go to [`http://localhost:3000/`](http://localhost:3000/). You should see a small, purple text appear on the page.

<figure><img src="/images/web-project-setup-tailwind.png" alt="Browser window with purple heading" /></figure>

## Setup Eslint

ESLint can help us out identify mistakes early. However, the setup does get slightly complicated when you want to integrate it with TypeScript. The first step is to install the ESLint dependencies:

```bash
yarn add --dev eslint eslint-plugin-react eslint-plugin-react-hooks
```

Also install the libraries required to integrate with TypeScript:

```bash
yarn add --dev @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

Create an ESLint config file `.eslintrc.js`:

```javascript
// .eslintrc.js

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
```

As of React 17 we no longer need to import React in `.tsx` files so we can tell ESLint to not complain about that:

```javascript
// .eslintrc.js

module.exports = {
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
}
```

## Setup Prettier

Prettier let's us take advantage of automated code formatting. It needs to be properly integrated with ESLint to work as expected. Two helper libraries take care of the integration. `eslint-plugin-prettier` runs Prettier as an ESLint rule while `eslint-config-prettier` turns off ESLint rules that might conflict with Prettier.

Install the required dependencies:

```bash
yarn add --dev prettier eslint-config-prettier eslint-plugin-prettier
```

Create a new `.prettierrc.js` file in the root directory:

```javascript
// .prettierrc.js

module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  quoteProps: 'preserve',
}
```

Edit `.eslintrc.js` to complete the ESLint + Prettier integration:

```javascript
// .eslintrc.js

module.exports = {
  extends: [
    // at the bottom of the extends array
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
}
```

## Setup Jest and Testing Library

Install the recommended libraries:

```bash
yarn add --dev jest babel-jest @testing-library/jest-dom @testing-library/react @types/jest
```

Setup Babel by telling it explicitly to use the Next.js Babel preset. Create a `.babelrc` file in the root directory:

```json
// .babelrc

{
  "presets": ["next/babel"]
}
```

Add a few new NPM scripts to the `package.json` file.

```json
// package.json

{
  "scripts": {
    "type-check": "tsc --pretty --noEmit",
    "lint": "eslint ./src --ext ts --ext tsx",
    "test": "jest",
    "test-all": "yarn lint && yarn type-check && yarn test"
  }
}
```

Next, create a new file `test/testUtils.ts`:

```typescript
// test/testUtils.ts

import { RenderOptions, RenderResult, render } from '@testing-library/react'

const customRender = (ui: React.ReactElement, options: RenderOptions = {}): RenderResult => render(ui, { ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
```

Add the first basic test by creating another file `test/pages/index.test.tsx`:

```typescript
// test/pages/index.test.tsx

import IndexPage from 'pages/index'
import { render } from '../testUtils'

describe('Index page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<IndexPage />, {})
    expect(asFragment()).toMatchSnapshot()
  })
})
```

Add a file `jest.config.js` to complete the Jest setup:

```javascript
// jest.config.js

module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
}
```

To support absolute imports, add the following to the Jest config:

```javascript
// jest.config.js

module.exports = {
  moduleDirectories: ['node_modules', 'src'],
}
```

Make sure that everything works by running:

```bash
yarn test-all
```

---

That's it! Hopefully I managed to demystify how to setup a new web project just a little bit. Your preferred setup might differ slightly but you should still be able to jump into the section that interests you. If you do get stuck, I recommend you turn to the official [Next.js examples](https://github.com/vercel/next.js/tree/canary/examples).

The complete example repo can be found here: [robinandeer/web-project](https://github.com/robinandeer/web-project).

Big thanks to the following resources that helped me out a lot:

- [An easy React 17 + TypeScript + Tailwind CSS + NextJS setup](https://blog.codechem.com/an-easy-react-17-typescript-tailwind-css-nextjs-setup)
- [How to Set Up Jest and React Testing Library with Next.js](https://www.kyrelldixon.com/blog/setup-jest-and-react-testing-library-with-nextjs)
- [https://medium.com/frontend-digest/setting-up-testing-library-with-nextjs-a9702cbde32d](https://medium.com/frontend-digest/setting-up-testing-library-with-nextjs-a9702cbde32d)
