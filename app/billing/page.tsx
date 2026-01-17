'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, CreditCard, Check, AlertCircle, Download } from 'lucide-react'

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState('pro')
  const [billingCycle, setBillingCycle] = useState('monthly')

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        '3 conversions per month',
        'Basic framework support',
        'HTML/CSS output',
        'Community support',
        'Single projects'
      ],
      notIncluded: [
        'React/Vue components',
        'Priority processing',
        'Team collaboration',
        'API access'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        '100 conversions per month',
        'All frameworks supported',
        'React/Vue components',
        'Priority processing',
        'Multiple projects',
        'Email support',
        'Advanced analytics'
      ],
      notIncluded: [
        'Team collaboration',
        'API access',
        'Custom branding'
      ],
      popular: true
    },
    {
      id: 'team',
      name: 'Team',
      price: 99,
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        'Unlimited conversions',
        'All frameworks + custom',
        'Team collaboration',
        'API access',
        'Custom branding',
        'Priority support',
        'Advanced analytics',
        'SSO authentication'
      ],
      notIncluded: []
    }
  ]

  const paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: CreditCard },
    { id: 'paypal', name: 'PayPal' },
    { id: 'stripe', name: 'Stripe' }
  ]

  const [selectedPayment, setSelectedPayment] = useState('card')
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  })

  const handleSubscribe = () => {
    console.log('Subscribing to plan:', selectedPlan, billingCycle)
  }

  const getCurrentPlan = () => {
    return plans.find(p => p.id === selectedPlan)
  }

  const currentPlan = getCurrentPlan()

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
              <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Current Plan Status */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h2>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-bold text-gray-900">Pro Plan</h3>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  Active
                </span>
              </div>
              <p className="text-gray-600 mt-1">$29/month • Renews on Dec 15, 2024</p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
          </div>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  billingCycle === 'yearly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => {
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
            const isCurrentPlan = plan.id === 'pro' // Simulating current plan
            
            return (
              <div
                key={plan.id}
                className={`bg-white rounded-lg shadow-sm p-6 relative ${
                  plan.popular ? 'ring-2 ring-blue-500' : ''
                } ${isCurrentPlan ? 'border-2 border-green-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                {isCurrentPlan && (
                  <div className="absolute -top-3 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Current
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">
                      ${price}
                    </span>
                    <span className="text-gray-600 ml-1">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && plan.monthlyPrice > 0 && (
                    <p className="text-sm text-green-600 mt-2">
                      Save ${(plan.monthlyPrice * 12 - plan.yearlyPrice)}/year
                    </p>
                  )}
                </div>

                <Button 
                  className="w-full mb-6" 
                  variant={isCurrentPlan ? 'outline' : 'default'}
                  disabled={isCurrentPlan}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {isCurrentPlan ? 'Current Plan' : billingCycle === 'monthly' ? 'Upgrade Monthly' : 'Upgrade Yearly'}
                </Button>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">What's included:</h4>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.notIncluded.length > 0 && (
                    <>
                      <h4 className="font-semibold text-gray-900 mt-4">Not included:</h4>
                      {plan.notIncluded.map((feature, index) => (
                        <div key={index} className="flex items-start opacity-60">
                          <div className="h-5 w-5 mr-3 flex-shrink-0 flex items-center justify-center mt-0.5">
                            <div className="h-4 w-0.5 bg-gray-400"></div>
                          </div>
                          <span className="text-gray-500 text-sm">{feature}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Payment Method */}
        {plans.find(p => p.id === selectedPlan)?.notIncluded.length !== 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Payment Method</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    selectedPayment === method.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    {method.icon && <method.icon className="h-5 w-5 mr-3 text-gray-600" />}
                    <span className="font-medium">{method.name}</span>
                  </div>
                </button>
              ))}
            </div>

            {selectedPayment === 'card' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={cardInfo.number}
                    onChange={(e) => setCardInfo(prev => ({ ...prev, number: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <Input
                    placeholder="MM/YY"
                    value={cardInfo.expiry}
                    onChange={(e) => setCardInfo(prev => ({ ...prev, expiry: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <Input
                    placeholder="123"
                    value={cardInfo.cvv}
                    onChange={(e) => setCardInfo(prev => ({ ...prev, cvv: e.target.value }))}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name on Card
                  </label>
                  <Input
                    placeholder="John Doe"
                    value={cardInfo.name}
                    onChange={(e) => setCardInfo(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Billing History */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Billing History</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Dec 15, 2024</td>
                  <td className="py-3 px-4">Pro Plan - Monthly</td>
                  <td className="py-3 px-4 font-medium">$29.00</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Paid
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Nov 15, 2024</td>
                  <td className="py-3 px-4">Pro Plan - Monthly</td>
                  <td className="py-3 px-4 font-medium">$29.00</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Paid
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Oct 15, 2024</td>
                  <td className="py-3 px-4">Pro Plan - Monthly</td>
                  <td className="py-3 px-4 font-medium">$29.00</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Paid
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Cancellation Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">Cancellation Policy</h3>
              <p className="text-yellow-700 text-sm">
                You can cancel your subscription at any time. Your access will continue until the end of your current billing period. 
                No refunds are provided for partial months.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
