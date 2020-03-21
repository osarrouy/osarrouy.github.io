<style lang="scss">
  @import 'src/styles/mixins.scss';

  main {
    margin: 0;
    min-height: 100vh;
    padding: 2rem;
    max-width: 740px;

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