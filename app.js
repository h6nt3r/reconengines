// Function to toggle domain and dork link inputs based on engine and domain values
function toggleInputs() {
    const engine = document.getElementById("engine").value;
    const domain = document.getElementById("domain").value.trim();
    const domainInput = document.getElementById("domain");
    const dorkLinkInput = document.getElementById("dorkLink");

    const isEngineEmpty = !engine;
    const isDomainEmpty = !domain;

    domainInput.disabled = isEngineEmpty;
    domainInput.setAttribute("aria-disabled", isEngineEmpty);
    if (isEngineEmpty) domainInput.value = "";

    dorkLinkInput.disabled = isDomainEmpty;
    dorkLinkInput.setAttribute("aria-disabled", isDomainEmpty);
    if (isDomainEmpty) dorkLinkInput.value = "";
}

// Add event listeners to engine and domain inputs
document.getElementById("engine").addEventListener("change", toggleInputs);
document.getElementById("domain").addEventListener("input", toggleInputs);

// Initial call to set the correct state on page load
toggleInputs();

// Function to show Generated Dorks list
function showGeneratedDorks() {
    const dorkList = document.getElementById("dork-list");
    dorkList.classList.remove("d-none");
}

// Generate button logic
document.querySelector(".btn-outline-warning").addEventListener("click", async () => {
    const engine = document.getElementById("engine").value;
    const domain = document.getElementById("domain").value.trim();
    const dorkLink = document.getElementById("dorkLink").value.trim();
    const dorkList = document.getElementById("dork-list");

    if (!engine) {
        alert("Please select a search engine.");
        return;
    }
    if (!domain || !/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain)) {
        alert("Please enter a valid domain (e.g., example.com).");
        return;
    }
    if (!dorkLink) {
        alert("Please provide a valid dork link.");
        return;
    }

    // Clear previous dorks
    dorkList.innerHTML = "";

    try {
        const response = await fetch(dorkLink);
        if (!response.ok) throw new Error("Failed to fetch dorks.");
        const dorks = (await response.text()).split("\n").filter(dork => dork.trim());
        if (dorks.length === 0) {
            alert("No valid dorks found in the provided link.");
            return;
        }

        // Show Generated Dorks list
        showGeneratedDorks();

// Generate button elements with checkboxes
dorks.forEach((dork, index) => {
    // Replace {domain} placeholder AND any literal "example.com"
    const query = dork.replace(/\{domain\}|example\.com/gi, domain);
    const fullUrl = engine + encodeURIComponent(query);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("d-flex", "align-items-center", "mb-2");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("me-2");
    checkbox.id = `dork-checkbox-${index}`;
    checkbox.setAttribute("aria-label", `Mark dork as visited`);

    const button = document.createElement("button");
    button.classList.add("btn", "btn-option");
    button.innerHTML = `<small>${query}</small>`;
    button.setAttribute("aria-label", `Search dork: ${query}`);
    button.addEventListener("click", () => {
        checkbox.checked = true;
        window.open(fullUrl, "_blank");
    });

    buttonContainer.appendChild(checkbox);
    buttonContainer.appendChild(button);
    dorkList.appendChild(buttonContainer);
});


    } catch (error) {
        alert("Error fetching dorks: " + error.message);
    }
});

// Reset button logic
document.querySelector(".btn-outline-danger").addEventListener("click", () => {
    document.getElementById("engine").value = "";
    document.getElementById("domain").value = "";
    document.getElementById("dorkLink").value = "";
    document.getElementById("dork-list").innerHTML = "";
    document.getElementById("dork-list").classList.add("d-none");
    toggleInputs();
});
document.getElementById("clear-domain").addEventListener("click", () => {
    document.getElementById("domain").value = "";
    toggleInputs();
});

document.getElementById("clear-dorkLink").addEventListener("click", () => {
    document.getElementById("dorkLink").value = "";
    toggleInputs();
});