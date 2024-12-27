const flexbox = document.getElementsByClassName("flexbox")
console.log(flexbox)

const games = document.getElementById("game")
console.log(games)

const mainlist = document.getElementById("mainlist")

const mainBox = document.getElementById("mainBox")

const sample = document.getElementById("sample")

const foodBox = document.getElementById("foodbox")

const gamesByTag = document.getElementsByTagName("li")
console.log(gamesByTag)

console.log(games.innerText)

// // ID value
// games.innerText = 'I changed it inside'

console.log(flexbox[1].innerHTML)

// Used for changing structure of the body
// flexbox[0].innerHTML = "<h3>" + flexbox[0].innerText +"</h3>"

for (let a = 0; a < flexbox.length; a++) {
    // 3. Get the value of an attribute
    // console.log(flexbox[a].getAttribute("id"))
  
    // 4. Modify the value of an attribute
    // element.attribute = new value 
    flexbox[a].style = "color: white;"
    // games[a].style.color= "blue"  // this also works
}

// Dapat ID para gumana ang pag append ng child?
// mainlist.appendChild(sample)
mainBox.appendChild(mainlist)
// mainBox.appendChild(mainlist)
// mainBox.appendChild(mainlist)
console.log(mainlist)

const add = (event) =>{
    event.preventDefault()
    // console.log(foodBox.innerHTML)
    const foodone = document.getElementById("food1").value
    const foodtwo = document.getElementById("food2").value

    console.log(foodone.value)
    console.log(foodtwo.value)

    const clone = mainlist.cloneNode(true); // `true` clones child nodes too
    clone.id = ".toString()"; // Assign unique IDs

    console.log(clone)
    clone.innerHTML= `<b id="sample"><li id="game">Menu:</li><ol id="firstFood">${foodone}</ol><ol id="secondFood">${foodtwo}</ol></b>`;    
    mainBox.appendChild(clone);
    // alert("foodBox.food1")
}

