// D'Elegance - Sentoo Payment Integration
// TODO: Implement actual Sentoo API integration when credentials are available

import type { SentooPaymentRequest, SentooPaymentResponse } from '@/types'

/**
 * Get the Sentoo payment link from environment
 */
export function getSentooPaymentLink(): string | null {
  return process.env.NEXT_PUBLIC_SENTOO_PAYMENT_LINK || null
}

/**
 * Check if Sentoo is configured
 */
export function isSentooConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SENTOO_PAYMENT_LINK)
}

/**
 * Create a Sentoo payment request
 * TODO: Implement actual Sentoo API integration
 * 
 * @param request - Payment request details
 * @returns Payment response with redirect URL
 */
export async function createPayment(
  request: SentooPaymentRequest
): Promise<SentooPaymentResponse> {
  // TODO: Replace with actual Sentoo API call
  // This is a placeholder implementation
  
  const paymentLink = getSentooPaymentLink()
  
  if (!paymentLink) {
    throw new Error('Sentoo payment link not configured')
  }

  // In production, this would:
  // 1. Call Sentoo API to create a payment session
  // 2. Return the payment URL for redirect
  // 3. Store the payment reference for webhook handling
  
  console.log('Creating Sentoo payment:', request)

  // Placeholder response - redirect to static payment link
  return {
    payment_id: `pay_${Date.now()}`,
    payment_url: paymentLink,
    status: 'pending',
  }
}

/**
 * Verify a Sentoo payment webhook
 * TODO: Implement webhook signature verification
 * 
 * @param payload - Webhook payload
 * @param signature - Webhook signature header
 * @returns Whether the signature is valid
 */
export function verifyWebhook(payload: string, signature: string): boolean {
  // TODO: Implement actual signature verification
  // This should use HMAC-SHA256 with your Sentoo webhook secret
  console.log('Verifying webhook signature:', { payload, signature })
  return true
}

/**
 * Generate WhatsApp order link as fallback
 */
export function getWhatsAppOrderLink(
  orderSummary: string,
  customerName: string
): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
  const message = encodeURIComponent(
    `Hi! I'd like to place an order:\n\n${orderSummary}\n\nCustomer: ${customerName}`
  )
  return `https://wa.me/${phoneNumber}?text=${message}`
}
