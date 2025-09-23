const db = firebase.database();
const zoneGrid = document.getElementById("zoneGrid");

function renderZones(seatData) {
  zoneGrid.innerHTML = "";

  Object.entries(seatData).forEach(([zone, isOccupied]) => {
    const zoneBox = document.createElement("div");
    zoneBox.className = `zone-box ${isOccupied ? "occupied" : "free"}`;
    zoneBox.innerHTML = `
      <h4>${zone.replace("-", " ")}</h4>
      <p>${isOccupied ? "Occupied" : "Available"}</p>
      ${!isOccupied ? `<button onclick="reserveSeat('${zone}')">Reserve</button>` : ""}
    `;
    zoneGrid.appendChild(zoneBox);
  });
}

// Live updates
db.ref("seats").on("value", (snapshot) => {
  if (snapshot.exists()) {
    renderZones(snapshot.val());
  }
});

function reserveSeat(zone) {
  alert(`Seat in ${zone} reserved! (This will link to booking logic soon.)`);
}
