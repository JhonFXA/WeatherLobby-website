import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

const fetchWeather = async (searchtext) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchtext}&units=metric&appid=${process.env.API_WEATHER_KEY}&lang=pt_br`
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchtext}&appid=${process.env.API_WEATHER_KEY}`;
    const unsplashURL = `https://api.unsplash.com/search/photos?query=${searchtext}&client_id=${process.env.API_IMAGES_KEY}&per_page=1`;
    try {
        const weatherStream = await fetch(url);
        const weatherJson = await weatherStream.json();

        const geoStream = await fetch(geoUrl);
        const geoJson = await geoStream.json();

        const imageStream = await fetch(unsplashURL);
        const imageJson = await imageStream.json();

        if(imageJson.results && imageJson.results.length > 0 && imageJson.cod !== 404){
            const imageUrl = imageJson.results[0].urls.regular;
            weatherJson.image = imageUrl;
        } else {
            throw new Error("Não foi possível encontrar uma imagem para esta cidade.");   
        }
        
        weatherJson.state = geoJson[0].state;

        return weatherJson;
    } catch (err) {
        return {Error: err.stack};
    }
}

router.get('/', (req, res) => {
  res.json({ success: 'Hello Weather!' });
});

router.get('/:searchtext', async (req, res) => {
    const searchtext = req.params.searchtext;
    const data = await fetchWeather(searchtext);
    res.json(data);
});

router.post('/', async (req, res) => {
    const searchtext = req.body.searchtext;
    const data = await fetchWeather(searchtext);
    res.json(data);
});


export default router;
