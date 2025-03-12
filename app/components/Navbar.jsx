'use client'
import Link from "next/link"
import { Home } from "lucide-react"
import "../styles/components/_navbar.scss"
import CartIndicator from "./CartIndicator"

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="navbar__icon">
        <Home size={24} />
      </Link>
      <CartIndicator />
    </nav>
  )
}