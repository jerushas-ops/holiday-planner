$(document).ready(function() {
  // Enable/disable date & time inputs when activities are checked
  $('.activity').on('change', function() {
    const activityId = $(this).attr('id');
    const dateInput = $(`.activity-date[data-for="${activityId}"]`);
    const timeInput = $(`.activity-time[data-for="${activityId}"]`);

    if ($(this).is(':checked')) {
      dateInput.prop('disabled', false);
      timeInput.prop('disabled', false);
    } else {
      dateInput.prop('disabled', true).val('');
      timeInput.prop('disabled', true).val('');
    }

    updateBudget();
  });

  // Budget calculator
  function updateBudget() {
    let hotel = parseInt($('#hotel').val()) || 0;
    let transport = parseInt($('#transport').val()) || 0;
    let activities = 0;
    $('.activity:checked').each(function() {
      activities += parseInt($(this).val());
    });
    $('#budget').text(hotel + transport + activities);
  }

  // Generate Itinerary
  function generateItinerary() {
    let destination = $('#destination').val();
    let hotelText = $("#hotel option:selected").text();
    let transportText = $("#transport option:selected").text();
    let activitiesList = [];

    $('.activity:checked').each(function() {
      const activityName = $(this).next('label').text();
      const date = $(`.activity-date[data-for="${$(this).attr('id')}"]`).val();
      const time = $(`.activity-time[data-for="${$(this).attr('id')}"]`).val();
      activitiesList.push(`${activityName} on ${date || "unspecified date"} at ${time || "unspecified time"}`);
    });

    let itineraryText =
      `Destination: ${destination}\n` +
      `Hotel: ${hotelText}\n` +
      `Transport: ${transportText}\n` +
      `Activities:\n- ${activitiesList.join('\n- ')}`;

    $('#itinerary').val(itineraryText);
  }

  // Update budget on changes
  $('#hotel, #transport').on('change', updateBudget);

  // Generate itinerary button
  $('#generateTrip').on('click', function() {
    if ($('#destination').val() === "") {
      alert("Please select a destination");
      return;
    }
    generateItinerary();
    updateBudget();
    alert("Trip generated successfully!");
  });
});
