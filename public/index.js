$(document).ready(function(){

  $("#tracker").submit(function(e){
    e.preventDefault()

    let name = $(".nameid").text()
    console.log(name)

    $.ajax({
      type: 'POST',
      url: `/tracker/${name}`,
      data: {
        description: $('#description').val(),
        amount: $('#amount').val()
      },
      success: function(response){
        console.log(response)
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