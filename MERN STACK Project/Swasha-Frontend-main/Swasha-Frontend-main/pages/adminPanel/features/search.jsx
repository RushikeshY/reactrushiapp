import { useRouter } from "next/router"
import { useState } from "react"
import { SearchIcon } from "../../../components/svg"

const Search = () => {
    const router = useRouter()
    const [query,setQuery] = useState("")
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            router.push({query: { keyword: query } });
            setQuery("")
        }} className="flex items-center">
            <div className="relative w-full">
                <input type="text" id="simple-search" onChange={(e) => setQuery(e.target.value)} value={query} className="bg-gray-400 font-normal text-sm rounded-l-md block p-2.5 w-full md:w-64" placeholder="Search..." required />
            </div>
            <button type="submit" className="p-[5.7px] text-sm font-medium bg-gray-900 rounded-r-md hover:bg-gray-800">
                <SearchIcon/>
            </button>
        </form>
    )
}

export default Search