const audioElement = document.getElementById("audio");
const button = document.getElementById("button");

// Toggle button
const toggleBtn = () => {
  button.disabled = !button.disabled;
};

// Get Joke from api
const getJokes = async () => {
  const apiUrl = "https://v2.jokeapi.dev/joke/Programming,Dark,Pun";
  // const apiUrl = "https://v2.jokeapi.dev/joke/Programming"; // Purely Programming Jokes
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    let joke =
      data.type === "twopart" ? data.setup + ", " + data.delivery : data.joke;
    // Text-to-speech
    tellMeAJoke(joke);
    // Disable Button
    toggleBtn();
  } catch (error) {
    alert(error);
  }
};

// Plays the joke received as audio
const tellMeAJoke = (joke) => {
  VoiceRSS.speech({
    key: "6bc7743bdda34d4f8ebda6d537da1ae2",
    src: joke,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

// Plays the joke after button click
button.addEventListener("click", () => {
  getJokes();
});

audioElement.addEventListener("ended", toggleBtn);
