<style lang="scss">
  @import 'src/styles/mixins.scss';

  main {
    margin: 0;
    max-width: 740px;
    min-height: 100vh;
    padding: #{2 * $spacing};

    &:after {
      @include flicker;
    }

    &:before {
      @include scanlines;
    }
  }
</style>

<main>
  <slot/>
</main>