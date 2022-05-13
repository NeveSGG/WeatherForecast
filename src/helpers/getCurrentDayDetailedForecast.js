const currentDayForecast = data => [
    {
        name: 'ощущается как',
        value: Math.round(data['main']['feels_like']-273.15),
        unit: '°C',
    },
    {
        name: 'влажность',
        value: data['main']['humidity'],
        unit: '%',
    },
    {
        name: 'ветер',
        value: Math.round(data['wind']['speed']),
        unit: 'м/с',
    },
    {
        name: 'давление',
        value: Math.round(data['main']['pressure']*0.75006156),
        unit: 'мм.рт.ст.',
    },
    {
        name: 'max температура',
        value: Math.round(data['main']['temp_max']-273.15),
        unit: '°C',
    },
    {
        name: 'min температура',
        value: Math.round(data['main']['temp_min']-273.15),
        unit: '°C',
    },
];

export default currentDayForecast;
