import Image from "next/image"

interface TutorCharacterProps {
  character: string
}

export default function TutorCharacter({ character }: TutorCharacterProps) {
  const characterImages = {
    default: "https://img.freepik.com/free-vector/online-tutor-concept-illustration_114360-20299.jpg?ga=GA1.1.552583937.1734121880&semt=ais_hybrid",
    robot: "https://img.freepik.com/free-vector/girl-talking-robot-humanoid-cyborg-machine-flat-illustration_74855-10681.jpg?t=st=1738498787~exp=1738502387~hmac=120621f63722eb7b7149b0e5ca5c8add7b47af9364cb9ea1ac09c91e8aa7bc5e&w=1800",
    animal: "https://img.freepik.com/free-vector/cute-animal-dog-group-isolated-white-background_1308-51341.jpg?ga=GA1.1.552583937.1734121880&semt=ais_hybrid",
  }

  return (
    <div className="mb-4">
      <Image
        src={characterImages[character as keyof typeof characterImages] || "/placeholder.svg"}
        alt={`${character} tutor`}
        width={200}
        height={200}
      />
    </div>
  )
}

