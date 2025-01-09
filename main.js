// Map initialization
const map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);


const timeElement = document.getElementById('time');
const traditionsElement = document.getElementById('traditions');
// Function to get the current time and time zone
async function getTime(lat, lon) {
    try {
        
        const username = 'testpetproject'; 
        const response = await fetch(`https://secure.geonames.org/timezoneJSON?lat=${lat}&lng=${lon}&username=${username}`);
        const data = await response.json();

        if (data.time) {
            timeElement.textContent = `Current time: ${data.time}`;
            traditionsElement.textContent = `Time zone: ${data.timezoneId}`;
        } else {
            throw new Error('Failed to obtain time data.');
        }
    } catch (error) {
        timeElement.textContent = 'Failed to get time';
        traditionsElement.textContent = '-';
        console.error(error);
    }
}
// Map click handler
map.on('click', (e) => {
    const { lat, lng } = e.latlng;
    getTime(lat, lng);
});

