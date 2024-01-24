import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const API_URL = "https://api.openweathermap.org/data/2.5/weather?";
//notice: the Link https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&lang=${lang}&units=${units}
const API_KEY = "67c0cae6ce96b1c561d6d1b1d9e96314";

const city = "Elsnigk"; //searched city
const countryCode = "de"; //country code 
const lang = "de"; //language 
const units = "metric"; //units of measurement, available units parameter: standard, metric and imperial ->  read more: https://openweathermap.org/current#data


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req, res) =>  {
    res.render("index.ejs");
});

app.post("/searchweather", async (req, res) => {
    const cityId = req.body.q;
    console.log(req.body.q);
    try {
        const response = await axios.get(API_URL+"q="+cityId+"&APPID="+API_KEY+"&lang="+lang+"&units="+units);
        const result = response.data;
        const main = result.main;
        const temp = Math.round(main.temp * 10) / 10;
        const tempMin = Math.round(main.temp_min * 10) / 10;
        const tempMax = Math.round(main.temp_max * 10) / 10;
        const tempFeelsLike = Math.round(main.feels_like * 10) / 10;

        const wind = result.wind;
        const windspeed = Math.round(result.wind.speed * 10) / 10;

        const weatherDescription = result.weather;
        const description = weatherDescription[0];

        const weatherIconId = description.icon; 
        const weatherIcon = "https://openweathermap.org/img/wn/" + weatherIconId + "@2x.png";

        res.render("index.ejs", { content : result , weatherIcon : weatherIcon , weatherDescription : description , temp : temp , tempMin : tempMin , tempMax : tempMax , tempFeelsLike : tempFeelsLike , main : main , wind : windspeed });
        
    } catch (error) {
        res.render("index.ejs", { content : JSON.stringify(error)} );
    }
})

app.listen(port, () => {
    console.log(`Server is working on Port ${port}.`)
});
