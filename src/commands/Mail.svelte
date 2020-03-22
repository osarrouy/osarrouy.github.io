<script>
  import { Stderr, Stdin, Stdout } from '/components/std/_index.js'
  import { Email, Validate }       from '/lib/_index.js'

  export let processing

  processing      = true

  let error       = null
  let interrupted = false
  let from        = ''
  let message     = ''
  let step        = 0
  let subject     = ''

  $: {
    if (!interrupted && !processing) {
      interrupted = true
    }
  }

  const exit = () => {
    processing = false
  }

  const validateFrom = () => {
    if (Validate.email(from)) {
      error = null
      step  = 1
    } else {
      error = 'invalid email'
    }
  }

  const validateSubject = () => {
    if (subject.length > 0) {
      error = null
      step  = 2
    } else {
      error = "invalid subject"
    }
  }

  const validateMessage = () => {
    if (message.length > 0) {
      error = null
      step  = 3
      send()
    } else {
      error = "invalid message"
    }
  }

  const send = async () => {
    try {
      step = 4
      await Email.send({ from, subject, message })
      step = 5
    } catch(e) {
      step  = 6
      error = 'Ooops. Just had a problem sending the email. Sorry bro!'
    }
    exit()
  }
</script>

<Stdin disabled={interrupted || step > 0} hidden={step > 2} prompt="from" bind:value={from} on:submit={validateFrom} />
<Stdin disabled={interrupted || step > 1} hidden={step < 1 || step > 2} prompt="subject" bind:value={subject} on:submit={validateSubject} />
<Stdin disabled={interrupted || step > 2} hidden={step < 2 || step > 2} prompt="message" type="textarea" bind:value={message} on:submit={validateMessage} />
<Stdout hidden={step !== 4} loading prompt>sending email</Stdout>
<Stdout hidden={step !== 5} prompt>Just received email. Talk to you soon!</Stdout>
<Stderr hidden={interrupted || !error} prompt>{error}</Stderr>
