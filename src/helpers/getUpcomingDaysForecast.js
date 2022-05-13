function getWeekday(date = new Date(), locale = 'ru-RU') {
    return date.toLocaleDateString(locale, {weekday: 'short'});
}

const getUpcomingDaysForecast = data => {
    let newArr= [];
    for (let i = 7; i<data.length; i+=8) {
        newArr.push(data[i]);
    }
    console.log(newArr);
    return newArr.map(day => ({
        imgUrl: `https://openweathermap.org/img/wn/${day['weather'][0]['icon']}@2x.png`,
        temperature: Math.round(day['main']['temp_max']-273.15),
        weekday: getWeekday(new Date(day['dt_txt'])),
    }));
}
export default getUpcomingDaysForecast;