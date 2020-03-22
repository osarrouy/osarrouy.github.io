<script>
  import { Stdout }   from '/components/std/_index.js'
  import { Commands } from '/lib/_index.js'

  const commands = Commands.help()
</script>

<Stdout>
  <table>
    {#each commands as command}
      <tr>
        <td>{command.display}</td>
        <td>{command.description}</td>
      </tr>
    {/each}
  </table>
</Stdout>