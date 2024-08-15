if ($('[cart="count-update"]').length) {
  var $ajaxUrl = "/main/includes/packages/layouts/shopping-cart/php/proccess.php";
  $('[cart="count-update"]').each(function() {
    $(this).on("click", function() {
      var $inputID = $(this).attr("cart-input");
      var $input = $('[cart="' + $inputID + '"]');
      var $value = $input.val();
      var $cartID = $input.attr("cart-id");
      if ($value > 0 && 101 > $value) {
        $.ajax({
          type: "POST",
          url: $ajaxUrl + "?action=update",
          data: {proccess: "update", cartID: $cartID, count: $value},
          success: function(result) {
            var $resultVariables = JSON.parse(result);
            if ($resultVariables.status == "TRUE") {
              swal.fire({
                title: $languages["success"],
                text: $resultVariables.reason,
                icon: "success",
                confirmButtonColor: "#02b875",
                confirmButtonText: $languages["okey"],
                reverseButtons: true
              }).then(function() {
                window.location = $links["cart"];
              });
            } else {
              swal.fire({
                title: $languages["error"],
                text: $resultVariables.reason,
                icon: "error",
                confirmButtonColor: "#02b875",
                confirmButtonText: $languages["okey"],
                reverseButtons: true
              });
            }
          }
        });
      } else {
        swal.fire({
          title: $languages["error"],
          text: "Lütfen geçerli bir adet giriniz!",
          icon: "error",
          confirmButtonColor: "#02b875",
          confirmButtonText: $languages["okey"],
          reverseButtons: true
        });
      }
    });
  });
}

if ($('[cart="salesAgreement"]').length) {
  $('[cart="salesAgreement"]').each(function() {
    $(this).on("click", function() {
      if ($('[cart="salesAgreementInput"]').val() == "1") {
        $('[cart="salesAgreementInput"]').val('0');
      } else {
        $('[cart="salesAgreementInput"]').val('1');
      }
    });
  });
}

if ($('[cart="usageCredit"]').length) {
  $('[cart="usageCredit"]').each(function() {
    $(this).on("click", function() {
      if ($('[cart="usageCreditInput"]').val() == "1") {
        $('[cart="usageCreditInput"]').val('0');
      } else {
        $('[cart="usageCreditInput"]').val('1');
      }
    });
  });
}

