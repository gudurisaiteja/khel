const dbconn=require('../user/Dbconn.js');
var knexinst=dbconn.knexinst;
var bookshelf = require('bookshelf')(knexinst);
var interest_details=bookshelf.Model.extend({
    tableName:'interest_details'

});


function insert(req,res,next)
{
    //req ody with all the attributes to insert
    toinsert=req.body;
    toinsert.Player_ID=req.params.PlayerID;
    new interest_details().save(toinsert).then((data)=>{
   
     console.log('inserted');
     
    })
    .then((data)=>{
res.send('inserted');
         
    });
    
}
