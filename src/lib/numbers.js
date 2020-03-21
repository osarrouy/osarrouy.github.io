import BN from 'bignumber.js'

const BASE = new BN(10).pow(new BN(18))

export const Numbers = {
  toFixed: (amount) => {
    return new BN(amount).multipliedBy(BASE).toFixed()
  }
}