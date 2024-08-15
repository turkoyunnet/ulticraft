// FUNCTIONS
function jsOptimizer() {
    $("[js-optimization]").each(function() {
        setTimeout(() => {
            $(this).addClass("is-ready")
        }, $(this).attr("js-optimization"));
    })
}
function ipClassAdder() {
    var ipText = $(".ip-text").text().toLowerCase(),
        splittedIpText = ipText.split("."),
        headDomains = [
            "play",
            "oyna",
            "mc",
            "gir"
        ],
        endDomains = [
            "com",
            "net",
            "xyz",
            "tk",
            "org",
            "network",
            "gg",
            "store",
            "wtf",
            "pw"
        ];
        for (var i = 0; i < splittedIpText.length; i++) {
        var condition = 
                (headDomains.indexOf(splittedIpText[i]) !== -1)
                ||
                (endDomains.indexOf(splittedIpText[i]) !== -1)
                ;
        
        condition ? splittedIpText[i] = "<span class='text-secondary'>" + splittedIpText[i] + "</span>" : null;
    }

    $(".ip-text").html(splittedIpText.join("."))  
}
function elementMirror() {
    $(".js-mirror").each(function() {
        var el = $(this),
            parent1 = el.parent(),
            parent1childrens = parent1.children(),
            elIndex = parent1childrens.index(el),
            mirrorClasses = el.attr("mirror-classes"),
            result;
            if (mirrorClasses) {
                result = "mirrored-item " + mirrorClasses
            }else {
                result = "mirrored-item"
            }
            if ( $(this).parent().find(".js-mirror").length == 1 ) {
                if (elIndex + 1 == parent1childrens.length){
                    el.clone().addClass(result).appendTo(parent1)
        
                }else{
                    el.clone().addClass(result).insertBefore(el.next())
                }
            }else {
            
            }
    })

    inView('.mirrored-item')    
        .on('enter', el => {
           el.classList.add("mirrored-item-alone");
           el.classList.add("mirrored-in-view");
        })
        .on('exit', el => {
            el.classList.remove("mirrored-in-view");
        });
    inView.offset(50);

}
function copyToClipboard() {
    var clipboard = new ClipboardJS('[data-clipboard-text]');

    clipboard.on('success', function(e) {
        $(".tooltip-inner").html($languages["functionJSCopyed"])

        e.clearSelection();
    });

    clipboard.on('error', function(e) {
        $(".tooltip-inner").html($languages["functionJSNotCopyed"])
    });
}
function textDivider() {
    $(".text-divider-js").each(function() {
        var navText = $(this).text(),
        splittedNavText = $.trim(navText).substr(1, navText.length),
        splitted2 = $.trim(navText).substr(0, 1);
    
    $(this).html("<span class='text-white'>" + splitted2 + "</span><span class='text-secondary'>" + splittedNavText + "</span>")
    })
}
function menuLiOptimizer() {
    var li = $(".navbar-bottom ul li"),
        liLength = li.length

    if (liLength > 6) {
        for (var i = 6; i < liLength; i++) {
            li.eq(i).remove()
        }
    }

    for (var i = 0; i < 6; i++) {
        var liEq = li.eq(i),
            svg = liEq.find("svg, i"),
            parent = svg.parent();
            
        if (i < 3) {
            svg.prependTo(parent)
        }else {
            svg.appendTo(parent)
            
            for (var i2 = 0; i2 <= 5; i2++) {
                if (svg.is(".mr-" + i2)) {
                    svg.toggleClass("mr-" + i2 + " ml-" + i2)
                }
            }
        }
    }

    li.eq(3).before("<div class='space d-none flex-grow-1 d-lg-block'></div>")
    

}
function swiperJS() {
    var menuItems = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]
    var swiperObject = new Swiper('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        pagination: {
            el: '.swiper-pagination',
    
			clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (menuItems[index]) + '</span>';
            },
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 5000,
        }
    })
}
function leaderboardOptimizer() {
    
    $(".card-leaderboard").parents(".card-wrapper").each(function() {
        /*<div class="col-12 p-1">
            <div class="card card-leaderboard card-leaderboard-placeholder d-block">
            </div>
        </div>
        */
       var childrenLength = $(this).children("div").length;
       if (childrenLength < 5) {
            for (var i = childrenLength; i < 5; i++) {

                $(this).append("<div class='col-12 p-1'><div class='card card-leaderboard card-placeholder d-block'></div></div>")

            }
       }
    });
    $(".card-leaderboard").each(function() {
        var el = $(this),
            parent = el.parent(),
            grandParent = parent.parent(),
            index = grandParent.children().index(parent);
        $(this).find(".id").html(index + 1)
        if ( index != 0) {
            // REMOVE SKIN
            el.find(".mc-skin").remove()

            // REMOVE PADDINGS
            el.removeClass("pt-5")
            el.find(".card-body").removeClass("pt-5").addClass("others")

            parent.toggleClass("col-6 col-12")

            if ( index < 3) {
                parent.addClass("d-none d-lg-block")
            }

        }
    })
   
}
function lastPostsOptimizer() {
    var childrenLength = $(".card-blog").parent().length;
       if (childrenLength < 4) {
            for (var i = childrenLength; i < 4; i++) {

                $(".card-blog").parent().parent().append("<div class='col-12 col-lg-6'><div class='card card-blog card-placeholder mt-4 d-block'></div></div>")

            }
       }
}
function logoOptimizer() {
    $(".navbar-toggler").on("click", function() {
        if ($(window).width() < 993) {
            $(".logo").toggleClass("d-none")
        }
    })
}
function scrollNavbar() {
   
    $(window).on("scroll", function() {
        if ($(window).width() > 993) {
            var navbarBottomHeight = $(".navbar-bottom").height(),
                broadcast = 0,
                navbarTop = $(".navbar-top").height();

            if ($(".broadcast").length != 0) {
                broadcast = $(".broadcast").height();
            }
            
            var result = broadcast + navbarTop + navbarBottomHeight;

            if ($(window).scrollTop() > result) {
                $(".navbar-bottom, .logo, #sidebar-wrapper").addClass("scrolled-down")
                $(".navbar-wrapper").css("margin-bottom", navbarBottomHeight + "px")
            }else {
                $(".navbar-bottom, .logo, #sidebar-wrapper").removeClass("scrolled-down")
                $(".navbar-wrapper").css("margin-bottom", "0px")

            }

        }else {
            $(".navbar-bottom, .logo").removeClass("scrolled-down")
            $(".navbar-wrapper").css("margin-bottom", "0px")

        }
    })
        
}
function inputBeautifier() {
    $("input, textarea, select").focus(function() {
        $(this).parent().addClass("input-focused");
    }).focusout(function(){
        $(this).parent().removeClass("input-focused");
    })
    $("input, textarea, select").each(function() {
        if($(this).val() != "") {
            $(this).parent().addClass("has-value")
        }else {
            $(this).parent().removeClass("has-value")
        }

        setTimeout(() => {
            if ($(this).is(":-webkit-autofill")) {
                $(this).parent().addClass("has-value")
            }else {
                $(this).parent().removeClass("has-value")
            }
        }, 100);
    })
    $("input, textarea, select").on("change", function() {
        if($(this).val() != "") {
            $(this).parent().addClass("has-value")
        }else {
            $(this).parent().removeClass("has-value")
        }
    })
    $(".input-group:not(.select-wrapper, .textarea-wrapper)").each(function() {
        var inputHeight = $(this).height();
            labelHeight = $(this).find("label").height();
            calculation = inputHeight / 2 - labelHeight / 2;
    

        $(this).find("label").css("top", calculation + "px")
        $(this).find("label").css("left", calculation + 5 + "px")
    })
}
function searchFilter() {
    $(".filter-bar").find("input[type='search']").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".filter-item--name").each(function() {
            var text = $(this).text().toLowerCase();
            $(".filter-item").addClass("filtering")
                if (text.search(value) == -1) {
                    $(this).parents(".filter-item").addClass("d-none")
                }else {
                    $(this).parents(".filter-item").removeClass("d-none")
                }
            setTimeout(() => {
                $(".filter-item").removeClass("filtering")
            }, 300);
        });
        $(".filter-category").each(function() {
            if ( $(this).find(".filter-item").length == $(this).find(".filter-item.d-none").length ) {
                if ($(this).find(".no-product-wrapper").length == 0) {
                    
                    $(this).append("<div class='col-12 py-1 no-product-wrapper'></div>")
                    $(this).find(".no-product-wrapper").append("<div class='alert bg-dark--1 border-0 text-white p-3 py-4 font-100 overflow-hidden position-relative no-product alert-danger font-size-7' role='alert'><img class='mr-2 js-mirror' src='/main/themes/dark/theme/assets/img/alert-error.png'><span class='pl-5'>"+ $languages["functionJSNotSearch"] +"</span></div>")
                    
                    elementMirror();
                }
            }else {
                if ($(this).find(".no-product-wrapper").length != 0) {
                    $(this).find(".no-product-wrapper").remove()
                }
            }
        });
    });

    var priceArray = [],
        positionArray = [];

    // PRICE AND POSITIONS
    $(".filter-item").each(function() {
        var price = parseInt($(this).find(".filter-item--price").text(), 10),
            position = $(this).index();
        $(this).attr("filter-price", price)
        $(this).attr("filter-position", position)

        if ( !(priceArray.includes(price)) ) {
            priceArray.push(price)
        }

        if ( !(positionArray.includes(position)) ) {
            positionArray.push(position)
        }

    })

    // SORT ARRAYS


    $(".filter-bar").find("select").on("change", function() {
        var value = $(this).find(":selected").val();
        
        $(".filter-category").each(function() {
            if (value == "cheapest" || value == "most-expensive") {
                if (value == "cheapest") {
                    priceArray.sort(function(a, b){return b - a})
                }else if (value == "most-expensive") {
                    priceArray.sort(function(a, b){return a - b})
                }
                var array = priceArray;
                for (var i = 0; i < array.length; i++) {
                    var el = $(this).find("[filter-price='" + array[i] + "']" );
                    el.prependTo( $(this) )
                }
            }else if (value == "newest") {
                positionArray.sort(function(a, b){return b - a})
                var array = positionArray;
                for (var i = 0; i < array.length; i++) {
                    var el = $(this).find("[filter-position='" + array[i] + "']" );
                    el.prependTo( $(this) )
                }
            }
        });
    });
};
function loader() {
    
    var span = $(".loader span"),
        text = $.trim(span.text()),

        letterCount = text.length;
        splitted = text.split(''),

        isFilled = localStorage.getItem("loader") == "filled";

    if (isFilled) {
        loadTime = 300;
        letterTime = loadTime - 100;
        waitTime = 0;
    }else {
        loadTime = 1000;
        letterTime = loadTime / letterCount;
    }
    for (var i = 0; i < splitted.length; i++) {
        if (!isFilled) {
            waitTime = i * letterTime
        }
        style = `transition: ${letterTime}ms all ease ${waitTime}ms`
        $(".loader").append(`<span style='${style}'> ${splitted[i]} </span>`)
    
    }
    
    setTimeout(() => {
        $(".loader").addClass("filling")
    }, 10);

    var returnTime = loadTime + 100;
    setTimeout(() => {
        $(".loader").addClass("out")
        $("body").removeClass("overflow-hidden")
        $("body").addClass("overflow-auto")
        localStorage.setItem("loader", "filled")
    }, returnTime);
    setTimeout(() => {
        $(".loader").toggleClass("d-flex d-none")
    }, returnTime + 300);


}


