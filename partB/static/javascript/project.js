function empty() {
    if (document.new_user.email.value == "") {
        alert("Some of your fields are empty");
        document.new_user.email.focus();
        return false;
    }
    if (document.new_user.username.value == "") {
        alert("Some of your fields are empty");
        document.new_user.username.focus();
        return false;
    }
    if (document.new_user.password.value == "") {
        alert("Some of your fields are empty");
        document.new_user.password.focus();
        return false;
    }

    /*-------login page------*/
    if (document.login.password.value == "") {
        alert("you must complete all details");
        document.login.password.focus();
        return false;
    }
    if (document.login.username.value == "") {
        alert("you must complete all details");
        document.login.username.focus();
        return false;
    }

}

function FindTrip() {
    if (document.new_user.email.value == "") {
        alert("Some of your fields are empty");
        document.new_user.email.focus();
        return false;
    }

}

(function () {

    function Slideshow(element) {
        this.el = document.querySelector(element);
        this.init();
    }

    Slideshow.prototype = {
        init: function () {
            this.wrapper = this.el.querySelector(".slider-wrapper");
            this.slides = this.el.querySelectorAll(".slide");
            this.previous = this.el.querySelector(".slider-previous");
            this.next = this.el.querySelector(".slider-next");
            this.index = 0;
            this.total = this.slides.length;
            this.timer = null;
            this.action();
            this.stopStart();
        },

        _slideTo: function (slide) {
            var currentSlide = this.slides[slide];
            currentSlide.style.opacity = 1;
            for (var i = 0; i < this.slides.length; i++) {
                var slide = this.slides[i];
                if (slide !== currentSlide) {
                    slide.style.opacity = 0;
                }
            }
        },

        action: function () {
            var self = this;
            self.timer = setInterval(function () {
                self.index++;
                if (self.index == self.slides.length) {
                    self.index = 0;
                }
                self._slideTo(self.index);
            }, 3000);
        },

        stopStart: function () {
            var self = this;
            self.el.addEventListener("mouseover", function () {
                clearInterval(self.timer);
                self.timer = null;
            }, false);
            self.el.addEventListener("mouseout", function () {
                self.action();
            }, false);
        }
    };

    document.addEventListener("DOMContentLoaded", function () {
        var slider = new Slideshow("#main-slider");
    });
})();

function checklogin(){

}

function showDiv() {
    document.getElementById('recommend_result').style.display = "block";
}

function randomtrip() {
    var chosentype=document.getElementById('recommend_trip').value;
    var childtrip = Array("עין נון- מעיין שכשוך בכנרת", "ג'ימבורי", "משחקייה", "שייט בסירת פדלים", "ספרייה");
    var biggroup=Array("קיאקים בצפון","סדנת בישול","ארוחת ערב במסעדה","טיול רגלי במצדה","מסלול הליכה בצפון")
    var coupletrip=Array("בר יין בוטיק","טיול הליכה בשקיעה","צפייה משותפת בטלוויזיה","באולינג","מסעדה רומנטית בשקיעה","טיול זריחה במצדה")
    var sleepatnotrh=Array("חניון עין חרוד עמק המעיינות","לינה בחניוני הכנרת","חניון לילה נחל האסי","חניון לילה קריית שמונה")
    if (chosentype=='טיולי מים לקטנטנים בצפון'){
         var randomTrip = childtrip[Math.floor(Math.random() * childtrip.length)];
        document.getElementById('randomTrip').value = randomTrip;
    }
    if (chosentype=='פעילויות לקבוצות גדולות'){
        var randomTrip = biggroup[Math.floor(Math.random() * biggroup.length)];
        document.getElementById('randomTrip').value = randomTrip;
        }
    if (chosentype=='פעילויות לזוגות'){
        var randomTrip = coupletrip[Math.floor(Math.random() * coupletrip.length)];
        document.getElementById('randomTrip').value = randomTrip;
        }
    if (chosentype=='חניוני לילה בצפון'){
        var randomTrip = sleepatnotrh[Math.floor(Math.random() * sleepatnotrh.length)];
        document.getElementById('randomTrip').value = randomTrip;
}
}


function phonenumber(inputtxt)
{
  var phoneno = /^\d{10}$/;
  if(inputtxt.value.match(phoneno)){
      return true;
        }
      else
        {
        alert("your phone number is not valid");
        return false;
        }
}



