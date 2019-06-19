/* 
Importer les composants serveur
*/
 
    //Class
    require('dotenv').config();
    const express = require('express');
    const ejs = require('ejs');
    const path = require('path');
    const bodyParser = require('body-parser');
    
    //Modules serveur
    const frontRoutes = require('./routes/front.routes');
    const apiRoutes = require('./routes/api.routes');
//

/* 
Configuration du serveur
*/
    //Définir les variables serveur
    const server = express();
    const port  = process.env.PORT;
    

    // Définition du dossier static du client
    server.set( 'views', __dirname + '/www' );
    server.use( express.static(path.join(__dirname, 'www')) );

    // Configuration du moteur de rendu
    server.set( 'view engine', 'ejs' );

    //Configuration de body-parser
    server.use(bodyParser.json({limit: '10mb'}));
    server.use(bodyParser.urlencoded({ extended: true }));

    //Utilisation des routeurs 
    server.use('/api', apiRoutes);
    server.use( '/', frontRoutes);
//

/* 
Lancer le serveur
*/
    server.listen( port, () => console.log(`Server is launched on port ${port}`));
//
