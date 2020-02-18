(function($) {
  skel.breakpoints({
    xlarge: "(max-width: 1680px)",
    large: "(max-width: 1280px)",
    medium: "(max-width: 980px)",
    small: "(max-width: 736px)",
    xsmall: "(max-width: 480px)"
  });

  $(function() {
    var $window = $(window),
      $body = $("body");

    $(".jquery-background-video").bgVideo({ fadeIn: 2000 });

    // Disable animations/transitions until the page has loaded.
    $body.addClass("is-loading");

    $window.on("load", function() {
      window.setTimeout(function() {
        $body.removeClass("is-loading");
      }, 100);
    });

    // Fix: Placeholder polyfill.
    $("form").placeholder();

    // Banner.
    var $banner = $("#banner");

    if ($banner.length > 0) {
      // IE fix.
      if (skel.vars.IEVersion < 12) {
        $window.on("resize", function() {
          var wh = $window.height() * 0.6,
            bh = $banner.height();

          $banner.css("height", "auto");

          window.setTimeout(function() {
            if (bh < wh) $banner.css("height", wh + "px");
          }, 0);
        });

        $window.on("load", function() {
          $window.triggerHandler("resize");
        });
      }

      // Video check.
      var video = $banner.data("video");

      if (video)
        $window.on("load.banner", function() {
          // Disable banner load event (so it doesn't fire again).
          $window.off("load.banner");

          // Append video if supported.
          if (
            !skel.vars.mobile &&
            !skel.breakpoint("large").active &&
            skel.vars.IEVersion > 9
          )
            $banner.append(
              '<video autoplay loop><source src="' +
                video +
                '.mp4" type="video/mp4" /><source src="' +
                video +
                '.webm" type="video/webm" /></video>'
            );
        });

      // More button.
      // $banner.find(".more").addClass("scrolly");
    }

    // // Scrolly.
    // $(".scrolly").scrolly();

    // // Initial scroll.
    // $window.on("load", function() {
    //   $window.trigger("scroll");
    // });
  });
})(jQuery);

//
// Smooth Scroll
//
function currentYPosition() {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) return self.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

function elmYPosition(eID) {
  var elm = document.getElementById(eID);
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent != document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}

function smoothScroll(eID) {
  var startY = currentYPosition();
  var stopY = elmYPosition(eID);
  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 50) {
    scrollTo(0, stopY);
    return;
  }
  var speed = Math.round(distance / 100);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (var i = startY; i > stopY; i -= step) {
    setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
  return false;
}

//
//
