// OWL CARASOUL

$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  autoplay: true,
  autoplayTimeout: 1300,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 5,
    },
  },
});




// NAVBAR SCROLLING
$(function () {
  $(document).scroll(function () {
    var $scroll = $(this).scrollTop();
    var $nav = $(".navbar");
    var $logo = $(".logo");

    $nav.toggleClass("scrolled-navbar", $scroll > 50);
    $logo.toggleClass("logo-scrolled", $scroll > 50);
    if ($scroll > 50) {
      $(".logo-sec").css("display", "block");
      $(".logo").css("display", "none");
    } else {
      $(".logo-sec").css("display", "none");
      $(".logo").css("display", "block");
    }
  });
});

function getVals() {
  // Get slider values
  let parent = this.parentNode;
  let slides = parent.getElementsByTagName("input");
  let slide1 = parseFloat(slides[0].value);
  let slide2 = parseFloat(slides[1].value);
  // Neither slider will clip the other, so make sure we determine which is larger
  if (slide1 > slide2) {
    let tmp = slide2;
    slide2 = slide1;
    slide1 = tmp;
  }

  let displayElement = parent.getElementsByClassName("rangeValues")[0];
  displayElement.innerHTML = "$" + slide1 + " - $" + slide2;
}

window.onload = function () {
  // Initialize Sliders
  let sliderSections = document.getElementsByClassName("range-slider");
  for (let x = 0; x < sliderSections.length; x++) {
    let sliders = sliderSections[x].getElementsByTagName("input");
    for (let y = 0; y < sliders.length; y++) {
      if (sliders[y].type === "range") {
        sliders[y].oninput = getVals;
        // Manually trigger event first time to display values
        sliders[y].oninput();
      }
    }
  }
};

// SUBPRODUCT PAGE

$(".thumbnail").on("click", function () {
  var clicked = $(this);
  var newSelection = clicked.data("big");
  var $img = $(".primary-img").css(
    "background-image",
    "url(" + newSelection + ")"
  );
  clicked.parent().find(".thumbnail").removeClass("selected");
  clicked.addClass("selected");
  $(".primary-img").empty().append($img.hide().fadeIn("slow"));
});

// ADD COLOR IDS IN ARRAY
var colors = [
  "s-36",
  "s-37",
  "s-38",
  "s-39",
  "s-3xl",
  "s-40",
  "s-41",
  "s-42",
  "s-43",
  "s-44",
  "s-xs",
];

// Variable which keeps track of which color is currently visible
var visibleColors = null;
var avaColorsSpan = "ava-colors";
function onLinkClicked(event) {
  // console.log(event);
  // Get the id of the link that was clicked.
  var linkName = event.currentTarget.id;
  console.log(linkName);

  // Strip off the '-link' from the end of the linkName
  var dashIndex = linkName.indexOf("-link");
  console.log(dashIndex);
  var appName = linkName.substr(0, dashIndex);
  console.log(appName);

  // Call show app with the correct appName.
  console.log(5 + 5);
  showApp(appName);
}

function showApp(appNameToShow) {
  console.log(5 + 5);
  // Hide the currently visible app (if there is one!)
  if (visibleColors !== null) {
    $("." + visibleColors).hide();
  }

  //show ava colors span
  $("." + avaColorsSpan).show();

  // And show the one passed
  $("." + appNameToShow).show();

  // Update the visibleApp property.
  visibleColors = appNameToShow;
}

// $(document).ready waits for the page to finish rendering

$("#s-none-link").click(function () {
  $(".customize-color").hide();
  visibleColors = null;
  $("." + avaColorsSpan).hide();
});
// Walk through the Array of Apps and add a click handler to
// it's respective link.
colors.forEach(function (name) {
  $("#" + name + "-link").on("click", onLinkClicked);
});

// VALIDATION FOR SELECTING SIZE IN SUB PRODUCT PAGE

let isValidSize = true;
let isValidColor = $("input[name=radio-colors]");
let size = false;
let color = false;

$("input[name=radio-sizes]").change(function () {
  size = true;

  if (color) {
    color = false;

    isValidColor.prop("checked", false);
  }
});

$("input[name=radio-colors]").change(function (e) {
  console.log(e);
  color = true;
});

$(".add-cart-button").click(function (e) {
  if (isValidSize != $("input[name=radio-sizes]").is(":checked")) {
    $("#spnErrorSize")[0].style.display = "block";
  } else {
    $("#spnErrorSize")[0].style.display = "none";
  }
  if (visibleColors !== null && size == true && color == false) {
    $("#spnErrorColor")[0].style.display = "block";
  }

  if (!size || !color) {
    e.preventDefault();
  }
});

