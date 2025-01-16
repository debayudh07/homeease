/* eslint-disable */
'use client'

declare global {
  interface Window {
    ethereum?: any;
  }
}

import { useState } from 'react'
import { ethers } from 'ethers'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Check, X } from 'lucide-react'
import { PaymentOptions } from '@/components/payment-options'
import { useToast } from '@/hooks/use-toast';

interface PricingPlan {
  name: string;
  description: string;
  price: number;
  features: string[];
  notIncluded: string[];
}

interface SelectedPlan {
  name: string;
  price: number;
  isAnnual: boolean;
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function PricingPage() {
  const { toast } = useToast()
  const [isAnnual, setIsAnnual] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [showPaymentOptions, setShowPaymentOptions] = useState(false)

  const pricingPlans: PricingPlan[] = [
    {
      name: 'Basic',
      description: 'For occasional home service needs',
      price: isAnnual ? 0.99 : 8.99,
      features: [
        'Post up to 5 jobs per month',
        'Basic worker profiles',
        'Email support',
        'Community forum access',
      ],
      notIncluded: [
        'Priority matching',
        'Advanced analytics',
        'Dedicated account manager',
      ]
    },
    {
      name: 'Pro',
      description: 'For regular home maintenance',
      price: isAnnual ? 1.99 : 9.99,
      features: [
        'Unlimited job postings',
        'Enhanced worker profiles',
        'Priority email & chat support',
        'Community forum access',
        'Priority matching',
        'Basic analytics',
      ],
      notIncluded: [
        'Advanced analytics',
        'Dedicated account manager',
      ]
    },
    {
      name: 'Premium',
      description: 'For frequent service requirements',
      price: isAnnual ? 19.99 : 29.99,
      features: [
        'Unlimited job postings',
        'Premium worker profiles',
        '24/7 priority support',
        'Community forum access',
        'Priority matching',
        'Advanced analytics',
        'Dedicated account manager',
        'Custom integrations',
      ],
      notIncluded: []
    }
  ]

  const handlePlanSelection = (plan: PricingPlan) => {
    setSelectedPlan({
      name: plan.name,
      price: plan.price,
      isAnnual: isAnnual
    })
    setShowPaymentOptions(true)
  }

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        setIsWalletConnected(true)
        toast({
          title: "Wallet Connected",
          description: "Your MetaMask wallet is now connected."
        })
      } catch (error) {
        console.error("Failed to connect wallet:", error)
        toast({
          title: "Connection Failed",
          description: "Failed to connect your MetaMask wallet.",
          variant: "destructive"
        })
      }
    } else {
      console.log('Please install MetaMask!')
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask to use this feature.",
        variant: "destructive"
      })
    }
  }

  const handlePayment = async (paymentMethod: string) => {
    if (paymentMethod === 'metamask' && selectedPlan) {
      if (!isWalletConnected) {
        await connectWallet()
      }
      if (isWalletConnected && window.ethereum) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }]
          })

          const provider = new ethers.BrowserProvider(window.ethereum)
          const signer = await provider.getSigner()
          
          const transactionAmount = ethers.parseEther("0.0001")

          const tx = await signer.sendTransaction({
            to: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
            value: transactionAmount
          })

          toast({
            title: "Transaction Sent",
            description: "Your transaction has been sent. Waiting for confirmation..."
          })

          await tx.wait()
          
          toast({
            title: "Payment Successful",
            description: `You've successfully paid 0.0001 Sepolia ETH for the ${selectedPlan.name} plan.`
          })

          setShowPaymentOptions(false)
          setSelectedPlan(null)
        } catch (error: any) {
          console.error("Payment failed:", error)
          if (error.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: '0xaa36a7',
                  chainName: 'Sepolia',
                  nativeCurrency: {
                    name: 'Sepolia Ether',
                    symbol: 'SEP',
                    decimals: 18
                  },
                  rpcUrls: ['https://sepolia.infura.io/v3/YOUR-PROJECT-ID'],
                  blockExplorerUrls: ['https://sepolia.etherscan.io']
                }]
              })
            } catch (addError) {
              console.error("Failed to add Sepolia network:", addError)
            }
          }
          toast({
            title: "Payment Failed",
            description: "There was an error processing your payment. Please try again.",
            variant: "destructive"
          })
        }
      }
    } else if (paymentMethod === 'upi' || paymentMethod === 'card') {
      toast({
        title: "Payment Method Selected",
        description: `You've selected to pay with ${paymentMethod}. This feature is not implemented yet.`
      })
      setShowPaymentOptions(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-orange-500">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">HomeEase Pricing</h1>
          <Button onClick={connectWallet} disabled={isWalletConnected}>
            {isWalletConnected ? 'Wallet Connected' : 'Connect Wallet'}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.section 
          className="text-center mb-12"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.h2 
            className="text-4xl font-bold mb-4"
            variants={fadeIn}
          >
            Choose the Perfect Plan for Your Home
          </motion.h2>
          <motion.p 
            className="text-xl mb-6"
            variants={fadeIn}
          >
            Flexible pricing options to suit your needs
          </motion.p>
          <motion.div 
            className="flex items-center justify-center space-x-4"
            variants={fadeIn}
          >
            <span className={`text-lg ${!isAnnual ? 'font-bold' : ''}`}>Monthly</span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <span className={`text-lg ${isAnnual ? 'font-bold' : ''}`}>Annual</span>
            {isAnnual && (
              <Badge variant="secondary" className="ml-2">Save up to 20%</Badge>
            )}
          </motion.div>
        </motion.section>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div key={plan.name} variants={fadeIn}>
              <Card className={`flex flex-col h-full ${index === 1 ? 'border-orange-500 border-2' : ''}`}>
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-4xl font-bold mb-4">
                    ${plan.price}
                    <span className="text-lg font-normal">/{isAnnual ? 'year' : 'month'}</span>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {plan.notIncluded.length > 0 && (
                    <ul className="space-y-2">
                      {plan.notIncluded.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-500">
                          <X className="w-5 h-5 text-red-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handlePlanSelection(plan)}>
                    Choose {plan.name}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.section 
          className="mt-16 text-center"
          variants={fadeIn}
          initial="initial"
          animate="animate"
        >
          <h3 className="text-2xl font-bold mb-4">Not sure which plan is right for you?</h3>
          <p className="mb-4">Our team is here to help you choose the best option for your needs.</p>
          <Button variant="outline">Contact Sales</Button>
        </motion.section>
      </main>

      <footer className="mt-12 py-6 text-center text-orange-400">
        <p>&copy; {new Date().getFullYear()} HomeEase. All rights reserved.</p>
      </footer>

      {showPaymentOptions && selectedPlan && (
        <PaymentOptions
          isOpen={showPaymentOptions}
          onClose={() => setShowPaymentOptions(false)}
          plan={selectedPlan}
          onPayment={handlePayment}
        />
      )}
    </div>
  )
}