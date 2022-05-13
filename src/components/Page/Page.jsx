import React, { Fragment } from 'react';

import Header from '../Header';
import Form from '../Form';
import Error from '../Error';
import Loader from '../Loader';
import Forecast from '../Forecast';
import Reload from '../Reload';

import useForecast from '../../hooks/useForecast';


import styles from './Page.module.css';

const Page = () => {
    const { isError, isLoading, forecast, submitRequest } = useForecast();

    const onSubmit = value => {
        submitRequest(value);
    };

    return (
        <Fragment>
            <Header />
            {!forecast && (
                <div className={`${styles.box} position-relative`}>
                    {/* Form */}
                    {!isLoading && <Form submitSearch={onSubmit} />}
                    {/* Error */}
                    {isError && <Error message={isError} />}
                    {/* Loader */}
                    {isLoading && <Loader />}
                </div>
            )}

            {/* Forecast */}
            {forecast && (
                <div>
                    <div className={styles.forecastPageSearch}>
                        <Form submitSearch={onSubmit} />
                        {isError && <Error message={isError} />}
                    </div>
                    <Forecast forecast={forecast} />
                    <div className={styles.reloadButton}>
                        {!isLoading && <Reload submitSearch={onSubmit} />}
                    </div>
                    
                </div>
            )}
        </Fragment>
    );
};

export default Page;
