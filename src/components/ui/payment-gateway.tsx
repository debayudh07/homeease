/* eslint-disable */
"use client"
import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PaymentGatewayProps {
  isOpen: boolean
  onClose: () => void
  plan: {
    name: string
    price: number
    isAnnual: boolean
  }
}

export function PaymentGateway({ isOpen, onClose, plan }: PaymentGatewayProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setPaymentError(null)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Simple validation
    if (Object.values(formData).some(value => value === '')) {
      setPaymentError('Please fill in all fields')
      setIsProcessing(false)
      return
    }

    // Simulated successful payment
    console.log('Payment successful:', { ...formData, plan })
    setIsProcessing(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
          <DialogDescription>
            You're signing up for the {plan.name} plan at ${plan.price.toFixed(2)}/{plan.isAnnual ? 'year' : 'month'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <Label htmlFor="expiryMonth">Month</Label>
              <Select name="expiryMonth" onValueChange={(value) => setFormData(prev => ({ ...prev, expiryMonth: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <SelectItem key={month} value={month.toString().padStart(2, '0')}>
                      {month.toString().padStart(2, '0')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-1">
              <Label htmlFor="expiryYear">Year</Label>
              <Select name="expiryYear" onValueChange={(value) => setFormData(prev => ({ ...prev, expiryYear: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="YY" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                    <SelectItem key={year} value={year.toString().slice(-2)}>
                      {year.toString().slice(-2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-1">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" name="cvv" value={formData.cvv} onChange={handleInputChange} required />
            </div>
          </div>
          {paymentError && <div className="text-red-500">{paymentError}</div>}
          <Button type="submit" disabled={isProcessing} className="w-full">
            {isProcessing ? 'Processing...' : `Pay $${plan.price.toFixed(2)}`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}