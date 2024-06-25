import * as getJson  from "./collectionOfPictures.json" with {type: 'json'}

const collectionOfPictures = getJson.default


let field = collectionOfPictures[0].fields[0].picture

const crossClickAudio = new Audio("./assets/audio/cross_sound.mp3");
const activeClickAudio = new Audio("./assets/audio/active_sound.mp3");
const emptyClickAudio = new Audio("./assets/audio/empty_sound.mp3");
const controlBtnAudio = new Audio("./assets/audio/control_btn_sound.mp3");
const switchBtnAudio = new Audio("./assets/audio/switch_sound.mp3");
const winAudio = new Audio("./assets/audio/win_sound.mp3");

crossClickAudio.volume = 0.2;
activeClickAudio.volume = 0.2;
emptyClickAudio.volume = 0.2;
controlBtnAudio.volume = 0.2;
switchBtnAudio.volume = 0.2;
winAudio.volume = 0.2;


function createGameLayout(){

    // Title
    let createTittle = document.createElement("h1");
    createTittle.classList.add("title")
    createTittle.textContent = "Nonograms";

    //main game field section

    let createGameField = document.createElement("div");
    createGameField.classList.add ("game-field");

    let createGameHorField = document.createElement("div");
    createGameHorField.classList.add("game-horizontal-field");

    let rowSection = document.createElement("div");
    rowSection.classList.add("nonograms-row-cords");

    let nonogramsSection = document.createElement("div");
    nonogramsSection.classList.add("nonograms-blocks");

    createGameHorField.appendChild(rowSection);
    createGameHorField.appendChild(nonogramsSection);

    createGameField.appendChild(createGameHorField);

    //control btn-s section

    let controlPanel = document.createElement("div");
    controlPanel.classList.add("control-panel");


    let gameInfo = document.createElement("div");
    gameInfo.classList.add("game-info-block");
    gameInfo.textContent = "Time:"

    let timeSection = document.createElement("p");
    timeSection.classList.add("time");
    timeSection.textContent = "00:00";

    gameInfo.appendChild(timeSection);

    let btnsBlock = document.createElement("div");
    btnsBlock.classList.add("btn-block");

    let controlBtnGameMode = document.createElement("button");
    controlBtnGameMode.classList.add("control-btn");
    controlBtnGameMode.setAttribute("id", "gamemode");
    controlBtnGameMode.textContent = "Game Mode"

    let controlBtnPictures = document.createElement("button");
    controlBtnPictures.classList.add("control-btn");
    controlBtnPictures.setAttribute("id", "pictures");
    controlBtnPictures.textContent = "Pictures"

    let controlBtnSafe = document.createElement("button");
    controlBtnSafe.classList.add("control-btn");
    controlBtnSafe.setAttribute("id", "savegame");
    controlBtnSafe.textContent = "Save Game"

    let controlBtnCon = document.createElement("button");
    controlBtnCon.classList.add("control-btn");
    controlBtnCon.setAttribute("id", "countinue");
    controlBtnCon.textContent = "Countinue"

    let controlBtnRes = document.createElement("button");
    controlBtnRes.classList.add("control-btn");
    controlBtnRes.setAttribute("id", "results");
    controlBtnRes.textContent = "Results";

    let controlBtnRestart = document.createElement("button");
    controlBtnRestart.classList.add("control-btn");
    controlBtnRestart.setAttribute("id", "restart");
    controlBtnRestart.textContent = "Restart"

    let controlBtnRandom = document.createElement("button");
    controlBtnRandom.classList.add("control-btn");
    controlBtnRandom.setAttribute("id", "random");
    controlBtnRandom.textContent ="Random"

    let controlBtnSolution = document.createElement("button");
    controlBtnSolution.classList.add("control-btn");
    controlBtnSolution.setAttribute("id", "solution");
    controlBtnSolution.textContent = "Solution"


    btnsBlock.appendChild(controlBtnGameMode);
    btnsBlock.appendChild(controlBtnPictures);
    btnsBlock.appendChild(controlBtnSafe);
    btnsBlock.appendChild(controlBtnCon);
    btnsBlock.appendChild(controlBtnRes);
    btnsBlock.appendChild(controlBtnRestart);
    btnsBlock.appendChild(controlBtnRandom);
    btnsBlock.appendChild(controlBtnSolution);


    controlPanel.appendChild(gameInfo);
    controlPanel.appendChild(btnsBlock);

    // modal-window

    let modalWindowWrap = document.createElement("div");
    modalWindowWrap.classList.add("modal-window-wrapper");

    let modalWindow = document.createElement("div");
    modalWindow.classList.add("modal-window");
/*
    let controlBtnClose = document.createElement("button");
    controlBtnClose.classList.add("close-btn");
    controlBtnClose.textContent="X";
*/
    let changeBlock = document.createElement("div");
    changeBlock.classList.add("change-field-block");

    //modalWindow.appendChild(controlBtnClose);
    modalWindow.appendChild(changeBlock);

    modalWindowWrap.appendChild(modalWindow);

    //switchers

    let switchBlock = document.createElement("div");
    switchBlock.classList.add("switch-block");

    let createAudioSwitch = document.createElement("div");
    createAudioSwitch.classList.add("music-togle-icon");

    let themeSwitch = document.createElement("div");
    themeSwitch.classList.add("theme-togle-icon")

    switchBlock.appendChild(themeSwitch);
    switchBlock.appendChild(createAudioSwitch);
    



    // append page

    document.body.appendChild(createTittle);
    document.body.appendChild(createGameField);
    document.body.appendChild(controlPanel);
    document.body.appendChild(modalWindowWrap);
    document.body.appendChild(switchBlock)



   
}

