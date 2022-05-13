import React, { useEffect, useState } from "react";
import axios from 'axios';
import memoize from 'lodash.memoize';
import 'bootstrap/dist/css/bootstrap.min.css';

import getCurrentDayForecast from "../helpers/getCurrentDayForecast";
import getCurrentDayDetailedForecast from "../helpers/getCurrentDayDetailedForecast";
import getUpcomingDaysForecast from "../helpers/getUpcomingDaysForecast";

const REQUEST_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const GET_FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast?lat=';
const API_KEY = 'd81af62eeaf4f64e4993f11d38ff199b';

const useForecast = () => {
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [forecast, setForecast] = useState(null);

    const getCoords = async (location) => {
        
        try {
            const {data} = await axios(`${REQUEST_URL}${location}&appid=${API_KEY}`);
            return data;
            
        } catch (err) {
            setError('There is no such location');
            setLoading(false);
            return;
        }
    }

    const getForecastData = async (coords) => {
        try{
            const {data} = await axios(`${GET_FORECAST_URL}${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&lang=ru`);
            return data;
        }catch (err) {
            setError('Something went wrong');
            setLoading(false);
            return;
        }

    }

    const gatherForecastData = (data) => {
        const currentDay = getCurrentDayForecast(data['list'][0], data['city']['name']);

        const currentDayDetails = getCurrentDayDetailedForecast(data['list'][0]);

        const upcomingDays = getUpcomingDaysForecast(data['list']);

        setForecast({currentDay, currentDayDetails, upcomingDays});
        setLoading(false);
    }

    const submitRequest = async location => {
        setLoading(true);
        setError(false);

        const response = await getCoords(location);
        const data = await getForecastData(response['coord']);

        console.log(data);
        gatherForecastData(data);
        
    }

    return {
        isError, isLoading, forecast, submitRequest
    };
}
export default useForecast;