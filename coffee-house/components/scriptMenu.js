import * as getJson from "../products.json" with { type: "json" };

const collectionOfCoffee = getJson.default

const borgar = document.querySelector('.borgar');
const navigationList = document.querySelector("ul");
const menuContainer = document.querySelector(".menu-container")
const bodyContainer = document.querySelector("body");
const htmlContainer = document.querySelector("html");


function toggleMenu() {
    if( borgar.classList.contains('active') && navigationList.classList.contains("show") && menuContainer.classList.contains("show") && bodyContainer.classList.contains("showBurger")){
        borgar.classList.remove("active")
        navigationList.classList.remove("show")
        menuContainer.classList.remove("show")
        bodyContainer.classList.remove("showBurger")

    }
   else {
    borgar.classList.add("active")
    navigationList.classList.add("show")
    menuContainer.classList.add("show")
    bodyContainer.classList.add("showBurger")

    }
    }
  
  navigationList.addEventListener("click", toggleMenu)
  borgar.addEventListener('click', toggleMenu);



 

  function updateModal(id){
     
    let result = createModalElement(id);
    return result;
 }
 

  function createCardTemplate(num){
   let card = document.createElement('div');
   card.setAttribute('id', `${collectionOfCoffee[num].id}`)
    card.classList.add('coffee-card');
    let pictureBlock = document.createElement("div");
    pictureBlock.classList.add("coffee-picture");
    pictureBlock.style.backgroundImage = `url(${collectionOfCoffee[num].picture})`;
    
    let cardContent = document.createElement("div");
    cardContent.classList.add("coffee-card-content");

    let cardHeading = document.createElement("h3")
    cardHeading.classList.add("coffee-card-heading");
    cardHeading.textContent = `${collectionOfCoffee[num].name}`;

    let cardText = document.createElement("p")
    cardText.classList.add("coffee-card-text");
    cardText.textContent = `${collectionOfCoffee[num].description}`

    let cardPrice = document.createElement("p");
    cardPrice.classList.add("coffee-card-price");
    cardPrice.textContent = `$${collectionOfCoffee[num].price}`

    cardContent.appendChild(cardHeading);
    cardContent.appendChild(cardText);
    cardContent.appendChild(cardPrice);

    card.appendChild(pictureBlock);
    card.appendChild(cardContent);
    return card
    
  }

 
  const coffeeMenu = document.querySelector(".coffee-menu-content")
  const tabsBtns = document.querySelectorAll(".tabs-btn")
  const refreshBtn = document.querySelector(".refresh-btn")



let startElement = 0;
let maxElement = 8;
let elementsLength = 0;

function updateMenu(start,num){
  coffeeMenu.innerHTML ="";
  for(let i = start; i< num; i++){
    coffeeMenu.appendChild(createCardTemplate(i))
  }

  let coffeCard = document.querySelectorAll(".coffee-card")
  for(let i = 0; i<coffeCard.length; i++){
    coffeCard[i].addEventListener("click", function(){
      updateModal(this.id)
      modalWrapper.classList.remove("hide")
      bodyContainer.classList.add("show")
      togleModalSize()
      togleModalAdditiv()
    } )
  }

} 
updateMenu(startElement,maxElement)


function initializeMenu(){
  updateMenu(startElement,maxElement)
  resizeCoffeeElements()
}

initializeMenu()



window.addEventListener("resize", resizeCoffeeElements)


function resizeCoffeeElements(){
  if (window.innerWidth <= 768){
    if(elementsLength == 4){
      updateMenu(startElement, maxElement)
     
    }else {
      updateMenu(startElement, maxElement-4)
      
    }
    
  } else {
    updateMenu(startElement, maxElement)
  }

}



  refreshBtn.addEventListener("click", function(){
    updateMenu(startElement,maxElement);
    if (coffeeMenu.childNodes.length === 8){
      this.classList.add("hide");
    }
  })