createGameLayout()



let sizeOfGameField = 0;
let pictureId = 0;
let openSolution = false;

let emptyDefaultField = []
let seconds = 0;
let minutes = 0;
let timeStart = false;
let time;
let timeSet = document.querySelector(".time");
timeSet.textContent = '00:00';


let themePosition;

if((window.localStorage.getItem("theme")) === null){
    themePosition = 0;
    
} else {
    themePosition = ((window.localStorage.getItem("theme"))-0);

}

           
let gameFunction = function(size){
                
            let blocks = document.querySelectorAll(".block");
            let clickedBlocks = [];
            let crossedBlocks = [];

            
            

            
            if ((window.localStorage.getItem("save"))=== null || emptyDefaultField.length === 0){
                for(let k = 0; k<size; k++){
                    let arrFromZeros = []
                    for(let i = 0; i<size; i++){
                        arrFromZeros.push(0)
                    }
                    emptyDefaultField.push(arrFromZeros);
                }
            }else {
                
                emptyDefaultField = (JSON.parse(localStorage.getItem("save"))).activeGameField;
            }
           
          
         
            
    blocks.forEach((elem) =>{
        elem.addEventListener("click", function(e) {
            let showId = e.target.id;
            let divideId = showId.split("-").map(elem => elem-0);
            time_count()
          
    
    
    
            
            if (clickedBlocks.includes(showId) || elem.classList.contains("active")){
                emptyClickAudio.play()
                e.target.classList.remove("active");
                e.target.classList.remove("cross");
                emptyDefaultField[divideId[1]][divideId[0]] = 0;
                 
                let getIndexOfClickedBlocks = clickedBlocks.indexOf(showId);
                clickedBlocks.splice(getIndexOfClickedBlocks, 1);
                
                
            } else if(crossedBlocks.includes(showId)|| elem.classList.contains("cross")) {
                emptyClickAudio.play()
                e.target.classList.remove("cross");
                e.target.classList.remove("active");
                emptyDefaultField[divideId[1]][divideId[0]] = 0;
                let getIndexOfCrossedBlocks = crossedBlocks.indexOf(showId);
                crossedBlocks.splice(getIndexOfCrossedBlocks, 1);
                
            
                
            }else {
                activeClickAudio.play()
                e.target.classList.add("active")
                e.target.classList.remove("cross");
               emptyDefaultField[divideId[1]][divideId[0]] = 1;
               clickedBlocks.push(showId);
    
               
            }
            
    
    
    
       
            

    
            if(JSON.stringify(field) === JSON.stringify(emptyDefaultField)){
                createModalWindowGuts(collectionOfPictures, "win")
                modalWindow.classList.add("show");
                modalWindowWrap.classList.add("show");
            }
        },false)
    
    
        elem.addEventListener("contextmenu", function(e) {
            e.preventDefault();
             time_count()
            let showId = e.target.id;
            let divideId = showId.split("-").map(elem => elem-0);
                
    
                if (clickedBlocks.includes(showId)|| elem.classList.contains("active") ){
                    emptyClickAudio.play()
                    e.target.classList.remove("cross");
                    e.target.classList.remove("active");
                    emptyDefaultField[divideId[1]][divideId[0]] = 0;
                    let getIndexOfClickedBlocks = clickedBlocks.indexOf(showId);
                    clickedBlocks.splice(getIndexOfClickedBlocks, 1);
                 
                } else if(crossedBlocks.includes(showId)|| elem.classList.contains("cross")) {
                    emptyClickAudio.play()
                    e.target.classList.remove("cross");
                    e.target.classList.remove("active");
                    emptyDefaultField[divideId[1]][divideId[0]] = 0;
                    let getIndexOfCrossedBlocks = crossedBlocks.indexOf(showId);
                    crossedBlocks.splice(getIndexOfCrossedBlocks, 1);
                    
                
                    
                }else {
                    crossClickAudio.play()
                    e.target.classList.add("cross");
                    if(themePosition=== 0){
                        e.target.classList.add("cross");
                        
                    }else {
                        e.target.classList.add("cross");
                        e.target.classList.add("dark");
                    }
                    
                    emptyDefaultField[divideId[1]][divideId[0]] = 0;
                    
                    crossedBlocks.push(showId);
                    
    
                }

    
               if(JSON.stringify(field) === JSON.stringify(emptyDefaultField)){
                createModalWindowGuts(collectionOfPictures, "win")
                modalWindow.classList.add("show");
                modalWindowWrap.classList.add("show");
            }
            return false;
        })
        

    })
} 






