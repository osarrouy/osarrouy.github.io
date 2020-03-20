<script>
  const commands = [
    { name: 'help', description: 'display this screen' },
    { name: 'clear', description: 'clear commands history' },
    { name: 'contact', description: 'display contacts' },
    { name: 'curriculum', description: 'display curriculum' },
    { name: 'onion', description: 'display the .onion address of this website' },
    { name: 'pgp', description: 'display PGP key' },
    { name: 'tip <amount>', description: 'tip me of <amount> DAIs' },
  ]
</script>

<style lang="scss">
  table {
    border-spacing: $spacing 0;
    margin-left: -#{$spacing};
  }
</style>

<table>
  {#each commands as command}
    <tr>
      <td>{command.name}</td>
      <td>{command.description}</td>
    </tr>
  {/each}
</table>
