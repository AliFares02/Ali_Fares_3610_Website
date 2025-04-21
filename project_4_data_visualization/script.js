// Doughnut Chart - Daily Activity
const doughnutCtx = document.getElementById("doughnutChart").getContext("2d");
const doughnutChart = new Chart(doughnutCtx, {
  type: "doughnut",
  data: {
    labels: ["Sleep", "School", "Homework", "Screen Time", "Exercise", "Other"],
    datasets: [
      {
        label: "Ali Fares' Daily Time",
        data: [7, 6, 2, 4, 2, 3],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Ali's Daily Routine Breakdown",
      },
    },
  },
});

// Horizontal Bar Chart - Subject Scores
const barCtx = document.getElementById("barChart").getContext("2d");
const barChart = new Chart(barCtx, {
  type: "bar",
  data: {
    labels: ["Math", "Science", "History", "English", "Art"],
    datasets: [
      {
        label: "Ali Fares",
        data: [88, 92, 75, 85, 90],
        backgroundColor: "#36A2EB",
      },
    ],
  },
  options: {
    indexAxis: "y",
    plugins: {
      title: {
        display: true,
        text: "Ali's Subject Scores",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
      },
    },
  },
});
