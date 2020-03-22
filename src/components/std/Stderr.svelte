<script>
  import Spinner from '../Spinner.svelte'
    
  export let hidden  = false
  export let loading = false
  export let prompt  = false
</script>

<style lang="scss">
  section.stderr {
    color: $red;
    margin: $spacing 0;
  }
</style>

{#if !hidden}
  <section class="stderr">
    {#if prompt}»{/if}
    <slot />
    {#if loading}<Spinner />{/if}
  </section>
{/if}