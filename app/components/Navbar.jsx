"use client"

import "../styles/components/_navbar.scss"
import Link from "next/link"
import { Home } from "lucide-react"
import CartIndicator from "./CartIndicator"

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="navbar__brand">
        <Home size={24} /> 
        <div className="navbar__text">MBST</div>
      </Link>
      <CartIndicator />
    </nav>
  )
}