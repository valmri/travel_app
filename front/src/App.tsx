import { useEffect, useState } from "react"
import TravelCardItem from "./components/TravelCardItem"
import { TravelType } from "./types/travel.type"
import TravelFormAdd from "./components/TravelFormAdd"
import Typography from "./components/ui/Typography"

function App() {
  const [counter, setCounter] = useState(0)
  const [travelList, setTravelList] = useState<TravelType[]>([])
  
  useEffect(() => {
    console.log("Mounted")

    fetchTravelList()
  }, [])

  const fetchTravelList = async () => {
    const response = await fetch("/travels.json")
    const data = await response.json()
    setTravelList(data)
  }

  return (
    <div className="container mx-auto">
      <Typography
        level={1}
      >
        Travel App
      </Typography>

      <TravelFormAdd 
        travelList={travelList}
        setTravelList={setTravelList}
      />

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
          <TravelCardItem 
            travel={travel} 
            key={travel.id} 
            travelList={travelList}
            setTravelList={setTravelList}
          />
        )}
      </div>
    </div>
  )
}

export default App