// END OF VALIDATION FOR SELECTING SIZE IN SUB PRODUCT PAGE

function showRegisterForm() {
  $(".loginBox").fadeOut("fast", function () {
    $(".registerBox").fadeIn("fast");
    $(".login-footer").fadeOut("fast", function () {
      $(".register-footer").fadeIn("fast");
    });
  });
  $(".error").removeClass("alert alert-danger").html("");
}
function showLoginForm() {
  $("#loginModal .registerBox").fadeOut("fast", function () {
    $(".loginBox").fadeIn("fast");
    $(".register-footer").fadeOut("fast", function () {
      $(".login-footer").fadeIn("fast");
    });
  });
  $(".error").removeClass("alert alert-danger").html("");
}

function openLoginModal() {
  showLoginForm();
  setTimeout(function () {
    $("#loginModal").modal("show");
  }, 230);
}
function openRegisterModal() {
  showRegisterForm();
  setTimeout(function () {
    $("#loginModal").modal("show");
  }, 230);
}

function loginAjax() {
  /*   Remove this comments when moving to server
  $.post( "/login", function( data ) {
          if(data == 1){
              window.location.replace("/home");            
          } else {
               shakeModal(); 
          }
      });
  */

  /*   Simulate error message from the server   */
  shakeModal();
}

function shakeModal() {
  $("#loginModal .modal-dialog").addClass("shake");
  $(".error")
    .addClass("alert alert-danger")
    .html("Invalid email/password combination");
  $('input[type="password"]').val("");
  setTimeout(function () {
    $("#loginModal .modal-dialog").removeClass("shake");
  }, 1000);
}

$(document).ready(function ($) {
  //REMOVE FROM CART WHEN I PRESS DELETE ICON
  $(".remove-button").on("click", function () {
    // GET THE ID
    var id = $(this).closest("li")[0].id;
    console.log(id);
    $(this).closest("li").remove();
  });
  // CLOSE ANNOUCMENT BAR  IN HOMEPAGE

  $(".icon-close").click(function () {
    $(".closable").hide(200);
  });

  //SHOW FORM WHEN USER PRESS ON ENTER COUPON (CHECKOUT PAGE)
  $(".show-coupon").click(function (e) {
    $(".form-display").toggleClass("active");
  });
  //REMOVE FROM CART WHEN I PRESS DELETE ICON (cart page)
  $(".product-remove").on("click", function (e) {
    // GET THE ID
    var id = $(this).closest("tr")[0].id;

    $(this).closest("tr").remove();
  });

  //ALERTS 


  // ADD CLASS WHEN WISHLIST CLICKED
  $(".not-wished").on("click", function (e) {
    let toastMixin = Swal.mixin({
      toast: true,
      icon: "success",
      title: "General Title",
      animation: false,
      position: "top-right",
      showConfirmButton: false,
      timer: 3000,
    });
    console.log(e.target);
    if ($(this).hasClass("wishlist")) {
      toastMixin.fire({
        animation: true,
        title: "Added to Cart",
      });

      $(e.currentTarget.children[0]).toggleClass("wishlist-added");
      console.log(e.currentTarget.children[0]);
      $(this).removeClass("wishlist");
    } else {
      toastMixin.fire({
        animation: true,
        title: "Removed from Cart",
        icon: 'error',
      });
      $(e.currentTarget.children[0]).toggleClass("wishlist-added");
      $(this).addClass("wishlist");
    }
  });

  // COUNTER in sub product page
  $(".quality-plus").on("click", function (e) {
    let input = $(this).parent().find(".quantity-input");
    input[0].value++;
    // GET PRICE IN ITEM AND REMOVE DOLLAR SIGN
    let price = $(this)
      .parent()
      .parent()
      .parent()
      .find(".price-product")[0]
      .innerHTML.replace("$", "");
    // MULTIPLY PRICE IN INPUT AND FIX TWO DECIMALS ONLY
    let addition = parseFloat(price * input[0].value).toFixed(2);
    //GET TOTAL THAT WILL CHANGE
    let total = $(this).parent().parent().parent().find(".price-total")[0];
    total.innerHTML = "$" + addition;
    //remove disable and activate button (update)
    let updateBtn = $(".update-btn");
    updateBtn.css("cursor", "pointer");
    updateBtn.prop("disabled", "");
  });
  $(".quality-minus").on("click", function (e) {
    let input = $(this).parent().find(".quantity-input");
    if (input[0].value != 1) {
      input[0].value--;
      // GET PRICE IN ITEM AND REMOVE DOLLAR SIGN
      let price = $(this)
        .parent()
        .parent()
        .parent()
        .find(".price-product")[0]
        .innerHTML.replace("$", "");
      // MULTIPLY PRICE IN INPUT AND FIX TWO DECIMALS ONLY
      let addition = parseFloat(price * input[0].value).toFixed(2);
      //GET TOTAL THAT WILL CHANGE
      let total = $(this).parent().parent().parent().find(".price-total")[0];
      total.innerHTML = "$" + addition;
      //remove disable and activate button (update)
      let updateBtn = $(".update-btn");
      updateBtn.css("cursor", "pointer");
      updateBtn.prop("disabled", "");
    }
  });

  // alert();

  // Declare the body variable
  var $body = $("body");
  var height = document.body.clientHeight;

  // Function that shows and hides the sidebar cart
  $("#cart-button, .close-button, #sidebar-cart-curtain").click(function (e) {
    e.preventDefault();
    $("#sidebar-cart-curtain").css("height", height + "px");

    // Add the show-sidebar-cart class to the body tag
    $body.toggleClass("show-sidebar-cart");
    // console.log(height)
    $(".sidebar-cart-curtain").css("height", height + "px");

    // Check if the sidebar curtain is visible
    if ($("#sidebar-cart-curtain").is(":visible")) {
      // Hide the curtain
      $("#sidebar-cart-curtain").fadeOut(500);
    } else {
      // Show the curtain

      $("#sidebar-cart-curtain").fadeIn(500);
    }
  });
});

