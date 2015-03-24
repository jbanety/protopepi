var EtdSolutions = {};

    var e = 0,
        t, n;

    EtdSolutions.Scroll = {

        $currentPage: $(".page").first(),

        scrollHandlerNT: function (e) {
            e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0 || e.which == 40 ? this.$currentPage.nextAll(".page").length && (this.$currentPage = this.$currentPage.nextAll(".page").first()) : this.$currentPage.prevAll(".page").length && (this.$currentPage = this.$currentPage.prevAll(".page").first()), $("html, body").stop().animate({
                scrollTop: this.$currentPage.offset() ? this.$currentPage.offset().top - 80 : 0
            }, 1e3);
            return
        },

        scrollHandler: function (e) {
            this.throttledScroller || (this.throttledScroller = _.throttle(this.scrollHandlerNT, 1e3, {
                trailing: false
            })), this.throttledScroller(e)
        },

        stuck: function (e) {
            e == "up" ? $(this).children(".bg-img").removeClass("current") : $(this).children(".bg-img").addClass("current")
        },
        reveal: function (e, t) {
            e == "up" ? $(this).find(t).addClass("hide") : $(this).find(t).removeClass("hide")
        },
        revealOpp: function (e, t) {
            e == "down" ? $(this).children(t).addClass("hide") : $(this).children(t).removeClass("hide")
        },
        dotFiller: function (e, t) {
            var n = $("#pagination");
            e == "down" ? (this.$currentPage = $(this), $("#pagination").children("a:nth-child(" + t + ")").addClass("active")) : $("#pagination").children("a:nth-child(" + t + ")").removeClass("active")
        },
        paginationDarkOn: function (e) {
            e == "up" ? $("#pagination").removeClass("dark") : $("#pagination").addClass("dark")
        },
        paginationDarkOff: function (e) {
            e == "down" ? $("#pagination").removeClass("dark") : $("#pagination").addClass("dark")
        },
        sign: function (e) {
            return e < 0 ? -1 : 1
        },
        bindWaypoints: function (e, t, n, r) {
            n ? t.forEach(function (t, n) {
                t.call($("#" + e + "-" + (n + 2)), "down")
            }) : r ? t.forEach(function (t, n) {
                $("#" + e + "-" + (n + 2)).waypoint(t, {
                    offset: "100%"
                })
            }) : t.forEach(function (t, n) {
                $("#" + e + "-" + (n + 2)).waypoint(t, {
                    offset: "bottom-in-view"
                })
            })
        },
        initFancyScroll: function (r, i) {
            var s = this,
                o = 1024;
            s.bindWaypoints(r, i, navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? !0 : !1, $(window).width() <= o), $("body").on("keydown", function (e) {
                (e.which == 40 || e.which == 38) && s.scrollHandler(e)
            }), $(window).resize(function () {
                var r = $(this),
                    i;
                (!n || n > o) && r.width() <= o ? $(window).off("DOMMouseScroll mousewheel") : (!n || n <= o) && r.width() > o && $(window).on("DOMMouseScroll mousewheel", function (n) {
                    var r = $(":animated");
                    n.preventDefault(), t !== s.sign(n.originalEvent.wheelDelta) && r.length !== 0 && (r.stop(), s.scrollHandlerNT(n)), t = s.sign(n.originalEvent.wheelDelta);
                    if (n.timeStamp - e < 50) {
                        e = n.timeStamp;
                        return
                    }
                    e = n.timeStamp, s.scrollHandler(n)
                }), n = r.width(), n > o && (offsetTop = this.$currentPage ? this.$currentPage.offset().top : 0, $("body")[0].scrollTop = offsetTop ? offsetTop - 80 : 0)
            }), $(window).resize()
        }
    }