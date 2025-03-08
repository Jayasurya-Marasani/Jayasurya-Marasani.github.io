document.addEventListener("DOMContentLoaded", function () {
  /* -----------------------------------------
     Background Image Setup using JSON
     ----------------------------------------- */
  fetch("images/search_images/images.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch images.json: " + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      const imageFiles = data.files;
      if (imageFiles && imageFiles.length > 0) {
        const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
        // Construct the relative path from the HTML file to the image
        document.body.style.backgroundImage = `url("images/search_images/${randomImage}")`;
      } else {
        console.error("No background images found in images.json.");
      }
    })
    .catch(error => {
      console.error("Error loading images.json:", error);
    });

  /* -----------------------------------------
     Search Suggestions Setup
     ----------------------------------------- */
  const searchInput = document.getElementById("searchInput");
  const suggestionsBox = document.getElementById("suggestionsBox");
  const suggestionsList = document.getElementById("suggestionsList");

  // Listen for input events to fetch suggestions
  searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim();
    if (query.length > 0) {
      fetchSuggestions(query);
    } else {
      suggestionsBox.style.display = "none";
    }
  });

  // Fetch suggestions from Google Suggest API using a CORS proxy
  function fetchSuggestions(query) {
    const url =
      "https://thingproxy.freeboard.io/fetch/https://suggestqueries.google.com/complete/search?client=chrome&q=" +
      encodeURIComponent(query);
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok: " + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data && data.length > 1) {
          const suggestions = data[1];
          showSuggestions(suggestions);
        } else {
          suggestionsBox.style.display = "none";
        }
      })
      .catch(error => {
        console.error("Error fetching suggestions:", error);
        suggestionsBox.style.display = "none";
      });
  }

  // Display suggestions in the dropdown
  function showSuggestions(suggestions) {
    suggestionsList.innerHTML = "";
    if (suggestions.length === 0) {
      suggestionsBox.style.display = "none";
      return;
    }
    suggestions.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      li.addEventListener("click", function () {
        searchInput.value = item;
        document.getElementById("searchForm").submit();
      });
      suggestionsList.appendChild(li);
    });
    suggestionsBox.style.display = "block";
  }

  // Hide suggestions when clicking outside the search container
  document.addEventListener("click", function (e) {
    if (!document.querySelector(".search-container").contains(e.target)) {
      suggestionsBox.style.display = "none";
    }
  });
});