function generateRowHelpCords(size){

    let horCorSection = document.querySelector(".nonograms-row-cords")
    horCorSection.innerHTML = ""
    let arrOfHorCords = []
    for(let o = 0; o<size; o++){
        let createRowBlock = document.createElement("div");
        createRowBlock.classList.add("row-cords")

        createRowBlock.setAttribute("id", `row-${o}`)
        horCorSection.appendChild(createRowBlock);
    }
    
    
    let rows = document.querySelectorAll(".row-cords");
    let countCords = 0;
    let countCordsArr = []

    for(let i = 0; i<rows.length; i++){
        let getRowIndex = (rows[i].id.split("-")[1])-0;
       
        field[getRowIndex].forEach((elem) =>{
            
            if(elem === 1 ){
                countCords += 1;
            } else if (elem === 0 && countCords !== 0){
                countCordsArr.push(countCords);
                countCords = 0;
                
            }
            
        })

        
        
       countCordsArr.push(countCords)
       arrOfHorCords.push(countCordsArr.filter(elem => elem !== 0));
    
        
    countCords = 0;
    countCordsArr = []


    let createRowCountSection = document.createElement("div");
    


    createRowCountSection.textContent = arrOfHorCords[i]
   
    if(themePosition === 0){
        createRowCountSection.classList.add("row-counts");
        if(i === 4 || i=== 9 || i===14){
            createRowCountSection.setAttribute("style", "border-bottom: 2px solid black")
        }
    }else {
        createRowCountSection.classList.add("row-counts");
        createRowCountSection.classList.add("dark");
        if(i === 4 || i=== 9 || i===14){
            createRowCountSection.setAttribute("style", "border-bottom: 2px solid #dbd8d1")
        }
    }

    if (arrOfHorCords[i].length > 1){
        arrOfHorCords[i].forEach((elem) => {
            let createRowCountSection = document.createElement("div");
           
            if(themePosition === 0){
                createRowCountSection.classList.add("row-counts");
                
                if(i === 4 || i=== 9 || i===14){
                    createRowCountSection.setAttribute("style", "border-bottom: 2px solid black")
                }
            }else {
                createRowCountSection.classList.add("row-counts");
                createRowCountSection.classList.add("dark");
                if(i === 4 || i=== 9 || i===14){
                    createRowCountSection.setAttribute("style", "border-bottom: 2px solid #dbd8d1")
                }
            }
            
            createRowCountSection.textContent = elem;

            rows[i].appendChild(createRowCountSection);
            
        })
        
    }else {
        rows[i].appendChild(createRowCountSection)
    }
    }    
}


function startOfTheGame(size){
    
        
        generateColumHelpCords(size)
        generateSpecificField(size)
        generateRowHelpCords(size)

}     
    startOfTheGame(5)


function generateColumHelpCords(size){
    

    let createColBlocks = document.createElement("div");
    createColBlocks.classList.add("nonograms-col-cords");
    let arrOfColCords = []
    for(let o = 0; o<size; o++){

        let createColBlock = document.createElement("div");
        createColBlock.classList.add("col-cords")

        
        if(themePosition === 0){
            if(o === 4 || o=== 9 || o === 14){
                createColBlock.setAttribute("style", "border-right: 1px solid black")
            }
        }else {
            if(o === 4 || o=== 9 || o === 14){
                createColBlock.setAttribute("style", "border-right: 1px solid #dbd8d1")
            }
        }
        
        
        createColBlock.setAttribute("id", `col-${o}`)
        createColBlocks.appendChild(createColBlock);
    }

    let nonogramsSection = document.querySelector(".nonograms-blocks");
   
    nonogramsSection.appendChild(createColBlocks);


    let cols = document.querySelectorAll(".col-cords");
    let countCords = 0;
    let countCordsArr = [];


    for(let i = 0; i<cols.length; i++){
        let getColIndex = (cols[i].id.split("-")[1])-0;

      
        for (let k = 0; k<field.length; k++){

            if(field[k][getColIndex] === 1){
                countCords += 1;
            }else if (field[k][getColIndex] === 0 && countCords !== 0){
                countCordsArr.push(countCords)
                countCords = 0;
            }

       
    }

    countCordsArr.push(countCords)
    arrOfColCords.push(countCordsArr.filter(elem => elem !== 0));
    
    countCords = 0;
    countCordsArr = [];
   
     
    let createColCountSection = document.createElement("div");
    

    if(themePosition === 0){
        createColCountSection.classList.add("col-counts");

    }else {
        createColCountSection.classList.add("col-counts");
        createColCountSection.classList.add("dark");
    }

    createColCountSection.textContent = arrOfColCords[i]
    
    if (arrOfColCords[i].length > 1){
        arrOfColCords[i].forEach((elem) => {
            let createColCountSection = document.createElement("div");
            if(themePosition === 0){
                createColCountSection.classList.add("col-counts");
        
            }else {
                createColCountSection.classList.add("col-counts");
                createColCountSection.classList.add("dark");
            }
        

            createColCountSection.textContent = elem;

            cols[i].appendChild(createColCountSection);
            
        })
        
    }else {
        cols[i].appendChild(createColCountSection)
    }
    }    

    }






