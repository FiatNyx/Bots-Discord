const fs = require('fs') 

const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'DansTesRêves';

var messageToDelete = []
var motCensurer = ['CENSURE','censure','capitaine','Capitaine','Daeric','daeric']

function deleteMessageDuBot(){
    console.log("Deleted")
    messageToDelete[0].delete();
    messageToDelete.shift();
}


bot.on('ready', () => {
    console.log('This bot is online!');
})

bot.on('message', msg =>{
    let phrase = msg.content.split(" ")
    let contientLeMot = false;
    if(msg.member.user.username != "BotDeTest"){
        for (let x = 0; x < motCensurer.length; x++) {
            for (let y = 0; y < phrase.length; y++) {
                if (phrase[y] == motCensurer[x]){
                    contientLeMot = true
                    break
                }
            }
        } 
    }
    

    if(contientLeMot){
        contientLeMot = false
        msg.channel.send("Je ne suis qu'un pauvre bot qui suit les ordres d'un dictateur. Je suis désolé de toute cette censure");
        fs.writeFile('TextLog.txt', msg.content, (err) => { 
            if (err) throw err; 
        }) 
        msg.delete();
    }

    else if(msg.member.user.username == "Minixi1414" || msg.member.user.username == "Samgd14"){
        msg.channel.send("Je ne suis qu'un pauvre bot qui suit les ordres d'un dictateur. Je suis désolé de toute cette censure");
        console.log(msg.content)
        fs.writeFile('TextLog.txt', msg.content, (err) => { 
            if (err) throw err; 
        }) 
        msg.delete();
        
    }
    else if(msg.member.user.username == "BotDeTest"){
        messageToDelete.push(msg);
        setTimeout(deleteMessageDuBot,10000);
        
    }
    
})



bot.login(token);

