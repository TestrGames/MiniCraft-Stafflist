async function nickGetter(nick) {
    const req = await fetch("http://82.208.17.64:31364/user/get/" + nick);
    const data = await req.json();

    return data;
}

document.querySelector("#ATNickForm>#ATNickSubmit").addEventListener("click", async(event) => {
    event.preventDefault();
    const nick = document.getElementById("staffnick").value;
    if(!nick) return;
    render(nick);
});

function closeAlert() {
    document.getElementsByClassName("alert")[0].remove();
}

async function render(target) {
    const data = await nickGetter(target);

    let nick =  data["name"];
    let rank = data["group"];
    let bio = data["bio"];
    let email = data["mail"];
    let discord = data["discord"];
    let style = data["style"];
    let hide = data["hidden"];
    let holiday = data["holiday"];
    let afktime = data["afkTime"];
    let time = data["time"];
    let lastseen = data["seen"];
    let online = data["online"];

    var naposledyonline = new Date(lastseen).toLocaleDateString("en-US")

    function format_time(s) {
        const dtFormat = new Intl.DateTimeFormat('en-GB', {
          timeStyle: 'medium',
          timeZone: 'UTC'
        });
        
        return dtFormat.format(new Date(s * 1e3));
      }
      
      var seconds = parseInt(time, 10);

      var days = Math.floor(seconds / (3600*24));
      seconds  -= days*3600*24;
      var hrs   = Math.floor(seconds / 3600);
      seconds  -= hrs*3600;
      var mnts = Math.floor(seconds / 60);
      seconds  -= mnts*60;
      
      
      

    document.getElementsByClassName("alert")[0].innerHTML = `<div style="display: flex; gap: 8px;">
            <div><i class="fa-solid fa-circle-info" fa-2xl></i> </div>
            <div style="font-size: 30px">
             Nick: ${nick} <br> 
             Rank: ${rank} <br> 
             Bio: ${bio} <br> 
             E-mail: ${email} <br> 
             Discord: ${discord} <br> 
             Styl: ${style} <br> 
             Hide: ${hide} <br> 
             Prazdniny: ${format_time(holiday)} dní <br>
             NaAFKovano: ${format_time(afktime)} hodin <br>
             Odehrano: ${(days+" dnů, "+hrs+" Hodin, "+mnts+" Minut, "+seconds+" sekund")} <br>
             Naposledy online: ${naposledyonline} <br>
             Online: ${online} <br>
             
            </div>
            <div style="flex-grow: 1; text-align: right;"><i class="fas fa-xmark" onclick="closeAlert();" style="cursor: pointer;"></i></div>
        </div>`;
}