function shoppingCartPay(amount)
{
    var $amount = amount;
    var $paymentData = $('[cart="method"]').val().split("-");
    var $method      = $paymentData[1];
    var $api         = $paymentData[0];
    var $name        = $('[cart="name"]').val();
    var $surname     = $('[cart="surname"]').val();
    var $phoneNumber = $('[cart="phoneNumber"]').val();
    var $salesAgreement = "no";
    var $usageCredit = "no";
    if ($('[cart="salesAgreementInput"]').val() == "1") {
      $salesAgreement = "yes";
    }
    if ($('[cart="usageCreditInput"]').val() == "1") {
      $usageCredit = "yes";
    }
    var $ajaxUrl = "/main/includes/packages/layouts/shopping-cart/php/proccess.php";
    var $ajaxURLPay = "/main/includes/packages/payments/pay.php";
    
    function proccessCheckOut(ajaxUrl)
    {
      swal.fire({
        title: $languages["warning"],
        html: $languages["shoppingCartJSPaymentLoading"] + '<br><br><div class="loader-bars"><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div></div><br>',
        icon: "warning",
        allowOutsideClick: false,
        showConfirmButton: false
      });
      $.ajax({
        type: "POST",
        url: ajaxUrl + "?action=checkout",
        data: {proccess: "checkOut", firstName: $name, surName: $surname, phoneNumber: $phoneNumber, salesAgreement: $salesAgreement, usageCredit: $usageCredit, method: $method, api: $api},
        success: function(result) {
          var ajaxData = JSON.parse(result);
          if (ajaxData.code == "successyfull") {
            if (ajaxData.type == "0") {
              swal.fire({
                title: $languages["success"],
                text: $languages["shoppingCartJSPaymentSuccess"],
                icon: "success",
                confirmButtonColor: "#02b875",
                confirmButtonText: $languages["goChest"]
              }).then(function() {
                window.location = $links["chest"];
              });
            } else {
              $.ajax({
                type: "POST",
                url: $ajaxURLPay,
                data: {amount: ajaxData.amount, method: $method, api: $api, userID: ajaxData.userID, type: 1, orderID: ajaxData.orderID},
                success: function(dataPay) {
                  var $returnDataPay = jQuery.parseJSON(dataPay);
                  if ($returnDataPay.status == true) {
                    if ($returnDataPay.type == "print_r") {
                      $('[cart="html"]').html($returnDataPay.redirect);
                    } else {
                      window.location = $returnDataPay.redirect;
                    }
                  } else {
                    if ($returnDataPay.type == "print_r") {
                      $('[cart="html"]').html($returnDataPay.reason);
                    } else {
                      swal.fire({
                        title: $languages["error"],
                        text: $returnDataPay.reason,
                        icon: "error",
                        confirmButtonColor: "#02b875",
                        confirmButtonText: $languages["okey"],
                        reverseButtons: true
                      });
                    }
                  }
                }
              });
            }
          } else if (ajaxData.code == "emptyCart") {
            swal.fire({
              title: $languages["error"],
              text: $languages["shoppingCartJSPaymentNotProduct"],
              icon: "error",
              confirmButtonColor: "#02b875",
              confirmButtonText: $languages["okey"]
            });
          } else if (ajaxData.code == "stockNot") {
            swal.fire({
              title: $languages["error"],
              text: $languages["shoppingCartJSPaymentNotProductStock"],
              icon: "error",
              confirmButtonColor: "#02b875",
              confirmButtonText: $languages["okey"]
            });
          } else if (ajaxData.code == "insufficientCredit") {
            swal.fire({
              title: $languages["error"],
              html: $languages["shoppingCartJSPaymentNotCredit"].replaceAll("&credit", ajaxData.credit).replaceAll("&amount", ajaxData.total),
              icon: "error",
              confirmButtonColor: "#02b875",
              confirmButtonText: $languages["creditUpload"]
            }).then(function() {
              window.location = $links["credit_upload"];
            });
          } else if (ajaxData.code == "notLogin") {
            swal.fire({
              title: $languages["error"],
              text: $languages["shoppingCartJSPaymentLoginError"],
              icon: "error",
              confirmButtonColor: "#02b875",
              confirmButtonText: $languages["login"]
            }).then(function() {
              window.location = $links["login"];
            });
          } else if (ajaxData.code == "notData" || ajaxData.code == "") {
            swal.fire({
              title: $languages["error"],
              text: $languages["systemError"],
              icon: "error",
              confirmButtonColor: "#02b875",
              confirmButtonText: $languages["okey"]
            });
          }
        }
      });
    }
    
    swal.fire({
    title: $languages["warning"],
    text: $languages["shoppingCartJSPaymentInfoText"].replaceAll("&amount", $amount),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#02b875",
    cancelButtonColor: "#f5365c",
    cancelButtonText: $languages["giveUp"],
    confirmButtonText: $languages["approve"],
    reverseButtons: true
  }).then(function(isAccepted) {
    if (isAccepted.value) {
      proccessCheckOut($ajaxUrl);
    }
  });
}

function shoppingCartDelete(cartID)
{
  var $ajaxUrl = "/main/includes/packages/layouts/shopping-cart/php/proccess.php?action=remove";
  var $cartID = cartID;
  
  function proccessRemove(ajaxUrl, cartID) {
      swal.fire({
        title: $languages["warning"],
        html: $languages["shoppingCartJSRemoveProductLoading"] + '<br><br><div class="loader-bars"><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div></div><br>',
        icon: "warning",
        allowOutsideClick: false,
        showConfirmButton: false
      });
      $.ajax({
        type: "POST",
        url: ajaxUrl,
        data: {cartID: cartID},
        success: function(result) {
          var ajaxData = JSON.parse(result);
		  var result = ajaxData.code;
          if (result == "successyfull") {
            swal.fire({
              title: $languages["success"],
              text: $languages["shoppingCartJSRemoveProductSuccess"],
              icon: "success",
              confirmButtonColor: "#02b875",
              confirmButtonText: $languages["okey"]
            }).then(function() {
              location.reload();
            });
          } else if (result == "notData" || result == "notCart" || result == "") {
            swal.fire({
              title: $languages["error"],
              text: $languages["systemError"],
              icon: "error",
              confirmButtonColor: "#02b875",
              confirmButtonText: $languages["okey"]
            });
          } else if (result == "notLogin") {
            swal.fire({
              title: $languages["error"],
              text: $languages["shoppingCartJSRemoveProductLoginError"],
              icon: "error",
              confirmButtonColor: "#02b875",
              confirmButtonText: $languages["login"]
            }).then(function() {
              window.location = $links["login"];
            });
         }
        }
      });
  }
  
  // TRANSACTİON CONFİRMATİON
  swal.fire({
    title: $languages["warning"],
    text: $languages["shoppingCartJSRemoveProductAreYouSure"],
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#02b875",
    cancelButtonColor: "#f5365c",
    cancelButtonText: $languages["giveUp"],
    confirmButtonText: $languages["approve"],
    reverseButtons: true
  }).then(function(isAccepted) {
    if (isAccepted.value) {
      proccessRemove($ajaxUrl, $cartID);
    }
  });
}