function getDayName(date = new Date(), locale = 'ru-RU') {
    return date.toLocaleDateString(locale, {weekday: 'long'});
}

function getDateName(date = new Date(), locale = 'ru-RU') {
    return date.toLocaleDateString(locale, {month: 'long'});
}

function getDayNum(date = new Date(), locale = 'ru-RU') {
    return date.toLocaleDateString(locale, {day: 'numeric'});
}


const getCurrentDayForecast = (data, title) => ({
        weekday: getDayName(new Date(data['dt_txt'])),
        date: getDateName(new Date(data['dt_txt'])) + ', ' + getDayNum(new Date(data['dt_txt'])) + '-е',
        location: title,
        temperature: Math.round(data['main']['temp']-273.15),
        weatherIcon: `https://openweathermap.org/img/wn/${data['weather'][0]['icon']}@2x.png`,
        weatherDescription: data['weather'][0]['description'],
    });

export default getCurrentDayForecast;
