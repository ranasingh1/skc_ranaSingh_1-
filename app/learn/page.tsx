"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CodePlayground from "@/components/CodePlayground";
import TutorCharacter from "@/components/TutorCharacter";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; 

export default function LearnPage() {
  const [selectedCharacter, setSelectedCharacter] = useState("default");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const apiKey = localStorage.getItem("openai_api_key");
    if (!apiKey) {
      window.location.href = "/config"; 
    }
  }, []);

  // Define message type
  interface Message {
    role: "user" | "assistant";
    content: string;
  }

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInput(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]); 
    setInput(""); 
    setLoading(true); 

    console.log("📨 Sending user message:", userMessage);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-OpenAI-Key": localStorage.getItem("openai_api_key") || "",
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });


      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.message) {
        const aiMessage: Message = { role: "assistant", content: data.message };
        setMessages((prev) => [...prev, aiMessage]); // Add AI response
      }
    } catch (error) {
      console.error("", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <TutorCharacter character={selectedCharacter} />
        <div className="mb-4 flex justify-center space-x-2">
          <Button onClick={() => setSelectedCharacter("default")} className="bg-blue-500 hover:bg-blue-600">
            Default
          </Button>
          <Button onClick={() => setSelectedCharacter("robot")} className="bg-purple-500 hover:bg-purple-600">
            Robot
          </Button>
          <Button onClick={() => setSelectedCharacter("animal")} className="bg-green-500 hover:bg-green-600">
            Animal
          </Button>
        </div>
        
        {/* Message Display */}
        <div className="bg-yellow-100 rounded-2xl p-4 h-[40vh] overflow-y-auto mb-4">
          {messages.map((m, index) => (
            <div key={index} className={`mb-4 ${m.role === "user" ? "text-right" : "text-left"}`}>
              {m.role === "user" ? (
                <span className="inline-block p-3 rounded-xl bg-blue-200">
                  {m.content}
                </span>
              ) : (
                <span className="inline-block p-3 rounded-xl bg-green-200 text-left">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                </span>
              )}
            </div>
          ))}
          {loading && <div className="text-gray-500">Thinking...</div>}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mt-4">
          <Textarea
            value={input} 
            onChange={handleInputChange}
            placeholder="Ask your Python question here..."
            className="mb-2 rounded-xl border-2 border-blue-300"
          />
          <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 rounded-xl" disabled={loading}>
            <Send className="mr-2" /> {loading ? "Loading..." : "Send Your Question"}
          </Button>
        </form>
      </div>

      {/* Code Playground Component */}
      <CodePlayground />
    </div>
  );
}
