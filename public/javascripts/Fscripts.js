
// $("#rateStar1").on('click', function () {
//   $('#rateStar1').removeClass("fa fa-start checked").addClass("fa fa-star checked");
//   $('#rateStar2').removeClass("fa fa-start checked").addClass("fa fa-star");
//   $('#rateStar3').removeClass("fa fa-start checked").addClass("fa fa-star");
//   $('#rateStar4').removeClass("fa fa-start checked").addClass("fa fa-star");
//   $('#rateStar5').removeClass("fa fa-start checked").addClass("fa fa-star");

//   $(".rateStarStatus").text("Hate it!");
//   jQuery.data(document.body, "rate", 1);
//   var rating = $("#rateStar1").data('rate');
//   $('#rating').val(rating);

// });
// $("#rateStar2").on('click', function () {
//   $('#rateStar1').removeClass("fa fa-start checked").addClass("fa fa-star checked");
//   $('#rateStar2').removeClass("fa fa-start checked").addClass("fa fa-star checked");
//   $('#rateStar3').removeClass("fa fa-start checked").addClass("fa fa-star");
//   $('#rateStar4').removeClass("fa fa-start checked").addClass("fa fa-star");
//   $('#rateStar5').removeClass("fa fa-start checked").addClass("fa fa-star");
//   $(".rateStarStatus").text("Dislike it!");
//   jQuery.data(document.body, "rate", 2);

//   var rating = $("#rateStar2").data('rate');
//   $('#rating').val(rating);
// });
// $("#rateStar3").on('click', function () {
//   $('#rateStar1').removeClass("fa fa-start checked").addClass("fa fa-star checked");
//   $('#rateStar2').removeClass("fa fa-start checked").addClass("fa fa-star checked");
//   $('#rateStar3').removeClass("fa fa-start checked").addClass("fa fa-star checked");
//   $('#rateStar4').removeClass("fa fa-start checked").addClass("fa fa-star");
//   $('#rateStar5').removeClass("fa fa-start checked").addClass("fa fa-star");
//   $(".rateStarStatus").text("It's OK!");
//   jQuery.data(document.body, "rate", 3);

//   var rating = $("#rateStar3").data('rate');
//   $('#rating').val(rating);
// });
// $("#rateStar4").on('click', function () {
//   $('#rateStar1').removeClass("fa fa-start checked").addClass("fa fa-star checked");
//   $('#rateStar2').removeClass("fa fa-start checked").addClass("fa fa-star checked");
//   $('#rateStar3').removeClass("fa fa-start checked").addClass("fa fa-star checked");
//   $('#rateStar4').removeClass("fa fa-start checked").addClass("fa fa-star checked");
//   $('#rateStar5').removeClass("fa fa-start checked").addClass("fa fa-star");
//   $(".rateStarStatus").text("Liked it!");
//   jQuery.data(document.body, "rate", 4);

//   var rating = $("#rateStar4").data('rate');
//   $('#rating').val(rating);
// });
// $("#rateStar5").on('click', function () {
//   $('#rateStar1').removeClass("fa fa-start checked").addClass("fa fa-star checked");
//   $('#rateStar2').removeClass("fa fa-start checked").addClass("fa fa-star checked");
//   $('#rateStar3').removeClass("fa fa-start checked").addClass("fa fa-star checked");
//   $('#rateStar4').removeClass("fa fa-start checked").addClass("fa fa-star checked");
//   $('#rateStar5').removeClass("fa fa-start checked").addClass("fa fa-star checked");
//   $(".rateStarStatus").text("Loved it!");
//   jQuery.data(document.body, "rate", 5);

//   var rating = $("#rateStar5").data('rate');
//   $('#rating').val(rating);
// });


$("#btn-next3").click(function () {
  $("#review-box3").hide();
  $("#review-box").show("slide", { direction: "up" }, 10000);
});

$("#btn-back3").click(function () {
  $("#review-box").hide();
  $("#review-box3").show("slide", { direction: "up" }, 10000);
});

$("#btn-next").click(function () {
  $("#review-box").hide();
  $("#review-box2").show("slide", { direction: "left" }, 3000);
});

$("#btn-back2").click(function () {
  $("#review-box2").hide();
  $("#review-box").show("slide", { direction: "up" }, 10000);
});


// $("#btn-next").click(function () {
//   $("#review-box").hide();
//   $("#review-box2").show("slide", { direction: "left" }, 3000);
// });
//
// $("#btn-next3").click(function () {
//   $(".e-review-box").hide();
//   $(".e-review-box:hidden").show("slide", { direction: "left" }, 3000);
// });


// $("#btn-next").click(function () {
//   $(".review-box").hide().promise().done(function () {
//     $(".review-box:hidden").show("slide", { direction: "left" }, 3000)
//   });
// });


$('.rating_star').click(function () {
  var list = $(".rating_star").index(this);
  $('.rating_star').removeClass('selectedd');
  // 
  for (var x = 0; x <= list; x++) {
    $('.rating_star').eq(x).addClass('selectedd');
  }
  // rate text status
  var a = $('.rating_star').eq(list).data('rtext');
  $(".rateStarStatus").text("" + a);

  // rate value
  $('#rating').val(
    $(this).data('rate')
  );
});