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

function openComment() {
    commentWindow = window.open("review.html", 'newWindow', 'width=600,height=600');

}

function changeHeart() {
    var image = document.getElementById('heart');
    if (image.src.match("../static/empty_heart.jpg")) {
        image.src = "../static/full_heart.jpg";
    } else {
        image.src = "../static/empty_heart.jpg";
    }
}

function showDiv() {
    document.getElementById('recommend_result').style.display = "block";
}

var trip = Array("טיול טרקטורונים", "קיר טיפוס", "שייט קיאקים", "שייט בסירת פדלים", "צניחה חופשית", "פיינטבול");

function randomtrip() {
    var randomTrip = trip[Math.floor(Math.random() * trip.length)];
    document.getElementById('randomTrip').value = randomTrip;
}