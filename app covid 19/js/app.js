import styles from './styles/style.js'
const $map = document.getElementById('map');

const map = new window.google.maps.Map($map, {
    center: {
        lat: 0,
        lng: 0
    },
    zoom: 3,
    styles
});

renderData();

async function getData() {
    const response = await fetch('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest');
    const data = await response.json();
    return data;
}

function renderExtraData({ confirmed, deaths, recovered, provincestate, countryregion }) {
    return `
      <div>
            <p><strong>${provincestate}-${countryregion}</strong></p>
            <p>Confirmados: ${confirmed}</p>
            <p>Muertos: ${deaths}</p>
            <p>Recuperados: ${recovered}</p>
      </div> 
      `;
}

async function renderData() {
    const data = await getData();
    const popup = new window.google.maps.InfoWindow();
    console.log(data);
    data.forEach(item => {
        const marker = new window.google.maps.Marker({
            position: {
                lat: item.location.lat,
                lng: item.location.lng
            },
            map,
            icon: './img/toxic.png'
        });
        marker.addListener('click', () => {
            popup.setContent(renderExtraData(item));
            popup.open(map, marker);
        })
    });
}