var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var mongoose   = require('mongoose');
//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://testas:testas@ds157964.mlab.com:57964/testas', { useMongoClient: true });


var Product  = require('./models/product');
var User = require('./models/user');
var Order = require('./models/order');

//// ROUTES
var router = express.Router();

router.use(function(req, res, next) {
    // do logging
    console.log('Kazkas vyksta');
    next();
});


router.get('/', function(req, res) {
    res.json({ message: 'Sveiki atvyke' });
});

///

router.route('/products')


    .post(function(req, res) {

        var product = new Product();
        product.title = req.body.title;
        product.type = req.body.type;
        product.url = req.body.url;
        product.quantity = req.body.quantity;
        product.price = req.body.price;

        product.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Produktas sukurtas' });
        });
      })
    .get(function(req, res) {
         Product.find(function(err, products) {
             if (err)
                 res.send(err);

             res.json(products);
         });
  });

  router.route('/products/:product_id')


    .get(function(req, res) {
        Product.findById(req.params.product_id, function(err, product) {
            if (err)
                res.send(err);
            res.json(product);
        });
    })

    .put(function(req, res) {


        Product.findById(req.params.product_id, function(err, product) {

            if (err)
                res.send(err);

                product.title = req.body.title;
                product.type = req.body.type;
                product.url = req.body.url;
                product.quantity = req.body.quantity;
                product.price = req.body.price;

            // save the bear
            product.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Produktas atnaujintas' });
            });

        });
    })

    .delete(function(req, res) {
        Product.remove({
            _id: req.params.product_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Produktas istrintas' });
        });
    });


    router.route('/users')


        .post(function(req, res) {

            var user = new User();
            user.firstName  = req.body.firstName;
            user.lastName = req.body.lastName;
            user.money = req.body.money;

            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Vartotojas sukurtas' });
            });
          })
        .get(function(req, res) {
             User.find(function(err, user) {
                 if (err)
                     res.send(err);

                 res.json(user);
             });
      });

      router.route('/users/:user_id')


        .get(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {
                if (err)
                    res.send(err);
                res.json(user);
            });
        })

        .put(function(req, res) {


            User.findById(req.params.user_id, function(err, user) {

                if (err)
                    res.send(err);

                    user.firstName = req.body.firstName;
                    user.lastName = req.body.lastName;
                    user.money = req.body.money;

                // save the bear
                user.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Vartotojas atnaujintas' });
                });

            });
        })

        .delete(function(req, res) {
            User.remove({
                _id: req.params.user_id
            }, function(err, bear) {
                if (err)
                    res.send(err);

                res.json({ message: 'Vartotojas istrintas' });
            });
        });


        router.route('/orders')


            .post(function(req, res) {

                var order = new Order();

                User.findById(req.body.user, function(err, user) {
                  if (err)
                      res.send(err);
                  Product.findById(req.body.product, function(err, product) {
                    if (err)
                        res.send(err);
                    if ((product.quantity >= req.body.quantity) && (user.money >= product.price * req.body.quantity)) {
                      order.product = req.body.product;
                      order.user = req.body.user;
                      order.quantity = req.body.quantity;
                      order.createdOn = Date();
                      user.money -= product.price * req.body.quantity;
                      product.quantity -= req.body.quantity;

                      order.save(function(err) {
                          if (err)
                              res.send(err);

                          res.json({ message: 'Uzsakymas sukurtas' });
                      });


                      product.save(function(err) {
                          if (err)
                              res.send(err);
                      });


                      user.save(function(err) {
                          if (err)
                              res.send(err);
                      });


                    }
                      })
                })



              })
            .get(function(req, res) {
                 Order.find(function(err, order) {
                     if (err)
                         res.send(err);

                     res.json(order);
                 });
          });



/////
app.use('/api', router);


////Server start
app.listen(port);
console.log('Viskas veikia ant porto ' + port);
