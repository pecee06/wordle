import express from "express";
import cors from "cors"
import words from "./wordBase.js";

const app = express()
const port = 3000

app.use(cors())

app.get("/api/words", (req, res)=>{
    res.send(JSON.stringify(words))
})

app.listen(port, ()=>{
    console.log(`Listening at localhost:${port}`);
})