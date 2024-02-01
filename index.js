import words from "./wordBase.js";

import express from "express";
import cors from "cors"

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename) + "/public";

const app = express()
const port = 3000

app.use(express.static(__dirname))

app.get("/", (req, res)=>{
    res.sendFile("index.html",{
        root: __dirname
    })
})

app.get("/api/words", cors(), (req, res)=>{
    res.send(JSON.stringify(words))
})

app.listen(port, ()=>{
    console.log(`Listening at localhost:${port}`);
})