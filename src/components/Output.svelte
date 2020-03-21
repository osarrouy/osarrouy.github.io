<script>
  import Spinner from './Spinner.svelte'

  export let loading = false
  export let stderr  = null
  export let stdout  = null
</script>

<template lang="pug">
  +if('stderr')
    p.stderr » {stderr}
    +elseif('stdout')
      p.stdout » {stdout}
        +if('loading')
          Spinner.space-left
</template>