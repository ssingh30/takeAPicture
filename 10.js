const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.static('public'));
app.listen(5568);
app.use(bodyParser.json({limit: '500mb'}));
app.post('/pic', (req, res)=>{
  let randomNum = Math.floor((Math.random()*10)+1);
  let picData = req.body.canvas;
  fs.writeFile(`${__dirname}/public/images/picture${randomNum}.png`, picData, 'base64', ()=>{});
  res.send('You took a picture');
});
app.get('/pic', (req, res)=>{
  const allPics =(err, files)=>{
    const eachPic = files.reduce((acc, pic)=>{
      acc.push(`<img src="/images/${pic}"/>`);
      return acc;
    }, []);
    res.send(eachPic);
   };
  fs.readdir(`${__dirname}/public/images`, allPics);
});
