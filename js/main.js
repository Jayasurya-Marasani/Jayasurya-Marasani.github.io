document.addEventListener("DOMContentLoaded", function () {
    /* -----------------------------------------
     Background Image Setup
     ----------------------------------------- */
    // Fetch the directory listing from the search_images folder.
    fetch("images/search_images/")
        .then(response => response.text())
        .then(html => {
            // Create a temporary DOM element to parse the HTML
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, "text/html");
            // Get all anchor elements from the directory listing
            let anchors = Array.from(doc.querySelectorAll("a"));
            // Filter links that point to image files (adjust extensions as needed)
            let imageFiles = anchors
                .map(a => a.getAttribute("href"))
                .filter(href => /\.(jpe?g|png|gif|webp)$/i.test(href));

            if (imageFiles.length > 0) {
                // Randomly select one image from the folder
                let randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
                // If randomImage already starts with '/', use it directly; otherwise, prepend the folder path.
                let imageUrl = randomImage.startsWith("/")
                  ? randomImage
                  : `/images/search_images/${randomImage}`;
                document.body.style.backgroundImage = `url(${imageUrl})`;
            } else {
                console.error("No background images found in the folder.");
            }
        })
        .catch(error => {
            console.error("Error fetching background images:", error);
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
