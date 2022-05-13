import React from 'react';

import styles from './UpcomingDaysForecastItem.module.css';

const UpcomingDaysForecastItem = ({weekday, temperature, imgUrl }) => (
    <li className={`${styles.weekday} d-flex flex-column justify-content-center align-items-center p-2`}
    onClick={() => console.log("clicked!")}>
        <img className="mb-2" width="30" src={`${imgUrl}`} alt=""/>
        <span className="mb-2">{weekday}</span>
        <span className="font-weight-bold">{temperature}&deg;</span>
    </li>
);

export default UpcomingDaysForecastItem;