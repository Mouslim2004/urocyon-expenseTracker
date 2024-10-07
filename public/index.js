$(document).ready(function(){

  $("#tracker").submit(function(e){
    e.preventDefault()

    $.ajax({
      type: 'POST',
      url: `/tracker`,
      contentType: 'application/json',
      data: JSON.stringify({
        description: $('#description').val(),
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
  $('#searchInput').on('keypress', function() {
    const filter = $(this).val().toLowerCase(); // Get the search query and convert it to lowercase

    // Loop through all divs with the class 'alert' (each transaction block)
    $('.alert').each(function() {
      // Get the text of the <strong> element and the amount
      const descriptionText = $(this).find('.expense-description strong').text().toLowerCase();
      const amountText = $(this).find('.amount-tracker').text().toLowerCase();

      // Check if the search query matches either the description or the amount
      if (descriptionText.indexOf(filter) > -1 || amountText.indexOf(filter) > -1) {
        $(this).show();  // Show the transaction if there's a match
      } else {
        $(this).hide();  // Hide the transaction if no match
      }
    });
  });
  
})