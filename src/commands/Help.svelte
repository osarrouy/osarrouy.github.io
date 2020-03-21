<script>
  const commands = [
    { name: 'help',         description: 'display this help' },
    { name: 'clear',        description: 'clear screen' },
    { name: 'contact',      description: 'display contacts' },
    { name: 'curriculum',   description: 'display curriculum' },
    { name: 'onion',        description: 'display the .onion address of this website' },
    { name: 'pgp',          description: 'display PGP public key' },
    { name: 'tip <amount>', description: 'tip <amount> DAIs' },
  ]
</script>

<table>
  {#each commands as command}
    <tr>
      <td>{command.name}</td>
      <td>{command.description}</td>
    </tr>
  {/each}
</table>
