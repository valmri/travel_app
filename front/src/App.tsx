import { useEffect, useState } from "react"
import TravelCardItem from "./components/TravelCardItem"
import { TravelType } from "./types/travel.type"

function App() {
  const [counter, setCounter] = useState(0)
  const [travelList, setTravelList] = useState<TravelType[]>([])
  const [travelAddData, setTravelAddData] = useState<TravelType>({})

  useEffect(() => {
    console.log("Mounted")

    fetchTravelList()
  }, [])

  const fetchTravelList = async () => {
    const response = await fetch("/travels.json")
    const data = await response.json()
    setTravelList(data)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Submit")

    console.log("travelAddData : ", travelAddData)

    travelAddData.id = travelList.length + 1

    setTravelList([
      ...travelList,
      travelAddData
    ])
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Change value : ", e.target.value)
    console.log("Change input name : ", e.target.name)

    const { value, name } = e.target

    const newtravel = {
      ...travelAddData,
      [name]: value
    }
    setTravelAddData(newtravel)
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-red-400 my-10">Travel App</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="name" onChange={handleChange} name="name" />
        <input type="text" placeholder="city" onChange={handleChange} name="city" />
        <input type="text" placeholder="country" onChange={handleChange} name="country" />
        <input type="text" placeholder="image" onChange={handleChange} name="image" />
        <input type="text" placeholder="description" onChange={handleChange} name="description" />
        <input type="submit" value="Add travel" />
      </form>

      <button 
        onClick={() => {
          console.log("Click button")
          setCounter(counter + 1)
          console.log(counter)
        }}
      >
        Number counter : {counter}
      </button>

      <div className="grid grid-cols-3 gap-4">
        {travelList.map((travel) => 
          <TravelCardItem travel={travel} key={travel.id} />
        )}
      </div>
    </div>
  )
}

export default App