function createModalElement(num){
  const modalContainer = document.querySelector(".modal-coffee-container")
  const modalPicture = document.querySelector(".modal-coffee-picture");
  const modalHeading = document.querySelector(".modal-card-heading");
  const modalDesc = document.querySelector(".modal-card-text");
  const modalSize = document.querySelector(".modal-size-btns")
  const modalAdditiv = document.querySelector(".modal-additiv-btns");
  const modalPrice = document.querySelector(".total-price");

  modalContainer.setAttribute("id", collectionOfCoffee[num].price)
  
  modalPicture.style.backgroundImage = `url(${collectionOfCoffee[num].picture})`
  modalHeading.textContent = `${collectionOfCoffee[num].name}`
  modalDesc.textContent = `${collectionOfCoffee[num].description}`
  modalPrice.textContent = `$${modalContainer.id}`
  modalSize.innerHTML = `<div id = "${collectionOfCoffee[num].sizes.s["add-price"]}" class = "size-btn active">
  <p class = "size-lit">S</p>
  <p class = "size-desc">${collectionOfCoffee[num].sizes.s.size}</p>
</div>
<div id = "${collectionOfCoffee[num].sizes.m["add-price"]}" class = "size-btn">
  <p class = "size-lit">M</p>
  <p class = "size-desc">${collectionOfCoffee[num].sizes.m.size}</p>
</div>
<div id = "${collectionOfCoffee[num].sizes.l["add-price"]}" class = "size-btn">
  <p class = "size-lit">L</p>
  <p class = "size-desc">${collectionOfCoffee[num].sizes.l.size}</p>
</div>`;
  modalAdditiv.innerHTML = `<div id ="${collectionOfCoffee[num].additives[0]["add-price"]}" class = "additiv-btn">
  <p class = "size-lit">1</p>
  <p class = "type-additiv">${collectionOfCoffee[num].additives[0].name}</p>
</div>
<div id ="${collectionOfCoffee[num].additives[1]["add-price"]}" class = "additiv-btn">
  <p class = "size-lit">2</p>
  <p class = "type-additiv">${collectionOfCoffee[num].additives[1].name}</p>
</div>
<div id ="${collectionOfCoffee[num].additives[2]["add-price"]}" class = "additiv-btn">
  <p class = "size-lit">3</p>
  <p class = "type-additiv">${collectionOfCoffee[num].additives[2].name}</p>
</div>`;

 //  console.log(collectionOfCoffee[num].sizes)
   //console.log(collectionOfCoffee[num].additives[0].name)



}

//createModalElement(2)
//console.log(collectionOfCoffee)

const coffeeCards = document.querySelectorAll(".coffee-card")
const modalWrapper = document.querySelector(".modal-block-wrapper")

const modalCloseBtn = document.querySelector(".modal-close-btn");


function togleModal(){
  
  for(let i = 0; i<coffeeCards.length; i++){
    
    coffeeCards[i].addEventListener("click", function(){
      
      updateModal(this.id)
      modalWrapper.classList.remove("hide")
      bodyContainer.classList.add("show")
      togleModalSize()
      togleModalAdditiv()
    } )
  }
  
}

togleModal()

function togleModalSize(){
  const modalContainer = document.querySelector(".modal-coffee-container")
  const modalSize = document.querySelectorAll(".size-btn");
  const modalPrice = document.querySelector(".total-price");
  const modalAdditiv = document.querySelectorAll(".additiv-btn");


    for(let i =0; i< modalSize.length; i++){
      modalSize[i].addEventListener("click", function(){
        modalAdditiv.forEach(j=> j.classList.remove("active"))
        modalSize.forEach( k=> k.classList.remove("active"))
        modalSize[i].classList.add("active")
        modalPrice.textContent = `$${modalContainer.id}`
      
       let defaultPrice = modalPrice.textContent.slice(1,modalPrice.textContent.length) - 0;
        defaultPrice = `$${(defaultPrice + (modalSize[i].id-0)).toFixed(2)}`
       // console.log(defaultPrice)
        modalPrice.textContent = defaultPrice
      })
      
    }
    
}

