<script setup>
	let mapWrapper = ref(null);
	function initMap() {
		console.log(mapWrapper);
		const map = new google.maps.Map(mapWrapper.value, {
			center: { lat: -34.397, lng: 150.644 },
			zoom: 8,
		});
		// console.log(document.getElementById('map'), map)
		console.log(map);
	}
	onMounted(() => {
		initMap();
	});
</script>
<template>
	<div id="map" ref="mapWrapper"></div>
</template>
