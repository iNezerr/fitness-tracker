// script.js

$(document).ready(function() {
  // Sample exercises
  var exercises = {
      'Squats': 0,
      'Push-ups': 0,
      'Lunges': 0
      // Add more exercises here
  };

  // Workout Logging Form Submission
  $('#workoutForm').submit(function(event) {
      event.preventDefault();

      // Get input values
      var exercise = $('#exerciseSelect').val();
      var sets = parseInt($('#setsInput').val());
      var reps = parseInt($('#repsInput').val());
      var weight = parseInt($('#weightInput').val());
      var duration = parseInt($('#durationInput').val());

      // Validate input
      if (exercise === "Select Exercise" || isNaN(sets) || isNaN(reps) || isNaN(duration)) {
          alert("Please fill in all fields with valid numbers.");
          return;
      }

      // Update exercise count
      exercises[exercise] += sets * reps * (weight || 1);

      // Clear form fields
      $('#workoutForm')[0].reset();

      // Update progress chart
      updateProgressChart();
  });

  // Weight Tracking Form Submission
  $('#weightForm').submit(function(event) {
      event.preventDefault();

      // Get input values
      var weight = parseInt($('#weightInput').val());
      var date = $('#dateInput').val();

      // Validate input
      if (isNaN(weight) || date === "") {
          alert("Please fill in all fields.");
          return;
      }

      // Clear form fields
      $('#weightForm')[0].reset();

      // Update progress chart
      updateProgressChart();
  });

  // Function to update progress chart
  function updateProgressChart() {
      // Get exercise labels and data
      var exerciseLabels = Object.keys(exercises);
      var exerciseData = Object.values(exercises);

      // Create progress chart
      var ctx = document.getElementById('progressChart').getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: exerciseLabels,
              datasets: [{
                  label: 'Progress',
                  data: exerciseData,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)'
                      // Add more colors if needed
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)'
                      // Add more colors if needed
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
  }
});
