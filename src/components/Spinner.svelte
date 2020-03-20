<script>
  import { onMount } from 'svelte'
  const pattern = '⣾⣽⣻⢿⡿⣟⣯⣷'
  // const pattern = ['', '.', '..', '...', '..', '.']

  export let stopped = false
  let spinner = ''
  let index = 0

  const spin = () => {
    if (!stopped) {
      spinner = pattern[index]
      index = (index + 1) % pattern.length
    }
  }

  setInterval(spin, 300)
</script>

<style>
  span {
    font-size: 1.2rem;
  }
</style>

<span>{spinner}</span>
