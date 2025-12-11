"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingBag, User, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "每日推荐", href: "/recommend" },
  { name: "数字衣橱", href: "/wardrobe" },
  { name: "虚拟试衣", href: "/virtual-tryon" },
  { name: "商品推荐", href: "/shop" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled 
            ? "bg-white/80 backdrop-blur-md border-gray-200/50 py-3 shadow-sm" 
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 group">
            <span className="font-serif text-2xl font-bold tracking-tight text-gray-900 group-hover:opacity-70 transition-opacity">
              SmartFit.
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-black relative group",
                  pathname === item.href ? "text-black" : "text-gray-500"
                )}
              >
                {item.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full",
                  pathname === item.href ? "w-full" : "w-0"
                )} />
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center gap-6">
            <button className="text-gray-600 hover:text-black transition-colors">
              <Heart size={20} strokeWidth={1.5} />
            </button>
            <button className="text-gray-600 hover:text-black transition-colors">
              <ShoppingBag size={20} strokeWidth={1.5} />
            </button>
            <Link href="/profile" className="text-gray-600 hover:text-black transition-colors">
              <User size={20} strokeWidth={1.5} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative z-50 p-2 text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-2xl font-serif font-medium transition-colors",
                    pathname === item.href ? "text-black" : "text-gray-400"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="w-full h-px bg-gray-100 my-4" />
              <div className="flex justify-center gap-8">
                <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                  <User size={28} strokeWidth={1.5} />
                </Link>
                <Link href="/wardrobe" onClick={() => setIsMobileMenuOpen(false)}>
                  <Heart size={28} strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
