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

  // // Attach an event listener to the search input
  // $('#searchInput').on('keyup', function(e) {
  //   const inputValue = $('.alert').find('.expense-description strong').first().text();
  //   console.log(inputValue)
  //   $('.alert').data("name", {description: inputValue})
  //   });

  
})