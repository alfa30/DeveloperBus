angular.module('ui.bootstrap', [
  'ui.bootstrap.tpls',
  'ui.bootstrap.transition',
  'ui.bootstrap.collapse',
  'ui.bootstrap.accordion',
  'ui.bootstrap.alert',
  'ui.bootstrap.bindHtml',
  'ui.bootstrap.buttons',
  'ui.bootstrap.carousel',
  'ui.bootstrap.position',
  'ui.bootstrap.datepicker',
  'ui.bootstrap.dropdownToggle',
  'ui.bootstrap.modal',
  'ui.bootstrap.pagination',
  'ui.bootstrap.tooltip',
  'ui.bootstrap.popover',
  'ui.bootstrap.progressbar',
  'ui.bootstrap.rating',
  'ui.bootstrap.tabs',
  'ui.bootstrap.timepicker',
  'ui.bootstrap.typeahead'
]), angular.module('ui.bootstrap.tpls', [
  'template/accordion/accordion-group.html',
  'template/accordion/accordion.html',
  'template/alert/alert.html',
  'template/carousel/carousel.html',
  'template/carousel/slide.html',
  'template/datepicker/datepicker.html',
  'template/datepicker/popup.html',
  'template/modal/backdrop.html',
  'template/modal/window.html',
  'template/pagination/pager.html',
  'template/pagination/pagination.html',
  'template/tooltip/tooltip-html-unsafe-popup.html',
  'template/tooltip/tooltip-popup.html',
  'template/popover/popover.html',
  'template/progressbar/bar.html',
  'template/progressbar/progress.html',
  'template/rating/rating.html',
  'template/tabs/tab.html',
  'template/tabs/tabset-titles.html',
  'template/tabs/tabset.html',
  'template/timepicker/timepicker.html',
  'template/typeahead/typeahead-match.html',
  'template/typeahead/typeahead-popup.html'
]), angular.module('ui.bootstrap.transition', []).factory('$transition', [
  '$q',
  '$timeout',
  '$rootScope',
  function (e, t, n) {
    function a(e) {
      for (var t in e)
        if (void 0 !== r.style[t])
          return e[t];
    }
    var i = function (a, r, o) {
        o = o || {};
        var l = e.defer(), s = i[o.animation ? 'animationEndEventName' : 'transitionEndEventName'], c = function () {
            n.$apply(function () {
              a.unbind(s, c), l.resolve(a);
            });
          };
        return s && a.bind(s, c), t(function () {
          angular.isString(r) ? a.addClass(r) : angular.isFunction(r) ? r(a) : angular.isObject(r) && a.css(r), s || l.resolve(a);
        }), l.promise.cancel = function () {
          s && a.unbind(s, c), l.reject('Transition cancelled');
        }, l.promise;
      }, r = document.createElement('trans'), o = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd',
        transition: 'transitionend'
      }, l = {
        WebkitTransition: 'webkitAnimationEnd',
        MozTransition: 'animationend',
        OTransition: 'oAnimationEnd',
        transition: 'animationend'
      };
    return i.transitionEndEventName = a(o), i.animationEndEventName = a(l), i;
  }
]), angular.module('ui.bootstrap.collapse', ['ui.bootstrap.transition']).directive('collapse', [
  '$transition',
  function (e) {
    var t = function (e, t, n) {
      t.removeClass('collapse'), t.css({ height: n }), t[0].offsetWidth, t.addClass('collapse');
    };
    return {
      link: function (n, a, i) {
        var r, o = !0;
        n.$watch(function () {
          return a[0].scrollHeight;
        }, function () {
          0 !== a[0].scrollHeight && (r || (o ? t(n, a, a[0].scrollHeight + 'px') : t(n, a, 'auto')));
        }), n.$watch(i.collapse, function (e) {
          e ? u() : c();
        });
        var l, s = function (t) {
            return l && l.cancel(), l = e(a, t), l.then(function () {
              l = void 0;
            }, function () {
              l = void 0;
            }), l;
          }, c = function () {
            o ? (o = !1, r || t(n, a, 'auto')) : s({ height: a[0].scrollHeight + 'px' }).then(function () {
              r || t(n, a, 'auto');
            }), r = !1;
          }, u = function () {
            r = !0, o ? (o = !1, t(n, a, 0)) : (t(n, a, a[0].scrollHeight + 'px'), s({ height: '0' }));
          };
      }
    };
  }
]), angular.module('ui.bootstrap.accordion', ['ui.bootstrap.collapse']).constant('accordionConfig', { closeOthers: !0 }).controller('AccordionController', [
  '$scope',
  '$attrs',
  'accordionConfig',
  function (e, t, n) {
    this.groups = [], this.closeOthers = function (a) {
      var i = angular.isDefined(t.closeOthers) ? e.$eval(t.closeOthers) : n.closeOthers;
      i && angular.forEach(this.groups, function (e) {
        e !== a && (e.isOpen = !1);
      });
    }, this.addGroup = function (e) {
      var t = this;
      this.groups.push(e), e.$on('$destroy', function () {
        t.removeGroup(e);
      });
    }, this.removeGroup = function (e) {
      var t = this.groups.indexOf(e);
      -1 !== t && this.groups.splice(this.groups.indexOf(e), 1);
    };
  }
]).directive('accordion', function () {
  return {
    restrict: 'EA',
    controller: 'AccordionController',
    transclude: !0,
    replace: !1,
    templateUrl: 'template/accordion/accordion.html'
  };
}).directive('accordionGroup', [
  '$parse',
  '$transition',
  '$timeout',
  function (e) {
    return {
      require: '^accordion',
      restrict: 'EA',
      transclude: !0,
      replace: !0,
      templateUrl: 'template/accordion/accordion-group.html',
      scope: { heading: '@' },
      controller: [
        '$scope',
        function () {
          this.setHeading = function (e) {
            this.heading = e;
          };
        }
      ],
      link: function (t, n, a, i) {
        var r, o;
        i.addGroup(t), t.isOpen = !1, a.isOpen && (r = e(a.isOpen), o = r.assign, t.$watch(function () {
          return r(t.$parent);
        }, function (e) {
          t.isOpen = e;
        }), t.isOpen = r ? r(t.$parent) : !1), t.$watch('isOpen', function (e) {
          e && i.closeOthers(t), o && o(t.$parent, e);
        });
      }
    };
  }
]).directive('accordionHeading', function () {
  return {
    restrict: 'EA',
    transclude: !0,
    template: '',
    replace: !0,
    require: '^accordionGroup',
    compile: function (e, t, n) {
      return function (e, t, a, i) {
        i.setHeading(n(e, function () {
        }));
      };
    }
  };
}).directive('accordionTransclude', function () {
  return {
    require: '^accordionGroup',
    link: function (e, t, n, a) {
      e.$watch(function () {
        return a[n.accordionTransclude];
      }, function (e) {
        e && (t.html(''), t.append(e));
      });
    }
  };
}), angular.module('ui.bootstrap.alert', []).directive('alert', function () {
  return {
    restrict: 'EA',
    templateUrl: 'template/alert/alert.html',
    transclude: !0,
    replace: !0,
    scope: {
      type: '=',
      close: '&'
    },
    link: function (e, t, n) {
      e.closeable = 'close' in n;
    }
  };
}), angular.module('ui.bootstrap.bindHtml', []).directive('bindHtmlUnsafe', function () {
  return function (e, t, n) {
    t.addClass('ng-binding').data('$binding', n.bindHtmlUnsafe), e.$watch(n.bindHtmlUnsafe, function (e) {
      t.html(e || '');
    });
  };
}), angular.module('ui.bootstrap.buttons', []).constant('buttonConfig', {
  activeClass: 'active',
  toggleEvent: 'click'
}).directive('btnRadio', [
  'buttonConfig',
  function (e) {
    var t = e.activeClass || 'active', n = e.toggleEvent || 'click';
    return {
      require: 'ngModel',
      link: function (e, a, i, r) {
        r.$render = function () {
          a.toggleClass(t, angular.equals(r.$modelValue, e.$eval(i.btnRadio)));
        }, a.bind(n, function () {
          a.hasClass(t) || e.$apply(function () {
            r.$setViewValue(e.$eval(i.btnRadio)), r.$render();
          });
        });
      }
    };
  }
]).directive('btnCheckbox', [
  'buttonConfig',
  function (e) {
    var t = e.activeClass || 'active', n = e.toggleEvent || 'click';
    return {
      require: 'ngModel',
      link: function (e, a, i, r) {
        function o() {
          var t = e.$eval(i.btnCheckboxTrue);
          return angular.isDefined(t) ? t : !0;
        }
        function l() {
          var t = e.$eval(i.btnCheckboxFalse);
          return angular.isDefined(t) ? t : !1;
        }
        r.$render = function () {
          a.toggleClass(t, angular.equals(r.$modelValue, o()));
        }, a.bind(n, function () {
          e.$apply(function () {
            r.$setViewValue(a.hasClass(t) ? l() : o()), r.$render();
          });
        });
      }
    };
  }
]), angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition']).controller('CarouselController', [
  '$scope',
  '$timeout',
  '$transition',
  '$q',
  function (e, t, n) {
    function a() {
      function n() {
        r ? (e.next(), a()) : e.pause();
      }
      i && t.cancel(i);
      var o = +e.interval;
      !isNaN(o) && o >= 0 && (i = t(n, o));
    }
    var i, r, o = this, l = o.slides = [], s = -1;
    o.currentSlide = null, o.select = function (i, r) {
      function c() {
        o.currentSlide && angular.isString(r) && !e.noTransition && i.$element ? (i.$element.addClass(r), i.$element[0].offsetWidth, angular.forEach(l, function (e) {
          angular.extend(e, {
            direction: '',
            entering: !1,
            leaving: !1,
            active: !1
          });
        }), angular.extend(i, {
          direction: r,
          active: !0,
          entering: !0
        }), angular.extend(o.currentSlide || {}, {
          direction: r,
          leaving: !0
        }), e.$currentTransition = n(i.$element, {}), function (t, n) {
          e.$currentTransition.then(function () {
            u(t, n);
          }, function () {
            u(t, n);
          });
        }(i, o.currentSlide)) : u(i, o.currentSlide), o.currentSlide = i, s = p, a();
      }
      function u(t, n) {
        angular.extend(t, {
          direction: '',
          active: !0,
          leaving: !1,
          entering: !1
        }), angular.extend(n || {}, {
          direction: '',
          active: !1,
          leaving: !1,
          entering: !1
        }), e.$currentTransition = null;
      }
      var p = l.indexOf(i);
      void 0 === r && (r = p > s ? 'next' : 'prev'), i && i !== o.currentSlide && (e.$currentTransition ? (e.$currentTransition.cancel(), t(c)) : c());
    }, o.indexOfSlide = function (e) {
      return l.indexOf(e);
    }, e.next = function () {
      var t = (s + 1) % l.length;
      return e.$currentTransition ? void 0 : o.select(l[t], 'next');
    }, e.prev = function () {
      var t = 0 > s - 1 ? l.length - 1 : s - 1;
      return e.$currentTransition ? void 0 : o.select(l[t], 'prev');
    }, e.select = function (e) {
      o.select(e);
    }, e.isActive = function (e) {
      return o.currentSlide === e;
    }, e.slides = function () {
      return l;
    }, e.$watch('interval', a), e.play = function () {
      r || (r = !0, a());
    }, e.pause = function () {
      e.noPause || (r = !1, i && t.cancel(i));
    }, o.addSlide = function (t, n) {
      t.$element = n, l.push(t), 1 === l.length || t.active ? (o.select(l[l.length - 1]), 1 == l.length && e.play()) : t.active = !1;
    }, o.removeSlide = function (e) {
      var t = l.indexOf(e);
      l.splice(t, 1), l.length > 0 && e.active ? t >= l.length ? o.select(l[t - 1]) : o.select(l[t]) : s > t && s--;
    };
  }
]).directive('carousel', [function () {
    return {
      restrict: 'EA',
      transclude: !0,
      replace: !0,
      controller: 'CarouselController',
      require: 'carousel',
      templateUrl: 'template/carousel/carousel.html',
      scope: {
        interval: '=',
        noTransition: '=',
        noPause: '='
      }
    };
  }]).directive('slide', [
  '$parse',
  function (e) {
    return {
      require: '^carousel',
      restrict: 'EA',
      transclude: !0,
      replace: !0,
      templateUrl: 'template/carousel/slide.html',
      scope: {},
      link: function (t, n, a, i) {
        if (a.active) {
          var r = e(a.active), o = r.assign, l = t.active = r(t.$parent);
          t.$watch(function () {
            var e = r(t.$parent);
            return e !== t.active && (e !== l ? l = t.active = e : o(t.$parent, e = l = t.active)), e;
          });
        }
        i.addSlide(t, n), t.$on('$destroy', function () {
          i.removeSlide(t);
        }), t.$watch('active', function (e) {
          e && i.select(t);
        });
      }
    };
  }
]), angular.module('ui.bootstrap.position', []).factory('$position', [
  '$document',
  '$window',
  function (e, t) {
    function n(e, n) {
      return e.currentStyle ? e.currentStyle[n] : t.getComputedStyle ? t.getComputedStyle(e)[n] : e.style[n];
    }
    function a(e) {
      return 'static' === (n(e, 'position') || 'static');
    }
    var i = function (t) {
      for (var n = e[0], i = t.offsetParent || n; i && i !== n && a(i);)
        i = i.offsetParent;
      return i || n;
    };
    return {
      position: function (t) {
        var n = this.offset(t), a = {
            top: 0,
            left: 0
          }, r = i(t[0]);
        return r != e[0] && (a = this.offset(angular.element(r)), a.top += r.clientTop - r.scrollTop, a.left += r.clientLeft - r.scrollLeft), {
          width: t.prop('offsetWidth'),
          height: t.prop('offsetHeight'),
          top: n.top - a.top,
          left: n.left - a.left
        };
      },
      offset: function (n) {
        var a = n[0].getBoundingClientRect();
        return {
          width: n.prop('offsetWidth'),
          height: n.prop('offsetHeight'),
          top: a.top + (t.pageYOffset || e[0].body.scrollTop || e[0].documentElement.scrollTop),
          left: a.left + (t.pageXOffset || e[0].body.scrollLeft || e[0].documentElement.scrollLeft)
        };
      }
    };
  }
]), angular.module('ui.bootstrap.datepicker', ['ui.bootstrap.position']).constant('datepickerConfig', {
  dayFormat: 'dd',
  monthFormat: 'MMMM',
  yearFormat: 'yyyy',
  dayHeaderFormat: 'EEE',
  dayTitleFormat: 'MMMM yyyy',
  monthTitleFormat: 'yyyy',
  showWeeks: !0,
  startingDay: 0,
  yearRange: 20,
  minDate: null,
  maxDate: null
}).controller('DatepickerController', [
  '$scope',
  '$attrs',
  'dateFilter',
  'datepickerConfig',
  function (e, t, n, a) {
    function i(t, n) {
      return angular.isDefined(t) ? e.$parent.$eval(t) : n;
    }
    function r(e, t) {
      return new Date(e, t, 0).getDate();
    }
    function o(e, t) {
      for (var n = Array(t), a = e, i = 0; t > i;)
        n[i++] = new Date(a), a.setDate(a.getDate() + 1);
      return n;
    }
    function l(e, t, a, i) {
      return {
        date: e,
        label: n(e, t),
        selected: !!a,
        secondary: !!i
      };
    }
    var s = {
        day: i(t.dayFormat, a.dayFormat),
        month: i(t.monthFormat, a.monthFormat),
        year: i(t.yearFormat, a.yearFormat),
        dayHeader: i(t.dayHeaderFormat, a.dayHeaderFormat),
        dayTitle: i(t.dayTitleFormat, a.dayTitleFormat),
        monthTitle: i(t.monthTitleFormat, a.monthTitleFormat)
      }, c = i(t.startingDay, a.startingDay), u = i(t.yearRange, a.yearRange);
    this.minDate = a.minDate ? new Date(a.minDate) : null, this.maxDate = a.maxDate ? new Date(a.maxDate) : null, this.modes = [
      {
        name: 'day',
        getVisibleDates: function (e, t) {
          var a = e.getFullYear(), i = e.getMonth(), u = new Date(a, i, 1), p = c - u.getDay(), d = p > 0 ? 7 - p : -p, f = new Date(u), m = 0;
          d > 0 && (f.setDate(-d + 1), m += d), m += r(a, i + 1), m += (7 - m % 7) % 7;
          for (var g = o(f, m), h = Array(7), v = 0; m > v; v++) {
            var b = new Date(g[v]);
            g[v] = l(b, s.day, t && t.getDate() === b.getDate() && t.getMonth() === b.getMonth() && t.getFullYear() === b.getFullYear(), b.getMonth() !== i);
          }
          for (var $ = 0; 7 > $; $++)
            h[$] = n(g[$].date, s.dayHeader);
          return {
            objects: g,
            title: n(e, s.dayTitle),
            labels: h
          };
        },
        compare: function (e, t) {
          return new Date(e.getFullYear(), e.getMonth(), e.getDate()) - new Date(t.getFullYear(), t.getMonth(), t.getDate());
        },
        split: 7,
        step: { months: 1 }
      },
      {
        name: 'month',
        getVisibleDates: function (e, t) {
          for (var a = Array(12), i = e.getFullYear(), r = 0; 12 > r; r++) {
            var o = new Date(i, r, 1);
            a[r] = l(o, s.month, t && t.getMonth() === r && t.getFullYear() === i);
          }
          return {
            objects: a,
            title: n(e, s.monthTitle)
          };
        },
        compare: function (e, t) {
          return new Date(e.getFullYear(), e.getMonth()) - new Date(t.getFullYear(), t.getMonth());
        },
        split: 3,
        step: { years: 1 }
      },
      {
        name: 'year',
        getVisibleDates: function (e, t) {
          for (var n = Array(u), a = e.getFullYear(), i = parseInt((a - 1) / u, 10) * u + 1, r = 0; u > r; r++) {
            var o = new Date(i + r, 0, 1);
            n[r] = l(o, s.year, t && t.getFullYear() === o.getFullYear());
          }
          return {
            objects: n,
            title: [
              n[0].label,
              n[u - 1].label
            ].join(' - ')
          };
        },
        compare: function (e, t) {
          return e.getFullYear() - t.getFullYear();
        },
        split: 5,
        step: { years: u }
      }
    ], this.isDisabled = function (t, n) {
      var a = this.modes[n || 0];
      return this.minDate && 0 > a.compare(t, this.minDate) || this.maxDate && a.compare(t, this.maxDate) > 0 || e.dateDisabled && e.dateDisabled({
        date: t,
        mode: a.name
      });
    };
  }
]).directive('datepicker', [
  'dateFilter',
  '$parse',
  'datepickerConfig',
  '$log',
  function (e, t, n, a) {
    return {
      restrict: 'EA',
      replace: !0,
      templateUrl: 'template/datepicker/datepicker.html',
      scope: { dateDisabled: '&' },
      require: [
        'datepicker',
        '?^ngModel'
      ],
      controller: 'DatepickerController',
      link: function (e, i, r, o) {
        function l() {
          e.showWeekNumbers = 0 === m && h;
        }
        function s(e, t) {
          for (var n = []; e.length > 0;)
            n.push(e.splice(0, t));
          return n;
        }
        function c(t) {
          var n = null, i = !0;
          f.$modelValue && (n = new Date(f.$modelValue), isNaN(n) ? (i = !1, a.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')) : t && (g = n)), f.$setValidity('date', i);
          var r = d.modes[m], o = r.getVisibleDates(g, n);
          angular.forEach(o.objects, function (e) {
            e.disabled = d.isDisabled(e.date, m);
          }), f.$setValidity('date-disabled', !n || !d.isDisabled(n)), e.rows = s(o.objects, r.split), e.labels = o.labels || [], e.title = o.title;
        }
        function u(e) {
          m = e, l(), c();
        }
        function p(e) {
          var t = new Date(e);
          t.setDate(t.getDate() + 4 - (t.getDay() || 7));
          var n = t.getTime();
          return t.setMonth(0), t.setDate(1), Math.floor(Math.round((n - t) / 86400000) / 7) + 1;
        }
        var d = o[0], f = o[1];
        if (f) {
          var m = 0, g = new Date(), h = n.showWeeks;
          r.showWeeks ? e.$parent.$watch(t(r.showWeeks), function (e) {
            h = !!e, l();
          }) : l(), r.min && e.$parent.$watch(t(r.min), function (e) {
            d.minDate = e ? new Date(e) : null, c();
          }), r.max && e.$parent.$watch(t(r.max), function (e) {
            d.maxDate = e ? new Date(e) : null, c();
          }), f.$render = function () {
            c(!0);
          }, e.select = function (e) {
            if (0 === m) {
              var t = new Date(f.$modelValue);
              t.setFullYear(e.getFullYear(), e.getMonth(), e.getDate()), f.$setViewValue(t), c(!0);
            } else
              g = e, u(m - 1);
          }, e.move = function (e) {
            var t = d.modes[m].step;
            g.setMonth(g.getMonth() + e * (t.months || 0)), g.setFullYear(g.getFullYear() + e * (t.years || 0)), c();
          }, e.toggleMode = function () {
            u((m + 1) % d.modes.length);
          }, e.getWeekNumber = function (t) {
            return 0 === m && e.showWeekNumbers && 7 === t.length ? p(t[0].date) : null;
          };
        }
      }
    };
  }
]).constant('datepickerPopupConfig', {
  dateFormat: 'yyyy-MM-dd',
  closeOnDateSelection: !0
}).directive('datepickerPopup', [
  '$compile',
  '$parse',
  '$document',
  '$position',
  'dateFilter',
  'datepickerPopupConfig',
  function (e, t, n, a, i, r) {
    return {
      restrict: 'EA',
      require: 'ngModel',
      link: function (o, l, s, c) {
        function u(e) {
          $ ? $(o, !!e) : v.isOpen = !!e;
        }
        function p(e) {
          if (e) {
            if (angular.isDate(e))
              return c.$setValidity('date', !0), e;
            if (angular.isString(e)) {
              var t = new Date(e);
              return isNaN(t) ? (c.$setValidity('date', !1), void 0) : (c.$setValidity('date', !0), t);
            }
            return c.$setValidity('date', !1), void 0;
          }
          return c.$setValidity('date', !0), null;
        }
        function d() {
          v.date = c.$modelValue, m();
        }
        function f(e, n, a) {
          e && (o.$watch(t(e), function (e) {
            v[n] = e;
          }), D.attr(a || n, n));
        }
        function m() {
          v.position = a.position(l), v.position.top = v.position.top + l.prop('offsetHeight');
        }
        var g = angular.isDefined(s.closeOnDateSelection) ? v.$eval(s.closeOnDateSelection) : r.closeOnDateSelection, h = s.datepickerPopup || r.dateFormat, v = o.$new();
        o.$on('$destroy', function () {
          v.$destroy();
        });
        var b, $;
        s.isOpen && (b = t(s.isOpen), $ = b.assign, o.$watch(b, function (e) {
          v.isOpen = !!e;
        })), v.isOpen = b ? b(o) : !1;
        var y = function (e) {
            v.isOpen && e.target !== l[0] && v.$apply(function () {
              u(!1);
            });
          }, w = function () {
            v.$apply(function () {
              u(!0);
            });
          }, k = angular.element('<datepicker-popup-wrap><datepicker></datepicker></datepicker-popup-wrap>');
        k.attr({
          'ng-model': 'date',
          'ng-change': 'dateSelection()'
        });
        var D = k.find('datepicker');
        s.datepickerOptions && D.attr(angular.extend({}, o.$eval(s.datepickerOptions))), c.$parsers.unshift(p), v.dateSelection = function () {
          c.$setViewValue(v.date), c.$render(), g && u(!1);
        }, l.bind('input change keyup', function () {
          v.$apply(function () {
            d();
          });
        }), c.$render = function () {
          var e = c.$viewValue ? i(c.$viewValue, h) : '';
          l.val(e), d();
        }, f(s.min, 'min'), f(s.max, 'max'), s.showWeeks ? f(s.showWeeks, 'showWeeks', 'show-weeks') : (v.showWeeks = !0, D.attr('show-weeks', 'showWeeks')), s.dateDisabled && D.attr('date-disabled', s.dateDisabled);
        var x = !1, T = !1;
        v.$watch('isOpen', function (e) {
          e ? (m(), n.bind('click', y), T && l.unbind('focus', w), l[0].focus(), x = !0) : (x && n.unbind('click', y), l.bind('focus', w), T = !0), $ && $(o, e);
        });
        var C = t(s.ngModel).assign;
        v.today = function () {
          C(o, new Date());
        }, v.clear = function () {
          C(o, null);
        }, l.after(e(k)(v));
      }
    };
  }
]).directive('datepickerPopupWrap', [function () {
    return {
      restrict: 'E',
      replace: !0,
      transclude: !0,
      templateUrl: 'template/datepicker/popup.html',
      link: function (e, t) {
        t.bind('click', function (e) {
          e.preventDefault(), e.stopPropagation();
        });
      }
    };
  }]), angular.module('ui.bootstrap.dropdownToggle', []).directive('dropdownToggle', [
  '$document',
  '$location',
  function (e) {
    var t = null, n = angular.noop;
    return {
      restrict: 'CA',
      link: function (a, i) {
        a.$watch('$location.path', function () {
          n();
        }), i.parent().bind('click', function () {
          n();
        }), i.bind('click', function (a) {
          var r = i === t;
          a.preventDefault(), a.stopPropagation(), t && n(), r || (i.parent().addClass('open'), t = i, n = function (a) {
            a && (a.preventDefault(), a.stopPropagation()), e.unbind('click', n), i.parent().removeClass('open'), n = angular.noop, t = null;
          }, e.bind('click', n));
        });
      }
    };
  }
]), angular.module('ui.bootstrap.modal', []).factory('$$stackedMap', function () {
  return {
    createNew: function () {
      var e = [];
      return {
        add: function (t, n) {
          e.push({
            key: t,
            value: n
          });
        },
        get: function (t) {
          for (var n = 0; e.length > n; n++)
            if (t == e[n].key)
              return e[n];
        },
        keys: function () {
          for (var t = [], n = 0; e.length > n; n++)
            t.push(e[n].key);
          return t;
        },
        top: function () {
          return e[e.length - 1];
        },
        remove: function (t) {
          for (var n = -1, a = 0; e.length > a; a++)
            if (t == e[a].key) {
              n = a;
              break;
            }
          return e.splice(n, 1)[0];
        },
        removeTop: function () {
          return e.splice(e.length - 1, 1)[0];
        },
        length: function () {
          return e.length;
        }
      };
    }
  };
}).directive('modalBackdrop', [
  '$modalStack',
  '$timeout',
  function (e, t) {
    return {
      restrict: 'EA',
      replace: !0,
      templateUrl: 'template/modal/backdrop.html',
      link: function (n) {
        t(function () {
          n.animate = !0;
        }), n.close = function (t) {
          var n = e.getTop();
          n && n.value.backdrop && 'static' != n.value.backdrop && (t.preventDefault(), t.stopPropagation(), e.dismiss(n.key, 'backdrop click'));
        };
      }
    };
  }
]).directive('modalWindow', [
  '$timeout',
  function (e) {
    return {
      restrict: 'EA',
      scope: { index: '@' },
      replace: !0,
      transclude: !0,
      templateUrl: 'template/modal/window.html',
      link: function (t, n, a) {
        t.windowClass = a.windowClass || '', e(function () {
          t.animate = !0;
        });
      }
    };
  }
]).factory('$modalStack', [
  '$document',
  '$compile',
  '$rootScope',
  '$$stackedMap',
  function (e, t, n, a) {
    function i() {
      for (var e = -1, t = u.keys(), n = 0; t.length > n; n++)
        u.get(t[n]).value.backdrop && (e = n);
      return e;
    }
    function r(e) {
      var t = u.get(e).value;
      u.remove(e), t.modalDomEl.remove(), -1 == i() && (l.remove(), l = void 0), t.modalScope.$destroy();
    }
    var o, l, s = n.$new(!0), c = e.find('body').eq(0), u = a.createNew(), p = {};
    return n.$watch(i, function (e) {
      s.index = e;
    }), e.bind('keydown', function (e) {
      var t;
      27 === e.which && (t = u.top(), t && t.value.keyboard && n.$apply(function () {
        p.dismiss(t.key);
      }));
    }), p.open = function (e, n) {
      u.add(e, {
        deferred: n.deferred,
        modalScope: n.scope,
        backdrop: n.backdrop,
        keyboard: n.keyboard
      });
      var a = angular.element('<div modal-window></div>');
      a.attr('window-class', n.windowClass), a.attr('index', u.length() - 1), a.html(n.content);
      var r = t(a)(n.scope);
      u.top().value.modalDomEl = r, c.append(r), i() >= 0 && !l && (o = angular.element('<div modal-backdrop></div>'), l = t(o)(s), c.append(l));
    }, p.close = function (e, t) {
      var n = u.get(e);
      n && (n.value.deferred.resolve(t), r(e));
    }, p.dismiss = function (e, t) {
      var n = u.get(e).value;
      n && (n.deferred.reject(t), r(e));
    }, p.getTop = function () {
      return u.top();
    }, p;
  }
]).provider('$modal', function () {
  var e = {
      options: {
        backdrop: !0,
        keyboard: !0
      },
      $get: [
        '$injector',
        '$rootScope',
        '$q',
        '$http',
        '$templateCache',
        '$controller',
        '$modalStack',
        function (t, n, a, i, r, o, l) {
          function s(e) {
            return e.template ? a.when(e.template) : i.get(e.templateUrl, { cache: r }).then(function (e) {
              return e.data;
            });
          }
          function c(e) {
            var n = [];
            return angular.forEach(e, function (e) {
              (angular.isFunction(e) || angular.isArray(e)) && n.push(a.when(t.invoke(e)));
            }), n;
          }
          var u = {};
          return u.open = function (t) {
            var i = a.defer(), r = a.defer(), u = {
                result: i.promise,
                opened: r.promise,
                close: function (e) {
                  l.close(u, e);
                },
                dismiss: function (e) {
                  l.dismiss(u, e);
                }
              };
            if (t = angular.extend({}, e.options, t), t.resolve = t.resolve || {}, !t.template && !t.templateUrl)
              throw Error('One of template or templateUrl options is required.');
            var p = a.all([s(t)].concat(c(t.resolve)));
            return p.then(function (e) {
              var a = (t.scope || n).$new();
              a.$close = u.close, a.$dismiss = u.dismiss;
              var r, s = {}, c = 1;
              t.controller && (s.$scope = a, s.$modalInstance = u, angular.forEach(t.resolve, function (t, n) {
                s[n] = e[c++];
              }), r = o(t.controller, s)), l.open(u, {
                scope: a,
                deferred: i,
                content: e[0],
                backdrop: t.backdrop,
                keyboard: t.keyboard,
                windowClass: t.windowClass
              });
            }, function (e) {
              i.reject(e);
            }), p.then(function () {
              r.resolve(!0);
            }, function () {
              r.reject(!1);
            }), u;
          }, u;
        }
      ]
    };
  return e;
}), angular.module('ui.bootstrap.pagination', []).controller('PaginationController', [
  '$scope',
  '$attrs',
  '$parse',
  '$interpolate',
  function (e, t, n, a) {
    var i = this;
    this.init = function (a) {
      t.itemsPerPage ? e.$parent.$watch(n(t.itemsPerPage), function (t) {
        i.itemsPerPage = parseInt(t, 10), e.totalPages = i.calculateTotalPages();
      }) : this.itemsPerPage = a;
    }, this.noPrevious = function () {
      return 1 === this.page;
    }, this.noNext = function () {
      return this.page === e.totalPages;
    }, this.isActive = function (e) {
      return this.page === e;
    }, this.calculateTotalPages = function () {
      return 1 > this.itemsPerPage ? 1 : Math.ceil(e.totalItems / this.itemsPerPage);
    }, this.getAttributeValue = function (t, n, i) {
      return angular.isDefined(t) ? i ? a(t)(e.$parent) : e.$parent.$eval(t) : n;
    }, this.render = function () {
      this.page = parseInt(e.page, 10) || 1, e.pages = this.getPages(this.page, e.totalPages);
    }, e.selectPage = function (t) {
      !i.isActive(t) && t > 0 && e.totalPages >= t && (e.page = t, e.onSelectPage({ page: t }));
    }, e.$watch('totalItems', function () {
      e.totalPages = i.calculateTotalPages();
    }), e.$watch('totalPages', function (n) {
      t.numPages && (e.numPages = n), i.page > n ? e.selectPage(n) : i.render();
    }), e.$watch('page', function () {
      i.render();
    });
  }
]).constant('paginationConfig', {
  itemsPerPage: 10,
  boundaryLinks: !1,
  directionLinks: !0,
  firstText: 'First',
  previousText: 'Previous',
  nextText: 'Next',
  lastText: 'Last',
  rotate: !0
}).directive('pagination', [
  '$parse',
  'paginationConfig',
  function (e, t) {
    return {
      restrict: 'EA',
      scope: {
        page: '=',
        totalItems: '=',
        onSelectPage: ' &',
        numPages: '='
      },
      controller: 'PaginationController',
      templateUrl: 'template/pagination/pagination.html',
      replace: !0,
      link: function (n, a, i, r) {
        function o(e, t, n, a) {
          return {
            number: e,
            text: t,
            active: n,
            disabled: a
          };
        }
        var l, s = r.getAttributeValue(i.boundaryLinks, t.boundaryLinks), c = r.getAttributeValue(i.directionLinks, t.directionLinks), u = r.getAttributeValue(i.firstText, t.firstText, !0), p = r.getAttributeValue(i.previousText, t.previousText, !0), d = r.getAttributeValue(i.nextText, t.nextText, !0), f = r.getAttributeValue(i.lastText, t.lastText, !0), m = r.getAttributeValue(i.rotate, t.rotate);
        r.init(t.itemsPerPage), i.maxSize && n.$parent.$watch(e(i.maxSize), function (e) {
          l = parseInt(e, 10), r.render();
        }), r.getPages = function (e, t) {
          var n = [], a = 1, i = t, g = angular.isDefined(l) && t > l;
          g && (m ? (a = Math.max(e - Math.floor(l / 2), 1), i = a + l - 1, i > t && (i = t, a = i - l + 1)) : (a = (Math.ceil(e / l) - 1) * l + 1, i = Math.min(a + l - 1, t)));
          for (var h = a; i >= h; h++) {
            var v = o(h, h, r.isActive(h), !1);
            n.push(v);
          }
          if (g && !m) {
            if (a > 1) {
              var b = o(a - 1, '...', !1, !1);
              n.unshift(b);
            }
            if (t > i) {
              var $ = o(i + 1, '...', !1, !1);
              n.push($);
            }
          }
          if (c) {
            var y = o(e - 1, p, !1, r.noPrevious());
            n.unshift(y);
            var w = o(e + 1, d, !1, r.noNext());
            n.push(w);
          }
          if (s) {
            var k = o(1, u, !1, r.noPrevious());
            n.unshift(k);
            var D = o(t, f, !1, r.noNext());
            n.push(D);
          }
          return n;
        };
      }
    };
  }
]).constant('pagerConfig', {
  itemsPerPage: 10,
  previousText: '\xab Previous',
  nextText: 'Next \xbb',
  align: !0
}).directive('pager', [
  'pagerConfig',
  function (e) {
    return {
      restrict: 'EA',
      scope: {
        page: '=',
        totalItems: '=',
        onSelectPage: ' &',
        numPages: '='
      },
      controller: 'PaginationController',
      templateUrl: 'template/pagination/pager.html',
      replace: !0,
      link: function (t, n, a, i) {
        function r(e, t, n, a, i) {
          return {
            number: e,
            text: t,
            disabled: n,
            previous: s && a,
            next: s && i
          };
        }
        var o = i.getAttributeValue(a.previousText, e.previousText, !0), l = i.getAttributeValue(a.nextText, e.nextText, !0), s = i.getAttributeValue(a.align, e.align);
        i.init(e.itemsPerPage), i.getPages = function (e) {
          return [
            r(e - 1, o, i.noPrevious(), !0, !1),
            r(e + 1, l, i.noNext(), !1, !0)
          ];
        };
      }
    };
  }
]), angular.module('ui.bootstrap.tooltip', [
  'ui.bootstrap.position',
  'ui.bootstrap.bindHtml'
]).provider('$tooltip', function () {
  function e(e) {
    var t = /[A-Z]/g, n = '-';
    return e.replace(t, function (e, t) {
      return (t ? n : '') + e.toLowerCase();
    });
  }
  var t = {
      placement: 'top',
      animation: !0,
      popupDelay: 0
    }, n = {
      mouseenter: 'mouseleave',
      click: 'click',
      focus: 'blur'
    }, a = {};
  this.options = function (e) {
    angular.extend(a, e);
  }, this.setTriggers = function (e) {
    angular.extend(n, e);
  }, this.$get = [
    '$window',
    '$compile',
    '$timeout',
    '$parse',
    '$document',
    '$position',
    '$interpolate',
    function (i, r, o, l, s, c, u) {
      return function (i, p, d) {
        function f(e) {
          var t = e || m.trigger || d, a = n[t] || t;
          return {
            show: t,
            hide: a
          };
        }
        var m = angular.extend({}, t, a), g = e(i), h = u.startSymbol(), v = u.endSymbol(), b = '<' + g + '-popup ' + 'title="' + h + 'tt_title' + v + '" ' + 'content="' + h + 'tt_content' + v + '" ' + 'placement="' + h + 'tt_placement' + v + '" ' + 'animation="tt_animation()" ' + 'is-open="tt_isOpen"' + '>' + '</' + g + '-popup>';
        return {
          restrict: 'EA',
          scope: !0,
          link: function (e, t, n) {
            function a() {
              e.tt_isOpen ? d() : u();
            }
            function u() {
              e.tt_popupDelay ? $ = o(g, e.tt_popupDelay) : e.$apply(g);
            }
            function d() {
              e.$apply(function () {
                h();
              });
            }
            function g() {
              var n, a, i, r;
              if (e.tt_content) {
                switch (v && o.cancel(v), w.css({
                    top: 0,
                    left: 0,
                    display: 'block'
                  }), k ? (y = y || s.find('body'), y.append(w)) : t.after(w), n = k ? c.offset(t) : c.position(t), a = w.prop('offsetWidth'), i = w.prop('offsetHeight'), e.tt_placement) {
                case 'right':
                  r = {
                    top: n.top + n.height / 2 - i / 2,
                    left: n.left + n.width
                  };
                  break;
                case 'bottom':
                  r = {
                    top: n.top + n.height,
                    left: n.left + n.width / 2 - a / 2
                  };
                  break;
                case 'left':
                  r = {
                    top: n.top + n.height / 2 - i / 2,
                    left: n.left - a
                  };
                  break;
                default:
                  r = {
                    top: n.top - i,
                    left: n.left + n.width / 2 - a / 2
                  };
                }
                r.top += 'px', r.left += 'px', w.css(r), e.tt_isOpen = !0;
              }
            }
            function h() {
              e.tt_isOpen = !1, o.cancel($), angular.isDefined(e.tt_animation) && e.tt_animation() ? v = o(function () {
                w.remove();
              }, 500) : w.remove();
            }
            var v, $, y, w = r(b)(e), k = angular.isDefined(m.appendToBody) ? m.appendToBody : !1, D = f(void 0), x = !1;
            e.tt_isOpen = !1, n.$observe(i, function (t) {
              e.tt_content = t;
            }), n.$observe(p + 'Title', function (t) {
              e.tt_title = t;
            }), n.$observe(p + 'Placement', function (t) {
              e.tt_placement = angular.isDefined(t) ? t : m.placement;
            }), n.$observe(p + 'Animation', function (t) {
              e.tt_animation = angular.isDefined(t) ? l(t) : function () {
                return m.animation;
              };
            }), n.$observe(p + 'PopupDelay', function (t) {
              var n = parseInt(t, 10);
              e.tt_popupDelay = isNaN(n) ? m.popupDelay : n;
            }), n.$observe(p + 'Trigger', function (e) {
              x && (t.unbind(D.show, u), t.unbind(D.hide, d)), D = f(e), D.show === D.hide ? t.bind(D.show, a) : (t.bind(D.show, u), t.bind(D.hide, d)), x = !0;
            }), n.$observe(p + 'AppendToBody', function (t) {
              k = angular.isDefined(t) ? l(t)(e) : k;
            }), k && e.$on('$locationChangeSuccess', function () {
              e.tt_isOpen && h();
            }), e.$on('$destroy', function () {
              e.tt_isOpen ? h() : w.remove();
            });
          }
        };
      };
    }
  ];
}).directive('tooltipPopup', function () {
  return {
    restrict: 'E',
    replace: !0,
    scope: {
      content: '@',
      placement: '@',
      animation: '&',
      isOpen: '&'
    },
    templateUrl: 'template/tooltip/tooltip-popup.html'
  };
}).directive('tooltip', [
  '$tooltip',
  function (e) {
    return e('tooltip', 'tooltip', 'mouseenter');
  }
]).directive('tooltipHtmlUnsafePopup', function () {
  return {
    restrict: 'E',
    replace: !0,
    scope: {
      content: '@',
      placement: '@',
      animation: '&',
      isOpen: '&'
    },
    templateUrl: 'template/tooltip/tooltip-html-unsafe-popup.html'
  };
}).directive('tooltipHtmlUnsafe', [
  '$tooltip',
  function (e) {
    return e('tooltipHtmlUnsafe', 'tooltip', 'mouseenter');
  }
]), angular.module('ui.bootstrap.popover', ['ui.bootstrap.tooltip']).directive('popoverPopup', function () {
  return {
    restrict: 'EA',
    replace: !0,
    scope: {
      title: '@',
      content: '@',
      placement: '@',
      animation: '&',
      isOpen: '&'
    },
    templateUrl: 'template/popover/popover.html'
  };
}).directive('popover', [
  '$compile',
  '$timeout',
  '$parse',
  '$window',
  '$tooltip',
  function (e, t, n, a, i) {
    return i('popover', 'popover', 'click');
  }
]), angular.module('ui.bootstrap.progressbar', ['ui.bootstrap.transition']).constant('progressConfig', {
  animate: !0,
  autoType: !1,
  stackedTypes: [
    'success',
    'info',
    'warning',
    'danger'
  ]
}).controller('ProgressBarController', [
  '$scope',
  '$attrs',
  'progressConfig',
  function (e, t, n) {
    function a(e) {
      return o[e];
    }
    var i = angular.isDefined(t.animate) ? e.$eval(t.animate) : n.animate, r = angular.isDefined(t.autoType) ? e.$eval(t.autoType) : n.autoType, o = angular.isDefined(t.stackedTypes) ? e.$eval('[' + t.stackedTypes + ']') : n.stackedTypes;
    this.makeBar = function (e, t, n) {
      var o = angular.isObject(e) ? e.value : e || 0, l = angular.isObject(t) ? t.value : t || 0, s = angular.isObject(e) && angular.isDefined(e.type) ? e.type : r ? a(n || 0) : null;
      return {
        from: l,
        to: o,
        type: s,
        animate: i
      };
    }, this.addBar = function (t) {
      e.bars.push(t), e.totalPercent += t.to;
    }, this.clearBars = function () {
      e.bars = [], e.totalPercent = 0;
    }, this.clearBars();
  }
]).directive('progress', function () {
  return {
    restrict: 'EA',
    replace: !0,
    controller: 'ProgressBarController',
    scope: {
      value: '=percent',
      onFull: '&',
      onEmpty: '&'
    },
    templateUrl: 'template/progressbar/progress.html',
    link: function (e, t, n, a) {
      e.$watch('value', function (e, t) {
        if (a.clearBars(), angular.isArray(e))
          for (var n = 0, i = e.length; i > n; n++)
            a.addBar(a.makeBar(e[n], t[n], n));
        else
          a.addBar(a.makeBar(e, t));
      }, !0), e.$watch('totalPercent', function (t) {
        t >= 100 ? e.onFull() : 0 >= t && e.onEmpty();
      }, !0);
    }
  };
}).directive('progressbar', [
  '$transition',
  function (e) {
    return {
      restrict: 'EA',
      replace: !0,
      scope: {
        width: '=',
        old: '=',
        type: '=',
        animate: '='
      },
      templateUrl: 'template/progressbar/bar.html',
      link: function (t, n) {
        t.$watch('width', function (a) {
          t.animate ? (n.css('width', t.old + '%'), e(n, { width: a + '%' })) : n.css('width', a + '%');
        });
      }
    };
  }
]), angular.module('ui.bootstrap.rating', []).constant('ratingConfig', {
  max: 5,
  stateOn: null,
  stateOff: null
}).controller('RatingController', [
  '$scope',
  '$attrs',
  '$parse',
  'ratingConfig',
  function (e, t, n, a) {
    this.maxRange = angular.isDefined(t.max) ? e.$parent.$eval(t.max) : a.max, this.stateOn = angular.isDefined(t.stateOn) ? e.$parent.$eval(t.stateOn) : a.stateOn, this.stateOff = angular.isDefined(t.stateOff) ? e.$parent.$eval(t.stateOff) : a.stateOff, this.createDefaultRange = function (e) {
      for (var t = {
            stateOn: this.stateOn,
            stateOff: this.stateOff
          }, n = Array(e), a = 0; e > a; a++)
        n[a] = t;
      return n;
    }, this.normalizeRange = function (e) {
      for (var t = 0, n = e.length; n > t; t++)
        e[t].stateOn = e[t].stateOn || this.stateOn, e[t].stateOff = e[t].stateOff || this.stateOff;
      return e;
    }, e.range = angular.isDefined(t.ratingStates) ? this.normalizeRange(angular.copy(e.$parent.$eval(t.ratingStates))) : this.createDefaultRange(this.maxRange), e.rate = function (t) {
      e.readonly || e.value === t || (e.value = t);
    }, e.enter = function (t) {
      e.readonly || (e.val = t), e.onHover({ value: t });
    }, e.reset = function () {
      e.val = angular.copy(e.value), e.onLeave();
    }, e.$watch('value', function (t) {
      e.val = t;
    }), e.readonly = !1, t.readonly && e.$parent.$watch(n(t.readonly), function (t) {
      e.readonly = !!t;
    });
  }
]).directive('rating', function () {
  return {
    restrict: 'EA',
    scope: {
      value: '=',
      onHover: '&',
      onLeave: '&'
    },
    controller: 'RatingController',
    templateUrl: 'template/rating/rating.html',
    replace: !0
  };
}), angular.module('ui.bootstrap.tabs', []).directive('tabs', function () {
  return function () {
    throw Error('The `tabs` directive is deprecated, please migrate to `tabset`. Instructions can be found at http://github.com/angular-ui/bootstrap/tree/master/CHANGELOG.md');
  };
}).controller('TabsetController', [
  '$scope',
  '$element',
  function (e) {
    var t = this, n = t.tabs = e.tabs = [];
    t.select = function (e) {
      angular.forEach(n, function (e) {
        e.active = !1;
      }), e.active = !0;
    }, t.addTab = function (e) {
      n.push(e), (1 === n.length || e.active) && t.select(e);
    }, t.removeTab = function (e) {
      var a = n.indexOf(e);
      if (e.active && n.length > 1) {
        var i = a == n.length - 1 ? a - 1 : a + 1;
        t.select(n[i]);
      }
      n.splice(a, 1);
    };
  }
]).directive('tabset', function () {
  return {
    restrict: 'EA',
    transclude: !0,
    replace: !0,
    require: '^tabset',
    scope: {},
    controller: 'TabsetController',
    templateUrl: 'template/tabs/tabset.html',
    compile: function (e, t, n) {
      return function (e, t, a, i) {
        e.vertical = angular.isDefined(a.vertical) ? e.$parent.$eval(a.vertical) : !1, e.type = angular.isDefined(a.type) ? e.$parent.$eval(a.type) : 'tabs', e.direction = angular.isDefined(a.direction) ? e.$parent.$eval(a.direction) : 'top', e.tabsAbove = 'below' != e.direction, i.$scope = e, i.$transcludeFn = n;
      };
    }
  };
}).directive('tab', [
  '$parse',
  '$http',
  '$templateCache',
  '$compile',
  function (e) {
    return {
      require: '^tabset',
      restrict: 'EA',
      replace: !0,
      templateUrl: 'template/tabs/tab.html',
      transclude: !0,
      scope: {
        heading: '@',
        onSelect: '&select',
        onDeselect: '&deselect'
      },
      controller: function () {
      },
      compile: function (t, n, a) {
        return function (t, n, i, r) {
          var o, l;
          i.active ? (o = e(i.active), l = o.assign, t.$parent.$watch(o, function (e) {
            t.active = !!e;
          }), t.active = o(t.$parent)) : l = o = angular.noop, t.$watch('active', function (e) {
            l(t.$parent, e), e ? (r.select(t), t.onSelect()) : t.onDeselect();
          }), t.disabled = !1, i.disabled && t.$parent.$watch(e(i.disabled), function (e) {
            t.disabled = !!e;
          }), t.select = function () {
            t.disabled || (t.active = !0);
          }, r.addTab(t), t.$on('$destroy', function () {
            r.removeTab(t);
          }), t.active && l(t.$parent, !0), t.$transcludeFn = a;
        };
      }
    };
  }
]).directive('tabHeadingTransclude', [function () {
    return {
      restrict: 'A',
      require: '^tab',
      link: function (e, t) {
        e.$watch('headingElement', function (e) {
          e && (t.html(''), t.append(e));
        });
      }
    };
  }]).directive('tabContentTransclude', [
  '$compile',
  '$parse',
  function () {
    function e(e) {
      return e.tagName && (e.hasAttribute('tab-heading') || e.hasAttribute('data-tab-heading') || 'tab-heading' === e.tagName.toLowerCase() || 'data-tab-heading' === e.tagName.toLowerCase());
    }
    return {
      restrict: 'A',
      require: '^tabset',
      link: function (t, n, a) {
        var i = t.$eval(a.tabContentTransclude);
        i.$transcludeFn(i.$parent, function (t) {
          angular.forEach(t, function (t) {
            e(t) ? i.headingElement = t : n.append(t);
          });
        });
      }
    };
  }
]).directive('tabsetTitles', [
  '$http',
  function () {
    return {
      restrict: 'A',
      require: '^tabset',
      templateUrl: 'template/tabs/tabset-titles.html',
      replace: !0,
      link: function (e, t, n, a) {
        e.$eval(n.tabsetTitles) ? a.$transcludeFn(a.$scope.$parent, function (e) {
          t.append(e);
        }) : t.remove();
      }
    };
  }
]), angular.module('ui.bootstrap.timepicker', []).constant('timepickerConfig', {
  hourStep: 1,
  minuteStep: 1,
  showMeridian: !0,
  meridians: [
    'AM',
    'PM'
  ],
  readonlyInput: !1,
  mousewheel: !0
}).directive('timepicker', [
  '$parse',
  '$log',
  'timepickerConfig',
  function (e, t, n) {
    return {
      restrict: 'EA',
      require: '?^ngModel',
      replace: !0,
      scope: {},
      templateUrl: 'template/timepicker/timepicker.html',
      link: function (a, i, r, o) {
        function l() {
          var e = parseInt(a.hours, 10), t = a.showMeridian ? e > 0 && 13 > e : e >= 0 && 24 > e;
          return t ? (a.showMeridian && (12 === e && (e = 0), a.meridian === g[1] && (e += 12)), e) : void 0;
        }
        function s() {
          var e = parseInt(a.minutes, 10);
          return e >= 0 && 60 > e ? e : void 0;
        }
        function c(e) {
          return angular.isDefined(e) && 2 > ('' + e).length ? '0' + e : e;
        }
        function u(e) {
          p(), o.$setViewValue(new Date(m)), d(e);
        }
        function p() {
          o.$setValidity('time', !0), a.invalidHours = !1, a.invalidMinutes = !1;
        }
        function d(e) {
          var t = m.getHours(), n = m.getMinutes();
          a.showMeridian && (t = 0 === t || 12 === t ? 12 : t % 12), a.hours = 'h' === e ? t : c(t), a.minutes = 'm' === e ? n : c(n), a.meridian = 12 > m.getHours() ? g[0] : g[1];
        }
        function f(e) {
          var t = new Date(m.getTime() + 60000 * e);
          m.setHours(t.getHours(), t.getMinutes()), u();
        }
        if (o) {
          var m = new Date(), g = n.meridians, h = n.hourStep;
          r.hourStep && a.$parent.$watch(e(r.hourStep), function (e) {
            h = parseInt(e, 10);
          });
          var v = n.minuteStep;
          r.minuteStep && a.$parent.$watch(e(r.minuteStep), function (e) {
            v = parseInt(e, 10);
          }), a.showMeridian = n.showMeridian, r.showMeridian && a.$parent.$watch(e(r.showMeridian), function (e) {
            if (a.showMeridian = !!e, o.$error.time) {
              var t = l(), n = s();
              angular.isDefined(t) && angular.isDefined(n) && (m.setHours(t), u());
            } else
              d();
          });
          var b = i.find('input'), $ = b.eq(0), y = b.eq(1), w = angular.isDefined(r.mousewheel) ? a.$eval(r.mousewheel) : n.mousewheel;
          if (w) {
            var k = function (e) {
              e.originalEvent && (e = e.originalEvent);
              var t = e.wheelDelta ? e.wheelDelta : -e.deltaY;
              return e.detail || t > 0;
            };
            $.bind('mousewheel wheel', function (e) {
              a.$apply(k(e) ? a.incrementHours() : a.decrementHours()), e.preventDefault();
            }), y.bind('mousewheel wheel', function (e) {
              a.$apply(k(e) ? a.incrementMinutes() : a.decrementMinutes()), e.preventDefault();
            });
          }
          if (a.readonlyInput = angular.isDefined(r.readonlyInput) ? a.$eval(r.readonlyInput) : n.readonlyInput, a.readonlyInput)
            a.updateHours = angular.noop, a.updateMinutes = angular.noop;
          else {
            var D = function (e, t) {
              o.$setViewValue(null), o.$setValidity('time', !1), angular.isDefined(e) && (a.invalidHours = e), angular.isDefined(t) && (a.invalidMinutes = t);
            };
            a.updateHours = function () {
              var e = l();
              angular.isDefined(e) ? (m.setHours(e), u('h')) : D(!0);
            }, $.bind('blur', function () {
              !a.validHours && 10 > a.hours && a.$apply(function () {
                a.hours = c(a.hours);
              });
            }), a.updateMinutes = function () {
              var e = s();
              angular.isDefined(e) ? (m.setMinutes(e), u('m')) : D(void 0, !0);
            }, y.bind('blur', function () {
              !a.invalidMinutes && 10 > a.minutes && a.$apply(function () {
                a.minutes = c(a.minutes);
              });
            });
          }
          o.$render = function () {
            var e = o.$modelValue ? new Date(o.$modelValue) : null;
            isNaN(e) ? (o.$setValidity('time', !1), t.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')) : (e && (m = e), p(), d());
          }, a.incrementHours = function () {
            f(60 * h);
          }, a.decrementHours = function () {
            f(60 * -h);
          }, a.incrementMinutes = function () {
            f(v);
          }, a.decrementMinutes = function () {
            f(-v);
          }, a.toggleMeridian = function () {
            f(720 * (12 > m.getHours() ? 1 : -1));
          };
        }
      }
    };
  }
]), angular.module('ui.bootstrap.typeahead', [
  'ui.bootstrap.position',
  'ui.bootstrap.bindHtml'
]).factory('typeaheadParser', [
  '$parse',
  function (e) {
    var t = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;
    return {
      parse: function (n) {
        var a = n.match(t);
        if (!a)
          throw Error('Expected typeahead specification in form of \'_modelValue_ (as _label_)? for _item_ in _collection_\' but got \'' + n + '\'.');
        return {
          itemName: a[3],
          source: e(a[4]),
          viewMapper: e(a[2] || a[1]),
          modelMapper: e(a[1])
        };
      }
    };
  }
]).directive('typeahead', [
  '$compile',
  '$parse',
  '$q',
  '$timeout',
  '$document',
  '$position',
  'typeaheadParser',
  function (e, t, n, a, i, r, o) {
    var l = [
        9,
        13,
        27,
        38,
        40
      ];
    return {
      require: 'ngModel',
      link: function (s, c, u, p) {
        var d = s.$eval(u.typeaheadMinLength) || 1, f = s.$eval(u.typeaheadWaitMs) || 0, m = s.$eval(u.typeaheadEditable) !== !1, g = t(u.typeaheadLoading).assign || angular.noop, h = t(u.typeaheadOnSelect), v = u.typeaheadInputFormatter ? t(u.typeaheadInputFormatter) : void 0, b = t(u.ngModel).assign, $ = o.parse(u.typeahead), y = angular.element('<typeahead-popup></typeahead-popup>');
        y.attr({
          matches: 'matches',
          active: 'activeIdx',
          select: 'select(activeIdx)',
          query: 'query',
          position: 'position'
        }), angular.isDefined(u.typeaheadTemplateUrl) && y.attr('template-url', u.typeaheadTemplateUrl);
        var w = s.$new();
        s.$on('$destroy', function () {
          w.$destroy();
        });
        var k = function () {
            w.matches = [], w.activeIdx = -1;
          }, D = function (e) {
            var t = { $viewValue: e };
            g(s, !0), n.when($.source(w, t)).then(function (n) {
              if (e === p.$viewValue) {
                if (n.length > 0) {
                  w.activeIdx = 0, w.matches.length = 0;
                  for (var a = 0; n.length > a; a++)
                    t[$.itemName] = n[a], w.matches.push({
                      label: $.viewMapper(w, t),
                      model: n[a]
                    });
                  w.query = e, w.position = r.position(c), w.position.top = w.position.top + c.prop('offsetHeight');
                } else
                  k();
                g(s, !1);
              }
            }, function () {
              k(), g(s, !1);
            });
          };
        k(), w.query = void 0;
        var x;
        p.$parsers.unshift(function (e) {
          return k(), e && e.length >= d && (f > 0 ? (x && a.cancel(x), x = a(function () {
            D(e);
          }, f)) : D(e)), m ? e : (p.$setValidity('editable', !1), void 0);
        }), p.$formatters.push(function (e) {
          var t, n, a = {};
          return v ? (a.$model = e, v(s, a)) : (a[$.itemName] = e, t = $.viewMapper(s, a), a[$.itemName] = void 0, n = $.viewMapper(s, a), t !== n ? t : e);
        }), w.select = function (e) {
          var t, n, a = {};
          a[$.itemName] = n = w.matches[e].model, t = $.modelMapper(s, a), b(s, t), p.$setValidity('editable', !0), h(s, {
            $item: n,
            $model: t,
            $label: $.viewMapper(s, a)
          }), k(), c[0].focus();
        }, c.bind('keydown', function (e) {
          0 !== w.matches.length && -1 !== l.indexOf(e.which) && (e.preventDefault(), 40 === e.which ? (w.activeIdx = (w.activeIdx + 1) % w.matches.length, w.$digest()) : 38 === e.which ? (w.activeIdx = (w.activeIdx ? w.activeIdx : w.matches.length) - 1, w.$digest()) : 13 === e.which || 9 === e.which ? w.$apply(function () {
            w.select(w.activeIdx);
          }) : 27 === e.which && (e.stopPropagation(), k(), w.$digest()));
        });
        var T = function (e) {
          c[0] !== e.target && (k(), w.$digest());
        };
        i.bind('click', T), s.$on('$destroy', function () {
          i.unbind('click', T);
        }), c.after(e(y)(w));
      }
    };
  }
]).directive('typeaheadPopup', function () {
  return {
    restrict: 'E',
    scope: {
      matches: '=',
      query: '=',
      active: '=',
      position: '=',
      select: '&'
    },
    replace: !0,
    templateUrl: 'template/typeahead/typeahead-popup.html',
    link: function (e, t, n) {
      e.templateUrl = n.templateUrl, e.isOpen = function () {
        return e.matches.length > 0;
      }, e.isActive = function (t) {
        return e.active == t;
      }, e.selectActive = function (t) {
        e.active = t;
      }, e.selectMatch = function (t) {
        e.select({ activeIdx: t });
      };
    }
  };
}).directive('typeaheadMatch', [
  '$http',
  '$templateCache',
  '$compile',
  '$parse',
  function (e, t, n, a) {
    return {
      restrict: 'E',
      scope: {
        index: '=',
        match: '=',
        query: '='
      },
      link: function (i, r, o) {
        var l = a(o.templateUrl)(i.$parent) || 'template/typeahead/typeahead-match.html';
        e.get(l, { cache: t }).success(function (e) {
          r.replaceWith(n(e.trim())(i));
        });
      }
    };
  }
]).filter('typeaheadHighlight', function () {
  function e(e) {
    return e.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }
  return function (t, n) {
    return n ? t.replace(RegExp(e(n), 'gi'), '<strong>$&</strong>') : t;
  };
}), angular.module('template/accordion/accordion-group.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/accordion/accordion-group.html', '<div class="accordion-group">\n  <div class="accordion-heading" ><a class="accordion-toggle" ng-click="isOpen = !isOpen" accordion-transclude="heading">{{heading}}</a></div>\n  <div class="accordion-body" collapse="!isOpen">\n    <div class="accordion-inner" ng-transclude></div>  </div>\n</div>');
  }
]), angular.module('template/accordion/accordion.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/accordion/accordion.html', '<div class="accordion" ng-transclude></div>');
  }
]), angular.module('template/alert/alert.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/alert/alert.html', '<div class=\'alert\' ng-class=\'type && "alert-" + type\'>\n    <button ng-show=\'closeable\' type=\'button\' class=\'close\' ng-click=\'close()\'>&times;</button>\n    <div ng-transclude></div>\n</div>\n');
  }
]), angular.module('template/carousel/carousel.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/carousel/carousel.html', '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel">\n    <ol class="carousel-indicators" ng-show="slides().length > 1">\n        <li ng-repeat="slide in slides()" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n    </ol>\n    <div class="carousel-inner" ng-transclude></div>\n    <a ng-click="prev()" class="carousel-control left" ng-show="slides().length > 1">&lsaquo;</a>\n    <a ng-click="next()" class="carousel-control right" ng-show="slides().length > 1">&rsaquo;</a>\n</div>\n');
  }
]), angular.module('template/carousel/slide.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/carousel/slide.html', '<div ng-class="{\n    \'active\': leaving || (active && !entering),\n    \'prev\': (next || active) && direction==\'prev\',\n    \'next\': (next || active) && direction==\'next\',\n    \'right\': direction==\'prev\',\n    \'left\': direction==\'next\'\n  }" class="item" ng-transclude></div>\n');
  }
]), angular.module('template/datepicker/datepicker.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/datepicker/datepicker.html', '<table>\n  <thead>\n    <tr class="text-center">\n      <th><button type="button" class="btn pull-left" ng-click="move(-1)"><i class="icon-chevron-left"></i></button></th>\n      <th colspan="{{rows[0].length - 2 + showWeekNumbers}}"><button type="button" class="btn btn-block" ng-click="toggleMode()"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn pull-right" ng-click="move(1)"><i class="icon-chevron-right"></i></button></th>\n    </tr>\n    <tr class="text-center" ng-show="labels.length > 0">\n      <th ng-show="showWeekNumbers">#</th>\n      <th ng-repeat="label in labels">{{label}}</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows">\n      <td ng-show="showWeekNumbers" class="text-center"><em>{{ getWeekNumber(row) }}</em></td>\n      <td ng-repeat="dt in row" class="text-center">\n        <button type="button" style="width:100%;" class="btn" ng-class="{\'btn-info\': dt.selected}" ng-click="select(dt.date)" ng-disabled="dt.disabled"><span ng-class="{muted: dt.secondary}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n');
  }
]), angular.module('template/datepicker/popup.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/datepicker/popup.html', '<ul class="dropdown-menu" ng-style="{display: (isOpen && \'block\') || \'none\', top: position.top+\'px\', left: position.left+\'px\'}" class="dropdown-menu">\n\t<li ng-transclude></li>\n\t<li class="divider"></li>\n\t<li style="padding: 9px;">\n\t\t<span class="btn-group">\n\t\t\t<button class="btn btn-small btn-inverse" ng-click="today()">Today</button>\n\t\t\t<button class="btn btn-small btn-info" ng-click="showWeeks = ! showWeeks" ng-class="{active: showWeeks}">Weeks</button>\n\t\t\t<button class="btn btn-small btn-danger" ng-click="clear()">Clear</button>\n\t\t</span>\n\t\t<button class="btn btn-small btn-success pull-right" ng-click="isOpen = false">Close</button>\n\t</li>\n</ul>');
  }
]), angular.module('template/modal/backdrop.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/modal/backdrop.html', '<div class="modal-backdrop fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1040 + index*10}" ng-click="close($event)"></div>');
  }
]), angular.module('template/modal/window.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/modal/window.html', '<div class="modal fade {{ windowClass }}" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10}" ng-transclude></div>');
  }
]), angular.module('template/pagination/pager.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/pagination/pager.html', '<div class="pager">\n  <ul>\n    <li ng-repeat="page in pages" ng-class="{disabled: page.disabled, previous: page.previous, next: page.next}"><a ng-click="selectPage(page.number)">{{page.text}}</a></li>\n  </ul>\n</div>\n');
  }
]), angular.module('template/pagination/pagination.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/pagination/pagination.html', '<div class="pagination"><ul>\n  <li ng-repeat="page in pages" ng-class="{active: page.active, disabled: page.disabled}"><a ng-click="selectPage(page.number)">{{page.text}}</a></li>\n  </ul>\n</div>\n');
  }
]), angular.module('template/tooltip/tooltip-html-unsafe-popup.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/tooltip/tooltip-html-unsafe-popup.html', '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind-html-unsafe="content"></div>\n</div>\n');
  }
]), angular.module('template/tooltip/tooltip-popup.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/tooltip/tooltip-popup.html', '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind="content"></div>\n</div>\n');
  }
]), angular.module('template/popover/popover.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/popover/popover.html', '<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-show="title"></h3>\n      <div class="popover-content" ng-bind="content"></div>\n  </div>\n</div>\n');
  }
]), angular.module('template/progressbar/bar.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/progressbar/bar.html', '<div class="bar" ng-class=\'type && "bar-" + type\'></div>');
  }
]), angular.module('template/progressbar/progress.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/progressbar/progress.html', '<div class="progress"><progressbar ng-repeat="bar in bars" width="bar.to" old="bar.from" animate="bar.animate" type="bar.type"></progressbar></div>');
  }
]), angular.module('template/rating/rating.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/rating/rating.html', '<span ng-mouseleave="reset()">\n\t<i ng-repeat="r in range" ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" ng-class="$index < val && (r.stateOn || \'icon-star\') || (r.stateOff || \'icon-star-empty\')"></i>\n</span>');
  }
]), angular.module('template/tabs/pane.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/tabs/pane.html', '<div class="tab-pane" ng-class="{active: selected}" ng-show="selected" ng-transclude></div>\n');
  }
]), angular.module('template/tabs/tab.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/tabs/tab.html', '<li ng-class="{active: active, disabled: disabled}">\n  <a ng-click="select()" tab-heading-transclude>{{heading}}</a>\n</li>\n');
  }
]), angular.module('template/tabs/tabs.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/tabs/tabs.html', '<div class="tabbable">\n  <ul class="nav nav-tabs">\n    <li ng-repeat="pane in panes" ng-class="{active:pane.selected}">\n      <a ng-click="select(pane)">{{pane.heading}}</a>\n    </li>\n  </ul>\n  <div class="tab-content" ng-transclude></div>\n</div>\n');
  }
]), angular.module('template/tabs/tabset-titles.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/tabs/tabset-titles.html', '<ul class="nav {{type && \'nav-\' + type}}" ng-class="{\'nav-stacked\': vertical}">\n</ul>\n');
  }
]), angular.module('template/tabs/tabset.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/tabs/tabset.html', '\n<div class="tabbable" ng-class="{\'tabs-right\': direction == \'right\', \'tabs-left\': direction == \'left\', \'tabs-below\': direction == \'below\'}">\n  <div tabset-titles="tabsAbove"></div>\n  <div class="tab-content">\n    <div class="tab-pane" \n         ng-repeat="tab in tabs" \n         ng-class="{active: tab.active}"\n         tab-content-transclude="tab">\n    </div>\n  </div>\n  <div tabset-titles="!tabsAbove"></div>\n</div>\n');
  }
]), angular.module('template/timepicker/timepicker.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/timepicker/timepicker.html', '<table class="form-inline">\n\t<tr class="text-center">\n\t\t<td><a ng-click="incrementHours()" class="btn btn-link"><i class="icon-chevron-up"></i></a></td>\n\t\t<td>&nbsp;</td>\n\t\t<td><a ng-click="incrementMinutes()" class="btn btn-link"><i class="icon-chevron-up"></i></a></td>\n\t\t<td ng-show="showMeridian"></td>\n\t</tr>\n\t<tr>\n\t\t<td class="control-group" ng-class="{\'error\': invalidHours}"><input type="text" ng-model="hours" ng-change="updateHours()" class="span1 text-center" ng-mousewheel="incrementHours()" ng-readonly="readonlyInput" maxlength="2" /></td>\n\t\t<td>:</td>\n\t\t<td class="control-group" ng-class="{\'error\': invalidMinutes}"><input type="text" ng-model="minutes" ng-change="updateMinutes()" class="span1 text-center" ng-readonly="readonlyInput" maxlength="2"></td>\n\t\t<td ng-show="showMeridian"><button type="button" ng-click="toggleMeridian()" class="btn text-center">{{meridian}}</button></td>\n\t</tr>\n\t<tr class="text-center">\n\t\t<td><a ng-click="decrementHours()" class="btn btn-link"><i class="icon-chevron-down"></i></a></td>\n\t\t<td>&nbsp;</td>\n\t\t<td><a ng-click="decrementMinutes()" class="btn btn-link"><i class="icon-chevron-down"></i></a></td>\n\t\t<td ng-show="showMeridian"></td>\n\t</tr>\n</table>');
  }
]), angular.module('template/typeahead/typeahead-match.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/typeahead/typeahead-match.html', '<a tabindex="-1" bind-html-unsafe="match.label | typeaheadHighlight:query"></a>');
  }
]), angular.module('template/typeahead/typeahead-popup.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/typeahead/typeahead-popup.html', '<ul class="typeahead dropdown-menu" ng-style="{display: isOpen()&&\'block\' || \'none\', top: position.top+\'px\', left: position.left+\'px\'}">\n    <li ng-repeat="match in matches" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)">\n        <typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></typeahead-match>\n    </li>\n</ul>');
  }
]), angular.module('template/typeahead/typeahead.html', []).run([
  '$templateCache',
  function (e) {
    e.put('template/typeahead/typeahead.html', '<ul class="typeahead dropdown-menu" ng-style="{display: isOpen()&&\'block\' || \'none\', top: position.top+\'px\', left: position.left+\'px\'}">\n    <li ng-repeat="match in matches" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)">\n        <a tabindex="-1" ng-click="selectMatch($index)" ng-bind-html-unsafe="match.label | typeaheadHighlight:query"></a>\n    </li>\n</ul>');
  }
]);