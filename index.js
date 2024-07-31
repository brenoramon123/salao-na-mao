const express = require("express");
const app = express()
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
require("./src/services/database");
require("./src/services/database");
//MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());



//rotas
app.use("/servico",require("./src/routes/servico.routes"))
app.use("/salao",require("./src/routes/salao.routes"));
app.use("/horario",require("./src/routes/horario.routes"));
app.use("/colaborador",require("./src/routes/colaborador.routes"));


//VARIABLES
app.set("port",8000)

app.listen(app.get("port"),()=>{
    console.log(`WS escutando na porta ${app.get("port")}`)
})
