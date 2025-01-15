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
    

  // $("#addForm").on("click", () => {
  //   let insidebtn = $("#addForm").text()
  //   if(insidebtn == "ADD"){
  //     $("#addForm").text("CANCEL")
  //   } else {
  //     $("#addForm").text("ADD")
  //   }
  // })

  const modal = $('.modal')
  const overlay = $('.overlay')
  const openModalBtn = $('.btn-std')
  const closeModalBtn = $('.btn-close')

  const openModal = function(){
    modal.removeClass('hidden')
    overlay.removeClass('hidden')
  }

  openModalBtn.on('click', openModal)

 

  const closeModal = function(){
    modal.addClass('hidden')
    overlay.addClass('hidden')
  }

  closeModalBtn.on('click', closeModal)

   // Attach click event handler to the svg element inside .expense-action
   $('.expense-action svg').click(function() {
    // Find the closest parent div with class "alert"
    var alertDiv = $(this).closest('.alert');

    // Find the <strong> element inside the .expense-description within the same parent div
    var description = alertDiv.find('.expense-description').text();

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
  $('#searchInput').on('keyup', function(e){
    var value = $(this).val().toLowerCase()
    $('.wrapper .content-track').filter(function(){
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    })
    
  });
    
    
    

    

})