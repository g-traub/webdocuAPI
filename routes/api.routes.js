    
/*
Configurer le module de route
*/
const express = require('express');
const router = express.Router();
//

/* 
DB
*/
const dbName = 'webdocAPI';
const dbservice = require('../services/db.service');

const client = dbservice.client;

/*
Définition des CRUD
*/
    // CRUD : Create
    router.post('/blocks', (req, res) => {
        /* 
        Vérifier la présence du title et du content dans la req
        */
        if(req.body && req.body.title.length > 0 && req.body.content.length > 0){
            //Définition de l'item
            const item = {title: req.body.title, content: req.body.content};
            client.db(dbName).collection('content').insertOne(item, null, (err, results) => {
                if (err) {
                    res.json({ msg: 'Error create', error: err })
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
    router.get('/blocks', (req, res) => {
        /**
         * TODO : vérifier la sécurisation pour mongodb 
         */
        client.db(dbName).collection('content').find().toArray((err, results)=>{
            // Tester la commande MongoDb
            if(err){ res.send(err) }
            else{ 
                // Envoyer les données au format json
                res.json(results)
            }
        })
    });

    // CRUD : Read one
    router.get('/blocks/:id', (req, res) => {
        /**
         * TODO : vérifier la sécurisation pour mongodb 
         */
        client.db(dbName).collection('content').findOne({id: req.params._id},(err, results)=>{
            // Tester la commande MongoDb
            if(err){ res.send(err) }
            else { 
                // Envoyer les données au format json
                res.json(results)
            }
        })
    });
    
    // CRUD : Update
    router.put('/blocks/:id', (req, res) => {
        /**
        * TODO : vérifier la sécurisation pour mongodb 
        */
           // Validate Request
           if(!req.body.content) {
               return res.status(400).send({
                   message: "block content can not be empty"
               });
           }
           else{
                client.db(dbName).collection('content').findOneAndUpdate(
                   {id: req.params._id},
                   {
                    $set: 
                        {
                            title: req.body.title || "Untitled block",
                        content: req.body.content
                        }  
                   },
                   (err, results)=>{
                   // Tester la commande MongoDb
                   if(err){ res.send(err) }
                   else{
                    res.json({ msg: 'Update', data: results });
                    console.log("Le document a bien été modifié");
                }    
               })
           }
    });
     // CRUD : Delete
     router.delete('/blocks/:id', (req, res) => {
        client.db(dbName).collection('content').findOneAndDelete({id: req.params._id}, (err, results) => {
            // Tester la commande MongoDb
            if(err){ res.send(err) }
            else{
               res.json({msg: 'Delete one by ID', error: null});
               console.log("Le document a bien été modifié");
            } 
        })
    });
//

/*
Exporter le module de route
*/
module.exports = router;

//