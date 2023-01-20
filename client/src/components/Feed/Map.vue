<script setup>
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
	let mapWrapper = ref(null);
	var searchInput = ref(null);
	var map = null;
	var marker = null;

	const changeLocation = () => {
		const position = marker.getCenter();
		const lat = position.lat();
		const lng = position.lng();
		console.log({ lat }, { lng });
	};

	function initMap() {
		map = new google.maps.Map(mapWrapper.value, {
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

		if (!map) {
			return;
		}

		var autocomplete = new google.maps.places.Autocomplete(
			searchInput.value
		);

		let pos;
		let radius = 7000;

		navigator.geolocation.getCurrentPosition(function (position) {
			pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			};
			map.setCenter(pos);

			console.log(radius);

			marker = new google.maps.Circle({
				strokeColor: '#5C5EED',
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
			disableAutoPan: true,
			content:
				'<div class="bg-blue-400  h-10 text-white rounded-md flex items-center font-poppins max-w-none">\
					<div class="w-3/12 border-r-2 p-3">\
						<svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="#fff">\
							<!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->\
							<path d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z"/></svg>\
					</div>\
					<div class="pl-3 changeLocation hover:bg-blue-600 h-full flex items-center "  @click="changeLocation" $onclick=\'console.log("Hello")\'>\
						Travel to this place\
					</div>\
				</div>',
			// '<button class="bg-red-700" onclick=\'console.log("Hello")\'>Click me</button>',
		});

		// remove the close button from infoWindow and remove the tooltip container padding
		google.maps.event.addListener(map, 'click', function (event) {
			marker.setCenter(event.latLng);
			infoWindow.setPosition(event.latLng);
			infoWindow.open(map);
			// console.log(event);
			// if (event && event.target && event.target.matches('.changeLocation')) {
			// 	changeLocation();
			// }
			infoWindow.addListener('domready', function () {
				// Check if the click event target is the "Travel to this place" text
				// var content = infoWindow.getContent();
				var content = document.querySelector('.changeLocation');
				// console.log(content)
				content.addEventListener('click', function (e) {
					// if (e.target.matches('.pl-3')) {
					changeLocation();
					// }
				});
			});
		});

		google.maps.event.addListener(map, 'zoom_changed', function () {
			// if (!marker) return;
			const zoom = map.getZoom();
			// var width = map.getDiv().offsetWidth;
			// const newRadius = 20000 / zoom;
			// console.log({ newRadius });
			// marker.setRadius(newRadius);
			// Adjust the radius based on the current zoom level
			let newRadius = radius / Math.pow(2, zoom - 8);
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
	.gm-style-cc,
	.gm-ui-hover-effect {
		display: none !important;
	}
	.gm-style-iw {
		padding: 0 !important;
		@apply bg-blue-400 !overflow-y-auto;
		max-width: none !important;
	}
	.gm-style-iw-tc::after {
		@apply bg-blue-400 !important;
	}
</style>
