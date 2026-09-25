async function init(){
    let element=document.querySelector(".flex");
    element.innerHTML="";
    
    let gene=document.getElementById("gen").value;
    let num1, num2;

    switch (parseInt(gene)) {
        case 1:
            num1=1;
            num2=152;
            break;
        case 2:
            num1=152;
            num2=252;
            break;
        case 3:
            num1=252;
            num2=387;
            break;
        case 4:
            num1=387;
            num2=494;
            break;
        case 5:
            num1=494;
            num2=650;
            break;
        case 6:
            num1=650;
            num2=722;
            break;
        case 7:
            num1=722;
            num2=810;
            break;
        case 8:
            num1=810;
            num2=906;
            break;
        case 9:
            num1=906;
            num2=1026;
            break;
        default:
            num1=1;
            num2=1026;
            break;
    }

    for(let i=num1;i<num2;i++){
        await fetchData(i);
    }
}

async function fetchData(id) {
    try {
        const res = await fetch ('https://pokeapi.co/api/v2/pokemon/'+id);
        const data = await res.json();
        pintarCard(data)

    } catch (error) {
        console.log(error)
    }
}

function pintarCard(poke){
    const flex = document.querySelector('.flex')
    const template = document.querySelector('#template-card').content
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()

    clone.querySelector('.card-body-img').setAttribute('src', poke.sprites.front_shiny)

    clone.querySelector('.card-body-title').innerHTML = `${poke.name} <span>${poke.id}</span>`

    let type="";

    if(poke.types.length == 1){
        type=poke.types[0].type.name;
    } else {
        type=poke.types[0].type.name+"/"+poke.types[1].type.name;
    }
    clone.querySelector('.card-body-text').textContent = type;

    let x;
    for(let i=0; i<6; i++){
        x='.stat'+i;
        clone.querySelector(x).textContent = poke.stats[i].base_stat;
    }

    fragment.appendChild(clone)
    flex.appendChild(fragment)
}