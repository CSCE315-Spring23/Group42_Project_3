import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudSun, faCloudRain } from '@fortawesome/free-solid-svg-icons';
import './Weather.css';

/**
 * Displays the current weather information of a specified location.
 * Uses the Weather API from weatherapi.com to retrieve the weather data.
 */
class Weather extends Component {
  /**
   * Initializes the component's state with weatherData property set to null.
   */
  state = {
    weatherData: null
  };

  /**
   * Fetches the weather data for the specified location and updates the component's state with the response data.
   */
  componentDidMount() {
    const API_KEY = 'c162fb7cca1b4833829201608231704';
    const LOCATION = 'College Station, TX';
    const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${LOCATION}&aqi=no`;

    axios
      .get(URL)
      .then((response) => {
        this.setState({
          weatherData: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Returns the FontAwesomeIcon object for the weather condition icon corresponding to the provided conditionCode.
   * @param {Number} conditionCode - The condition code of the weather condition.
   * @returns {FontAwesomeIcon} The FontAwesomeIcon object for the corresponding weather condition icon.
   */
  getWeatherIcon = (conditionCode) => {
    if (conditionCode === 1000) {
      return faSun;
    } else if (
      conditionCode === 1003 ||
      (conditionCode >= 1006 && conditionCode <= 1009) ||
      (conditionCode >= 1030 && conditionCode <= 1039)
    ) {
      return faCloudSun;
    } else if (
      (conditionCode >= 1063 && conditionCode <= 1150) ||
      (conditionCode >= 1180 && conditionCode <= 1237) ||
      conditionCode === 1261 ||
      conditionCode === 1264 ||
      conditionCode === 1273 ||
      conditionCode === 1276 ||
      conditionCode === 1279
    ) {
      return faCloud;
    } else {
      return faCloudRain;
    }
  };

  /**
   * Renders the Weather component with the current weather information and weather condition icon.
   * @returns {JSX.Element} The rendered Weather component.
   */
  render() {
    let icon;
    let description;
    let temperature;

    if (this.state.weatherData && this.state.weatherData.current) {
      const weather = this.state.weatherData.current;

      icon = this.getWeatherIcon(weather.condition.code);
      description = weather.condition.text;
      temperature = weather.temp_c;
    }

    return (
      <div>
        {this.state.weatherData && this.state.weatherData.current ? (
          <div className="weather-widget">
            <p className ='weather-temperature'>{temperature ? `${temperature}°C` : ''}</p>
            <FontAwesomeIcon icon={icon} size='2x' className='weathericon'/>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default Weather;
