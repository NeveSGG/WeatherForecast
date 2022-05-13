import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Reload.module.css';


const Reload = ({submitSearch}) => {
    const [location, setLocation] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        if (!location || location === '') return;
        submitSearch(location);
    };

    return (
        <button type="submit" className={styles.button} onClick={onSubmit}>
            ОБНОВИТЬ
        </button>
    );
};

Reload.propTypes = {
    submitSearch: PropTypes.func.isRequired,
}

export default Reload;