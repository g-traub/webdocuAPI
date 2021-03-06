    
/*
Configurer le module de route
*/
const express = require('express');
const router = express.Router();
ObjectID = require('mongodb').ObjectID;
const assert = require('assert');
//


/* 
DB
*/
const dbName = 'webdocAPI';
const {client, mongoConnect, MongoClient} = require('../services/db.service');

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
            const item = {title: req.body.title, content: req.body.content, url: req.body.url};
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
        client.db(dbName).collection('content').findOne(ObjectID(req.params.id),(err, results)=>{
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
           // Validate Request
           if(!req.body.content) {
               return res.status(400).send({
                   message: "block content can not be empty"
               });
           }
           else{
                client.db(dbName).collection('content').findOneAndUpdate(
                    {_id :ObjectID(req.params.id)},
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
        client.db(dbName).collection('content').findOneAndDelete({_id :ObjectID(req.params.id)}, (err, results) => {
            // Tester la commande MongoDb
            if(err){ res.send(err) }
            else{
               res.json({msg: 'Delete one by ID', error: null});
               console.log("Le document a bien été modifié");
            } 
        })
    });

    // Connexion
    router.post('/login', (req, res) => {
       if(req.body && req.body.identifiant && req.body.password){
        console.log(req.body);
        
        //Récupération des id/mdp
        const user = req.body.identifiant;
        const pswd  = req.body.password;
        // Changement de l'url
        const uri = `mongodb+srv://${user}:${pswd}@cluster0-yiyf6.mongodb.net/test?retryWrites=true&w=majority`;
        //New client
        const dbName = "webdocAPI";

        MongoClient.connect(uri, { useNewUrlParser: true }, function (err, client){
            assert.equal(null, err);
            const db = client.db(dbName);
            console.log("Connected successfully to server", db);

            client.close();
        })
    }
    else{
        res.json({msg: 'login error', error: 'No data'});
    }

    });
//

/*
Exporter le module de route
*/
module.exports = router;

//