function generateSpecificField(size){

    let createRowofBlocs = document.createElement("div");
    createRowofBlocs.classList.add("nonogram-row");
    let createBlock = document.createElement("div");
    createBlock.classList.add("block");

    let nonogramsSection = document.querySelector(".nonograms-blocks")



    for (let i = 0; i<size; i++){
        let createRowofBlocs = document.createElement("div");
        createRowofBlocs.classList.add("nonogram-row");
        for(let k = 0; k<size; k++){
                let createBlock = document.createElement("div");
                if (themePosition === 0 ){
                    createBlock.classList.add("block");
                }else {
                    createBlock.classList.add("block");
                    createBlock.classList.add("dark");

                }
                createBlock.setAttribute("id", `${k}-${i}`)
                let divideId = createBlock.id.split('-')

                if(themePosition === 0){
                    if(divideId.join('-') ==="4-4"|| divideId.join('-') === "9-4" || divideId.join('-') ==="14-4" || divideId.join('-') ==="4-9"|| divideId.join('-') ==="9-9"|| divideId.join('-') ==="14-9" || divideId.join('-') ==="4-14"|| divideId.join('-') ==="9-14"|| divideId.join('-') ==="14-14"){
                        createBlock.setAttribute("style", "border-right: 2px solid black; border-bottom: 2px solid black");
                    }else if(divideId[0] ==="4" || divideId[0] === "9" || divideId[0] ==="14"){
                            createBlock.setAttribute("style", "border-right: 2px solid black");
                    } else if (divideId[1] ==="4"|| divideId[1] === "9" || divideId[1] ==="14"){
                            createBlock.setAttribute("style", "border-bottom: 2px solid black");
                    } 
                }else if (themePosition === 1) {
                    if(divideId.join('-') ==="4-4"|| divideId.join('-') === "9-4" || divideId.join('-') ==="14-4" || divideId.join('-') ==="4-9"|| divideId.join('-') ==="9-9"|| divideId.join('-') ==="14-9" || divideId.join('-') ==="4-14"|| divideId.join('-') ==="9-14"|| divideId.join('-') ==="14-14"){
                        createBlock.setAttribute("style", "border-right: 2px solid #dbd8d1; border-bottom: 2px solid #dbd8d1");
                    }else if(divideId[0] ==="4" || divideId[0] === "9" || divideId[0] ==="14"){
                            createBlock.setAttribute("style", "border-right: 2px solid #dbd8d1");
                    } else if (divideId[1] ==="4"|| divideId[1] === "9" || divideId[1] ==="14"){
                            createBlock.setAttribute("style", "border-bottom: 2px solid #dbd8d1");
                    } 
                }
                
                createRowofBlocs.appendChild(createBlock);
            
                

                
               



                nonogramsSection.appendChild(createRowofBlocs)
            
    }
       

        
    }

    gameFunction(size)
}


