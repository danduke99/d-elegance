'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Package, Tags, FolderOpen, LogOut, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'

interface AdminLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Categories', href: '/admin/categories', icon: Tags },
  { name: 'Collections', href: '/admin/collections', icon: FolderOpen },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Check for admin session - REPLACE WITH SUPABASE AUTH
    const session = sessionStorage.getItem('delegance_admin_session')
    if (!session) {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem('delegance_admin_session')
    router.push('/admin/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-border bg-background px-6 pb-4">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/admin" className="font-[family-name:var(--font-italianno)] text-2xl text-foreground">
              {"D'Elegance"}
            </Link>
            <span className="ml-2 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">Admin</span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Bottom Actions */}
            <div className="mt-auto space-y-2">
              <Button asChild variant="outline" size="sm" className="w-full justify-start rounded-xl">
                <Link href="/">View Store</Link>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-muted-foreground rounded-xl"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-background px-4 py-4 shadow-sm lg:hidden">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="-m-2.5">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-background px-6 pb-4 pt-4">
              <div className="flex h-16 shrink-0 items-center">
                <Link 
                  href="/admin" 
                  className="font-[family-name:var(--font-italianno)] text-2xl text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {"D'Elegance"}
                </Link>
              </div>
              <nav className="flex flex-1 flex-col">
                <ul className="flex flex-1 flex-col gap-y-2">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Icon className="h-5 w-5" />
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
                <div className="mt-auto space-y-2">
                  <Button asChild variant="outline" size="sm" className="w-full justify-start rounded-xl">
                    <Link href="/" onClick={() => setMobileMenuOpen(false)}>View Store</Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-muted-foreground rounded-xl"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex-1 text-sm font-semibold leading-6 text-foreground">
          Admin Dashboard
        </div>
      </div>

      {/* Main Content */}
      <main className="lg:pl-64">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
