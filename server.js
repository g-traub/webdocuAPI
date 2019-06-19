/* 
Importer les composants serveur
*/
 
    //Class
    require('dotenv').config();
    const express = require('express');
    const path = require('path');
    const bodyParser = require('body-parser');
    
    //Modules serveur
    const apiRoutes = require('./routes/api.routes');
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

    //Utilisation des routeurs 
    server.use('/api', apiRoutes);
//

/* 
Lancer le serveur
*/
    server.listen( port, () => console.log(`Server is launched on port ${port}`));
//
