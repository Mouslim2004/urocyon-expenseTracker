$(document).ready(function(){
  $(".add-btn").on('click', () => {
    let name = $(".hiname").text()
    console.log(name)

    $.ajax({
      type: 'post',
      url: '/add-expense/' + name
    });
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