<script setup>
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
	let mapWrapper = ref(null);
	var searchInput = ref(null);
	var map = null;
	let infoWindow = null;
	var marker = null;

	const emit = defineEmits(['updateLocation']);

	const changeLocation = () => {
		const position = marker.getCenter();
		const lat = position.lat();
		const lng = position.lng();

		emit('updateLocation', { lat, lng });
	};

	const initMap = () => {
		const center = { lat: 33, lng: 1000 };
		map = new google.maps.Map(mapWrapper.value, {
			center,
			zoom: 8,
			controls: [],
			scrollwheel: true,
			navigationControl: false,
			streetViewControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControl: false,
		});

		if (!map) {
			return;
		}

		const autocomplete = new google.maps.places.Autocomplete(
			searchInput.value
		);
		const radius = 7000;
		marker = new google.maps.Circle({
			strokeColor: 'white',
			strokeOpacity: 2,
			strokeWeight: 0,
			fillColor: '#60A5FA',
			fillOpacity: 1,
			map: map,
			center,
			radius: radius, //  3km
		});

		const content =
			'<div class="bg-blue-400  h-14 text-white rounded-md flex items-center font-poppins max-w-none">\
				<div class="w-3/12 border-r-2 p-3">\
					<svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="#fff">\
						<!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->\
						<path d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z"/></svg>\
				</div>\
				<div class="cursor-pointer px-3 changeLocation hover:bg-blue-600 h-full flex items-center"  @click="changeLocation">\
					Travel to this place\
				</div>\
			</div>';

		infoWindow = new google.maps.InfoWindow({
			disableAutoPan: true,
			content,
		});

		// remove the close button from infoWindow and remove the tooltip container padding
		google.maps.event.addListener(map, 'click', handleMapClick);
		google.maps.event.addListener(map, 'zoom_changed', handleZoomChange);
		autocomplete.addListener('place_changed', handlePlaceChanged);
	};

	const handleMapClick = event => {
		marker.setCenter(event.latLng);
		infoWindow.setPosition(event.latLng);
		infoWindow.open(map);
		infoWindow.addListener('domready', function () {
			var content = document.querySelector('.changeLocation');
			content.addEventListener('click', function (e) {
				infoWindow.close();
				changeLocation();
			});
		});
	};

	const handleZoomChange = () => {
		const zoom = map.getZoom();
		let newRadius = radius / Math.pow(2, zoom - 8);
		marker.setRadius(newRadius);
	};

	const handlePlaceChanged = () => {
		var place = autocomplete.getPlace();
		if (!place.geometry) {
			window.alert(
				"No details available for input: '" + place.name + "'"
			);
			return;
		}

		if (place.geometry.viewport) {
			map.fitBounds(place.geometry.viewport);
		} else {
			map.setCenter(place.geometry.location);
			map.setZoom(17);
		}
	};

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
		@apply !bg-blue-400 !overflow-y-auto;
		max-width: none !important;
	}
	.gm-style-iw-tc::after {
		@apply bg-blue-400 !important;
	}
</style>
