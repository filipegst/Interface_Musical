const pageBody = document.getElementById('pageBody')
const pesquisaInput = document.getElementById('pesquisaInput')
const pesquisaBtn= document.getElementById('pesquisaBtn')
const playmodal = document.getElementById('playmodal')
const btntocar = document.getElementById('tocar')

const newMagicWand = {
    idm:0,
    nome:"New Magic Wand",
    artista:"Tyler, The creator",
    album: "Igor",
    capa: "NEWMAGICWAND.jpg",
    gostei: true,
    file :'NEWMAGICWAND.mp3',
}

const kingKunta = {
    idm:1,
    nome:"King Kunta",
    artista:"Kendrick Lammar",
    album: "To pimp a butterfly",
    capa: "KingKunta.jpg",
    gostei: false,
    file : 'KingKunta.mp3',
}

const samurai = {
    idm:2,
    nome:"Samurai",
    artista:"Djavan",
    album: "Luz",
    capa: "Samurai.jpg",
    gostei: false,
    file : 'Samurai.mp3',
}

const somewhereIBelong = {
    idm:3,
    nome:"Somewhere I Belong",
    artista:"Linkin Park",
    album: "Meteora",
    capa: "SomewhereIBelong.jpeg",
    gostei: false,
    file : 'SomewhereIBelong.mp3',
}

const zero = {
    idm:4,
    nome:"Zero",
    artista:"Liniker",
    album: "Cru",
    capa: "zero.jpeg",
    gostei: false,
    file : 'zero.mp3',
}

const playlist = [
    newMagicWand,
    kingKunta, 
    samurai, 
    somewhereIBelong, 
    zero
    ]

let musicas = [...playlist]


let modalPlaylist = JSON.parse(localStorage.getItem('playlist') ??[newMagicWand,kingKunta,samurai,])

function carregaPlaylist() {
    
    pageBody.innerHTML = ''
    for(let index = 0; index < musicas.length ; index++){
        pageBody.innerHTML +=
        `
        <div class="card d-flex flex-column" style="width: 18rem; height: 30rem;">
        <img src="imagens/capas/${musicas[index].capa}" class="card-img-top" alt="Capa do disco">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${musicas[index].nome}</h5>
          <p class="card-text"> ${musicas[index].album}</p>
          <p class="card-text">${musicas[index].artista}</p>
          <button class="btn btn-outline-success" onclick='adicionaMusica(${musicas[index].idm})'>
            <i class="bi bi-plus-circle"></i>
            </button>
          </div>
          </div>
      `
      
    }
}

function pesquisar() {
    if (pesquisaInput.value.trim() === '') return;

    musicas = musicas.filter((musica) => 
        musica.nome.toLowerCase().includes(pesquisaInput.value.toLowerCase()) ||
    musica.album.toLowerCase().includes(pesquisaInput.value.toLowerCase()) ||
    musica.artista.toLowerCase().includes(pesquisaInput.value.toLowerCase())

    );

    carregaPlaylist();
}

function resetarFiltro(){
    if (pesquisaInput.value !=='') return;
    musicas = [...playlist];
    carregaPlaylist()
}


function carregamodal(){
    playmodal.innerHTML =""
    for (let index = 0; index < modalPlaylist.length ; index++ ){
        playmodal.innerHTML += 
        `<div id=${modalPlaylist[index].idm } class="modal-body d-flex justify-content-between border p-2">
                <p  class="pmodal"> ${modalPlaylist[index].nome} - ${modalPlaylist[index].artista} </p>
              <button type="button" class="btn btn-outline-danger" onclick= "removeMusica('${modalPlaylist[index].idm}')"><i class="bi bi-trash-fill"></i></button> 
              </div>`
        carregaPlaylist()
    }
}

function removeMusica(id) {
    id = Number(id); 
    modalPlaylist = modalPlaylist.filter((musica) => musica.idm !== id);
    const element = document.getElementById(id);
    if (element) element.remove()
    updateLocalStorage();
}

function adicionaMusica(id) {
    if (modalPlaylist.find((musica) => musica.idm === id)) return;
    const musicaAdicionada = musicas.find((musica) => musica.idm === id);
    modalPlaylist.push(musicaAdicionada)
    

    playmodal.innerHTML += 
        `<div id=${musicaAdicionada.idm} class="modal-body d-flex justify-content-between border p-2">
            <p class="pmodal">${musicaAdicionada.nome} - ${musicaAdicionada.artista}</p>
            <button type="button" class="btn btn-outline-danger" onclick="removeMusica(${musicaAdicionada.idm})">
                <i class="bi bi-trash-fill"></i>
            </button>
        </div>`;
        updateLocalStorage();
}

function tocarMusica(){
    location.href ='/player/';
}


function updateLocalStorage(){
    localStorage.setItem('playlist', JSON.stringify(modalPlaylist))
}

pesquisaBtn.addEventListener('click', pesquisar);
pesquisaInput.addEventListener('input', resetarFiltro);
btntocar.addEventListener('click', tocarMusica);
carregaPlaylist();
carregamodal();

