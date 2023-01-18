<script setup>
	let mapWrapper = ref(null);
	var searchInput = ref(null);
	function initMap() {
		const map = new google.maps.Map(mapWrapper.value, {
			center: { lat: -34.397, lng: 150.644 },
			zoom: 8,
			controls: [],
			scrollwheel: true,
			navigationControl: false,
			streetViewControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			// zoomControl: false,
			mapTypeControl: false,
		});

		var autocomplete = new google.maps.places.Autocomplete(
			searchInput.value
		);

		let pos;
		var marker;
		let radius = 10000;

		navigator.geolocation.getCurrentPosition(function (position) {
			pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			};
			map.setCenter(pos);

			console.log(radius);

			marker = new google.maps.Circle({
				strokeColor: '#FFF',
				strokeOpacity: 2,
				strokeWeight: 0,
				fillColor: '#5C5EED',
				fillOpacity: 1,
				map: map,
				center: pos,
				radius: radius, // 3km
			});


			// marker.setOptions({
			// 	scale: false,
			// });
			// map.setZoom(8);

			// marker = new google.maps.Marker({
			// 	position: pos,
			// 	map,
			// 	title: 'Uluru (Ayers Rock)',
			// });

			// var circle = new google.maps.Circle({
			// 	map: map,
			// 	radius: 1000, // 10km radius
			// 	fillColor: '#000',
			// });
			// circle.bindTo('center', marker, 'position');

			// marker.addListener('click', function () {
			// 	console.log('clicked');
			// 	infowindow.open(map, marker);
			// });
		});

		let infoWindow = new google.maps.InfoWindow({
			content:
				'<button class="bg-red-700" onclick=\'console.log("Hello")\'>Click me</button>',
		});

		google.maps.event.addListener(map, 'click', function (event) {
			marker.setCenter(event.latLng);
			infoWindow.setPosition(event.latLng);
			infoWindow.open(map);
		});

		google.maps.event.addListener(map, 'zoom_changed', function () {
			// if (!marker) return;
			const zoom = map.getZoom();
			// var width = map.getDiv().offsetWidth;
			// const newRadius = 20000 / zoom;
			// console.log({ newRadius });
			// marker.setRadius(newRadius);
			// Adjust the radius based on the current zoom level
			let newRadius = radius / (Math.pow(2, (zoom - 8)));
			marker.setRadius(newRadius);
		});

		autocomplete.addListener('place_changed', function () {
			var place = autocomplete.getPlace();
			if (!place.geometry) {
				// User entered the name of a Place that was not suggested and
				// pressed the Enter key, or the Place Details request failed.
				window.alert(
					"No details available for input: '" + place.name + "'"
				);
				return;
			}

			// If the place has a geometry, then present it on a map.
			if (place.geometry.viewport) {
				map.fitBounds(place.geometry.viewport);
			} else {
				map.setCenter(place.geometry.location);
				map.setZoom(17); // Why not zoom in?
			}
		});
	}

	const searchLocation = ref('');

	onMounted(() => {
		initMap();
	});
</script>
<template>
	<div class="flex flex-col gap-y-2">
		<!-- <input ref="searchInput" type="text" /> -->
		<inputField
			ref="searchInput"
			type="text"
			v-model="searchLocation"
			css="border-2"
		/>
		<div ref="mapWrapper" class="w-full h-[18rem]"></div>
	</div>
</template>
<style>
	.gm-style-cc {
		display: none;
	}
</style>
