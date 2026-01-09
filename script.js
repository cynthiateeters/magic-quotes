// This function loads fortunes from a JSON file and initializes the fortunes array
let fortunes = [];

fetch('fortunes.json')
  .then(response => response.json())
  .then(data => {
    fortunes = data;
  })
  .catch(error => console.error('Error loading fortunes:', error));

// This function picks a random fortune and shows it on the page
function tellFortune() {
  if (fortunes.length === 0) {
    console.warn('Fortunes data has not loaded yet.');
    return;
  }

  const randomIndex = Math.floor(Math.random() * fortunes.length);
  const selectedFortune = fortunes[randomIndex];

  // Display the fortune on the page
  const fortuneElement = document.getElementById("fortune");
  fortuneElement.textContent = selectedFortune;
}
