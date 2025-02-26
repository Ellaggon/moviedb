"use client"

import { useRef, useState } from "react";
import { BiSearch } from "react-icons/bi"
import { useRouter } from "next/navigation";

export default function SearchButton({ clicked, handleClick }: { clicked: boolean; handleClick: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const [text, setText] = useState("")
  const [error, setError] = useState(false)

  const validate = (value: string) => {
    if (!value.trim()) {
      inputRef.current?.focus()
      setError(true)
      return false
    }
    setError(false)
    return true
  }

  const onChange = ((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    setError(false)
  })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate(text)) {
      router.push(`/search/name=${encodeURIComponent(text)}`)
      setText("")
    }
  }
  return (
    <div className={`transition-all ${clicked ? "max-w-md border-2 border-white rounded-lg ml-auto" : ""} ${error ? "border-red-500" : ""}`}>
      <form onSubmit={onSubmit} className={`flex items-center gap-2 transition-all `}>
        <input ref={inputRef} type="text" value={text} onChange={onChange} placeholder="Search" className={`bg-transparent outline-none text-white transition-all ${clicked ? "w-full px-3 py-1 opacity-100" : "w-0 opacity-0"} ${error ? "border-red-500" : ""}`} />

        <button onClick={handleClick} type="submit" className="bg-trasparent border-none transition-all">
          <BiSearch className="text-white text-4xl hover:text-blue-500" />
        </button>
      </form>
    </div>
  )
}