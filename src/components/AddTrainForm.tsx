import type { FormEventHandler } from 'react'

type AddTrainFormProps = {
  // React 19+ client-side form action (receives FormData)
  action: (formData: FormData) => void | Promise<void>
}

function AddTrainForm({ action }: AddTrainFormProps) {
  // Use native <form action> with a function to get FormData (React 19 style)
  return (
    <form action={action} style={{ marginBottom: '1rem', display: 'grid', gap: '.5rem', maxWidth: 520 }}>
      <h2>Add Train</h2>
      <label>
        Train ID
        <input name="trainIdent" required placeholder="IC 123" />
      </label>
      <label>
        Start Station
        <input name="startStation" required placeholder="Stockholm" />
      </label>
      <label>
        End Station
        <input name="endStation" required placeholder="Gothenburg" />
      </label>
      <label>
        Departure (HH:MM)
        <input name="departure" required pattern="^\\d{2}:\\d{2}$" placeholder="08:15" />
      </label>
      <label>
        Arrival (HH:MM)
        <input name="arrival" required pattern="^\\d{2}:\\d{2}$" placeholder="11:35" />
      </label>
      <label>
        Current Station (optional)
        <input name="currentStation" placeholder="(defaults to Start Station)" />
      </label>
      <button type="submit">Add Train</button>
    </form>
  )
}

export default AddTrainForm
