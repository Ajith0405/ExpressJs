const express = require('express');
const router = express.Router();
const path = require('path');


router.get('^/$|/index(.html)?', (req, res)=>{
    res.sendFile(path.join(__dirname,'..','views','index.html'));
});

router.get('/new-page(.html)?', (req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','new-page.html'));
})

router.get('/old-page(.html)?', (req,res)=>{
    res.redirect(301,'new-page.html');
})

// route handle with using next
router.get('/hello(.html)?', (req, res, next)=>{
    console.log('Hello.html page load..');
    next()
}, (req, res)=>{
    res.send('Hi hello..')
})

// Chaining route or middleware
const one = (req, res, next)=>{
    console.log('one');
    next();
}
const two = (req, res, next)=>{
    console.log('two');
    next();
}
const three = (req, res)=>{
    console.log("Three");
    res.send('Finished..');
}

router.get('/chain(.html)?', [one, two, three]);

module.exports = router