import { observeAuth, logoutUser, getCurrentUserProfile } from "./auth.js";
// Import nuevo fase 3
import {getCityWeather, formatWeatherUpdateTime, getWeatherCodeInfo} from "./weather.js"

const navUserName = document.getElementById('navUserName');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const favoriteCity = document.getElementById('favoriteCity');
const logoutBtn = document.getElementById('logoutBtn');

//Constantes nuevas para el clima.
const refreshWeatherBtn = document.getElementById('refreshWeatherBtn')
const weatherAlert = document.getElementById('weatherAlert')
const weatherContent= document.getElementById('weatherContent')
const weatherCityName = document.getElementById('weatherCityName')
const weatherDescription = document.getElementById('weatherDescription')
const weatherTemperature = document.getElementById('weatherTemperature')
const weatherApparentTemp = document.getElementById('weatherApparentTemp')
const weatherHumidity = document.getElementById('weatherHumidity')
const weatherWind = document.getElementById('weatherWind')
const weatherCoords = document.getElementById('weatherCoords')
const weatherUpdatedAt = document.getElementById('weatherUpdatedAt')
const weatherIcon = document.getElementById('weatherIcon')

//Funciones de clima
let currentFavoriteCity=''
const showWeatherAlert = message => {
    weatherAlert.textContent=message
    weatherAlert.classList.remove('d-none')
}
const hideWeatherAlert = message => {
    weatherAlert.textContent=''
    weatherAlert.classList.add('d-none')
}
const setWeatherLoading= isLoading =>{
    weatherLoading.classList.toggle('d-none',!isLoading)
    refreshWeatherBtn.disabled =isLoading
}
const hideWeatherContent =() =>{
    weatherContent.classList.add('d-none')

}
const showWeatherContent =() =>{
    weatherContent.classList.remove('d-none')   
}
const buildLocationLabel=location =>{
    const parts = [location.name]
    if(location.admin1){
        parts.push(location.admin1)
    }
    if(location.country){
        parts.push(location.country)
    }
    return parts.join(",")
}
const renderWeather = weatherData =>{
   const {location,current,weatherInfo} = weatherData
   
   weatherCityName.textContent=buildLocationLabel(location)
   weatherDescription.textContent=weatherInfo.label
   weatherTemperature.textContent=`${Math.round(current.temperature_2m)} °C`
   weatherApparentTemp.textContent=`${Math.round(current.apparent_temperature)} °C`
   weatherHumidity.textContent=`${current.relative_humidity_2m}%`
   weatherWind.textContent=`${current.wind_speed_10m}km/h`
   weatherCoords.textContent=`${location.latitude.toFixed(4)},${location.longitude.toFixed(4)}`
   weatherUpdatedAt.textContent=formatWeatherUpdateTime(current.time)


   weatherIcon.className= `bi ${weatherInfo.icon} weather-main-icon`

    showWeatherContent()

}
const loadWeather= async(city)=>{
    if(!city){
        hideWeatherContent()
        showWeatherAlert('No tienes una ciudad definida')
        return
    }
    hideWeatherAlert()
    hideWeatherContent()
    setWeatherLoading(true)
    try {
        const weatherData = await getCityWeather(city)
        renderWeather(weatherData)
    } catch (error) {
        console.log('Catch')
        hideWeatherContent()
        console.log('el putisimo catch')
        showWeatherAlert(error.message || 'No se encontro el clima')
    }finally{
        setWeatherLoading(false)
    }
}
//Termina funciones de clima
observeAuth(async (user) => {
    
    if (!user) {
        // Si no hay usuario, mandarlo al login
        window.location.href = './login.html';
        return;
    }

    try {
        const profile  =  await getCurrentUserProfile(user.uid)
        const resolveName = profile?.name || user.email.split('@')[0]|| 'usuario'
        const   resolveEmail =profile?.email || user.email || '--'
        const   resolvedCity = profile?.favoriteCity?.trim()||'No added'

        userName.textContent =resolveName
        navUserName.textContent = resolveName
        userEmail.textContent = resolveEmail
        favoriteCity.textContent = resolvedCity
        
        currentFavoriteCity= resolvedCity
        loadWeather(currentFavoriteCity)
    } catch (error) {
        showWeatherAlert('No fue posible cargar tu perfil')
    }
});
logoutBtn?.addEventListener('click', async () => {
    await logoutUser();
    window.location.href = './login.html';
});
refreshWeatherBtn?.addEventListener('click',async()=>{
    await loadWeather(currentFavoriteCity)
})
