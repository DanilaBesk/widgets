import { useState, useEffect } from "react"
import axios from "axios"



const WeatherWidget = () => {
    const [weather, setWeather] = useState('')
    const [temperature, setTemperature] = useState(0)

    

    useEffect(() => {
        async function getWeather() {
        try{
        const response = await axios.get(
          'https://api.gismeteo.net/v2/weather/current/4368/?lang=en',
          {
            headers: {
              'X-Gismeteo-Token': '56b30cb255.3443075',
              'Accept-Encoding': 'gzip, deflate, br' 
            }
          }
        );
        console.log(response)
        }
        catch(error){
            setTemperature(-999)
            setWeather('ОШИБКА')
            console.log('ошибка')
        }
        
}
getWeather()
    }, [weather, temperature])
    return(
        <div>
            <h1>{weather}</h1>
            <h1>{temperature}</h1>
        </div>
    )
}

export default WeatherWidget;