<script>
  import minimist from 'minimist'
	import { createEventDispatcher } from 'svelte';
	const emit = createEventDispatcher();

  export let prompt
  export let commands = []
  export let disabled = false
  export let _class   = ''
  export   { _class as class}

  let history     = []
  let stdin       = ''
  let suggestions = []
  let rewind      = 0

  const focus = (element) => {
    element.focus()
  }
  
  const parse = () => {
    return minimist(
      stdin
        .trim()
        .split(/\b(\s)/)
        .filter(e => e.trim().length > 0)
    )
  }

  const spawn = () => {
    emit('command', {
      argv: parse(),
      raw:  stdin
    });

    history = [...history, stdin]
    stdin   = ''
    rewind  = 0
  }

  const autocomplete = () => {
    commands.forEach(command => {
      if (command.startsWith(stdin)) {
        suggestions = [...suggestions, command]
      }
    })

    if (suggestions.length === 1) {
      stdin       = suggestions[0]
      suggestions = []
    }
  }

  const backward = () => {
    if (history.length > rewind) {
      stdin = history[history.length - 1 - rewind]
      rewind += 1
    }
  }

  const forward = () => {
    if (rewind > 1) {
      stdin = history[history.length + 1 - rewind]
      rewind -= 1
    }
  }

  const handleKeydown = event => {
    switch (event.key) {
      case 'Tab':
        event.preventDefault()
        suggestions = []
        autocomplete()
        break
      case 'Enter':
        event.preventDefault()
        suggestions = []
        spawn()
        break
      case 'ArrowUp':
        event.preventDefault()
        suggestions = []
        backward()
        break
      case 'ArrowDown':
        event.preventDefault()
        suggestions = []
        forward()
        break
    }
  }
</script>


<style lang="scss">
  section.tty {
    display: flex;
  }
</style>

<svelte:window on:keydown={handleKeydown} />

{#if !disabled}
  <section class="tty {_class}">
    <svelte:component this={prompt} />
    <input bind:value={stdin} type="text" use:focus />
  </section>
  <section class="suggestions">
    {#each suggestions as suggestion}
      <span class="space-right">{suggestion}</span>
    {/each}
  </section>
{/if}
