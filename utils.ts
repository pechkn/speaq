import {Coords, Message as TMessage, RelativeTimeFormatUnit, RelativeTimeFormatUnits, User, WindowSize} from './types';
import {useEffect, useState} from "react";

export const timeSince = (input: number) => {
	const date = new Date(input)
	const formatter = new Intl.RelativeTimeFormat("en");
	const ranges: RelativeTimeFormatUnits = {
		years: 3600 * 24 * 365,
		months: 3600 * 24 * 30,
		weeks: 3600 * 24 * 7,
		days: 3600 * 24,
		hours: 3600,
		minutes: 60,
		seconds: 1,
	}

	const secondsElapsed = (date.getTime() - Date.now()) / 1000;
	for (const [key, value] of Object.entries(ranges) as [RelativeTimeFormatUnit, number][]) {
		if (value < Math.abs(secondsElapsed)) {
			const delta = secondsElapsed / value;
			return formatter.format(Math.round(delta), key)
		}
	}
}

export const getDate = (timestamp: number) => {
	const date = new Date(timestamp)
	return date.toLocaleString('default', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export const getChatMessages = (users : User[], firstUserId : number, secondUserId : number) => {
	const messages: TMessage[] = []
	users[firstUserId].messages.forEach(
			(message) =>
					message.recipientId === secondUserId && messages.push(message)
	)
	users[secondUserId].messages.forEach(
			(message) => {
				message.recipientId === firstUserId && messages.push(message)
			}
	)
	return messages.sort((a, b) => a.date - b.date)
}

export const distanceBetween = ([x1, y1]: Coords, [x2, y2]: Coords) => {
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

export const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: undefined,
		height: undefined,
	});
	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return windowSize;
}