const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {loggers} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// log activity  middleware

app.use(loggers);

// cors middleware

    // made access to some site only 
    const whiteList = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
    const corsOptions ={
        origin:(origin, callback)=>{
            if(whiteList.indexOf(origin) !== -1 || !origin){
                callback(null, true);
            }else {
                callback(new Error("Not allowed by CORS"));
            }
        }
    }

app.use(cors(corsOptions));

// inbuild middlewares

    // handle data submitted via HTML forms
    app.use(express.urlencoded({extended:false}));

    // handle all incoming requests with json
    app.use(express.json())

    // handle to serve static files 
        // for root 
        app.use('/',express.static(path.join(__dirname, './public')));
        // for subdir
        app.use('/subdir',express.static(path.join(__dirname, './public')));
    

// root - router middleware
    app.use('/', require('./routes/root'));

// subdir - router middleware
    app.use('/subdir', require('./routes/subdir'));

// api - router middleware
    app.use('/employees', require('./routes/api/employees'))

app.get('/add', (req, res)=>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const sum = a+b;
    res.json({sum});

})

// handle unkown request put this always last.. 

    // for only get request
    // app.get('/*', (req,res)=>{
    //     res.status(404).sendFile(path.join(__dirname,'views','404.html'));
    // });

    // for all type of http request 
    app.all('*', (req, res)=>{
        res.status(404);
        if(req.accepts('html')){
            res.sendFile(path.join(__dirname,'views', '404.html'));
        }else if(req.accepts('json')){
            res.json({"error": "404 Not Found"});
        }else{
            res.type('txt').send("404 Not Found");
        }
    })

// errorHandle Middle ware
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});

