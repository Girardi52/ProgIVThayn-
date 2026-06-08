
const API_URL = "https://pokeapi.co/api/v2/pokemon";


const pokemonGrid = document.getElementById("pokemonGrid");
const loader = document.getElementById("loader");

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const typeFilter = document.getElementById("typeFilter");



let pokemons = [];

let filteredPokemons = [];




/*
==============================
        INICIALIZAÇÃO
==============================
*/


async function init(){

    showLoading(true);


    try{

        pokemons = await fetchPokemons();


        filteredPokemons = pokemons;


        renderPokemons(filteredPokemons);


    }

    catch(error){

        showError(
            "Não foi possível carregar os Pokémon."
        );

    }


    finally{

        showLoading(false);

    }

}




/*
==============================
        BUSCAR POKEMONS
==============================
*/


async function fetchPokemons(){


    const response = await fetch(
        `${API_URL}?limit=60`
    );


    if(!response.ok){

        throw new Error(
            "Erro na API"
        );

    }



    const data = await response.json();



    const details =
    await Promise.all(

        data.results.map(
            pokemon =>
            fetchPokemonDetails(
                pokemon.url
            )
        )

    );



    return details;

}





async function fetchPokemonDetails(url){


    const response =
    await fetch(url);



    return await response.json();

}




/*
==============================
        RENDERIZAÇÃO
==============================
*/


function renderPokemons(list){


    pokemonGrid.innerHTML = "";



    if(list.length === 0){

        pokemonGrid.innerHTML = `

        <p style="
        color:white;
        text-align:center;
        grid-column:1/-1;
        font-weight:bold">

        Nenhum Pokémon encontrado 😢

        </p>

        `;

        return;

    }




    list.forEach(
        pokemon => {


            const card =
            document.createElement(
                "article"
            );


            card.className="card";



            const image =
            pokemon.sprites
            ?.other
            ?.["official-artwork"]
            ?.front_default
            ||
            pokemon.sprites.front_default;



            const types =
            pokemon.types
            .map(
                item => `

                <span 
                class="type-badge"
                style="
                background:var(--${item.type.name})
                ">

                ${item.type.name}

                </span>

                `
            )
            .join("");




            card.innerHTML = `


            <span class="id">

            #${String(pokemon.id).padStart(3,"0")}

            </span>



            <img 
            src="${image}"
            alt="${pokemon.name}"
            >



            <h3>

            ${pokemon.name}

            </h3>



            <div class="types-container">

            ${types}

            </div>


            `;



            pokemonGrid.appendChild(card);



        }
    );


}






/*
==============================
        PESQUISA
==============================
*/


async function searchPokemon(){


    const value =
    searchInput.value
    .toLowerCase()
    .trim();



    if(!value){

        renderPokemons(
            filteredPokemons
        );

        return;

    }



    showLoading(true);



    try{


        const response =
        await fetch(
            `${API_URL}/${value}`
        );



        if(!response.ok){

            throw new Error();

        }



        const pokemon =
        await response.json();



        renderPokemons(
            [pokemon]
        );



    }


    catch{


        showError(
            "Pokémon não encontrado!"
        );


    }


    finally{

        showLoading(false);

    }



}




/*
==============================
        FILTRO POR TIPO
==============================
*/


function filterByType(){


    const type =
    typeFilter.value;



    if(!type){


        filteredPokemons =
        pokemons;


    }

    else{


        filteredPokemons =
        pokemons.filter(
            pokemon =>

            pokemon.types.some(
                item =>
                item.type.name === type
            )

        );


    }



    renderPokemons(
        filteredPokemons
    );


}







/*
==============================
        UTILIDADES
==============================
*/


function showLoading(state){


    loader.style.display =
    state
    ?
    "block"
    :
    "none";


}




function showError(message){


    pokemonGrid.innerHTML = `


    <p style="
    color:white;
    text-align:center;
    grid-column:1/-1;
    font-weight:bold">

    ${message}

    </p>


    `;


}




/*
==============================
        EVENTOS
==============================
*/


searchButton.addEventListener(
    "click",
    searchPokemon
);



searchInput.addEventListener(
    "keypress",
    event => {

        if(event.key === "Enter"){

            searchPokemon();

        }

    }
);



typeFilter.addEventListener(
    "change",
    filterByType
);





/*
==============================
        START
==============================
*/


init();
