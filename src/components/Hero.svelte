  <script>
    import { createEventDispatcher } from 'svelte'
    import Typewriter                from 'svelte-typewriter'

    let done = false

    const emit = createEventDispatcher()

    const handleDone = event => {
      done = true
      emit('done', event.detail)
    }
  </script>
  
<style>
  h1 {
    margin-top: 0;
  }
</style>

  <section>
    <Typewriter cascade cursor={done ? false : 'rgb(105, 243, 105)'} on:done={handleDone} interval={15}>
      <h1># Hello, world</h1>
      <p>My name is Olivier Sarrouy. I am a freelance researcher and web3 dev.</p>
      <p>Type 'help' to see a list of available commands.</p>
      <p>======</p>
    </Typewriter>
  </section>