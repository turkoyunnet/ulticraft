$(window).on("load", () => {
    $(".preloader").delay(1000).fadeOut(1000);
    $("body").css("overflow-y", "auto");
});

$("body").on("scroll", function () {
    if ($(this).scrollTop() > 10) {
		$('header').addClass("darken");
    } else {
        $('header').removeClass("darken");
    }
});

$(document).on("click", "#copyaddress", () => {
    let button = $(".copyaddress");
    console.log(button.text());

    let temp = $("<input>");
    $("body").append(temp);
    temp.val(button.text());
    temp.select();
    document.execCommand("copy");
    temp.remove();

    button.text("IP CÍM MÁSOLVA");

    setTimeout(() => {
        button.text("play.kafalarmc.com");
    }, 1000);
});

$(document).ready(() => {
    var today = new Date();
    var yyyy = today.getFullYear();
    $(".copyRight").html("2019" + " - " + (yyyy) + " © " + "www.kafalarmc.com | Tüm Hakları Saklıdır!");
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}