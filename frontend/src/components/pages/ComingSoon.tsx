'use client'

import { useState, useEffect } from 'react'
import PrimaryInput from '../inputs/PrimaryInput'
import PrimaryButton from '../buttons/PrimaryButton'
import { Loader2 } from "lucide-react"
import Logo from '../logo/LogoBlack'

export default function ComingSoon() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date('2024-12-31T23:59:59').getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })

      if (difference < 0) {
        clearInterval(interval)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setMessage('Thank you for your interest! We\'ll notify you when we launch.')
    setEmail('')
    setIsSubmitting(false)
  }

  return (
    <div className="flex-grow flex-col content-center p-4">
      <main className="text-center border rounded-xl border-[#1A3634] p-10">
        <Logo />
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Coming Soon</h1>
        <p className="text-xl md:text-2xl mb-8">We&apos;re working hard to bring you something amazing!</p>
        
        <div className="flex justify-center space-x-4 mb-8">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold">{value}</span>
              <span className="text-sm uppercase">{unit}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
          <PrimaryInput
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e:any) => setEmail(e.target.value)}
            required
          />
          <PrimaryButton 
            type="submit" 
            disabled={isSubmitting}
            className="w-full max-w-md bg-[#E7D3AD] text-white hover:bg-[#234a47]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              'Notify me'
            )}
          </PrimaryButton>
        </form>

        {message && (
          <p className="mt-4 text-green-300">{message}</p>
        )}
      </main>
    </div>
  )
}