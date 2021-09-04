let count = 0
let index = 0
let page = 1
const containerEpisodes = document.querySelector('.background-episodes')
const getEpisodes = async page => {
  try {
    const url = `https://rickandmortyapi.com/api/episode/?page=${page}`
    const response = await fetch(url)
    const data = await response.json()
    const slicedData = data.results.slice(index, index + 10)
    renderEpisodeList(slicedData)
  } catch (error) {
    console.log(error)
  }
}

const renderEpisodeList = episodes => {
  episodes.forEach((episode, index) => {
    let listElement = document.createElement('li')
    listElement.classList.add(`episode-${episode.id}`, 'list-group-item')
    document.querySelector('.list-group').appendChild(listElement)
    listElement.innerHTML = `<button class="btn btn-primary" style="background-color:#bfdcb3">Episode ${episode.id}</button>`
    document
      .querySelector(`.episode-${episode.id}`)
      .addEventListener('click', () => {
        getSingleEpisode(episode.id)
      })
  })
}
const getSingleEpisode = async id => {
  containerEpisodes.classList.remove('background-episodes')
  const headerEpisode = document.querySelector('.header-episode')
  const url = `https://rickandmortyapi.com/api/episode/${id}`
  const response = await fetch(url)
  const data = await response.json()
  const headerContent = `
        <h1>Episode ${data.id} | ${data.name}</h1>
        <p>${data.air_date} | ${data.episode}</p>
    `
  headerEpisode.innerHTML = headerContent
  console.log(data.characters.length)
  data.characters.forEach((character, index) => {
    getCharacter(character)
  })
}

const getCharacter = async url => {
  const contentEpisode = document.querySelector('.content-episode')
  contentEpisode.innerHTML = ''
  const response = await fetch(url)
  const data = await response.json()

  const episodeCard = `
    <div>
        <div class="card row">
        <img class="card-img-top .card-deck rounded-pill  " src=${data.image} alt="Card image cap">
            <div class="card-body ">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">${data.species} | ${data.status}</p>
            </div>
        </div>
     </div>
     `
  contentEpisode.innerHTML += episodeCard
}

const getMoreEpisodes = () => {
  const btnEpisodes = document.getElementById('btn-episodes')
  btnEpisodes.addEventListener('click', () => {
    count += 1
    if (count == 3) {
      index = 10
      page = 2
      getEpisodes(page)
    } else if (count == 1) {
      index = 10
      getEpisodes(page)
    } else if (count == 2) {
      index = 0
      page = 2
      getEpisodes(page)
    }

    console.log(count)
  })
}

window.onload = () => {
  getEpisodes(page)

  getMoreEpisodes()
}

/*let page  = 1; 
let halfShow = false 
let episodesCount = 0

// fetch resources 

const fetchAllEpisodes = async (pageNum) => {
    try {
        const url = `https://rickandmortyapi.com/api/episode/?page=${pageNum}`
        const res = await fetch(url)
        const jsonRes = await res.json()
        return jsonRes.result;
    }catch(error) {
        console.log(error)
    }
}

const fetchSingleContent = async url => {
    try {
        const res = await fetch(url)
        const jsonRes = await res.json()
        return jsonRes;
    } catch (error) {
        console.log(error);
    }
}

//renders and DOM manipulation 

const clearContent = () => {
    document.querySelector(".characters").innerHTML = document.querySelector(".characters")  && "";
    document.querySelector(".loc-characters").innerHTML = document.querySelector("loc-.characters")  && "";
    document.querySelector(".episodes").innerHTML = document.querySelector(".episodes") && "";

}

const changeView = (targetViewClass) => {
    switch (targetViewClass) {
        case "char":
        document.querySelector(".ep-content").style.display = "none";
        document.querySelector(".loc-content").style.display = "none";
        document.querySelector(".char-content").style.display = "block";
        break;
        case "loc":
        document.querySelector(".ep-content").style.display = "none";
        document.querySelector(".loc-content").style.display = "block";
        document.querySelector(".char-content").style.display = "none";
        break;
        default:
        document.querySelector(".ep-content").style.display = "block";
        document.querySelector(".loc-content").style.display = "none";
        document.querySelector(".char-content").style.display = "none";
        
    }
}

const renderEpisodes = episodes => {
    episodes.forEach((episodeLink) => {
        let episodeNumber = episodeLink.slice(-2);
        episodeNumber = episodeNumber[0] === "/" ? episodeNumber.slice(1) : episodeNumber;
        let listEl = document.createElement("div");
        listEl.classList.add(`char-episode-${episodeNumber}`, "col" , "mb-2");
        listEl.innerHTML = `<button class="btn btn-link">episode-${episodeNumber}</button>`;
        document.querySelector(".episodes").appendChild(listEl);
        document.querySelector(`.char-episode-${episodeNumber}`).onclick = async () => {
            clearContent()
            changeView("ep")
            let episode = await fetchSingleContent(episodeLink);
            renderEpisodeContent(episode)
            document.querySelector(`.episode-${episodeNumber}`).classList-add("active");
        }
    });
}

const renderCharacters = (characters, isFromLoc) => {
    characters.forEach( async (character, i)=> {
    let characterData = await fetchSingleContent(character);
    let characterElement = document.createElement("div");
    characterElement.classList.add(`character-${characterData.id}`, "col" , "mb-4");
    isFromLoc 
    document.querySelector(".loc-characters").appendChild(characterElement);
     :document.querySelector(".characters").appendChild(characterElement);
     characterElement.innerHTML = cardElement;
     document.querySelector(`.character-${characterData.id}.card-img-top`).src = characterData.image;
     document.querySelector(`.character-${characterData.id}.card-img-top`).alt = characterData.name;
     document.querySelector(`.character-${characterData.id}.card-title`).innerHTML = characterData.name;
     document.querySelector(`.character-${characterData.id}`).onclick = () => {
         clearContent()
         changeView("char")
         document.querySelector(".active") && document.querySelector()
    

const renderEpisodeContent = episode => {
    document.querySelector(".ep-title").innerHTML = episode.name;
    document.querySelector(".ep-info").innerHTML = `${episode.air.date_date} | ${episode.episode}`
    renderCharacters(episodes.characters)
}

const renderEpisodeNavList = episode => {
    episodes.forEach((episode, i) => {
        let listElement = document.createElement("li")
        listElement.classList.add(`episode-${episode.id}`, "list-group-item")
        i === 0 && page === 1 && !halfShow && listElement.classList.add("active")
        document.querySelector(".ep-nav")
        document.querySelector(".ep-nav").appendChild(listElement)
        listElement.innerHTML = `<button class="btn btn-primary">episode-${episode.id}</button>`;
        document.querySelector(`.episode-${episode.id}`).onclick = () => {
            clearContent() // crear funcion 
            chengeView("ep")
            renderEpisodeContent(episode)
            document.querySelector(".active") && document.querySelector(".active").classList.remove("active");
            listElement.classList.add("active")
    }  
    });
}


 const loadEpisodes = () => {
     fetchEpisodes(page)
     .then( (result) => { 

        result = halfShow
        //? result.slice(10, result.length)
        : result.slice(0,10);
        renderEpisodeNavList(result);

        page===1 && !halfShow && renderEpisodeContent(result[0]);
        halfShow && page++;
        halfShow = !halfShow;
        espisodesCount = episodesCount + result.length
        document.querySelector("#load-more").style.display = episodesCount === 41 ? "none" : "block"
     })   
 }

 fetchAllEpisodes(page);

 window.onload = () => {
     document.querySelector("#load-more").addEventListener("click", () =>  {
     fetchAllEpisodes(page)
     })
    }*/
