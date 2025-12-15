import trainsData from "./data/trains.json";
import type { Train } from "./types";
import Timetable from "./components/Timetable";
import { useState } from "react";

function App() {
  const [trains, setTrains] = useState<Train[]>(() => {
    // Try to load from localStorage
    const stored = localStorage.getItem("trains");
    if (stored) {
      return JSON.parse(stored);
    }
    // If not in localStorage, use JSON and save it
    const initial = trainsData as Train[];
    localStorage.setItem("trains", JSON.stringify(initial));
    return initial;
  });

  for (let train of trains) {
    console.log(
      `${train.trainIdent} from ${train.startStation} to ${train.endStation}`
    );
    console.log(`Expected arrival ${train.arrival}`);
  }

  const handleDelete = (uuidToDelete: string) => {
    const updatedTrains = trains.filter(train => train.uuid !== uuidToDelete);
    setTrains(updatedTrains);
    localStorage.setItem("trains", JSON.stringify(updatedTrains));
  };

  const handleReschedule = (uuidToReschedule: string) => {
    const newTime = prompt('New time?')
    const trainToReschedule = trains.find(train => train.uuid === uuidToReschedule);

  }

  return <Timetable trains={trains} onDelete={handleDelete} onReschedule={handleReschedule} />;
}

export default App;
