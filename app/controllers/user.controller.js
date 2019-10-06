const User = require('../models/user.model.js');

// Save FormData - User to MongoDB
exports.save = (req, res) => {
    // Create a Customer
    const user = new User({
        name: req.name,
        quan: req.quan,
        prio: req.prio
    });
    console.log(req.name)
    console.log(req.quan)

    console.log(user)
    // Save a Customer in the MongoDB
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

// Fetch all Users
exports.findAll = (res, search) => {
    var res = res;
    User.find(search, function (err, items) {
        if (err) {
            res.json(err);
        } else {
            res.json({ results: items });
        }
    });

    exports.delete = (req, res) => {
        User.findByIdAndRemove({ _id: req.params.id }, (err, doc) => {
            if (!err) {
                console.log('deleted..')
            } else {
                console.log('Success')
            }
        });
    }
    // exports.update = (req, res) => {
    //     const user = new User({
    //         name: req.name,
    //         quan: req.quan,
    //         prio: req.prio
    //     });
    //     console.log(user)
    //     // Save a Customer in the MongoDB
    //     User.findByIdAndRemove({ _id: req.params.id }, (err, doc) => {
    //         if (!err) {
    //             console.log('deleted..')
    //         } else {
    //             console.log('Success')
    //         }
    //     });
    //     user.save()
    // }
    exports.update = (req, res, id) => {
        // Validate Request
        // if(!req.body.content) {
        //     return res.status(400).send({
        //         message: "Note content can not be empty"
        //     });
        // }

        // Find note and update it with the request body
        User.findByIdAndUpdate(id, {
            name: req.body.name,
            quan: req.body.quan,
            prio: req.body.prio
        }, { new: true })
            .then(items => {
                if (!items) {
                    return res.status(404).send({
                        message: "Note not found with id " + id
                    });
                }
                res.send(items);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Note not found with id " + id
                    });
                }
                return res.status(500).send({
                    message: "Error updating note with id " + id
                });
            });
    };
};