<script>
  import Spinner from '../Spinner.svelte'
    
  export let hidden  = false
  export let loading = false
  export let prompt  = false
</script>

{#if !hidden}
  <div class="stdout">
    {#if prompt}<span>» </span>{/if}
    <slot />
    {#if loading}<Spinner />{/if}
  </div>
{/if}