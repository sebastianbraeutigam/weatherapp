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

app.listen(port, () => {
    console.log(`Server is working on Port ${port}.`)
});