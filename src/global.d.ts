/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="unplugin-icons/types/svelte" />
/// <reference types="vite/client" />

declare namespace svelte.JSX {
    interface DOMAttributes<T> {
      onclick_outside?: CompositionEventHandler<T>;
    }
  }