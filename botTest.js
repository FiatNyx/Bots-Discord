const fs = require('fs') 

const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'Désolé, mais non, je ne peux pas le donner';


var messageToDelete = []
var motCensurer = ['CENSURE','censure',"Censure",'capitaine','Capitaine','Daeric','daeric',"Çensure","çensure","censurer","Censurer","çensurer","çensuré","çensurés", "Çensurer", "Çensuré"]
var samgdOK = false
var minixiOK = false
var timeToDelete = 10

function deleteMessageDuBot(){
    console.log("Deleted")
    messageToDelete[0].delete();
    messageToDelete.shift();
}


bot.on('ready', () => {
    console.log('This bot is online!');

    if(fs.readFileSync("MinixiOK.txt") == "true"){
        minixiOK = true
    }
    if(fs.readFileSync("SamgdOK.txt") == "true"){
        samgdOK = true
    }
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
        timeToDelete = 10
        let messagePrecedant = fs.readFileSync('TextLog.txt')
        fs.writeFile('TextLog.txt', messagePrecedant + msg.content + "\n", (err) => { 
            if (err) throw err; 
        }) 
        msg.delete();
    }

    else if((msg.member.user.username == "Minixi1414" && minixiOK == false) || (msg.member.user.username == "Samgd14" && samgdOK == false)){
        if (msg.content == "Le MJ n'est pas un tyran, je ne suis pas censuré" && msg.member.user.username == "Samgd14"){
            samgdOK = true;
            fs.writeFile('SamgdOK.txt', "true", (err) => {if (err) throw err; }) 
            msg.channel.send("Félicitions! Vous pouvez parler")
            timeToDelete = 5
        }
        else if(msg.content == "Le MJ n'est pas un tyran, je ne suis pas censuré" && msg.member.user.username == "Minixi1414"){
            minixiOK = true
            fs.writeFile('MinixiOK.txt', "true", (err) => {if (err) throw err; }) 
            msg.channel.send("Félicitions! Vous pouvez parler")
            timeToDelete = 5
        }
        else{
            msg.channel.send("Je ne suis qu'un pauvre bot qui suit les ordres d'un dictateur. Je suis désolé de toute cette censure. Toutefois, si vous tapez 'Le MJ n'est pas un tyran, je ne suis pas censuré', vous pourrez parler à nouveau");
            timeToDelete = 15
            console.log(msg.content)
            let messagePrecedant = fs.readFileSync('TextLog.txt')
            fs.writeFile('TextLog.txt', messagePrecedant + msg.content, (err) => { 
                if (err) throw err; 
            }) 
            msg.delete();
        }
        
        
    }
    else if(msg.member.user.username == "BotDeTest"){
        messageToDelete.push(msg);
        setTimeout(deleteMessageDuBot,1000 * timeToDelete);
        
    }
    
})



bot.login(token);

