


const express = require("express");
const app = express();

global.port = process.env.PORT ||  3000

app.use(express.static(path.join(__dirname, 'public')));
app.set("json spaces", 2);
const mongoose = require('mongoose');
let {UsersDb} = require("./lib");

//const { error } = require("console");


const MONGODB_URI = process.env.MONGODB_URI ||   'mongodb://uwrr2obvrb4kbwnrvimy:rbgieh8nfk7EylXCh2D@byg4ii8uzy5rro8bcdfu-mongodb.services.clever-cloud.com:2008/byg4ii8uzy5rro8bcdfu';
//mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const connnectMongo = () => {
  try {
    mongoose.set('strictQuery', true);
    mongoose.connect(MONGODB_URI);
    console.log("🌍 Connected to the Mongodb.");
    return true;
  } catch (error) {
    console.log('Could not connect with Mongodb.',error);
    return false;
  }
}

global.mongodb = connnectMongo();


app.get('/bot/addUser', async (req, res) => {
  try {
    if(!mongodb)  return res.json({ success: false,  error: 'DATABASE NOT INITIALIZED!.'}); 
    req.body = req.query || {};

    let id = req.body.id || req.body.bot || process.env.BOt || "Suhail-Md";
    let number = req.body.number || req.body.user || req.body.userId ||req.body.jid || "";
   // let last_online = req.body.online || req.body.time || "";

    if (!number) {
      return res.json({
        success: false,
        error: !number ? 'Missing number parameters for user' : 'Missing time parameters for user last online'
      });
    }

  //  var isNew = false;
    let user = await UsersDb.findOne({ id }) || new UsersDb({ id }).save(); 
    if (!user) {      
       user = new UsersDb({ id }).save(); 
     // isNew = true
    }
    user.users = user.users || {};
    user.users[number] = { online: new Date() };
    /*isNew ?  user.save(): */
    await UsersDb.updateOne({id:id},{ users: user.users,lastUpdate:new Date() })
    return res.json({ success: true,status:true, message: 'User data stored/updated successfully' });
  } catch (error) {
    console.error(error);
    return res.json({ success: false,status:false, error: error.message || 'Internal Server Error' });
  }
});




app.listen(port, () => {
    console.log(`port http://127.0.0.1:${port}`);
  });