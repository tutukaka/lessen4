const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('./'));
app.use(express.json());

app.get('/goods', (req, res) => {
    fs.readFile('./catalog.json', 'utf-8', (err, data) => {
        res.send(data);
    })
});

app.get('/cart', (req, res) => {
    fs.readFile('./basket.json', 'utf-8', (err, data) => {
        res.send(data);
    })
});

app.post('/cart', (req, res) => {
    fs.readFile('./basket.json', 'utf-8', (err, data) => {
        const parsedData = JSON.parse(data);

        if(parsedData.some((item) => +item.id === +req.id )) {
            return res.status(500);
        }
        console.log(parsedData);

        parsedData.push(req.body);
        console.log(req.body);
        fs.writeFile('./basket.json', JSON.stringify(parsedData), () => {
            req.send(req.body);
        })
    })
});

app.patch('/cart/:id', (req, res) => {
    fs.readFile('./basket.json', 'utf-8', (err, data) => {
        const parsedData = JSON.parse(data);

        if(parsedData.every((item) => +item.id !== +req.params.id)) {
            return res.status(500).send({});
        }

        const cartItemIdx = parsedData.findIndex((cartItem) => +cartItem.id === +req.params.id);
        parsedData[cartItemIdx].quantity = req.body.quantity;

        fs.writeFile('./basket.json', JSON.stringify(parsedData), () => {
            res.send(parsedData[cartItemIdx]);
        });
    });
});

app.delete('/cart/:id', (req, res) => {
    // TODO: Реализация
    fs.readFile('./basket.json', 'utf-8', (err, data) => {
        const parsedData = JSON.parse(data);

        if(parsedData.every((item) => +item.id !== +req.params.id)) {
            return res.status(500).send({});
        }

        const cartItemIdx = parsedData.findIndex((cartItem) => +cartItem.id === +req.params.id);
        parsedData.splice([cartItemIdx], 1);

        console.log(parsedData);

        fs.writeFile('./basket.json', JSON.stringify(parsedData), () => {
            res.send(parsedData[cartItemIdx]);
        });
    });
});

app.listen(3014);