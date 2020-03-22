<script>
  import Spinner                   from '../Spinner.svelte'
  import { createEventDispatcher } from 'svelte';

  export let disabled = false
  export let hidden   = false
  export let prompt   = ''
  export let type     = 'input'
  export let value    = ''

	const emit = createEventDispatcher()

  const focus = (element) => {
    element.focus()
  }

  const handleKeydown = event => {
    if (!hidden && !disabled) {
      switch (event.key) {
        case 'Enter':
          event.preventDefault()
          event.stopPropagation()
          emit('submit')
          break
      }
    }
  }

  const resize = (event) => {
    event.target.style.height = (event.target.scrollHeight)+"px";
  }
</script>

<style lang="scss">
  section.stdin {
    display: flex;
    align-content: flex-start;
    margin: $spacing 0;

    input, textarea {
      flex-grow: 1;
    }
  }
</style>

{#if !hidden}
  <section class="stdin">
    <span>» {prompt}:&nbsp;</span>
    {#if type === 'input'}
      <input {disabled} type="text" bind:value on:keydown={handleKeydown} use:focus />
    {:else if type === 'textarea'}
      <textarea {disabled} bind:value on:input={resize} on:keydown={handleKeydown} use:focus />
    {/if}
  </section>
{/if}