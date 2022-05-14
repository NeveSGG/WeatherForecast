import React from 'react';

import styles from './UpcomingDaysForecastItem.module.css';
import useForecast from '../../hooks/useForecast';

const UpcomingDaysForecastItem = ({weekday, temperature, imgUrl}) => {
    const { isError, isLoading, forecast, submitRequest} = useForecast();

    return(
    <li className={`${styles.weekday} d-flex flex-column justify-content-center align-items-center p-2`}>
        <img className="mb-2" width="30" src={`${imgUrl}`} alt=""/>
        <span className="mb-2">{weekday}</span>
        <span className="font-weight-bold">{temperature}&deg;</span>
    </li>)
};

export default UpcomingDaysForecastItem;