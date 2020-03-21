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

<template lang="pug">
  table.contacts
    +each('contacts as contact')
      tr.contact
        td {contact.name}
        td 
          a(href="{contact.url}" target="_blank") {contact.handle}
</template>