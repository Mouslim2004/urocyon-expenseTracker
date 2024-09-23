$(document).ready(function(){
  $(".add-btn").on('click', () => {
    let name = $(".hiname").text()
    console.log(name)

    $.ajax({
      type: 'post',
      url: '/add-expense/' + name
    });
  })

    // let name = $(".hiname").text()

    // $.ajax({
    //   type: 'get',
    //   url: '/add-expense/' + name
    // });
  
})