<script>
  import { Stdout } from '/components/std/_index.js'

  const contacts = [
    {
      name: "keybase",
      handle: "@osarrouy",
      url: "https://keybase.io/osarrouy"
    },
    {
      name: "github",
      handle: "@osarrouy",
      url: "https://github.com/osarrouy"
    },
    {
      name: "twitter",
      handle: "@osarrouy",
      url: "https://twitter.com/osarrouy"
    }
  ]
</script>


<Stdout>
  <table>
    {#each contacts as contact}
      <tr>
        <td>{contact.name}</td>
        <td><a href="{contact.url}" target="_blank">{contact.handle}</a></td>
      </tr>
    {/each}
  </table>
</Stdout>
