const express = require("express");
const app = express();
const db = require("./models");
const port = process.env.PORT || 3306;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    })
})