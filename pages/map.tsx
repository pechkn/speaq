import {useEffect, useState, useCallback} from "react"
import {Map, Placemark} from "react-yandex-maps"
import {distanceBetween} from "../utils";
import {Coords, Taxi} from "../types";

const londonCoords: Coords = [51.5049375, -0.0964509]
const singaporeCoords: Coords = [1.285194, 103.8522982]

const getUserCoords = () =>
		new Promise<[number, number]>((resolve, reject) =>
				navigator.geolocation.getCurrentPosition(
						({coords}) => resolve([coords.latitude, coords.longitude]),
						reject
				)
		)

const AttachMap = () => {
	const [userCoords, setUserCoords] = useState<Coords>([0, 0])
	const [closestPoint, setClosestPoint] = useState<Coords | null>(null)
	const [taxis, setTaxis] = useState([])

	const toggleClosestPoint = () =>
			closestPoint?.[0] === londonCoords[0] &&
			closestPoint[1] === londonCoords[1]
					? setClosestPoint(singaporeCoords)
					: setClosestPoint(londonCoords)

	const getClosestPoint = useCallback(
			(userCoords: Coords) =>
					distanceBetween(londonCoords, userCoords) >
					distanceBetween(singaporeCoords, userCoords)
							? singaporeCoords
							: londonCoords,
			[]
	)

	useEffect(() => {
		getUserCoords().then((userCoords) => {
			setUserCoords(userCoords)
			setClosestPoint(getClosestPoint(userCoords))
		})
	}, [])

	useEffect(() => {
		if (closestPoint) {
			fetch(
					`https://secret-ocean-49799.herokuapp.com/https://qa-interview-test.splytech.dev/api/drivers?latitude=${closestPoint[0]}&longitude=${closestPoint[1]}&count=2`
			)
					.then((res) => res.json())
					.then((data) => setTaxis(data.drivers))
		}
	}, [closestPoint])

	return (
			<>
				{closestPoint && (
						<Map
								width="100%"
								state={{center: closestPoint, zoom: 15}}
						>
							{taxis && taxis.map((taxi: Taxi) =>
									<Placemark key={taxi.driver_id} geometry={[taxi.location.latitude, taxi.location.longitude]}/>)}
						</Map>
				)}
				<button onClick={toggleClosestPoint}>&lt;</button>
				<button onClick={() => setClosestPoint(getClosestPoint(userCoords))}>
					To closest point
				</button>
				<button onClick={toggleClosestPoint}>&gt;</button>
			</>
	)
}

export default AttachMap