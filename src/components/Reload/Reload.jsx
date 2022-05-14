import React from 'react';
import PropTypes from 'prop-types';
import styles from './Reload.module.css';


const Reload = ({submitReload}) => {

    const onReload = e => {
        e.preventDefault();
        submitReload();
    };

    return (
        <button type="submit" className={styles.button} onClick={onReload}>
            ОБНОВИТЬ
        </button>
    );
};

export default Reload;