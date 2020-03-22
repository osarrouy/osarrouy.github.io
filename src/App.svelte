<script>
  import Hero     from './components/Hero.svelte'
  import Screen   from './components/Screen.svelte'
  import Terminal from '/components/Terminal.svelte'

  let done = false
</script>

<style lang="scss" global>
  @import 'src/styles/global.scss';
</style>

<Screen>
  <Hero on:done={() => done = true} />
  {#if done}
    <Terminal />
  {/if}
</Screen>
