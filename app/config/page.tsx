"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"  
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save } from "lucide-react"
import type React from "react"

export default function ConfigPage() {
  const [apiKey, setApiKey] = useState("")
  const router = useRouter()  

  useEffect(() => {
    const storedApiKey = localStorage.getItem("openai_api_key")
    if (storedApiKey) {
      setApiKey(storedApiKey)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/save-api-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey }),
      })

      if (!response.ok) {
        throw new Error("Failed to save API key")
      }

      localStorage.setItem("openai_api_key", apiKey)

        router.push("/")  
    } catch (error) {
      console.error("Failed to save API key:", error)}
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-purple-600">Magic Key Settings 🔮</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-lg mb-2 text-blue-600">
            Your Special Magic Key:
          </label>
          <Input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your magical key here..."
            className="w-full rounded-xl border-2 border-purple-300"
          />
        </div>
        <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 rounded-xl">
          <Save className="mr-2" /> Save Magic Key
        </Button>
      </form>
    </div>
  )
}