function createModalWindowGuts(fromCollection, type){
    let changeBlock = document.querySelector(".change-field-block");

    let createTextTitle = document.createElement("p");
    createTextTitle.classList.add("change-field-text");

    let modalWindow = document.querySelector(".modal-window");
    modalWindow.innerHTML = ""
    let closeBtn  = document.createElement("button");
    closeBtn.classList.add("close-btn");
    closeBtn.textContent = "X";

    if(themePosition === 0){
        closeBtn.classList.add("close-btn");
    }else {
        closeBtn.classList.add("close-btn");
        closeBtn.classList.add("dark");
    }
    modalWindow.appendChild(closeBtn);
    modalWindow.appendChild(changeBlock)



    if(type === "gamemode"){
        changeBlock.innerHTML= ""
        createTextTitle.textContent = "Please choose type of game field:";
        changeBlock.appendChild(createTextTitle)        
          
        fromCollection.forEach((elem,index) => {
            let createControlBtns = document.createElement("button");
            
            if(themePosition === 0){
                createControlBtns.classList.add("control-btn");
            }else {
                createControlBtns.classList.add("control-btn");
                createControlBtns.classList.add("dark");
            }
            createControlBtns.setAttribute("id", `field-${index}`)            
            createControlBtns.textContent = `${elem.boardsize}x${elem.boardsize}`

            changeBlock.appendChild(createControlBtns);
        })
        
    }

    if (type === "pictures"){


        changeBlock.innerHTML= ""
        createTextTitle.textContent = "Please choose picture:";
        changeBlock.appendChild(createTextTitle) 
        fromCollection[sizeOfGameField].fields.forEach((elem,index) => {
            let createControlBtns = document.createElement("button");
            if(themePosition === 0){
                createControlBtns.classList.add("control-btn");
            }else {
                createControlBtns.classList.add("control-btn");
                createControlBtns.classList.add("dark");
            }
            createControlBtns.setAttribute("id", `picture-${index}`);
            createControlBtns.textContent = `${elem.name}`

            changeBlock.appendChild(createControlBtns);
            })
    }

    if(type === "win"){
       winAudio.play()
        let modalWindow = document.querySelector(".modal-window");
        modalWindow.innerHTML= ""
        let createChangeBlock = document.createElement("div");
        let time = document.querySelector(".time");
        let winObject = {}

        winObject.pictureName = fromCollection[sizeOfGameField].fields[pictureId].name;
        winObject.sizeField = fromCollection[sizeOfGameField].boardsize
        winObject.winTime = timeSet.textContent;
        winObject.seconds = ((time.textContent.split(":"))[1]-0);
        winObject.minutes = ((time.textContent.split(":"))[0]-0);
        winObject.overallSeconds = (winObject.minutes * 60) + winObject.seconds;
        
        let existingEntry = JSON.parse(window.localStorage.getItem("win"))
        if(existingEntry === null ){
            existingEntry = [];
        }else if (existingEntry.length >= 5){
            existingEntry.pop();
        } 
        localStorage.setItem("entry", JSON.stringify(winObject));
        existingEntry.push(winObject);
        window.localStorage.setItem("win", JSON.stringify(existingEntry));
        
        
        if(themePosition === 0){
            createChangeBlock.classList.add("change-field-block");
        }else {
            createChangeBlock.classList.add("change-field-block");
            createChangeBlock.classList.add("dark");
        }
        
        let divideTime = time.textContent.split(":");
        
       createTextTitle.textContent=`Congratulations ! You won ! You solved the picture "${fromCollection[sizeOfGameField].fields[pictureId].name}" with size ${fromCollection[sizeOfGameField].boardsize}x${fromCollection[sizeOfGameField].boardsize} in ${divideTime[0]} minutes ${divideTime[1]} seconds`

       let playAgainBtn  = document.createElement("button");
       if(themePosition === 0){
        playAgainBtn.classList.add("control-btn");
    }else {
        playAgainBtn.classList.add("control-btn");
        playAgainBtn.classList.add("dark");
    }
       playAgainBtn.textContent = "Play Again!";
       playAgainBtn.setAttribute("id", "play-again");

       createChangeBlock.appendChild(createTextTitle);
       createChangeBlock.appendChild(playAgainBtn)

       modalWindow.appendChild(createChangeBlock)


    }

    if (type === "results"){
        console.log(results)
        changeBlock.innerHTML= ""
        let createTableRecords = document.querySelector(".change-field-block")
        let createTableContent = document.createElement('table');
            

            if(themePosition === 0){
                createTableContent.classList.add('table-content');
            }else {
                createTableContent.classList.add('table-content');
                createTableContent.classList.add('dark');
            }
            createTableContent.innerHTML = " <tr><th>Place</th><th>Name</th><th>Game mode</th><th>Time</th></tr><tbody></tbody>"
            createTableRecords.appendChild(createTableContent);
       
            let arrOfwin = JSON.parse(window.localStorage.getItem("win"));
            let tbody = document.getElementsByTagName('tbody')[0];
            

            if (arrOfwin === null){
                //tbody.innerHTML=""
                let row = document.createElement('tr');
                    let emptyRes = document.createElement('td');
                    emptyRes.setAttribute("colspan", "4");
                    emptyRes.appendChild(document.createTextNode("Please, win 1 game at least :)"));
                    row.appendChild(emptyRes);
                    tbody.appendChild(row); 
            }else {
                let sortArrOfWinObj = arrOfwin.sort((a,b) =>{
                    if ( a.overallSeconds < b.overallSeconds ){
                        return -1;
                      }
                      if ( a.overallSeconds > b.overallSeconds ){
                        return 1;
                      }
                      return 0;
                })    

               // tbody.innerHTML = ""

                sortArrOfWinObj.forEach((elem, index,arr)=>{

                    let row = document.createElement('tr');
                    let place = document.createElement('td');
                    place.appendChild(document.createTextNode(`${index+1}`));
                    let name = document.createElement('td');
                    name.appendChild (document.createTextNode(`${arr[index].pictureName}`))
                    let size = document.createElement('td');
                    size.appendChild (document.createTextNode(`${arr[index].sizeField}x${arr[index].sizeField}`))
                    let time = document.createElement('td');
                    time.appendChild (document.createTextNode(`${arr[index].winTime}`));
                    row.appendChild(place);
                    row.appendChild(name);
                    row.appendChild(size);
                    row.appendChild(time)
                    tbody.appendChild(row);   

                })
                

                
                

            }

    }

    
    controlBtnModalWindow()
   // controlBtnsFunc()

    closeBtn.addEventListener("click", function(){
        controlBtnAudio.play()
        modalWindow.classList.remove("show");
        modalWindowWrap.classList.remove("show")
    })

}

let controlBtnModalWindow = function(){
    let controlBtn = document.querySelectorAll(".control-btn");
    controlBtn.forEach((elem) =>{
        let nonogramsSection = document.querySelector(".nonograms-blocks");

        elem.addEventListener("click", function(e){
            controlBtnAudio.play()
            let divideId = e.target.id.split("-");

             if (divideId.includes("field")) {
                let gameField = document.querySelector(".game-field")
                gameField.setAttribute("style", "")
                clearInterval(time);
                emptyDefaultField = [];
                openSolution = false;
                seconds = 0;
                minutes = 0;
                timeStart = false;
                timeSet.textContent = "00:00";
                divideId = divideId[1] - 0;
                pictureId = 0;
                let sizeOfFieldFromCollection =
                  collectionOfPictures[divideId].boardsize;
                sizeOfGameField = divideId;
                nonogramsSection.innerHTML = "";
                field = collectionOfPictures[divideId].fields[0].picture;
                startOfTheGame(sizeOfFieldFromCollection)
                modalWindow.classList.remove("show");
                modalWindowWrap.classList.remove("show");
              } else if (divideId.includes("picture")) {
                let gameField = document.querySelector(".game-field")
                gameField.setAttribute("style", "")
                clearInterval(time);
                emptyDefaultField = [];
                openSolution = false;
                seconds = 0;
                minutes = 0;
                timeStart = false;
                timeSet.textContent = "00:00";
                divideId = divideId[1] - 0;
                pictureId = divideId;
                field = collectionOfPictures[sizeOfGameField].fields[divideId].picture;
                let sizeOfFieldFromCollection =
                  collectionOfPictures[sizeOfGameField].boardsize;
                nonogramsSection.innerHTML = "";
                startOfTheGame(sizeOfFieldFromCollection)
                modalWindow.classList.remove("show");
                modalWindowWrap.classList.remove("show");
              } else if (e.target.id === "play-again"){
                let gameField = document.querySelector(".game-field")
                gameField.setAttribute("style", "")
                clearInterval(time);
                emptyDefaultField = [];
                openSolution = false;
                seconds = 0;
                minutes = 0;
                timeStart = false;
                timeSet.textContent = "00:00";
                //divideId = (divideId[1])-0;
                field = collectionOfPictures[sizeOfGameField].fields[pictureId].picture;
                let sizeOfFieldFromCollection =
                  collectionOfPictures[sizeOfGameField].boardsize;
                nonogramsSection.innerHTML = "";
                startOfTheGame(sizeOfFieldFromCollection)
                modalWindow.classList.remove("show");
                modalWindowWrap.classList.remove("show");
              }
        })
    })
    
}



