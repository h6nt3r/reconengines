document.addEventListener("DOMContentLoaded", function () {
  const generateBtn = document.querySelector(".btn-outline-warning");
  const resetBtn = document.querySelector(".btn-outline-danger");
  const engineSelect = document.getElementById("engine");
  const domainInput = document.getElementById("domain");
  const dorkLinkInput = document.getElementById("dorkLink");
  const dorkList = document.getElementById("dork-list");
  const clearDomainBtn = document.getElementById("clear-domain");
  const clearDorkLinkBtn = document.getElementById("clear-dorkLink");

  // Clear input buttons
  clearDomainBtn.addEventListener("click", () => {
    domainInput.value = "";
  });

  clearDorkLinkBtn.addEventListener("click", () => {
    dorkLinkInput.value = "";
  });

  // Generate dorks
  generateBtn.addEventListener("click", function () {
    const engine = engineSelect.value;
    const domain = domainInput.value.trim();
    const dorkLink = dorkLinkInput.value.trim();

    if (!engine || !domain || !dorkLink) {
      alert("Please fill all fields!");
      return;
    }

    fetch(dorkLink)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch dorks list.");
        }
        return response.text();
      })
      .then((data) => {
        const dorks = data.split("\n").filter((line) => line.trim() !== "");
        dorkList.innerHTML = "";

        dorks.forEach((dork) => {
        // 🔥 Replace example.com with actual domain input
        const replacedDork = dork.replace(/example\.com/gi, domain);

        const wrapper = document.createElement("div");
        wrapper.className = "dork-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const link = document.createElement("a");
        link.href = engine + encodeURIComponent(replacedDork);
        link.target = "_blank";
        link.textContent = replacedDork;

        wrapper.appendChild(checkbox);
        wrapper.appendChild(link);

        // ✅ Whole row toggles checkbox (except link/checkbox itself)
        wrapper.addEventListener("click", (e) => {
          if (e.target.tagName !== "INPUT" && e.target.tagName !== "A") {
            checkbox.checked = !checkbox.checked;
          }
        });

        dorkList.appendChild(wrapper);
      });

        dorkList.classList.remove("d-none");
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  });

  // Reset inputs
  resetBtn.addEventListener("click", function () {
    engineSelect.value = "";
    domainInput.value = "";
    dorkLinkInput.value = "";
    dorkList.innerHTML = "";
    dorkList.classList.add("d-none");
  });

  // ✅ Check the checkbox when link is clicked, while still opening normally
  document.addEventListener("click", function (e) {
    if (e.target.tagName === "A" && e.target.closest(".dork-item")) {
      let checkbox = e.target.closest(".dork-item").querySelector('input[type="checkbox"]');
      if (checkbox) {
        checkbox.checked = true;
      }
    }
  });
});
