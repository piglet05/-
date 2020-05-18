//아래 코드에 성적인 단어가 포함됐을 수 있습니다.

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Logged in : ${client.user.tag}!');
});


var up_down = 0;    //업다운에 사용되는 변수들...
var num = 0;

client.on('message', msg => { 
    var message = msg.content;
    var senderId = msg.author.id;
    var senderName = msg.author.username;

    if (message === '*안녕' || message === 'ㅎㅇ' || message === '*ㅎㅇ') {
        if(senderId === '403075516292268032') msg.reply("안녕하세요 주인님");
        else msg.channel.send('안녕하세요');
    }

    else if (message === '*주사위'){
        const sum = Math.floor(Math.random() * 5) + 1;
        if(sum === 1 || sum === 3 || sum === 6){
            msg.reply(sum+"이 나왔어요");
        } else {
            msg.reply(sum+"가 나왔어요");
        }
    }

    else if (message === '섹스' || message === '섹쓰' || message === '쎅스' || message === "쎅쓰" || message === "*사랑해") {
        msg.react('😣');
    }

    else if (message === '*업다운 방법') {
        msg.reply("업다운 방법 :")
        msg.channel.send("1. '*업다운'이라고 메시지를 보내주세요\n\n 2. 최솟값과 최댓값을 다음과 같이 보낸 뒤, : *10-1000\n\n2. 당신이 생각하는 수를 메시지로 보내시면 됩니다! : *100\n");
    }

    else if (message === '*업다운') {
        up_down = 1;
        msg.reply("최솟값, 최댓값 입력, '*업다운 방법'라고 보내주시고 제 메시지를 참조해주세요. : ")
    }

    else if (message.substring(0, 1) === '*' && up_down === 1){
        message = message.replace('*','');
        minmax = message.split('-');
        minmax[0] = parseInt(minmax[0]);
        minmax[1] = parseInt(minmax[1]);
        if(isNaN(minmax[0]) === false && isNaN(minmax[1]) === false && minmax[0] != minmax[1]){
           msg.reply(minmax[0]+"이 최솟값이고, "+minmax[1]+"이 최댓값입니다. 수를 맞춰주세요");
           up_down = 2;
           const makeRandom = minmax[1] - minmax[0];
           num = Math.floor(Math.random() * makeRandom) + minmax[0];
        }
    }
    else if(message.substring(0, 1) === '*' && up_down === 2){
        message = parseInt(message.replace('*',''));
        if(isNaN(message) === false){
            if(message < num){
                msg.reply('up');
            }
            else if(message > num){
                msg.reply('down');
            }
            else{ 
                msg.reply('맞췄어요!');
                num = 0;
                up_down = 0;
            }
        }
    }
    else if(message === "*내 아바타"){
        msg.reply(msg.author.displayAvatarURL());
    }
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    if (!channel) return;
    channel.send('서버에 오신 것을 환영합니다, ${member}님');
  });
  
const config = require('./config.json');
client.login(config.token);

