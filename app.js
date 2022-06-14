var staffnick = document.getElementById("staffnick").value;


const serversGetter = async() => {
    const req = await fetch("http://82.208.17.64:31364/user/" + staffnick);
    const data = await req.json();

    return await data;
}

function formdata() 
{

}

function closeAlert() {
    document.getElementsByClassName("alert")[0].remove();
}

async function render() {
    const req = await fetch("http://82.208.17.64:31364/user/" + staffnick);

    const data = await req.json();

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
    
    
    

    document.getElementsByClassName("alert")[0].innerHTML = `<div style="display: flex; gap: 8px;">
            <div><i class="fa-solid fa-circle-info" fa-2xl></i> </div>
            <div>
             Nick: ${nick} <br> 
             Rank: ${rank} <br> 
             Bio: ${bio} <br> 
             E-mail: ${email} <br> 
             Discord: ${discord} <br> 
             Styl: ${style} <br> 
             Hide: ${hide} <br> 
             Prazdniny: ${holiday} dní <br>
             
            </div>
            <div style="flex-grow: 1; text-align: right;"><i class="fas fa-xmark" onclick="closeAlert();" style="cursor: pointer;"></i></div>
        </div>`;
}
render();