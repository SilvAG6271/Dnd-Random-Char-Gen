var dndApi = "https://www.dnd5eapi.co/api/"
var generateBtn = document.querySelector("#generate-btn")
raceArray = ["dragonborn","dwarf","elf","gnome","half-elf","half-orc","halfling","human","tiefling"];
classArray = ["barbarian", "bard", "cleric", "druid", "fighter", "monk", "paladin", "ranger", "rogue", "sorcerer", "warlock", "wizard"];
var saveBtn = document.querySelector("#save-btn");
var resetBtn = document.querySelector("#reset-btn");
var characterProfile = {
    
}
var info = document.querySelector("info");
var profileSection = document.querySelector("#profile-section");
var infoEl = document.querySelector("#info");
var storedCharacter =[ ]
var savedCharacters = [ ]


//get class API
function getClass() {
    var classRandom = classArray[Math.floor(Math.random()*classArray.length)];
    
    const classes = dndApi + "classes/" + classRandom 
    fetch(classes)
    .then(function (response) {
        response.json().then(function (data) {
      
        //populate class random into class input
        var classEl = document.querySelector("#class-El")
        classEl.textContent = data.index;
        // localStorage.setItem('character class', data.index);
        characterProfile.class = data.index;
        classEl.textContent = upperCase(data.index);
      

        
        
          getRace();
        });
      });
    }
  // Generate random numbers for stats

