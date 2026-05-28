'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

/**
 * Admin Login Page
 * 
 * TODO: Replace with Supabase Auth before production
 * 
 * This is a placeholder auth UI. In production:
 * - Use Supabase Auth for secure authentication
 * - Implement proper session management
 * - Add rate limiting and CAPTCHA
 * - Enable MFA for admin accounts
 */

// Placeholder credentials - REMOVE IN PRODUCTION
const PLACEHOLDER_CREDENTIALS = {
  dev: { email: 'dev@delegance.local', password: 'demo1234' },
  admin: { email: 'admin@delegance.local', password: 'demo1234' },
}

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Placeholder authentication - REPLACE WITH SUPABASE AUTH
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const isValidCredentials = 
      (email === PLACEHOLDER_CREDENTIALS.dev.email && password === PLACEHOLDER_CREDENTIALS.dev.password) ||
      (email === PLACEHOLDER_CREDENTIALS.admin.email && password === PLACEHOLDER_CREDENTIALS.admin.password)

    if (isValidCredentials) {
      // In production, Supabase would handle session creation
      sessionStorage.setItem('delegance_admin_session', JSON.stringify({ email, loggedInAt: Date.now() }))
      router.push('/admin')
    } else {
      setError('Invalid email or password')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="font-[family-name:var(--font-italianno)] text-4xl text-foreground">
            {"D'Elegance"}
          </Link>
          <p className="text-sm text-muted-foreground mt-2">Admin Portal</p>
        </div>

        <Card className="rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Development Notice */}
            <Alert className="mb-6 border-[#efbf05]/50 bg-[#efbf05]/10">
              <AlertCircle className="h-4 w-4 text-[#efbf05]" />
              <AlertDescription className="text-sm">
                <strong>Development Mode</strong>
                <br />
                <span className="text-muted-foreground">
                  Use these credentials for testing:
                </span>
                <br />
                <code className="text-xs">dev@delegance.local</code> or{' '}
                <code className="text-xs">admin@delegance.local</code>
                <br />
                <code className="text-xs">Password: demo1234</code>
              </AlertDescription>
            </Alert>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="rounded-xl">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@delegance.local"
                    className="pl-10 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full rounded-xl bg-foreground text-background hover:bg-foreground/90"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <p className="text-xs text-center text-muted-foreground mt-6">
              Forgot your password? Contact the system administrator.
            </p>
          </CardContent>
        </Card>

        {/* Back to Store */}
        <div className="text-center mt-6">
          <Button asChild variant="link" className="text-muted-foreground">
            <Link href="/">Back to Store</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
