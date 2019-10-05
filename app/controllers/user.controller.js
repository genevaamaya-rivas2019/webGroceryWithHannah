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
};