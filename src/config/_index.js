import { About, Clear, Contact, Help, Mail, Pgp, Tip } from '/commands/_index.js'

export const COMMANDS = {
  'help':       { component: Help,       description: 'display this help message' },
  'about':      { component: About,      description: 'display the story of my life' },
  'clear':      { component: Clear,      description: 'clear screen' },
  'contact':    { component: Contact,    description: 'display contacts' },
  'mail':       { component: Mail,       description: 'shout me an email' },
  'pgp':        { component: Pgp,        description: 'display PGP public key' },
  'tip':        { component: Tip,        description: 'tip <amount> DAIs', params: '<amount>' },
}

export const EMAILJS = {
  SERVICE_ID:  'gmail_osarrouyxyz',
  TEMPLATE_ID: 'template_JEEKa4Lr',
  USER_ID:     'user_5YVoYw5Va0U78PRzqki84',
}