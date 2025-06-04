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

//static data for testing purposes
const state = {
    dogs: [],
    dogsData: [], 
    dog: {

    }
}

async function getAllDogs() {
    try {
        const response = await fetch(`${API_URL}`)
        // console.log(response)
        const json = await response.json()
        // const data = json.data           
        //can also be written using de-structuring
        const { data } = json
        console.log(data)

        state.dogsData = data.players
        //display 2nd dog
        console.log(state.dogsData)


        renderAllDogs()
    } catch (error) {
        console.log(error.message)
    }
}

async function renderAllDogs() {
    const puppyRosterContainer = document.querySelector('.puppy-roster')

    const { dogsData } = state
    console.log(dogsData);

    dogsData.forEach((dog) => {
      const dogDiv = document.createElement("div");
      dogDiv.classList.add("puppy-name");
      console.dir(dogDiv);
      dogDiv.innerText = `${dog.name}`;

      puppyRosterContainer.append(dogDiv);
    });
    console.log(puppyRosterContainer)
}

 async function initialize() {
     await getAllDogs();
 
}

initialize()