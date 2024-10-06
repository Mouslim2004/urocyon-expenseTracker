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
      },
      error: function(err){
        console.log(error)
      }
    })

  })
    

  $("#addForm").on("click", () => {
    let insidebtn = $("#addForm").text()
    if(insidebtn == "ADD"){
      $("#addForm").text("CANCEL")
    } else {
      $("#addForm").text("ADD")
    }
  })
  
  
})