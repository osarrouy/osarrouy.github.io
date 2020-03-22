<script>
  import Prompt                    from '/components/Prompt.svelte'
  import { Commands }              from '/lib/_index.js'
  import minimist                  from 'minimist'
  import { createEventDispatcher } from 'svelte';

  export let disabled = false

  let commands    = Commands.list()
  let history     = []
  let stdin       = ''
  let suggestions = []
  let rewind      = 0

	const emit = createEventDispatcher();

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
    emit('command', { argv: parse(), raw: stdin })
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
    if (!disabled) {
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
    
  }
</script>

<style lang="scss">
  .autocomplete {
    span {
      margin-right: 1rem;
    }
  }
</style>

{#if !disabled}
  <Prompt>
    <input bind:value={stdin} type="text" use:focus on:keydown={handleKeydown} />
  </Prompt>
  <section class="autocomplete">
    {#each suggestions as suggestion}
      <span>{suggestion}</span>
    {/each}
  </section>
{/if}