let controlBtnsFunc = function () {
  let controlBtn = document.querySelectorAll(".control-btn");
  controlBtn.forEach((elem) => {
    let nonogramsSection = document.querySelector(".nonograms-blocks");

    elem.addEventListener("click", function (e) {
        controlBtnAudio.play()
      let modalWindowWrap = document.querySelector(".modal-window-wrapper");
      let modalWindow = document.querySelector(".modal-window");
      

      if (e.target.id === "gamemode") {
        modalWindow.classList.add("show");
        modalWindowWrap.classList.add("show");
        createModalWindowGuts(collectionOfPictures, e.target.id);
      } else if (e.target.id === "pictures") {
        modalWindow.classList.add("show");
        modalWindowWrap.classList.add("show");
        createModalWindowGuts(collectionOfPictures, e.target.id);
      }  else if(e.target.id === "results"){
        modalWindow.classList.add("show");
        modalWindowWrap.classList.add("show");
        createModalWindowGuts(collectionOfPictures, e.target.id);
      }else if (e.target.id === "restart") {
        let gameField = document.querySelector(".game-field")
        gameField.setAttribute("style", "")
        emptyDefaultField = [];
        clearInterval(time);
        openSolution = false;
        seconds = 0;
        minutes = 0;
        timeStart = false;
        timeSet.textContent = "00:00";
        //divideId = (divideId[1])-0;
        field = collectionOfPictures[sizeOfGameField].fields[pictureId].picture;
        let sizeOfFieldFromCollection =
          collectionOfPictures[sizeOfGameField].boardsize;
        nonogramsSection.innerHTML = "";
        startOfTheGame(sizeOfFieldFromCollection)
       

      } else if (e.target.id === "solution") {
        if(openSolution === false){
            openSolution = true;
           emptyDefaultField = [];
            clearInterval(time);
            seconds = 0;
            minutes = 0;
            timeStart = false;
            timeSet.textContent = "00:00";
            uploadSolution(sizeOfGameField, pictureId);
            

        }else {
            let gameField = document.querySelector(".game-field")
                gameField.setAttribute("style", "")
            openSolution = false
            emptyDefaultField = [];
            clearInterval(time);
            seconds = 0;
            minutes = 0;
            timeStart = false;
            timeSet.textContent = "00:00";
            field = collectionOfPictures[sizeOfGameField].fields[pictureId].picture;
            let sizeOfFieldFromCollection =
              collectionOfPictures[sizeOfGameField].boardsize;
            nonogramsSection.innerHTML = "";
            startOfTheGame(sizeOfFieldFromCollection)
         

        }
            

      } else if (e.target.id ==="random"){
        let gameField = document.querySelector(".game-field")
        gameField.setAttribute("style", "")
        clearInterval(time);
        openSolution = false;
        emptyDefaultField = [];
        seconds = 0;
        minutes = 0;
        timeStart = false;
        timeSet.textContent = "00:00";
        let sizeOfGame = randomGame().split("-")[0];
        let sizeOfPics = randomGame().split("-")[1];
        sizeOfGameField = sizeOfGame
        pictureId = sizeOfPics
        field = collectionOfPictures[sizeOfGameField].fields[pictureId].picture;
        let sizeOfFieldFromCollection =
          collectionOfPictures[sizeOfGameField].boardsize;
        nonogramsSection.innerHTML = "";
        startOfTheGame(sizeOfFieldFromCollection)
        
      } else if (e.target.id === "savegame"){
            SaveGame();
            
        
        

      }else if(e.target.id === "countinue"){
        let gameField = document.querySelector(".game-field")
        gameField.setAttribute("style", "")
        let parsedObject = JSON.parse(localStorage.getItem("save"));
        
           // emptyDefaultField =[];
            clearInterval(time);
            seconds = (parsedObject.activeTime.split(":")[1])-0;
            minutes = (parsedObject.activeTime.split(":")[0])-0;
            timeSet.textContent = parsedObject.activeTime;
            timeStart = false;
            
            sizeOfGameField = parsedObject.sizeOfField
            pictureId = parsedObject.activePictureId
            field = collectionOfPictures[sizeOfGameField].fields[pictureId].picture;
            let sizeOfFieldFromCollection =
              collectionOfPictures[sizeOfGameField].boardsize;
            nonogramsSection.innerHTML = "";
            emptyDefaultField = parsedObject.activeGameField;
            startOfTheGame(sizeOfFieldFromCollection)

            

            parsedObject.matchedGameArr.forEach((elem) =>{
                let findBlock = document.getElementById(elem);
                findBlock.classList.add("active");
            })

            parsedObject.matchedCrossArr.forEach((elem) =>{
                let findBlock = document.getElementById(elem);
                findBlock.classList.add("cross");
            })
            
            
      }
    
    });
  });
};
controlBtnsFunc();

