"use strict";
define("manager-client/adapters/-json-api", [
  "exports",
  "@ember-data/adapter/json-api",
], function (e, t) {
  Object.defineProperty(e, "__esModule", { value: !0 }),
    Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function () {
        return t.default;
      },
    });
}),
  define("manager-client/app", [
    "exports",
    "manager-client/resolver",
    "ember-load-initializers",
    "manager-client/config/environment",
  ], function (e, t, n, r) {
    function a(e) {
      return (a =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            })(e);
    }
    function o(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function i(e, t) {
      return (i =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    function u(e) {
      var t = (function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Date.prototype.toString.call(
              Reflect.construct(Date, [], function () {})
            ),
            !0
          );
        } catch (e) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = d(e);
        if (t) {
          var a = d(this).constructor;
          n = Reflect.construct(r, arguments, a);
        } else n = r.apply(this, arguments);
        return l(this, n);
      };
    }
    function l(e, t) {
      return !t || ("object" !== a(t) && "function" != typeof t) ? s(e) : t;
    }
    function s(e) {
      if (void 0 === e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return e;
    }
    function d(e) {
      return (d = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function f(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = void 0),
      (Ember.MODEL_FACTORY_INJECTIONS = !0);
    var c = (function (e) {
      (function (e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          t && i(e, t);
      })(a, Ember.Application);
      var n = u(a);
      function a() {
        var e;
        o(this, a);
        for (var i = arguments.length, u = new Array(i), l = 0; l < i; l++)
          u[l] = arguments[l];
        return (
          f(
            s((e = n.call.apply(n, [this].concat(u)))),
            "modulePrefix",
            r.default.modulePrefix
          ),
          f(s(e), "podModulePrefix", r.default.podModulePrefix),
          f(s(e), "Resolver", t.default),
          e
        );
      }
      return a;
    })();
    (e.default = c), (0, n.default)(c, r.default.modulePrefix);
  }),
  define("manager-client/component-managers/glimmer", [
    "exports",
    "@glimmer/component/-private/ember-component-manager",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/components/progress-bar", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var t = Ember.Component.extend({
      classNameBindings: [":progress", ":progress-striped", "active"],
      active: Ember.computed("percent", function () {
        return 100 !== parseInt(this.get("percent"), 10);
      }),
      barStyle: Ember.computed("percent", function () {
        var e = parseInt(this.get("percent"), 10);
        return e > 0
          ? (e > 100 && (e = 100),
            ("width: " + this.get("percent") + "%").htmlSafe())
          : "".htmlSafe();
      }),
    });
    e.default = t;
  }),
  define("manager-client/components/repo-status", [
    "exports",
    "manager-client/discourse",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var n = Ember.Component.extend({
      router: Ember.inject.service(),
      tagName: "tr",
      upgradeDisabled: true,
      //   upgradeDisabled: Ember.computed(
      //     "upgradingRepo",
      //     "repo",
      //     "managerRepo",
      //     "managerRepo.upToDate",
      //     function () {
      //       if (!this.get("upgradingRepo")) {
      //         var e = this.get("managerRepo");
      //         return !!e && !e.get("upToDate") && e !== this.get("repo");
      //       }
      //       return !0;
      //     }
      //   ),
      officialRepoImageSrc: Ember.computed("repo.official", function () {
        if (this.get("repo.official"))
          return t.default.getAppURL(
            "/plugins/docker_manager/images/font-awesome-check-circle.png"
          );
      }),
      actions: {
        upgrade: function () {
          this.get("router").transitionTo("upgrade", this.get("repo"));
        },
      },
    });
    e.default = n;
  }),
  define("manager-client/components/x-console", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var t = Ember.Component.extend({
      classNameBindings: [":logs"],
      _outputChanged: Ember.observer("output", function () {
        Ember.run.scheduleOnce("afterRender", this, "_scrollBottom");
      }),
      _scrollBottom: function () {
        this.get("followOutput") &&
          (this.element.scrollTop = this.element.scrollHeight);
      },
      didInsertElement: function () {
        this._super.apply(this, arguments), this._scrollBottom();
      },
    });
    e.default = t;
  }),
  define("manager-client/controllers/application", [
    "exports",
    "manager-client/discourse",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var n = Ember.Controller.extend({
      showBanner: Ember.computed(
        "banner",
        "bannerDismissed",
        "banner.[]",
        function () {
          if (this.get("bannerDismissed")) return !1;
          var e = this.get("banner");
          return e && e.length > 0;
        }
      ),
      appendBannerHtml: function (e) {
        var t = this.get("banner") || [];
        -1 === t.indexOf(e) && t.pushObject(e), this.set("banner", t);
      },
      logoUrl: Ember.computed(function () {
        return t.default.getAppURL(
          "/assets/images/docker-manager-aff8eaea0445c0488c19f8cfd14faa8c2b278924438f19048eacc175d7d134e4.png"
        );
      }),
      returnToSiteUrl: Ember.computed(function () {
        return t.default.getAppURL("/");
      }),
      backupsUrl: Ember.computed(function () {
        return t.default.getAppURL("/admin/backups");
      }),
      actions: {
        dismiss: function () {
          this.set("bannerDismissed", !0);
        },
      },
    });
    e.default = n;
  }),
  define("manager-client/controllers/index", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var t = Ember.Controller.extend({
      managerRepo: null,
      upgrading: null,
      upgradeAllButtonDisabled: true,
      // upgradeAllButtonDisabled: Ember.computed(
      //   "managerRepo.upToDate",
      //   "allUpToDate",
      //   function () {
      //     return !this.get("managerRepo.upToDate") || this.get("allUpToDate");
      //   }
      // ),
      allUpToDate: Ember.computed("model.@each.upToDate", function () {
        return this.get("model").every(function (e) {
          return e.get("upToDate");
        });
      }),
      actions: {
        upgradeAllButton: function () {
          this.replaceRoute("upgrade", "all");
        },
      },
    });
    e.default = t;
  }),
  define("manager-client/controllers/processes", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var t = Ember.Controller.extend({
      autoRefresh: !1,
      init: function () {
        var e = this;
        this._super(),
          window.setInterval(function () {
            e.performRefresh();
          }, 5e3);
      },
      performRefresh: function () {
        this.get("autoRefresh") && this.get("model").refresh();
      },
    });
    e.default = t;
  }),
  define("manager-client/controllers/upgrade", [
    "exports",
    "manager-client/models/repo",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var n = Ember.Controller.extend({
      output: null,
      init: function () {
        this._super(), this.reset();
      },
      complete: Ember.computed.equal("status", "complete"),
      failed: Ember.computed.equal("status", "failed"),
      multiUpgrade: Ember.computed("model.length", function () {
        return 1 !== this.get("model.length");
      }),
      title: Ember.computed("model.@each.name", function () {
        return this.get("multiUpgrade")
          ? "All"
          : this.get("model")[0].get("name");
      }),
      isUpToDate: Ember.computed("model.@each.upToDate", function () {
        return this.get("model").every(function (e) {
          return e.get("upToDate");
        });
      }),
      upgrading: Ember.computed("model.@each.upgrading", function () {
        return this.get("model").some(function (e) {
          return e.get("upgrading");
        });
      }),
      repos: function () {
        var e = this.get("model");
        return this.get("isMultiple") ? e : [e];
      },
      updateAttribute: function (e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        this.get("model").forEach(function (r) {
          (t = n ? r.get(t) : t), r.set(e, t);
        });
      },
      messageReceived: function (e) {
        switch (e.type) {
          case "log":
            this.set("output", this.get("output") + e.value + "\n");
            break;
          case "percent":
            this.set("percent", e.value);
            break;
          case "status":
            this.set("status", e.value),
              "complete" === e.value &&
                this.get("model")
                  .filter(function (e) {
                    return e.get("upgrading");
                  })
                  .forEach(function (e) {
                    e.set("version", e.get("latest.version"));
                  }),
              ("complete" !== e.value && "failed" !== e.value) ||
                this.updateAttribute("upgrading", !1);
        }
      },
      upgradeButtonText: Ember.computed("upgrading", function () {
        return this.get("upgrading") ? "Upgrading..." : "Start Upgrading";
      }),
      startBus: function () {
        var e = this;
        MessageBus.subscribe("/docker/upgrade", function (t) {
          e.messageReceived(t);
        });
      },
      stopBus: function () {
        MessageBus.unsubscribe("/docker/upgrade");
      },
      reset: function () {
        this.setProperties({ output: "", status: null, percent: 0 });
      },
      actions: {
        start: function () {
          if ((this.reset(), this.get("multiUpgrade")))
            return (
              this.get("model")
                .filter(function (e) {
                  return !e.get("upToDate");
                })
                .forEach(function (e) {
                  return e.set("upgrading", !0);
                }),
              t.default.upgradeAll()
            );
          var e = this.get("model")[0];
          e.get("upgrading") || e.startUpgrade();
        },
        resetUpgrade: function () {
          var e = this;
          bootbox.confirm(
            "WARNING: You should only reset upgrades that have failed and are not running.\n\nThis will NOT cancel currently running builds and should only be used as a last resort.",
            function (n) {
              if (n) {
                if (e.get("multiUpgrade"))
                  return t.default
                    .resetAll(
                      e.get("model").filter(function (e) {
                        return !e.get("upToDate");
                      })
                    )
                    .finally(function () {
                      e.reset(), e.updateAttribute("upgrading", !1);
                    });
                e.get("model")[0]
                  .resetUpgrade()
                  .then(function () {
                    e.reset();
                  });
              }
            }
          );
        },
      },
    });
    e.default = n;
  }),
  define("manager-client/data-adapter", [
    "exports",
    "@ember-data/debug",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/discourse", ["exports", "jquery"], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var n = {
        getAppURL: function (e) {
          var r;
          return (
            this.hasOwnProperty("rootUrl") ||
              ((r = JSON.parse(
                document.getElementById("preloaded-data").dataset.preload
              )),
              t.default.extend(n, r)),
            e && ("/" === e || /^\/[^/]/.test(e))
              ? -1 !== e.indexOf(this.rootUrl)
                ? e
                : ("/" !== e[0] && (e = "/" + e), this.rootUrl + e)
              : e
          );
        },
      },
      r = n;
    e.default = r;
  }),
  define("manager-client/helpers/app-version", [
    "exports",
    "manager-client/config/environment",
    "ember-cli-app-version/utils/regexp",
  ], function (e, t, n) {
    function r(e) {
      var r =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        a = t.default.APP.version,
        o = r.versionOnly || r.hideSha,
        i = r.shaOnly || r.hideVersion,
        u = null;
      return (
        o &&
          (r.showExtended && (u = a.match(n.versionExtendedRegExp)),
          u || (u = a.match(n.versionRegExp))),
        i && (u = a.match(n.shaRegExp)),
        u ? u[0] : a
      );
    }
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.appVersion = r),
      (e.default = void 0);
    var a = Ember.Helper.helper(r);
    e.default = a;
  }),
  define("manager-client/helpers/is-after", [
    "exports",
    "ember-moment/helpers/is-after",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/helpers/is-before", [
    "exports",
    "ember-moment/helpers/is-before",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/helpers/is-between", [
    "exports",
    "ember-moment/helpers/is-between",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/helpers/is-same-or-after", [
    "exports",
    "ember-moment/helpers/is-same-or-after",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/helpers/is-same-or-before", [
    "exports",
    "ember-moment/helpers/is-same-or-before",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/helpers/is-same", [
    "exports",
    "ember-moment/helpers/is-same",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/helpers/moment-add", [
    "exports",
    "ember-moment/helpers/moment-add",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/helpers/moment-calendar", [
    "exports",
    "ember-moment/helpers/moment-calendar",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/helpers/moment-diff", [
    "exports",
    "ember-moment/helpers/moment-diff",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/helpers/moment-duration", [
    "exports",
    "ember-moment/helpers/moment-duration",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/helpers/moment-format", [
    "exports",
    "ember-moment/helpers/moment-format",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/helpers/moment-from-now", [
    "exports",
    "ember-moment/helpers/moment-from-now",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/helpers/moment-from", [
    "exports",
    "ember-moment/helpers/moment-from",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/helpers/moment-subtract", [
    "exports",
    "ember-moment/helpers/moment-subtract",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/helpers/moment-to-date", [
    "exports",
    "ember-moment/helpers/moment-to-date",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/helpers/moment-to-now", [
    "exports",
    "ember-moment/helpers/moment-to-now",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/helpers/moment-to", [
    "exports",
    "ember-moment/helpers/moment-to",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  });
