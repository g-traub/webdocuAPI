    
/*
Configurer le module de route
*/
const express = require('express');
const router = express.Router();
//

/*
Définition des CRUD
*/
    // CRUD : Create
    router.post('/article', (req, res) => {
        /* 
        Vérifier la présence du title et du content dans la req
        */
       //Modifier la sécurisation pour la req (pour mongodb)
        if(req.body && req.body.title.length > 0 && req.body.content.length > 0){
            //Définition de l'item
            const item = {title: req.body.title, content: req.body.content};
            client.db(dbName).collection('post').insertOne(item, null, function (error, results) {
                if (error) {
                    res.json({ msg: 'Error create', err: error })
                }
                else{
                    res.json({ msg: 'Create', data: results });
                    console.log("Le document a bien été inséré");
                }    
            });
        }
        else{
            res.json({msg: 'Create', error: 'No data'})
        }
    });

    // CRUD : Read All
    router.get('/article', (req, res) => {
        /**
         * TODO : vérifier la sécurisation pour mongodb 
         */
        client.db(dbName).collection('post').find().toArray((err, articles)=>{
            // Tester la commande MongoDb
            if(err){ res.send(err) }
            else{ 
                // Envoyer les données au format json
                res.json(articles)
            }
        })
    });

    // CRUD : Read one
    router.get('/article/:title', (req, res) => {
        /**
         * TODO : vérifier la sécurisation pour mongodb 
         */
        client.db(dbName).collection('post').findOne({title: req.params.title},(err, articles)=>{
            // Tester la commande MongoDb
            if(err){ res.send(err) }
            else{ 
                // Envoyer les données au format json
                res.json(articles)
            }
        })
    });
    
    // CRUD : Update
    router.put('/article/:title', (req, res) => {
        /**
        * TODO : vérifier la sécurisation pour mongodb 
        */
        // Validate Request
        if(!req.body.content) {
            return res.status(400).send({
                message: "Article content can not be empty"
            });
        }
        else{
            client.db(dbName).collection('post').update(
                { title: req.params.title}, 
                {
                    title: req.body.title || "Untitled Article",
                    content: req.body.content
                },
                (err, article)=>{
                // Tester la commande MongoDb
                if(err){ res.send(err) }
                else{ 
                    // Envoyer les données au format json
                    res.json(article)
                }
            })
        }
    });
     // CRUD : Delete
     router.delete('/article/:id', (req, res) => {
        res.json({msg: 'Delete one by ID', error: null});
    });
//

/*
Exporter le module de route
*/
module.exports = router;
//