// PREVENT DROPDOWN MENU IN SHOP .HTML FROM CLOSING

$(document).on("click", ".mega-dropdown", function (e) {
  e.stopPropagation();
});

// //PREVENT DEFAULT OF FILTER BTN (SHOP PAGE)
// $("#filterBtn").on("click", function (e) {
//   e.preventDefault();
//   $("#filter-form").toggleClass("show");
// });

// PREVENT PRESSING ON APPLY COUPON WHEN THE INPUT IS EMPTY (CART PAGE)
$(".apply-coupon-btn").on("click", function (e) {
  if ($(".coupon-code-input").val() == "") {
    e.preventDefault();
  }
});

//sorting in shop page
$("#sort").on("change", function () {
  const settings = $.extend({
    elToSort: ".full-card",
  });
  const sortType = $(this).find("option:selected").attr("data-sort");
  const ascOrder = (a, b) => a - b;
  const descOrder = (a, b) => b - a;
  const sortMethod = sortType == "asc" ? ascOrder : descOrder;
  const sign = sortType == "asc" ? "" : "-";
  const sortArray = $(settings.elToSort)
    .map((i, el) => $(el).attr("data-price"))
    .sort(sortMethod);

  for (let k = 0; k < sortArray.length; k++) {
    $(settings.elToSort)
      .filter(`[data-price="${sortArray[k]}"]`)
      .css("order", sign + sortArray[k]);
  }
});



//FAQS PAGE + & -
$('.info-wrapper-title').on('click', function(e){
  if ($(this).hasClass('active--act')) {
    // children( ".selected" )
    
    $(this).children( ".plus-icon" ).css("display", "block");
    $(this).children( ".minus-icon" ).css("display", "none");
    $(this).removeClass('active--act')
    $(this).removeClass("active--text");
  } 
  else{
    $(this).addClass("active--text");
    $(this).addClass('active--act')
    $(this).children( ".minus-icon" ).css("display", "block");
    $(this).children( ".plus-icon" ).css("display", "none");
    

  }
});


//rating in subproduct
    let rate;
    $(".star-rating").on("change", function (e) {
      rate = e.target.value;
    });
    $("#submitRating").on("click", function (e) {
      e.preventDefault();
      // get review text value
      let reviewText = $("#comment").val();

      let data = "";
      for (let index = 0; index < 5; index++) {
        if (rate == 0) {
          data =
            data +
            ` <input id="star-${index}" type="radio" name="rating" value="${index}" />
      <label for="star-${index}" title="${index} star">
        <i class="not-active fa fa-star" aria-hidden="true"></i>
      </label>`;
        } else {
          data =
            data +
            ` <input id="star-${index}" type="radio" name="rating" value="${index}" />
      <label for="star-${index}" title="${index} star">
        <i class="active fa fa-star" aria-hidden="true"></i>
      </label>`;
          rate--;
        }
      }
      let first = `<article class="show-review">
    <div class="customer-stars">`,
        last = ` </div>
    <div class="date">
      By
      <span class="reviewer-name"> Ahmed Essam</span>
      <span class="date-prev">13-07-2020</span>
      
    </div>
    <p class="customer-comment">${reviewText}</p>

    </article>`;

      $(".review-section").append(`${first} ${data} ${last}`);
    }); 