define("manager-client/helpers/moment-unix", [
  "exports",
  "ember-moment/helpers/unix",
], function (e, t) {
  Object.defineProperty(e, "__esModule", { value: !0 }),
    Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function () {
        return t.default;
      },
    });
}),
  define("manager-client/helpers/moment", [
    "exports",
    "ember-moment/helpers/moment",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/helpers/new-commits", ["exports"], function (e) {
    function t(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
          if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
            return;
          var n = [],
            r = !0,
            a = !1,
            o = void 0;
          try {
            for (
              var i, u = e[Symbol.iterator]();
              !(r = (i = u.next()).done) &&
              (n.push(i.value), !t || n.length !== t);
              r = !0
            );
          } catch (l) {
            (a = !0), (o = l);
          } finally {
            try {
              r || null == u.return || u.return();
            } finally {
              if (a) throw o;
            }
          }
          return n;
        })(e, t) ||
        (function (e, t) {
          if (!e) return;
          if ("string" == typeof e) return n(e, t);
          var r = Object.prototype.toString.call(e).slice(8, -1);
          "Object" === r && e.constructor && (r = e.constructor.name);
          if ("Map" === r || "Set" === r) return Array.from(e);
          if (
            "Arguments" === r ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
          )
            return n(e, t);
        })(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function n(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var r = Ember.Helper.helper(function (e) {
      var n = t(e, 4),
        r = n[0],
        a = n[1],
        o = n[2],
        i = n[3];
      if (0 === parseInt(r)) return "";
      var u = "".concat(r, " new commit").concat(1 === r ? "" : "s");
      if (Ember.isNone(i)) return u;
      var l = i.substr(0, i.search(/(\.git)?$/));
      return (
        (u = "<a href='"
          .concat(l, "/compare/")
          .concat(a, "...")
          .concat(o, "'>")
          .concat(u, "</a>")),
        new Ember.String.htmlSafe(u)
      );
    });
    e.default = r;
  }),
  define("manager-client/helpers/now", [
    "exports",
    "ember-moment/helpers/now",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/helpers/pluralize", [
    "exports",
    "ember-inflector/lib/helpers/pluralize",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var n = t.default;
    e.default = n;
  }),
  define("manager-client/helpers/singularize", [
    "exports",
    "ember-inflector/lib/helpers/singularize",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var n = t.default;
    e.default = n;
  }),
  define("manager-client/helpers/unix", [
    "exports",
    "ember-moment/helpers/unix",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/helpers/utc", [
    "exports",
    "ember-moment/helpers/utc",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      }),
      Object.defineProperty(e, "utc", {
        enumerable: !0,
        get: function () {
          return t.utc;
        },
      });
  }),
  define("manager-client/initializers/app-version", [
    "exports",
    "ember-cli-app-version/initializer-factory",
    "manager-client/config/environment",
  ], function (e, t, n) {
    var r, a;
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.default = void 0),
      n.default.APP && ((r = n.default.APP.name), (a = n.default.APP.version));
    var o = { name: "App Version", initialize: (0, t.default)(r, a) };
    e.default = o;
  }),
  define("manager-client/initializers/container-debug-adapter", [
    "exports",
    "ember-resolver/resolvers/classic/container-debug-adapter",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var n = {
      name: "container-debug-adapter",
      initialize: function () {
        var e = arguments[1] || arguments[0];
        e.register("container-debug-adapter:main", t.default),
          e.inject(
            "container-debug-adapter:main",
            "namespace",
            "application:main"
          );
      },
    };
    e.default = n;
  }),
  define("manager-client/initializers/crsf-token", [
    "exports",
    "manager-client/discourse",
    "jquery",
  ], function (e, t, n) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var r = {
      name: "findCsrfToken",
      initialize: function () {
        return n.default
          .ajax(t.default.getAppURL("/session/csrf"))
          .then(function (e) {
            var t = e.csrf;
            n.default.ajaxPrefilter(function (e, n, r) {
              e.crossDomain || r.setRequestHeader("X-CSRF-Token", t);
            });
          });
      },
    };
    e.default = r;
  }),
  define("manager-client/initializers/ember-data-data-adapter", [
    "exports",
    "@ember-data/debug/setup",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/initializers/ember-data", [
    "exports",
    "ember-data",
    "ember-data/setup-container",
  ], function (e, t, n) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var r = { name: "ember-data", initialize: n.default };
    e.default = r;
  }),
  define("manager-client/initializers/export-application-global", [
    "exports",
    "manager-client/config/environment",
  ], function (e, t) {
    function n() {
      var e = arguments[1] || arguments[0];
      if (!1 !== t.default.exportApplicationGlobal) {
        var n;
        if ("undefined" != typeof window) n = window;
        else if ("undefined" != typeof global) n = global;
        else {
          if ("undefined" == typeof self) return;
          n = self;
        }
        var r,
          a = t.default.exportApplicationGlobal;
        (r =
          "string" == typeof a
            ? a
            : Ember.String.classify(t.default.modulePrefix)),
          n[r] ||
            ((n[r] = e),
            e.reopen({
              willDestroy: function () {
                this._super.apply(this, arguments), delete n[r];
              },
            }));
      }
    }
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.initialize = n),
      (e.default = void 0);
    var r = { name: "export-application-global", initialize: n };
    e.default = r;
  }),
  define("manager-client/initializers/message-bus", [
    "exports",
    "manager-client/discourse",
    "jquery",
  ], function (e, t, n) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var r = {
      name: "message-bus",
      initialize: function () {
        (MessageBus.baseUrl =
          t.default.longPollingBaseUrl.replace(/\/$/, "") + "/"),
          "/" !== MessageBus.baseUrl
            ? (MessageBus.ajax = function (e) {
                e.headers = e.headers || {};
                var t = document.querySelector("meta[name=shared_session_key]");
                return (
                  t && (e.headers["X-Shared-Session-Key"] = t.content),
                  n.default.ajax(e)
                );
              })
            : (MessageBus.baseUrl = t.default.getAppURL("/"));
      },
    };
    e.default = r;
  }),
  define("manager-client/instance-initializers/ember-data", [
    "exports",
  ], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    e.default = { name: "ember-data", initialize: function () {} };
  }),
  define("manager-client/models/process-list", [
    "exports",
    "manager-client/discourse",
    "jquery",
  ], function (e, t, n) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.find = function () {
        return r.create().refresh();
      }),
      (e.default = void 0);
    var r = Ember.Object.extend({
      output: null,
      refresh: function () {
        var e = this;
        return n.default
          .ajax(t.default.getAppURL("/admin/docker/ps"), { dataType: "text" })
          .then(function (t) {
            return e.set("output", t), e;
          });
      },
    });
    var a = r;
    e.default = a;
  }),
  define("manager-client/models/repo", [
    "exports",
    "manager-client/discourse",
    "jquery",
  ], function (e, t, n) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var r = [];
    function a(e) {
      return e
        .map(function (e) {
          return e.get("version");
        })
        .join(", ");
    }
    var o = Ember.Object.extend({
      unloaded: !0,
      checking: !1,
      checkingStatus: Ember.computed.or("unloaded", "checking"),
      upToDate: Ember.computed(
        "upgrading",
        "version",
        "latest.version",
        function () {
          return (
            !this.get("upgrading") &
            (this.get("version") === this.get("latest.version"))
          );
        }
      ),
      prettyVersion: Ember.computed("version", "pretty_version", function () {
        return this.get("pretty_version") || this.get("version");
      }),
      prettyLatestVersion: Ember.computed(
        "latest.{version,pretty_version}",
        function () {
          return (
            this.get("latest.pretty_version") || this.get("latest.version")
          );
        }
      ),
      get shouldCheck() {
        if (Ember.isNone(this.get("version"))) return !1;
        if (this.get("checking")) return !1;
        var e = this.get("lastCheckedAt");
        return !e || new Date().getTime() - e > 6e4;
      },
      repoAjax: function (e, r) {
        return (
          ((r = r || {}).data = this.getProperties(
            "path",
            "version",
            "branch"
          )),
          n.default.ajax(t.default.getAppURL(e), r)
        );
      },
      findLatest: function () {
        var e = this;
        return new Ember.RSVP.Promise(function (n) {
          if (!e.get("shouldCheck")) return e.set("unloaded", !1), n();
          e.set("checking", !0),
            e
              .repoAjax(t.default.getAppURL("/admin/docker/latest"))
              .then(function (t) {
                e.setProperties({
                  unloaded: !1,
                  checking: !1,
                  lastCheckedAt: new Date().getTime(),
                  latest: Ember.Object.create(t.latest),
                }),
                  n();
              });
        });
      },
      findProgress: function () {
        return this.repoAjax(
          t.default.getAppURL("/admin/docker/progress")
        ).then(function (e) {
          return e.progress;
        });
      },
      resetUpgrade: function () {
        var e = this;
        return this.repoAjax(t.default.getAppURL("/admin/docker/upgrade"), {
          dataType: "text",
          type: "DELETE",
        }).then(function () {
          e.set("upgrading", !1);
        });
      },
      startUpgrade: function () {
        var e = this;
        return (
          this.set("upgrading", !0),
          this.repoAjax(t.default.getAppURL("/admin/docker/upgrade"), {
            dataType: "text",
            type: "POST",
          }).catch(function () {
            e.set("upgrading", !1);
          })
        );
      },
    });
    o.reopenClass({
      findAll: function () {
        return new Ember.RSVP.Promise(function (e) {
          if (r.length) return e(r);
          n.default
            .ajax(t.default.getAppURL("/admin/docker/repos"))
            .then(function (t) {
              (r = t.repos.map(function (e) {
                return o.create(e);
              })),
                e(r);
            });
        });
      },
      findUpgrading: function () {
        return this.findAll().then(function (e) {
          return e.findBy("upgrading", !0);
        });
      },
      find: function (e) {
        return this.findAll().then(function (t) {
          return t.findBy("id", e);
        });
      },
      upgradeAll: function () {
        return n.default.ajax(t.default.getAppURL("/admin/docker/upgrade"), {
          dataType: "text",
          type: "POST",
          data: { path: "all" },
        });
      },
      resetAll: function (e) {
        return n.default.ajax(t.default.getAppURL("/admin/docker/upgrade"), {
          dataType: "text",
          type: "DELETE",
          data: { path: "all", version: a(e) },
        });
      },
      findLatestAll: function () {
        return n.default.ajax(t.default.getAppURL("/admin/docker/latest"), {
          dataType: "text",
          type: "GET",
          data: { path: "all" },
        });
      },
      findAllProgress: function (e) {
        return n.default.ajax(t.default.getAppURL("/admin/docker/progress"), {
          dataType: "text",
          type: "GET",
          data: { path: "all", version: a(e) },
        });
      },
    });
    var i = o;
    e.default = i;
  }),
  define("manager-client/resolver", ["exports", "ember-resolver"], function (
    e,
    t
  ) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var n = t.default;
    e.default = n;
  }),
  define("manager-client/router", [
    "exports",
    "manager-client/config/environment",
  ], function (e, t) {
    function n(e) {
      return (n =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            })(e);
    }
    function r(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function a(e, t) {
      return (a =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    function o(e) {
      var t = (function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Date.prototype.toString.call(
              Reflect.construct(Date, [], function () {})
            ),
            !0
          );
        } catch (e) {
          return !1;
        }
      })();
      return function () {
        var n,
          r = l(e);
        if (t) {
          var a = l(this).constructor;
          n = Reflect.construct(r, arguments, a);
        } else n = r.apply(this, arguments);
        return i(this, n);
      };
    }
    function i(e, t) {
      return !t || ("object" !== n(t) && "function" != typeof t) ? u(e) : t;
    }
    function u(e) {
      if (void 0 === e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return e;
    }
    function l(e) {
      return (l = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function s(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var d = (function (e) {
      (function (e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          t && a(e, t);
      })(i, Ember.Router);
      var n = o(i);
      function i() {
        var e;
        r(this, i);
        for (var a = arguments.length, o = new Array(a), l = 0; l < a; l++)
          o[l] = arguments[l];
        return (
          s(
            u((e = n.call.apply(n, [this].concat(o)))),
            "location",
            t.default.locationType
          ),
          s(u(e), "rootURL", t.default.rootURL),
          e
        );
      }
      return i;
    })();
    (e.default = d),
      d.map(function () {
        this.route("processes"),
          this.route("upgrade", { path: "/upgrade/:id" });
      });
  }),
  define("manager-client/routes/index", [
    "exports",
    "manager-client/models/repo",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var n = Ember.Route.extend({
      model: function () {
        return t.default.findAll();
      },
      loadRepos: function (e) {
        var t = this;
        0 !== e.length &&
          this.loadRepo(e.shift()).then(function () {
            return t.loadRepos(e);
          });
      },
      loadRepo: function (e) {
        return e.findLatest();
      },
      setupController: function (e, t) {
        var n = this.controllerFor("application");
        e.setProperties({ model: t, upgrading: null }),
          t.forEach(function (t) {
            t.get("upgrading") && e.set("upgrading", t),
              "docker_manager" === t.get("id") && e.set("managerRepo", t),
              "discourse" === t.get("id") &&
                "origin/master" === t.get("branch") &&
                n.appendBannerHtml(
                  "<b>WARNING:</b> Your Discourse is tracking the 'master' branch which may be unstable, <a href='https://meta.discourse.org/t/change-tracking-branch-for-your-discourse-instance/17014'>we recommend tracking the 'tests-passed' branch</a>."
                );
          }),
          this.loadRepos(t.slice(0));
      },
    });
    e.default = n;
  }),
  define("manager-client/routes/processes", [
    "exports",
    "manager-client/models/process-list",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var n = Ember.Route.extend({ model: t.find });
    e.default = n;
  }),
  define("manager-client/routes/upgrade", [
    "exports",
    "manager-client/models/repo",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var n = Ember.Route.extend({
      model: function (e) {
        return "all" === e.id ? t.default.findAll() : t.default.find(e.id);
      },
      afterModel: function (e) {
        var n = this;
        return Array.isArray(e)
          ? t.default.findLatestAll().then(function (r) {
              return (
                JSON.parse(r).repos.forEach(function (t) {
                  var n = e.find(function (e) {
                    return e.get("path") === t.path;
                  });
                  n && (delete t.path, n.set("latest", Ember.Object.create(t)));
                }),
                t.default
                  .findAllProgress(
                    e.filter(function (e) {
                      return !e.get("upToDate");
                    })
                  )
                  .then(function (e) {
                    n.set("progress", JSON.parse(e).progress);
                  })
              );
            })
          : t.default.findUpgrading().then(function (t) {
              return t && t !== e
                ? Ember.RSVP.Promise.reject("wat")
                : e.findLatest().then(function () {
                    return e.findProgress().then(function (e) {
                      n.set("progress", e);
                    });
                  });
            });
      },
      setupController: function (e, t) {
        e.reset(),
          e.setProperties({
            model: Array.isArray(t) ? t : [t],
            output: this.get("progress.logs"),
            percent: this.get("progress.percentage"),
          }),
          e.startBus();
      },
      deactivate: function () {
        this.controllerFor("upgrade").stopBus();
      },
    });
    e.default = n;
  }),
  define("manager-client/serializers/-default", [
    "exports",
    "@ember-data/serializer/json",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/serializers/-json-api", [
    "exports",
    "@ember-data/serializer/json-api",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/serializers/-rest", [
    "exports",
    "@ember-data/serializer/rest",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/services/moment", [
    "exports",
    "ember-moment/services/moment",
    "manager-client/config/environment",
  ], function (e, t, n) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var r = Ember.get,
      a = t.default.extend({
        defaultFormat: r(n.default, "moment.outputFormat"),
      });
    e.default = a;
  }),
  define("manager-client/services/store", [
    "exports",
    "ember-data/store",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.default;
        },
      });
  }),
  define("manager-client/templates/application", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var t = Ember.HTMLBars.template({
      id: "mIv22c2E",
      block:
        '{"symbols":["row"],"statements":[[10,"div"],[14,0,"container"],[12],[2,"\\n  "],[10,"div"],[14,0,"back-site"],[12],[2,"\\n    "],[10,"a"],[15,6,[34,6]],[12],[2,"Return to site"],[13],[2,"\\n  "],[13],[2,"\\n\\n  "],[10,"header"],[14,0,"container"],[12],[2,"\\n    "],[6,[37,0],null,[["route"],["index"]],[["default"],[{"statements":[[10,"img"],[15,"src",[34,5]],[14,0,"logo"],[12],[13]],"parameters":[]}]]],[2,"\\n    "],[10,"h1"],[12],[6,[37,0],null,[["route"],["index"]],[["default"],[{"statements":[[2,"Upgrade"]],"parameters":[]}]]],[13],[2,"\\n  "],[13],[2,"\\n\\n  "],[10,"div"],[14,0,"container"],[12],[2,"\\n\\n"],[6,[37,8],[[35,7]],null,[["default"],[{"statements":[[2,"      "],[10,"div"],[14,1,"banner"],[12],[2,"\\n        "],[10,"div"],[14,1,"banner-content"],[12],[2,"\\n          "],[11,"div"],[24,0,"close"],[4,[38,1],[[32,0],"dismiss"],null],[12],[10,"i"],[14,0,"fa fa-times"],[14,"title","Dismiss this banner."],[12],[13],[13],[2,"\\n"],[6,[37,4],[[30,[36,3],[[30,[36,3],[[35,2]],null]],null]],null,[["default"],[{"statements":[[2,"            "],[10,"p"],[12],[2,[32,1]],[13],[2,"\\n"]],"parameters":[1]}]]],[2,"        "],[13],[2,"\\n      "],[13],[2,"\\n"]],"parameters":[]}]]],[2,"\\n    "],[10,"ul"],[14,0,"nav nav-tabs"],[12],[2,"\\n"],[6,[37,0],null,[["tagName","class","route"],["li","nav-item","index"]],[["default"],[{"statements":[[2,"        "],[6,[37,0],null,[["class","route"],["nav-link","index"]],[["default"],[{"statements":[[2,"Versions"]],"parameters":[]}]]],[2,"\\n"]],"parameters":[]}]]],[6,[37,0],null,[["tagName","class","route"],["li","nav-item","processes"]],[["default"],[{"statements":[[2,"        "],[6,[37,0],null,[["class","route"],["nav-link","processes"]],[["default"],[{"statements":[[2,"Processes"]],"parameters":[]}]]],[2,"\\n"]],"parameters":[]}]]],[2,"\\n      "],[10,"li"],[14,0,"nav-item"],[12],[10,"a"],[14,0,"nav-link"],[15,6,[34,9]],[12],[2,"Backups"],[13],[13],[2,"\\n    "],[13],[2,"\\n\\n    "],[1,[30,[36,11],[[30,[36,10],null,null]],null]],[2,"\\n  "],[13],[2,"\\n"],[13],[2,"\\n"]],"hasEval":false,"upvars":["link-to","action","banner","-track-array","each","logoUrl","returnToSiteUrl","showBanner","if","backupsUrl","-outlet","component"]}',
      meta: { moduleName: "manager-client/templates/application.hbs" },
    });
    e.default = t;
  }),
  define("manager-client/templates/components/progress-bar", [
    "exports",
  ], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var t = Ember.HTMLBars.template({
      id: "a165sycW",
      block:
        '{"symbols":[],"statements":[[10,"div"],[15,0,[31,["progress-bar progress-bar-striped ",[30,[36,1],[[35,0],"progress-bar-animated"],null]]]],[15,5,[34,2]],[12],[13],[2,"\\n"]],"hasEval":false,"upvars":["active","if","barStyle"]}',
      meta: {
        moduleName: "manager-client/templates/components/progress-bar.hbs",
      },
    });
    e.default = t;
  });
