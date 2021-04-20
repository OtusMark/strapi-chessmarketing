// File /api/email/controllers/Email.js
'use strict'

/**
 * Read the documentation () to implement custom controller functions
 */

module.exports = {
  /**
   * Sends an email to the recipient in the body of the request
   */
  send: async (ctx) => {
    const body = ctx.request.body
    const sendTo = 'dev000test111@gmail.com'
    strapi.log.debug(`Trying to send an email to ${sendTo}`)

    try {
      const emailOptions = {
        to: sendTo,
        from: 'Mark <dev000test111@gmail.com>',
        subject: 'Landing form',
        html: `<div><h1>New client</h1>
                  <p>${body.name}</p>
                  <p>${body.email}</p>
                  <p>${body.phone}</p>
                  <p>${body.description}</p>
                </div>`,
      }
      await strapi.plugins['email'].services.email.send(emailOptions)
      strapi.log.debug(`Email sent to ${sendTo}`)
      ctx.send({message: 'Email sent'})
    } catch (err) {
      strapi.log.error(`Error sending email to ${sendTo}`, err)
      ctx.send({error: 'Error sending email'})
    }
  },
}
