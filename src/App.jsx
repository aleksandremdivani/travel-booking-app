import { useEffect } from "react"
import HomePage from "./pages/HomePage"
import axios from "axios"




function App() {
  useEffect(() => {
    const fetchData = async() => {
      const response = await axios.get("")
    }
  }, [])

  return (
    <>
      <HomePage/>
    </>
  )
}

export default App
