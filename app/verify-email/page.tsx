'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from 'lucide-react'

export default function VerifyEmailPage() {
  const [code, setCode] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [isExpired, setIsExpired] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft > 0 && !isVerified) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setIsExpired(true)
    }
  }, [timeLeft, isVerified])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simulate successful verification
    setIsVerified(true)
    setIsLoading(false)
  }

  const handleResend = async () => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Reset timer
    setTimeLeft(300)
    setIsExpired(false)
    setIsLoading(false)
    setCode('')
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Email Verified!
            </h1>
            <p className="text-gray-600 mb-8">
              Your email has been successfully verified. You can now access your account.
            </p>
            <Button className="w-full" onClick={() => window.location.href = '/login'}>
              Continue to Login
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button variant="ghost" size="icon" className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="text-center flex-1">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Verify Your Email</h1>
              <p className="text-gray-600 mt-2">
                We've sent a verification code to your email. Please enter it below.
              </p>
            </div>
          </div>

          {/* Timer */}
          <div className="mb-6 text-center">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
              isExpired ? 'bg-red-100' : 'bg-blue-100'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                isExpired ? 'bg-red-400' : 'bg-blue-400'
              }`}></div>
              <span className={`text-sm font-medium ${
                isExpired ? 'text-red-600' : 'text-blue-600'
              }`}>
                {isExpired ? 'Code Expired' : formatTime(timeLeft)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {isExpired 
                ? 'The verification code has expired. Please request a new one.'
                : 'Code expires in 5 minutes'
              }
            </p>
          </div>

          {!isExpired ? (
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <Input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className="w-full text-center text-lg tracking-widest"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || code.length !== 6}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  'Verify Email'
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-red-600 mb-4">
                Verification Code Expired
              </h2>
              <p className="text-gray-600 mb-6">
                The verification code you entered has expired. Please request a new verification code.
              </p>
            </div>
          )}

          {/* Resend Code */}
          <div className="mt-6">
            <Button
              variant="outline"
              onClick={handleResend}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                'Resend Verification Code'
              )}
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or{' '}
              <button 
                onClick={handleResend}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                click here to resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
