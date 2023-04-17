import React, { Component } from 'react';
import axios from 'axios';

class Weather extends Component {
  state = {
    isLoading: true,
    weatherData: null,
    error: null
  }

  componentDidMount() {
    const API_KEY = 'c162fb7cca1b4833829201608231704';
    const LOCATION = 'College Station Texas';
    const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(LOCATION)}`;

    axios.get(URL)
      .then(response => {
        this.setState({
          isLoading: false,
          weatherData: response.data
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          error: error
        });
      });
  }

  render() {
    const { isLoading, weatherData, error } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error: {error.message}</p>;
    }

    const { condition, temp_c, wind_kph, humidity } = weatherData.current;

    return (
      <div>
        <h2>Current Weather for College Station, Texas</h2>
        <p>Condition: {condition.text}</p>
        <p>Temperature: {temp_c}°C</p>
        <p>Wind Speed: {wind_kph} km/h</p>
        <p>Humidity: {humidity}%</p>
      </div>
    );
  }
}

export default Weather;
