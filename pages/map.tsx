import {useEffect, useState, useCallback} from "react"
import {Map, Placemark} from "react-yandex-maps"

type Coords = [number, number]

interface TaxiLocation {
	latitude: number,
	longitude: number,
	bearing: number
}

interface Taxi {
	driver_id: string,
	location: TaxiLocation
}

const londonCoords: Coords = [51.5049375, -0.0964509]
const singaporeCoords: Coords = [1.285194, 103.8522982]

const getUserCoords = () =>
		new Promise<[number, number]>((resolve, reject) =>
				navigator.geolocation.getCurrentPosition(
						({coords}) => resolve([coords.latitude, coords.longitude]),
						reject
				)
		)

const distanceBetween = ([x1, y1]: Coords, [x2, y2]: Coords) => {
	const toRadians = (value: number) => (value * Math.PI) / 180
	let R = 6371.071
	let lat1 = toRadians(x1)
	let lat2 = toRadians(x2)
	let difflat = lat2 - lat1
	let difflon = toRadians(y2 - y1)
	return (
			2 *
			R *
			Math.asin(
					Math.sqrt(
							Math.sin(difflat / 2) * Math.sin(difflat / 2) +
							Math.cos(lat1) *
							Math.cos(lat2) *
							Math.sin(difflon / 2) *
							Math.sin(difflon / 2)
					)
			)
	)
}

const AttachMap = () => {
	const [userCoords, setUserCoords] = useState<Coords>([0, 0])
	const [closestOfficeCoords, setClosestOfficeCoords] = useState<Coords | null>(null)
	const [taxis, setTaxis] = useState([])

	const toggleOffice = () =>
			closestOfficeCoords?.[0] === londonCoords[0] &&
			closestOfficeCoords[1] === londonCoords[1]
					? setClosestOfficeCoords(singaporeCoords)
					: setClosestOfficeCoords(londonCoords)

	const getClosestOfficeCoords = useCallback(
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
			setClosestOfficeCoords(getClosestOfficeCoords(userCoords))
		})
	}, [])

	useEffect(() => {
		if (closestOfficeCoords) {
			fetch(
					`https://secret-ocean-49799.herokuapp.com/https://qa-interview-test.splytech.dev/api/drivers?latitude=${closestOfficeCoords[0]}&longitude=${closestOfficeCoords[1]}&count=2`
			)
					.then((res) => res.json())
					.then((data) => setTaxis(data.drivers))
		}
	}, [closestOfficeCoords])

	return (
			<>
				{closestOfficeCoords && (
						<Map
								width="100%"
								state={{center: closestOfficeCoords, zoom: 15}}
						>
							{taxis && taxis.map((taxi: Taxi) =>
									<Placemark key={taxi.driver_id} geometry={[taxi.location.latitude, taxi.location.longitude]}/>)}
						</Map>
				)}
				<button onClick={toggleOffice}>&lt;</button>
				<button
						onClick={() =>
								setClosestOfficeCoords(getClosestOfficeCoords(userCoords))
						}
				>
					To closest point
				</button>
				<button onClick={toggleOffice}>&gt;</button>
			</>
	)
}

export default AttachMap