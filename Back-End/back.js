const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const products = [
    {'id': '1', 'name':'a'}, 
    {'id': '2','name':'b'},
    {'id': '3','name':'c'},
    {'id': '4','name':'d'},
    {'id': '5','name':'e'},
    {'id': '6','name':'f'},
    {'id': '7','name':'g'},
    {'id': '8','name':'h'},
    {'id': '9','name':'i'},
    {'id': '10','name': 'j'}
    ];
maxID = 1;
for (let index = 0; index < products.length-1; index++) {
    maxID = Math.max(products[index].id,products[index+1].id);
}

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
    maxID ++;
    products.push({'id': maxID.toString(),'name': req.params.name});
    res.send(products[products.length-1]);
})

app.put('/product/:id', (req, res) =>{
    products.forEach((product, index) =>{
        if(product.id === req.params.id){
            products[index] = req.body;
            res.send(req.body);
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


app.listen(8080);