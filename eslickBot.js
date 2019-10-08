console.log('It is starting');
var Twit = require('twit');
var message = require('./responses/messages.js');
var insults = require ('./responses/insults.js');

require('dotenv').config();

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});




  

var stream = T.stream('statuses/filter', { track: '@BotEslick' });

stream.on('tweet', tweetEvent);


function tweetEvent(tweet) {
    console.log('About to reply...')
    var name = tweet.user.screen_name;
    var nameID  = tweet.id_str;
    var insult = insults[Math.floor(Math.random()*insults.length)];
    var reply = "You mentioned me! @" + name + ' - ' + insult;
    var params             = {
                              status: reply,
                              in_reply_to_status_id: nameID
                             };

    T.post('statuses/update', params, function(err, _data, _response) {
      if (err !== undefined) {
        console.log(err);
      } else {
        console.log('Tweeted: ' + params.status);
      }
    })
};




function tweetIt() { // Function to send tweets
  console.log('Starting...');
  var randomItem = message[Math.floor(Math.random()*message.length)];
  var txt = randomItem;
  var params             = {
                      status: txt,
      
      };
      console.log('About to post...');
    T.post('statuses/update', params, function(err, _data, _response) {
    if (err !== undefined) {
    console.log(err);
    } else {
    console.log('Tweeted: ' + params.status);
    }
    })
};

tweetIt();
setInterval(tweetIt, 1000*60*60)
