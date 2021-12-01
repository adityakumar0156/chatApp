const express = require('express');

const app = express();
app.use('/static', express.static('static'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})


app.listen(process.env.PORT || 5500, () => {
    console.log('App is listening at port 5500');
});
