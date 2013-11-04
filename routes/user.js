var Person = require('./schema.js').Person


var redis = require('redis')
var store = redis.createClient();


// /users
exports.list = function (req, res) {
    Person.find(function (err, rows) {
        res.json(rows);
    });
};

// /users/:id
exports.getone = function (req, res) {

    console.log('Get One');
    Person.find({id: req.params.id}, function (err, rows) {
        console.log(rows, rows[0]);
        if (rows.length > 0) {
            res.json(rows[0])
        }
        else res.json({});
    })
};

// /users
exports.insert = function (req, res) {
    var newid = 0;
    console.log('insert');
    store.get('inc', function (err, data) {
        console.log('get redis', err, JSON.parse(data));

        newid = JSON.parse(data).id;
        console.log(req.body);
        new Person({
            id: newid,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age
        }).save(function (err) {
                console.log("save rest: ", arguments);
                if (err) {
                    res.status(500);
                    res.json({error: err});
                }
                else {
                    res.status(200);
                    res.json({insert: true});
                    store.set('inc', JSON.stringify({id: ++newid}), redis.print);
                }
            });
    })
}
// /users/:id
exports.update = function (req, res) {

    Person.update({id: req.params.id}, {
        $set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age
        }
    }, function (err, affected_rows, result) {
        console.log("update item: ", arguments);
        res.json({affected_rows: affected_rows})
    })

};

// /users/:id
exports.remove = function (req, res) {
    Person.remove({id: req.params.id}, function (err, affrows) {
        console.log("Remove!:", arguments);
        res.json({affected_rows: affrows})
    })

};