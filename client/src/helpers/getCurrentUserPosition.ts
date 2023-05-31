console.log = () => {};
console.warn = () => {};
console.debug = () => {};
console.trace = () => {};
console.info = () => {};
console.error = () => {};

async function getCurrentUserPosition() {
	let location;
	try {
		location = await getCurrentPositionAsync({
			enableHighAccuracy: true,
			timeout: 10000,
		});
	} catch (error) {
		location = await getLocationFromIP();
	}
	return location;
}

export async function getLocationFromIP() {
	let location;
	try {
		const response = await fetch('http://ip-api.com/json');
		if (!response.ok) {
			throw new Error(
				`HTTP Error: ${response.status} ${response.statusText}`
			);
		}
		const data = await response.json();
		location = {
			lat: data.lat,
			lng: data.lon,
		};
	} catch (error) {
		console.log(error);
	}
	return location;
}

const getCurrentPositionAsync = async options => {
	const position = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject, options);
	});
	const { latitude, longitude } = position.coords;
	return {
		lat: latitude,
		lng: longitude,
	};
};

export default getCurrentUserPosition;
