$(document).ready(function(){

  $("#tracker").submit(function(e){
    e.preventDefault()

    $.ajax({
      type: 'POST',
      url: `/tracker`,
      contentType: 'application/json',
      data: JSON.stringify({
        description: $('#description').val().toLowerCase(),
        amount: Number($('#amount').val())
      }),
      success: function(response){
        console.log(response);
        window.location.reload();
      },
      error: function(err){
        console.log(error)
      }
    })

    $('#description').val("")
    $('#amount').val("")
  })
    

  $("#addForm").on("click", () => {
    let insidebtn = $("#addForm").text()
    if(insidebtn == "ADD"){
      $("#addForm").text("CANCEL")
    } else {
      $("#addForm").text("ADD")
    }
  })

   // Attach click event handler to the svg element inside .expense-action
   $('.expense-action svg').click(function() {
    // Find the closest parent div with class "alert"
    var alertDiv = $(this).closest('.alert');

    // Find the <strong> element inside the .expense-description within the same parent div
    var description = alertDiv.find('.expense-description strong').text();

    // Display the strong text in the console or use it as needed
    console.log("Strong text: " + description);

    $.ajax({
      type: 'post',
      url : '/' + description,
      success: function(response) {
        console.log('Element deleted successfully');
        // Reload the page
        window.location.reload();
    }
    })

  });

  // Attach an event listener to the search input
  $('#searchInput').on('keyup', function(e) {
    if(e.key === "Enter" && $(this).val() !== ""){
      const inputValue = $(this).val();
      console.log(inputValue);

      $.ajax({
        type: 'GET',
        url: '/expense/' + inputValue,
        success: function(response){
          console.log('Element caught successfully!')

          $('.expense-list').html(`
          <div class="alert alert-white border d-flex justify-content-between">
          
            <div class="expense-description"><strong>${response.description}</strong></div>
            <div class="amount-tracker">${response.amount}</div>
            <div class="expense-action">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>
            </div>
          </div>
          `)
        },
        error: function(xhr) {
          $('.expense-list').html('<p>Description not found.</p>');
      }
      })
    } 
    
    });

    

})