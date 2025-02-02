import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"
import Link from "next/link"
import { Rocket, Cog } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PythonPals: Your AI Coding Buddy",
  description: "Learn Python with your friendly AI tutor!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-blue-100`}>
        <nav className="bg-yellow-400 p-4 rounded-b-3xl shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-blue-600 text-3xl font-bold flex items-center">
              <Rocket className="mr-2" />
              PythonPals
            </Link>
            <Link href="/config" className="text-blue-600 hover:underline flex items-center">
              <Cog className="mr-1" />
              Settings
            </Link>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  )
}

