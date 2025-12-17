import trainsData from "./data/trains.json";
import type { Train } from "./types";
import Timetable from "./components/Timetable";
import AddTrainForm from "./components/AddTrainForm";
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
    const updatedTrain = ({ ...trainToReschedule, arrival: newTime }) as Train;
    const updatedTrains = trains.map(train => 
      train.uuid === uuidToReschedule ? updatedTrain : train
    );
    setTrains(updatedTrains);
    localStorage.setItem("trains", JSON.stringify(updatedTrains));

  }

  // React 19-style form action: receives FormData directly from the form
  const handleAddTrain = (formData: FormData) => {
    const trainIdent = (formData.get('trainIdent') || '').toString().trim();
    const startStation = (formData.get('startStation') || '').toString().trim();
    const endStation = (formData.get('endStation') || '').toString().trim();
    const departure = (formData.get('departure') || '').toString().trim();
    const arrival = (formData.get('arrival') || '').toString().trim();
    const currentStationRaw = (formData.get('currentStation') || '').toString().trim();
    if (!trainIdent || !startStation || !endStation || !departure || !arrival) return;

    const newTrain: Train = {
      uuid: crypto.randomUUID(),
      trainIdent,
      startStation,
      endStation,
      departure,
      arrival,
      currentStation: currentStationRaw || startStation,
    };

    setTrains(prev => {
      const updated = [...prev, newTrain];
      localStorage.setItem("trains", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <>
      <AddTrainForm action={handleAddTrain} />
      <Timetable trains={trains} onDelete={handleDelete} onReschedule={handleReschedule} />
    </>
  );
}

export default App;
