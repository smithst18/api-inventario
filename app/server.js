'use strict'
// db connection and sincronyzation models 
const { sequelize } = require('./models/index'); 

/*configuracion files*/
/*socket configuration file this allow the socket conexion*/
const { app, io} = require('./socket');
//server port 
const PORT = process.env.PORT || 3000;

//server conection 
app.listen(PORT,()=>{
    console.log(`server runing on port ${PORT}`);
    sequelize.sync({force: false})
        .then(() =>{
            console.log('db connection success');
            console.log("All models were synchronized successfully.");
        });
});
