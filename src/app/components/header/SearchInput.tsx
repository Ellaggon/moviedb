"use client"

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function SearchInput() {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const router = useRouter()

    const [text, setText] = useState("")
    const [error, setError] = useState(false)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value) 
        setError(false)
    }

    const validate = (value: string) => {
        if(!value.trim()){
            inputRef.current?.focus()
            setError(true)
            return false
        }
        setError(false)
        return true
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if(validate(text)) {
            router.push(`/search/name=${encodeURIComponent(text)}`)
        }
        setText("")
    }
    return (
        <article className={`hidden md:flex items-center p-2 inputs border-2 rounded-lg ${error ? "border-red-500" : "border-gray-700"}`}>
            <form className="flex items-center gap-2 w-full" onSubmit={onSubmit}>
                <input
                    ref={inputRef}
                    type="text"
                    value={text}
                    onChange={onChange}
                    placeholder="Search"
                    className="w-[110px] bg-transparent rounded-lg outline-none text-sm tracking-wide placeholder-white" />
                <button 
                    type="submit" 
                    className="p-1">
                    <BiSearch className="text-white"/>
                </button>
            </form>
        </article>
    );
}