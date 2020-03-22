<script>
  export let command = ''
</script>

<style lang="scss">
  section.zsh {
    margin: $spacing 0;
    white-space: pre;
    span.hostname{
      color: $cyan;
      font-weight: 600;
    }
  }
</style>
  
<section class="zsh">
  <span class="hostname">amnesia@osarrouy.xyz</span>&nbsp;$&nbsp;<slot />
</section>
