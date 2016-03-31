//Modulos
var express = require("express")
,morgan = require("morgan")
,bodyParser = require("body-parser")
,jwt = require("jsonwebtoken")
,mongoose = require("mongoose")
,app = express()
,port = process.env.PORT || 3000
,Usuario = require('./modelos/Usuario');

// Conecta no BD
mongoose.connect('mongodb://localhost/dbAuthentication');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(function(req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.post('/login', function(req, res) {
  Usuario.findOne({nome: req.body.nome, senha: req.body.senha}, function(err, usuario) {
        if (err) {
            res.json({
                type: false,
                data: "Error: " + err
            });
        } else {
            if (usuario) {
               res.json({
                    type: true,
                    data: usuario,
                    token: usuario.token
                });
            } else {
                res.json({
                    type: false,
                    data: "Nome ou senha incorreta"
                });
            }
        }
    });
});

app.post('/criarUsuario', function(req, res) {
Usuario.findOne({nome: req.body.nome, password: req.body.senha}, function(err, usuario) {
        if (err) {
            res.json({
                type: false,
                data: "Error: " + err
            });
        } else {
            if (usuario) {
                res.json({
                    type: false,
                    data: "Usuario existe!"
                });
            } else {
                var usuarioModel = new User();
                usuarioModel.nome = req.body.nome;
                usuarioModel.senha = req.body.senha;
                usuarioModel.save(function(err, usuario) {
                    usuario.token = jwt.sign(usuario, process.env.JWT_SECRET);
                    usuario.save(function(err, usuario1) {
                        res.json({
                            type: true,
                            data: usuario1,
                            token: usuario1.token
                        });
                    });
                })
            }
        }
    });
});

function ensureAuthorized(req, res, next) {
  var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}


app.get('/home', ensureAuthorized, function(req, res) {
  Usuario.findOne({token: req.token}, function(err, usuario) {
        if (err) {
            res.json({
                type: false,
                data: "Error: " + err
            });
        } else {
            res.json({
                type: true,
                data: usuario
            });
        }
    });
});


process.on('uncaughtException', function(err) {
  console.log(err);
});

app.listen(port, function () {
  console.log( "Servidor rodando na porta: " + port);
});
