<script>
  import ethers from 'ethers'
  import { onMount } from 'svelte'
  import BigNumber from 'bignumber.js'
  import Spinner from '../components/Spinner.svelte'

  const BASE = new BigNumber(10).pow(new BigNumber(18))

  export let props
  export let disabled
  export let spin = false

  const BENEFICIARY = 'osarrouy.argent.xyz'
  const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
  const ERC20 = [
    {
      constant: true,
      inputs: [],
      name: 'name',
      outputs: [
        {
          name: '',
          type: 'string',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: '_spender',
          type: 'address',
        },
        {
          name: '_value',
          type: 'uint256',
        },
      ],
      name: 'approve',
      outputs: [
        {
          name: '',
          type: 'bool',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'totalSupply',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: '_from',
          type: 'address',
        },
        {
          name: '_to',
          type: 'address',
        },
        {
          name: '_value',
          type: 'uint256',
        },
      ],
      name: 'transferFrom',
      outputs: [
        {
          name: '',
          type: 'bool',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'decimals',
      outputs: [
        {
          name: '',
          type: 'uint8',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          name: '_owner',
          type: 'address',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          name: 'balance',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'symbol',
      outputs: [
        {
          name: '',
          type: 'string',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: '_to',
          type: 'address',
        },
        {
          name: '_value',
          type: 'uint256',
        },
      ],
      name: 'transfer',
      outputs: [
        {
          name: '',
          type: 'bool',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          name: '_owner',
          type: 'address',
        },
        {
          name: '_spender',
          type: 'address',
        },
      ],
      name: 'allowance',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      payable: true,
      stateMutability: 'payable',
      type: 'fallback',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          name: 'spender',
          type: 'address',
        },
        {
          indexed: false,
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
  ]

  const ERROR_INVALID_AMOUNT = "Invalid amount. Use e.g. 'tip 25.75'."
  const ERROR_METAMASK_NOT_INSTALLED = 'Metamask is not installed in your browser. Too bad.'
  const ERROR_METAMASK_NOT_ENABLED = 'Metamask is not enabled. You idiot.'
  const ERROR_NETWORK = 'You are not connected to mainnet. Nice, being generous with testnet coins.'
  const ERROR_BALANCE = "You don't have enough balance. You wanker."

  let amount = new BigNumber(props.amount).multipliedBy(BASE).toFixed()
  let message = 'checking some stuffs ...'
  let error = null

  onMount(async () => {
    disabled = true

    try {
      if (amount === 'NaN') {
        error = ERROR_INVALID_AMOUNT
        disabled = false
        return
      }

      if (typeof window.ethereum === 'undefined') {
        error = ERROR_METAMASK_NOT_INSTALLED
        disabled = false
        return
      }

      if (!window.ethereum.selectedAddress) {
        error = ERROR_METAMASK_NOT_ENABLED
        disabled = false
        return
      }

      if (window.ethereum.networkVersion !== '1') {
        error = ERROR_NETWORK
        disabled = false
        return
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const dai = new ethers.Contract(DAI, ERC20, provider.getSigner())
      const balance = (await dai.balanceOf(window.ethereum.selectedAddress)).toString()
      if (new BigNumber(balance).isLessThan(amount)) {
        error = ERROR_BALANCE
        disabled = false
        return
      }

      spin = true
      message = 'please sign transaction in Metamask'
      const tx = await dai.transfer(BENEFICIARY, amount)
      message = 'waiting for tx ' + tx.hash + ' to be minted'
      await tx.wait()
      message = 'Just received ' + props.amount + ' DAI. Thanks bro!'
    } catch (e) {
      error = e.message
    }

    spin = false
    disabled = false
  })
</script>

<style lang="scss">
  p {
    &.error {
      color: rgb(250, 102, 164);
    }
  }
</style>

{#if error}
  <p class="error">» {error}</p>
{:else}
  <p>
    »» {message}
    {#if spin}
      <Spinner />
    {/if}
  </p>
{/if}
