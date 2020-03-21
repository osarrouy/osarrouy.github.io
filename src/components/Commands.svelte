<script>
  import { onMount } from 'svelte'

  export let prompt
  export let running
  export let commands = []

  $: {
    commands
    window.scrollTo(0, document.body.scrollHeight)
    // remettre ça en 'onMount' dans chaque component sinon ça scrolle avant que le composant soit monté et on arrive pas vraiment en bas.
  }
</script>

<style lang="scss">
  section.command {
    margin-top: $spacing;

    div.prompt {
      display: flex;
    }

    div.stdout {
      margin-top: $spacing;
    }
  }
</style>

<section>
  {#each commands as command}
    <section class="command">
      <div class="prompt">
        <svelte:component this={prompt} />
        {command.raw}
      </div>
      <div class="stdout"><svelte:component this={command.component} props={command.props} bind:running /></div>
    </section>
  {/each}
</section>
