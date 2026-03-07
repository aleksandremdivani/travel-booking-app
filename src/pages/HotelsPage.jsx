import { useContext } from "react"
import { DestinationsContext } from "../context/DestinationsContext"

export const HotelsPage = () => {
    const {inputRef, handleSearch} = useContext(DestinationsContext);
    return (
        <main className="flex flex-col h-180 gap-3 px-4">
            <div className="border h-1/10">
                <input type="text" ref={inputRef} placeholder="search"/>
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="h-88/100 border-green-500 border w-full">

            </div>
        </main>
    )
}