import { EMAILJS } from '/config/_index.js'
import emailjs     from 'emailjs-com'

export const Email = {
  send: async (data) => {
    emailjs.init(EMAILJS.USER_ID)
    return await emailjs.send(EMAILJS.SERVICE_ID, EMAILJS.TEMPLATE_ID, data)
  }
}