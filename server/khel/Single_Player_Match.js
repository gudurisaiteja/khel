var knex = require('./Postgres_player.js').knex;

function MatchTeams()
{
  knex.select('game_id').from('game_details')
  .then((data)=>{
  data.forEach(function(e) {
    Object.keys(e).forEach(function(key)
    {
      var value = e[key];
      console.log(value);
      
      knex('interest_details')
      .where({game_id:value,interested_in_singles:true}).select('player_id')
      .then((data=>{
        console.log(data);
        var c = data.length;
        console.log("c", c);
        if(c!=0)
        {
          console.log("true")
          knex('match_details').insert({category_id:11})

        }
        //Object.keys(files).length
      //  Object.keys(data).then((c)=>
      //  {
      //  c = count(data);
      //  console.log(c);
      // })
    //forEach(function(key)
    // {
    //   var value = data[key];
    //   console.log("data",data)
    // })
      }))


       knex('interest_details')
      .where({game_id:value,interested_in_doubles:true}).select('player_id')
      .then((data=>{
        console.log(data);
      }))

       knex('interest_details')
      .where({game_id:value,interested_in_mixeddoubles:true}).select('player_id')
      .then((data=>{
        console.log(data);
      }))
    })
});
  })      
}
MatchTeams()