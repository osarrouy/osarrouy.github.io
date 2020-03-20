<script>
  const contacts = [
    {
      name: "email",
      handle: "osarrouy [at] protonmail [dot] com",
      url: "mailto:osarrouy@protonmail.com"
    },
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
  ];
</script>

<style lang="scss">
  table {
    border-spacing: $spacing 0;
    margin-left: -#{$spacing};
  }

  h2 {
    font-weight: 700;
  }
</style>

<table>
  {#each contacts as contact}
    <tr>
      <td>{contact.name}</td>
      <td>
        <a href={contact.url} target="_blank">{contact.handle}</a>
      </td>
    </tr>
  {/each}
</table>
