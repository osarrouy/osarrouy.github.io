<script>
  import Prompt          from '/components/Prompt.svelte'
  import Zsh             from '/components/Zsh.svelte'
  import { Commands }    from '/lib/_index.js'
	import { afterUpdate } from 'svelte';

  let ctrl       = false
  let history    = []
  let processing = false

  const cmd = (event) => {
    const argv      = event.detail.argv
    const raw       = event.detail.raw
    const component = Commands.component(argv._[0])
    history = [...history, { argv, component, raw }]
  }

  const clear = () => {
    history = []
  }

  const keydown = event => {
    switch (event.key) {
      case 'Control':
        event.preventDefault()
        event.stopPropagation()
        ctrl = true
        break
      case 'c':
        if (ctrl) {
          event.preventDefault()
          event.stopPropagation()
          processing = false
        }
        break
    }
  }

  const keyup = event => {
    switch (event.key) {
      case 'Control':
        event.preventDefault()
        event.stopPropagation()
        ctrl = false
        break
    }
  }
  
  afterUpdate(() => {
		window.scrollTo(0, document.body.scrollHeight)
	})
</script>

<style lang="scss">
  section.tty {
    margin: $spacing 0;
  }
</style>

<svelte:window on:keydown={keydown} on:keyup={keyup}  />
{#each history as command, i}
    <Prompt>
      {command.raw}
    </Prompt>
    <section class="tty">
      <svelte:component this={command.component} bind:processing let:command on:clear={clear} />
    </section>
{/each}
<Zsh disabled={processing} on:command={cmd} />
