import Weather from '../models/weather';
const API_KEY = 'a7cc71a3d841f72bf28947635fa5d6f5'
const URL = 'http://api.openweathermap.org/data/2.5/weather'
export const fetchWeather = async (cityName)=>{

   try {
    const response = await fetch(`${URL}?q=${cityName}&appid=${API_KEY}`)
    
    const data  = await response.json()
    // console.log('Fetched data:', data); 
    if (response.ok){
     
        return new Weather(data)
    }
    else{
        throw new Error(data.message);
    }
   } catch (error) {
    console.error('Error fetching data:', error.message); 
    throw error; 
   }
}