define("manager-client/templates/components/repo-status", [
  "exports",
], function (e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
  var t = Ember.HTMLBars.template({
    id: "U2xNSpvW",
    block:
      '{"symbols":[],"statements":[[10,"td"],[12],[2,"\\n"],[6,[37,4],[[35,2,["official"]]],null,[["default"],[{"statements":[[2,"    "],[10,"img"],[14,0,"check-circle"],[15,"src",[34,6]],[14,"alt","Official Plugin"],[14,"title","Official Plugin"],[12],[13],[2,"\\n"]],"parameters":[]}]]],[13],[2,"\\n"],[10,"td"],[12],[2,"\\n  "],[10,"a"],[15,6,[31,[[34,2,["url"]]]]],[12],[1,[35,2,["name"]]],[13],[2,"\\n  "],[10,"span"],[14,0,"current commit-hash"],[12],[1,[35,2,["prettyVersion"]]],[13],[2,"\\n"],[13],[2,"\\n"],[10,"td"],[12],[2,"\\n"],[6,[37,4],[[35,2,["checkingStatus"]]],null,[["default","else"],[{"statements":[[2,"    Checking for new version...\\n"]],"parameters":[]},{"statements":[[6,[37,4],[[35,2,["upToDate"]]],null,[["default","else"],[{"statements":[[2,"    Up to date\\n"]],"parameters":[]},{"statements":[[2,"    "],[10,"div"],[14,0,"new-version"],[12],[2,"\\n      "],[10,"h4"],[12],[2,"New Version Available!"],[13],[2,"\\n      "],[10,"ul"],[12],[2,"\\n        "],[10,"li"],[12],[2,"Remote Version: "],[10,"span"],[14,0,"new commit-hash"],[12],[1,[35,2,["prettyLatestVersion"]]],[13],[13],[2,"\\n        "],[10,"li"],[12],[2,"Last Updated:\\n"],[6,[37,4],[[35,2,["latest","date"]]],null,[["default","else"],[{"statements":[[2,"            "],[1,[30,[36,3],[[35,2,["latest","date"]]],[["interval"],[1000]]]],[2,"\\n"]],"parameters":[]},{"statements":[[2,"            —\\n"]],"parameters":[]}]]],[2,"        "],[13],[2,"\\n        "],[10,"li"],[14,0,"new-commits"],[12],[1,[30,[36,5],[[35,2,["latest","commits_behind"]],[35,2,["version"]],[35,2,["latest","version"]],[35,2,["url"]]],null]],[13],[2,"\\n      "],[13],[2,"\\n"],[6,[37,4],[[35,2,["upgrading"]]],null,[["default","else"],[{"statements":[[2,"        "],[11,"button"],[24,0,"btn"],[4,[38,1],[[32,0],"upgrade"],null],[12],[2,"Currently Upgrading..."],[13],[2,"\\n"]],"parameters":[]},{"statements":[[2,"        "],[11,"button"],[24,0,"upgrade-button btn"],[16,"disabled",[34,0]],[4,[38,1],[[32,0],"upgrade"],null],[12],[2,"Upgrade"],[13],[2,"\\n"]],"parameters":[]}]]],[2,"    "],[13],[2,"\\n  "]],"parameters":[]}]]]],"parameters":[]}]]],[13],[2,"\\n"]],"hasEval":false,"upvars":["upgradeDisabled","action","repo","moment-from-now","if","new-commits","officialRepoImageSrc"]}',
    meta: { moduleName: "manager-client/templates/components/repo-status.hbs" },
  });
  e.default = t;
}),
  define("manager-client/templates/components/x-console", [
    "exports",
  ], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var t = Ember.HTMLBars.template({
      id: "ZW89qKKO",
      block:
        '{"symbols":[],"statements":[[1,[34,0]],[2,"\\n"]],"hasEval":false,"upvars":["output"]}',
      meta: { moduleName: "manager-client/templates/components/x-console.hbs" },
    });
    e.default = t;
  }),
  define("manager-client/templates/index", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var t = Ember.HTMLBars.template({
      id: "FUuJ7m25",
      block:
        '{"symbols":["repo"],"statements":[[11,"button"],[16,"disabled",[34,3]],[24,1,"upgrade-all"],[24,0,"btn"],[4,[38,4],[[32,0],"upgradeAllButton"],null],[12],[2,"\\n"],[6,[37,6],[[35,5]],null,[["default","else"],[{"statements":[[2,"    All Up-to-date\\n"]],"parameters":[]},{"statements":[[2,"    Upgrade All\\n"]],"parameters":[]}]]],[13],[2,"\\n\\n"],[10,"table"],[14,0,"table"],[14,1,"repos"],[12],[2,"\\n  "],[10,"tr"],[12],[2,"\\n    "],[10,"th"],[12],[13],[2,"\\n    "],[10,"th"],[14,5,"width: 50%"],[12],[2,"Repository"],[13],[2,"\\n    "],[10,"th"],[12],[2,"Status"],[13],[2,"\\n  "],[13],[2,"\\n  "],[10,"tbody"],[12],[2,"\\n"],[6,[37,9],[[30,[36,8],[[30,[36,8],[[35,7]],null]],null]],null,[["default"],[{"statements":[[2,"      "],[1,[30,[36,2],null,[["repo","upgradingRepo","managerRepo"],[[32,1],[35,1],[35,0]]]]],[2,"\\n"]],"parameters":[1]}]]],[2,"  "],[13],[2,"\\n"],[13],[2,"\\n"]],"hasEval":false,"upvars":["managerRepo","upgrading","repo-status","upgradeAllButtonDisabled","action","allUpToDate","if","model","-track-array","each"]}',
      meta: { moduleName: "manager-client/templates/index.hbs" },
    });
    e.default = t;
  }),
  define("manager-client/templates/loading", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var t = Ember.HTMLBars.template({
      id: "0ocDcLo/",
      block:
        '{"symbols":[],"statements":[[10,"h3"],[14,0,"loading"],[12],[2,"Loading..."],[13],[2,"\\n"]],"hasEval":false,"upvars":[]}',
      meta: { moduleName: "manager-client/templates/loading.hbs" },
    });
    e.default = t;
  }),
  define("manager-client/templates/processes", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var t = Ember.HTMLBars.template({
      id: "VQmN43M/",
      block:
        '{"symbols":[],"statements":[[1,[30,[36,1],null,[["output"],[[35,0,["output"]]]]]],[2,"\\n"]],"hasEval":false,"upvars":["model","x-console"]}',
      meta: { moduleName: "manager-client/templates/processes.hbs" },
    });
    e.default = t;
  }),
  define("manager-client/templates/upgrade", ["exports"], function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
    var t = Ember.HTMLBars.template({
      id: "IO8vYqzv",
      block:
        '{"symbols":[],"statements":[[10,"h3"],[12],[2,"Upgrade "],[1,[34,4]],[13],[2,"\\n\\n"],[1,[30,[36,8],null,[["percent"],[[35,7]]]]],[2,"\\n\\n"],[6,[37,3],[[35,9]],null,[["default"],[{"statements":[[2,"  "],[10,"p"],[12],[2,"Upgrade completed successfully!"],[13],[2,"\\n"]],"parameters":[]}]]],[2,"\\n"],[6,[37,3],[[35,10]],null,[["default"],[{"statements":[[2,"  "],[10,"p"],[12],[2,"Sorry, there was an error upgrading Discourse. Please check the logs below."],[13],[2,"\\n"]],"parameters":[]}]]],[2,"\\n"],[6,[37,3],[[35,11]],null,[["default","else"],[{"statements":[[6,[37,6],[[35,5]],null,[["default","else"],[{"statements":[[2,"    "],[10,"p"],[12],[1,[34,4]],[2," is at the newest version."],[13],[2,"\\n"]],"parameters":[]},{"statements":[[2,"    "],[10,"p"],[12],[2,"Everything is up-to-date."],[13],[2,"\\n"]],"parameters":[]}]]]],"parameters":[]},{"statements":[[2,"  "],[10,"div"],[14,5,"clear: both"],[12],[2,"\\n    "],[11,"button"],[16,"disabled",[34,1]],[24,0,"btn"],[4,[38,0],[[32,0],"start"],null],[12],[1,[34,2]],[13],[2,"\\n"],[6,[37,3],[[35,1]],null,[["default"],[{"statements":[[2,"      "],[11,"button"],[24,0,"btn unlock"],[4,[38,0],[[32,0],"resetUpgrade"],null],[12],[2,"Reset Upgrade"],[13],[2,"\\n"]],"parameters":[]}]]],[2,"  "],[13],[2,"\\n"]],"parameters":[]}]]],[2,"\\n"],[1,[30,[36,13],null,[["output","followOutput"],[[35,12],true]]]],[2,"\\n"]],"hasEval":false,"upvars":["action","upgrading","upgradeButtonText","if","title","multiUpgrade","unless","percent","progress-bar","complete","failed","isUpToDate","output","x-console"]}',
      meta: { moduleName: "manager-client/templates/upgrade.hbs" },
    });
    e.default = t;
  }),
  define("manager-client/transforms/boolean", [
    "exports",
    "@ember-data/serializer/-private",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.BooleanTransform;
        },
      });
  }),
  define("manager-client/transforms/date", [
    "exports",
    "@ember-data/serializer/-private",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.DateTransform;
        },
      });
  }),
  define("manager-client/transforms/number", [
    "exports",
    "@ember-data/serializer/-private",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.NumberTransform;
        },
      });
  }),
  define("manager-client/transforms/string", [
    "exports",
    "@ember-data/serializer/-private",
  ], function (e, t) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "default", {
        enumerable: !0,
        get: function () {
          return t.StringTransform;
        },
      });
  }),
  define("manager-client/config/environment", [], function () {
    try {
      var e = "manager-client/config/environment",
        t = document
          .querySelector('meta[name="' + e + '"]')
          .getAttribute("content"),
        n = { default: JSON.parse(decodeURIComponent(t)) };
      return Object.defineProperty(n, "__esModule", { value: !0 }), n;
    } catch (r) {
      throw new Error(
        'Could not read config from meta tag with name "' + e + '".'
      );
    }
  }),
  runningTests ||
    require("manager-client/app").default.create({
      name: "manager-client",
      version: "0.0.0+02da7713",
    });
