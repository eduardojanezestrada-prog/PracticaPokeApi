function getRandomInt(min, max) {
    return Math.floor(Math.random()*(max-min))+min;
}

function init(){
    const aleatorio=getRandomInt(1,1026)
    fetchData(aleatorio)
}

async function fetchData(id) {
    try {
        const res = await fetch ('https://pokeapi.co/api/v2/pokemon/'+id)
        const data = await res.json()
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