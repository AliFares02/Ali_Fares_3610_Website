function calculateBMI() {
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const unit = document.querySelector('input[name="unit"]:checked').value;
  const result = document.getElementById("result");

  if (!height || !weight || height <= 0 || weight <= 0) {
    result.textContent = "Please enter valid height and weight.";
    return;
  }

  let bmi;
  if (unit === "metric") {
    bmi = weight / (height / 100) ** 2;
  } else {
    bmi = (weight / height ** 2) * 703;
  }

  let status = "";
  if (bmi < 18.5) status = "Underweight";
  else if (bmi < 24.9) status = "Normal";
  else if (bmi < 29.9) status = "Overweight";
  else status = "Obese";

  result.textContent = `Your BMI is ${bmi.toFixed(1)} (${status})`;
}

// Dynamically change unit labels
document.querySelectorAll('input[name="unit"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    const isMetric =
      document.querySelector('input[name="unit"]:checked').value === "metric";
    document.getElementById("height-unit").textContent = isMetric ? "cm" : "in";
    document.getElementById("weight-unit").textContent = isMetric ? "kg" : "lb";
  });
});
