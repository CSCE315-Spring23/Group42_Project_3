import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudSun, faCloudRain } from '@fortawesome/free-solid-svg-icons';

class Weather extends Component {
  state = {
    weatherData: null
  }

  componentDidMount() {
    const API_KEY = 'fc1eddf344a74d12fd07351746378bf4';
    const LOCATION = 'College Station, TX';
    const URL = `https://api.weatherstack.com/current?access_key=${API_KEY}&query=${LOCATION}`;

    axios.get(URL)
      .then(response => {
        this.setState({
          weatherData: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let icon;
    let description;
    let temperature;
  
    if (this.state.weatherData && this.state.weatherData.current) {
      const weather = this.state.weatherData.current;
  
      if (weather.weather_code === 113 || weather.weather_code === 116) {
        icon = faSun;
      } else if (weather.weather_code === 119 || weather.weather_code === 122) {
        icon = faCloudSun;
      } else if (
        [
          143,
          248,
          260,
          143,
        ].includes(weather.weather_code)
      ) {
        icon = faCloud;
      } else {
        icon = faCloudRain;
      }
  
      description = weather.weather_descriptions[0];
      temperature = weather.temperature;
    }
  
    return (
      <div>
        {this.state.weatherData && this.state.weatherData.current ? (
          <div>
            <FontAwesomeIcon icon={icon} size="4x" />
            <p>{description}</p>
            <p>{temperature ? `${temperature}°C` : ''}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
  
}

export default Weather;
