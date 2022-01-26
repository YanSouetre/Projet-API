

document.addEventListener("DOMContentLoaded", async () => {
    await load_data();
});
async function load_data() {
    const contentElement = document.getElementById("content");
    const request = await fetch("projet/perso.php");
    const persos = await request.json();
    contentElement.innerHTML = "";
    for (const perso of persos) {
        contentElement.innerHTML += `<div id="perso-${perso.id}" class="card" > 
                                        ${perso.name} 
                                        <img id= img src="${perso.imageSrc}"> 
                                        ${perso.classe} <br> ${perso.hp} hp <br>  
                                        ${perso.atq} atq <br> 
                                        <button onclick="modif_Perso('${perso.id}')" id="modif">Modifier</button> <br> 
                                        <button onclick="supr_Perso('${perso.id}')" id="supr">Supprimer</button>
                                    </div>`;
    }
}
async function send_champion() {
    const contentElement = document.getElementById("err_mess");
    const classe = document.getElementById("class_input").value;
    const name = document.getElementById("name_input").value;
    const hp = parseInt(document.getElementById("hp_input").value);
    const atq = parseInt(document.getElementById("atq_input").value);
    if (!classe || !name || !hp|| !atq){
        contentElement.innerHTML = `<div id=err_mess style="color:#FF0000;">Vérifiez que tous les champs soient remplis !</div>`;}
    else{
    const champion = {
        "classe": classe,"name": name, "hp": hp, "atq": atq,
        "imageSrc": `/images/${classe}.jpg`
    }
    await fetch("projet/add.php", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(champion)
    });
    contentElement.innerHTML = `<div id=err_mess style="color:#83FF00;"> Votre personnage ${name} a été créé</div>`;
    } 
    await load_data();
}

async function modif_Perso(id) {
    const contentElement = document.getElementById(`perso-${id}`);
    const request = await fetch("projet/perso.php");
    const persos = await request.json();
    let champ;
    for (const perso of persos){
        if(perso.id == id){
            champ = perso;
        }
    }
    contentElement.innerHTML = `<input value="${champ.name}" type="text" id="name_change"> 
                                <img id= img src="${champ.imageSrc}"> 
                                <select id="class_change">
                                    <option value="${champ.classe}">${champ.classe}</option>
                                    <option value="Barbare">Barbare</option>
                                    <option value="Mage">Mage</option>
                                    <option value="Chasseur-de-démon">Chasseur de demon</option>
                                    <option value="Féticheur">Féticheur</option>
                                    <option value="Moine">Moine</option>
                                    <option value="Croisé">Croisé</option>
                                    <option value="Nécromancien">Nécromancien</option>
                                </select> <br> 
                                hp:<input value="${champ.hp}" type="number" id="hp_change"> <br>  
                                atq:<input value="${champ.atq}" type="number" id="atq_change"> <br> 
                                <button onclick="sauv_Perso('${champ.id}')" id="modif">Sauvegarder</button> 
                                <button onclick="load_data()" id="supr">Annuler</button>`;  
}

async function sauv_Perso(id) {  
    const classe = document.getElementById("class_change").value;
    const name = document.getElementById("name_change").value;
    const hp = parseInt(document.getElementById("hp_change").value);
    const atq = parseInt(document.getElementById("atq_change").value);
    const champion = {
        "classe": classe,"name": name, "hp": hp, "atq": atq, "id": id,
        "imageSrc": `images/${classe}.jpg`
    };
    await fetch("projet/edit.php", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(champion)
    });
    await load_data();
}



async function supr_Perso(id) {
    const champion = {"id":id};
    await fetch("projet/del.php", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(champion)
    });
    await load_data();
}