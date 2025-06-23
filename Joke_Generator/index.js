const btnEl = document.getElementById("btn");
const jokeEl = document.getElementById("joke");
const apiKey = config.MY_KEY;
const options = {
    method:"GET",
    headers: {
        "X-Api-key": apiKey,
    },
}
const apiURL ="https://api.api-ninjas.com/v1/dadjokes?limit=";
async function getJoke() {
    try {
        jokeEl.innerText = "Updating...";
        btnEl.disabled = true;
        btnEl.innerText = "Loading";
        const response = await fetch(apiURL, options);
        const data = await response.json();
        jokeEl.innerText = data[0].joke;
        btnEl.disabled = false;
        btnEl.innerText = "Tell Me a Joke";
    } catch (error) {
        jokeEl.innerText = "An error occurend. Try Again Later";
         btnEl.disabled = false;
        btnEl.innerText = "Tell Me a Joke";
    }

}


btnEl.addEventListener("click",getJoke);


