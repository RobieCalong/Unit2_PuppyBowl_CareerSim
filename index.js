const API_URL =
  "https://fsa-puppy-bowl.herokuapp.com/api/2503-ftb-et-web-am/players";

/*
players object
"id": 123,
"name": "Crumpet",
"breed": "American Staffordshire Terrier",
"status": "bench",
"imageUrl": "http://r.ddmcdn.com/w_1012/s_f/o_1/cx_0/cy_0/cw_1012/ch_1518/APL/uploads/2019/12/Crumpet-PBXVI.jpg",
"teamId": 456
*/

//dog pic Ducan
//https://r.ddmcdn.com/w_1012/s_f/o_1/cx_0/cy_49/cw_1012/ch_1518/APL/uploads/2020/01/Duncan-PBXVI-v2.jpg
//from this website
//https://puppybowl-react-gl.netlify.app/

//static data for testing purposes
const state = {
    dogs: [],
    dogsData: [], 
    dog: {

    }
}

window.addEventListener('hashchange', selectDog)

//display specific dog based on #id :: example #1002939
function selectDog() {
  //id will just be a number excluding the #sign
  const id = window.location.hash.replace("#", "");
  // console.log(id);

  //if id is empty display no dog
  if (!id) {
    document.querySelector(".dog-container").innerHTML = "";
  } else {
    const sDog = state.dogsData.find((dog) => dog.id == id);
    // console.log(typeof sDog);
    state.dog = sDog

    renderPuppyDetails(sDog);
  }
}

//CRUD operation GET using fetch API
async function getAllDogs() {
    try {
        const response = await fetch(`${API_URL}`)
        // console.log(response)
        const json = await response.json()
        // const data = json.data           
        //can also be written using de-structuring
        const { data } = json
        // console.log(data)

        state.dogsData = data.players
        //display 2nd dog
        console.log(state.dogsData)

        renderAllDogs()
    } catch (error) {
        console.log(error.message)
    }
}

//display all dogs in the roster section
function renderAllDogs() {
    const puppyRosterContainer = document.querySelector('.puppy-roster')
    //re-sets the puppy roster to empty
    puppyRosterContainer.innerHTML = ""

    const { dogsData } = state
    // console.log(dogsData);

    dogsData.forEach((dog) => {
      const dogDiv = document.createElement("div");
      dogDiv.classList.add("dog-div");

      const puppyName = document.createElement('div')
      puppyName.classList.add("puppyName")
      puppyName.addEventListener("click", () => {
        //set the hash property with dog.id
        window.location.hash = dog.id;
        console.log(window.location.hash);

        renderPuppyDetails(dog);
      });
      puppyName.innerText = `${dog.name}`;

      const puppyRemove = document.createElement('div')
      puppyRemove.classList.add("puppyRemove")
      puppyRemove.addEventListener('click', async () => {
        console.log('remove puppy')
        console.log(dog.id)
        console.log(this)
        await removeDog(dog.id)
      })
      puppyRemove.innerText = "REMOVE"

      dogDiv.append(puppyName)
      dogDiv.append(puppyRemove)

      puppyRosterContainer.append(dogDiv);
    });
    console.log(puppyRosterContainer)
}

//display on the right section a specific dog details 
function renderPuppyDetails(dog) {
    const dogContainerDetails = document.querySelector('.dog-container')

    const img = document.createElement('img')
    img.src = `${dog.imageUrl}`;

    const dogBio = document.createElement('div')
    const name = document.createElement("span")
    const breed = document.createElement("span")
    const status = document.createElement("span")
    const teamId = document.createElement("span")
    name.innerText = `Name: ${dog.name}`
    breed.innerText = `Breed: ${dog.breed}`
    status.innerText = `Status: ${dog.status}`
    teamId.innerText = `teamId: ${dog.teamId}`
    dogBio.classList.add('dog-bio')
    dogBio.append(name, breed, status, teamId)

    const closeButton = document.createElement('a')
    closeButton.classList.add('close-button')
    closeButton.innerText = 'Close'
    // sets the hash to empty when you click the closeButton to simulate going to homepage
    closeButton.addEventListener('click', () => {
      window.location.hash = ''
      // console.log(window.location.hash); 
    })

    dogContainerDetails.replaceChildren(img, dogBio, closeButton)
    // console.dir(dogContainerDetails)
}

//collects data input from Form for POST CRUD operation
async function processFormData() {
  const form = document.querySelector("#form-puppy-invite");

  //                              //static data for TESTING purposes
  // const staticData = {
  //   name: "BrownyJames",
  //   breed: "BrownKind",
  //   status: "field",
  //   imageUrl:
  //     "https://r.ddmcdn.com/w_1012/s_f/o_1/cx_0/cy_49/cw_1012/ch_1518/APL/uploads/2020/01/Duncan-PBXVI-v2.jpg",
  //   teamId: 281,
  //   cohortId: 2503,
  // };
  // //returns an array of key value pair
  // // console.log(Object.entries(staticData))

  // const formData = new FormData();

  // for (let [key, value] of Object.entries(staticData)) {
  //   formData.append(`${key}`, `${value}`);
  // }
  // //console formData key/value pair
  // for (let [key, value] of formData.entries()) {
  //   console.log(`${key} : ${value}`);
  // }

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault()

    try {
      const formData = new FormData(form)
    
      //API https://fsa-puppy-bowl.herokuapp.com/api/#tag/Players/paths/~1players/post
      //does not accept formData so i have to convert it to jsonData
      const jsonData = Object.fromEntries(formData.entries());
    
      await passFormDataToPOST(jsonData);
      
    } catch (error) {
      console.log(error.message)
    }
  })

}
async function passFormDataToPOST(jsonData) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      // body: formData,
      body: JSON.stringify(jsonData),
      headers: {"Content-Type": "application/json"},
    });
    // console.log(await response.json());

    await getAllDogs();

  } catch (error) {
    console.log(error.message);
  }
}

//CRUD operation for DELETE dog
async function removeDog(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })

    if(!response.ok) {
      console.log(response.error)
    }

    //checks status of fetch
    console.log(response.status)
    console.log("removed dog successful")

    //when 'DELETE' dog is successful; it fetches all dogs and renders
    await getAllDogs()

  } catch (error) {
    console.log(error.message)
  }
}

 async function initialize() {
   await processFormData()
   await getAllDogs();
}

initialize()