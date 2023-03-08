// REQUIRING MODULES HERE
require('dotenv').config()
const path = require('path')
const express = require('express')
const livereload = require('livereload')
const connectLiveReload = require('connect-livereload');

// REQUIRED THE DATABASE CONNECTION AND CONTENTS IN MODEL FOLDER
const db = require('./models')

// REQUIRED TO LOOK INTO FISH ROUTES WHEN PET ID IS PULLED
const petsCTRL = require ('./controllers/fishRoutes')


// CREATE THE EXPRESS APP
const app = express();

// REQUIRING THE APP TO IMPLEMENT CHANGES WHEN CHANGE IS MADE USING LIVERELOAD
const liveReloadServer = livereload.createServer();
    liveReloadServer.server.once("connection", () =>{
        // WAITS FOR NODEMON TO FINSIH EXECUTING UNTIL IT REFRESHES THE PAGE
        setTimeout(() => {
            liveReloadServer.refresh('/');
        }, 100);
    });

    // CONFIGURING THE EXPRESS APP
    app.set("viewengine", "ejs")
    app.set("views",path.join(__dirname, "views"));
    
    // MIDDLEWARE == WHAT'S BETWEEN DATABASE AND APP
    app.use(express.static('public'))
    app.use(connectLiveReload());

    // MOUNTING ROUTE TO LANDING PAGE
   app.get('/', function (req,res){
    res.send("AFV Adoption Home")
   })

   // ROUTING TO /SEED PAGE
   app.get('/seed', function(req,res){
    // REMOVE ANY EXISTING STUFF IN SEED
    db.Fish.deleteMany({})
        .then(removedPets => {
            console.log(`Removed ${removedPets.deletedCount} pets`)
            // INSERTING PETS SEED HERE
            db.Fish.insertMany(db.seedPets)
            .then(addedPets =>{
                console.log(`Added ${addedPets.length} pets to be adopted`)
                res.json(addedPets)
            })

         })
        console.log(db.Fish)
    });

    // TELLS APP TO LOOK HERE WHEN ID IS PULLED
    app.use('/fishRoutes', petsCTRL)

// MOUNT TO LANDING PAGE
app.get('/', function(req,res){
    db.Fish.find({isFeatured: true})
    .then(pets => {
        res.render('home',{
            Fish: pets
        })
    })
});
   // APP TO SHOW/LISTEN ON SPECIFIED PORT
   app.listen(process.env.PORT, function (){
    console.log('Express APP is listening to port', process.env.PORT);
   });