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
  
  $("svg").on("click", () => {
    let parentsDiv = $(this).closest('.alert')
    let strongElement = parentsDiv.find('.expense-description strong')
    let descriptionText = strongElement.text()

    console.log(descriptionText)
  })
  
})