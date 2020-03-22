import Unknown      from '/commands/Unknown.svelte'
import { COMMANDS } from '/config/_index.js'

export const Commands = {
  all: () => {
    return COMMANDS
  },
  component: (cmd) => {
    if (COMMANDS[cmd]) {
      return COMMANDS[cmd].component
    } else {
      return Unknown
    }
  },
  help: () => {
    const map = (cmds) => {
      return Object.keys(cmds).reduce((result, cmd) => {
        const display     = cmds[cmd].params ? cmd  + ' ' + cmds[cmd].params : cmd
        const description = cmds[cmd].description
        result.push({ display, description })
        return result
      }, [])
    }
    return map(COMMANDS)
  },
  list: () => {
    const map = (cmds) => {
      return Object.keys(cmds).reduce((result, cmd) => {
        console.log(cmd)
        result.push(cmd)
        return result
      }, [])
    }
    return map(COMMANDS)
  }
}