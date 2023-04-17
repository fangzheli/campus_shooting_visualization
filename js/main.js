const desks = document.getElementById("desks");
const right = document.getElementById("right");

// Read the CSV file
fetch("data.csv")
  .then(response => response.text())
  .then(text => {
    const rows = text.trim().split("\n").slice(1); // Trim whitespace and skip header row
    const numRows = rows.length;
    let i = 0;

    // Function to update the simulation for a given row in the CSV
    const updateSimulation = (row) => {
      const values = row.split(",");
      const numDeaths = parseInt(values[1]);
      const description = values[2];

      // Update the simulation
      const numDesks = desks.children.length;
      const numBlackDesks = numDesks - desks.querySelectorAll(".black").length;
      const numNewBlackDesks = Math.min(numBlackDesks, numDeaths);
      const newDesks = document.createDocumentFragment();
      for (let i = 0; i < numNewBlackDesks; i++) {
        const desk = document.createElement("div");
        desk.classList.add("desk", "black");
        newDesks.appendChild(desk);
      }
      desks.appendChild(newDesks);

      // Display the description
      right.innerText = description;
    };

    // Function to move to the next row in the CSV and update the
    const row = rows[i];
    updateSimulation(row);
  
    i++;
    setTimeout(nextRow, 5000); // Wait 5 seconds before moving to the next row
  });
  
  nextRow();



  