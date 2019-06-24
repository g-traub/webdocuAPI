/* 
Importer les composants serveur
*/
 
    //Class
    require('dotenv').config();
    const express = require('express');
    const bodyParser = require('body-parser');
    const cors = require('cors');
    const jwt = require('jsonwebtoken');
    
    //Modules serveur
    const apiRoutes = require('./routes/api.routes');
    const {client, mongoConnect} = require('./services/db.service');

//

/* 
Configuration du serveur
*/
    //Variables serveur
    const server = express();
    const port  = 3001;

    //Configuration de body-parser
    server.use(express.static('public'));
    server.use(bodyParser.json({limit: '10mb'}));
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(cors());

    //Utilisation des routeurs 
    server.use('/api', apiRoutes);
//

/* 
Lancer le serveur
*/
mongoConnect()
.then( db => {
    server.listen( port, () => console.log({ server:`Server is launched on port ${port}`, db: db.url }) )
})
.catch( dbError => {
    server.listen( port, () => console.log({ server: port, db: dbError }) )
})
//

/*
Verifier le token
*/
function verifyToken(req, res, next){
    //Récuperer le token
    const bearerHeader = req.headers['authorization'];
    //Vérifier qu'il est défini
    if(typeof(bearerHeader) !== undefined){
        //récuperer le token de la valeur retournée
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else {
        //Interdire
        res.sendStatus(403);
    }
}
//
