"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Play, RotateCcw } from "lucide-react"

export default function CodePlayground() {
  const [code, setCode] = useState("")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const runCode = async () => {
    try {
      const response = await fetch("/api/run-python", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, input }),
      })

      if (!response.ok) {
        throw new Error("Failed to run code")
      }

      const result = await response.json()
      setOutput(result.output)
    } catch (error) {
      setOutput(String(error))
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-3xl font-bold mb-4 text-purple-600">Magic Code Playground 🧙‍♂️</h2>
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your Python spells here..."
        className="mb-4 h-[30vh] rounded-xl border-2 border-purple-300"
      />
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter any input your code might need..."
        className="mb-4 rounded-xl border-2 border-blue-300"
      />
      <div className="flex space-x-2 mb-4">
        <Button onClick={runCode} className="flex-1 bg-green-500 hover:bg-green-600 rounded-xl">
          <Play className="mr-2" /> Run Magic Code
        </Button>
        <Button
          onClick={() => {
            setCode("")
            setInput("")
            setOutput("")
          }}
          className="bg-red-500 hover:bg-red-600 rounded-xl"
        >
          <RotateCcw className="mr-2" /> Clear All
        </Button>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold mb-2 text-blue-600">Magic Results:</h3>
        <pre className="bg-yellow-100 p-4 rounded-xl whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  )
}

