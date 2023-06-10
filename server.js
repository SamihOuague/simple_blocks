let express = require("express");
let path = require("path");
let app = express();
let cors = require("cors");

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(8000);