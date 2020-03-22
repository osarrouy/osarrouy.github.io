<script>
  import { createEventDispatcher, onMount } from 'svelte';

  const emit = createEventDispatcher()

  onMount(() => {
    emit('clear')
  })
</script>
