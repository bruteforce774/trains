import type { Train } from '../types'
type TimetableProps = { trains: Train[] };

function Timetable({ trains }: TimetableProps) {

    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>Train</th>
                    <th>Destination</th>
                    <th>Arrival</th>
                </tr>
            </thead>
            <tbody>
                 {trains.map((train) => (
                    <tr key={train.uuid}>
                        <td>{train.trainIdent}</td>
                        <td>{train.endStation}</td>
                        <td>{train.arrival}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}

export default Timetable