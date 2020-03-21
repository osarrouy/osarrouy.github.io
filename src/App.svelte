<script>
  import Commands from './components/Commands.svelte'
  import TTY from './components/TTY.svelte'
  import Screen from './components/Screen.svelte'
  import Hero from './components/Hero.svelte'
  import Prompt from './components/Prompt.svelte'





  import Contact from './commands/Contact.svelte'
  import Curriculum from './commands/Curriculum.svelte'
  import PGP from './commands/PGP.svelte'


  import Help from './commands/Help.svelte'
  import Tip from './commands/Tip.svelte'
  import Unknown from './commands/Unknown.svelte'
  import parser from 'minimist'
  import getopts from 'getopts'

  let done = false
  let history = []
  let disabled = false

  const commands = [
    'help',
    'clear',
    'contact',
    'curriculum',
    'onion',
    'pgp',
    'tip <amount>'
  ]

  const focus = element => {
    element.focus()
  }

  const args = cmd => {
    if (cmd) {
      return parser(
        cmd
          .trim()
          .split(/\b(\s)/)
          .filter(e => e.trim().length > 0)
      )
    } else {
      return {_: [0]}
    }

  }

  const cmd = (event) => {
    console.log(event)
    const argv = event.detail.argv
    const raw = event.detail.raw
    const _cmd = argv._[0]
    switch (_cmd) {
      case 'clear':
        history = []
        break
      case 'contact':
        history = [...history, { raw, component: Contact }]
        break
      case 'curriculum':
        history = [...history, { raw, component: Curriculum }]
        break
      case 'help':
        history = [...history, { raw, component: Help }]
        break
      case 'pgp':
        history = [...history, { raw, component: PGP }]
        break
      case 'tip':
        history = [...history, { raw, component: Tip, props: { amount: argv._[1] } }]
        break
      default:
        history = [...history, { raw, component: Unknown }]
    }
  }


</script>

<style lang="scss" global>
  @import 'src/styles/global.scss';

  :global(.space-top) {
    margin-top: $spacing;
  }
</style>

<Screen>
  <Hero on:done={() => done = true}/>
  <Commands commands={history} prompt={Prompt} bind:running={disabled} />
  {#if done}
    <TTY class="space-top" {commands} {disabled} prompt={Prompt} on:command={cmd}></TTY>
  {/if}
</Screen>
