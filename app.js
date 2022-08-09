const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/', (req, res) => {
    res.json({
        message: 'Hello world'
    });
});

app.post('/login', (req, res) => {
    const user = {
        id: 123456789,
        username: 'jack846',
        email: 'jack846@gmail.com'
    };

    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json(
            {token}
        );
    });
});

app.post('/products', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Product added',
                authData
            });
        }
    });
});

function verifyToken(req, res, next) {
    const header = req.headers['authorization'];

    if( typeof header !== 'undefined') {
        let token = header.split(' ')[1];
        req.token = token;
        next();

    } else {
        res.sendStatus(403);
    }
}

app.listen(5000, () => console.log('Server on port 5000'));
