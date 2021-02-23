// POPUP MENU WHEN THE USER OPEN THE WEBSITE 
$('#offer-popup').fadeIn();
var isOpen = $('#offer-popup')[0].style.display = "block"

if(isOpen){
  
  $('body').css('overflow','hidden')
}

$(".close-popup").click(function () {
  $(".popup").fadeOut();
  $('body').css('overflow', 'visible');     
});

//AOS ANIMATION
AOS.init({
  duration: 1200,
});

