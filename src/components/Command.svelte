<script>
  import { onMount } from 'svelte'

  export let command
  export let disabled

  onMount(() => {
    window.scrollTo(0, document.body.scrollHeight)
  })
</script>

<style lang="scss">
  section {
    margin-top: 1rem;

    .strong {
      font-weight: 600;
    }
  }
</style>

<section>
  <p>
    <span class="strong">amnesia@osarrouy.xyz »</span>
    {command.input}
  </p>
  <svelte:component this={command.component} props={command.props} bind:disabled />
</section>
