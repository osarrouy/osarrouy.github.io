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

  const handleKeydown = event => {
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

  const handeKeyup = event => {
    switch (event.key) {
      case 'Control':
        event.preventDefault()
        event.stopPropagation()
        ctrl = false
        break
    }
  }
  
  afterUpdate(() => {
    const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    if (!iOS) {
		  window.scrollTo(0, document.body.scrollHeight)
    }
	})
</script>

<svelte:window on:keydown={handleKeydown} on:keyup={handeKeyup}  />
{#each history as command}
    <Prompt>
      {command.raw}
    </Prompt>
    <svelte:component this={command.component} {command} bind:processing on:clear={clear} />
{/each}
<Zsh disabled={processing} on:command={cmd} />
