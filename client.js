//Modulos
var express = require("express")
,morgan = require("morgan")
,app = express()
,port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.static("./public"));
app.use('/static',  express.static(__dirname + '/public'));
app.use('/lib',  express.static(__dirname + '/node_modules'));

app.get("/", function(req, res) {
    res.sendFile("./public/index.html");
});

app.listen(port, function () {
  console.log( "Servidor rodando na porta: " + port);
});
