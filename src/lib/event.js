import { createEventDispatcher } from 'svelte';

export const Event = {
  fire: (name, details) => {
    const dispatch = createEventDispatcher()
    dispatch(name, details)
  }
}