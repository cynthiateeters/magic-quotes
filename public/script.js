// Load manifest first to get list of data files
let allEntries = [];

fetch("manifest.json")
  .then((response) => response.json())
  .then((manifest) => {
    console.log(`Loading ${manifest.dataFiles.length} data files...`);

    // Load all data files listed in manifest
    return Promise.all(
      manifest.dataFiles.map((file) =>
        fetch(file)
          .then((response) => response.json())
          .then((data) => {
            console.log(
              `Loaded ${data.author}: ${data.entries.length} entries`,
            );
            // Include author with each entry for attribution
            return data.entries.map((entry) => ({
              ...entry,
              author: data.author,
            }));
          }),
      ),
    );
  })
  .then((entriesArrays) => {
    // Flatten all entries into single array
    allEntries = entriesArrays.flat();
    console.log(`Total quotes available: ${allEntries.length}`);
  })
  .catch((error) => console.error("Error loading quotes:", error));

// Display a random quote
function tellFortune() {
  if (allEntries.length === 0) {
    console.warn("Quotes data has not loaded yet.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * allEntries.length);
  const selectedEntry = allEntries[randomIndex];

  const fortuneElement = document.getElementById("fortune");
  const quoteText = fortuneElement.querySelector(".quote-text");
  const quoteAttribution = fortuneElement.querySelector(".quote-attribution");

  // Remove empty class and update content safely (textContent prevents XSS)
  fortuneElement.classList.remove("empty");
  quoteText.textContent = selectedEntry.text;
  quoteAttribution.textContent = `— Contributed by ${selectedEntry.author}`;
}
