var DropImage = (function() {
  var $dropimage = $('[data-toggle="dropimage"]');
  function init($dropimage) {
    $dropimage.dropImage();
  }
  if ($dropimage.length) {
    $dropimage.each(function() {
      init($(this));
    });
  }
})();

function changeSwitch(dataID)
{
  if (document.getElementById(dataID).value == "0") {
    document.getElementById(dataID).value = "1";
  } else if (document.getElementById(dataID).value == "1") {
    document.getElementById(dataID).value = "0";
  }
}

function readNotifications() {
  $.ajax({
    type: "GET",
    url: "/main/includes/packages/ajax/notifications.php?action=read",
    success: function(result) {
      $('#account-notificationsread').removeClass('unread');
    }
  });
}

function broadcastHits(dataID) {
  $.ajax({
    type: "GET",
    url: "/main/includes/packages/ajax/broadcastHits.php?action=hits&broadcast=" + dataID,
    success: function(result) {
      if (result == "error") {
        swal.fire({
          title: $languages["error"],
          text: $languages["systemError"],
          type: 'error',
          confirmButtonColor: '#02b875',
          confirmButtonText: $languages["okey"]
        });
      }
    }
  });
}

var ServerOnlineStatus = (function() {
  var $onlineStatus = $('[server-command="serverOnlineStatus"]');

  if ($onlineStatus.length) {
    $onlineStatus.each(function() {
      var $onlineStatus = $(this);
      var $serverIP = $onlineStatus.attr("server-ip").split(':', 2);
      
      function createAjaxURL($type) {
        // AJAX URL
        var $mcAPIUs = "https://mcapi.us/server/status?ip=" + $serverIP[0] + (($serverIP[1]) ? "&port=" + $serverIP[1] : "");
        var $mcAPITc = "https://mcapi.tc/?" + $serverIP[0] + "/json";
        var $mcAPIEu = "https://eu.mc-api.net/v3/server/ping/" + $serverIP[0] + (($serverIP[1]) ? ":" + $serverIP[1] : "");
        var $mcAPISrvJava = "https://api.mcsrvstat.us/2/" + $serverIP[0] + (($serverIP[1]) ? ":" + $serverIP[1] : "");
        var $mcAPISrvPocket = "https://api.mcsrvstat.us/2/" + $serverIP[0] + ":" + (($serverIP[1]) ? $serverIP[1] : "19132");
        var $mcAPIKeyubu = "https://api.keyubu.net/mc/ping.php?ip=" + $serverIP[0] + ":" + (($serverIP[1]) ? $serverIP[1] : "25565");
        // AJAX URL END
        
          if ($type == "mcAPIUs") {
            return $mcAPIUs;
          } else if ($type == "mcAPITc") {
            return $mcAPITc;
          } else if ($type == "mcAPIEu") {
            return $mcAPIEu;
          } else if ($type == "mcAPISrvJava") {
            return $mcAPISrvJava;
          } else if ($type == "mcAPISrvPocket") {
            return $mcAPISrvPocket;
          } else if ($type == "mcAPIKeyubu") {
            return $mcAPIKeyubu;
          } else {
            return $mcAPIUs;
          }
      }
      
      // AJAX
      $.ajax({
        url: createAjaxURL($APIType),
        dataType: "json",
        success: function(data) {
          if ($APIType == "mcAPIEu" || $APIType == "mcAPISrvJava" || $APIType == "mcAPISrvPocket" || $APIType == "mcAPIKeyubu") {
            var onlineServerStatus = data["online"];
            var onlineRow = data["players"]["online"];
          } else if ($APIType == "mcAPITc") {
            var onlineServerStatus = data["status"];
            var onlineRow = data["players"];
          } else {
            var onlineServerStatus = data["online"];
            var onlineRow = data["players"]["now"];
          }
          
          if (onlineServerStatus == true || ($APIType == 3 && onlineServerStatus != "offline")) {
              $onlineStatus.text(onlineRow);
          } else {
              $onlineStatus.text("0");
          }
        }
      });
      // AJAX END
    });
  }
})();

