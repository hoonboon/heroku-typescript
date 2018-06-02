import * as express from "express";
import log from "./log";

const throng = require("throng");

// heroku: user to set env variable WEB_MEMORY, heroku will calculate and set the WEB_CONCURRENCY
const WORKERS = process.env.WEB_CONCURRENCY || 1;
const PORT = process.env.PORT || 5000;

function start(id: number) {
    const app = express();

    app.get("/", (req, res) => {
        res.json(JSON.stringify({ok: 1})).end();
    });

    app.listen(PORT, () => {
        log.info(`worker ${id} running on ${PORT}`);
    });
}

throng({
    workers: WORKERS,
    lifetime: Infinity,
    start: start
});