let modalWindowWrap = document.querySelector(".modal-window-wrapper");
let modalWindow = document.querySelector(".modal-window");





function time_count() {
    let nonogramsSection = document.querySelector(".nonograms-blocks");
  if (timeStart === true) {
    return false;
  } else {
    timeStart = true;
    time = setInterval(function () {
      seconds++;

      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 20) {
        clearInterval(time);
        alert("Time's up dude!!");
        let gameField = document.querySelector(".game-field")
        gameField.setAttribute("style", "")
        openSolution = false;
        seconds = 0;
        minutes = 0;
        timeStart = false;
        timeSet.textContent = "00:00";
        
        field = collectionOfPictures[sizeOfGameField].fields[pictureId].picture;
        let sizeOfFieldFromCollection =
          collectionOfPictures[sizeOfGameField].boardsize;
        nonogramsSection.innerHTML = "";
        startOfTheGame(sizeOfFieldFromCollection)
        
      }

      let result = `${String(minutes).padStart(2, 0)}:${String(
        seconds
      ).padStart(2, 0)}`;
      timeSet.textContent = result;
    }, 1000);
  }
}

function uploadSolution(sizeOfGame, pictureFromCollection){
   

 let matchedArr = []
 let getSolutionArr = collectionOfPictures[sizeOfGame].fields[pictureFromCollection].picture
for(let i = 0; i<getSolutionArr.length; i++){
    for(let k = 0; k< getSolutionArr[i].length; k++){
        if (getSolutionArr[i][k] === 1){
            let createId = `${k}-${i}`;
            matchedArr.push(createId)
        }
    }
}



let block = document.querySelectorAll(".block");
let gameField = document.querySelector(".game-field")
gameField.setAttribute("style", "pointer-events:none")

block.forEach((elem) => {
    elem.classList.remove("active");
    elem.classList.remove("cross");
    
})

    matchedArr.forEach((elem)=>{
        let fincBlock = document.getElementById(`${elem}`);
        
        fincBlock.classList.add("active");
    })


matchedArr = []
}


let previousIndexSize;
let previousIndexPicture
function randomGame(){


    let randomIndexFromBoardSize;
    let randomIndexFromPictures;
    
    do {
        randomIndexFromBoardSize =  Math.floor(Math.random() * collectionOfPictures.length);
       randomIndexFromPictures = Math.floor(Math.random() * collectionOfPictures[randomIndexFromBoardSize].fields.length)
      
    }while(randomIndexFromBoardSize === previousIndexSize && randomIndexFromPictures === previousIndexPicture){
        previousIndexSize = randomIndexFromBoardSize
        previousIndexPicture = randomIndexFromPictures

        
        return randomIndexFromBoardSize.toString() + "-" + randomIndexFromPictures.toString()
    }



}


let audioIcon = document.querySelector(".music-togle-icon");

audioIcon.addEventListener("click", function(e){
    switchBtnAudio.play()
    if (!audioIcon.classList.contains("up")){

        e.target.classList.add("up")
        crossClickAudio.volume = 0;
        activeClickAudio.volume = 0;
        emptyClickAudio.volume = 0;
        controlBtnAudio.volume = 0;
        switchBtnAudio.volume = 0;
        winAudio.volume = 0;
    } else {
        crossClickAudio.volume = 0.2;
        activeClickAudio.volume = 0.2;
        emptyClickAudio.volume = 0.2;
        controlBtnAudio.volume = 0.2;
        switchBtnAudio.volume = 0.2;
        winAudio.volume = 0.2;
        e.target.classList.remove("up")
    }
})

let themeIcon = document.querySelector(".theme-togle-icon");