function getStats(){
  var stats = {
    attack: getRandomNumber(1, 20),
    defense: getRandomNumber(1, 20),
    dexterity: getRandomNumber(1, 20),
    charisma: getRandomNumber(1, 20),
    constitution: getRandomNumber(1, 20)
  };
  characterProfile.stats = stats;

  // Populate the stats inputs with the generated numbers
  document.querySelector("#attack-input").value = stats.attack;
  document.querySelector("#defense-input").value = stats.defense;
  document.querySelector("#dexterity-input").value = stats.dexterity;
  document.querySelector("#charisma-input").value = stats.charisma;
  document.querySelector("#constitution-input").value = stats.constitution;
  
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
  
// generate race
function getRace(){
    var raceRandom = raceArray[Math.floor(Math.random()*raceArray.length)];
    const races = dndApi + "races/" + raceRandom 
    fetch(races)
    .then(function (response) {
        response.json().then(function (data) {
            var raceEl = document.querySelector("#race-El")
            characterProfile.race = data.index;
            raceEl.textContent = upperCase(data.index);
// created an object with all the images as values
            var raceImages = {
              dragonborn: "assets/Dragonborn.jpg",
              dwarf:"assets/Dwarf.jpg",
              elf:"assets/Elf.png",
              gnome:"assets/Gnome.jpg",
              "half-elf":"assets/Half-elf.jpg",
              "half-orc":"assets/half-orc.jpg",
               halfling:"assets/halfling.jpg",
              human:"assets/human.jpg",
              tiefling:"assets/tiefling.png"
            };
// created function to hide all other pictures, basically hide the images til choice is picked from index             
                var allImages = document.querySelectorAll("#race-image img");
                allImages.forEach(function(img){
                  img.style.display = "none";
                });
//attaches image to chosen index from API and appends it to HTML               
                var imageR = raceImages[data.index];
        
                var img = document.getElementById(data.index);

                if (!img) {
                  img = document.createElement("img");
                  img.id = data.index;
                  img.src = imageR;
                  img.alt = data.Index;
                  document.getElementById("race-image").appendChild(img)
                }
               

//sets some styling to image                
                img.style.display = "block";
                img.width = 200;
                img.style.border = "10px silver groove"
                img.style.borderRadius = "80px 80px 80px 80px"        
                img.style.boxShadow = "0px 0px 25px blue"                                    
      })


            
})
    }

  function persistentCharacterRendering (){
      var characterData = JSON.parse(localStorage.getItem("characters"));
      if (characterData)
        storedCharacter = characterData
        displayCharacterOnPage();
    }
// generate random name
    
function generateRandomName() {
    var apiUrl = "https://randomuser.me/api/";
    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var firstName = data.results[0].name.first;
        var characterNameEl = document.querySelector("#name-El");
        characterNameEl.textContent = firstName;
        characterProfile.name = firstName;

        })
};
  
 function displayCharacterOnPage (){
    infoEl.innerHTML = " "
    var displayCharacter = JSON.parse(localStorage.getItem("characters"));
for (let i = 0; i < displayCharacter.length; i++) {
  var displayCharacterName = document.createElement("section");
  var displayCharacterClass = document.createElement("section");
  var displayCharacterRace = document.createElement("section");
  var displayCharacterStats = document.createElement("section");
  var displayCharacterAttack = document.createElement("section");
  var displayCharacterDefense = document.createElement("section");
  var displayCharacterDexterity = document.createElement("section");
  var displayCharacterCharisma = document.createElement("section");
  var displayCharacterConstitution = document.createElement("section");
  displayCharacterConstitution.classList.add("pad-btm");
displayCharacterName.textContent = `Name: ${displayCharacter[i].name}`
displayCharacterClass.textContent = `Class: ${displayCharacter[i].class}`
displayCharacterRace.textContent = `Race: ${displayCharacter[i].race}`
displayCharacterStats.textContent = `Stats: `
displayCharacterAttack.textContent = `Attack: ${displayCharacter[i].stats.attack}`
displayCharacterDefense.textContent = `Defense: ${displayCharacter[i].stats.defense}`
displayCharacterDexterity.textContent = `Dexterity: ${displayCharacter[i].stats.dexterity}`
displayCharacterCharisma.textContent = `Charisma: ${displayCharacter[i].stats.charisma}`
displayCharacterConstitution.textContent = `Constitution: ${displayCharacter[i].stats.constitution}`
infoEl.appendChild(displayCharacterName);
infoEl.appendChild(displayCharacterClass);
infoEl.appendChild(displayCharacterRace);
infoEl.appendChild(displayCharacterStats);
infoEl.appendChild(displayCharacterAttack);
infoEl.appendChild(displayCharacterDefense);
infoEl.appendChild(displayCharacterDexterity);
infoEl.appendChild(displayCharacterCharisma);
infoEl.appendChild(displayCharacterConstitution);
document.getElementById("profile-section").style.visibility ="visible";



}
    
    


  }


  


        //create generate button

        generateBtn.addEventListener("click", function () {
          document.getElementById("race-image").style.visibility ="visible";
            generateRandomName();
            getClass();
            getRace();
            getStats();
          
          });


//Get name, class, race, and all stats
saveBtn.addEventListener("click", function(){
  savedCharacters = JSON.parse(localStorage.getItem("characters"))||[]
  let character = characterProfile
  savedCharacters.push(character)
  console.log(savedCharacters);
  localStorage.setItem("characters", JSON.stringify(savedCharacters))
  
  displayCharacterOnPage();

 
});

resetBtn.addEventListener("click", function(){
  localStorage.clear();
  document.getElementById("profile-section").style.visibility ="hidden";
  document.getElementById("race-image").style.visibility ="hidden";
})

  

// on click reveal form with name, class, race, and stats (maybe sliced)


function upperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

persistentCharacterRendering();
displayCharacterOnPage();



// function clearInfo() {
//   document.getElementById("name-El").value = "";
//   document.getElementById("class-El").value = "";
//   document.getElementById("race-El").value = "";
//   document.getElementById("attack-input").value = "";
//   document.getElementById("defense-input").value = "";
//   document.getElementById("dexterity-input").value = "";
//   document.getElementById("charisma-input").value = "";
//   document.getElementById("constitution-input").value = "";
// }

//  saveBtn.addEventListener("click", function(){
//    clearInfo()
//});

