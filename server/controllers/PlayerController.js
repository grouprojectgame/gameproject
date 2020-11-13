const { Player } = require('../models')

class PlayerController {
    static getAll (req, res, next) {
        let sort = {
            order: [["score", "DESC"]]
        }
        Player.findAll(sort)
        .then((data) => {
            return res.status(200).json(data)
        }).catch((err) => {
            return next(err)
        });
    }

    static addPlayer (req, res, next) {
        let params = {
            name: req.body.name,
            score: req.body.score
        }
        Player.create(params)
        .then((data) => {
            return res.status(201).json(data)
        }).catch((err) => {
            return next(err)
        });
    }

    static getId (req, res, next) {
        Player.findByPk(req.params.id)
        .then((data) => {
            return res.status(200).json(data)
        }).catch((err) => {
            return next(err)
        });
    }

    static edit (req, res, next) {
        let params = {
            name: req.body.name,
            score: req.body.score
        }
        Player.update(params, {
            where: {
                id: req.params.id
            },
            returning: true
        })
        .then((data) => {
            return res.status(200).json(data)
        }).catch((err) => {
            return next(err)
        });
    }

    static deleteAllPlayers(req, res, next) {
        Player.destroy({
            where: {},
            truncate: true
        })
        .then(response => {
            return res.status(200).json({message: 'successfully deleted all Players!'})
        })
        .catch(err => {
            console.log(err)
            return next(err)
        })
    }
}

module.exports = PlayerController