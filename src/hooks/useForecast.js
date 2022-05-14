import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import getCurrentDayForecast from "../helpers/getCurrentDayForecast";
import getCurrentDayDetailedForecast from "../helpers/getCurrentDayDetailedForecast";
import getUpcomingDaysForecast from "../helpers/getUpcomingDaysForecast";

const REQUEST_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const GET_FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast?lat=';
const API_KEY = '9df32fc6fa254e09c0e0f53f514fd8a9';

const useForecast = () => {
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isReloading, setReloading] = useState(false);
    const [city, setCity] = useState(null);
    const [rawForecast, setRawForecast] = useState(null);
    const [forecast, setForecast] = useState(null);

    useEffect(() => {
        if (isReloading){
            const gatherData = async () => {
                const coords = await getCoords(city);
                await getForecastData(coords['coord']);
                console.log('hook1 is finished');
            }
            gatherData();
        }
    }, [isReloading])

    useEffect(() => {
        if (city){
            const gatherData = async () => {
                const coords = await getCoords(city);
                await getForecastData(coords['coord']);
                console.log('hook1 is finished');
            }
            gatherData();
        }
    }, [city])
    
    useEffect(() => {
        if (rawForecast) {
            gatherForecastData();
            console.log('hook2 is finished')
        }
    }, [rawForecast])

    const getCoords = async (location) => {
        
        try {
            const {data} = await axios(`${REQUEST_URL}${location}&appid=${API_KEY}`);
            console.log(data);
            return data;
            
        } catch (err) {
            setError('There is no such location');
            setLoading(false);
            setReloading(false);
            return;
        }
    }

    const getForecastData = async (coords) => {
        try{
            const {data} = await axios(`${GET_FORECAST_URL}${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&lang=ru`);
            setRawForecast(data);
            
            console.log(data);
            return;
        }catch (err) {
            setError('Something went wrong');
            setLoading(false);
            setReloading(false);
            console.log(err);
            return;
        }

    }

    const gatherForecastData = () => {
        const currentDay = getCurrentDayForecast(rawForecast['list'][0], rawForecast['city']['name']);

        const currentDayDetails = getCurrentDayDetailedForecast(rawForecast['list'][0]);

        const upcomingDays = getUpcomingDaysForecast(rawForecast['list']);

        setForecast({currentDay, currentDayDetails, upcomingDays});
        setLoading(false);
        setReloading(false);
    }

    const submitRequest = location => {
        setLoading(true);
        setError(false);
        
        console.log('got city name')
        setCity(location);
        
    }

    const reloadRequest = () => {
        setLoading(true);
        setError(false);
        setReloading(true);
    }

    return {
        isError, isLoading, forecast, submitRequest, reloadRequest
    };
}
export default useForecast;