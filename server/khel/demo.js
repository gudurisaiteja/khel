var knex = require('./Postgres_player.js').knex;
var _ = require('lodash');
function Load_Data_From_Database() {
  return knex.from('interest_details')
  .innerJoin('player_details','interest_details.player_id','player_details.player_id')
    .select('player_details.player_id','game_id','group_id')
    .then(function(data)
    {

        console.log(_.groupBy(data,'group_id','game_id'))
    //     console.log(data);
    //     console.log(_.groupBy(data,function()
    //     {
    //         return knex('player_details')
    //         .select('group_id')
    //         .where('game_id' == 1)
    //     } ))
       // console.log(filter(data));

      
});
}

Load_Data_From_Database();

function filter(player)
{
    var Group = 3;
    let Game = 2
    console.log(_.filter(player,
    function(p){
        return ((p.group_id == Group)
         &&(p.game_id == Game) )}))
    return 1
    
}