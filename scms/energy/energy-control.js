// Demo data (replace with Firebase later)
const demoRooms = [
    { room: "Lecture Hall 1", lights: true, ac: false, last: "2h ago", occupancy: "Occupied" },
    { room: "Lab 2", lights: true, ac: true, last: "5h ago", occupancy: "Empty" },
    { room: "Library", lights: false, ac: true, last: "1h ago", occupancy: "Occupied" }
];

// Populate table
const deviceTable = document.getElementById("deviceTable");
deviceTable.innerHTML = demoRooms.map(r => `
  <tr>
    <td>${r.room}</td>
    <td><input type="checkbox" ${r.lights ? "checked" : ""}></td>
    <td><input type="checkbox" ${r.ac ? "checked" : ""}></td>
    <td>${r.last}</td>
    <td>${r.occupancy}</td>
  </tr>
`).join("");

// Charts
const ctx1 = document.getElementById("usageChart").getContext("2d");
new Chart(ctx1, {
    type: "bar",
    data: {
        labels: ["Lecture Hall 1", "Lab 2", "Library"],
        datasets: [
            { label: "Occupied Hours", data: [6, 4, 8], backgroundColor: "#2563eb" },
            { label: "Device ON Hours", data: [8, 12, 10], backgroundColor: "#d32f2f" }
        ]
    }
});

const ctx2 = document.getElementById("energyChart").getContext("2d");
new Chart(ctx2, {
    type: "line",
    data: {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
        datasets: [{ label: "Energy Saved (kWh)", data: [1, 2, 1.5, 2.5, 3, 2, 3.5], borderColor: "#16a34a", fill: false }]
    }
});

const ctx3 = document.getElementById("wasteChart").getContext("2d");
new Chart(ctx3, {
    type: "pie",
    data: {
        labels: ["Wasted", "Saved"],
        datasets: [{ data: [60, 40], backgroundColor: ["#d32f2f", "#16a34a"] }]
    }
});

// Alerts
const alertsList = document.getElementById("alertsList");
alertsList.innerHTML = `
  <li>
    <span>Lab 2 lights ON 12h but occupied only 4h → 8h wasted</span>
    <span class="alert-badge badge-danger">Wasted</span>
  </li>
  <li>
    <span>Lecture Hall 1 saved ~3.2 kWh due to manual intervention</span>
    <span class="alert-badge badge-success">Saved</span>
  </li>
`;

