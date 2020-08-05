const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const products = [
    {'id': '1', 
     'name':'cheese'}, 
    {'id': '2',
     'name':'tomato'},
    {'id': '3',
     'name': 'flour'}
    ];

app.get('/products', (req, res)=> {
    res.send(products);
});

app.get('/product/:id', (req, res)=>{
    for(let product of products){
        if(product.id === req.params.id){
            res.send(product);
        };
    };
});

app.post('/product', (req, res) =>{
    products.push(req.body);
    res.send(req.body);
})

app.put('/product/:id', (req, res) =>{
    products.forEach((product, index) =>{
        if(product.id === req.params.id){
            products[index] = req.body;
            res.send(product.id + ' updated to ' + req.body);
        };
    });
});

app.delete('/product/:id', (req, res) =>{
    products.forEach((product, i) =>{
        if(product.id === req.params.id){
            products.splice(i, 1);
            res.send(req.params.id + ' deleted');
        }
    })
    })


app.listen(3005);