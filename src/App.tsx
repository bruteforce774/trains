import trainsData from './data/trains.json'
import type { Train } from './types'
import Timetable from './components/Timetable'

const trains = trainsData as Train[]

for (let train of trains) {
  console.log(`${train.trainIdent} from ${train.startStation} to ${train.endStation}`)
  console.log(`Expected arrival ${train.arrival}`)
}

function App() {
  return (
    <Timetable trains={trains} />
  )
}

export default App