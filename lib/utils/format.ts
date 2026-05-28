// Currency formatting utilities for D'Elegance

/**
 * Format a number as XCG currency
 * @param amount - The amount to format
 * @returns Formatted string with XCG currency
 */
export function formatXCG(amount: number): string {
  return `${amount.toFixed(2)} XCG`
}

/**
 * Format a number as any currency
 * @param amount - The amount to format
 * @param currency - Currency code (default: XCG)
 * @returns Formatted string with currency
 */
export function formatCurrency(amount: number, currency: string = 'XCG'): string {
  if (currency === 'XCG') {
    return formatXCG(amount)
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

/**
 * Generate a slug from a string
 * @param text - Text to convert to slug
 * @returns URL-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

/**
 * Format a date for display
 * @param date - Date string or Date object
 * @returns Formatted date string
 */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}
