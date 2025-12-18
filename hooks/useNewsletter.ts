import { useState } from 'react'

export const useNewsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const subscribe = async (emailToSubscribe: string) => {
    setStatus('loading')

    try {
      // Create form data for Mailchimp
      const formData = new FormData()
      formData.append('EMAIL', emailToSubscribe)
      formData.append('b_49d2e5ede6ef1014c37881031_cd2121fa0b', '') // Bot protection

      // Submit to Mailchimp in the background (no redirect)
      await fetch('https://gmail.us4.list-manage.com/subscribe/post?u=49d2e5ede6ef1014c37881031&id=cd2121fa0b&f_id=00ffd7e8f0', {
        method: 'POST',
        body: formData,
        mode: 'no-cors', // Mailchimp doesn't support CORS, but form will still work
      })

      // Show success message (since we can't read response with no-cors)
      setStatus('success')
      setMessage('🎉 Thank you for subscribing! You will receive updates in your inbox.')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await subscribe(email)
  }

  const reset = () => {
    setStatus('idle')
    setMessage('')
  }

  return {
    email,
    setEmail,
    status,
    message,
    handleSubmit,
    reset
  }
}
