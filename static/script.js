const lightTile = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://carto.com/">Carto</a>',
  maxZoom: 19
});

const map = L.map('map', {
  center: [12.9716, 77.5946],
  zoom: 12,
  layers: [lightTile]
});



const stations = JSON.parse(document.getElementById('station-data').textContent);
const markerMap = {};

stations.forEach(station => {
  const marker = L.marker([station.latitude, station.longitude])
    .addTo(map)
    .bindPopup(`<strong>${station.name}</strong><br>${station.address}<br><strong>Batteries:</strong> ${station.battery_available}`);

  markerMap[station.name] = marker;
});

//Marker pop up when card is clicked
document.querySelectorAll('.station-card').forEach(card => {
  card.addEventListener('click', () => {
    const name = card.querySelector('h2').textContent.trim();
    const marker = markerMap[name];
    if (marker) {
      marker.openPopup();
      map.flyTo(marker.getLatLng(), 14, {
        animate: true,
        duration: 1.2
      });
    }
  });
});


function filterStations() {
  const input = document.getElementById('citySearch');
  const filter = input.value.trim().toLowerCase();
  const cards = document.querySelectorAll('.station-card');
  const status = document.getElementById('statusMessage');

  let found = false;
  let firstCoords = null;

  // Hide all cards in the beginning
  cards.forEach(card => {
    const city = card.getAttribute('data-city').toLowerCase();
    const match = city.includes(filter);

    if (filter === '') {
      card.style.display = 'none';
    } else {
      card.style.display = match ? 'block' : 'none';
    }

    if (match && !firstCoords) {
      const s = stations.find(st => st.city.toLowerCase() === city);
      if (s) firstCoords = [s.latitude, s.longitude];
      found = true;
    }
  });

  // Update status message
  if (filter === '') {
    status.textContent = '🔍 Start typing to search for EV swap stations.';
  } else if (!found) {
    status.textContent = '🚫 No stations found in that city.';
  } else {
    status.textContent = '';
    if (firstCoords) {
      map.flyTo(firstCoords, 13, {
        animate: true,
        duration: 2.0
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.station-card').forEach(card => {
    card.style.display = 'none';
  });
  setTimeout(() => map.invalidateSize(), 300);
});





