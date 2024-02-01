const express = require("express");
const routes = require('./src/routes');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Working fine");
});

app.use("/api/contacts", routes);

app.listen(port, () => {
    console.log("App listening");
})