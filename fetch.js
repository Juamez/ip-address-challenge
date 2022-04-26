const init = () => {
  let map = ''
  const data = async (IPvalue) => {
    const api_key = "at_YHQsYreZkVrju4yt8eiOHt5Ajp0jE";
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${api_key}&ipAddress=${IPvalue}`
    const get = await fetch(url)
    const response = await get.json()
    return response
  }
  
    const input = document.querySelector('#address')
    const btn = document.querySelector('button')
    const para1 = document.querySelector('.p-1')
    const para2 = document.querySelector('.p-2')
    const para3 = document.querySelector('.p-3')
    const para4 = document.querySelector('.p-4')
    
  btn.addEventListener('click', async (event) => {
    event.preventDefault()
    let IPvalue = input.value;
    let { ip, location: { city, country, lat, lng, region, timezone }, isp } = await data(IPvalue)
  
    para1.innerText = ip
    para2.innerText = `${city}, ${region}, ${country}`
    para3.innerText = `UTC ${timezone}`
    para4.innerText = isp

    map.remove()
    newMap(lat, lng)
  })

  function newMap(lat='51.505', lng='-0.09') {
    map = L.map('map').setView([lat, lng], 13)


    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZmxvcHB5ZGlzazMzIiwiYSI6ImNsMmJiNDBtYTAwdGEzaXA4MHJ3MTh0ZmgifQ.v2cPt-5lTXRLC33Cgj4B6A'
  }).addTo(map);
  
  let uniqueIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [30, 40],
    iconAnchor: [0, 0],
    popupAnchor: [0, 0]
  })
  
  L.marker([lat, lng], {icon: uniqueIcon }).addTo(map);
  }
  newMap()
}
init()