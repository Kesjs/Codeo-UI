import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Check, Zap, Users, Crown } from 'lucide-react'

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for trying out Codeo',
      icon: Zap,
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
      ],
      buttonText: 'Get Started',
      buttonVariant: 'outline' as const,
      popular: false
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'For professional developers',
      icon: Users,
      features: [
        '100 conversions per month',
        'All frameworks supported',
        'React/Vue components',
        'Priority processing',
        'Multiple projects',
        'Email support'
      ],
      notIncluded: [
        'Team collaboration',
        'API access',
        'Custom branding'
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'default' as const,
      popular: true
    },
    {
      name: 'Team',
      price: '$99',
      period: '/month',
      description: 'For teams and agencies',
      icon: Crown,
      features: [
        'Unlimited conversions',
        'All frameworks + custom',
        'Team collaboration',
        'API access',
        'Custom branding',
        'Priority support',
        'Advanced analytics'
      ],
      notIncluded: [],
      buttonText: 'Contact Sales',
      buttonVariant: 'default' as const,
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </nav>

      {/* Header */}
      <div className="text-center py-12 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose the perfect plan for your needs. Start free and upgrade as you grow.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <plan.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </div>

              <Button 
                className="w-full mb-8" 
                variant={plan.buttonVariant}
                size="lg"
              >
                {plan.buttonText}
              </Button>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">What's included:</h4>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
                
                {plan.notIncluded.length > 0 && (
                  <>
                    <h4 className="font-semibold text-gray-900 mt-6">Not included:</h4>
                    {plan.notIncluded.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center opacity-60">
                        <div className="h-5 w-5 mr-3 flex-shrink-0 flex items-center justify-center">
                          <div className="h-4 w-0.5 bg-gray-400"></div>
                        </div>
                        <span className="text-gray-500">{feature}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">Can I change plans anytime?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">What happens if I exceed my limit?</h3>
              <p className="text-gray-600">Free plan users will need to wait until the next month. Pro users can purchase additional conversions.</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">We offer a 30-day money-back guarantee for all paid plans if you're not satisfied.</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">Is my data secure?</h3>
              <p className="text-gray-600">Yes, all data is encrypted and stored securely. We never share your screenshots or generated code.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-white rounded-2xl shadow-xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of developers using Codeo to build faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="text-lg">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
