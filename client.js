//Modulos
var express = require("express")
,morgan = require("morgan")
,app = express()
,port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.static("./public"));

app.get("/", function(req, res) {
    res.sendFile("./public/index.html");
});

app.listen(port, function () {
  console.log( "Servidor rodando na porta: " + port);
});
