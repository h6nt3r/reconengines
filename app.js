document.addEventListener("DOMContentLoaded", () => {
  const engineSelect = document.getElementById("engine");
  const domainInput = document.getElementById("domain");
  const dorkLinkInput = document.getElementById("dorkLink");
  const generateBtn = document.querySelector(".btn-outline-warning");
  const resetBtn = document.querySelector(".btn-outline-danger");
  const dorkList = document.getElementById("dork-list");

  // Clear buttons
  document.getElementById("clear-domain").addEventListener("click", () => {
    domainInput.value = "";
  });

  document.getElementById("clear-dorkLink").addEventListener("click", () => {
    dorkLinkInput.value = "";
  });

  // Generate button logic
  generateBtn.addEventListener("click", async () => {
    const engine = engineSelect.value.trim();
    const domain = domainInput.value.trim();
    const dorkLink = dorkLinkInput.value.trim();

    // Validation: do not clear other fields if one is empty
    if (!engine || !domain || !dorkLink) {
      alert("Please fill in all fields before generating!");
      return;
    }

    try {
      const response = await fetch(dorkLink);
      if (!response.ok) throw new Error("Failed to fetch dorks");
      const text = await response.text();
      const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");

      dorkList.innerHTML = "";
      lines.forEach(line => {
        const query = line.replace(/example\.com/g, domain);

        // wrapper div
        const wrapper = document.createElement("div");
        wrapper.className = "dork-item d-flex align-items-center mb-2";

        // checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-check-input me-2";

        // link
        const link = document.createElement("a");
        link.href = engine + encodeURIComponent(query);
        link.target = "_blank";
        link.className = "btn btn-option flex-grow-1";
        link.textContent = query;

        // assemble
        wrapper.appendChild(checkbox);
        wrapper.appendChild(link);
        dorkList.appendChild(wrapper);
      });

      dorkList.classList.remove("d-none");
    } catch (err) {
      alert("Error: " + err.message);
    }
  });

  // Reset button logic
  resetBtn.addEventListener("click", () => {
    engineSelect.value = "";
    domainInput.value = "";
    dorkLinkInput.value = "";
    dorkList.innerHTML = "";
    dorkList.classList.add("d-none");
  });
});
