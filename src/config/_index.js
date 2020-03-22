import { Clear, Contact, Curriculum, Email, Help, Pgp, Tip } from '/commands/_index.js'

export const COMMANDS = {
  'help':       { component: Help,       description: 'display this help message' },
  'clear':      { component: Clear,      description: 'clear screen' },
  'contact':    { component: Contact,    description: 'display contacts' },
  'curriculum': { component: Curriculum, description: 'display curriculum' },
  'email':      { component: Email,      description: 'shout me an email' },
  'pgp':        { component: Pgp,        description: 'display PGP public key' },
  'tip':        { component: Tip,        description: 'tip <amount> DAIs', params: '<amount>' },

}

export const EMAILJS = {
  SERVICE_ID:  'gmail_osarrouyxyz',
  TEMPLATE_ID: 'template_JEEKa4Lr',
  USER_ID:     'user_5YVoYw5Va0U78PRzqki84',
}