<script>
  import { Stderr, Stdout } from '/components/std/_index.js'
  import { DAI, Numbers }   from '/lib/_index.js'
  import { onMount }        from 'svelte'

  export let command
  export let processing

  processing  = true
  
  let amount      = Numbers.toFixed(command.argv._[1])
  let interrupted = false
  let loading     = true
  let stderr      = null
  let stdout      = 'checking some stuffs ...'

  $: {
    if (!interrupted && !processing) {
      interrupted = true
      exit()
    }
  }

  const ERROR_INVALID_AMOUNT         = "Invalid amount. Use e.g. 'tip 25.75'."
  const ERROR_METAMASK_NOT_INSTALLED = 'Metamask is not installed in your browser. Too bad.'
  const ERROR_METAMASK_NOT_ENABLED   = 'Metamask is not enabled. You idiot.'
  const ERROR_NETWORK                = 'You are not connected to mainnet. Nice, being generous with testnet coins.'
  const ERROR_BALANCE                = "You don't have enough balance. You wanker."
  const ERROR_UNSIGNED               = 'You renounced signing. You skinflint.'

  const exit = () => {
    loading    = false
    processing = false
  }

  const validate = async () => {
    try {
      if (amount === 'NaN') {
        stderr = ERROR_INVALID_AMOUNT
        return false
      }
      if (typeof window.ethereum === 'undefined') {
        stderr = ERROR_METAMASK_NOT_INSTALLED
        return false
      }
      if (!window.ethereum.selectedAddress) {
        window.ethereum.enable()
        stderr = ERROR_METAMASK_NOT_ENABLED
        return false
      }
      if (window.ethereum.networkVersion !== '1') {
        stderr = ERROR_NETWORK
        return false
      }
      if (!await DAI.userHasEnoughBalance(amount)) {
        stderr = ERROR_BALANCE
        return false
      }
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }

  onMount(async () => {
    try {
      if (await validate()) {
        stdout   = 'please sign transaction in Metamask'
        const tx = await DAI.tip(amount)
        stdout   = 'waiting for tx to be minted'
        await tx.wait()
        loading = false
        stdout  = 'Just received ' + command.argv._[1] + ' DAI. Thanks bro!'
      } else {
        exit()
      }
    } catch (e) {
      switch (e.code) {
        case 4001:
          stderr = ERROR_UNSIGNED
          break
        default:
          stderr = e.message
      }
    }
    exit()
  })
</script>

<Stdout hidden={stderr} {loading} prompt>
  {stdout}
</Stdout>
<Stderr hidden={!stderr}>
  {stderr}
</Stderr>
