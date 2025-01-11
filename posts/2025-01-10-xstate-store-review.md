---
title: Why XState/Store Left Me Wanting More
category: reflections
author: Robin Andeer
date: 2025-01-11
tags: reflection
intro: |
  An interesting approach to event-driven state management that ultimately feels intentionally limited to steer users towards XState.
image: /images/xstate-store-poster.jpg
imageWidth: 1200
imageHeight: 628
---

## Intro

There's no shortage of JavaScript state management libraries. However, most developers don’t have a go-to option they swear by - including myself. Recently, however, [Theo introduced](https://www.youtube.com/watch?v=Pmieyp75SrA&t=1217s) a new contender in the form of [`xstate/store`](https://stately.ai/docs/xstate-store).

As you can guess by the name, it's built by David Khourshid, the mastermind behind `xstate`. Additionally, I was hooked on it being a gentle starting point to event-driven state management that can be upgraded to `xstate` when needed. I dove in to see if it lives up to those promises.

## Comparing with Zustand

My goal is to better understand the strengths and weaknesses of `xstate/store`. Therefore, I decided to build a simple authentication state manager using both `xstate/store` and Zustand, my current go-to library.

Authentication is a good example since the state is shared by the whole application. We could use `React.Context` (and `useReducer`), however, external libraries are often desirable as they let us break out of React, reduce boilerplate, and offer dedicated tools for debugging.

### Zustand

Starting with Zustand to set a baseline. The following solution should hopefully be straightforward. We start with the type state which lets us avoid impossible states such as “session” and “error” both being defined at the same time.

```tsx
type AuthSession = { authToken: string };

type TypeState =
	// Before loading initial state from storage
  | { type: 'pending' }
  | { type: 'logged-in'; session: AuthSession }
  // User credentials are being validated
  | { type: 'validating' }
  | { type: 'logged-out'; error?: Error };
```

Let's also define the three external events that the store needs to expose:

```tsx
type Store = TypeState & {
	// Initialize state from the persistent storage
	init: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};
```

The implementation is contained in a single object. Here, the storage layer is abstracted out but all it does is persist and load the authentication session. You can imagine it as a thin wrapper around `localStorage`.

```tsx
const useStore = create<Store>((set, get) => ({
  // initial state
  type: 'pending',
  
  init: async () => {
    const session = await storage.loadAuth()
    if (session) set({ type: 'logged-in', session })
    else set({ type: 'logged-out' })
  },

  login: async (email, password) => {
    set({ type: 'validating' })

    try {
      const session = await logInWithCredentials(email, password)
      storage.saveAuth(session)
      set({ type: 'logged-in', session })
    } catch (error) {
      set({ type: 'logged-out', error })
    }
  },

  logout: () => {
    storage.clearAuth()
    set({ type: 'logged-out' })
  },
}))

useStore.state().init()
```

That’s all. The store is ready to be consumed in React components like:

```tsx
function Login() {
  const authState = useAuthStore((state) => state.type);
  
  if (authState === 'logged-in') {
	  return <Redirect to="/app" />
  }

  function sendLoginEvent() {
	  useAuthStore.getState().login(email, password)
  }
  
  return (
		<button onClick={sendLoginEvent}>Log in</button>
	)
}
```

### XState/Store

I tried setting up `xstate/store` using the same type state without luck. It really wants to derive the context rather than letting me define it upfront. And even when I asserted the state, it didn’t complain when I tried to update it incorrectly:

```tsx
const store = createStore({
  context: { type: 'pending' } as TypeState,
  on: {
	  // No typescript error here
    login: { type: 'logged-in' },
  },
});
```

Instead of fighting the library, lets try to use it as the author intends.

```tsx
const store = createStore({
  context: {
	  type: 'pending' as TypeState['type'],
	  session: null as AuthSession | null,
	  error: undefined as string | undefined,
  },
  on: {
    login: { type: 'validating' },
    logout: { type: 'logged-out' },
    loginSucceeded: {
      type: 'logged-in',
      session: (_, event: { session: AuthSession }) => event.session,
    },
    loginFailed: {
      type: 'logged-out',
      error: (_, event: { error?: string }) => event.error,
    },
  },
});
```

The option to update each context property individually is convenient. However, it doesn’t outweigh the lack of type safety. That makes me worried about how this will scale. At this point we’ve defined all the state transitions so now we just need to add the side effects.

```tsx
// public events we want to react to
type LoginEvent = { type: 'login'; email: string; password: string };
type LogoutEvent = { type: 'logout' };

const store = createStore({
	types: {
		emitted: {} as LoginEvent | LogoutEvent,
	},
	// ...the rest of the store
});

function useSetupStore() {
  useEffect(() => {
    const logInSubscription = store.on('login', async (event) => {
      try {
        const session = await logInWithCredentials(event.email, event.password);
        storage.saveAuth(session);
        store.send({ type: 'loginSucceeded', session });
      } catch (error) {
        store.send({ type: 'loginFailed', error });
      }
    });

    const logOutSubscription = store.on('logout', () => {
      storage.clearAuth();
    });

    async function loadAuth() {
      const session = await storage.loadAuth();
      if (session) {
        store.send({ type: 'loginSucceeded', session });
      } else {
        store.send({ type: 'loginFailed', error: 'No auth token found' });
      }
    }

    loadAuth();

    return () => {
      logInSubscription.unsubscribe();
      logOutSubscription.unsubscribe();
    };
  }, []);
}
```

That’s it for `xstate/store`. Using it in React feels familiar compared to Zustand.

```tsx
import { useSelector } from '@xstate/store/react';

function App() {
	useSetupStore()
	// Rest of the App component
}

function Login() {
  const authState = useSelector(store, state => state.type);
  
  if (authState === 'logged-in') {
	  return <Redirect to="/app" />
  }

  function sendLoginEvent() {
	  store.send({ type: 'login', email, password })
  }
  
  return (
		<button onClick={sendLoginEvent}>Log in</button>
	)
}
```

These solutions are now functionally the same. However, the limited feature set of `xstate/store` pushes us to write a lot of extra boilerplate code. The Zustand API, on the other hand, is more flexible and allows us to co-locate the application logic and state.

Especially the lack of support for handling async code makes me question the usefulness of `xstate/store`. Ever since the Redux days, introducing async logic to your state has been the first big pain point developers face when using state management libraries.

It’s surprising, then, that a new library in 2025 doesn’t come with any prescribed way to deal with it. This forces developers to figure out their own solutions, which can lead to inconsistencies and increased complexity. Right when getting started, I yearn for the additional features provided by `xstate`. I’m left with the impression that I'll eventually need to upgrade sooner rather than later.

## Conclusion

Zustand continues to hold the spot as my default choice for application-level state management in React. Its simplicity, ease of use, and robust feature set make it a solid option for most scenarios. `xstate` also has its role for the most complex yet very well-defined use cases. I’m not so sure what role `xstate/store` serves me. It’s too limited to be a general purpose tool but also not specialized on any subset of problems I’ve come across.

That being said, it does introduce some thought-provoking concepts that I plan to incorporate into my development practices. I’m a believer in thinking “event-driven” about my state. The role of the UI should be to report events as they take place across the app. I hope to see `xstate/store` evolve and address its current limitations, particularly in the areas of async code handling and the minor type safety issues.

In the meantime, I encourage you to explore both `xstate/store` and Zustand to determine which library best fits your project's needs. Remember, the key is to find a solution that promotes maintainability, scalability, and developer productivity.

Happy coding!
