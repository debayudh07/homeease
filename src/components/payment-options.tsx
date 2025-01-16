/* eslint-disable */
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle } from 'lucide-react'

interface PaymentOptionsProps {
  isOpen: boolean
  onClose: () => void
  plan: {
    name: string
    price: number
    isAnnual: boolean
  }
  onPayment: (method: string) => Promise<void>
}

export function PaymentOptions({ isOpen, onClose, plan, onPayment }: PaymentOptionsProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose Payment Method</DialogTitle>
          <DialogDescription>
            Select a payment method for the {plan.name} plan (${plan.price}/{plan.isAnnual ? 'year' : 'month'})
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={async () => await onPayment('metamask')}>Pay with MetaMask</Button>
          <div className="flex items-center text-sm text-yellow-600 bg-yellow-100 p-2 rounded">
            <AlertCircle className="w-4 h-4 mr-2" />
            MetaMask payment will deduct 0.0001 Sepolia ETH (testnet)
          </div>
          <Button onClick={async () => await onPayment('upi')}>Pay with UPI</Button>
          <Button onClick={async () => await onPayment('card')}>Pay with Card</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

