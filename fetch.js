function init() {
  const data = async (IPvalue) => {
    //'192.212.174.101'
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

  })
}
init()