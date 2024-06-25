

const borgar = document.querySelector('.borgar');
const navigationList = document.querySelector("ul");
const menuContainer = document.querySelector(".menu-container")
const bodyContainer = document.querySelector("body");
const htmlContainer = document.querySelector("html");


function toggleMenu() {
    if( borgar.classList.contains('active') && navigationList.classList.contains("show") && menuContainer.classList.contains("show") && bodyContainer.classList.contains("show")){
        borgar.classList.remove("active")
        navigationList.classList.remove("show")
        menuContainer.classList.remove("show")
        bodyContainer.classList.remove("show")

    }
   else {
    borgar.classList.add("active")
    navigationList.classList.add("show")
    menuContainer.classList.add("show")
    bodyContainer.classList.add("show")

    }
    }
  
  navigationList.addEventListener("click", toggleMenu)
  borgar.addEventListener('click', toggleMenu);


  const btnRight = document.querySelector(".right-arrow-button");
  const btnLeft = document.querySelector(".left-arrow-button");
  const coffeeElements = document.querySelector(".coffee-cards-slider");

  let startPosition = 0;

  let isPaused = false;

  window.addEventListener("resize", resetStartPosition)

  function resetStartPosition(){
    if (window.innerWidth >= 616 && startPosition == 776){
        startPosition = 1040
    }else if (window.innerWidth >= 616 && startPosition == 388) {
        startPosition = 520
    } else if (window.innerWidth <= 616 && startPosition == 1040){
        startPosition = 776
    } else if (window.innerWidth <= 616 && startPosition == 520){
        startPosition = 388
    }
    coffeeElements.style.left = -startPosition + "px";
  }



  function moveToRight(){
    
    if(window.innerWidth <= 616){
        if (startPosition > 388){
            startPosition = 0
            if (countBars == 2){
                progressBars[countBars].childNodes[1].style.width = 0;
                count = 0;
                countBars = 0;
            }
        } else {
            startPosition = startPosition + 388;
            progressBars[countBars].childNodes[1].style.width = 0;
            count = 0
            countBars += 1;
    
        }
        coffeeElements.style.left = -startPosition + "px";
    } else {
        if (startPosition > 520){
            startPosition = 0
            
            if (countBars == 2){
                progressBars[countBars].childNodes[1].style.width = 0;
                count = 0;
                countBars = 0;
            }
        } else {
            startPosition = startPosition + 520;
            progressBars[countBars].childNodes[1].style.width = 0;
            count = 0
            countBars += 1;
           
    
        }      
        coffeeElements.style.left = -startPosition + "px";

    }
   
  }

  function moveToLeft(){
    if (window.innerWidth <= 616){
        if (startPosition == 0){
            console.log(startPosition)
            startPosition = 776
            if (countBars == 0){
                progressBars[countBars].childNodes[1].style.width = 0;
                count = 0;
                countBars = 2;
            }
        } else {
            startPosition = startPosition - 388 ;
            progressBars[countBars].childNodes[1].style.width = 0;
            count = 0
            countBars -= 1;
        }
        coffeeElements.style.left = -startPosition + "px";
    } else {
        if (startPosition == 0 ){
            startPosition = 1040

            if (countBars == 0){
                progressBars[countBars].childNodes[1].style.width = 0;
                count = 0;
                countBars = 2;
            }
        } else {
            startPosition = startPosition - 520;
            progressBars[countBars].childNodes[1].style.width = 0;
            count = 0
            countBars -= 1;
    
        }
        coffeeElements.style.left = -startPosition + "px";
    }
    
  }

  coffeeElements.addEventListener('touchstart', checkStart, false)
  coffeeElements.addEventListener("touchmove",checkMovement, false )
  coffeeElements.addEventListener('touchend', unPaused, false)

  coffeeElements.addEventListener("mousedown", checkStartMouse,false)
  coffeeElements.addEventListener("mousemove", checkMovementMouse,false)

  coffeeElements.addEventListener("mouseover", PausedMouse,false)

  coffeeElements.addEventListener("mouseleave", function(){
    isPaused = false
  })

  let startX1 = 0;

  function unPaused(){
      isPaused = false
    
  }
  
    function checkStart(event){
    
          let touch = event.touches[0];
          startX1 = touch.clientX;
          isPaused = true
      
      }
  
      function checkMovement(event){
          
          if (!startX1){
              return false
          }
          
              let moveX2 = event.touches[0].clientX
  
              let diffX = moveX2 - startX1
              if (diffX > 0) {
                  moveToLeft()
  
              } 
              else {
                  moveToRight()
  
              }
              startX1 = 0;
       
      }
  
      function checkStartMouse(event){
          let touch = event;
          startX1 = touch.clientX;
         isPaused = true
      }
  
      function checkMovementMouse(event){
          if (!startX1){
              return false
          }
          
              let moveX2 = event.clientX
  
              let diffX = moveX2 - startX1
              if (diffX > 0) {
                  moveToLeft()
  
              } 
              else {
                  moveToRight()
  
              }
              startX1 = 0;
      }
  
      function PausedMouse(){
       
            isPaused = true
          console.log(isPaused)
    
      }

        
   // console.log(event.touches[0].pageX)

   const progressBars = document.querySelectorAll(".control-btn")
   const progressBar = document.querySelector(".progress")
   let count = 0;
   let countBars = 0;

  console.log(progressBars[0].childNodes[1])
    function progressBarSwitch(){
            //  console.log(progressBars[0].childNodes[1])
            let interval =  setInterval(() => {
                if (!isPaused){
                    if (count == 102){
                        moveToRight()
                    } else {   
                    progressBars[countBars].childNodes[1].style.width = count +"%";
                    }
                    count += 2;  
                } 
                },Math.round(8*1000/100))
            
        }

   progressBarSwitch()

   
  btnRight.addEventListener("click", moveToRight)
  btnLeft.addEventListener("click", moveToLeft)