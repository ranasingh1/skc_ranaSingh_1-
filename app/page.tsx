import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Rocket, Star, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-8 text-blue-600">
          <span className="inline-block animate-bounce mr-2">🐍</span>
          PythonPals: Your Coding Adventure!
        </h1>

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <p className="text-xl mb-4">
            Welcome to PythonPals, where learning Python is as fun as playing your favorite game! Our AI buddy is here
            to guide you through exciting coding challenges and help you become a Python master.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-yellow-100 p-4 rounded-xl flex items-center">
              <Star className="text-yellow-500 mr-2" />
              <span>Fun, interactive lessons</span>
            </div>
            <div className="bg-green-100 p-4 rounded-xl flex items-center">
              <Zap className="text-green-500 mr-2" />
              <span>Instant feedback on your code</span>
            </div>
            <div className="bg-purple-100 p-4 rounded-xl flex items-center">
              <Rocket className="text-purple-500 mr-2" />
              <span>Level up your coding skills</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/learn">
            <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-xl transition duration-300 ease-in-out transform hover:scale-110 shadow-lg">
              Start Your Python Adventure!
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

