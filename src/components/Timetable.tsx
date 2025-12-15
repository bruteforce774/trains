import type { Train } from '../types'
type TimetableProps = { trains: Train[]; onDelete: (uuid: string) => void };

function Timetable({ trains, onDelete }: TimetableProps) {

    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>Train</th>
                    <th>Destination</th>
                    <th>Arrival</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                 {trains.map((train) => (
                    <tr key={train.uuid}>
                        <td>{train.trainIdent}</td>
                        <td>{train.endStation}</td>
                        <td>{train.arrival}</td>
                        <td><button onClick={() => onDelete(train.uuid)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}

export default Timetable