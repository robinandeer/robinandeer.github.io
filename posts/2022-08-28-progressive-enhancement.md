---
title: Progressive enhancement as productivity booster
category: reflections
author: Robin Andeer
date: 2022-08-28
tags: reflection
intro: Progressive enhancement boosts productivity when building web apps. It keep me focused and helps me break down complex features.
image: /images/progressive-enhancement.png
imageWidth: 1200
imageHeight: 628
---

I use progressive enhancement to boost my productivity when building web apps. It keeps me focused on what adds the most value and provides a framework to break down complex features. As a bonus, it also ensures that I “don’t break the web," making my apps more resilient.

## Start with the basics

Ever since I first heard about [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) I bought into the concept. It always seemed like _the right thing to do_. However, just like building a fully accessible site, I also thought it would require a lot of work and maintenance to implement.

> Provide baseline functionality to as many users as possible. Deliver the best possible experience only to users with modern browsers.

Lately, I’ve worked on a prototype web app for work. We’re implementing it based on rough wireframes so the focus is on building the foundation rather than tweaking animations. The wireframes are lo-fi and based around a prebuilt set of standard blocks so it makes sense that our code reflects that. This mindset got me thinking of starting with web standards and enhancing the experience from there.

## The progressive enhancement workflow

I want to avoid getting too abstract so here’s a concrete (but made-up) task for us to tackle: *build an input for adding new items to a to-do list backed by an API*. This is a deceptively complex task. There are a lot of subtle details that we need to get right.

- Validating user inputs
- Collecting text input for the to-do item
- Composing the request payload
- Sending the request and showing a pending UI
- Responding to errors
- Updating the UI with new data after a successful response

A successful programmer stands out by efficiently breaking down such complex tasks into small incremental steps. Ideally, each step provides more value as it's shipped to end users. Progressive enhancement philosophy can help us where to start.

### Starting point: web standards

Progressive enhancement teaches us to begin with the basics: leave it to the browser. Write as little code as possible, thereby minimizing what can fail. Fortunately, the web is a pretty powerful platform nowadays so we can get pretty far without getting into client JavaScript.

We start with a `<form>`-element of course! That’s how we mutate things on the web!

```html
<!-- todos/index.html -->

<form method="POST" action="/api/todos">
  <input type="text" name="content" required />
  <button type="submit">Add</button>
</form>

<!-- MORE HTML -->
```

When the user clicks the submit button, the browser:

- validates all inputs in the form
- puts together a “form data” object from the input fields
- serializes the form data in a POST request to the action-endpoint

Our server endpoint then receives the requests and gets to work.

```jsx
// api/todos.js
 
async function handler(req, res) {
  // Parse serialized form data.
  // A trivial task since we are using web standards.
  const content = req.body.content

  // Make a request to create and persist a new todo list item.
  await Database.saveTodo({ text: content })

  // Finally, send a redirect response to the browser.
  return res.redirect(302, '/todos')
}
```

The browser is asked to reload the page which now includes the newly created to-do item!

All the baseline functionality is now already there. The app is usable but the experience is rather clunky. It would be nice to offer a pending UI while adding the to-do item instead of reloading the page.

### Enhancement: pending UI

Only relying on the default browser behavior won’t cut it at this point. We will use client JavaScript to enhance the experience for the users that allow us to run it.

The goal here is to display a loading indicator while waiting for the API response. Our first order of business is to prevent the default behavior of redirecting from the page when the form is submitted. Instead we write our own code to perform only a subset of the actions normally executed by the browser.

I will show how to accomplish this using React.

```jsx
function TodoList() {
  async function handleSubmit(event) {
    // Prevent default browser behavior when form is submitted
    event.preventDefault()

    // Inputs are already validated.

    // Combine form data from all input fields.
    const formData = new FormData(event.target)

    // Serialize form data in a request to the action endpoint.
    await fetch(event.action, {
      method: event.method,
      body: formData,
    })

    // Refresh the data on the page (instead of doing a reload)
    await reloadPageData()
  }

  return (
    <form method="POST" action="/api/todos" onSubmit={handleSubmit}>
      <input type="text" name="content" required />
      <button type="submit">
        Save
      </button>
    </form>
  )
}
```

This JavaScript code puts us as developers in control, instead of deferring to the browser. By using built-in APIs such as `FormData` & `fetch` we don’t have to write much code to reimplement the steps that the browser used to do for us.

However, we still don’t show the user any loading indicator that work is happening on the server. For that, we need to manage a small piece of UI state that tells us whether we have sent the request and are waiting for the response to come back.

Let's add it to our React-component.

```jsx
function TodoList() {
  const [formState, setFormState] = useState('idle')

  async function handleSubmit(event) {
    event.preventDefault()

    setFormState('submitting')

    const formData = new FormData(event.target)
    await fetch(event.action, {
      method: event.method,
      body: formData,
    })
    await reloadData()

    setFormState('idle')
  }

  return (
    <form method="POST" action="/api/todos" onSubmit={handleSubmit}>
      <input type="text" name="content" required />
      <button type="submit">
        Save
        {formState === 'submitting' ? <Spinner /> : null}
      </button>
    </form>
  )
}
```

There we have it. A step-by-step approach that incrementally enhances the user experience. The mindset of progressive enhancement led us from implementing the baseline functionality to adding enhancing features. You could say we went from a website to a web app experience.

An important point here is that we could turn off JavaScript on the page and still have a working site. The features we would miss out on are on the pending UI. The app would just fallback to the default browser form handling behaviour.

The user experience of the app can be taken even further. One idea could be to send the API request and simultanously perform an optimistic update of the user interface. I'll leave this as a task for the reader.

Hopefully, I’ve shown you that progressive enhancement provides a framework for incrementally developing new features. It helps you break down the implementation into discreet steps. Without it you are also more likely to forget about web standards and what the browser gives us for free. We end up using over-engineered form libraries and learn to distrust the browser instead of really getting to know the platform we develop for.

---

## Structured Query Language

It strikes me as I’m writing this that we can get similar productivity gains by opting for SQL over NoSQL databases - especially at the start of projects. SQL encourages you to model databases and tables based on what your data looks like. It’s not trivial but there’s a logic to it that you can work out step by step. It’s an extremely flexible approach but doesn’t always scale for specific use cases.

NoSQL databases are more tailored to adapt to specialized scenarios where they scale very well. They also encourage you to model the database based on how you plan to query and present your data. This is significantly less straightforward and requires a lot more planning from the developer. Therefore, unless you already know your domain intimately, your best bet is probably to start with a SQL database.
