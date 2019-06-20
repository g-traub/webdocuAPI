/* 
Importer les composants serveur
*/
 
    //Class
    require('dotenv').config();
    const express = require('express');
    const bodyParser = require('body-parser');
    const cors = require('cors');
    
    //Modules serveur
    const apiRoutes = require('./routes/api.routes');
    const {client, mongoConnect} = require('./services/db.service');

//

/* 
Configuration du serveur
*/
    //Définir les variables serveur
    const server = express();
    const port  = process.env.PORT;
    
    //Configuration de body-parser
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