function changeTheme(){

    let body = document.body;
    let title = document.querySelector(".title");
    let gameInfo = document.querySelector(".game-info-block");
    let block = document.querySelectorAll(".block");
    let colCords = document.querySelectorAll(".col-cords");
    let rowCords = document.querySelectorAll(".row-cords");

    let controlBtns = document.querySelectorAll(".control-btn");

    let musicSwitch = document.querySelector(".music-togle-icon");

    let modalWindowContent = document.querySelector(".change-field-block")
    //let modalCloseBtn = document.querySelector(".close-btn");
    let themeIcon = document.querySelector(".theme-togle-icon");

    
    if (themePosition === 1){
        
        body.classList.add("dark")
        title.classList.add("dark")
        gameInfo.classList.add("dark")
        block.forEach((elem) =>{
            elem.classList.add("dark");
            let divideId = elem.id.split('-');

            if(divideId.join('-') ==="4-4"|| divideId.join('-') === "9-4" || divideId.join('-') ==="14-4" || divideId.join('-') ==="4-9"|| divideId.join('-') ==="9-9"|| divideId.join('-') ==="14-9" || divideId.join('-') ==="4-14"|| divideId.join('-') ==="9-14"|| divideId.join('-') ==="14-14"){
                elem.setAttribute("style", "border-right: 2px solid #dbd8d1; border-bottom: 2px solid #dbd8d1");
            }else if(divideId[0] ==="4" || divideId[0] === "9" || divideId[0] ==="14"){
                elem.setAttribute("style", "border-right: 2px solid #dbd8d1");
            } else if (divideId[1] ==="4"|| divideId[1] === "9" || divideId[1] ==="14"){
                elem.setAttribute("style", "border-bottom: 2px solid #dbd8d1");
            } 


        })

        colCords.forEach((elem) =>{
            let divideId = (elem.id.split('-')[1]-0);
            
            if(divideId === 4 || divideId=== 9 || divideId === 14){
                elem.setAttribute("style", "border-right: 1px solid #dbd8d1")
            }

            let arrFromChild  = Array.from(elem.children);
            arrFromChild.forEach((el)=>{
                el.classList.add("dark");
            })
        })

        rowCords.forEach((elem)=>{
            let divideId = (elem.id.split('-')[1]-0);
            let arrFromChild = Array.from(elem.children);
            arrFromChild.forEach((el)=>{
                el.classList.add("dark")
            })
            if(divideId === 4 || divideId=== 9 || divideId === 14){
                arrFromChild.forEach((el)=>{
                    el.setAttribute("style", "border-bottom: 2px solid #dbd8d1")
                })
            }
          
        })

        controlBtns.forEach((elem) =>{
            elem.classList.add("dark")
        })

        musicSwitch.classList.add("dark");

        modalWindowContent.classList.add("dark");
       // modalCloseBtn.classList.add("dark");
        themeIcon.classList.add("up")

    } else {
  
        title.classList.remove("dark")
        body.classList.remove("dark")
        gameInfo.classList.remove("dark")
        block.forEach((elem) =>{
            elem.classList.remove("dark");
            let divideId = elem.id.split('-');
            if(divideId.join('-') ==="4-4"|| divideId.join('-') === "9-4" || divideId.join('-') ==="14-4" || divideId.join('-') ==="4-9"|| divideId.join('-') ==="9-9"|| divideId.join('-') ==="14-9" || divideId.join('-') ==="4-14"|| divideId.join('-') ==="9-14"|| divideId.join('-') ==="14-14"){
                elem.setAttribute("style", "border-right: 2px solid black; border-bottom: 2px solid black");
            }else if(divideId[0] ==="4" || divideId[0] === "9" || divideId[0] ==="14"){
                elem.setAttribute("style", "border-right: 2px solid black");
            } else if (divideId[1] ==="4"|| divideId[1] === "9" || divideId[1] ==="14"){
                elem.setAttribute("style", "border-bottom: 2px solid black");
            } 
        })

        colCords.forEach((elem) =>{
            
            let divideId = (elem.id.split('-')[1]-0);

            if(divideId === 4 || divideId=== 9 || divideId === 14){
                elem.setAttribute("style", "border-right: 1px solid black")
            }

            let arrFromChild  = Array.from(elem.children);
            arrFromChild.forEach((el)=>{
                el.classList.remove("dark");
            })
        })

        rowCords.forEach((elem)=>{
            let divideId = (elem.id.split('-')[1]-0);
            let arrFromChild = Array.from(elem.children);
            arrFromChild.forEach((el)=>{
                el.classList.remove("dark")
            })
            if(divideId === 4 || divideId=== 9 || divideId === 14){
                arrFromChild.forEach((el)=>{
                    el.setAttribute("style", "border-bottom: 2px solid black")
                })
            }
          
        })


        controlBtns.forEach((elem) =>{
            elem.classList.remove("dark")
        })

        musicSwitch.classList.remove("dark");
        modalWindowContent.classList.remove("dark")
      //  modalCloseBtn.classList.remove("dark")
      themeIcon.classList.remove("up")
        


    }

}
changeTheme()

themeIcon.addEventListener("click", function(){
    switchBtnAudio.play()
if(themePosition === 1){
    
    themePosition = 0
    window.localStorage.setItem("theme", `${themePosition}`)
    changeTheme()
    
}else {
    
    themePosition = 1
    window.localStorage.setItem("theme", `${themePosition}`)
    changeTheme()
    
}

})

function SaveGame(){
    
    window.localStorage.removeItem("save");
    let saveObject = {}
    let activeGameField = emptyDefaultField;
    
    let acttiveTime = timeSet.textContent;
    let activeField = field;
    let sizeOfFieldFromCollection = sizeOfGameField;
    let activePictureId = pictureId;

    saveObject.activeGameField = activeGameField;
    saveObject.activeField = activeField;
    saveObject.activeTime = acttiveTime;
    saveObject.sizeOfField = sizeOfFieldFromCollection;
    saveObject.activePictureId = activePictureId;


    let matchedGameArr = []
    let getActiveGameArr = activeGameField;
   for(let i = 0; i<getActiveGameArr.length; i++){
       for(let k = 0; k< getActiveGameArr[i].length; k++){
           if (getActiveGameArr[i][k] === 1){
               let createId = `${k}-${i}`;
               matchedGameArr.push(createId)
           }
       }
   }

   let matchedCrossArr = [];
   let getActiveCrossArr = document.querySelectorAll(".block");

   getActiveCrossArr.forEach((elem) =>{
    if(elem.classList.contains("cross")){
        matchedCrossArr.push(elem.id);
    }
   })
    saveObject.matchedGameArr = matchedGameArr;
    saveObject.matchedCrossArr = matchedCrossArr;



    window.localStorage.setItem("save", JSON.stringify(saveObject))
}