var CopyServerIP = (function() {
  var $copyip = $('[server-command="serverIPCopy"]');

  if ($copyip.length) {
    $copyip.each(function() {
      var clipboard = new ClipboardJS('[server-command="serverIPCopy"]');
      clipboard.on("success", function(e) {
        swal.fire({
            title: $languages["success"],
            text: $languages["editJSServerIPCopy"],
            type: "success",
            confirmButtonColor: "#02b875",
            confirmButtonText: $languages["okey"]
        });
      });
    });
  }
})();

var DiscordServerOnlineStatus = (function() {
  var $onlineStatus = $('[server-command="discordServerOnlineStatus"]');
  var $discordServerName = $('[server-command="discordServerName"]');
  var $discordInstantInvite = $('[server-command="discordInstantInvite"]');

  if ($onlineStatus.length) {
    $onlineStatus.each(function() {
      var $onlineStatus = $(this);
      var widgetID = $onlineStatus.attr("discord-widget");
      
      var $ajaxURL = "https://discordapp.com/api/guilds/" + widgetID + "/embed.json";
      
      // AJAX
      $.ajax({
        url: $ajaxURL,
        dataType: "json",
        success: function(data) {
          var discordServerID = data["id"];
          var onlineCount = data["presence_count"];
          var serverName = data["name"];
          var inviteCode = data["instant_invite"];
          if (discordServerID == widgetID) {
          	// ONLINE STATUS
              $onlineStatus.text(onlineCount);
              
              // SERVER NAME
              $discordServerName.text(serverName);
              
              // INSTANT INVITE
              $discordInstantInvite.on("click", function() {
                window.open(inviteCode, '_blank');
              });
          } else {
              $onlineStatus.text("0");
              $discordServerName.text("-/-");
          }
        }
      });
      // AJAX END
    });
  }
})();

$(document).ready(function() {
  var $input = $('[data-toggle="searchAccount"]');
  var $inputButton = $('[data-toggle="searchAccountButton"]');
  
  $input.on("keypress", function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      var $searchAccount = $input.val();
      window.location.href = $links["player"] + "/" + $searchAccount;
    }
    e.stopPropagation();
  });
  $inputButton.on("click", function(e) {
    var $searchAccount = $input.val();
	if ($searchAccount.length > 2) {
      window.location.href = $links["player"] + "/" + $searchAccount;
    }
  });
  
  
  if ($tawkToStatus == "1") {
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();
    (function(){
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/" + $tawkToID + "/default";
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
    })();
  }
  
  $('[data-toggle="tooltip"]').tooltip();

  $('.tabsm .tabsm-links').click(function() {
    var tabName = $(this).attr("tab-name");
    $("#" + tabName).find(".tabsm-links").removeClass('active');
    $(this).addClass('active');
    
    let currentTab = $(this).attr('href');
    $('[tab-content-name="'+tabName+'"]').find(".tabsm-pane").each(function() { $(this).css("display", "none"); });
    $('[tab-content-name="'+tabName+'"]').find(currentTab).css("display", "block");
  });

  $('[language="change"]').on("change", function() {
    window.location = "/main/index.php?language=" + $(this).val() + "&ref=" + $(this).attr("ref");
  });

  $('[currency="change"]').on("change", function() {
    window.location = "/main/index.php?currency=" + $(this).val() + "&ref=" + $(this).attr("ref");
  });
});

console.log("%c"+$languages["warning"]+"%c"+$languages["editJSConsoleLog"]+`%cMineXON All rights reserved © ${new Date().getFullYear()}`,"color: #ff0000; font-size: 32px; font-weight: 600; text-align: center; align-items: center; justify-content: center; margin-left: 12rem; position: relative; margin-bottom: 8px;","background-color: #ff0000; color: #ffffff; padding: 20px; border-radius: 10px; font-size: 16px; font-weight: bold","margin: 16px 0; border-radius: 10px; float: right; margin-left: 16rem");