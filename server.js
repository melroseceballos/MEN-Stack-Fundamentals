// REQUIRING MODULES HERE
require('dotenv').config()
const path = require('path')
const express = require('express')
const livereload = require('livereload')
const connectLiveReload = require('connect-livereload');
const methodOverride = require('method-override');
const reviewsCTRL = require('./controllers/review')


// REQUIRED THE DATABASE CONNECTION AND CONTENTS IN MODEL FOLDER
const db = require('./models')

// REQUIRED TO LOOK INTO FISH ROUTES WHEN PET ID IS PULLED
const petsCTRL = require ('./controllers/fishRoutes');
const fish = require('./models/seed');


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
    app.set("view engine", "ejs")
    app.set("views",path.join(__dirname, "views"));
    
    // MIDDLEWARE == WHAT'S BETWEEN DATABASE AND APP
    app.use(express.static('public'))
    app.use(connectLiveReload());
    app.use(express.urlencoded({extended: true})); 
    app.use(methodOverride('_method'));
    
    


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
    app.use('/reviews', reviewsCTRL)

// MOUNT TO LANDING PAGE
app.get('/', function(req,res){
    db.Fish.find({isFeatured: true})
    .then(fish => {
        console.log(fish)
        res.render('home',{
            Fish: fish
        })
    })
});

app.get('*', function (req,res){
    res.render('404')
});
   // APP TO SHOW/LISTEN ON SPECIFIED PORT
   app.listen(process.env.PORT, function (){
    console.log('Express APP is listening to port', process.env.PORT);
   });
   