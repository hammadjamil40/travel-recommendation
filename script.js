let recommendationData = {};

// Fetch recommendation data
fetch("travel_recommendation_api.json")
  .then(res => res.json())
  .then(data => {
    console.log("Recommendation Data:", data); // required
    recommendationData = data;
  })
  .catch(err => console.error("Fetch error:", err));

document.addEventListener("DOMContentLoaded", () => {

  const searchBtn = document.getElementById("searchBtn");
  const resetBtn = document.getElementById("resetBtn");
  const searchInput = document.getElementById("searchInput");
  const resultsDiv = document.getElementById("results");

  if (!searchBtn || !resetBtn || !searchInput || !resultsDiv) {
    console.error("One or more required elements not found in DOM");
    return;
  }

  // CARD RENDER FUNCTION
  function renderCard(place) {
    const card = document.createElement("div");
    card.classList.add("recommendation-card");

    card.innerHTML = `
      <img src="${place.imageUrl}" alt="${place.name}">
      <div class="card-body">
        <h3>${place.name}</h3>
        <p>${place.description}</p>
        <button class="visit-btn">Visit</button>
      </div>
    `;

    resultsDiv.appendChild(card);
  }

  // SEARCH BUTTON LOGIC
  searchBtn.addEventListener("click", () => {
    const keyword = searchInput.value.toLowerCase().trim();
    resultsDiv.innerHTML = "";

    if (!keyword) return;

    let matchedKey = "";

    if (keyword === "beach" || keyword === "beaches") {
      matchedKey = "beaches";
    } else if (keyword === "temple" || keyword === "temples") {
      matchedKey = "temples";
    } else if (keyword === "country" || keyword === "countries") {
      matchedKey = "countries";
    }

    if (!matchedKey || !recommendationData[matchedKey]) {
      resultsDiv.innerHTML = "<p>No recommendations found.</p>";
      return;
    }

    // HANDLE COUNTRIES
    if (matchedKey === "countries") {
      recommendationData.countries.forEach(country => {
        country.cities.forEach(city => {
          renderCard(city);
        });
      });
    } else {
      // BEACHES & TEMPLES
      recommendationData[matchedKey].forEach(place => {
        renderCard(place);
      });
    }
  });

  // CLEAR BUTTON LOGIC
  resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    resultsDiv.innerHTML = "";
  });

});