function swalChecker() {

    if ( $(".swal2-icon-show").is(".js-mirror") ) {}else {
        setTimeout(() => {
            $(".swal2-icon-show").addClass("js-mirror")
        }, 10);
    
        setTimeout(() => {
            elementMirror();
        }, 300);
    }
    
}
// CALLERS

function headerJS() {
    ipClassAdder(); 
    textDivider();
    menuLiOptimizer();

    if ($(".navbar-bottom").length != 0) {
        scrollNavbar();
    }
    if ($(".logo").length != 0) {
        logoOptimizer();
    } 
}
function frameworkJS() {
    if ($(".filter-bar").length != 0) {
        searchFilter()
    }
    if ($(".swiper-container").length != 0) {
        swiperJS();
    }
    if ($("[data-clipboard-text]").length != 0) {
        copyToClipboard();
    }
    if ($("select").length != 0) {
        $(document).ready(function() {
            $('.js-select2').select2({
                placeholder: ' s',
                minimumResultsForSearch: 999,
                theme: 'theme01',
                width: 'resolve',
            });
            
        });
        $('.js-select2').on('select2:open', function (e) {
            $(this).parent().addClass("select-focused")
        }).on('select2:close', function(e) {
            $(this).parent().removeClass("select-focused")
        });
    }
    if ($("textarea").length != 0) {
        autosize(document.querySelectorAll('textarea'));
    }
    if ($(".js-marquee").length != 0) {
        $(function () {
            $('.js-marquee').marquee({
                duplicate: true,
                speed: 75,
                pauseOnHover: true,
            });
        });
    }

    if($(".contact-card").length != 0) {
        var profileHeight = $(".profile-header").height(),
            contactCardLength = 2,
            contactCardHeight = $(".contact-card").height(),
            calculation = (profileHeight - ( (contactCardLength - 1) * 8)) / contactCardLength;

        $(".contact-card").css({
            "height": calculation + "px",
            "padding": ((calculation / 2) - (contactCardHeight / 2)) + "px"
        })
        
    }
 
}
function utilityJS() {
    if ($(".js-mirror").length != 0) {
        elementMirror();
    } 

    if ($(".card-leaderboard").length != 0) {
        leaderboardOptimizer();
    } 
    if ($(".card-blog").length != 0) {
        lastPostsOptimizer()
    }
    
    if ($("input, textarea").length != 0) {
        inputBeautifier()
    }

    $('.modal').on('shown.bs.modal', function (e) {
        inputBeautifier();
    })

    if ($(".loader").length != 0) {
        loader();
    }else {
        jsOptimizer()
    }
    swalChecker();
    $("*").on("click", swalChecker)

    $(".sweetalert-test-error").on("click", function() {
        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue?',
            icon: 'error',
            confirmButtonText: 'Cool',
            showCancelButton: true
        })
    })

}

// MAIN CALLER
var FunctionLoader = (function() {
    headerJS();
    frameworkJS();
    utilityJS();
})();