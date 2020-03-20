<script>
  import Typewriter from 'svelte-typewriter'
  import Command from './components/Command.svelte'
  import Spinner from './components/Spinner.svelte'

  import Contact from './commands/Contact.svelte'
  import Curriculum from './commands/Curriculum.svelte'
  import PGP from './commands/PGP.svelte'


  import Help from './commands/Help.svelte'
  import Tip from './commands/Tip.svelte'
  import Unknown from './commands/Unknown.svelte'
  import parser from 'minimist'
  import getopts from 'getopts'

  let input
  let rewind = 0
  let done = false
  let commands = []
  let disabled = false

  const focus = element => {
    element.focus()
  }

  const args = cmd => {
    return parser(
      cmd
        .trim()
        .split(/\b(\s)/)
        .filter(e => e.trim().length > 0)
    )
  }

  const cmd = () => {
    rewind = 0
    const _input = args(input)
    const _cmd = _input._[0]

    switch (_cmd) {
      case 'clear':
        commands = []
        break
      case 'contact':
        commands = [...commands, { input, component: Contact }]
        break
      case 'curriculum':
        commands = [...commands, { input, component: Curriculum }]
        break
      case 'help':
        commands = [...commands, { input, component: Help }]
        break
      case 'pgp':
        commands = [...commands, { input, component: PGP }]
        break
      case 'tip':
        commands = [...commands, { input, component: Tip, props: { amount: _input._[1] } }]
        break
      default:
        commands = [...commands, { input, component: Unknown }]
    }
    input = ''
  }

  const up = () => {
    if (commands.length > rewind) {
      input = commands[commands.length - 1 - rewind].input
      rewind += 1
    }
  }

  const down = () => {
    if (rewind > 1) {
      input = commands[commands.length + 1 - rewind].input
      rewind -= 1
    }
  }

  const hook = event => {
    console.log(event.key)

    switch (event.key) {
      case 'Enter':
        event.preventDefault()
        cmd()
        break
      case 'ArrowUp':
        event.preventDefault()
        up()
        break
      case 'ArrowDown':
        event.preventDefault()
        down()
        break
    }
  }
</script>

<style lang="scss" global>
  @import 'src/styles/global.scss';
  @import 'src/styles/animations.scss';
  @import 'src/styles/mixins.scss';

  main {
    color: rgb(105, 243, 105);
    margin: 0 auto;
    min-height: 100vh;
    padding: 2rem 3rem;
    width: 100%;

    &:after {
      @include flicker;
    }

    &:before {
      @include scanlines;
    }
  }

  input {
    caret-color: $color;
    display: box;
  }

  .input {
    display: flex;
    margin: 1rem 0;

    span {
      white-space: pre;
    }
  }

  .command {
    margin-top: 1rem;
  }

  .strong {
    font-weight: 600;
  }
</style>

<svelte:window on:keydown={hook} />

<main>
  <section>
    <Typewriter cascade cursor={done ? false : 'rgb(105, 243, 105)'} on:done={() => (done = true)} interval={15}>
      <h1># Hello, world</h1>
      <p>My name is Olivier Sarrouy. I am a freelance researcher and web3 dev.</p>
      <p>Type 'help' to see a list of available commands.</p>
      <p>======</p>
    </Typewriter>
  </section>
  {#each commands as command}
    <Command {command} bind:disabled />
  {/each}
  {#if done && !disabled}
    <section class="input">
      <span class="strong">{'amnesia@osarrouy.xyz » '}</span>
      <input type="text" bind:value={input} on:keys.enter={() => console.log('enter')} use:focus />
    </section>
  {/if}
</main>
