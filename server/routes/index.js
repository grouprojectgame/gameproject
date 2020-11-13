const routes = require('express').Router()
const PlayerController = require('../controllers/PlayerController')

routes.get('/', (req, res, next) => {
    res.send('Ayo Aci-acian!!')
})

// SHOW THE PLAYERS
routes.get('/players', PlayerController.getAll)

// ADD PLAYERS
routes.post('/players', PlayerController.addPlayer)

//GET PLAYERS BY ID
routes.get('/players/:id', PlayerController.getId)

//UPDATE PLAYERS BY ID
routes.put('/players/:id', PlayerController.edit)

//DELETE ALL PLAYERS
routes.delete('/players', PlayerController.deleteAllPlayers)


module.exports = routes