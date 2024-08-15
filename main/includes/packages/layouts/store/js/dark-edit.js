$(document).ready(function(){  
  $('#product-search').keyup(function(){
    var filterValue, input, ul,li,a,i;
    input = document.getElementById("product-search");
    filterValue = input.value.toUpperCase();
    ul = document.getElementById("game-product-list");
    li = ul.getElementsByClassName("product-preview");
    
    for (i = 0 ; i < li.length ; i++){
        a = li[i].getElementsByClassName("product-preview-title")[0];
        if(a.innerHTML.toUpperCase().indexOf(filterValue) > -1){
            li[i].style.display = "";
        }else{
            li[i].style.display = "none";
        }
    }
  });
});

function store(type, productID)
{
    var $ajaxUrl = "/main/includes/packages/layouts/store/php/proccess.php";
    var $type = type;
    var $productID = productID;
    
    if ($type == "directBuy") {
      // INIT
      function proccessBuy(ajaxUrl, productID)
      {
          swal.fire({
            title: $languages["warning"],
            html: $languages["storeJSProductBuyLoading"] + '<br><br><div class="loader-bars"><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div></div><br>',
            type: "warning",
            allowOutsideClick: false,
            showConfirmButton: false
          });
          $.ajax({
            type: "POST",
            url: ajaxUrl + "?action=directBuy",
            data: {productID: productID},
            success: function(result) {
              var ajaxData = JSON.parse(result);
              if (ajaxData.code == "successyfull") {
                window.location = $links["cart"];
              } else if (ajaxData.code == "notLogin") {
                swal.fire({
                  title: $languages["error"],
                  text: $languages["storeJSProductBuyLoginError"],
                  type: "error",
                  confirmButtonColor: "#02b875",
                  confirmButtonText: $languages["login"],
                }).then(function() {
                  window.location = $links["login"];
                });
              } else if (ajaxData.code == "stockNot") {
                swal.fire({
                  title: $languages["error"],
                  text: $languages["storeJSProductBuyNotStock"],
                  type: "error",
                  confirmButtonColor: "#02b875",
                  confirmButtonText: $languages["okey"],
                });
              } else if (ajaxData.code == "insufficientCredit") {
                swal.fire({
                  title: $languages["error"],
                  html: $languages["storeJSProductBuyNotCredit"].replaceAll("&credit", ajaxData.credit).replaceAll("&price", ajaxData.price),
                  type: "error",
                  confirmButtonColor: "#02b875",
                  confirmButtonText: $languages["creditUpload"],
                }).then(function() {
                  window.location = $links["credit_upload"];
                });
              } else {
                swal.fire({
                  title: $languages["error"],
                  text: $languages["systemError"],
                  type: "error",
                  confirmButtonColor: "#02b875",
                  confirmButtonText: $languages["okey"],
                });
              }
            }
          });
      }
      
      function checkCoupon(ajaxUrl, productID, promoCode)
      {
          var $promoAjaxUrl = ajaxUrl;
          var $promoProductID = productID;
          var $promoCode = promoCode;
          
          swal.fire({
            title: $languages["warning"],
            html: $languages["storeJSCouponControlLoading"] + '<br><br><div class="loader-bars"><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div></div><br>',
            type: "warning",
            allowOutsideClick: false,
            showConfirmButton: false
          });
          $.ajax({
            type: "POST",
            url: $promoAjaxUrl + "?action=checkCoupon",
            data: {productID: $promoProductID, promoCode: $promoCode},
            success: function(result) {
              var ajaxData = JSON.parse(result);
              if (ajaxData.code == "successyfull") {
                swal.fire({
                  title: $languages["success"],
                  html: $languages["storeJSCouponCheckSuccess"].replaceAll("&discount", ajaxData.discount),
                  type: "success",
                  confirmButtonColor: "#02b875",
                  confirmButtonText: $languages["okey"],
                }).then(function() {
                  store("directBuy", $promoProductID);
                });
              } else if (ajaxData.code == "checkCoupon") {
                swal.fire({
                  title: $languages["error"],
                  text: $languages["storeJSCouponCheckAlready"],
                  type: "error",
                  confirmButtonColor: "#02b875",
                  confirmButtonText: $languages["tyragain"]
                }).then(function() {
                  proccessCoupon($promoAjaxUrl, $promoProductID);
                });
              } else if (ajaxData.code == "notCount") {
                swal.fire({
                  title: $languages["error"],
                  text: $languages["storeJSCouponCheckNotLimit"],
                  type: "error",
                  confirmButtonColor: "#02b875",
                  confirmButtonText: $languages["tyragain"]
                }).then(function() {
                  proccessCoupon($promoAjaxUrl, $promoProductID);
                });
              } else if (ajaxData.code == "notCoupon") {
                swal.fire({
                  title: $languages["error"],
                  text: $languages["storeJSCouponCheckNotCoupon"],
                  type: "error",
                  confirmButtonColor: "#02b875",
                  confirmButtonText: $languages["tyragain"]
                }).then(function() {
                  proccessCoupon($promoAjaxUrl, $promoProductID);
                });
              } else if (ajaxData.code == "notLogin") {
                swal.fire({
                  title: $languages["error"],
                  text: $languages["storeJSCouponCheckLoginError"],
                  type: "error",
                  confirmButtonColor: "#02b875",
                  confirmButtonText: $languages["login"],
                }).then(function() {
                  window.location = $links["login"];
                });
              } else if (ajaxData.code == "already") {
                swal.fire({
                  title: $languages["error"],
                  text: $languages["storeJSCouponCheckIsCoupon"],
                  type: "error",
                  confirmButtonColor: "#02b875",
                  confirmButtonText: $languages["okey"],
                }).then(function() {
                  store("directBuy", $promoProductID);
                });
              } else {
                swal.fire({
                  title: $languages["error"],
                  text: $languages["systemError"],
                  type: "error",
                  confirmButtonColor: "#02b875",
                  confirmButtonText: $languages["okey"],
                }).then(function() {
                  store("directBuy", $promoProductID);
                });
              }
            }
          });
      }
      
      function proccessCoupon(ajaxUrl, productID)
      {
          var $couponAjaxUrl = ajaxUrl;
          var $couponProductID = productID;
          swal.fire({
            title: $languages["storeJSCouponCheckTitle"],
            html: '<br/><div class="input-group mb-3 flex-column bg-dark--5 border col-12 p-0 input-focused"> <label for="direct-buy-promo-code" class="o-100 d-block mb-0 text-white font-size-6 font-100 position-absolute">' + $languages["coupon"] + '</label> <input type="text" placeholder="' + $languages["coupon"] + '" class="form-control pt-4 text-white font-size-7 py-2 w-100 font-100 rounded-none" aria-label="' + $languages["coupon"] + '" id="direct-buy-promo-code" aria-describedby="direct-buy-promo-code" name="direct-buy-promo-code"/></div>',
            showCancelButton: true,
            confirmButtonColor: "#02b875",
            cancelButtonColor: "#f5365c",
            confirmButtonText: $languages["approve"],
            cancelButtonText: $languages["giveUp"],
            reverseButtons: true
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.confirm) {
              var $promoCode = $('#direct-buy-promo-code').val();
              if ($promoCode == "") {
                swal.fire({
                  title: $languages["error"],
                  text: $languages["noneError"],
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#02b875",
                  cancelButtonColor: "#f5365c",
                  confirmButtonText: $languages["tyragain"],
                  cancelButtonText: $languages["close"],
                  reverseButtons: true
                }).then(function(isAccepted) {
                  if (isAccepted.value) {
                    proccessCoupon($couponAjaxUrl, $couponProductID);
                  }
                });
              } else {
                checkCoupon($couponAjaxUrl, $couponProductID, $promoCode);
              }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              store("directBuy", $couponProductID);
            }
          });
      }
      
      swal.fire({
        title: $languages["warning"],
        html: $languages["storeJSProductBuyControlLoading"] + '<br><br><div class="loader-bars"><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div></div><br>',
        type: "warning",
        allowOutsideClick: false,
        showConfirmButton: false
      });
      $.ajax({
        type: "POST",
        url: $ajaxUrl + "?action=info",
        data: {productID: $productID},
        success: function(result) {
          var ajaxData = JSON.parse(result);
          if (ajaxData.code == "successyfull") {
            swal.fire({
              title: $languages["storeJSProductBuyInfoTitle"],
              html: $languages["storeJSProductBuyInfoText"].replaceAll("&price", ajaxData.price),
              showCancelButton: true,
              confirmButtonColor: "#02b875",
              cancelButtonColor: "#f5365c",
              confirmButtonText: $languages["buy"],
              cancelButtonText: $languages["storeJSCouponCheckTitle"],
              reverseButtons: true
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.confirm) {
                proccessBuy($ajaxUrl, $productID)
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                proccessCoupon($ajaxUrl, $productID);
              }
            });
          } else if (ajaxData.code == "notLogin") {
            swal.fire({
              title: $languages["error"],
              text: $languages["storeJSProductBuyLoginError"],
              type: "error",
              confirmButtonColor: "#02b875",
              confirmButtonText: $languages["login"],
            }).then(function() {
              window.location = $links["login"];
            });
          } else {
            swal.fire({
              title: $languages["error"],
              text: $languages["systemError"],
              type: "error",
              confirmButtonColor: "#02b875",
              confirmButtonText: $languages["okey"],
            }).then(function() {
              location.reload();
            });
          }
        }
      });
    } else if ($type == "addCart") {
      // INIT
      function proccessAddCart(ajaxUrl, productID)
      {
          swal.fire({
            title: $languages["warning"],
            html: $languages["storeJSCartAddControlLoading"] + '<br><br><div class="loader-bars"><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div></div><br>',
            type: "warning",
            allowOutsideClick: false,
            showConfirmButton: false
          });
          $.ajax({
            type: "POST",
            url: ajaxUrl + "?action=addCart",
            data: {productID: productID},
            success: function(result) {
              var ajaxData = JSON.parse(result);
              if (ajaxData.code == "successyfull") {
                swal.fire({
                  title: $languages["success"],
                  text: $languages["storeJSCartAddSuccess"],
                  type: "success",
                  showCancelButton: true,
                  confirmButtonColor: "#02b875",
                  cancelButtonColor: "#f5365c",
                  cancelButtonText: $languages["shopContinue"],
                  confirmButtonText: $languages["goCart"],
                  reverseButtons: true
                }).then(function(isAccepted) {
                  if (isAccepted.value) {
                    window.location = $links["cart"];
                  }
                });
              } else if (ajaxData.code == "stockNot") {
                swal.fire({
                  title: $languages["error"],
                  text: $languages["storeJSCartAddNotStock"],
                  type: "error",
                  confirmButtonColor: "#02b875",
                  confirmButtonText: $languages["okey"],
                });
              } else if (ajaxData.code == "notLogin") {
                swal.fire({
                  title: $languages["error"],
                  text: $languages["storeJSCartAddLoginError"],
                  type: "error",
                  confirmButtonColor: "#02b875",
                  confirmButtonText: $languages["login"],
                }).then(function() {
                  window.location = $links["login"];
                });
              } else {
                swal.fire({
                  title: $languages["error"],
                  text: $languages["systemError"],
                  type: "error",
                  confirmButtonColor: "#02b875",
                  confirmButtonText: $languages["okey"],
                });
              }
            }
          });
      }
      
      // TRANSACTİON CONFİRMATİON
      swal.fire({
        title: $languages["warning"],
        text: $languages["storeJSCartAddAreYouSure"],
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#02b875",
        cancelButtonColor: "#f5365c",
        cancelButtonText: $languages["giveUp"],
        confirmButtonText: $languages["approve"],
        reverseButtons: true
      }).then(function(isAccepted) {
        if (isAccepted.value) {
          proccessAddCart($ajaxUrl, $productID);
        }
      });
    } else if ($type == "starVote") {
      // INIT
      function proccessRates(ajaxUrl, productID)
      {
          swal.fire({
            title: $languages["warning"],
            html: $languages["storeJSStarAddLoading"] + '<br><br><div class="loader-bars"><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div></div><br>',
            type: "warning",
            allowOutsideClick: false,
            showConfirmButton: false
          });
          $.ajax({
            type: "POST",
            url: ajaxUrl + "?action=rates",
            data: {productID: productID},
            success: function(result) {
              var ajaxData = JSON.parse(result);
              if (ajaxData.code == "successyfull") {
                swal.fire({
                  title: $languages["success"],
                  text: $languages["storeJSStarAddSuccess"],
                  type: "success",
                  confirmButtonColor: "#02b875",
                  confirmButtonText: $languages["okey"],
                  reverseButtons: true
                }).then(function() {
                  location.reload();
                });
              } else if (ajaxData.code == "already") {
                swal.fire({
                  title: $languages["error"],
                  text: $languages["storeJSStarAddAlready"],
                  type: "error",
                  confirmButtonColor: "#02b875",
                  confirmButtonText: $languages["okey"],
                  reverseButtons: true
                });
              } else if (ajaxData.code == "notLogin") {
                swal.fire({
                  title: $languages["error"],
                  text: $languages["storeJSStarAddLoginError"],
                  type: "error",
                  confirmButtonColor: "#02b875",
                  confirmButtonText: $languages["login"],
                }).then(function() {
                  window.location = $links["login"];
                });
              } else {
                swal.fire({
                  title: $languages["error"],
                  text: $languages["systemError"],
                  type: "error",
                  confirmButtonColor: "#02b875",
                  confirmButtonText: $languages["okey"],
                });
              }
            }
          });
      }
      
      // TRANSACTİON CONFİRMATİON
      swal.fire({
        title: $languages["warning"],
        text: $languages["storeJSStarAddAreYouSure"],
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#02b875",
        cancelButtonColor: "#f5365c",
        cancelButtonText: $languages["giveUp"],
        confirmButtonText: $languages["approve"],
        reverseButtons: true
      }).then(function(isAccepted) {
        if (isAccepted.value) {
          proccessRates($ajaxUrl, $productID);
        }
      });
    }
}