function togleModalAdditiv(){
  //const modalContainer = document.querySelector(".modal-coffee-container")
  const modalSize = document.querySelectorAll(".size-btn");
  const modalPrice = document.querySelector(".total-price");
  const modalAdditiv = document.querySelectorAll(".additiv-btn");
//  let additivVal = 0;
  

  for(let i = 0; i<modalAdditiv.length; i++){
    
      modalAdditiv[i].addEventListener("click", function(){
        if (!modalAdditiv[i].classList.contains("active")){
          modalAdditiv[i].classList.add("active")
       
          let defaultPrice = modalPrice.textContent.slice(1,modalPrice.textContent.length) - 0;
            defaultPrice = `$${(defaultPrice + 0.5).toFixed(2)}`
            modalPrice.textContent = defaultPrice;
        }else if (modalAdditiv[i].classList.contains("active") ){
     
            modalAdditiv[i].classList.remove("active")
            let defaultPrice = modalPrice.textContent.slice(1,modalPrice.textContent.length) - 0;
            defaultPrice = `$${(defaultPrice - (0.5)).toFixed(2)}`
            modalPrice.textContent = defaultPrice;
         
        }
        
        })
    }

     
}




modalWrapper.addEventListener("click",function(e){
  if (e.target === modalWrapper || e.currentTarget === modalCloseBtn) {
    modalWrapper.classList.add('hide')
    bodyContainer.classList.remove("show")
  }
});


//modalContainer.addEventListener("click", togglePopap);
modalCloseBtn.addEventListener("click", togglePopap)

const modalContainer = document.querySelector(".modal-coffee-container")


function togglePopap(){
  
  if(modalWrapper.classList.contains('hide')){
    console.log(2323)
    modalWrapper.classList.add('hide');
    bodyContainer.classList.remove("show")
  } else {
    modalWrapper.classList.add("hide")
    bodyContainer.classList.remove("show");
  }
}




function tabsBtnSwitch(){
  
  for(let i = 0; i< tabsBtns.length; i++){
    tabsBtns[i].addEventListener("click", function(){
      tabsBtns.forEach( k=> k.classList.remove("active") )
      tabsBtns[i].classList.add("active")
      
      for(let i = 0; i<coffeeCards.length; i++){
        coffeeCards[i].addEventListener("click", function(){
            updateModal(this.id)
            modalWrapper.classList.remove("hide")
        } )
      }

      if(i == 1){
        
        startElement = 8
        maxElement = 12
        updateMenu(startElement, maxElement)
        elementsLength = coffeeMenu.childNodes.length;
        resizeCoffeeElements()
        if(elementsLength == 4){
          refreshBtn.classList.add("hide")
        }
        
      }else if (i ==2){
       
        startElement = 12
        maxElement = 20
        updateMenu(startElement,maxElement)
        for(let i = 0; i<coffeeCards.length; i++){
          coffeeCards[i].addEventListener("click", function(){
              updateModal(this.id)
              modalWrapper.classList.remove("hide")
          } )
        }
        elementsLength = coffeeMenu.childNodes.length;
        
        resizeCoffeeElements()
        if(elementsLength > 4){
          refreshBtn.classList.remove("hide")
        }
      } else if(i == 0){
        startElement = 0
        maxElement = 8
        updateMenu(startElement,maxElement)
        for(let i = 0; i<coffeeCards.length; i++){
          coffeeCards[i].addEventListener("click", function(){
              updateModal(this.id)
             modalWrapper.classList.remove("hide")
          } )
        }
        elementsLength = coffeeMenu.childNodes.length;
       
        resizeCoffeeElements()
        if(elementsLength > 4){
          refreshBtn.classList.remove("hide")
        }
      }
      
    })

  }
}

tabsBtnSwitch() 


