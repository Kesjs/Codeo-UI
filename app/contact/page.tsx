'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'support'
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting contact form:', formData)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const contactOptions = [
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with our support team',
      action: 'Start Chat',
      available: 'Available 24/7'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      action: 'Send Email',
      available: 'Response within 24h'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us directly',
      action: '+1 (555) 123-4567',
      available: 'Mon-Fri 9AM-6PM EST'
    }
  ]

  const faqs = [
    {
      question: 'How do I get started with Codeo?',
      answer: 'Simply sign up for an account, upload your first screenshot, and our AI will convert it to code instantly.'
    },
    {
      question: 'What frameworks do you support?',
      answer: 'We support React, Vue.js, HTML/CSS, Bootstrap, and Tailwind CSS with more coming soon.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use industry-standard encryption and never share your data with third parties.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Contact Support</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactOptions.map((option, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <option.icon className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-xs text-green-600 font-medium">{option.available}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h3>
              <p className="text-gray-600 mb-4">{option.description}</p>
              <Button className="w-full">
                {option.action}
              </Button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="feature">Feature Request</option>
                    <option value="feedback">General Feedback</option>
                    <option value="partnership">Partnership Inquiry</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell us more about your question or issue..."
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">
                Still need help?
              </h3>
              <p className="text-blue-800 mb-4">
                Our comprehensive documentation covers everything from getting started to advanced features.
              </p>
              <Button variant="outline">
                View Documentation
              </Button>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Offices</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Headquarters</h3>
              </div>
              <p className="text-gray-600 mb-2">
                123 Tech Street<br />
                San Francisco, CA 94105<br />
                United States
              </p>
              <p className="text-sm text-gray-500">
                Mon-Fri: 9AM-6PM PST
              </p>
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-gray-900">European Office</h3>
              </div>
              <p className="text-gray-600 mb-2">
                456 Innovation Ave<br />
                London, UK EC1A 1BB<br />
                United Kingdom
              </p>
              <p className="text-sm text-gray-500">
                Mon-Fri: 9AM-6PM GMT
              </p>
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Asia Pacific</h3>
              </div>
              <p className="text-gray-600 mb-2">
                789 Digital Tower<br />
                Singapore 238873<br />
                Singapore
              </p>
              <p className="text-sm text-gray-500">
                Mon-Fri: 9AM-6PM SGT
              </p>
            </div>
          </div>
        </div>

        {/* Response Time Info */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <div className="text-center">
            <Clock className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Average Response Times</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold mb-2">
                  &lt; 1 hour
                </div>
                <p className="text-blue-100">
                  Live Chat
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">
                  &lt; 24 hours
                </div>
                <p className="text-blue-100">
                  Email Support
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">
                  &lt; 5 minutes
                </div>
                <p className="text-blue-100">
                  Phone Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
