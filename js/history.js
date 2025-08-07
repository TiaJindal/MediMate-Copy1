// Medical history functionality
document.addEventListener("DOMContentLoaded", function () {
  // Export functionality
  const exportButtons = document.querySelectorAll(".export-btn");
  exportButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const action = this.textContent.trim();
      alert(`${action} action initiated!`);
      // In a real app, this would trigger the respective export function
    });
  });

  // Add symptom functionality
  const addSymptomButton = document.getElementById("add-symptom");
  if (addSymptomButton) {
    addSymptomButton.addEventListener("click", function () {
      alert("Symptom tracking feature would open here");
      // In a real app, this would open a symptom tracking interface
    });
  }
});
