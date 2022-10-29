const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const path = require("path/posix");

const app = express();
app.use(
  "/files",
  express.static(path.resolve(__dirname, "tmp", "uploads"))
);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./app/controllers/index")(app);

app.listen(process.env.PORT || 3001);
console.log("Escutando na porta 3001");
