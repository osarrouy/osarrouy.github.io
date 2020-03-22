<script>
  import Spinner from '../Spinner.svelte'
  import { createEventDispatcher } from 'svelte';

  export let hidden  = false
  export let disabled = false
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
          console.log('ENTER DANS BAS NIVEAU')
          event.preventDefault()
          event.stopPropagation()
          emit('submit')
          break
      }
    }
  }

  const resize = (event) => {
    console.log(resize)
    console.log(event)
    event.target.style.height = (event.target.scrollHeight)+"px";
  }
</script>

<style lang="scss">
  p.stdin {
    align-content: flex-start;
    display: flex;

    span {
      margin-right: $spacing;
    }

    input, textarea {
      flex-grow: 1;
    }
  }
</style>

<!-- <svelte:window on:keydown|capture={handleKeydown} /> -->

{#if !hidden}
  <p class="stdin">
    <span>» {prompt}: </span>
    {#if type === 'input'}
      <input {disabled} type="text" bind:value on:keydown={handleKeydown} use:focus />
    {:else if type === 'textarea'}
      <textarea {disabled} bind:value on:input={resize} on:keydown={handleKeydown} use:focus />
    {/if}
  </p>
{/if}