(function(t) {
  function e(e) {
    for (
      var a, o, s = e[0], c = e[1], l = e[2], u = 0, p = [];
      u < s.length;
      u++
    )
      (o = s[u]),
        Object.prototype.hasOwnProperty.call(i, o) && i[o] && p.push(i[o][0]),
        (i[o] = 0);
    for (a in c) Object.prototype.hasOwnProperty.call(c, a) && (t[a] = c[a]);
    d && d(e);
    while (p.length) p.shift()();
    return r.push.apply(r, l || []), n();
  }
  function n() {
    for (var t, e = 0; e < r.length; e++) {
      for (var n = r[e], a = !0, o = 1; o < n.length; o++) {
        var c = n[o];
        0 !== i[c] && (a = !1);
      }
      a && (r.splice(e--, 1), (t = s((s.s = n[0]))));
    }
    return t;
  }
  var a = {},
    i = { app: 0 },
    r = [];
  function o(t) {
    return (
      s.p +
      "js/" +
      ({}[t] || t) +
      "." +
      {
        "chunk-2d216214": "81672542",
        "chunk-2d216257": "3f6f7528",
        "chunk-92049e16": "7db881e4",
      }[t] +
      ".js"
    );
  }
  function s(e) {
    if (a[e]) return a[e].exports;
    var n = (a[e] = { i: e, l: !1, exports: {} });
    return t[e].call(n.exports, n, n.exports, s), (n.l = !0), n.exports;
  }
  (s.e = function(t) {
    var e = [],
      n = i[t];
    if (0 !== n)
      if (n) e.push(n[2]);
      else {
        var a = new Promise(function(e, a) {
          n = i[t] = [e, a];
        });
        e.push((n[2] = a));
        var r,
          c = document.createElement("script");
        (c.charset = "utf-8"),
          (c.timeout = 120),
          s.nc && c.setAttribute("nonce", s.nc),
          (c.src = o(t));
        var l = new Error();
        r = function(e) {
          (c.onerror = c.onload = null), clearTimeout(u);
          var n = i[t];
          if (0 !== n) {
            if (n) {
              var a = e && ("load" === e.type ? "missing" : e.type),
                r = e && e.target && e.target.src;
              (l.message =
                "Loading chunk " + t + " failed.\n(" + a + ": " + r + ")"),
                (l.name = "ChunkLoadError"),
                (l.type = a),
                (l.request = r),
                n[1](l);
            }
            i[t] = void 0;
          }
        };
        var u = setTimeout(function() {
          r({ type: "timeout", target: c });
        }, 12e4);
        (c.onerror = c.onload = r), document.head.appendChild(c);
      }
    return Promise.all(e);
  }),
    (s.m = t),
    (s.c = a),
    (s.d = function(t, e, n) {
      s.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
    }),
    (s.r = function(t) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (s.t = function(t, e) {
      if ((1 & e && (t = s(t)), 8 & e)) return t;
      if (4 & e && "object" === typeof t && t && t.__esModule) return t;
      var n = Object.create(null);
      if (
        (s.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var a in t)
          s.d(
            n,
            a,
            function(e) {
              return t[e];
            }.bind(null, a)
          );
      return n;
    }),
    (s.n = function(t) {
      var e =
        t && t.__esModule
          ? function() {
              return t["default"];
            }
          : function() {
              return t;
            };
      return s.d(e, "a", e), e;
    }),
    (s.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (s.p = "/"),
    (s.oe = function(t) {
      throw (console.error(t), t);
    });
  var c = (window["webpackJsonp"] = window["webpackJsonp"] || []),
    l = c.push.bind(c);
  (c.push = e), (c = c.slice());
  for (var u = 0; u < c.length; u++) e(c[u]);
  var d = l;
  r.push([0, "chunk-vendors"]), n();
})({
  0: function(t, e, n) {
    t.exports = n("56d7");
  },
  "03d5": function(t, e, n) {
    "use strict";
    var a = n("b775"),
      i = n("78a3");
    e["a"] = {
      get: function(t) {
        return a["a"].get(i["g"].GET(t));
      },
      getAll: function(t) {
        return a["a"].get(i["g"].GET_ALL, { params: t });
      },
      add: function(t) {
        return a["a"].post(i["g"].ADD, t);
      },
      edit: function(t) {
        return a["a"].put(i["g"].EDIT, t);
      },
      delete: function(t) {
        return a["a"].delete(i["g"].DELETE(t));
      },
    };
  },
  "03fd": function(t, e, n) {},
  "062f": function(t, e, n) {},
  "07a4": function(t, e, n) {
    "use strict";
    n("96cf");
    var a = n("3b8d"),
      i = n("2b0e"),
      r = n("2f62"),
      o = n("dde5"),
      s = n("3786"),
      c = n("b775"),
      l = n("78a3"),
      u = {
        getAuthorizedUser: function() {
          return Object(c["a"])({ url: l["n"].GET_INFO_URL, method: "get" });
        },
      },
      d = n("ce96"),
      p = n("7055"),
      f = { token: null, username: null },
      m = {
        SET_TOKEN: function(t, e) {
          t.token = e;
        },
      },
      g = {
        saveToken: function(t, e) {
          t.commit("SET_TOKEN", e);
        },
        login: function(t, e) {
          var n = t.commit,
            a = e.emailOrUsername,
            i = e.password,
            r = e.recaptchaToken;
          return new Promise(function(t, e) {
            s["a"]
              .login({ emailOrUsername: a, password: i, recaptchaToken: r })
              .then(function(e) {
                var a = e.token;
                o["d"].setToken(a), n("SET_TOKEN", a), t(e);
              })
              .catch(function(t) {
                e(t);
              });
          });
        },
        logout: function(t) {
          var e = t.commit;
          p["l"].setRoles([]),
            p["l"].setDirectivePermissions([]),
            p["l"].setUserInfo({}),
            e("SET_TOKEN", null),
            o["d"].removeToken();
        },
        getAuthorizedUser: function(t) {
          t.commit;
          return new Promise(function(t, e) {
            u.getAuthorizedUser()
              .then(function(n) {
                n || e("Verification failed, please Login again.");
                var a = n.roles,
                  i = n.directivePermissions;
                (!a || a.length <= 0) &&
                  (a = [{ name: "none", permissions: [] }]),
                  (!a || a.length <= 0) &&
                    e("getInfo: roles must be a non-null array!");
                var r = d["i"].mapRoleObj(a),
                  o = d["i"].mapPermissionObj(i);
                p["l"].setRoles(r),
                  p["l"].setDirectivePermissions(o),
                  p["l"].setUserInfo(d["i"].mapUserInfo(n)),
                  t(n);
              })
              .catch(function(t) {
                e(t);
              });
          });
        },
      },
      h = {
        token: function(t) {
          return t.token;
        },
        username: function(t) {
          return t.username;
        },
      },
      v = { namespaced: !0, state: f, mutations: m, actions: g, getters: h },
      b = {
        sumData: {},
        infoData: null,
        data: {},
        paging: {},
        activeTabId: null,
        activeService: null,
        isVisible: !1,
        loading: !1,
        isEditData: !1,
        editDataGid: 0,
      },
      y = {
        SET_DATATABLE: function(t, e) {
          t.data = e;
        },
        SET_DATATABLE_TABS: function(t, e) {
          t.tabs = e;
        },
        SET_DATATABLE_ACTIVE_TAB_ID: function(t, e) {
          t.activeTabId = e;
        },
        SET_DATATABLE_ACTIVE_SERVICE: function(t, e) {
          t.activeService = e;
        },
        SET_IS_EDIT_DATA: function(t, e) {
          t.isEditData = e;
        },
        SET_EDIT_DATA_GID: function(t, e) {
          t.editDataGid = e;
        },
        SET_DATATABLE_CHECKED_COLUMNS: function(t, e) {
          e.id;
          var n = e.value;
          t.data.checkedColumnsData = n;
        },
        SET_DATATABLE_CHECKED_COLUMNS_DATA: function(t, e) {
          e.id;
          var n = e.value;
          t.data.checkedColumns = n;
        },
        SET_DATATABLE_FILTER_VALUES: function(t, e) {
          e.id;
          var n = e.value;
          t.data.filterValues = n;
        },
        SET_DATATABLE_VISIBILITY: function(t, e) {
          t.isVisible = e;
        },
        SET_DATATABLE_LOADING: function(t, e) {
          t.loading = e;
        },
        SET_DATATABLE_PAGING: function(t, e) {
          t.paging = e;
        },
        SET_SUM_DATA: function(t, e) {
          t.sumData = e;
        },
        SET_INFO_DATA: function(t, e) {
          t.infoData = e;
        },
      },
      C = {
        saveDatatable: function(t, e) {
          t.commit("SET_DATATABLE", e);
        },
        saveIsEditData: function(t, e) {
          t.commit("SET_IS_EDIT_DATA", e);
        },
        saveEditDataGid: function(t, e) {
          t.commit("SET_EDIT_DATA_GID", e);
        },
        saveDatatableActiveTabId: function(t, e) {
          t.commit("SET_DATATABLE_ACTIVE_TAB_ID", e);
        },
        saveTableActiveService: function(t, e) {
          var n = null,
            a = d["g"].isBunch(e);
          (n = a ? e.layers[0].id : e.id),
            t.commit("SET_DATATABLE_ACTIVE_SERVICE", e),
            t.commit("SET_DATATABLE_ACTIVE_TAB_ID", n);
        },
        saveDatatableCheckedColumns: function(t, e) {
          var n = e.id,
            a = e.value;
          t.commit("SET_DATATABLE_CHECKED_COLUMNS", { id: n, value: a });
        },
        saveDatatableCheckedColumnsData: function(t, e) {
          var n = e.id,
            a = e.value;
          t.commit("SET_DATATABLE_CHECKED_COLUMNS_DATA", { id: n, value: a });
        },
        SAVE_DATATABLE_FILTER_VALUES: function(t, e) {
          var n = e.id,
            a = e.value;
          t.commit("SET_DATATABLE_FILTER_VALUES", { id: n, value: a });
        },
        saveDatatableVisibility: function(t, e) {
          t.commit("SET_DATATABLE_VISIBILITY", e);
        },
        saveDatatableLoading: function(t, e) {
          t.commit("SET_DATATABLE_LOADING", e);
        },
        saveDataTablePaging: function(t, e) {
          t.commit("SET_DATATABLE_PAGING", e);
        },
        RESET_DATATABLE: function(t) {
          t.dispatch("saveDatatable", []),
            t.dispatch("SAVE_DATATABLE_TABS", []);
        },
        saveSumData: function(t, e) {
          t.commit("SET_SUM_DATA", e);
        },
        saveInfoData: function(t, e) {
          t.commit("SET_INFO_DATA", e);
        },
      },
      _ = {
        dataTableLoading: function(t) {
          return t.loading;
        },
        isEditData: function(t) {
          return t.isEditData;
        },
        dataTableVisibleStatus: function(t) {
          return t.isVisible;
        },
        tableData: function(t) {
          return t.data;
        },
        tablePaging: function(t) {
          return t.paging;
        },
        sumData: function(t) {
          return t.sumData;
        },
        infoData: function(t) {
          return t.infoData;
        },
        editDataGid: function(t) {
          return t.editDataGid;
        },
        tableActiveService: function(t) {
          return t.activeService;
        },
      },
      E = { state: b, mutations: y, actions: C, getters: _ },
      S = {
        defaultFillColor: "#FFFFFF00",
        defaultBorderColor: "#F44336FF",
        shapeFillColor: {
          hex8: "var(--transparent)",
          rgba: { r: 255, g: 255, b: 255, a: 1 },
        },
        shapeBorderColor: {
          hex8: "#000000",
          rgba: { r: 255, g: 255, b: 255, a: 1 },
        },
        colorPicker: { visibility: !1, layer: null, borderTab: !0 },
        activeColorPickerId: null,
      },
      O = {
        colorPicker: function(t) {
          return t.colorPicker;
        },
        defaultFillColor: function(t) {
          return t.defaultFillColor;
        },
        defaultBorderColor: function(t) {
          return t.defaultBorderColor;
        },
        activeColorPickerId: function(t) {
          return t.activeColorPickerId;
        },
      },
      T = {
        SET_COLORPICKER: function(t, e) {
          t.colorPicker = e;
        },
        SET_COLORPICKER_BORDER_TAB: function(t, e) {
          t.colorPicker.borderTab = e;
        },
        SET_COLORPICKER_LAYER: function(t, e) {
          t.colorPicker.layer = e;
        },
        SET_COLORPICKER_VISIBILITY: function(t, e) {
          t.colorPicker.visibility = e;
        },
        SET_COLORPICKER_FILLCOLOR: function(t, e) {
          t.fillColor = e;
        },
        SET_COLORPICKER_BORDERCOLOR: function(t, e) {
          t.borderColor = e;
        },
        SET_COLORPICKER_SHAPEBORDERCOLOR: function(t, e) {
          t.shapeBorderColor = e;
        },
        SET_COLORPICKER_SHAPEFILLCOLOR: function(t, e) {
          t.shapeFillColor = e;
        },
        SET_COLORPICKER_DYNAMICCOLORS: function(t, e) {
          t.activeDynamicLayersColorsGetter = e;
        },
        SET_ACTIVE_COLOR_PICKER_ID: function(t, e) {
          t.activeColorPickerId = e;
        },
      },
      w = {
        SAVE_COLORPICKER: function(t, e) {
          t.commit("SET_COLORPICKER", e);
        },
        SAVE_COLORPICKER_BORDER_TAB: function(t, e) {
          t.commit("SET_COLORPICKER_BORDER_TAB", e);
        },
        SAVE_COLORPICKER_VISIBILITY: function(t, e) {
          t.commit("SET_COLORPICKER_VISIBILITY", e);
        },
        SAVE_COLORPICKER_LAYER: function(t, e) {
          t.commit("SET_COLORPICKER_LAYER", e);
        },
        SAVE_COLORPICKER_FILLCOLOR: function(t, e) {
          t.commit("SET_COLORPICKER_FILLCOLOR", e);
        },
        SAVE_COLORPICKER_BORDERCOLOR: function(t, e) {
          t.commit("SET_COLORPICKER_BORDERCOLOR", e);
        },
        SAVE_COLORPICKER_SHAPEFILLCOLOR: function(t, e) {
          t.commit("SET_COLORPICKER_SHAPEFILLCOLOR", e);
        },
        SAVE_COLORPICKER_SHAPEBORDERCOLOR: function(t, e) {
          t.commit("SET_COLORPICKER_SHAPEBORDERCOLOR", e);
        },
        SAVE_ACTIVE_COLOR_PICKER_ID: function(t, e) {
          t.commit("SET_ACTIVE_COLOR_PICKER_ID", e);
        },
      },
      L = { state: S, mutations: T, actions: w, getters: O },
      k = { faq: { data: [] }, releaseNotes: { data: [] } },
      I = {
        SET_FAQ_DATA: function(t, e) {
          t.faq.data = e;
        },
        SET_RELEASE_NOTES_DATA: function(t, e) {
          t.releaseNotes.data = e;
        },
      },
      A = { state: k, mutations: I },
      x = (n("8e6e"), n("ac6a"), n("456d"), n("bd86"));
    function j(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function D(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? j(Object(n), !0).forEach(function(e) {
              Object(x["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : j(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var M = {
        issueList: { open: [], closed: [] },
        issueCount: { open: null, closed: null },
        activeTab: 1,
        activeCategoryId: 0,
        openIssue: null,
        categories: [],
      },
      R = {
        SET_OPEN_ISSUES: function(t, e) {
          t.issueList = D({}, t.issueList, { open: e });
        },
        SET_CLOSED_ISSUES: function(t, e) {
          t.issueList = D({}, t.issueList, { closed: e });
        },
        SET_ISSUE_COUNT: function(t, e) {
          t.issueCount = e;
        },
        SET_OPEN_ISSUE: function(t, e) {
          t.openIssue = e;
        },
        SET_CATEGORIES: function(t, e) {
          t.categories = e;
        },
        SET_ACTIVE_TAB: function(t, e) {
          t.activeTab = e;
        },
        SET_ACTIVE_CATEGORY_ID: function(t, e) {
          t.activeCategoryId = e;
        },
      },
      P = { state: M, mutations: R },
      B = n("8bb0"),
      F = n("7540"),
      N = n("09bc"),
      $ = n("8ae2"),
      G = {
        dynamicLayerList: [],
        baseLayerList: [],
        bunchLayerList: [],
        favoriteBaseLayerIds: [],
        favoriteDynamicLayerIds: [],
        defaultBaseLayerIds: [],
        defaultDynamicLayerIds: [],
        focusedPolygonVector: null,
        layerColorOrderList: [],
      },
      V = {
        SET_FOCUSED_POLYGON_VECTOR: function(t, e) {
          t.focusedPolygonVector = e;
        },
        SET_DYNAMIC_LAYER_LIST: function(t, e) {
          t.dynamicLayerList = e;
        },
        SET_BASE_LAYER_LIST: function(t, e) {
          t.baseLayerList = e;
        },
        SET_BUNCH_LAYER_LIST: function(t, e) {
          t.bunchLayerList = e;
        },
        SET_FAVORITE_BASE_LAYER_IDS: function(t, e) {
          t.favoriteBaseLayerIds = e;
        },
        SET_FAVORITE_DYNAMIC_LAYER_IDS: function(t, e) {
          t.favoriteDynamicLayerIds = e;
        },
        SET_DEFAULT_DYNAMIC_LAYER_IDS: function(t, e) {
          t.defaultDynamicLayerIds = e;
        },
        SET_DEFAULT_BASE_LAYER_IDS: function(t, e) {
          t.defaultBaseLayerIds = e;
        },
        SET_LAYER_COLOR_ORDER_LIST: function(t, e) {
          t.layerColorOrderList = e;
        },
      },
      U = {
        saveFocusePolygonVector: function(t, e) {
          t.commit("SET_FOCUSED_POLYGON_VECTOR", e);
        },
        saveDynamicLayerList: function(t, e) {
          t.commit("SET_DYNAMIC_LAYER_LIST", e);
        },
        saveBaseLayerList: function(t, e) {
          t.commit("SET_BASE_LAYER_LIST", e);
        },
        saveBunchLayerList: function(t, e) {
          t.commit("SET_BUNCH_LAYER_LIST", e);
        },
        saveFavoriteDyanmicLayerIds: function(t, e) {
          t.commit("SET_FAVORITE_DYNAMIC_LAYER_IDS", e);
        },
        saveFavoriteBaseLayerIds: function(t, e) {
          t.commit("SET_FAVORITE_BASE_LAYER_IDS", e);
        },
        saveDefaultDynamicLayerIds: function(t, e) {
          t.commit("SET_DEFAULT_DYNAMIC_LAYER_IDS", e);
        },
        saveDefaultBaseLayerIds: function(t, e) {
          t.commit("SET_DEFAULT_BASE_LAYER_IDS", e);
        },
        saveLayerColorOrderList: function(t, e) {
          t.commit("SET_LAYER_COLOR_ORDER_LIST", e);
        },
        fetchBunchList: (function() {
          var t = Object(a["a"])(
            regeneratorRuntime.mark(function t(e) {
              var n, a, i;
              return regeneratorRuntime.wrap(function(t) {
                while (1)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (n = e.commit), (t.next = 3), B["a"].getAll();
                    case 3:
                      (a = t.sent),
                        (i = d["a"].mapBunchs(a)),
                        n("SET_BUNCH_LAYER_LIST", i);
                    case 6:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          );
          function e(e) {
            return t.apply(this, arguments);
          }
          return e;
        })(),
        fetchLayerList: (function() {
          var t = Object(a["a"])(
            regeneratorRuntime.mark(function t(e) {
              var n, a, i, r, o, s;
              return regeneratorRuntime.wrap(function(t) {
                while (1)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (n = e.commit), (t.next = 3), F["a"].getLayers();
                    case 3:
                      (a = t.sent),
                        (i = d["d"].mapLayers(a)),
                        (r = i.baseLayers),
                        (o = i.dynamicLayers),
                        n("SET_DYNAMIC_LAYER_LIST", o),
                        n("SET_BASE_LAYER_LIST", r),
                        (s = o.map(function(t) {
                          return 0;
                        })),
                        n("SET_LAYER_COLOR_ORDER_LIST", s);
                    case 11:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          );
          function e(e) {
            return t.apply(this, arguments);
          }
          return e;
        })(),
        fetchFavoriteLayerList: (function() {
          var t = Object(a["a"])(
            regeneratorRuntime.mark(function t(e) {
              var n, a, i, r;
              return regeneratorRuntime.wrap(function(t) {
                while (1)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (n = e.commit), (t.next = 3), N["a"].getAll();
                    case 3:
                      (a = t.sent),
                        (i = []),
                        (r = []),
                        a &&
                          a.length > 0 &&
                          ((i = a
                            .filter(function(t) {
                              return "dynamic" == t.layer.mapTypeId;
                            })
                            .map(function(t) {
                              return t.layer.id;
                            })),
                          (r = a
                            .filter(function(t) {
                              return "basemap" == t.layer.mapTypeId;
                            })
                            .map(function(t) {
                              return t.layer.id;
                            }))),
                        n("SET_FAVORITE_DYNAMIC_LAYER_IDS", i),
                        n("SET_FAVORITE_BASE_LAYER_IDS", r);
                    case 9:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          );
          function e(e) {
            return t.apply(this, arguments);
          }
          return e;
        })(),
        fetchDefaultLayerList: (function() {
          var t = Object(a["a"])(
            regeneratorRuntime.mark(function t(e) {
              var n, a, i, r;
              return regeneratorRuntime.wrap(function(t) {
                while (1)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (n = e.commit), (t.next = 3), $["a"].getAll();
                    case 3:
                      (a = t.sent),
                        (i = []),
                        (r = []),
                        a &&
                          a.length > 0 &&
                          ((i = a
                            .filter(function(t) {
                              return "dynamic" == t.layer.mapTypeId;
                            })
                            .map(function(t) {
                              return t.layer.id;
                            })),
                          (r = a
                            .filter(function(t) {
                              return "basemap" == t.layer.mapTypeId;
                            })
                            .map(function(t) {
                              return t.layer.id;
                            }))),
                        n("SET_DEFAULT_DYNAMIC_LAYER_IDS", i),
                        n("SET_DEFAULT_BASE_LAYER_IDS", r);
                    case 9:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          );
          function e(e) {
            return t.apply(this, arguments);
          }
          return e;
        })(),
      },
      z = {
        dynamicLayerList: function(t) {
          return t.dynamicLayerList;
        },
        baseLayerList: function(t) {
          return t.baseLayerList;
        },
        bunchLayerList: function(t) {
          return t.bunchLayerList;
        },
        favoriteBaseLayerIds: function(t) {
          return t.favoriteBaseLayerIds;
        },
        favoriteDynamicLayerIds: function(t) {
          return t.favoriteDynamicLayerIds;
        },
        defaultDynamicLayerIds: function(t) {
          return t.defaultDynamicLayerIds;
        },
        defaultBaseLayerIds: function(t) {
          return t.defaultBaseLayerIds;
        },
        layerColorOrderList: function(t) {
          return t.layerColorOrderList;
        },
      },
      H = { state: G, mutations: V, actions: U, getters: z },
      q = {
        isSumFilter: !1,
        sumFilterColumn: "",
        isRequiredServiceRefresh: !1,
      },
      Q = {
        SET_IS_SUM_FILTER: function(t, e) {
          t.isSumFilter = e;
        },
        SET_SUM_FILTER_COLUMN: function(t, e) {
          t.sumFilterColumn = e;
        },
        SET_IS_REQUIRED_SERVICE_REFRESH: function(t, e) {
          t.isRequiredServiceRefresh = e;
        },
      },
      Y = {
        saveIsSumFilter: function(t, e) {
          t.commit("SET_IS_SUM_FILTER", e);
        },
        saveSumFilterColumn: function(t, e) {
          t.commit("SET_SUM_FILTER_COLUMN", e);
        },
        saveIsRequiredServiceRefreshStatus: function(t, e) {
          t.commit("SET_IS_REQUIRED_SERVICE_REFRESH", e);
        },
      },
      Z = {
        isSumFilter: function(t) {
          return t.isSumFilter;
        },
        sumFilterColumn: function(t) {
          return t.sumFilterColumn;
        },
        isRequiredServiceRefresh: function(t) {
          return t.isRequiredServiceRefresh;
        },
      },
      W = { state: q, mutations: Q, actions: Y, getters: Z },
      K = {
        mapLayer: null,
        graticuleLayer: null,
        selectionLayer: null,
        selectedFeatureId: 0,
        scaleOptions: null,
        draw: null,
        drawSource: null,
        sketch: null,
        clickedCoordinate: [],
        clickedPixel: [],
      },
      X = {
        SET_MAP: function(t, e) {
          t.mapLayer = e;
        },
        SET_GRATICULE: function(t, e) {
          t.graticuleLayer = e;
        },
        SET_DRAW: function(t, e) {
          t.draw = e;
        },
        SET_DRAW_SOURCE: function(t, e) {
          t.drawSource = e;
        },
        SET_SELECTION_LAYER: function(t, e) {
          t.selectionLayer = e;
        },
        SET_SELECTED_FEATURE_ID: function(t, e) {
          t.selectedFeatureId = e;
        },
        SET_SKETCH: function(t, e) {
          t.sketch = e;
        },
        SET_CLICKED_COORDINATE: function(t, e) {
          t.clickedCoordinate = e;
        },
        SET_CLICKED_PIXEL: function(t, e) {
          t.clickedPixel = e;
        },
        SET_SCALE_OPTIONS: function(t, e) {
          t.scaleOptions = e;
        },
      },
      J = {
        saveMap: function(t, e) {
          t.commit("SET_MAP", e);
        },
        saveGraticule: function(t, e) {
          t.commit("SET_GRATICULE", e);
        },
        saveDraw: function(t, e) {
          t.commit("SET_DRAW", e);
        },
        saveDrawSource: function(t, e) {
          t.commit("SET_DRAW_SOURCE", e);
        },
        saveSelectionLayer: function(t, e) {
          t.commit("SET_SELECTION_LAYER", e);
        },
        saveSelectedFeatureId: function(t, e) {
          t.commit("SET_SELECTED_FEATURE_ID", e);
        },
        saveSketch: function(t, e) {
          t.commit("SET_SKETCH", e);
        },
        saveClickedCoordinate: function(t, e) {
          t.commit("SET_CLICKED_COORDINATE", e);
        },
        saveClickedPixel: function(t, e) {
          t.commit("SET_CLICKED_PIXEL", e);
        },
        saveScaleOptions: function(t, e) {
          t.commit("SET_SCALE_OPTIONS", e);
        },
      },
      tt = {
        mapLayer: function(t) {
          return t.mapLayer;
        },
        graticuleLayer: function(t) {
          return t.graticuleLayer;
        },
        draw: function(t) {
          return t.draw;
        },
        drawSource: function(t) {
          return t.drawSource;
        },
        selectionLayer: function(t) {
          return t.selectionLayer;
        },
        selectedFeatureId: function(t) {
          return t.selectedFeatureId;
        },
        sketch: function(t) {
          return t.sketch;
        },
        clickedCoordinate: function(t) {
          return t.clickedCoordinate;
        },
        clickedPixel: function(t) {
          return t.clickedPixel;
        },
        scaleOptions: function(t) {
          return t.scaleOptions;
        },
      },
      et = { state: K, mutations: X, actions: J, getters: tt },
      nt = n("0962"),
      at = {
        graticuleVisibility: !1,
        isColorPick: !1,
        isMarker: !1,
        isInteraction: !1,
        isRemove: !1,
        isDrawForChangeDetection: !1,
        isDrawForFilter: !1,
        isDrawForTable: !1,
        drawType: nt["b"].NONE,
        featureIdCounter: 0,
        bbox: [],
        measuremaptooltipElement: null,
        measuremaptooltip: null,
        helpmaptooltipElement: null,
        helpmaptooltip: null,
      },
      it = {
        SET_GRATICULE_VISIBILITY: function(t, e) {
          t.graticuleVisibility = e;
        },
        SET_COLOR_PICK_STATUS: function(t, e) {
          t.isColorPick = e;
        },
        SET_MARKER_STATUS: function(t, e) {
          t.isMarker = e;
        },
        SET_INTERACTION_STATUS: function(t, e) {
          t.isInteraction = e;
        },
        SET_DRAW_FOR_CHANGE_DETECTION_STATUS: function(t, e) {
          t.isDrawForChangeDetection = e;
        },
        SET_DRAW_FOR_FILTER_STATUS: function(t, e) {
          t.isDrawForFilter = e;
        },
        SET_REMOVE_STATUS: function(t, e) {
          t.isRemove = e;
        },
        SET_DRAW_TYPE: function(t, e) {
          t.drawType = e;
        },
        SET_FEATURE_ID_COUNTER: function(t, e) {
          t.featureIdCounter = e;
        },
        SET_BBOX: function(t, e) {
          t.bbox = e;
        },
        SET_MEASUREMAP_TOOLTIP_ELEMENT: function(t, e) {
          t.measuremaptooltipElement = e;
        },
        SET_MEASUREMAP_TOOLTIP: function(t, e) {
          t.measuremaptooltip = e;
        },
        SET_HELPMAP_TOOLTIP_ELEMENT: function(t, e) {
          t.helpmaptooltipElement = e;
        },
        SET_HELPMAP_TOOLTIP: function(t, e) {
          t.helpmaptooltip = e;
        },
      },
      rt = {
        saveGraticuleVisibility: function(t, e) {
          t.commit("SET_GRATICULE_VISIBILITY", e);
        },
        saveColorPickStatus: function(t, e) {
          t.commit("SET_COLOR_PICK_STATUS", e);
        },
        saveMarkerStatus: function(t, e) {
          t.commit("SET_MARKER_STATUS", e);
        },
        saveInteractionStatus: function(t, e) {
          t.commit("SET_INTERACTION_STATUS", e);
        },
        saveDrawForChangeDetectionStatus: function(t, e) {
          t.commit("SET_DRAW_FOR_CHANGE_DETECTION_STATUS", e);
        },
        saveDrawForFilterStatus: function(t, e) {
          t.commit("SET_DRAW_FOR_FILTER_STATUS", e);
        },
        saveRemoveStatus: function(t, e) {
          t.commit("SET_REMOVE_STATUS", e);
        },
        saveDrawType: function(t, e) {
          t.commit("SET_DRAW_TYPE", e);
        },
        saveFeatureIdCounter: function(t, e) {
          t.commit("SET_FEATURE_ID_COUNTER", e);
        },
        saveBbox: function(t, e) {
          t.commit("SET_BBOX", e);
        },
        saveMeasuremapTooltipElement: function(t, e) {
          t.commit("SET_MEASUREMAP_TOOLTIP_ELEMENT", e);
        },
        saveMeasuremapTooltip: function(t, e) {
          t.commit("SET_MEASUREMAP_TOOLTIP", e);
        },
        saveHelpmapTooltipElement: function(t, e) {
          t.commit("SET_HELPMAP_TOOLTIP_ELEMENT", e);
        },
        saveHelpmapTooltip: function(t, e) {
          t.commit("SET_HELPMAP_TOOLTIP", e);
        },
      },
      ot = {
        graticuleVisibility: function(t) {
          return t.graticuleVisibility;
        },
        isColorPick: function(t) {
          return t.isColorPick;
        },
        isMarker: function(t) {
          return t.isMarker;
        },
        isInteraction: function(t) {
          return t.isInteraction;
        },
        isRemove: function(t) {
          return t.isRemove;
        },
        isDrawForChangeDetection: function(t) {
          return t.isDrawForChangeDetection;
        },
        isDrawForFilter: function(t) {
          return t.isDrawForFilter;
        },
        drawType: function(t) {
          return t.drawType;
        },
        featureIdCounter: function(t) {
          return t.featureIdCounter;
        },
        bbox: function(t) {
          return t.bbox;
        },
        measuremaptooltipElement: function(t) {
          return t.measuremaptooltipElement;
        },
        measuremaptooltip: function(t) {
          return t.measuremaptooltip;
        },
        helpmaptooltipElement: function(t) {
          return t.helpmaptooltipElement;
        },
        helpmaptooltip: function(t) {
          return t.helpmaptooltip;
        },
      },
      st = { state: at, mutations: it, actions: rt, getters: ot },
      ct = {
        activeMenuTab: "",
        isInformationModalVisible: !1,
        notificationCount: 0,
      },
      lt = {
        SET_ACTIVE_MENU_TAB: function(t, e) {
          t.activeMenuTab = e;
        },
        SET_INFORMATION_MODAL_VISIBILITY: function(t, e) {
          t.isInformationModalVisible = e;
        },
        SET_NOTIFICATION_COUNT: function(t, e) {
          t.notificationCount = e;
        },
      },
      ut = {
        saveInformationModalVisibility: function(t, e) {
          t.commit("SET_INFORMATION_MODAL_VISIBILITY", e);
        },
        saveActiveMenuTab: function(t, e) {
          t.commit("SET_ACTIVE_MENU_TAB", e);
        },
        saveNotificationCount: function(t, e) {
          t.commit("SET_NOTIFICATION_COUNT", e);
        },
      },
      dt = {
        activeMenuTab: function(t) {
          return t.activeMenuTab;
        },
        isInformationModalVisible: function(t) {
          return t.isInformationModalVisible;
        },
        notificationCount: function(t) {
          return t.notificationCount;
        },
      },
      pt = { state: ct, mutations: lt, actions: ut, getters: dt },
      ft = {
        historyIndex: 0,
        isNeedUpdate: !1,
        isNextExist: !1,
        isPreviousExist: !1,
        history: [],
      },
      mt = {
        SET_HISTORY_INDEX: function(t, e) {
          t.historyIndex = e;
        },
        SET_HISTORY_IS_NEED_UPDATE: function(t, e) {
          t.isNeedUpdate = e;
        },
        SET_HISTORY_IS_NEXT_EXIST: function(t, e) {
          t.isNextExist = e;
        },
        SET_HISTORY_IS_PREVIOUS_EXIST: function(t, e) {
          t.isPreviousExist = e;
        },
        SET_HISTORY: function(t, e) {
          t.history = e;
        },
      },
      gt = {
        saveHistoryIndex: function(t, e) {
          t.commit("SET_HISTORY_INDEX", e);
        },
        saveHistoryIsNeedUpdate: function(t, e) {
          t.commit("SET_HISTORY_IS_NEED_UPDATE", e);
        },
        saveHistoryIsNextExist: function(t, e) {
          t.commit("SET_HISTORY_IS_NEXT_EXIST", e);
        },
        saveHistoryIsPreviousExist: function(t, e) {
          t.commit("SET_HISTORY_IS_PREVIOUS_EXIST", e);
        },
        saveHistory: function(t, e) {
          t.commit("SET_HISTORY", e);
        },
      },
      ht = {
        historyIndex: function(t) {
          return t.historyIndex;
        },
        historyIsNeedUpdate: function(t) {
          return t.isNeedUpdate;
        },
        historyIsNextExist: function(t) {
          return t.isNextExist;
        },
        historyIsPreviousExist: function(t) {
          return t.isPreviousExist;
        },
        history: function(t) {
          return t.history;
        },
      },
      vt = { state: ft, mutations: mt, actions: gt, getters: ht },
      bt = { ndviExtent: null },
      yt = {
        SET_NDVI_EXTENT: function(t, e) {
          t.ndviExtent = e;
        },
      },
      Ct = {
        saveNdviExtent: function(t, e) {
          t.commit("SET_NDVI_EXTENT", e);
        },
      },
      _t = {
        ndviExtent: function(t) {
          return t.ndviExtent;
        },
      },
      Et = { state: bt, mutations: yt, actions: Ct, getters: _t },
      St = {
        roles: [],
        directivePermissions: [],
        userInfo: { id: "", email: "", userName: "" },
      },
      Ot = {
        SET_ROLES: function(t, e) {
          t.roles = e;
        },
        SET_USER_INFO: function(t, e) {
          t.userInfo = e;
        },
        SET_DIRECTIVE_PERMISSIONS: function(t, e) {
          t.directivePermissions = e;
        },
      },
      Tt = {
        saveRoles: function(t, e) {
          t.commit("SET_ROLES", e);
        },
        saveUserInfo: function(t, e) {
          t.commit("SET_USER_INFO", e);
        },
        saveDirectivePermissions: function(t, e) {
          t.commit("SET_DIRECTIVE_PERMISSIONS", e);
        },
      },
      wt = {
        roles: function(t) {
          return t.roles;
        },
        directivePermissions: function(t) {
          return t.directivePermissions;
        },
        userInfo: function(t) {
          return t.userInfo;
        },
      },
      Lt = { state: St, mutations: Ot, actions: Tt, getters: wt },
      kt = n("9923"),
      It = {
        getLanguages: function() {
          return c["a"].get(l["h"].GET_LANGUAGE, {
            params: { format: "i18n" },
          });
        },
      },
      At = { language: Object(kt["b"])(), locales: [], messages: [] },
      xt = {
        SET_LANGUAGE: function(t, e) {
          t.language = e;
        },
        SET_LOCALES: function(t, e) {
          t.locales = e;
        },
        SET_MESSAGES: function(t, e) {
          t.messages = e;
        },
      },
      jt = {
        saveLanguage: function(t, e) {
          t.commit("SET_LANGUAGE", e), localStorage.setItem("language", e);
        },
        fetchRemoteMessages: (function() {
          var t = Object(a["a"])(
            regeneratorRuntime.mark(function t(e) {
              var n, a, i, r;
              return regeneratorRuntime.wrap(function(t) {
                while (1)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (t.next = 2), It.getLanguages();
                    case 2:
                      for (
                        n = t.sent,
                          e.commit("SET_MESSAGES", n),
                          a = Object.keys(n),
                          e.commit("SET_LOCALES", a),
                          i = 0;
                        i < a.length;
                        i++
                      )
                        (r = a[i]), kt["a"].mergeLocaleMessage(r, n[r]);
                    case 7:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          );
          function e(e) {
            return t.apply(this, arguments);
          }
          return e;
        })(),
      },
      Dt = {
        language: function(t) {
          return t.language;
        },
        locales: function(t) {
          return t.locales;
        },
        messages: function(t) {
          return t.messages;
        },
      },
      Mt = { state: At, mutations: xt, actions: jt, getters: Dt },
      Rt = {
        auth: v,
        dataTable: E,
        colorPicker: L,
        information: A,
        forum: P,
        layers: H,
        filter: W,
        map: et,
        tool: st,
        menu: pt,
        history: vt,
        ndvi: Et,
        user: Lt,
        language: Mt,
      },
      Pt = n("277f");
    i["default"].use(r["a"]);
    var Bt = (function() {
        var t = Object(a["a"])(
          regeneratorRuntime.mark(function t(e) {
            var n;
            return regeneratorRuntime.wrap(function(t) {
              while (1)
                switch ((t.prev = t.next)) {
                  case 0:
                    (n = e.dispatch),
                      n("fetchLayerList"),
                      n("fetchBunchList"),
                      n("fetchFavoriteLayerList"),
                      n("fetchDefaultLayerList");
                  case 5:
                  case "end":
                    return t.stop();
                }
            }, t);
          })
        );
        return function(e) {
          return t.apply(this, arguments);
        };
      })(),
      Ft = (function() {
        var t = Object(a["a"])(
          regeneratorRuntime.mark(function t(e) {
            var n, a;
            return regeneratorRuntime.wrap(function(t) {
              while (1)
                switch ((t.prev = t.next)) {
                  case 0:
                    return (
                      (n = e.dispatch),
                      (t.next = 3),
                      Pt["a"].getUnradNotificationCount()
                    );
                  case 3:
                    (a = t.sent), n("saveNotificationCount", a);
                  case 5:
                  case "end":
                    return t.stop();
                }
            }, t);
          })
        );
        return function(e) {
          return t.apply(this, arguments);
        };
      })();
    e["a"] = new r["a"].Store({
      state: {},
      getters: {},
      mutations: {
        deleteToken: function(t) {
          t.token = null;
        },
      },
      actions: {
        init: (function() {
          var t = Object(a["a"])(
            regeneratorRuntime.mark(function t(e) {
              var n;
              return regeneratorRuntime.wrap(function(t) {
                while (1)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        (n = e.dispatch), (t.next = 3), Bt({ dispatch: n })
                      );
                    case 3:
                      return (t.next = 5), Ft({ dispatch: n });
                    case 5:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          );
          function e(e) {
            return t.apply(this, arguments);
          }
          return e;
        })(),
        setNotificationCounts: Ft,
        getLayers: Bt,
      },
      modules: Rt,
    });
  },
  "0955": function(t, e, n) {},
  "0962": function(t, e, n) {
    "use strict";
    n.d(e, "g", function() {
      return i;
    }),
      n.d(e, "f", function() {
        return o;
      }),
      n.d(e, "b", function() {
        return c;
      }),
      n.d(e, "c", function() {
        return u;
      }),
      n.d(e, "d", function() {
        return p;
      }),
      n.d(e, "a", function() {
        return m;
      }),
      n.d(e, "e", function() {
        return h;
      });
    var a = {
        LOCAL_MVT: 1,
        XYZ: 2,
        TILE_ARCGIS_REST: 3,
        IMAGE_ARCGIS_REST: 4,
        WMS: 5,
      },
      i = a,
      r = {
        CATEGORY: "category",
        LAYER: "layer",
        SUBLAYER: "subLayer",
        BUNCH: "bunch",
        DYNAMIC_LAYER: "dynamic",
        BASE_LAYER: "base",
      },
      o = r,
      s = {
        NONE: "None",
        SQUARE: "Square",
        BOX: "Box",
        CIRCLE: "Circle",
        LINESTRING: "LineString",
        POLYGON: "Polygon",
        POINT: "Point",
        MARKER: "Marker",
        TEXT: "Text",
      },
      c = s,
      l = {
        PROFILE: "profile",
        TOOL: "tool",
        DYNAMIC_LAYER: "dynamicLayer",
        BUNC_LAYER: "bunchLayer",
        BASE_LAYER: "baseLayer",
        BASE_MAP_TYPE: "baseMapType",
      },
      u = l,
      d = { ZOOM: 1, SCALE: 2 },
      p = d,
      f = { METRIC: "Metric", GEOGRAPHIC: "Geographic" },
      m = f,
      g = {
        LOCAL: "Local",
        GEOWEBCACHE: "Geowebcache",
        GEOSERVER: "Geoserver",
        GEOSERVER_GWC: "GeoserverGwc",
        ARCGIS: "ARCGIS",
      },
      h = g;
  },
  "09bc": function(t, e, n) {
    "use strict";
    var a = n("b775"),
      i = n("78a3");
    e["a"] = {
      getAll: function() {
        return a["a"].get(i["f"].GET_ALL);
      },
      set: function(t) {
        return a["a"].post(i["f"].SET, t);
      },
    };
  },
  "09df": function(t, e, n) {
    "use strict";
    var a = n("53e5"),
      i = n.n(a);
    i.a;
  },
  "0d96": function(t, e) {},
  "10e6": function(t, e, n) {
    t.exports = n.p + "img/place.17b1465c.svg";
  },
  1460: function(t, e, n) {
    t.exports = n.p + "img/send.b163c8ae.svg";
  },
  "14f3": function(t, e, n) {},
  1616: function(t, e, n) {
    t.exports = n.p + "img/color_picker.f11e40bf.svg";
  },
  "16ab": function(t, e, n) {
    t.exports = n.p + "img/rectangle.dfb475bd.svg";
  },
  "16d2": function(t, e, n) {},
  "16f4": function(t, e, n) {
    "use strict";
    var a = n("470d"),
      i = n.n(a);
    i.a;
  },
  1959: function(t, e, n) {
    t.exports = n.p + "img/mouse.0a006fb9.svg";
  },
  "1a99": function(t, e, n) {},
  "1c73": function(t, e, n) {},
  "214a": function(t, e, n) {
    "use strict";
    var a = n("1a99"),
      i = n.n(a);
    i.a;
  },
  2303: function(t, e, n) {},
  "24cc": function(t, e, n) {
    "use strict";
    var a = n("6386"),
      i = n.n(a);
    i.a;
  },
  "277f": function(t, e, n) {
    "use strict";
    var a = n("b775"),
      i = n("78a3");
    e["a"] = {
      getAll: function(t) {
        return a["a"].get(i["l"].GET_ALL, { params: t });
      },
      setReaded: function(t) {
        return a["a"].put(i["l"].SET_READED(t));
      },
      getUnradNotificationCount: function() {
        return a["a"].get(i["l"].GET_UNREAD_NOTIFICATION_COUNT);
      },
    };
  },
  "293c4": function(t, e, n) {
    t.exports = n.p + "img/ac_logo.d0e36a51.svg";
  },
  3077: function(t, e, n) {
    t.exports = n.p + "img/compass.7751660a.png";
  },
  3666: function(t, e, n) {
    t.exports = n.p + "img/ndvi.358e75b9.svg";
  },
  "36d6": function(t, e, n) {
    "use strict";
    n.d(e, "a", function() {
      return a;
    });
    var a = [
      "#673ab7",
      "#f44336",
      "#ffeb3b",
      "#4caf50",
      "#9c27b0",
      "#2196F3",
      "#E91E63",
      "#795548",
      "#009688",
    ];
  },
  3786: function(t, e, n) {
    "use strict";
    var a = n("b775"),
      i = n("78a3");
    e["a"] = {
      login: function(t) {
        var e = a["a"].post(i["a"].LOGIN_URL, t);
        return e;
      },
    };
  },
  "3b25": function(t) {
    t.exports = JSON.parse(
      '[{"city":"Baku","admin":"Bakı","country":"Azerbaijan","population_proper":"1892000","iso2":"AZ","capital":"primary","lat":"40.395278","lng":"49.882222","population":"2122300"},{"city":"Gəncə","admin":"Gəncə","country":"Azerbaijan","population_proper":"300131","iso2":"AZ","capital":"admin","lat":"40.682778","lng":"46.360556","population":"303268"},{"city":"Sumqayıt","admin":"Sumqayıt","country":"Azerbaijan","population_proper":"265150","iso2":"AZ","capital":"admin","lat":"40.589722","lng":"49.668611","population":"279159"},{"city":"Hacıvar","admin":"Babək","country":"Azerbaijan","population_proper":"64754","iso2":"AZ","capital":"","lat":"39.208067","lng":"45.446038","population":"94788"},{"city":"Şəki","admin":"Şəki","country":"Azerbaijan","population_proper":"62191","iso2":"AZ","capital":"admin","lat":"41.191944","lng":"47.170556","population":"64968"},{"city":"Lənkəran","admin":"Lənkəran","country":"Azerbaijan","population_proper":"60180","iso2":"AZ","capital":"admin","lat":"38.755947","lng":"48.84715","population":"60180"},{"city":"Yevlax","admin":"Yevlax","country":"Azerbaijan","population_proper":"46312","iso2":"AZ","capital":"admin","lat":"40.612732","lng":"47.142329","population":"53716"},{"city":"Göyçay","admin":"Göyçay","country":"Azerbaijan","population_proper":"34715","iso2":"AZ","capital":"admin","lat":"40.650555","lng":"47.74219","population":"35348"},{"city":"Tovuz","admin":"Tovuz","country":"Azerbaijan","population_proper":"12626","iso2":"AZ","capital":"admin","lat":"40.992487","lng":"45.628384","population":"12626"},{"city":"Qəbələ","admin":"Qəbələ","country":"Azerbaijan","population_proper":"11867","iso2":"AZ","capital":"admin","lat":"40.982474","lng":"47.849092","population":"11867"},{"city":"Gədəbəy","admin":"Gədəbəy","country":"Azerbaijan","population_proper":"8657","iso2":"AZ","capital":"admin","lat":"40.570551","lng":"45.812288","population":"8657"},{"city":"Goranboy","admin":"Goranboy","country":"Azerbaijan","population_proper":"7333","iso2":"AZ","capital":"admin","lat":"40.610278","lng":"46.789722","population":"7333"},{"city":"Oğuz","admin":"Oğuz","country":"Azerbaijan","population_proper":"6876","iso2":"AZ","capital":"admin","lat":"41.07128","lng":"47.465284","population":"6876"},{"city":"Zaqatala","admin":"Zaqatala","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"41.631596","lng":"46.644791","population":""},{"city":"Mingəçevir","admin":"Mingəçevir","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"40.763947","lng":"47.059533","population":""},{"city":"Xızı","admin":"Xızı","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"40.905761","lng":"49.081268","population":""},{"city":"Xırdalan","admin":"Abşeron","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"40.448085","lng":"49.755022","population":""},{"city":"Heydərabad","admin":"Sədərək","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"39.722857","lng":"44.848458","population":""},{"city":"Zəngilan","admin":"Zəngilan","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"39.088401","lng":"46.6513","population":""},{"city":"Ağstafa","admin":"Ağstafa","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"41.114834","lng":"45.446825","population":""},{"city":"Ucar","admin":"Ucar","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"40.515671","lng":"47.654648","population":""},{"city":"Göygöl","admin":"Göygöl","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"40.585838","lng":"46.318897","population":""},{"city":"Xocavənd","admin":"Xocavənd","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"39.795464","lng":"47.109891","population":""},{"city":"Xaçmaz","admin":"Xaçmaz","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"41.464258","lng":"48.805652","population":""},{"city":"Kəlbəcər","admin":"Kəlbəcər","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"40.109842","lng":"46.04446","population":""},{"city":"Yardımlı","admin":"Yardımlı","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"38.907711","lng":"48.240521","population":""},{"city":"Daşkəsən","admin":"Daşkəsən","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"40.523932","lng":"46.081863","population":""},{"city":"Kürdəmir","admin":"Kürdəmir","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"40.345318","lng":"48.150847","population":""},{"city":"Hacıqabul","admin":"Hacıqabul","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"40.038743","lng":"48.942865","population":""},{"city":"Qax","admin":"Qax","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"41.418259","lng":"46.92043","population":""},{"city":"Qazax","admin":"Qazax","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"41.09246","lng":"45.365608","population":""},{"city":"Tərtər","admin":"Tərtər","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"40.341794","lng":"46.932418","population":""},{"city":"Biləsuvar","admin":"Biləsuvar","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"39.458333","lng":"48.545","population":""},{"city":"Şəmkir","admin":"Şəmkir","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"40.82975","lng":"46.017804","population":""},{"city":"Qubadlı","admin":"Qubadlı","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"39.344407","lng":"46.581834","population":""},{"city":"Quba","admin":"Quba","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"41.361077","lng":"48.513411","population":""},{"city":"Qusar","admin":"Qusar","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"41.427496","lng":"48.4302","population":""},{"city":"Babək","admin":"Babək","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"minor","lat":"39.154592","lng":"45.442825","population":""},{"city":"Füzuli","admin":"Füzuli","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"39.60094","lng":"47.14529","population":""},{"city":"Cəbrayıl","admin":"Cəbrayıl","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"39.399173","lng":"47.028345","population":""},{"city":"Salyan","admin":"Salyan","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"39.596214","lng":"48.984786","population":""},{"city":"Xocalı","admin":"Xocalı","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"39.912973","lng":"46.790284","population":""},{"city":"Astara","admin":"Astara","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"38.455977","lng":"48.87498","population":""},{"city":"Culfa","admin":"Culfa","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"minor","lat":"38.95397","lng":"45.62961","population":""},{"city":"Ağdaş","admin":"Ağdaş","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"40.646987","lng":"47.473803","population":""},{"city":"Lerik","admin":"Lerik","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"38.773883","lng":"48.414969","population":""},{"city":"Masallı","admin":"Masallı","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"39.027781","lng":"48.670276","population":""},{"city":"Ağdam","admin":"Tovuz","country":"Azerbaijan","population_proper":"0","iso2":"AZ","capital":"","lat":"40.908483","lng":"45.554269","population":"0"},{"city":"Beyləqan","admin":"Beyləqan","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"39.775556","lng":"47.618611","population":""},{"city":"Ağsu","admin":"Ağsu","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"40.569167","lng":"48.396476","population":""},{"city":"Qobustan","admin":"Qobustan","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"40.533601","lng":"48.928193","population":""},{"city":"Bərdə","admin":"Bərdə","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"40.375768","lng":"47.126191","population":""},{"city":"Ordubad","admin":"Ordubad","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"38.90961","lng":"46.022737","population":""},{"city":"Balakən","admin":"Balakən","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"41.726258","lng":"46.40478","population":""},{"city":"İsmayıllı","admin":"İsmayıllı","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"40.784846","lng":"48.151409","population":""},{"city":"Şuşa","admin":"Şuşa","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"39.760057","lng":"46.749893","population":""},{"city":"Samux","admin":"Samux","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"40.764854","lng":"46.408678","population":""},{"city":"Ağcabədi","admin":"Ağcabədi","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"40.050146","lng":"47.459367","population":""},{"city":"Ağdam","admin":"Ağdam","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"39.99096","lng":"46.927356","population":""},{"city":"Dəvəçi","admin":"Şabran","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"41.201166","lng":"48.987117","population":""},{"city":"İmişli","admin":"İmişli","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"39.872398","lng":"48.064928","population":""},{"city":"Saatlı","admin":"Saatlı","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"39.932137","lng":"48.368919","population":""},{"city":"Naxçıvan","admin":"Naxçıvan","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"39.208846","lng":"45.411887","population":""},{"city":"Siyəzən","admin":"Siyəzən","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"41.077538","lng":"49.112573","population":""},{"city":"Şahbuz","admin":"Şahbuz","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"39.407222","lng":"45.573889","population":""},{"city":"Cəlilabad","admin":"Cəlilabad","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"39.209633","lng":"48.491862","population":""},{"city":"Sabirabad","admin":"Sabirabad","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"40.008688","lng":"48.47701","population":""},{"city":"Neftçala","admin":"Neftçala","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"39.376798","lng":"49.246998","population":""},{"city":"Laçın","admin":"Laçın","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"39.643401","lng":"46.546206","population":""},{"city":"Naftalan","admin":"Naftalan","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"40.508208","lng":"46.820302","population":""},{"city":"Zərdab","admin":"Zərdab","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"40.219906","lng":"47.709968","population":""},{"city":"Şərur","admin":"Şərur","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"39.554358","lng":"44.982597","population":""},{"city":"Qıvraq","admin":"Kəngərli","country":"Azerbaijan","population_proper":"","iso2":"AZ","capital":"admin","lat":"39.399389","lng":"45.11513","population":""}]'
    );
  },
  "3dd2": function(t, e, n) {
    t.exports = n.p + "img/fullscreen.c7944bd6.svg";
  },
  "3e33": function(t, e, n) {
    "use strict";
    var a = n("0955"),
      i = n.n(a);
    i.a;
  },
  4045: function(t, e, n) {
    t.exports = n.p + "img/loading.759ce13d.svg";
  },
  "416c": function(t, e, n) {},
  4274: function(t, e, n) {
    t.exports = n.p + "img/blindSpot.be4e65df.svg";
  },
  4386: function(t, e, n) {
    t.exports = n.p + "img/information.03558777.svg";
  },
  "43c8": function(t, e, n) {
    "use strict";
    var a = n("14f3"),
      i = n.n(a);
    i.a;
  },
  4678: function(t, e, n) {
    var a = {
      "./af": "2bfb",
      "./af.js": "2bfb",
      "./ar": "8e73",
      "./ar-dz": "a356",
      "./ar-dz.js": "a356",
      "./ar-kw": "423e",
      "./ar-kw.js": "423e",
      "./ar-ly": "1cfd",
      "./ar-ly.js": "1cfd",
      "./ar-ma": "0a84",
      "./ar-ma.js": "0a84",
      "./ar-sa": "8230",
      "./ar-sa.js": "8230",
      "./ar-tn": "6d833",
      "./ar-tn.js": "6d833",
      "./ar.js": "8e73",
      "./az": "485c",
      "./az.js": "485c",
      "./be": "1fc1",
      "./be.js": "1fc1",
      "./bg": "84aa",
      "./bg.js": "84aa",
      "./bm": "a7fa",
      "./bm.js": "a7fa",
      "./bn": "9043",
      "./bn-bd": "9686",
      "./bn-bd.js": "9686",
      "./bn.js": "9043",
      "./bo": "d26a",
      "./bo.js": "d26a",
      "./br": "6887",
      "./br.js": "6887",
      "./bs": "2554",
      "./bs.js": "2554",
      "./ca": "d716",
      "./ca.js": "d716",
      "./cs": "3c0d",
      "./cs.js": "3c0d",
      "./cv": "03ec",
      "./cv.js": "03ec",
      "./cy": "9797",
      "./cy.js": "9797",
      "./da": "0f14",
      "./da.js": "0f14",
      "./de": "b469",
      "./de-at": "b3eb",
      "./de-at.js": "b3eb",
      "./de-ch": "bb71",
      "./de-ch.js": "bb71",
      "./de.js": "b469",
      "./dv": "598a",
      "./dv.js": "598a",
      "./el": "8d47",
      "./el.js": "8d47",
      "./en-au": "0e6b",
      "./en-au.js": "0e6b",
      "./en-ca": "3886",
      "./en-ca.js": "3886",
      "./en-gb": "39a6",
      "./en-gb.js": "39a6",
      "./en-ie": "e1d3",
      "./en-ie.js": "e1d3",
      "./en-il": "7333",
      "./en-il.js": "7333",
      "./en-in": "ec2e",
      "./en-in.js": "ec2e",
      "./en-nz": "6f50",
      "./en-nz.js": "6f50",
      "./en-sg": "b7e9",
      "./en-sg.js": "b7e9",
      "./eo": "65db",
      "./eo.js": "65db",
      "./es": "898b",
      "./es-do": "0a3c",
      "./es-do.js": "0a3c",
      "./es-mx": "b5b7",
      "./es-mx.js": "b5b7",
      "./es-us": "55c9",
      "./es-us.js": "55c9",
      "./es.js": "898b",
      "./et": "ec18",
      "./et.js": "ec18",
      "./eu": "0ff2",
      "./eu.js": "0ff2",
      "./fa": "8df4",
      "./fa.js": "8df4",
      "./fi": "81e9",
      "./fi.js": "81e9",
      "./fil": "d69a",
      "./fil.js": "d69a",
      "./fo": "0721",
      "./fo.js": "0721",
      "./fr": "9f26",
      "./fr-ca": "d9f8",
      "./fr-ca.js": "d9f8",
      "./fr-ch": "0e49",
      "./fr-ch.js": "0e49",
      "./fr.js": "9f26",
      "./fy": "7118",
      "./fy.js": "7118",
      "./ga": "5120",
      "./ga.js": "5120",
      "./gd": "f6b4",
      "./gd.js": "f6b4",
      "./gl": "8840",
      "./gl.js": "8840",
      "./gom-deva": "aaf2",
      "./gom-deva.js": "aaf2",
      "./gom-latn": "0caa",
      "./gom-latn.js": "0caa",
      "./gu": "e0c5",
      "./gu.js": "e0c5",
      "./he": "c7aa",
      "./he.js": "c7aa",
      "./hi": "dc4d",
      "./hi.js": "dc4d",
      "./hr": "4ba9",
      "./hr.js": "4ba9",
      "./hu": "5b14",
      "./hu.js": "5b14",
      "./hy-am": "d6b6",
      "./hy-am.js": "d6b6",
      "./id": "5038",
      "./id.js": "5038",
      "./is": "0558",
      "./is.js": "0558",
      "./it": "6e98",
      "./it-ch": "6f12",
      "./it-ch.js": "6f12",
      "./it.js": "6e98",
      "./ja": "079e",
      "./ja.js": "079e",
      "./jv": "b540",
      "./jv.js": "b540",
      "./ka": "201b",
      "./ka.js": "201b",
      "./kk": "6d79",
      "./kk.js": "6d79",
      "./km": "e81d",
      "./km.js": "e81d",
      "./kn": "3e92",
      "./kn.js": "3e92",
      "./ko": "22f8",
      "./ko.js": "22f8",
      "./ku": "2421",
      "./ku.js": "2421",
      "./ky": "9609",
      "./ky.js": "9609",
      "./lb": "440c",
      "./lb.js": "440c",
      "./lo": "b29d",
      "./lo.js": "b29d",
      "./lt": "26f9",
      "./lt.js": "26f9",
      "./lv": "b97c",
      "./lv.js": "b97c",
      "./me": "293c",
      "./me.js": "293c",
      "./mi": "688b",
      "./mi.js": "688b",
      "./mk": "6909",
      "./mk.js": "6909",
      "./ml": "02fb",
      "./ml.js": "02fb",
      "./mn": "958b",
      "./mn.js": "958b",
      "./mr": "39bd",
      "./mr.js": "39bd",
      "./ms": "ebe4",
      "./ms-my": "6403",
      "./ms-my.js": "6403",
      "./ms.js": "ebe4",
      "./mt": "1b45",
      "./mt.js": "1b45",
      "./my": "8689",
      "./my.js": "8689",
      "./nb": "6ce3",
      "./nb.js": "6ce3",
      "./ne": "3a391",
      "./ne.js": "3a391",
      "./nl": "facd",
      "./nl-be": "db29",
      "./nl-be.js": "db29",
      "./nl.js": "facd",
      "./nn": "b84c",
      "./nn.js": "b84c",
      "./oc-lnc": "167b",
      "./oc-lnc.js": "167b",
      "./pa-in": "f3ff",
      "./pa-in.js": "f3ff",
      "./pl": "8d57",
      "./pl.js": "8d57",
      "./pt": "f260",
      "./pt-br": "d2d4",
      "./pt-br.js": "d2d4",
      "./pt.js": "f260",
      "./ro": "972c",
      "./ro.js": "972c",
      "./ru": "957c",
      "./ru.js": "957c",
      "./sd": "6784",
      "./sd.js": "6784",
      "./se": "ffff",
      "./se.js": "ffff",
      "./si": "eda5",
      "./si.js": "eda5",
      "./sk": "7be6",
      "./sk.js": "7be6",
      "./sl": "8155",
      "./sl.js": "8155",
      "./sq": "c8f3",
      "./sq.js": "c8f3",
      "./sr": "cf1e",
      "./sr-cyrl": "13e9",
      "./sr-cyrl.js": "13e9",
      "./sr.js": "cf1e",
      "./ss": "52bd",
      "./ss.js": "52bd",
      "./sv": "5fbd",
      "./sv.js": "5fbd",
      "./sw": "74dc",
      "./sw.js": "74dc",
      "./ta": "3de5",
      "./ta.js": "3de5",
      "./te": "5cbb",
      "./te.js": "5cbb",
      "./tet": "576c",
      "./tet.js": "576c",
      "./tg": "3b1b",
      "./tg.js": "3b1b",
      "./th": "10e8",
      "./th.js": "10e8",
      "./tk": "5aff",
      "./tk.js": "5aff",
      "./tl-ph": "0f38",
      "./tl-ph.js": "0f38",
      "./tlh": "cf75",
      "./tlh.js": "cf75",
      "./tr": "0e81",
      "./tr.js": "0e81",
      "./tzl": "cf51",
      "./tzl.js": "cf51",
      "./tzm": "c109",
      "./tzm-latn": "b53d",
      "./tzm-latn.js": "b53d",
      "./tzm.js": "c109",
      "./ug-cn": "6117",
      "./ug-cn.js": "6117",
      "./uk": "ada2",
      "./uk.js": "ada2",
      "./ur": "5294",
      "./ur.js": "5294",
      "./uz": "2e8c",
      "./uz-latn": "010e",
      "./uz-latn.js": "010e",
      "./uz.js": "2e8c",
      "./vi": "2921",
      "./vi.js": "2921",
      "./x-pseudo": "fd7e",
      "./x-pseudo.js": "fd7e",
      "./yo": "7f33",
      "./yo.js": "7f33",
      "./zh-cn": "5c3a",
      "./zh-cn.js": "5c3a",
      "./zh-hk": "49ab",
      "./zh-hk.js": "49ab",
      "./zh-mo": "3a6c",
      "./zh-mo.js": "3a6c",
      "./zh-tw": "90ea",
      "./zh-tw.js": "90ea",
    };
    function i(t) {
      var e = r(t);
      return n(e);
    }
    function r(t) {
      if (!n.o(a, t)) {
        var e = new Error("Cannot find module '" + t + "'");
        throw ((e.code = "MODULE_NOT_FOUND"), e);
      }
      return a[t];
    }
    (i.keys = function() {
      return Object.keys(a);
    }),
      (i.resolve = r),
      (t.exports = i),
      (i.id = "4678");
  },
  "470d": function(t, e, n) {},
  "473a": function(t, e, n) {
    t.exports = n.p + "img/reset.6c5cc106.svg";
  },
  4882: function(t, e, n) {
    "use strict";
    n.r(e);
    var a = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "CustomModal",
          {
            attrs: {
              name: "favoriteQueryModal",
              title: t.$t("form.favoriteQueryForm.modalTitle"),
              width: "30%",
              minHeight: 300,
            },
            on: { beforeShow: t.onModalOpen },
          },
          [
            n("form", [
              n("div", { staticClass: "row mt-3" }, [
                n("div", { staticClass: "col-md-12" }, [
                  n("div", { staticClass: "form-group" }, [
                    n("label", { attrs: { for: "label" } }, [
                      t._v(t._s(t.$t("form.favoriteQueryForm.label"))),
                    ]),
                    n("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: t.data.label,
                          expression: "data.label",
                        },
                      ],
                      staticClass: "form-control ",
                      class: {
                        "is-invalid": t.submitted && !t.$v.data.label.required,
                      },
                      attrs: { type: "text", id: "label", required: "" },
                      domProps: { value: t.data.label },
                      on: {
                        input: function(e) {
                          e.target.composing ||
                            t.$set(t.data, "label", e.target.value);
                        },
                      },
                    }),
                    t.submitted && !t.$v.data.label.required
                      ? n("div", { staticClass: "invalid-feedback" }, [
                          t._v(
                            "\n            " +
                              t._s(
                                t.$t(
                                  "form.favoriteQueryForm.validationMessages.labelRequired"
                                )
                              ) +
                              "\n          "
                          ),
                        ])
                      : t._e(),
                  ]),
                ]),
                n("div", { staticClass: "col-md-12" }, [
                  n("div", { staticClass: "form-group" }, [
                    n("label", { attrs: { for: "query" } }, [
                      t._v(t._s(t.$t("form.favoriteQueryForm.query"))),
                    ]),
                    n("textarea", {
                      staticClass: "form-control",
                      attrs: { rows: "4", cols: "69", disabled: "" },
                      domProps: { value: t.data.query },
                    }),
                  ]),
                ]),
                n("div", { staticClass: "col-md-12" }, [
                  n(
                    "button",
                    {
                      staticClass: "btn btn-primary float-right",
                      attrs: { type: "button" },
                      on: { click: t.addFavoriteQuery },
                    },
                    [
                      t._v(
                        "\n          " + t._s(t.$t("button.add")) + "\n        "
                      ),
                    ]
                  ),
                ]),
              ]),
            ]),
          ]
        );
      },
      i = [],
      r = (n("c5f6"), n("b5ae")),
      o = n("03d5"),
      s = n("7055"),
      c = n("dde5"),
      l = {
        name: "FavoriteQueryModal",
        props: {
          layerId: { type: Number, required: !0 },
          query: { type: String, required: !0 },
        },
        watch: {
          query: {
            immediate: !0,
            handler: function(t, e) {
              this.data.query = t;
            },
          },
          layerId: {
            immediate: !0,
            handler: function(t, e) {
              this.data.layerId = t;
            },
          },
        },
        data: function() {
          return {
            submitted: !1,
            data: { layerId: void 0, label: "", query: "" },
          };
        },
        validations: { data: { label: { required: r["required"] } } },
        mounted: function() {
          (this.data.query = this.query), (this.data.layerId = this.layerId);
        },
        methods: {
          onModalOpen: function() {
            (this.submitted = !1), (this.data.label = "");
          },
          addFavoriteQuery: function() {
            (this.submitted = !0),
              this.$v.$touch(),
              this.$v.$invalid ||
                o["a"].add(this.data).then(function(t) {
                  c["c"].success("Successfully Added"),
                    s["g"].hideFavoriteQueryModal();
                });
          },
        },
      },
      u = l,
      d = n("2877"),
      p = Object(d["a"])(u, a, i, !1, null, null, null);
    e["default"] = p.exports;
  },
  "4c8e": function(t, e, n) {},
  "4ec0": function(t, e, n) {
    t.exports = n.p + "img/point.52b8e62a.svg";
  },
  5113: function(t, e, n) {
    t.exports = n.p + "img/grid.283f34a6.svg";
  },
  "53dc": function(t, e, n) {
    t.exports = n.p + "img/marker.906e0f79.png";
  },
  "53e5": function(t, e, n) {},
  5477: function(t, e, n) {
    "use strict";
    var a = n("72e4"),
      i = n.n(a);
    i.a;
  },
  "56d7": function(t, e, n) {
    "use strict";
    n.r(e);
    n("cadf"), n("551c"), n("f751"), n("097d");
    var a,
      i = n("2b0e"),
      r = n("00e7"),
      o = n.n(r),
      s = n("f2d9"),
      c = n("1881"),
      l = n.n(c),
      u = n("953d"),
      d = n.n(u),
      p = n("9d79"),
      f = n("f2ef"),
      m = (n("e7b5"), n("8c4f")),
      g = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n("div", { staticClass: "row container-fluid padding-0" }, [
          n("div", { staticClass: "padding-0 map-layout" }, [
            n("div", { attrs: { id: "map" } }, [
              t.isMapReady ? n("div", [n("MapControls")], 1) : t._e(),
            ]),
          ]),
          t.isMapReady
            ? n(
                "div",
                [
                  n("Sidebar"),
                  n("ProfileModal"),
                  n("DataTable", { ref: "dataTable" }),
                  n(
                    "CustomModal",
                    { attrs: { name: "sumResultModal", maxWidth: 600 } },
                    [n("Report", { attrs: { result: t.sumData } })],
                    1
                  ),
                  n(
                    "CustomModal",
                    {
                      attrs: {
                        name: "colorPickerModal",
                        title: "Color picker",
                        minWidth: 300,
                      },
                    },
                    [
                      n("ShapeColorPicker", {
                        on: { setShapeColor: t.setShapeColor },
                      }),
                    ],
                    1
                  ),
                  n("ChangeDetectionModal"),
                  n("NdviAssessment"),
                  n("BlindSpotModal"),
                  n("InfoModal", {
                    attrs: { isOpen: t.isInformationModalVisible },
                    on: {
                      close: function(e) {
                        t.isInformationModalVisible = !1;
                      },
                    },
                  }),
                  n("ServiceSelectionModal"),
                  n("BunchLayerAddModal"),
                  n("ComparerModal"),
                  n("PrintModal"),
                  n("MapText"),
                ],
                1
              )
            : t._e(),
        ]);
      },
      h = [],
      v = n("75fc"),
      b = n("b85b"),
      y = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "div",
          { staticClass: "colorPickers  colorPickers--dark" },
          [
            n("ul", { staticClass: "nav" }, [
              n("li", { staticClass: "nav-item" }, [
                n(
                  "a",
                  {
                    staticClass: "nav-link",
                    class: { active: t.isBorder },
                    attrs: { href: "#" },
                    on: {
                      click: function(e) {
                        return t.borderClick(!0);
                      },
                    },
                  },
                  [t._v(t._s(t.$t("colorPicker.borderColor")))]
                ),
              ]),
              n("li", { staticClass: "nav-item" }, [
                n(
                  "a",
                  {
                    staticClass: "nav-link",
                    class: { active: !t.isBorder },
                    attrs: { href: "#" },
                    on: {
                      click: function(e) {
                        return t.borderClick(!1);
                      },
                    },
                  },
                  [t._v(t._s(t.$t("colorPicker.fillColor")))]
                ),
              ]),
            ]),
            t.isBorder
              ? n("ColorScheme", {
                  staticStyle: { display: "inline-block" },
                  attrs: { value: { hex: t.borderColor } },
                  on: {
                    input: function(e) {
                      t.border = e;
                    },
                  },
                })
              : n("ColorScheme", {
                  staticStyle: { display: "inline-block" },
                  attrs: { value: { hex: t.fillColor } },
                  model: {
                    value: t.fill,
                    callback: function(e) {
                      t.fill = e;
                    },
                    expression: "fill",
                  },
                }),
            n("div", { staticClass: "colorPickerButton" }, [
              n(
                "button",
                {
                  staticClass: "btn btn-sm btn--cancel",
                  attrs: { type: "button" },
                  on: { click: t.onClose },
                },
                [t._v("\n      " + t._s(t.$t("button.close")) + "\n    ")]
              ),
              n(
                "button",
                {
                  staticClass: "btn btn-sm btn--save",
                  attrs: { type: "button" },
                  on: { click: t.onSave },
                },
                [t._v("\n      " + t._s(t.$t("button.save")) + "\n    ")]
              ),
            ]),
          ],
          1
        );
      },
      C = [],
      _ = (n("6c7b"), n("c345")),
      E = {
        name: "color",
        props: {
          borderColor: { type: String, default: "#2196F3FF" },
          fillColor: { type: String, default: "#000000FF" },
        },
        components: { ColorScheme: _["Chrome"] },
        data: function() {
          return { isBorder: !0, fill: {}, border: {} };
        },
        methods: {
          borderClick: function(t) {
            this.isBorder = t;
          },
          onSave: function() {
            var t = "";
            t = this.border.hex8;
            var e = t;
            e || (e = this.borderColor), (t = this.fill.hex8);
            var n = t;
            n || (n = this.fillColor);
            var a = { borderColor: e, fillColor: n };
            this.$emit("onSave", a);
          },
          onClose: function() {
            this.$emit("onClose");
          },
        },
      },
      S = E,
      O = n("2877"),
      T = Object(O["a"])(S, y, C, !1, null, null, null),
      w = T.exports,
      L = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n("div", { staticClass: "colorPickers colorPickers--light" }, [
          n("ul", { staticClass: "nav" }, [
            n("li", { staticClass: "nav-item" }, [
              n(
                "a",
                {
                  staticClass: "nav-link",
                  class: { active: !t.isBorder },
                  attrs: { href: "#" },
                  on: {
                    click: function(e) {
                      return t.borderClick(!1);
                    },
                  },
                },
                [t._v("Fill Color")]
              ),
            ]),
            n("li", { staticClass: "nav-item" }, [
              n(
                "a",
                {
                  staticClass: "nav-link",
                  class: { active: t.isBorder },
                  attrs: { href: "#" },
                  on: {
                    click: function(e) {
                      return t.borderClick(!0);
                    },
                  },
                },
                [t._v("Border Color")]
              ),
            ]),
          ]),
          n(
            "div",
            { staticClass: "colorPicker" },
            [
              t.isBorder
                ? n("ColorScheme", {
                    model: {
                      value: t.borderColor,
                      callback: function(e) {
                        t.borderColor = e;
                      },
                      expression: "borderColor",
                    },
                  })
                : n("ColorScheme", {
                    model: {
                      value: t.fillColor,
                      callback: function(e) {
                        t.fillColor = e;
                      },
                      expression: "fillColor",
                    },
                  }),
            ],
            1
          ),
          n("div", { staticClass: "colorPickerButton" }, [
            n(
              "button",
              {
                staticClass: "btn btn-sm btn-primary",
                attrs: { type: "button" },
                on: { click: t.save },
              },
              [t._v("\n            Save\n        ")]
            ),
          ]),
        ]);
      },
      k = [],
      I = {
        name: "color",
        props: {},
        components: { ColorScheme: _["Chrome"] },
        mounted: function() {},
        data: function() {
          return {
            isBorder: !1,
            borderColor: {
              hex8: "#000000",
              rgba: { r: 255, g: 255, b: 255, a: 1 },
            },
            fillColor: {
              hex8: "#00000000",
              rgba: { r: 255, g: 255, b: 255, a: 1 },
            },
          };
        },
        methods: {
          borderClick: function(t) {
            this.isBorder = t;
          },
          save: function() {
            this.$store.dispatch(
              "SAVE_COLORPICKER_SHAPEFILLCOLOR",
              this.fillColor
            ),
              this.$store.dispatch(
                "SAVE_COLORPICKER_SHAPEBORDERCOLOR",
                this.borderColor
              ),
              this.$emit("setShapeColor");
          },
        },
        computed: {},
      },
      A = I,
      x = Object(O["a"])(A, L, k, !1, null, null, null),
      j = x.exports,
      D = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: t.isVisible,
                expression: "isVisible",
              },
            ],
            staticClass: "table-wrapper",
          },
          [
            n(
              "Resizable",
              {
                ref: "resizable",
                staticClass: "resizable",
                attrs: {
                  active: t.resize.handlers,
                  "fit-parent": t.resize.fit,
                  "max-width": t._f("checkEmpty")(t.resize.maxW),
                  "max-height": t._f("checkEmpty")(t.resize.maxH),
                  "min-width": t._f("checkEmpty")(t.resize.minW),
                  "min-height": t._f("checkEmpty")(t.resize.minH),
                  width: t.resize.width,
                  height: t.resize.height,
                  left: t.resize.left,
                  top: t.resize.top,
                },
                on: {
                  mount: t.resizeHandler,
                  "resize:move": t.resizeHandler,
                  "resize:start": t.resizeHandler,
                  "resize:end": t.resizeHandler,
                  "drag:move": t.resizeHandler,
                  "drag:start": t.resizeHandler,
                  "drag:end": t.resizeHandler,
                },
              },
              [
                n("div", { staticClass: "tableDiv howMuchWidthHaveMap" }, [
                  n("div", { staticClass: "tableHeader" }, [
                    n("div", { staticClass: "table__tabs" }, [
                      n(
                        "div",
                        { staticClass: "table__tab table__tab--active" },
                        [t._v(t._s(t.tableName))]
                      ),
                    ]),
                    n(
                      "div",
                      { staticClass: "table__operations" },
                      [
                        t.isActiveServiceLocal &&
                        t.checkPermission(["data_add"])
                          ? n("i", {
                              staticClass:
                                "fas fa-plus tableFilter makeMePoint icon",
                              attrs: { title: t.$t("datatable.addData") },
                              on: { click: t.addData },
                            })
                          : t._e(),
                        t.tableHeaders
                          ? n(
                              "download-excel",
                              {
                                attrs: {
                                  fetch: t.fetchFullData,
                                  type: "xls",
                                  name: t.tableName + "_report",
                                },
                              },
                              [
                                n("i", {
                                  staticClass:
                                    "fas fa-file-excel icon excelDataIcon excelIcon makeMePoint",
                                  attrs: {
                                    title: t.$t("datatable.exportExcel"),
                                  },
                                }),
                              ]
                            )
                          : t._e(),
                        n("i", {
                          staticClass:
                            "fas fa-filter tableFilter makeMePoint icon",
                          attrs: { title: t.$t("datatable.filter") },
                          on: { click: t.showFilterModal },
                        }),
                        n("i", {
                          staticClass:
                            "fas fa-columns tableColumns makeMePoint icon",
                          attrs: {
                            title: t.$t("datatable.showHideTableColumns"),
                          },
                          on: { click: t.togglePopup },
                        }),
                        n("i", {
                          staticClass:
                            "fas fa-times tableClose makeMePoint icon",
                          attrs: { title: t.$t("button.close") },
                          on: { click: t.toggleIsVisible },
                        }),
                        n(
                          "div",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: t.isColumnPopupShowing,
                                expression: "isColumnPopupShowing",
                              },
                            ],
                            staticClass: "tableShowColumns custom-scrollbar",
                            attrs: { id: "table-columns" },
                          },
                          [
                            n(
                              "div",
                              { staticClass: "columnsDiv" },
                              t._l(t.tableHeaders, function(e, a) {
                                return n(
                                  "div",
                                  { key: a, staticClass: "table__column" },
                                  [
                                    n("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: t.checkedColumns,
                                          expression: "checkedColumns",
                                        },
                                      ],
                                      staticClass: "column__checkbox",
                                      attrs: {
                                        type: "checkbox",
                                        id: e,
                                        checked: "checked",
                                      },
                                      domProps: {
                                        value: a,
                                        checked: Array.isArray(t.checkedColumns)
                                          ? t._i(t.checkedColumns, a) > -1
                                          : t.checkedColumns,
                                      },
                                      on: {
                                        click: function(n) {
                                          return t.selectColumns(e, a, n);
                                        },
                                        change: function(e) {
                                          var n = t.checkedColumns,
                                            i = e.target,
                                            r = !!i.checked;
                                          if (Array.isArray(n)) {
                                            var o = a,
                                              s = t._i(n, o);
                                            i.checked
                                              ? s < 0 &&
                                                (t.checkedColumns = n.concat([
                                                  o,
                                                ]))
                                              : s > -1 &&
                                                (t.checkedColumns = n
                                                  .slice(0, s)
                                                  .concat(n.slice(s + 1)));
                                          } else t.checkedColumns = r;
                                        },
                                      },
                                    }),
                                    n(
                                      "label",
                                      { staticClass: "column__name" },
                                      [t._v(t._s(e))]
                                    ),
                                  ]
                                );
                              }),
                              0
                            ),
                          ]
                        ),
                      ],
                      1
                    ),
                  ]),
                  n(
                    "div",
                    {
                      ref: "dataTableContent",
                      staticClass: "tableContent custom-scrollbar",
                      attrs: { id: "dataTable" },
                    },
                    [
                      t.loading
                        ? n("Loader")
                        : n("table", { staticClass: "selfTable table" }, [
                            n("thead", [
                              n(
                                "tr",
                                [
                                  t._l(t.tableHeaders, function(e, a) {
                                    return n(
                                      "th",
                                      {
                                        directives: [
                                          {
                                            name: "show",
                                            rawName: "v-show",
                                            value: t.checkedColumns.includes(a),
                                            expression:
                                              "checkedColumns.includes(index)",
                                          },
                                        ],
                                        key: a,
                                      },
                                      [
                                        t._v(
                                          "\n                " +
                                            t._s(e) +
                                            "\n              "
                                        ),
                                      ]
                                    );
                                  }),
                                  t.isActiveServiceLocal
                                    ? n(
                                        "th",
                                        {
                                          staticClass: "table__column--sticky",
                                          style: {
                                            width: t.checkPermission([
                                              "data_edit",
                                            ])
                                              ? "8rem"
                                              : "4rem",
                                          },
                                        },
                                        [
                                          t._v(
                                            "\n                #\n              "
                                          ),
                                        ]
                                      )
                                    : t._e(),
                                ],
                                2
                              ),
                            ]),
                            n(
                              "tbody",
                              { staticClass: "tableBody custom-scrollbar" },
                              t._l(t.tableData.features, function(e, a) {
                                return n(
                                  "tr",
                                  { key: a },
                                  [
                                    t._l(e.attributes, function(a, i) {
                                      return n(
                                        "td",
                                        {
                                          directives: [
                                            {
                                              name: "show",
                                              rawName: "v-show",
                                              value: t.checkedColumns.includes(
                                                Object.keys(
                                                  e.attributes
                                                ).indexOf(i)
                                              ),
                                              expression:
                                                "\n                  checkedColumns.includes(\n                    Object.keys(data.attributes).indexOf(key)\n                  )\n                ",
                                            },
                                          ],
                                          key: i,
                                          staticClass: "makeMePoint",
                                          on: {
                                            click: function(n) {
                                              return t.focusToGeometry(e);
                                            },
                                          },
                                        },
                                        [
                                          t._v(
                                            "\n                " +
                                              t._s(a) +
                                              "\n              "
                                          ),
                                        ]
                                      );
                                    }),
                                    t.isActiveServiceLocal
                                      ? n(
                                          "td",
                                          {
                                            staticClass:
                                              "table__column--sticky",
                                            style: {
                                              width: t.checkPermission([
                                                "data_edit",
                                              ])
                                                ? "8rem"
                                                : "4rem",
                                            },
                                          },
                                          [
                                            t.checkPermission(["data_edit"])
                                              ? n("i", {
                                                  staticClass:
                                                    "far fa-edit \n                makeMePoint mr-2",
                                                  attrs: {
                                                    title: t.$t(
                                                      "datatable.editData"
                                                    ),
                                                  },
                                                  on: {
                                                    click: function(n) {
                                                      return t.editData(
                                                        e.attributes["gid"]
                                                      );
                                                    },
                                                  },
                                                })
                                              : t._e(),
                                            n("i", {
                                              staticClass:
                                                "fas fa-file-upload \n                makeMePoint ",
                                              attrs: {
                                                title: t.$t(
                                                  "datatable.fileUpload"
                                                ),
                                              },
                                              on: {
                                                click: function(n) {
                                                  return t.uploadImage(
                                                    e.attributes["gid"]
                                                  );
                                                },
                                              },
                                            }),
                                          ]
                                        )
                                      : t._e(),
                                  ],
                                  2
                                );
                              }),
                              0
                            ),
                          ]),
                    ],
                    1
                  ),
                ]),
              ]
            ),
            n("FilterModal"),
            t.activeService && t.selectedGid && t.isActiveServiceLocal
              ? n("ImageUploadModal", {
                  attrs: { gid: t.selectedGid, layerId: t.activeService.id },
                })
              : t._e(),
            t.activeService && t.isActiveServiceLocal
              ? n("DataAddEditModal", {
                  attrs: { gid: t.selectedGid, layerId: t.activeService.id },
                })
              : t._e(),
          ],
          1
        );
      },
      M = [],
      R = (n("8e6e"), n("ac6a"), n("456d"), n("20d6"), n("bd86")),
      P = (n("96cf"), n("3b8d")),
      B = n("8e5f"),
      F = n.n(B),
      N = (n("7540"), n("8243")),
      $ = n("4b7c"),
      G = n.n($),
      V = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "CustomModal",
          {
            attrs: {
              name: "imageUploadModal",
              title: t.$t("form.fileForm.modalTitle"),
              width: "50%",
              minHeight: 400,
            },
            on: { beforeShow: t.onModalOpen, afterHide: t.onModalClose },
          },
          [
            n("div", { staticClass: "row " }, [
              n(
                "div",
                { staticClass: "table-wrapper-scroll-y upload-content-scroll" },
                [
                  n("table", { staticClass: "table" }, [
                    n("thead", [
                      n("tr", [
                        n("th", { attrs: { scope: "col" } }, [
                          t._v(t._s(t.$t("form.fileForm.image"))),
                        ]),
                        n("th", { attrs: { scope: "col" } }, [
                          t._v(t._s(t.$t("form.fileForm.filename"))),
                        ]),
                        n("th", { attrs: { scope: "col" } }, [
                          t._v(t._s(t.$t("form.fileForm.extension"))),
                        ]),
                        n("th", { attrs: { scope: "col" } }, [
                          t._v(t._s(t.$t("form.fileForm.size"))),
                        ]),
                        n("th", { attrs: { scope: "col" } }, [
                          t._v(t._s(t.$t("form.fileForm.dateCreated"))),
                        ]),
                        t.checkPermission(["data_add"])
                          ? n("th", { attrs: { scope: "col" } })
                          : t._e(),
                      ]),
                    ]),
                    n(
                      "tbody",
                      t._l(t.files, function(e, a) {
                        return n("tr", { key: a }, [
                          t.isImage(e.extension)
                            ? n("td", { staticClass: "text-center" }, [
                                n("img", {
                                  directives: [
                                    {
                                      name: "viewer",
                                      rawName: "v-viewer",
                                      value: t.vieverOptions,
                                      expression: "vieverOptions",
                                    },
                                  ],
                                  attrs: {
                                    src: e.base64,
                                    alt: "",
                                    border: "3",
                                    height: "50",
                                    width: "50",
                                  },
                                }),
                              ])
                            : n("td", { staticClass: "text-center" }, [
                                n("i", { staticClass: "far fa-file-alt h1" }),
                              ]),
                          n("td", [
                            n(
                              "button",
                              {
                                staticClass: "btn btn-primary btn-xs",
                                on: {
                                  click: function(n) {
                                    return t.download(e);
                                  },
                                },
                              },
                              [n("i", { staticClass: "fas fa-download" })]
                            ),
                            t._v(
                              "\n              " +
                                t._s(e.filename) +
                                "\n              "
                            ),
                            n("span"),
                          ]),
                          n("td", [t._v(t._s(e.extension))]),
                          n("td", [
                            t._v(t._s(t.readableFileSizeConverter(e.size, !0))),
                          ]),
                          n("td", [t._v(t._s(e.dateCreated))]),
                          n("td", [
                            t.checkPermission(["data_edit"])
                              ? n(
                                  "button",
                                  {
                                    staticClass: "btn btn-danger btn-sm",
                                    attrs: { title: t.$t("button.delete") },
                                    on: {
                                      click: function(n) {
                                        return t.deleteImage(t.layerId, e.id);
                                      },
                                    },
                                  },
                                  [
                                    n("i", {
                                      staticClass: "fa fa-trash",
                                      attrs: { "aria-hidden": "true" },
                                    }),
                                  ]
                                )
                              : t._e(),
                          ]),
                        ]);
                      }),
                      0
                    ),
                  ]),
                ]
              ),
            ]),
            t.checkPermission(["data_add"])
              ? n("div", [
                  n("div", { staticClass: "row mt-3" }, [
                    n(
                      "div",
                      { staticClass: "col-md-12" },
                      [
                        n("vue-dropzone", {
                          ref: "dropzone",
                          attrs: { id: "dropzone", options: t.dropzoneOptions },
                          on: {
                            "vdropzone-sending": t.sendingEvent,
                            "vdropzone-success": t.onSuccess,
                          },
                        }),
                      ],
                      1
                    ),
                  ]),
                  n("div", { staticClass: "col-md-12" }, [
                    n(
                      "button",
                      {
                        staticClass: "btn btn-danger btn-sm float-right mt-3",
                        attrs: { title: t.$t("button.clear") },
                        on: { click: t.clearDropzone },
                      },
                      [
                        t._v(
                          "\n        " + t._s(t.$t("button.clear")) + "\n      "
                        ),
                      ]
                    ),
                  ]),
                ])
              : t._e(),
          ]
        );
      },
      U = [],
      z = (n("6762"), n("2fdb"), n("5df3"), n("c5f6"), n("92c3")),
      H = n.n(z),
      q = n("aeb1"),
      Q = n.n(q),
      Y = n("6944"),
      Z = n.n(Y),
      W = n("78a3"),
      K = n("dde5"),
      X = n("7055"),
      J = n("b775"),
      tt =
        ((a = {
          get: function(t) {
            return J["a"].get(W["i"].GET(t));
          },
          getAll: function() {
            return J["a"].get(W["i"].GET_ALL);
          },
          getFile: function(t) {
            return J["a"].get(W["i"].GET_BASE64_FILE(t));
          },
        }),
        Object(R["a"])(a, "getAll", function(t, e) {
          return J["a"].get(W["i"].GET_ALL(t, e));
        }),
        Object(R["a"])(a, "add", function(t) {
          return J["a"].post(W["i"].ADD, t);
        }),
        Object(R["a"])(a, "delete", function(t, e) {
          return J["a"].delete(W["i"].DELETE(t, e));
        }),
        a),
      et = n("07a4"),
      nt = n("ce96");
    function at(t) {
      if (t && t instanceof Array && t.length > 0) {
        var e = et["a"].getters && et["a"].getters.roles,
          n = nt["f"].getRolePermissions(e),
          a = et["a"].getters && et["a"].getters.directivePermissions,
          i = t,
          r = n.some(function(t) {
            return i.includes(t);
          }),
          o = a.some(function(t) {
            return i.includes(t);
          }),
          s = r || o;
        return !!s;
      }
      return (
        console.error("need roles! Like v-permission=\"['admin','editor']\""),
        !1
      );
    }
    var it = n("ed08"),
      rt = {
        components: { vueDropzone: H.a },
        props: {
          layerId: { type: Number, required: !0 },
          gid: { type: Number, required: !0 },
        },
        data: function() {
          var t;
          return (
            (t = { files: [], vieverOptions: { movable: !1 } }),
            Object(R["a"])(t, "vieverOptions", {
              movable: !1,
              zoomable: !0,
              rotatable: !1,
              toolbar: !1,
              scalable: !1,
              button: !1,
              navbar: !1,
              title: !1,
              tooltip: !0,
              transition: !0,
              fullscreen: !1,
              keyboard: !0,
            }),
            Object(R["a"])(t, "imageExtensions", [
              ".jpg",
              ".jpeg",
              ".gif",
              ".png",
              ".bmp",
            ]),
            Object(R["a"])(t, "dropzoneOptions", {
              url: "https://webgis.azercosmos.az/api" + W["i"].ADD,
              thumbnailWidth: 150,
              maxFilesize: 2,
              dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME",
              headers: { Authorization: "Bearer ".concat(K["d"].getToken()) },
              acceptedFiles: ".jpeg,.jpg,.png,.gif,.tif,.tiff,.bmp",
            }),
            t
          );
        },
        methods: {
          readableFileSizeConverter: it["f"],
          checkPermission: at,
          resetData: function() {
            this.files = [];
          },
          download: function(t) {
            Q()(t.base64, t.filename, this.getMimFromExtension(t.extension));
          },
          getMimFromExtension: function(t) {
            switch (t.toLowerCase()) {
              case ".jpeg":
                return "image/jpeg";
              case ".jpg":
                return "image/jpeg";
              case ".png":
                return "image/png";
              case ".gif":
                return "image/gif";
              case ".tif":
                return "image/tiff";
              case ".tiff":
                return "image/tiff";
              case ".bmp":
                return "image/bmp";
              case ".txt":
                return "text/plain";
            }
          },
          getImages: (function() {
            var t = Object(P["a"])(
              regeneratorRuntime.mark(function t() {
                var e,
                  n,
                  a = this;
                return regeneratorRuntime.wrap(
                  function(t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (t.next = 2), tt.getAll(this.layerId, this.gid)
                          );
                        case 2:
                          return (
                            (e = t.sent),
                            (n = e),
                            (t.next = 6),
                            Promise.all(
                              n.map(
                                (function() {
                                  var t = Object(P["a"])(
                                    regeneratorRuntime.mark(function t(e) {
                                      var n;
                                      return regeneratorRuntime.wrap(function(
                                        t
                                      ) {
                                        while (1)
                                          switch ((t.prev = t.next)) {
                                            case 0:
                                              return (
                                                (t.next = 2),
                                                a.getBase64File(e.id)
                                              );
                                            case 2:
                                              (n = t.sent),
                                                (e.base64 =
                                                  "data:".concat(
                                                    a.getMimFromExtension(
                                                      e.extension
                                                    ),
                                                    ";base64,"
                                                  ) + n);
                                            case 4:
                                            case "end":
                                              return t.stop();
                                          }
                                      },
                                      t);
                                    })
                                  );
                                  return function(e) {
                                    return t.apply(this, arguments);
                                  };
                                })()
                              )
                            )
                          );
                        case 6:
                          this.files = n;
                        case 7:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e() {
              return t.apply(this, arguments);
            }
            return e;
          })(),
          getBase64File: (function() {
            var t = Object(P["a"])(
              regeneratorRuntime.mark(function t(e) {
                var n;
                return regeneratorRuntime.wrap(function(t) {
                  while (1)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (t.next = 2), tt.getFile(e);
                      case 2:
                        return (n = t.sent), t.abrupt("return", n);
                      case 4:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
          isImage: function(t) {
            return this.imageExtensions.includes(t.toLowerCase());
          },
          deleteImage: function(t, e) {
            var n = this;
            K["c"].areYouSureDeleteRecord(function(a) {
              a.isConfirmed &&
                tt.delete(t, e).then(function(t) {
                  K["c"].deleted(), n.getImages();
                });
            });
          },
          onModalOpen: function() {
            this.resetData(), this.getImages();
          },
          onModalClose: function() {
            this.resetData(), this.clearDropzone();
          },
          clearDropzone: function() {
            this.$refs.dropzone.removeAllFiles();
          },
          onSuccess: function(t, e) {
            this.getImages(), this.clearDropzone();
          },
          sendingEvent: function(t, e, n) {
            n.append("layerId", this.layerId),
              n.append("gid", this.gid),
              n.append("file", t);
          },
        },
      },
      ot = rt,
      st = (n("630b"), Object(O["a"])(ot, V, U, !1, null, "e842d306", null)),
      ct = st.exports,
      lt = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "div",
          [
            n(
              "CustomModal",
              {
                attrs: {
                  name: "filterModal",
                  title: t.$t("form.filterForm.modalTitle"),
                  maxWidth: 600,
                },
                on: { afterHide: t.onModalClose },
              },
              [
                n("div", { staticClass: "data-table__filter" }, [
                  n("div", { staticClass: "row form-group" }, [
                    n("div", { staticClass: "col-md-12" }, [
                      n(
                        "div",
                        { staticClass: "filter__tabs" },
                        t._l(t.tabs, function(e) {
                          return n(
                            "div",
                            {
                              key: e.id,
                              staticClass: "tab",
                              class: { "tab--active": t.activeTabId === e.id },
                              on: {
                                click: function(n) {
                                  t.activeTabId = e.id;
                                },
                              },
                            },
                            [
                              t._v(
                                "\n              " +
                                  t._s(e.name) +
                                  "\n            "
                              ),
                            ]
                          );
                        }),
                        0
                      ),
                    ]),
                  ]),
                  n("div", { staticClass: "row form-group" }, [
                    n("div", { staticClass: "col-md-12" }, [
                      n("div", { staticClass: "filter__fields" }, [
                        n("div", { staticClass: "filter__fields__columns" }, [
                          n("h5", [
                            t._v(t._s(t.$t("form.filterForm.columns"))),
                          ]),
                          n(
                            "ul",
                            {
                              staticClass:
                                "filter__fields__list custom-scrollbar",
                            },
                            t._l(t.tableHeaders, function(e, a) {
                              return n(
                                "li",
                                {
                                  key: a,
                                  staticClass: "list__item",
                                  on: {
                                    dblclick: function(n) {
                                      return t.appendFilterQuery(e, !1);
                                    },
                                    click: function(n) {
                                      return t.getFilterColumnValues(e);
                                    },
                                  },
                                },
                                [
                                  t._v(
                                    "\n                  " +
                                      t._s(e) +
                                      "\n                "
                                  ),
                                ]
                              );
                            }),
                            0
                          ),
                        ]),
                        n("div", { staticClass: "filter__fields__values" }, [
                          n("h5", [t._v(t._s(t.$t("form.filterForm.values")))]),
                          n(
                            "ul",
                            {
                              staticClass:
                                "filter__fields__list custom-scrollbar",
                            },
                            t._l(t.filterValues, function(e, a) {
                              return n(
                                "li",
                                {
                                  key: a,
                                  staticClass: "list__item",
                                  on: {
                                    dblclick: function(n) {
                                      return t.appendFilterQuery(e, !0);
                                    },
                                  },
                                },
                                [
                                  t._v(
                                    "\n                  " +
                                      t._s(e) +
                                      "\n                "
                                  ),
                                ]
                              );
                            }),
                            0
                          ),
                        ]),
                      ]),
                    ]),
                  ]),
                  n("div", { staticClass: "row form-group" }, [
                    n("div", { staticClass: "col-md-12" }, [
                      n(
                        "div",
                        { staticClass: "filter__actions" },
                        t._l(t.actionsList, function(e) {
                          return n("div", { key: e }, [
                            n(
                              "button",
                              {
                                staticClass: "btn btn-sm btn-outline-secondary",
                                on: {
                                  click: function(n) {
                                    return t.appendFilterQuery(e, !1);
                                  },
                                },
                              },
                              [
                                t._v(
                                  "\n                " +
                                    t._s(e) +
                                    "\n              "
                                ),
                              ]
                            ),
                          ]);
                        }),
                        0
                      ),
                    ]),
                  ]),
                  n("div", { staticClass: "row form-group" }, [
                    n("div", { staticClass: "col-md-12" }, [
                      n("div", { staticClass: "filter__query" }, [
                        n("label", { staticClass: "title" }, [
                          t._v("SELECT * FROM table WHERE:"),
                        ]),
                        t._v(
                          "\n            " +
                            t._s(t.activeTabQuery) +
                            "\n            "
                        ),
                        n("textarea", {
                          ref: "filterQueryTextarea",
                          attrs: { name: "filterQuery", rows: "4", cols: "69" },
                          domProps: { value: t.activeTabQuery },
                          on: { input: t.handleQueryChange },
                        }),
                      ]),
                    ]),
                    n("div", { staticClass: "col-md-12" }, [
                      t.favoriteQueryModalVisibility
                        ? n(
                            "button",
                            {
                              staticClass: "btn btn-success btn-sm float-right",
                              attrs: {
                                type: "button",
                                disabled: !(t.isQueryExist && t.activeTabId),
                              },
                              on: { click: t.showFavoriteQueryModal },
                            },
                            [
                              t._v(
                                "\n            " +
                                  t._s(
                                    t.$t("form.filterForm.addFavoriteQuery")
                                  ) +
                                  "\n          "
                              ),
                            ]
                          )
                        : t._e(),
                    ]),
                  ]),
                  n("div", { staticClass: "row form-group" }, [
                    n(
                      "div",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: t.extentOptionsVisibility,
                            expression: "extentOptionsVisibility",
                          },
                        ],
                        staticClass: "col-md-6",
                      },
                      [
                        n("b", [
                          t._v(
                            "\n            " +
                              t._s(t.$t("form.filterForm.extentOptions")) +
                              "\n            "
                          ),
                          n(
                            "span",
                            { staticStyle: { "font-size": "1.44rem" } },
                            [
                              t._v(
                                "\n              ( " +
                                  t._s(t.$t("form.filterForm.isExist")) +
                                  " :\n              "
                              ),
                              t.isExtentAreaExist
                                ? n(
                                    "span",
                                    { staticClass: "badge badge-success" },
                                    [
                                      t._v(
                                        "\n                true\n              "
                                      ),
                                    ]
                                  )
                                : n(
                                    "span",
                                    { staticClass: "badge badge-danger" },
                                    [
                                      t._v(
                                        "\n                false\n              "
                                      ),
                                    ]
                                  ),
                              t._v("\n              )\n            "),
                            ]
                          ),
                        ]),
                        n(
                          "div",
                          {
                            staticClass:
                              "btn-group btn-group-toggle btn-group-sm",
                            attrs: {
                              role: "group",
                              "aria-label": "Basic example",
                            },
                          },
                          [
                            n(
                              "label",
                              {
                                staticClass: "btn  btn-info ",
                                class: {
                                  active:
                                    t.isExtentAreaExist &&
                                    t.extentType == t.drawTypeEnum.SQUARE,
                                },
                              },
                              [
                                n("input", {
                                  attrs: { type: "radio", name: "options" },
                                  domProps: { value: t.drawTypeEnum.SQUARE },
                                  on: { click: t.drawTypeOnChange },
                                }),
                                n("img", { attrs: { src: t.icons.square } }),
                              ]
                            ),
                            n(
                              "label",
                              {
                                staticClass: "btn  btn-info ",
                                class: {
                                  active:
                                    t.isExtentAreaExist &&
                                    t.extentType == t.drawTypeEnum.BOX,
                                },
                              },
                              [
                                n("input", {
                                  attrs: { type: "radio", name: "options" },
                                  domProps: { value: t.drawTypeEnum.BOX },
                                  on: { click: t.drawTypeOnChange },
                                }),
                                n("img", { attrs: { src: t.icons.rectangle } }),
                              ]
                            ),
                            n(
                              "label",
                              {
                                staticClass: "btn  btn-info ",
                                class: {
                                  active:
                                    t.isExtentAreaExist &&
                                    t.extentType == t.drawTypeEnum.POLYGON,
                                },
                              },
                              [
                                n("input", {
                                  attrs: { type: "radio", name: "options" },
                                  domProps: { value: t.drawTypeEnum.POLYGON },
                                  on: { click: t.drawTypeOnChange },
                                }),
                                n("img", { attrs: { src: t.icons.polygon } }),
                              ]
                            ),
                            t.circleButtonVisibility
                              ? n(
                                  "label",
                                  {
                                    staticClass: "btn  btn-info ",
                                    class: {
                                      active:
                                        t.isExtentAreaExist &&
                                        t.extentType == t.drawTypeEnum.CIRCLE,
                                    },
                                  },
                                  [
                                    n("input", {
                                      attrs: { type: "radio", name: "options" },
                                      domProps: {
                                        value: t.drawTypeEnum.CIRCLE,
                                      },
                                      on: { click: t.drawTypeOnChange },
                                    }),
                                    n("img", {
                                      attrs: { src: t.icons.circle },
                                    }),
                                  ]
                                )
                              : t._e(),
                          ]
                        ),
                      ]
                    ),
                    n(
                      "div",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: t.reportCheckboxVisibility,
                            expression: "reportCheckboxVisibility",
                          },
                        ],
                        staticClass: "col-md-6",
                      },
                      [
                        n("b", [
                          t._v(t._s(t.$t("form.filterForm.sumReportOptions"))),
                        ]),
                        n("div", [
                          n("div", { staticClass: "row" }, [
                            n("div", { staticClass: "col-md-6" }, [
                              n("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: t.isSumFilter,
                                    expression: "isSumFilter",
                                  },
                                ],
                                attrs: { type: "checkbox", id: "isSum" },
                                domProps: {
                                  checked: Array.isArray(t.isSumFilter)
                                    ? t._i(t.isSumFilter, null) > -1
                                    : t.isSumFilter,
                                },
                                on: {
                                  change: function(e) {
                                    var n = t.isSumFilter,
                                      a = e.target,
                                      i = !!a.checked;
                                    if (Array.isArray(n)) {
                                      var r = null,
                                        o = t._i(n, r);
                                      a.checked
                                        ? o < 0 &&
                                          (t.isSumFilter = n.concat([r]))
                                        : o > -1 &&
                                          (t.isSumFilter = n
                                            .slice(0, o)
                                            .concat(n.slice(o + 1)));
                                    } else t.isSumFilter = i;
                                  },
                                },
                              }),
                              n("label", { staticClass: "ml-1" }, [
                                t._v(
                                  "\n                  " +
                                    t._s(t.$t("form.filterForm.isSum")) +
                                    "\n                "
                                ),
                              ]),
                            ]),
                            n("div", { staticClass: "col-md-6" }, [
                              t.isSumFilter
                                ? n(
                                    "select",
                                    {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: t.sumFilterColumn,
                                          expression: "sumFilterColumn",
                                        },
                                      ],
                                      staticClass:
                                        "form-control form-control-sm",
                                      on: {
                                        change: function(e) {
                                          var n = Array.prototype.filter
                                            .call(e.target.options, function(
                                              t
                                            ) {
                                              return t.selected;
                                            })
                                            .map(function(t) {
                                              var e =
                                                "_value" in t
                                                  ? t._value
                                                  : t.value;
                                              return e;
                                            });
                                          t.sumFilterColumn = e.target.multiple
                                            ? n
                                            : n[0];
                                        },
                                      },
                                    },
                                    t._l(t.tableHeaders, function(e) {
                                      return n(
                                        "option",
                                        { key: e, domProps: { value: e } },
                                        [
                                          t._v(
                                            "\n                    " +
                                              t._s(e) +
                                              "\n                  "
                                          ),
                                        ]
                                      );
                                    }),
                                    0
                                  )
                                : t._e(),
                            ]),
                          ]),
                        ]),
                      ]
                    ),
                  ]),
                  n("div", { staticClass: "row form-group" }, [
                    n("div", { staticClass: "col-md-12" }, [
                      n(
                        "button",
                        {
                          staticClass: "btn btn-primary float-right",
                          on: { click: t.applyFilter },
                        },
                        [
                          t._v(
                            "\n            " +
                              t._s(t.$t("button.apply")) +
                              "\n          "
                          ),
                        ]
                      ),
                    ]),
                  ]),
                ]),
              ]
            ),
            t.favoriteQueryModalVisibility && t.isQueryExist && t.activeTabId
              ? n("FavoriteQueryModal", {
                  attrs: { query: t.activeTabQuery, layerId: t.activeTabId },
                })
              : t._e(),
          ],
          1
        );
      },
      ut = [],
      dt = (n("7f7f"), n("aa3f")),
      pt = n("0962"),
      ft = {
        name: "FilterModal",
        components: {
          FavoriteQueryModal: function() {
            return Promise.resolve().then(n.bind(null, "4882"));
          },
        },
        data: function() {
          return {
            actionsList: [
              "=",
              ">",
              ">=",
              "<",
              "<=",
              "<>",
              "AND",
              "OR",
              "LIKE",
              "IS NULL",
            ],
            filterValues: [],
            currentTabId: null,
            selectedColumn: "gid",
            icons: {},
            tableHeaders: [],
            extentType: null,
            drawTypeEnum: null,
          };
        },
        created: function() {
          (this.icons = dt["b"]), (this.drawTypeEnum = pt["b"]);
        },
        mounted: function() {
          this.extentType = this.drawTypeEnum.NONE;
        },
        methods: {
          onModalClose: function() {
            X["k"].pickDrawType(pt["b"].NONE);
          },
          showFavoriteQueryModal: function() {
            X["g"].showFavoriteQueryModal();
          },
          setTableHeaders: (function() {
            var t = Object(P["a"])(
              regeneratorRuntime.mark(function t(e) {
                var n;
                return regeneratorRuntime.wrap(
                  function(t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (t.next = 2), N["a"].getTableInfo(e);
                        case 2:
                          (n = t.sent),
                            (this.tableHeaders = n.columns.map(function(t) {
                              return t.columnName;
                            }));
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
          drawTypeOnChange: function(t) {
            var e = this,
              n = t.target.value,
              a = { id: this.activeService.id, type: this.activeService.type };
            if (
              (X["k"].deleteServiceFeatures(this.activeService.id),
              this.extentType == n)
            )
              (this.extentType = pt["b"].NONE),
                X["i"].setExtentCoordinates(this.activeService, "");
            else {
              X["g"].hideFilterModal(), X["j"].setTableUnvisible();
              var i = { forService: a };
              X["k"].pickDrawType(
                n,
                function() {
                  X["g"].showFilterModal(), (e.extentType = n);
                  var t = e.bbox;
                  X["i"].setExtentCoordinates(
                    e.activeService,
                    JSON.stringify(t)
                  ),
                    X["j"].setTableVisible(),
                    X["b"].setIsRequiredServiceRefresh(!0);
                },
                i
              );
            }
          },
          handleQueryChange: function(t) {
            var e = t.target.value;
            "" === e && (e = " "), (this.activeTabQuery = e);
          },
          isValString: function(t) {
            return "string" == typeof t;
          },
          appendFilterQuery: function(t, e) {
            e && this.isValString(t) && (t = "'".concat(t, "'")),
              (this.activeTabQuery = this.activeTabQuery + t + " "),
              this.$refs.filterQueryTextarea.focus();
          },
          applyFilter: function() {
            X["j"].getTable(this.activeService),
              this.$moodal.filterModal.hide();
          },
          getFilterColumnValues: (function() {
            var t = Object(P["a"])(
              regeneratorRuntime.mark(function t(e) {
                return regeneratorRuntime.wrap(
                  function(t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (t.next = 2),
                            X["b"].getFilterColumnValues(this.activeTabId, e)
                          );
                        case 2:
                          this.filterValues = t.sent;
                        case 3:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
        computed: {
          favoriteQueryModalVisibility: function() {
            return nt["g"].isDynamicFromLocal(this.activeService);
          },
          isQueryExist: function() {
            return (
              this.activeTabQuery &&
              "" !== this.activeTabQuery.trim() &&
              this.activeTabQuery.length > 0
            );
          },
          isExtentAreaExist: function() {
            var t = this.activeService,
              e = nt["g"].isBunch(t),
              n = !1;
            if (t)
              if (e) {
                var a = X["a"].getExtentCoordinates(t.id);
                n = a.some(function(t) {
                  return null !== t && "" !== t;
                });
              } else {
                a = X["d"].getExtentCoordinates(t.id);
                n = null !== a && "" !== a;
              }
            return this.extentType !== pt["b"].NONE && n;
          },
          circleButtonVisibility: function() {
            return !nt["g"].isBunch(this.activeService);
          },
          reportCheckboxVisibility: function() {
            return this.activeService && nt["g"].isLayer(this.activeService);
          },
          extentOptionsVisibility: function() {
            return (
              this.activeService &&
              (nt["g"].isLayer(this.activeService) ||
                nt["g"].isBunch(this.activeService))
            );
          },
          tabs: function() {
            var t = [];
            if (this.activeService) {
              var e = nt["g"].isBunch(this.activeService);
              t = e
                ? this.activeService.layers.map(function(t) {
                    return { id: t.id, name: t.name };
                  })
                : [
                    {
                      id: this.activeService.id,
                      name: this.activeService.name,
                    },
                  ];
            }
            return t;
          },
          activeTabId: {
            get: function() {
              return this.$store.state.dataTable.activeTabId;
            },
            set: function(t) {
              this.$store.dispatch("saveDatatableActiveTabId", t);
            },
          },
          activeService: function() {
            return X["j"].getTableActiveService();
          },
          activeTabService: function() {
            if (!this.activeService) return null;
            var t = nt["g"].isBunch(this.activeService),
              e = null;
            return (
              this.activeTab &&
                (e = t
                  ? X["a"].getBunchLayer(
                      this.activeService.id,
                      this.activeTabId
                    )
                  : X["d"].getDynamicLayer(this.activeTabId)),
              e
            );
          },
          activeTabQuery: {
            get: function() {
              var t = "",
                e = this.activeService;
              if (!e || !this.activeTabId) return t;
              var n = X["i"].getDynamicService(e, this.activeTabId);
              return (t = n ? n.query.where : ""), t;
            },
            set: function(t) {
              if (t) {
                var e = this.activeService,
                  n = nt["g"].isBunch(e);
                n
                  ? X["i"].setQuery(e, t, this.activeTabId)
                  : X["i"].setQuery(e, t),
                  X["b"].setIsRequiredServiceRefresh(!0);
              }
            },
          },
          isSumFilter: {
            get: function() {
              return this.$store.getters.isSumFilter;
            },
            set: function(t) {
              return (
                t &&
                  this.$store.dispatch(
                    "saveSumFilterColumn",
                    this.tableHeaders[0]
                  ),
                this.$store.dispatch("saveIsSumFilter", t)
              );
            },
          },
          sumFilterColumn: {
            get: function() {
              var t = this.$store.getters.sumFilterColumn;
              return t;
            },
            set: function(t) {
              return this.$store.dispatch("saveSumFilterColumn", t);
            },
          },
          bbox: {
            get: function() {
              return X["k"].getBbox();
            },
            set: function(t) {
              X["k"].setBbox(t);
            },
          },
        },
        watch: {
          activeTabId: (function() {
            var t = Object(P["a"])(
              regeneratorRuntime.mark(function t(e) {
                return regeneratorRuntime.wrap(
                  function(t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          this.setTableHeaders(e);
                        case 1:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
      },
      mt = ft,
      gt = Object(O["a"])(mt, lt, ut, !1, null, null, null),
      ht = gt.exports,
      vt = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "div",
          [
            n(
              "CustomModal",
              {
                attrs: {
                  name: "dataAddEditModal",
                  title: t.$t("form.dataForm.modalTitle"),
                  width: "50%",
                  minHeight: 400,
                },
                on: { beforeShow: t.onModalOpen, afterHide: t.onModalClose },
              },
              [
                n("form", [
                  n("div", { staticClass: "row form-group" }, [
                    n("div", { staticClass: "col-md-6" }, [
                      n("div", { staticClass: "row" }, [
                        n("div", { staticClass: "col-md-12" }, [
                          n("label", [
                            t._v(
                              "\n                " +
                                t._s(t.$t("form.dataForm.isGeometryExist")) +
                                " :\n                "
                            ),
                            t.isGeometryExist
                              ? n(
                                  "span",
                                  { staticClass: "badge badge-success" },
                                  [
                                    t._v(
                                      "\n                  " +
                                        t._s(t.$t("general.true")) +
                                        "\n                "
                                    ),
                                  ]
                                )
                              : n(
                                  "span",
                                  { staticClass: "badge badge-danger" },
                                  [
                                    t._v(
                                      "\n                  " +
                                        t._s(t.$t("general.false")) +
                                        "\n                "
                                    ),
                                  ]
                                ),
                          ]),
                        ]),
                      ]),
                    ]),
                    n("div", { staticClass: "col-md-6" }, [
                      n("div", { staticClass: "row" }, [
                        n("div", { staticClass: "col-md-12" }, [
                          n(
                            "div",
                            {
                              staticClass:
                                "btn-group btn-group-toggle btn-group-sm float-right",
                              attrs: {
                                role: "group",
                                "aria-label": "Basic example",
                              },
                            },
                            [
                              t.pointGeometryVisibility
                                ? n(
                                    "label",
                                    {
                                      staticClass: "btn  btn-info ",
                                      class: {
                                        active:
                                          t.isGeometryExist &&
                                          t.geometryBtnSelect ==
                                            t.drawTypeEnum.POINT,
                                      },
                                    },
                                    [
                                      n("input", {
                                        attrs: {
                                          type: "radio",
                                          name: "options",
                                        },
                                        domProps: {
                                          value: t.drawTypeEnum.POINT,
                                        },
                                        on: { click: t.drawTypeOnChange },
                                      }),
                                      n("img", {
                                        attrs: { src: t.icons.point },
                                      }),
                                    ]
                                  )
                                : t._e(),
                              t.lineGeometryVisibility
                                ? n(
                                    "label",
                                    {
                                      staticClass: "btn  btn-info ",
                                      class: {
                                        active:
                                          t.isGeometryExist &&
                                          t.geometryBtnSelect ==
                                            t.drawTypeEnum.LINESTRING,
                                      },
                                    },
                                    [
                                      n("input", {
                                        attrs: {
                                          type: "radio",
                                          name: "options",
                                        },
                                        domProps: {
                                          value: t.drawTypeEnum.LINESTRING,
                                        },
                                        on: { click: t.drawTypeOnChange },
                                      }),
                                      n("img", {
                                        attrs: { src: t.icons.line },
                                      }),
                                    ]
                                  )
                                : t._e(),
                              t.polygonGeometryVisibility
                                ? n(
                                    "label",
                                    {
                                      staticClass: "btn  btn-info ",
                                      class: {
                                        active:
                                          t.isGeometryExist &&
                                          t.geometryBtnSelect ==
                                            t.drawTypeEnum.SQUARE,
                                      },
                                    },
                                    [
                                      n("input", {
                                        attrs: {
                                          type: "radio",
                                          name: "options",
                                        },
                                        domProps: {
                                          value: t.drawTypeEnum.SQUARE,
                                        },
                                        on: { click: t.drawTypeOnChange },
                                      }),
                                      n("img", {
                                        attrs: { src: t.icons.square },
                                      }),
                                    ]
                                  )
                                : t._e(),
                              t.polygonGeometryVisibility
                                ? n(
                                    "label",
                                    {
                                      staticClass: "btn  btn-info ",
                                      class: {
                                        active:
                                          t.isGeometryExist &&
                                          t.geometryBtnSelect ==
                                            t.drawTypeEnum.BOX,
                                      },
                                    },
                                    [
                                      n("input", {
                                        attrs: {
                                          type: "radio",
                                          name: "options",
                                        },
                                        domProps: { value: t.drawTypeEnum.BOX },
                                        on: { click: t.drawTypeOnChange },
                                      }),
                                      n("img", {
                                        attrs: { src: t.icons.rectangle },
                                      }),
                                    ]
                                  )
                                : t._e(),
                              t.polygonGeometryVisibility
                                ? n(
                                    "label",
                                    {
                                      staticClass: "btn  btn-info ",
                                      class: {
                                        active:
                                          t.isGeometryExist &&
                                          t.geometryBtnSelect ==
                                            t.drawTypeEnum.POLYGON,
                                      },
                                    },
                                    [
                                      n("input", {
                                        attrs: {
                                          type: "radio",
                                          name: "options",
                                        },
                                        domProps: {
                                          value: t.drawTypeEnum.POLYGON,
                                        },
                                        on: { click: t.drawTypeOnChange },
                                      }),
                                      n("img", {
                                        attrs: { src: t.icons.polygon },
                                      }),
                                    ]
                                  )
                                : t._e(),
                              t.polygonGeometryVisibility
                                ? n(
                                    "label",
                                    {
                                      staticClass: "btn  btn-info ",
                                      class: {
                                        active:
                                          t.isGeometryExist &&
                                          t.geometryBtnSelect ==
                                            t.drawTypeEnum.CIRCLE,
                                      },
                                    },
                                    [
                                      n("input", {
                                        attrs: {
                                          type: "radio",
                                          name: "options",
                                        },
                                        domProps: {
                                          value: t.drawTypeEnum.CIRCLE,
                                        },
                                        on: { click: t.drawTypeOnChange },
                                      }),
                                      n("img", {
                                        attrs: { src: t.icons.circle },
                                      }),
                                    ]
                                  )
                                : t._e(),
                            ]
                          ),
                        ]),
                        n("div", { staticClass: "col-md-12 mt-1" }, [
                          n(
                            "button",
                            {
                              staticClass: "btn btn-primary float-right",
                              attrs: { type: "button" },
                              on: { click: t.showGeometryModal },
                            },
                            [t._v("\n                Geometry\n              ")]
                          ),
                        ]),
                      ]),
                    ]),
                  ]),
                  n(
                    "div",
                    { staticClass: "row" },
                    t._l(t.columns, function(e, a) {
                      return n("div", { key: a, staticClass: "col-md-12" }, [
                        n(
                          "div",
                          { staticClass: "form-group" },
                          [
                            n("label", { attrs: { for: e.columnName } }, [
                              t._v(" " + t._s(e.columnName)),
                            ]),
                            n("DynamicFormInput", {
                              staticClass: "form-control",
                              attrs: {
                                type: e.valueType,
                                name: e.columnName,
                                value: t.isEdit ? e.value : null,
                              },
                              on: { onChange: t.onInputChange },
                            }),
                          ],
                          1
                        ),
                      ]);
                    }),
                    0
                  ),
                  n("div", { staticClass: "row " }, [
                    n("div", { staticClass: "col-md-12 form-group" }, [
                      n(
                        "button",
                        {
                          staticClass: "btn btn-primary float-right",
                          attrs: { type: "button" },
                          on: { click: t.onSubmit },
                        },
                        [
                          t._v(
                            "\n            " +
                              t._s(t.$t("button.apply")) +
                              "\n          "
                          ),
                        ]
                      ),
                    ]),
                  ]),
                ]),
              ]
            ),
            n(
              "CustomModal",
              {
                attrs: {
                  name: "geometryModal",
                  title: "Geometry Modal",
                  width: "70%",
                  minHeight: 400,
                },
                on: { afterHide: t.onGeometryModalClose },
              },
              [
                n("div", { staticClass: "row" }, [
                  n("div", { staticClass: "col-md-6" }, [
                    n("label", [
                      t._v("\n          Geometry Type :\n\n          "),
                      n("span", { staticClass: "badge badge-info" }, [
                        t._v(
                          "\n            " +
                            t._s(t.geometryType) +
                            "\n          "
                        ),
                      ]),
                    ]),
                  ]),
                  n("div", { staticClass: "col-md-6" }, [
                    n("div", { staticClass: "form-group" }, [
                      n("label", { attrs: { for: "label" } }),
                      n(
                        "button",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: t.geometry && t.geometry.length > 0,
                              expression: "geometry && geometry.length > 0",
                            },
                          ],
                          staticClass: "btn btn-danger float-right",
                          attrs: { type: "button" },
                          on: { click: t.resetCoordinates },
                        },
                        [
                          t._v(
                            "\n            " +
                              t._s(t.$t("form.dataForm.resetCoordinate")) +
                              "\n          "
                          ),
                        ]
                      ),
                    ]),
                  ]),
                  t.isGeometryExist
                    ? n(
                        "div",
                        { staticClass: "col-md-12" },
                        [
                          "point" == t.geometryType
                            ? n("div", { staticClass: "row" }, [
                                n("div", { staticClass: "col-md-5" }, [
                                  n("div", { staticClass: "form-group" }, [
                                    n("label", { attrs: { for: "label" } }, [
                                      t._v("X"),
                                    ]),
                                    n("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model.number",
                                          value: t.geometry[0],
                                          expression: "geometry[0]",
                                          modifiers: { number: !0 },
                                        },
                                      ],
                                      staticClass: "form-control",
                                      attrs: {
                                        type: "number",
                                        step: ".00000000001",
                                        id: "label",
                                      },
                                      domProps: { value: t.geometry[0] },
                                      on: {
                                        input: function(e) {
                                          e.target.composing ||
                                            t.$set(
                                              t.geometry,
                                              0,
                                              t._n(e.target.value)
                                            );
                                        },
                                        blur: function(e) {
                                          return t.$forceUpdate();
                                        },
                                      },
                                    }),
                                  ]),
                                ]),
                                n("div", { staticClass: "col-md-5" }, [
                                  n("div", { staticClass: "form-group" }, [
                                    n("label", { attrs: { for: "label" } }, [
                                      t._v("Y"),
                                    ]),
                                    n("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model.number",
                                          value: t.geometry[1],
                                          expression: "geometry[1]",
                                          modifiers: { number: !0 },
                                        },
                                      ],
                                      staticClass: "form-control",
                                      attrs: {
                                        type: "number",
                                        step: ".00000000001",
                                        id: "label",
                                      },
                                      domProps: { value: t.geometry[1] },
                                      on: {
                                        input: function(e) {
                                          e.target.composing ||
                                            t.$set(
                                              t.geometry,
                                              1,
                                              t._n(e.target.value)
                                            );
                                        },
                                        blur: function(e) {
                                          return t.$forceUpdate();
                                        },
                                      },
                                    }),
                                  ]),
                                ]),
                                n("div", { staticClass: "col-md-2" }, [
                                  n("div", { staticClass: "form-group" }, [
                                    n("label", { attrs: { for: "label" } }),
                                    n(
                                      "button",
                                      {
                                        staticClass:
                                          "btn btn-danger d-block mt-2",
                                        attrs: { type: "button" },
                                        on: { click: t.deleteCoordinate },
                                      },
                                      [
                                        n("i", {
                                          staticClass: "fas fa-trash-alt",
                                          attrs: { title: "Edit Data" },
                                        }),
                                      ]
                                    ),
                                  ]),
                                ]),
                              ])
                            : t._l(t.geometry, function(e, a) {
                                return n(
                                  "div",
                                  { key: a, staticClass: "row" },
                                  [
                                    n("div", { staticClass: "col-md-5" }, [
                                      n("div", { staticClass: "form-group" }, [
                                        n(
                                          "label",
                                          { attrs: { for: "label" } },
                                          [t._v("X")]
                                        ),
                                        n("input", {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model.number",
                                              value: e[0],
                                              expression: "item[0]",
                                              modifiers: { number: !0 },
                                            },
                                          ],
                                          staticClass: "form-control",
                                          attrs: {
                                            type: "number",
                                            step: ".00000000001",
                                            id: "label",
                                          },
                                          domProps: { value: e[0] },
                                          on: {
                                            input: function(n) {
                                              n.target.composing ||
                                                t.$set(
                                                  e,
                                                  0,
                                                  t._n(n.target.value)
                                                );
                                            },
                                            blur: function(e) {
                                              return t.$forceUpdate();
                                            },
                                          },
                                        }),
                                      ]),
                                    ]),
                                    n("div", { staticClass: "col-md-5" }, [
                                      n("div", { staticClass: "form-group" }, [
                                        n(
                                          "label",
                                          { attrs: { for: "label" } },
                                          [t._v("Y")]
                                        ),
                                        n("input", {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model.number",
                                              value: e[1],
                                              expression: "item[1]",
                                              modifiers: { number: !0 },
                                            },
                                          ],
                                          staticClass: "form-control",
                                          attrs: {
                                            type: "number",
                                            step: ".00000000001",
                                            id: "label",
                                          },
                                          domProps: { value: e[1] },
                                          on: {
                                            input: function(n) {
                                              n.target.composing ||
                                                t.$set(
                                                  e,
                                                  1,
                                                  t._n(n.target.value)
                                                );
                                            },
                                            blur: function(e) {
                                              return t.$forceUpdate();
                                            },
                                          },
                                        }),
                                      ]),
                                    ]),
                                    n("div", { staticClass: "col-md-2" }, [
                                      n("div", { staticClass: "form-group" }, [
                                        n("label", { attrs: { for: "label" } }),
                                        n(
                                          "button",
                                          {
                                            staticClass:
                                              "btn btn-danger d-block mt-2",
                                            attrs: { type: "button" },
                                            on: {
                                              click: function(e) {
                                                return t.deleteCoordinate(a);
                                              },
                                            },
                                          },
                                          [
                                            n("i", {
                                              staticClass: "fas fa-trash-alt",
                                              attrs: { title: "Edit Data" },
                                            }),
                                          ]
                                        ),
                                      ]),
                                    ]),
                                  ]
                                );
                              }),
                        ],
                        2
                      )
                    : t._e(),
                ]),
                n("div", { staticClass: "row " }, [
                  n("div", { staticClass: "col-md-12 form-group" }, [
                    n(
                      "button",
                      {
                        staticClass: "btn btn-primary float-right",
                        attrs: {
                          type: "button",
                          disabled: !t.canAddCoordinate,
                        },
                        on: { click: t.addCoordinate },
                      },
                      [
                        t._v(
                          "\n          " +
                            t._s(t.$t("form.dataForm.addCoordinate")) +
                            "\n        "
                        ),
                      ]
                    ),
                  ]),
                ]),
              ]
            ),
          ],
          1
        );
      },
      bt = [];
    n("6b54"), n("7514");
    function yt(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function Ct(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? yt(Object(n), !0).forEach(function(e) {
              Object(R["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : yt(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var _t,
      Et,
      St = {
        name: "DynamicFormInput",
        props: {
          name: { type: String },
          type: { type: String },
          value: { type: String },
        },
        render: function(t) {
          var e = this,
            n = 1,
            a = "text";
          switch (this.type) {
            case "int":
              a = "number";
              break;
            case "string":
              a = "string";
              break;
            case "double":
              (a = "number"), (n = ".01");
              break;
          }
          var i = {
            domProps: { value: this.value, name: this.name },
            attrs: Ct({ type: a }, "double" === this.type && { step: n }),
            on: {
              change: function(t) {
                var n = t.target,
                  a = n.value,
                  i = n.name;
                e.$emit("onChange", i, a);
              },
            },
          };
          "double" === a && i.attrs["step"];
          var r = t("input", i);
          return r;
        },
      },
      Ot = St,
      Tt = Object(O["a"])(Ot, _t, Et, !1, null, null, null),
      wt = Tt.exports,
      Lt = {
        components: { DynamicFormInput: wt },
        props: {
          layerId: { type: Number, required: !0 },
          gid: { type: Number, required: !1 },
        },
        data: function() {
          return {
            isModalHidingForGeometrySelection: !1,
            columns: [],
            geometryType: "",
            geometry: null,
            geometryBtnSelect: "",
            columnData: [],
            drawTypeEnum: pt["b"],
            icons: dt["b"],
          };
        },
        mounted: function() {},
        computed: {
          canAddCoordinate: function() {
            var t =
              this.geometryType &&
              ("point" !== this.geometryType ||
                ("point" === this.geometryType && null == this.geometry) ||
                0 == this.geometry.length);
            return t;
          },
          isGeometryExist: function() {
            var t = this.geometry && this.geometry.length > 0;
            return t;
          },
          bbox: function() {
            return X["k"].getBbox();
          },
          isEdit: function() {
            return this.gid && 0 !== this.gid;
          },
          activeTableService: function() {
            return X["j"].getTableActiveService();
          },
          pointGeometryVisibility: function() {
            return this.geometryType && "point" === this.geometryType;
          },
          lineGeometryVisibility: function() {
            return (
              this.geometryType &&
              ("linestring" === this.geometryType ||
                "multilinestring" === this.geometryType)
            );
          },
          polygonGeometryVisibility: function() {
            return (
              this.geometryType &&
              ("polygon" === this.geometryType ||
                "multipolygon" === this.geometryType)
            );
          },
        },
        methods: {
          resetData: function() {
            (this.isModalHidingForGeometrySelection = !1),
              (this.columns = []),
              (this.geometryType = ""),
              (this.geometry = null),
              (this.columnData = []);
          },
          resetCoordinates: function() {
            this.geometry = null;
          },
          deleteCoordinate: function(t) {
            (this.geometryBtnSelect = pt["b"].NONE),
              "point" === this.geometryType
                ? (this.geometry = null)
                : this.geometry.splice(t, 1);
          },
          addCoordinate: function() {
            this.geometryBtnSelect = pt["b"].NONE;
            var t = this.geometryType;
            if ("point" === t)
              this.geometry || (this.geometry = []),
                0 == this.geometry.length && (this.geometry = [1, 1]);
            else {
              this.geometry || (this.geometry = []);
              this.geometry.length;
              this.geometry.push([1, 1]);
            }
          },
          drawTypeOnChange: function(t) {
            var e = this,
              n = t.target.value,
              a = X["d"].getDynamicLayer(this.layerId),
              i = { id: a.id, type: a.type };
            if (
              (X["k"].deleteServiceFeatures(this.layerId),
              this.geometryBtnSelect === n)
            )
              (this.geometryBtnSelect = pt["b"].NONE), this.geometry;
            else {
              var r = { forService: i };
              (this.isModalHidingForGeometrySelection = !0),
                X["g"].hideDataAddEditModal(),
                X["j"].setTableUnvisible(),
                X["k"].pickDrawType(
                  n,
                  function() {
                    X["g"].showDataAddEditModal(),
                      (e.geometryBtnSelect = n),
                      (e.geometry = e.bbox),
                      X["k"].pickDrawType(e.drawTypeEnum.NONE),
                      X["j"].setTableVisible();
                  },
                  r
                );
            }
          },
          showGeometryModal: function() {
            X["g"].showGeometryModal(),
              (this.isModalHidingForGeometrySelection = !0),
              X["g"].hideDataAddEditModal();
          },
          onGeometryModalClose: function() {
            X["g"].showDataAddEditModal();
          },
          onSubmit: (function() {
            var t = Object(P["a"])(
              regeneratorRuntime.mark(function t() {
                var e, n;
                return regeneratorRuntime.wrap(
                  function(t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          (e = {
                            columns: this.columnData,
                            layerId: this.layerId,
                            geometryType: this.geometryType,
                            geometry: this.geometry
                              ? JSON.stringify(this.geometry)
                              : null,
                          }),
                            (n = this.isEdit),
                            n && (e.gid = this.gid),
                            N["a"].addOrEditData(e).then(function(t) {
                              n
                                ? K["c"].info(
                                    "The record will be updated after commit accepted "
                                  )
                                : K["c"].info(
                                    "The record will be created after commit accepted "
                                  ),
                                X["g"].hideDataAddEditModal();
                            });
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e() {
              return t.apply(this, arguments);
            }
            return e;
          })(),
          onModalOpen: (function() {
            var t = Object(P["a"])(
              regeneratorRuntime.mark(function t() {
                var e, n, a, i, r, o, s, c;
                return regeneratorRuntime.wrap(
                  function(t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          if (((e = null), (n = this.isEdit), !n)) {
                            t.next = 7;
                            break;
                          }
                          return (
                            (t.next = 5), N["a"].getItem(this.layerId, this.gid)
                          );
                        case 5:
                          (a = t.sent), (e = a);
                        case 7:
                          if (this.isModalHidingForGeometrySelection) {
                            t.next = 16;
                            break;
                          }
                          return (
                            (t.next = 10), N["a"].getTableInfo(this.layerId)
                          );
                        case 10:
                          (i = t.sent),
                            (r = i.columns),
                            (o = i.geometryType),
                            (r = r.filter(function(t) {
                              return "gid" !== t.columnName;
                            })),
                            n &&
                              (r.forEach(function(t) {
                                var n = e.find(function(e) {
                                    return e.columnName == t.columnName;
                                  }),
                                  a = n.value;
                                t.valueType;
                                a && (a = a.toString()), (t["value"] = a);
                              }),
                              (s = e.find(function(t) {
                                return "geometries" == t.columnName;
                              })),
                              s &&
                                ((c = JSON.parse(s.value)),
                                (this.geometry = "point" === o ? c[0] : c),
                                (this.geometryBtnSelect = o))),
                            (this.columns = r),
                            (this.geometryType = o);
                        case 16:
                          this.isModalHidingForGeometrySelection = !1;
                        case 17:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e() {
              return t.apply(this, arguments);
            }
            return e;
          })(),
          onModalClose: function() {
            this.isModalHidingForGeometrySelection ||
              (this.resetData(), X["k"].deleteServiceFeatures(this.layerId));
          },
          onInputChange: function(t, e) {
            var n = this.columnData.some(function(e) {
              return e.columnName && e.columnName === t;
            });
            n
              ? (this.columnData.find(function(e) {
                  return e.columnName === t;
                }).value = e)
              : this.columnData.push({ columnName: t, value: e });
          },
        },
      },
      kt = Lt,
      It = Object(O["a"])(kt, vt, bt, !1, null, null, null),
      At = It.exports;
    function xt(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function jt(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? xt(Object(n), !0).forEach(function(e) {
              Object(R["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : xt(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var Dt,
      Mt = {
        name: "DataTable",
        components: {
          Multiselect: F.a,
          Resizable: G.a,
          ImageUploadModal: ct,
          DataAddEditModal: At,
          FilterModal: ht,
        },
        data: function() {
          return {
            currentTabId: null,
            isColumnPopupShowing: !1,
            selectedGid: 0,
            resize: {
              handlers: ["t"],
              left: 0,
              top: window.innerHeight - 200,
              height: window.innerHeight,
              width: window.innerWidth,
              maxW: 1e4,
              maxH: window.innerHeight,
              minW: 150,
              minH: 200,
              fit: !0,
              event: "",
            },
          };
        },
        mounted: function() {
          this.scrollHandler();
        },
        created: function() {
          window.addEventListener("resize", this.update);
        },
        destroyed: function() {
          window.removeEventListener("resize", this.update);
        },
        watch: {
          isVisible: {
            handler: function() {
              this.resetScroll(), this.resetPaging();
            },
            deep: !0,
            immediate: !1,
          },
        },
        methods: {
          checkPermission: at,
          resetScroll: function() {
            this.$refs.dataTableContent &&
              this.$refs.dataTableContent.scrollTo(0, 0);
          },
          isEndOfData: function() {
            return this.paging.page * this.paging.limit > this.totalCount;
          },
          scrollHandler: (function() {
            var t = Object(P["a"])(
              regeneratorRuntime.mark(function t() {
                var e,
                  n,
                  a = this;
                return regeneratorRuntime.wrap(function(t) {
                  while (1)
                    switch ((t.prev = t.next)) {
                      case 0:
                        (e = document.getElementById("dataTable")),
                          (n = 0.01),
                          e.addEventListener(
                            "scroll",
                            (function() {
                              var t = Object(P["a"])(
                                regeneratorRuntime.mark(function t(i) {
                                  var r, o;
                                  return regeneratorRuntime.wrap(function(t) {
                                    while (1)
                                      switch ((t.prev = t.next)) {
                                        case 0:
                                          if (
                                            ((r =
                                              e.scrollTop + e.clientHeight >=
                                              e.scrollHeight -
                                                e.scrollHeight * n),
                                            !r ||
                                              a.paging.isBusy ||
                                              a.isEndOfData() ||
                                              (!nt["g"].isLocalService(
                                                a.activeService
                                              ) &&
                                                !nt["g"].isBunch(
                                                  a.activeService
                                                )))
                                          ) {
                                            t.next = 9;
                                            break;
                                          }
                                          return (
                                            (o = a.paging.page),
                                            (o += 1),
                                            a.isPagingBusy(!0),
                                            (a.paging = jt({}, a.paging, {
                                              page: o++,
                                            })),
                                            (t.next = 8),
                                            a.getDatas()
                                          );
                                        case 8:
                                          a.isPagingBusy(!1);
                                        case 9:
                                        case "end":
                                          return t.stop();
                                      }
                                  }, t);
                                })
                              );
                              return function(e) {
                                return t.apply(this, arguments);
                              };
                            })()
                          );
                      case 3:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            function e() {
              return t.apply(this, arguments);
            }
            return e;
          })(),
          isPagingBusy: function(t) {
            this.paging = jt({}, this.paging, { isBusy: t });
          },
          getDatas: (function() {
            var t = Object(P["a"])(
              regeneratorRuntime.mark(function t() {
                var e, n, a, i, r, o;
                return regeneratorRuntime.wrap(
                  function(t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          if (
                            ((e = this.activeService),
                            (n = nt["g"].isBunch(e)),
                            (a = {}),
                            (i = this.paging),
                            (r = null),
                            !n)
                          ) {
                            t.next = 12;
                            break;
                          }
                          return (
                            (a = e.layers.map(function(t, e) {
                              return { layerId: t.id, query: jt({}, t.query) };
                            })),
                            (t.next = 9),
                            N["a"].getIntersectedData(e.id, {
                              layerQueries: a,
                              paging: i,
                            })
                          );
                        case 9:
                          (r = t.sent), (t.next = 16);
                          break;
                        case 12:
                          return (
                            (a = jt({}, e.query, { paging: i })),
                            (t.next = 15),
                            N["a"].getData(e.id, a)
                          );
                        case 15:
                          r = t.sent;
                        case 16:
                          (o = r.features),
                            (this.tableData.features = [].concat(
                              Object(v["a"])(this.tableData.features),
                              Object(v["a"])(o)
                            ));
                        case 18:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e() {
              return t.apply(this, arguments);
            }
            return e;
          })(),
          resetPaging: function() {
            this.paging = { isBusy: !1, page: 1, limit: 25 };
          },
          toggleIsVisible: function() {
            X["k"].deleteServiceFeatures(this.activeService.id),
              X["j"].setTableUnvisible();
          },
          togglePopup: function(t) {
            this.isColumnPopupShowing = !this.isColumnPopupShowing;
          },
          showFilterModal: function() {
            X["g"].showFilterModal();
          },
          addData: function() {
            var t = this;
            new Promise(function(e, n) {
              (t.selectedGid = 0), e();
            }).then(function(t) {
              X["g"].showDataAddEditModal();
            });
          },
          editData: function(t) {
            var e = this;
            new Promise(function(n, a) {
              (e.selectedGid = t), n();
            }).then(function(t) {
              X["g"].showDataAddEditModal();
            });
          },
          uploadImage: function(t) {
            var e = this;
            new Promise(function(n, a) {
              (e.selectedGid = t), n();
            }).then(function(t) {
              X["g"].showImageUploadModal();
            });
          },
          focusToGeometry: function(t) {
            X["e"].focusToGeometry(t.geometry);
          },
          fetchFullData: (function() {
            var t = Object(P["a"])(
              regeneratorRuntime.mark(function t() {
                var e, n, a, i, r, o;
                return regeneratorRuntime.wrap(
                  function(t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          if (
                            ((e = this.activeService),
                            (n = nt["g"].isBunch(e)),
                            (a = null),
                            (i = null),
                            (r = { page: 1, limit: this.totalCount }),
                            !n)
                          ) {
                            t.next = 12;
                            break;
                          }
                          return (
                            (a = e.layers.map(function(t, e) {
                              return { layerId: t.id, query: jt({}, t.query) };
                            })),
                            (t.next = 9),
                            N["a"].getIntersectedData(e.id, {
                              layerQueries: a,
                              paging: r,
                            })
                          );
                        case 9:
                          (i = t.sent), (t.next = 16);
                          break;
                        case 12:
                          return (
                            (a = jt({}, e.query, {
                              paging: r,
                              isGeometryDataExist: !1,
                            })),
                            (t.next = 15),
                            N["a"].getData(e.id, a)
                          );
                        case 15:
                          i = t.sent;
                        case 16:
                          return (
                            (o = i.features.map(function(t, e) {
                              return t.attributes;
                            })),
                            t.abrupt("return", o)
                          );
                        case 18:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e() {
              return t.apply(this, arguments);
            }
            return e;
          })(),
          featuresToExcel: function() {
            for (var t = [], e = 0; e < this.tableData.length; e++)
              t[e] = this.tableData[e].attributes;
            return t;
          },
          selectColumns: function(t, e, n) {
            var a = n.target.checked;
            if (a) this.checkedColumns.push(e);
            else {
              var i = this.checkedColumns.findIndex(function(t) {
                return t === e;
              });
              this.checkedColumns.splice(i, 1);
            }
          },
          resizeHandler: function(t) {
            (this.resize.width = t.width),
              (this.resize.height = t.height),
              (this.resize.left = t.left),
              (this.resize.top = t.top),
              (this.resize.event = t.eventName),
              "mount" === t.eventName && (this.resize.height = 200);
          },
          update: function() {
            (this.resize.top = window.innerHeight - 200),
              (this.resize.height = 200),
              (this.resize.width = window.innerWidth),
              (this.resize.maxH = window.innerHeight),
              this.$forceUpdate();
          },
        },
        computed: {
          isActiveServiceLocal: function() {
            return nt["g"].isLocalService(this.activeService);
          },
          isVisible: function() {
            return X["j"].getTableVisibility();
          },
          loading: function() {
            return X["j"].getTableLoadingStatus();
          },
          totalCount: function() {
            return this.tableData.totalCount;
          },
          paging: {
            get: function() {
              return X["j"].getTablePaging();
            },
            set: function(t) {
              X["j"].setTablePaging(t);
            },
          },
          tableName: function() {
            return this.tableData.tableName;
          },
          tableHeaders: function() {
            return this.tableData.tableHeaders;
          },
          tableStackedHeaders: {
            get: function() {
              return this.tableData.tableStackedHeaders;
            },
            set: function(t) {
              this.$store.dispatch("saveDatatableCheckedColumns", t);
            },
          },
          tableHeadersWithAlias: function() {
            return this.tableData.tableHeadersWithAlias;
          },
          checkedColumnsData: {
            get: function() {
              return this.tableData.checkedColumnsData;
            },
            set: function(t) {
              this.$store.dispatch("saveDatatableCheckedColumnsData", t);
            },
          },
          checkedColumns: {
            get: function() {
              return this.tableData.checkedColumns;
            },
            set: function(t) {
              this.$store.dispatch("saveDatatableCheckedColumns", t);
            },
          },
          tableData: {
            get: function() {
              var t = X["j"].getTableData();
              return t;
            },
            set: function(t) {
              X["j"].setTableData(t);
            },
          },
          editDataGid: {
            get: function() {
              var t = X["j"].getEditDataGid();
              return t;
            },
            set: function(t) {
              X["j"].setEditDataGid(t);
            },
          },
          activeService: function() {
            return X["j"].getTableActiveService();
          },
        },
        filters: {
          checkEmpty: function(t) {
            return "number" !== typeof t ? 0 : t;
          },
        },
      },
      Rt = Mt,
      Pt = (n("bf17"), Object(O["a"])(Rt, D, M, !1, null, null, null)),
      Bt = Pt.exports,
      Ft = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n("div", { staticClass: "sidebar" }, [
          n("div", { staticClass: "menu" }, [
            n(
              "div",
              { staticClass: "menu--top" },
              t._l(t.topMenu, function(e) {
                return n("div", { key: e.key, staticClass: "menu__item" }, [
                  n(
                    "button",
                    {
                      staticClass: "menu__item__button",
                      attrs: { title: e.label },
                      on: { click: e.click },
                    },
                    [
                      e.key == t.menuTabEnum.PROFILE && t.notificationCount > 0
                        ? n("span", { staticClass: "badge badge-notify" }, [
                            t._v(t._s(t.notificationCount)),
                          ])
                        : t._e(),
                      n("img", {
                        class: { active: t.activeMenuTab === e.key },
                        attrs: { src: e.image, alt: "" },
                      }),
                    ]
                  ),
                ]);
              }),
              0
            ),
            n(
              "div",
              { staticClass: "menu--bottom" },
              t._l(t.bottomMenu, function(e) {
                return n("div", { key: e.key, staticClass: "menu__item" }, [
                  n(
                    "button",
                    {
                      staticClass: "menu__item__button",
                      attrs: { title: e.label },
                      on: { click: e.click },
                    },
                    [
                      n("img", {
                        class: { active: t.activeMenuTab === e.key },
                        attrs: { src: e.image, alt: "" },
                      }),
                    ]
                  ),
                ]);
              }),
              0
            ),
          ]),
          t.isProfileTabActive
            ? n("div", { staticClass: "profile-popup" }, [
                n(
                  "div",
                  {
                    staticClass: "profile-popup-item",
                    staticStyle: { cursor: "pointer" },
                    on: { click: t.showProfileModal },
                  },
                  [n("span", [t._v(t._s(t.$t("menu.profile.title")))])]
                ),
                n(
                  "div",
                  {
                    staticClass: "profile-popup-item",
                    staticStyle: { cursor: "pointer" },
                    on: { click: t.logout },
                  },
                  [
                    n("span", [t._v(t._s(t.$t("auth.logout")))]),
                    n("i", {
                      staticClass: "fas fa-power-off ml-1",
                      attrs: { title: "Log out" },
                    }),
                  ]
                ),
              ])
            : t._e(),
          t.isBaseMapTypeTabActive
            ? n(
                "div",
                { staticClass: "layer-types" },
                t._l(t.baseLayouts, function(e, a) {
                  return n(
                    "div",
                    {
                      key: a,
                      staticClass: "layer-types__item",
                      class: { active: t.activeLayerType === e.name },
                      on: {
                        click: function(e) {
                          return t.setBaseLayout(a);
                        },
                      },
                    },
                    [t._v("\n      " + t._s(e.name) + "\n    ")]
                  );
                }),
                0
              )
            : t._e(),
          t.isDynamicLayerTabActive
            ? n("div", { staticClass: "list layers" }, [
                n("div", { staticClass: "list__header" }, [
                  t._v(t._s(t.$t("menu.dynamicLayers"))),
                ]),
                n("div", { staticClass: "list__tabs" }, [
                  n(
                    "div",
                    {
                      staticClass: "tab",
                      class: {
                        "tab--active": "dynamicTab" === t.dynamicActiveTab,
                      },
                      on: {
                        click: function(e) {
                          return t.setDynamicActiveTab("dynamicTab");
                        },
                      },
                    },
                    [
                      t._v(
                        "\n        " +
                          t._s(t.$t("menu.layerTabs.standard")) +
                          "\n      "
                      ),
                    ]
                  ),
                  n(
                    "div",
                    {
                      staticClass: "tab",
                      class: {
                        "tab--active": "bunchTab" === t.dynamicActiveTab,
                      },
                      on: {
                        click: function(e) {
                          return t.setDynamicActiveTab("bunchTab");
                        },
                      },
                    },
                    [
                      t._v(
                        "\n        " +
                          t._s(t.$t("menu.layerTabs.customized")) +
                          "\n      "
                      ),
                    ]
                  ),
                  n(
                    "div",
                    {
                      staticClass: "tab",
                      class: {
                        "tab--active": "favoriteTab" === t.dynamicActiveTab,
                      },
                      on: {
                        click: function(e) {
                          return t.setDynamicActiveTab("favoriteTab");
                        },
                      },
                    },
                    [
                      t._v(
                        "\n        " +
                          t._s(t.$t("menu.layerTabs.favorites")) +
                          "\n      "
                      ),
                    ]
                  ),
                ]),
                n("div", { staticClass: "list__search" }, [
                  n("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: t.dynamicSearchInput,
                        expression: "dynamicSearchInput",
                      },
                    ],
                    attrs: {
                      type: "text",
                      placeholder: t.$t("general.search"),
                    },
                    domProps: { value: t.dynamicSearchInput },
                    on: {
                      input: function(e) {
                        e.target.composing ||
                          (t.dynamicSearchInput = e.target.value);
                      },
                    },
                  }),
                ]),
                "dynamicTab" === t.dynamicActiveTab
                  ? n(
                      "ul",
                      {
                        staticClass:
                          "list__content list__content--parent custom-scrollbar",
                      },
                      [
                        n("LayerTree", {
                          attrs: {
                            list: t.dynamicLayersList,
                            dragOptions: { disabled: !1 },
                            layerType: t.serviceTypeEnum.DYNAMIC_LAYER,
                          },
                          on: {
                            updateList: function(e) {
                              t.dynamicLayersList = e;
                            },
                          },
                        }),
                      ],
                      1
                    )
                  : t._e(),
                "bunchTab" === t.dynamicActiveTab
                  ? n(
                      "ul",
                      {
                        staticClass:
                          "list__content list__content--parent custom-scrollbar",
                      },
                      [
                        n("LayerTree", {
                          attrs: {
                            list: t.bunchLayerList,
                            dragOptions: { disabled: !1 },
                            layerType: t.serviceTypeEnum.BUNCH,
                          },
                          on: {
                            updateList: function(e) {
                              t.bunchLayerList = e;
                            },
                          },
                        }),
                      ],
                      1
                    )
                  : t._e(),
                "favoriteTab" === t.dynamicActiveTab
                  ? n(
                      "ul",
                      {
                        staticClass:
                          "list__content list__content--parent custom-scrollbar",
                      },
                      [
                        n("LayerTree", {
                          attrs: {
                            list: t.favoriteDynamicLayerList,
                            dragOptions: { disabled: !0 },
                            layerType: t.serviceTypeEnum.DYNAMIC_LAYER,
                          },
                        }),
                      ],
                      1
                    )
                  : t._e(),
                "bunchTab" === t.dynamicActiveTab
                  ? n(
                      "button",
                      {
                        staticClass: "btn btn--add-new",
                        on: { click: t.openComputedLayerModal },
                      },
                      [
                        n("i", { staticClass: "fas fa-plus" }),
                        t._v("   " + t._s(t.$t("button.add")) + "\n    "),
                      ]
                    )
                  : t._e(),
              ])
            : t._e(),
          t.isBaseLayerTabActive
            ? n("div", { staticClass: "list layers" }, [
                n("div", { staticClass: "list__header" }, [
                  t._v(t._s(t.$t("menu.baseLayers"))),
                ]),
                n("div", { staticClass: "list__tabs" }, [
                  n(
                    "div",
                    {
                      staticClass: "tab",
                      class: {
                        "tab--active": "baseTab" === t.basemapActiveTab,
                      },
                      on: {
                        click: function(e) {
                          return t.setBasemapActiveTab("baseTab");
                        },
                      },
                    },
                    [
                      t._v(
                        "\n        " +
                          t._s(t.$t("menu.layerTabs.standard")) +
                          "\n      "
                      ),
                    ]
                  ),
                  n(
                    "div",
                    {
                      staticClass: "tab",
                      class: {
                        "tab--active": "favoriteTab" === t.basemapActiveTab,
                      },
                      on: {
                        click: function(e) {
                          return t.setBasemapActiveTab("favoriteTab");
                        },
                      },
                    },
                    [
                      t._v(
                        "\n        " +
                          t._s(t.$t("menu.layerTabs.favorites")) +
                          "\n      "
                      ),
                    ]
                  ),
                ]),
                n("div", { staticClass: "list__search" }, [
                  n("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: t.baseSearchInput,
                        expression: "baseSearchInput",
                      },
                    ],
                    attrs: {
                      type: "text",
                      placeholder: t.$t("general.search"),
                    },
                    domProps: { value: t.baseSearchInput },
                    on: {
                      input: function(e) {
                        e.target.composing ||
                          (t.baseSearchInput = e.target.value);
                      },
                    },
                  }),
                ]),
                "baseTab" === t.basemapActiveTab
                  ? n(
                      "ul",
                      {
                        staticClass:
                          "list__content list__content--parent custom-scrollbar",
                      },
                      [
                        n("LayerTree", {
                          attrs: {
                            list: t.baselayerList,
                            dragOptions: { disabled: !1 },
                            layerType: t.serviceTypeEnum.BASE_LAYER,
                          },
                          on: {
                            updateList: function(e) {
                              t.baselayerList = e;
                            },
                          },
                        }),
                      ],
                      1
                    )
                  : t._e(),
                "favoriteTab" === t.basemapActiveTab
                  ? n(
                      "ul",
                      {
                        staticClass:
                          "list__content list__content--parent custom-scrollbar",
                      },
                      [
                        n("LayerTree", {
                          attrs: {
                            list: t.favoriteBaseLayerList,
                            dragOptions: { disabled: !0 },
                            layerType: t.serviceTypeEnum.BASE_LAYER,
                          },
                        }),
                      ],
                      1
                    )
                  : t._e(),
              ])
            : t._e(),
          t.isToolTabActive
            ? n("div", { staticClass: "list tools" }, [
                n("div", { staticClass: "list__header" }, [
                  t._v(t._s(t.$t("menu.tool.title"))),
                ]),
                n(
                  "ul",
                  {
                    staticClass:
                      "list__content list__content--parent custom-scrollbar",
                  },
                  t._l(t.toolList, function(e) {
                    return n("li", { key: e.key, staticClass: "list__item" }, [
                      n(
                        "div",
                        { staticClass: "item__header", on: { click: e.click } },
                        [
                          n("span", { staticClass: "title" }, [
                            n("img", {
                              staticClass: "pre",
                              attrs: { src: e.image, alt: "" },
                            }),
                            t._v(
                              "\n            " + t._s(e.label) + "\n          "
                            ),
                          ]),
                        ]
                      ),
                    ]);
                  }),
                  0
                ),
              ])
            : t._e(),
        ]);
      },
      Nt = [],
      $t = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "Draggable",
          t._b(
            {
              on: {
                start: function(e) {
                  t.isDragging = !0;
                },
                end: t.onDraggableMoveCallback,
              },
              model: {
                value: t.data,
                callback: function(e) {
                  t.data = e;
                },
                expression: "data",
              },
            },
            "Draggable",
            t.dragOptions,
            !1
          ),
          t._l(t.data, function(e, a) {
            return n("layer-tree-item", {
              key: e.name + a,
              attrs: {
                item: e,
                layerType: t.layerType,
                loop: 1,
                dragOptions: t.dragOptions,
              },
              on: {
                updateList: function(e) {
                  var n = t.data;
                  (n[a] = e), t.$emit("updateList", n);
                },
              },
            });
          }),
          1
        );
      },
      Gt = [],
      Vt = n("b76a"),
      Ut = n.n(Vt),
      zt = function() {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a("li", { staticClass: "list__item" }, [
          a(
            "span",
            {
              staticClass: "item__header",
              style: "padding-left: " + t.paddingLeft,
            },
            [
              a(
                "span",
                { staticClass: "title" },
                [
                  t.isCategory
                    ? a("i", { staticClass: "far fa-folder pre" })
                    : a("ToggleSwitch", {
                        staticClass: "pre",
                        model: {
                          value: t.switchModel,
                          callback: function(e) {
                            t.switchModel = e;
                          },
                          expression: "switchModel",
                        },
                      }),
                  t._v(
                    "\n      " +
                      t._s(
                        t.isLayer
                          ? t.isCategory
                            ? t.data.name
                            : t.data.showingLabel
                          : t.data.name
                      ) +
                      "\n    "
                  ),
                ],
                1
              ),
              t.caretIconsVisibility
                ? a("span", [
                    a("i", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: t.subListVisibility,
                          expression: "subListVisibility",
                        },
                      ],
                      staticClass: "fas fa-caret-down",
                      on: { click: t.toggleSubList },
                    }),
                    a("i", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: !t.subListVisibility,
                          expression: "!subListVisibility",
                        },
                      ],
                      staticClass: "fas fa-caret-left",
                      on: { click: t.toggleSubList },
                    }),
                  ])
                : t._e(),
              t.operationsVisibility
                ? a("span", { staticClass: "icons" }, [
                    t.colorIconVisibility
                      ? a("img", {
                          attrs: { src: n("9f3c"), alt: "" },
                          on: { click: t.toggleColorPicker },
                        })
                      : t._e(),
                    t.tableIconVisibility
                      ? a("img", {
                          attrs: { src: n("a93e"), alt: "" },
                          on: {
                            click: function(e) {
                              return t.getTableData(t.data);
                            },
                          },
                        })
                      : t._e(),
                    t.deleteIconVisibility
                      ? a("img", {
                          attrs: { src: n("a91f"), alt: "" },
                          on: { click: t.deleteBunch },
                        })
                      : t._e(),
                  ])
                : t._e(),
            ]
          ),
          t.colorPickerVisibility
            ? a(
                "div",
                { staticClass: "mt-2 item__colorpicker__content" },
                [
                  t.isLayerColorExist
                    ? a(
                        "div",
                        { staticStyle: { display: "contents" } },
                        [
                          a(
                            "a",
                            {
                              staticClass: "condition-modal-btn ",
                              attrs: { role: "button" },
                              on: { click: t.showConditionModal },
                            },
                            [
                              t._v(
                                t._s(t.$t("general.showConditionsButtonTitle"))
                              ),
                            ]
                          ),
                          a("ColorConditionInfoModal", {
                            attrs: { data: t.conditions },
                          }),
                          t.isLayerColorExist
                            ? a("v-select", {
                                staticClass: "condition__select",
                                attrs: {
                                  clearable: !1,
                                  label: "title",
                                  options: t.conditions,
                                  reduce: function(t) {
                                    return t.id;
                                  },
                                },
                                model: {
                                  value: t.selectedColorConditionId,
                                  callback: function(e) {
                                    t.selectedColorConditionId = e;
                                  },
                                  expression: "selectedColorConditionId",
                                },
                              })
                            : t._e(),
                        ],
                        1
                      )
                    : t._e(),
                  a("LayerColorPicker", {
                    attrs: {
                      borderColor: t.currentConditionColor.borderColor,
                      fillColor: t.currentConditionColor.fillColor,
                    },
                    on: {
                      onSave: t.onColorPickerSave,
                      onClose: t.colorPickerOnClose,
                    },
                  }),
                ],
                1
              )
            : t._e(),
          t.data.layers && t.subListVisibility
            ? a(
                "ul",
                { staticClass: "list__content" },
                [
                  a(
                    "Draggable",
                    t._b(
                      {
                        on: {
                          start: function(e) {
                            t.isDragging = !0;
                          },
                          end: t.onDraggableMoveCallback,
                        },
                        model: {
                          value: t.children,
                          callback: function(e) {
                            t.children = e;
                          },
                          expression: "children",
                        },
                      },
                      "Draggable",
                      t.dragOptions,
                      !1
                    ),
                    t._l(t.children, function(e, n) {
                      return a("layer-tree-item", {
                        key: e.name + n,
                        attrs: {
                          item: e,
                          parent: t.data,
                          layerType: t.layerType,
                          loop: t.loop + 1,
                          dragOptions: t.dragOptions,
                        },
                        on: {
                          updateList: function(e) {
                            var a = t.data;
                            (a.children[n] = e), t.$emit("updateList", a);
                          },
                        },
                      });
                    }),
                    1
                  ),
                  a(
                    "Draggable",
                    t._b(
                      {
                        on: {
                          start: function(e) {
                            t.isDragging = !0;
                          },
                          end: t.onDraggableMoveCallback,
                        },
                        model: {
                          value: t.layers,
                          callback: function(e) {
                            t.layers = e;
                          },
                          expression: "layers",
                        },
                      },
                      "Draggable",
                      t.dragOptions,
                      !1
                    ),
                    t._l(t.layers, function(e, n) {
                      return a("layer-tree-item", {
                        key: e.name + n,
                        attrs: {
                          item: e,
                          parent: t.data,
                          layerType: t.layerType,
                          loop: t.loop + 1,
                          dragOptions: t.dragOptions,
                        },
                        on: {
                          updateList: function(e) {
                            var a = t.data;
                            (a.layers[n] = e), t.$emit("updateList", a);
                          },
                        },
                      });
                    }),
                    1
                  ),
                ],
                1
              )
            : t._e(),
        ]);
      },
      Ht = [],
      qt = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n("label", { staticClass: "toggle-switch" }, [
          n("input", {
            attrs: { type: "checkbox" },
            domProps: { checked: t.value },
            on: { change: t.onChange },
          }),
          n("span", { staticClass: "slider" }),
        ]);
      },
      Qt = [],
      Yt = {
        name: "ToggleSwitch",
        props: { value: { type: Boolean } },
        methods: {
          onChange: function(t) {
            this.$emit("input", t);
          },
        },
      },
      Zt = Yt,
      Wt = (n("16f4"), Object(O["a"])(Zt, qt, Qt, !1, null, null, null)),
      Kt = Wt.exports,
      Xt = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "CustomModal",
          {
            attrs: {
              name: "colorConditionInfoModal",
              maxWidth: 300,
              minHeight: 200,
              appendToBody: !0,
              title: "Legenda",
            },
          },
          [
            n(
              "div",
              { staticClass: "row" },
              t._l(t.data, function(e, a) {
                return n("div", { key: a, staticClass: "col-md-12 " }, [
                  n("span", {
                    staticClass: "condition-color-box",
                    style: {
                      "background-color": e.fillColor,
                      border: "0.2rem solid " + e.borderColor,
                    },
                  }),
                  n("span", { staticClass: "m-1 condition-text" }, [
                    t._v("\n        " + t._s(e.title) + "\n      "),
                  ]),
                ]);
              }),
              0
            ),
          ]
        );
      },
      Jt = [],
      te = {
        name: "ColorConditionInfoModal",
        props: {
          data: {
            type: Array,
            default: function() {
              return [];
            },
          },
        },
      },
      ee = te,
      ne = (n("a83c"), Object(O["a"])(ee, Xt, Jt, !1, null, "2dad43a8", null)),
      ae = ne.exports,
      ie = n("8bb0"),
      re = {
        name: "LayerTreeItem",
        components: {
          ToggleSwitch: Kt,
          Draggable: Ut.a,
          LayerColorPicker: w,
          ColorConditionInfoModal: ae,
        },
        props: {
          item: { type: Object, required: !0 },
          parent: { type: Object },
          loop: { type: Number, default: 1 },
          layerType: { type: String, required: !0, default: "" },
          dragOptions: {
            type: Object,
            default: function() {
              return { disabled: !1 };
            },
          },
        },
        data: function() {
          return {
            subListVisibility: !1,
            layerIsSelected: !1,
            isDragging: !1,
            isColorConditionInfoModalVisible: !1,
            selectedColorConditionId: -1,
          };
        },
        mounted: function() {},
        computed: {
          data: {
            get: function() {
              return this.item;
            },
            set: function(t) {
              this.$emit("updateList", t);
            },
          },
          children: {
            get: function() {
              return this.data.children;
            },
            set: function(t) {
              var e = this.data;
              (e.children = t), (this.data = e);
            },
          },
          layers: {
            get: function() {
              return this.data.layers;
            },
            set: function(t) {
              var e = this.data;
              (e.layers = t), (this.data = e);
            },
          },
          currentConditionColor: function() {
            var t = this,
              e = this.conditions.find(function(e) {
                return e.id === parseInt(t.selectedColorConditionId);
              }),
              n = e.borderColor,
              a = e.fillColor;
            return { borderColor: n, fillColor: a };
          },
          conditions: function() {
            var t = X["d"].getLayerColorConditionList(this.data);
            return t;
          },
          switchModel: {
            get: function() {
              return this.data.isSelected;
            },
            set: function(t) {
              !1 === t.target.checked && (this.subListVisibility = !1),
                this.layerPicker(t);
            },
          },
          paddingLeft: function() {
            return 16 * this.loop + "px";
          },
          isCategory: function() {
            return nt["g"].isCategory(this.data);
          },
          isLayer: function() {
            return nt["g"].isLayer(this.data);
          },
          caretIconsVisibility: function() {
            return (
              this.isCategory ||
              (nt["g"].isLayer(this.data) &&
                nt["g"].isDynamicFromArcgis(this.data) &&
                this.data.isSelected)
            );
          },
          tableIconVisibility: function() {
            return (
              this.data.isSelected &&
              (nt["g"].isSublayer(this.data) ||
                nt["g"].isBunch(this.data) ||
                (nt["g"].isLayer(this.data) &&
                  nt["g"].isDynamicFromLocal(this.data)))
            );
          },
          isLayerColorExist: function() {
            return (
              this.data.layerColor && this.data.layerColor.conditions.length > 0
            );
          },
          colorIconVisibility: function() {
            return (
              this.data.isSelected &&
              this.data.isColorEnabled &&
              (nt["g"].isSublayer(this.data) ||
                nt["g"].isBunch(this.data) ||
                (nt["g"].isLayer(this.data) &&
                  nt["g"].isDynamicFromLocal(this.data)))
            );
          },
          deleteIconVisibility: function() {
            return this.data.isColorEnabled && nt["g"].isBunch(this.data);
          },
          operationsVisibility: function() {
            return (
              this.tableIconVisibility ||
              this.colorIconVisibility ||
              this.deleteIconVisibility
            );
          },
          colorPickerVisibility: function() {
            return (
              this.data.isSelected &&
              this.activeColorPickerId === this.getLayerId()
            );
          },
          activeColorPickerId: {
            get: function() {
              return this.$store.getters.activeColorPickerId;
            },
            set: function(t) {
              this.$store.dispatch("SAVE_ACTIVE_COLOR_PICKER_ID", t);
            },
          },
        },
        methods: {
          showConditionModal: function() {
            (this.isColorConditionInfoModalVisible = !0),
              X["g"].showColorConditionInfoModal();
          },
          updateList: function(t) {
            this.$emit("updateList", t);
          },
          onDraggableMoveCallback: function() {
            X["i"].onDraggableMoveCallback(this.layerType);
          },
          toggleSubList: function() {
            this.subListVisibility = !this.subListVisibility;
          },
          onColorPickerSave: function(t) {
            var e = this;
            new Promise(function(n, a) {
              X["i"].saveColor(e.data, t, e.selectedColorConditionId), n();
            }).then(function() {
              X["e"].refreshService(e.data);
            });
          },
          colorPickerOnClose: function() {
            this.activeColorPickerId = null;
          },
          layerPicker: function(t) {
            var e = t.target.checked;
            nt["g"].isSublayer(this.data)
              ? X["i"].selectSubLayer(
                  this.parent,
                  this.parent.order,
                  this.data.id,
                  e
                )
              : X["i"].selectService(this.data, e);
          },
          getTableData: (function() {
            var t = Object(P["a"])(
              regeneratorRuntime.mark(function t(e) {
                var n;
                return regeneratorRuntime.wrap(function(t) {
                  while (1)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (
                          (n = nt["g"].isSublayer(e) ? e.parent : e),
                          (t.next = 3),
                          X["j"].getTable(n)
                        );
                      case 3:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
          getLayerId: function() {
            var t = 0;
            return (
              nt["g"].isSublayer(this.data)
                ? (t = this.data.uid)
                : nt["g"].isLayer(this.data) &&
                  nt["g"].isDynamicFromLocal(this.data) &&
                  (t = this.data.id),
              t
            );
          },
          toggleColorPicker: function() {
            this.activeColorPickerId === this.getLayerId()
              ? (this.activeColorPickerId = null)
              : (this.activeColorPickerId = this.getLayerId());
          },
          deleteBunch: function() {
            var t = this;
            K["c"].areYouSureDeleteRecord(function(e) {
              e.isConfirmed &&
                (ie["a"].delete(t.data.id).then(function(e) {
                  t.$store.dispatch("fetchBunchList"),
                    X["e"].deleteService(t.data);
                }),
                K["c"].deleted());
            });
          },
        },
      },
      oe = re,
      se = (n("8a95"), Object(O["a"])(oe, zt, Ht, !1, null, "f6e55152", null)),
      ce = se.exports,
      le = {
        name: "LayerTree",
        components: { Draggable: Ut.a, LayerTreeItem: ce },
        props: {
          layerType: { required: !0, type: String },
          list: { type: Array, required: !0 },
          dragOptions: {
            type: Object,
            default: function() {
              return { disabled: !1 };
            },
          },
        },
        data: function() {
          return { isDragging: !1 };
        },
        methods: {
          onDraggableMoveCallback: function() {
            X["i"].onDraggableMoveCallback(this.layerType);
          },
        },
        computed: {
          data: {
            get: function() {
              return this.list;
            },
            set: function(t) {
              this.$emit("updateList", t);
            },
          },
        },
      },
      ue = le,
      de = Object(O["a"])(ue, $t, Gt, !1, null, null, null),
      pe = de.exports,
      fe = {
        name: "Sidebar",
        components: { LayerTree: pe },
        data: function() {
          return {
            dynamicSearchInput: "",
            baseSearchInput: "",
            serviceTypeEnum: pt["f"],
            activeLayerType: "gray",
            dynamicActiveTab: "dynamicTab",
            basemapActiveTab: "baseTab",
            menuTabEnum: pt["c"],
          };
        },
        mounted: function() {},
        computed: {
          baseLayouts: function() {
            return X["e"].getBaseLayouts();
          },
          isProfileTabActive: function() {
            return this.activeMenuTab === pt["c"].PROFILE;
          },
          notificationCount: function() {
            return X["f"].getNotificationCount();
          },
          isToolTabActive: function() {
            return this.activeMenuTab === pt["c"].TOOL;
          },
          isDynamicLayerTabActive: function() {
            return this.activeMenuTab === pt["c"].DYNAMIC_LAYER;
          },
          isBaseLayerTabActive: function() {
            return this.activeMenuTab === pt["c"].BASE_LAYER;
          },
          isBaseMapTypeTabActive: function() {
            return this.activeMenuTab === pt["c"].BASE_MAP_TYPE;
          },
          activeMenuTab: function() {
            return X["f"].getActiveMenuTab();
          },
          topMenu: function() {
            return X["f"].getTopMenu();
          },
          bottomMenu: function() {
            return X["f"].getBottomMenu();
          },
          toolList: function() {
            return X["f"].getToolList();
          },
          bunchLayerList: {
            get: function() {
              var t = X["a"].getBunchLayerList();
              return this.filteredList(t, this.dynamicSearchInput);
            },
            set: function(t) {
              this.$store.dispatch("saveBuncLayerList", t);
            },
          },
          dynamicLayersList: {
            get: function() {
              var t = X["d"].getDynamicLayerList();
              return this.filteredList(t, this.dynamicSearchInput);
            },
            set: function(t) {
              this.$store.dispatch("saveDynamicLayerList", t);
            },
          },
          baselayerList: {
            get: function() {
              var t = X["d"].getBaseLayerList();
              return this.filteredList(t, this.baseSearchInput);
            },
            set: function(t) {
              this.$store.dispatch("saveBaseLayerList", t);
            },
          },
          favoriteBaseLayerList: {
            get: function() {
              var t = X["d"].getFavoriteBaseLayerIds(),
                e = X["d"].getBaseLayersWithoutCategory(),
                n = e.filter(function(e) {
                  return t.includes(e.id);
                });
              return this.filteredList(n, this.baseSearchInput);
            },
            set: function(t) {
              this.$store.dispatch("saveBaseLayerList", t);
            },
          },
          favoriteDynamicLayerList: {
            get: function() {
              var t = X["d"].getFavoriteDynamicLayerIds(),
                e = X["d"].getDynamicLayersWithoutCategory(!1),
                n = e.filter(function(e) {
                  return t.includes(e.id);
                });
              return this.filteredList(n, this.dynamicSearchInput);
            },
            set: function(t) {
              this.$store.dispatch("saveDynamicLayerList", t);
            },
          },
        },
        methods: {
          guid: it["d"],
          capitalize: it["a"],
          filteredList: function(t, e) {
            var n = Object(it["b"])(t);
            t = nt["d"].treeFilter(n, e);
            return t;
          },
          logout: function() {
            this.$store.dispatch("auth/logout"), this.$router.push("/login");
          },
          showProfileModal: function() {
            X["g"].showProfileModalModal();
          },
          setBaseLayout: function(t) {
            (this.activeLayerType = t), X["e"].setBaseLayout(t);
          },
          setDynamicActiveTab: function(t) {
            this.dynamicActiveTab = t;
          },
          setBasemapActiveTab: function(t) {
            this.basemapActiveTab = t;
          },
          openComputedLayerModal: function() {
            this.$moodal.computedLayerModal.show();
          },
        },
      },
      me = fe,
      ge = (n("3e33"), Object(O["a"])(me, Ft, Nt, !1, null, null, null)),
      he = ge.exports,
      ve = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n("div", [
          n(
            "h3",
            {
              staticClass:
                "centerize margin-bottom-1halfrem margin-top-halfrem",
            },
            [t._v("\n    Report\n  ")]
          ),
          n("table", { staticClass: "table popupTable" }, [
            t._m(0),
            n(
              "tbody",
              { staticClass: "popupTableBody" },
              t._l(Object.keys(t.result), function(e) {
                return n("tr", { key: e, staticClass: "centerize" }, [
                  n("td", { staticClass: "paddingLeft" }, [
                    t._v("\n          " + t._s(e) + "\n        "),
                  ]),
                  n("td", { staticClass: "paddingRight" }, [
                    t._v("\n          " + t._s(t.result[e]) + "\n        "),
                  ]),
                ]);
              }),
              0
            ),
          ]),
        ]);
      },
      be = [
        function() {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n("thead", [
            n("tr", { staticClass: "fields centerize" }, [
              n("th", { staticClass: "paddingLeft" }, [t._v("Field")]),
              n("th", { staticClass: "paddingRight" }, [t._v("Value")]),
            ]),
          ]);
        },
      ],
      ye = { name: "Report", props: { result: { type: Object } } },
      Ce = ye,
      _e = Object(O["a"])(Ce, ve, be, !1, null, null, null),
      Ee = _e.exports,
      Se = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "div",
          { staticClass: "map-controls", attrs: { id: "map-controls" } },
          [
            t._v("\n  " + t._s() + "\n  "),
            n("div", { staticClass: "map-controls--horizontal" }, [
              t._v("\n    " + t._s() + "\n    "),
              n("div", { staticClass: "search" }, [
                t._m(0),
                n("div", { staticClass: "control-select" }, [
                  n("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: t.searchInputValue,
                        expression: "searchInputValue",
                      },
                    ],
                    staticClass: "control-select__input",
                    class: {
                      "control-select__input--expanded": t.searchExpanded,
                    },
                    attrs: { type: "text", placeholder: "Search" },
                    domProps: { value: t.searchInputValue },
                    on: {
                      input: function(e) {
                        e.target.composing ||
                          (t.searchInputValue = e.target.value);
                      },
                    },
                  }),
                  n(
                    "div",
                    { staticClass: "control-select__results custom-scrollbar" },
                    [
                      n(
                        "ul",
                        t._l(t.citiesToShow, function(e, a) {
                          return n(
                            "li",
                            {
                              key: a,
                              on: {
                                click: function(n) {
                                  return t.onCitySelect(e);
                                },
                              },
                            },
                            [
                              t._v(
                                "\n              " +
                                  t._s(
                                    e.admin == e.city
                                      ? e.admin
                                      : e.admin + " / " + e.city
                                  ) +
                                  "\n            "
                              ),
                            ]
                          );
                        }),
                        0
                      ),
                    ]
                  ),
                ]),
                n(
                  "button",
                  {
                    staticClass: "control__button search__button",
                    on: {
                      click: function(e) {
                        t.searchExpanded = !t.searchExpanded;
                      },
                    },
                  },
                  [n("img", { attrs: { src: t.icons.search, alt: "Home" } })]
                ),
              ]),
              t._v("\n\n    " + t._s() + "\n    "),
              n(
                "div",
                {
                  staticClass:
                    "control__button-group control__button-group--horizontal coordinates",
                },
                [
                  n("v-select", {
                    staticClass: "mode-select",
                    attrs: {
                      label: "title",
                      options: t.coordinateOptions,
                      clearable: !1,
                      searchable: !1,
                    },
                    on: { input: t.onChange },
                    model: {
                      value: t.selectedCoordinateMode,
                      callback: function(e) {
                        t.selectedCoordinateMode = e;
                      },
                      expression: "selectedCoordinateMode",
                    },
                  }),
                  n("div", { staticClass: "coordinate" }, [
                    n("label", { attrs: { for: "coordinate-x" } }, [
                      t._v("X:"),
                    ]),
                    n("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: t.coordinates.x,
                          expression: "coordinates.x",
                        },
                      ],
                      attrs: { id: "coordinate-x", placeholder: "x" },
                      domProps: { value: t.coordinates.x },
                      on: {
                        keyup: function(e) {
                          return !e.type.indexOf("key") &&
                            t._k(e.keyCode, "enter", 13, e.key, "Enter")
                            ? null
                            : t.goToCoordinate(e);
                        },
                        input: function(e) {
                          e.target.composing ||
                            t.$set(t.coordinates, "x", e.target.value);
                        },
                      },
                    }),
                  ]),
                  n("div", { staticClass: "coordinate" }, [
                    n("label", { attrs: { for: "coordinate-y" } }, [
                      t._v("Y:"),
                    ]),
                    n("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: t.coordinates.y,
                          expression: "coordinates.y",
                        },
                      ],
                      attrs: { id: "coordinate-y", placeholder: "y" },
                      domProps: { value: t.coordinates.y },
                      on: {
                        keyup: function(e) {
                          return !e.type.indexOf("key") &&
                            t._k(e.keyCode, "enter", 13, e.key, "Enter")
                            ? null
                            : t.goToCoordinate(e);
                        },
                        input: function(e) {
                          e.target.composing ||
                            t.$set(t.coordinates, "y", e.target.value);
                        },
                      },
                    }),
                  ]),
                  n(
                    "button",
                    {
                      staticClass: "control__button",
                      on: { click: t.goToCoordinate },
                    },
                    [
                      n("img", {
                        attrs: {
                          src: t.icons.compass,
                          alt: "Go to coordinate",
                        },
                      }),
                    ]
                  ),
                ],
                1
              ),
            ]),
            t._v("\n\n  " + t._s() + "\n  "),
            n(
              "div",
              {
                staticClass:
                  "control__button-group control__button-group--vertical",
              },
              [
                n(
                  "button",
                  { staticClass: "control__button", on: { click: t.zoomIn } },
                  [n("img", { attrs: { src: t.icons.plus, alt: "Zoom in" } })]
                ),
                n(
                  "button",
                  { staticClass: "control__button", on: { click: t.zoomOut } },
                  [n("img", { attrs: { src: t.icons.minus, alt: "Zoom out" } })]
                ),
              ]
            ),
            t._v("\n\n  " + t._s() + "\n  "),
            n(
              "div",
              {
                staticClass:
                  "control__button-group control__button-group--vertical",
              },
              [
                n(
                  "button",
                  {
                    staticClass: "control__button",
                    on: { click: t.zoomToCenter },
                  },
                  [n("img", { attrs: { src: t.icons.home, alt: "Home" } })]
                ),
                n(
                  "button",
                  {
                    staticClass: "control__button",
                    attrs: { disabled: !t.isPreviousExist },
                    on: { click: t.historyBack },
                  },
                  [
                    n("img", {
                      attrs: { src: t.icons.arrow_left, alt: "Back" },
                    }),
                  ]
                ),
                n(
                  "button",
                  {
                    staticClass: "control__button",
                    attrs: { disabled: !t.isNextExist },
                    on: { click: t.historyNext },
                  },
                  [
                    n("img", {
                      attrs: { src: t.icons.arrow_right, alt: "Next" },
                    }),
                  ]
                ),
              ]
            ),
            t._v("\n\n  " + t._s() + "\n  "),
            n(
              "div",
              {
                staticClass:
                  "control__button-group control__button-group--horizontal scale",
              },
              [
                n("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: t.scaleInput,
                      expression: "scaleInput",
                    },
                  ],
                  style: { width: t.scaleWidth + "px" },
                  domProps: { value: t.scaleInput },
                  on: {
                    focus: t.scaleFocus,
                    blur: t.scaleBlur,
                    keyup: function(e) {
                      return !e.type.indexOf("key") &&
                        t._k(e.keyCode, "enter", 13, e.key, "Enter")
                        ? null
                        : t.setScale(e);
                    },
                    input: function(e) {
                      e.target.composing || (t.scaleInput = e.target.value);
                    },
                  },
                }),
                n(
                  "button",
                  {
                    staticClass: "control__button",
                    on: {
                      click: function(e) {
                        return t.setScale();
                      },
                    },
                  },
                  [n("img", { attrs: { src: t.icons.send, alt: "Scale" } })]
                ),
              ]
            ),
          ]
        );
      },
      Oe = [
        function() {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("div", { staticClass: "search__logo" }, [
            a("img", { attrs: { src: n("293c4"), alt: "Azercosmos logo" } }),
          ]);
        },
      ],
      Te = (n("a481"), n("55dd"), n("256f")),
      we = n("3b25"),
      Le = {
        name: "MapControls",
        data: function() {
          return {
            icons: dt["b"],
            cities: we,
            searchExpanded: !1,
            searchInputValue: "",
            selectedCoordinateMode: null,
            coordinates: { x: 0, y: 0 },
            scaleInput: "",
          };
        },
        mounted: function() {
          this.selectedCoordinateMode = this.coordinateOptions[0];
          var t = this.getCoordinates();
          this.setCoordinates(t[0], t[1]);
        },
        watch: {
          language: function(t) {
            var e = this;
            if (this.coordinateOptions && this.coordinateOptions.length > 0) {
              var n = this.coordinateOptions.find(function(t) {
                return t.key == e.selectedCoordinateMode.key;
              });
              this.selectedCoordinateMode = n;
            }
          },
          currentCenter: function(t) {
            (this.coordinates.x = t[0]), (this.coordinates.y = t[1]);
          },
          scaleOptions: function(t) {
            this.scaleInput =
              this.scaleValue.toFixed(2) + " " + this.scaleOptions.unit;
          },
        },
        computed: {
          language: function() {
            return this.$store.getters.language;
          },
          coordinateOptions: function() {
            return [
              {
                key: pt["a"].GEOGRAPHIC,
                title: this.$i18n.t("coordinateType.geographical"),
              },
              {
                key: pt["a"].METRIC,
                title: this.$i18n.t("coordinateType.metric"),
              },
            ];
          },
          currentCenter: function() {
            return this.getCoordinates();
          },
          scaleOptions: function() {
            return X["e"].getScaleLineOptions();
          },
          scaleValue: function() {
            return X["e"].getCurrentResolution();
          },
          scaleWidth: function() {
            var t = this.scaleOptions.width;
            return t;
          },
          isNextExist: function() {
            return X["c"].getHistoryIsNextExist();
          },
          isPreviousExist: function() {
            return X["c"].getHistoryIsPreviousExist();
          },
          map: {
            get: function() {
              return X["e"].getMap();
            },
            set: function(t) {
              X["e"].setMap(t);
            },
          },
          citiesToShow: function() {
            var t = this;
            return this.cities
              .filter(function(e) {
                return e.city
                  .toLowerCase()
                  .includes(t.searchInputValue.toLowerCase());
              })
              .sort(function(t, e) {
                return t.admin > e.admin ? 1 : t.admin < e.admin ? -1 : 0;
              });
          },
        },
        methods: {
          onChange: function() {
            var t = this.getCoordinates();
            this.setCoordinates(t[0], t[1]);
          },
          setCoordinates: function(t, e) {
            (this.coordinates.x = t), (this.coordinates.y = e);
          },
          getCoordinates: function() {
            var t = [];
            return (
              this.selectedCoordinateMode &&
                this.selectedCoordinateMode.key &&
                (t = X["e"].getCurrentCenter(this.selectedCoordinateMode.key)),
              t
            );
          },
          onCitySelect: function(t) {
            var e = [t.lng, t.lat];
            X["e"].setCenter(e, pt["a"].GEOGRAPHIC),
              X["e"].setZoomLevel(11),
              (this.searchInputValue = t.city);
          },
          goToCoordinate: function() {
            var t = this.coordinates.x,
              e = this.coordinates.y,
              n = [t, e];
            X["e"].setCenter(n, this.selectedCoordinateMode.key);
            var a = "centerPoint",
              i = { name: a };
            X["k"].deleteFeatureByName(a),
              X["k"].addMarker(n, i, this.selectedCoordinateMode.key);
          },
          zoomIn: function() {
            this.map.getView().setZoom(this.map.getView().getZoom() + 1);
          },
          zoomOut: function() {
            this.map.getView().setZoom(this.map.getView().getZoom() - 1);
          },
          zoomToCenter: function() {
            this.map
              .getView()
              .setCenter(Object(Te["fromLonLat"])([47.82858, 40.3598414])),
              this.map.getView().setZoom(8),
              (this.searchInputValue = "");
          },
          historyBack: function() {
            X["c"].historyBack(this);
          },
          historyNext: function() {
            X["c"].historyNext(this);
          },
          scaleFocus: function() {
            this.scaleInput = this.convertToNum(this.scaleInput);
          },
          scaleBlur: function() {
            (this.scaleInput = this.convertToNum(this.scaleInput)),
              (this.scaleInput =
                this.scaleInput + " " + this.scaleOptions.unit);
          },
          setScale: function() {
            X["e"].setCurrentResolution(this.convertToNum(this.scaleInput));
          },
          getScale: function() {
            var t = X["e"].getCurrentResolution();
            return t;
          },
          convertToNum: function(t) {
            return t.replace(/[^0-9.]/g, "");
          },
        },
      },
      ke = Le,
      Ie = (n("f035"), Object(O["a"])(ke, Se, Oe, !1, null, null, null)),
      Ae = Ie.exports,
      xe = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n("div", { staticClass: "map-text" }, [
          n("div", { staticClass: "map-text__container" }, [
            n("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: t.text,
                  expression: "text",
                },
              ],
              ref: "mapTextInput",
              staticClass: "map-text__input",
              attrs: { type: "text", placeholder: "Text" },
              domProps: { value: t.text },
              on: {
                keyup: function(e) {
                  return !e.type.indexOf("key") &&
                    t._k(e.keyCode, "enter", 13, e.key, "Enter")
                    ? null
                    : t.addText(e);
                },
                input: function(e) {
                  e.target.composing || (t.text = e.target.value);
                },
              },
            }),
            n(
              "button",
              {
                ref: "close",
                staticClass: "map-text__action--close map-text__button",
                on: { click: t.close },
              },
              [n("i", { staticClass: "fas fa-times" })]
            ),
            n(
              "button",
              { staticClass: "map-text__button", on: { click: t.addText } },
              [n("i", { staticClass: "fas fa-check" })]
            ),
          ]),
        ]);
      },
      je = [],
      De = {
        name: "MapText",
        data: function() {
          return { text: "" };
        },
        computed: {
          pointCoordinates: function() {
            return X["k"].getBbox();
          },
        },
        methods: {
          addText: function() {
            this.text.length &&
              (X["k"].addText(this.text, this.pointCoordinates), this.close());
          },
          close: function() {
            this.$refs.close.click(), (this.text = "");
          },
        },
      },
      Me = De,
      Re = (n("de50"), Object(O["a"])(Me, xe, je, !1, null, null, null)),
      Pe = Re.exports,
      Be = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "div",
          { style: t.styles },
          [
            n("v-select", {
              staticClass: "language__select",
              attrs: {
                label: "label",
                options: t.languages,
                searchable: !1,
                clearable: !1,
                auto: "",
              },
              model: {
                value: t.lang,
                callback: function(e) {
                  t.lang = e;
                },
                expression: "lang",
              },
            }),
          ],
          1
        );
      },
      Fe = [],
      Ne = n("9923"),
      $e = {
        name: "LanguageSelect",
        props: { className: { type: String }, styles: { type: Object } },
        computed: {
          languages: function() {
            var t = Object.keys(this.$i18n.messages),
              e = t.map(function(t) {
                return { code: t, label: t };
              });
            return e;
          },
          lang: {
            get: function() {
              var t = this.$store.getters.language;
              return t;
            },
            set: function(t) {
              (this.$i18n.locale = t.code),
                this.$store.dispatch("saveLanguage", t.code);
            },
          },
        },
      },
      Ge = $e,
      Ve = (n("24cc"), Object(O["a"])(Ge, Be, Fe, !1, null, "47f6eace", null)),
      Ue = Ve.exports,
      ze = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n("transition", { attrs: { name: "fade" } }, [
          t.isMounted
            ? n(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: t.visible,
                      expression: "visible",
                    },
                  ],
                  staticClass: "Modal modal--overlay",
                  attrs: { id: t.name },
                  on: {
                    click: function(e) {
                      return e.target !== e.currentTarget ? null : t.hide(e);
                    },
                  },
                },
                [
                  n(
                    "div",
                    { staticClass: "modal__content", style: t.contentStyle },
                    [
                      n("div", { staticClass: "modal__header" }, [
                        n("div", { staticClass: "header__title" }, [
                          t._v(t._s(t.title)),
                        ]),
                        n("div", { staticClass: "header__close" }, [
                          n("i", {
                            staticClass: "fas fa-times",
                            on: { click: t.hide },
                          }),
                        ]),
                      ]),
                      n(
                        "div",
                        { staticClass: "modal__body custom-scrollbar" },
                        [t._t("default")],
                        2
                      ),
                    ]
                  ),
                ]
              )
            : t._e(),
        ]);
      },
      He = [],
      qe = {
        name: "Moodal",
        props: {
          name: { type: String },
          height: { type: [Number, String] },
          width: { type: [Number, String] },
          minHeight: { type: Number, default: 100 },
          minWidth: { type: Number, default: 200 },
          maxHeight: { type: Number, default: window.innerHeight },
          maxWidth: { type: Number, default: window.innerWidth },
          title: { type: String, default: "" },
          mounted: { type: Boolean, default: !0 },
          ts: { type: Boolean, required: !1, default: !1 },
          appendToBody: { type: Boolean, required: !1, default: !1 },
        },
        data: function() {
          return { isMounted: this.mounted, visible: !1 };
        },
        computed: {
          contentStyle: function() {
            var t = [];
            if (this.width) {
              var e = "";
              "number" === typeof this.width
                ? (e = this.width + "px")
                : "string" === typeof this.width && (e = this.width),
                t.push("width: ".concat(e, ";"));
            }
            if (this.height) {
              var n = "";
              "number" === typeof this.height
                ? (n = this.height + "px")
                : "string" === typeof this.height && (n = this.height),
                t.push("height: ".concat(n, ";"));
            }
            return (
              this.minWidth &&
                t.push("min-width: ".concat(this.minWidth, "px;")),
              this.minHeight &&
                t.push("min-height: ".concat(this.minHeight, "px;")),
              this.maxWidth &&
                t.push("max-width: ".concat(this.maxWidth, "px;")),
              this.maxHeight &&
                t.push(
                  "max-height: ".concat(
                    this.maxHeight < window.innerHeight,
                    "px;"
                  )
                ),
              t.join(" ")
            );
          },
        },
        methods: {
          open: function() {
            this.$emit("beforeOpen"),
              (this.isMounted = !0),
              this.show(),
              this.$emit("afterOpen");
          },
          close: function() {
            this.$emit("beforeClose"),
              (this.isMounted = !1),
              this.hide(),
              this.$emit("afterClose");
          },
          show: function() {
            this.$emit("beforeShow"),
              (this.visible = !0),
              this.$emit("afterShow");
          },
          hide: function() {
            this.$emit("beforeHide"),
              (this.visible = !1),
              this.$emit("afterHide");
          },
        },
        created: function() {
          this.$moodal || (i["default"].prototype.$moodal = {}),
            (this.$moodal[this.name] = this);
        },
        mounted: function() {
          this.appendToBody && this.$root.$el.append(this.$el);
        },
        destroyed: function() {
          this.appendToBody && this.$el.parentNode.removeChild(this.$el);
        },
      },
      Qe = qe,
      Ye = Object(O["a"])(Qe, ze, He, !1, null, null, null),
      Ze = Ye.exports,
      We = function() {
        var t = this,
          e = t.$createElement;
        t._self._c;
        return t._m(0);
      },
      Ke = [
        function() {
          var t = this,
            e = t.$createElement,
            a = t._self._c || e;
          return a("div", { staticClass: "loader" }, [
            a("img", { attrs: { src: n("4045"), alt: "" } }),
          ]);
        },
      ],
      Xe = { name: "Loader" },
      Je = Xe,
      tn = (n("bfac"), Object(O["a"])(Je, We, Ke, !1, null, null, null)),
      en = tn.exports,
      nn = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "div",
          { staticClass: "tree" },
          t._l(t.data, function(e, a) {
            return n(
              "ul",
              { key: a },
              [
                n("tree-item", {
                  attrs: {
                    node: e,
                    options: t.options,
                    checkeds: t.checkedIds,
                  },
                  on: { setCheckeds: t.setCheckeds, onChange: t.onChange },
                }),
              ],
              1
            );
          }),
          0
        );
      },
      an = [],
      rn = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n("li", { staticStyle: { margin: "1rem 0" } }, [
          t.checkCategoryCondition()
            ? n(
                "span",
                {
                  staticClass: "tree-item",
                  on: {
                    click: function() {
                      t.isOpen = !t.isOpen;
                    },
                  },
                },
                [
                  n("strong", [t._v(t._s(t.node[t.getNameKey()]))]),
                  n("i", {
                    staticClass: " m-1 ",
                    class: { "fa fa-plus": !t.isOpen, "fa fa-minus": t.isOpen },
                  }),
                ]
              )
            : n("span", { staticClass: "tree-item" }, [
                t._v(" " + t._s(t.node[t.getNameKey()])),
              ]),
          t.isCheckboxExist && t.checkCheckboxCondition()
            ? n("input", {
                staticClass: "form-check-input tree-checkbox",
                attrs: { type: "checkbox" },
                domProps: {
                  checked:
                    t.isCheckedsPropertyExist &&
                    t.checkeds.includes(t.node[t.getIdKey()]),
                },
                on: {
                  change: function(e) {
                    var n = e.target.checked;
                    t.onChange(t.node, n);
                  },
                },
              })
            : t._e(),
          t.node[t.getChildrenKey()]
            ? n(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: t.isOpen,
                      expression: "isOpen",
                    },
                  ],
                },
                t._l(t.node[t.getChildrenKey()], function(e, a) {
                  return n(
                    "ul",
                    { key: a },
                    [
                      n("tree-item", {
                        attrs: {
                          node: e,
                          options: t.options,
                          checkeds: t.checkeds,
                        },
                        on: { onChange: t.onChange },
                      }),
                    ],
                    1
                  );
                }),
                0
              )
            : t._e(),
          t.node[t.getItemKey()]
            ? n(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: t.isOpen,
                      expression: "isOpen",
                    },
                  ],
                },
                t._l(t.node[t.getItemKey()], function(e, a) {
                  return n(
                    "ul",
                    { key: a },
                    [
                      n("tree-item", {
                        attrs: {
                          node: e,
                          options: t.options,
                          checkeds: t.checkeds,
                        },
                        on: { onChange: t.onChange },
                      }),
                    ],
                    1
                  );
                }),
                0
              )
            : t._e(),
        ]);
      },
      on = [],
      sn =
        ((Dt = {
          name: "TreeItem",
          props: {
            node: { type: Object, required: !0 },
            options: { type: Object },
            checkeds: { type: Array },
          },
          mounted: function() {},
          data: function() {
            return { isOpen: !1 };
          },
          watch: {
            data: {
              deep: !0,
              handler: function(t, e) {
                this.data = t;
              },
            },
            options: {
              deep: !0,
              handler: function(t, e) {
                this.options = t;
              },
            },
            checkeds: {
              deep: !0,
              handler: function(t, e) {
                this.checkeds = t;
              },
            },
          },
        }),
        Object(R["a"])(Dt, "mounted", function() {
          this.isOpen = !this.isCollapsed;
        }),
        Object(R["a"])(Dt, "computed", {
          isCheckboxExist: function() {
            return (
              this.options &&
              this.options.checkbox &&
              1 == this.options.checkbox
            );
          },
          isCollapsed: function() {
            return this.options && this.options.collapsed;
          },
          isCheckedsPropertyExist: function() {
            return this.options && this.checkeds;
          },
        }),
        Object(R["a"])(Dt, "methods", {
          toggle: function() {
            this.isOpen = !this.isOpen;
          },
          onChange: function(t, e) {
            if (this.isCheckedsPropertyExist) {
              if (e) this.checkeds.includes(t.id) || this.checkeds.push(t.id);
              else if (this.checkeds.includes(t.id)) {
                var n = this.checkeds.findIndex(function(e) {
                  return e == t.id;
                });
                this.checkeds.splice(n, 1);
              }
              this.$emit("setCheckeds", this.checkeds);
            }
            this.$emit("onChange", t, e);
          },
          getChildrenKey: function() {
            return this.isOptionLabelsPropertyExist("children")
              ? this.options.labels.children
              : null;
          },
          getItemKey: function() {
            return this.isOptionLabelsPropertyExist("items")
              ? this.options.labels.items
              : null;
          },
          getNameKey: function() {
            return this.isOptionLabelsPropertyExist("name")
              ? this.options.labels.name
              : null;
          },
          getIdKey: function() {
            return this.isOptionLabelsPropertyExist("id")
              ? this.options.labels.id
              : null;
          },
          checkCategoryCondition: function() {
            return (
              !!this.isOptionConditionsPropertyExist("isCategory") &&
              this.options.conditions.isCategory(this.node)
            );
          },
          checkCheckboxCondition: function() {
            return (
              !!this.isOptionCheckboxPropertyExist() &&
              this.options.conditions.isCheckboxExist(this.node)
            );
          },
          isOptionLabelsPropertyExist: function(t) {
            return (
              this.options && this.options.labels && this.options.labels[t]
            );
          },
          isOptionConditionsPropertyExist: function(t) {
            return (
              this.options &&
              this.options.conditions &&
              this.options.conditions[t]
            );
          },
          isOptionCheckboxPropertyExist: function(t) {
            return this.options && this.options.checkbox;
          },
        }),
        Dt),
      cn = sn,
      ln = Object(O["a"])(cn, rn, on, !1, null, null, null),
      un = ln.exports,
      dn = {
        name: "Tree",
        components: { TreeItem: un },
        data: function() {
          return { checkedIds: [] };
        },
        props: {
          data: { type: Array, required: !0 },
          options: { type: Object },
          checkeds: { type: Array },
        },
        watch: {
          data: {
            deep: !0,
            handler: function(t, e) {
              this.data = t;
            },
          },
          options: {
            deep: !0,
            handler: function(t, e) {
              this.options = t;
            },
          },
          checkeds: {
            deep: !0,
            handler: function(t, e) {
              this.checkeds = t;
            },
          },
        },
        mounted: function() {
          this.checkedIds = this.checkeds ? this.checkeds : [];
        },
        methods: {
          onChange: function(t, e) {
            this.$emit("onCheckboxChange", t, e);
          },
          setCheckeds: function(t) {
            this.checkedIds = t;
          },
          getCheckeds: function() {
            return this.checkedIds;
          },
        },
      },
      pn = dn,
      fn = Object(O["a"])(pn, nn, an, !1, null, null, null),
      mn = fn.exports,
      gn = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n("transition", { attrs: { name: "fade" } }, [
          n(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: t.isOpen,
                  expression: "isOpen",
                },
              ],
              staticClass: "modal overlay",
              attrs: {
                id: "infoModal",
                tabindex: "-1",
                role: "dialog",
                "aria-labelledby": "infoModalLabel",
                "aria-hidden": "true",
              },
              on: {
                click: function(e) {
                  return e.target !== e.currentTarget ? null : t.$emit("close");
                },
              },
            },
            [
              n(
                "div",
                {
                  staticClass: "modal-dialog modal-lg",
                  attrs: { role: "document" },
                },
                [
                  n("div", { staticClass: "modal-content" }, [
                    n("div", { staticClass: "modal-header" }, [
                      n(
                        "ul",
                        { staticClass: "nav nav-tabs" },
                        [
                          t._l(t.tabs, function(e) {
                            return n(
                              "li",
                              { key: e.key, staticClass: "nav-item" },
                              [
                                n(
                                  "a",
                                  {
                                    staticClass: "nav-link",
                                    class: { active: e.key === t.activeTab },
                                    attrs: { href: "#" },
                                    on: {
                                      click: function(n) {
                                        return t.changeTab(e.key);
                                      },
                                    },
                                  },
                                  [t._v(t._s(e.text))]
                                ),
                              ]
                            );
                          }),
                          n(
                            "button",
                            {
                              staticClass: "close",
                              attrs: {
                                type: "button",
                                "data-dismiss": "modal",
                                "aria-label": "Close",
                              },
                              on: {
                                click: function(e) {
                                  return t.$emit("close");
                                },
                              },
                            },
                            [
                              n("span", { attrs: { "aria-hidden": "true" } }, [
                                t._v("×"),
                              ]),
                            ]
                          ),
                        ],
                        2
                      ),
                    ]),
                    t.isOpen
                      ? n(
                          "div",
                          { staticClass: "modal-body" },
                          [
                            "about" === t.activeTab ? n("About") : t._e(),
                            "faq" === t.activeTab ? n("FAQ") : t._e(),
                            "releaseNotes" === t.activeTab
                              ? n("ReleaseNotes")
                              : t._e(),
                            "contact" === t.activeTab ? n("Contact") : t._e(),
                            "forum" === t.activeTab ? n("Forum") : t._e(),
                          ],
                          1
                        )
                      : t._e(),
                  ]),
                ]
              ),
            ]
          ),
        ]);
      },
      hn = [],
      vn = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n("div", { staticClass: "about" }, [
          n("h3", [t._v(t._s(t.$t("menu.information.about.whatIsWebgis")))]),
          n("p", [
            t._v(
              "\n    " +
                t._s(t.$t("menu.information.about.whatIsWebgisContent")) +
                "\n  "
            ),
          ]),
        ]);
      },
      bn = [],
      yn = { name: "About" },
      Cn = yn,
      _n = (n("6994"), Object(O["a"])(Cn, vn, bn, !1, null, null, null)),
      En = _n.exports,
      Sn = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "div",
          [
            t.loading ? n("Loader") : t._e(),
            n(
              "div",
              { staticClass: "accordion" },
              t._l(t.questions, function(e) {
                return n(
                  "div",
                  { key: e.id, staticClass: "card" },
                  [
                    n("div", { staticClass: "card-header" }, [
                      n("h5", { staticClass: "mb-0" }, [
                        n(
                          "button",
                          {
                            staticClass: "btn btn-link",
                            class: { collapsed: t.activeQuestionIds !== e.id },
                            on: {
                              click: function(n) {
                                return t.toggleAccordion(e.id);
                              },
                            },
                          },
                          [
                            t._v(
                              "\n            " +
                                t._s(e.question) +
                                "\n          "
                            ),
                          ]
                        ),
                      ]),
                    ]),
                    n(
                      "transition",
                      { attrs: { name: "collapse", delay: "0" } },
                      [
                        n(
                          "div",
                          {
                            directives: [
                              {
                                name: "show",
                                rawName: "v-show",
                                value: t.activeQuestionIds.includes(e.id),
                                expression:
                                  "activeQuestionIds.includes(question.id)",
                              },
                            ],
                            staticClass: "collapse-body",
                          },
                          [
                            n("div", { staticClass: "card-body" }, [
                              t._v(t._s(e.answer)),
                            ]),
                          ]
                        ),
                      ]
                    ),
                  ],
                  1
                );
              }),
              0
            ),
          ],
          1
        );
      },
      On = [],
      Tn = {
        getFAQ: function() {
          return J["a"].get(W["URL"] + "/api/faq");
        },
        getReleaseNotes: function() {
          return J["a"].get(W["URL"] + "/api/releasenote");
        },
        sendMessage: function(t) {
          return J["a"].post(W["URL"] + "/api/mail/contact-us", t);
        },
      },
      wn = {
        name: "FAQ",
        data: function() {
          return { activeQuestionIds: [], questions: [], loading: !1 };
        },
        methods: {
          getFAQ: function() {
            var t = this;
            (this.loading = !0),
              Tn.getFAQ()
                .then(function(e) {
                  t.questions = e;
                })
                .catch(function(t) {})
                .finally(function() {
                  t.loading = !1;
                });
          },
          toggleAccordion: function(t) {
            if (this.activeQuestionIds.includes(t)) {
              var e = this.activeQuestionIds.findIndex(function(e) {
                return e === t;
              });
              this.activeQuestionIds.splice(e, 1);
            } else this.activeQuestionIds.push(t);
          },
          labelClick: function(t) {
            !0 === t.target.checked &&
              document.querySelectorAll(".toggle").forEach(function(e) {
                e.getAttribute("data-index") !==
                  t.target.getAttribute("data-index") && (e.checked = !1);
              });
          },
        },
        mounted: function() {
          this.questions.length || this.getFAQ();
        },
      },
      Ln = wn,
      kn = (n("6606"), Object(O["a"])(Ln, Sn, On, !1, null, null, null)),
      In = kn.exports,
      An = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "div",
          [
            t.loading ? n("Loader") : t._e(),
            t._l(t.notes, function(e, a) {
              return n("div", { key: a, staticClass: "release-note" }, [
                n("div", { staticClass: "date" }, [
                  n("b", [t._v(t._s(e.dateCreated))]),
                ]),
                n("p", { staticClass: "content" }, [t._v(t._s(e.note))]),
              ]);
            }),
          ],
          2
        );
      },
      xn = [],
      jn = {
        name: "ReleaseNotes",
        data: function() {
          return { notes: [], loading: !1 };
        },
        methods: {
          getReleaseNotes: function() {
            var t = this;
            (this.loading = !0),
              Tn.getReleaseNotes()
                .then(function(e) {
                  t.notes = e;
                })
                .catch(function(t) {})
                .finally(function() {
                  t.loading = !1;
                });
          },
        },
        mounted: function() {
          this.notes.length || this.getReleaseNotes();
        },
      },
      Dn = jn,
      Mn = (n("6092"), Object(O["a"])(Dn, An, xn, !1, null, null, null)),
      Rn = Mn.exports,
      Pn = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n("div", [
          n("form", { staticClass: "contact-block" }, [
            n("div", { staticClass: "form-group" }, [
              n("label", { attrs: { for: "subject" } }, [
                t._v(t._s(t.$t("form.contactUsForm.subject"))),
              ]),
              n("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: t.data.subject,
                    expression: "data.subject",
                  },
                ],
                staticClass: "form-control",
                class: {
                  "is-invalid": t.submitted && !t.$v.data.subject.required,
                },
                attrs: {
                  type: "text",
                  id: "subject",
                  placeholder: t.$t("form.contactUsForm.subject"),
                  required: "",
                },
                domProps: { value: t.data.subject },
                on: {
                  input: function(e) {
                    e.target.composing ||
                      t.$set(t.data, "subject", e.target.value);
                  },
                },
              }),
              t.submitted && !t.$v.data.subject.required
                ? n("div", { staticClass: "invalid-feedback" }, [
                    t._v(
                      "\n        " +
                        t._s(
                          t.$t(
                            "form.contactUsForm.validationMessages.subjectRequired"
                          )
                        ) +
                        "\n      "
                    ),
                  ])
                : t._e(),
            ]),
            n("div", { staticClass: "form-group" }, [
              n("label", { attrs: { for: "content" } }, [
                t._v(t._s(t.$t("form.contactUsForm.content"))),
              ]),
              n("textarea", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: t.data.message,
                    expression: "data.message",
                  },
                ],
                staticClass: "form-control",
                class: {
                  "is-invalid": t.submitted && !t.$v.data.message.required,
                },
                attrs: {
                  id: "content",
                  rows: "3",
                  placeholder: t.$t("form.contactUsForm.content"),
                  required: "",
                },
                domProps: { value: t.data.message },
                on: {
                  input: function(e) {
                    e.target.composing ||
                      t.$set(t.data, "message", e.target.value);
                  },
                },
              }),
              t.submitted && !t.$v.data.message.required
                ? n("div", { staticClass: "invalid-feedback" }, [
                    t._v(
                      "\n        " +
                        t._s(
                          t.$t(
                            "form.contactUsForm.validationMessages.contentRequired"
                          )
                        ) +
                        "\n      "
                    ),
                  ])
                : t._e(),
            ]),
            n(
              "button",
              {
                staticClass: "btn btn-primary submit-btn",
                attrs: { type: "submit", disabled: t.loading },
                on: {
                  click: function(e) {
                    return e.preventDefault(), t.sendMessage(e);
                  },
                },
              },
              [t._v("\n      " + t._s(t.$t("button.submit")) + "\n    ")]
            ),
          ]),
        ]);
      },
      Bn = [],
      Fn = n("b5ae"),
      Nn = {
        name: "Contact",
        data: function() {
          return {
            data: { subject: null, message: null },
            submitted: !1,
            loading: !1,
          };
        },
        validations: {
          data: {
            subject: { required: Fn["required"] },
            message: { required: Fn["required"] },
          },
        },
        mounted: function() {
          this.reset();
        },
        methods: {
          reset: function() {
            (this.submitted = !1), (this.loading = !1), this.resetData();
          },
          resetData: function() {
            this.data = { subject: null, message: null };
          },
          sendMessage: function() {
            var t = this;
            (this.submitted = !0),
              this.$v.$touch(),
              this.$v.$invalid ||
                ((this.loading = !0),
                Tn.sendMessage(this.data)
                  .then(function(e) {
                    K["c"].success("Successfully Added"), t.resetData();
                  })
                  .catch(function(t) {})
                  .finally(function() {
                    t.loading = !0;
                  }));
          },
        },
      },
      $n = Nn,
      Gn = (n("6511"), Object(O["a"])($n, Pn, Bn, !1, null, null, null)),
      Vn = Gn.exports,
      Un = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "div",
          { attrs: { id: "Forum" } },
          [
            "list" === t.activeBlock
              ? n("IssueList", {
                  on: {
                    openIssue: t.openIssue,
                    newIssue: function(e) {
                      t.activeBlock = "newIssue";
                    },
                  },
                })
              : t._e(),
            "detailed" === t.activeBlock
              ? n("IssueDetailed", {
                  attrs: { openIssueId: t.openIssueId },
                  on: {
                    back: function(e) {
                      t.activeBlock = "list";
                    },
                  },
                })
              : t._e(),
            "newIssue" === t.activeBlock
              ? n("NewIssue", {
                  on: {
                    back: function(e) {
                      t.activeBlock = "list";
                    },
                    openIssue: t.openIssue,
                  },
                })
              : t._e(),
          ],
          1
        );
      },
      zn = [],
      Hn = {
        getCategories: function() {
          return J["a"].get(W["URL"] + "/api/forum/Category");
        },
        getIssues: function() {
          var t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
          return J["a"].get(W["URL"] + "/api/forum/Post/Statuses/" + t);
        },
        getIssueById: function(t) {
          return J["a"].get(W["URL"] + "/api/forum/Post/" + t);
        },
        getIssueCount: function() {
          return J["a"].get(W["URL"] + "/api/forum/Post/Counts");
        },
        insertIssue: function(t) {
          return J["a"].post(W["URL"] + "/api/forum/Post", t);
        },
        deleteIssue: function(t) {
          return J["a"].delete(W["URL"] + "/api/forum/Post/" + t);
        },
        insertComment: function(t) {
          return J["a"].post(W["URL"] + "/api/forum/Comment", t);
        },
        deleteComment: function(t) {
          return J["a"].delete(W["URL"] + "/api/forum/Comment/" + t);
        },
        closeIssue: function(t) {
          return J["a"].put(W["URL"] + "/api/forum/Post/".concat(t, "/Close"));
        },
      },
      qn = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "div",
          { staticClass: "issue-list" },
          [
            n("div", { staticClass: "issue__action-bar" }, [
              n("div", { staticClass: "action-bar__fields" }, [
                n(
                  "div",
                  { staticClass: "btn-group", attrs: { role: "group" } },
                  [
                    n(
                      "button",
                      {
                        staticClass: "btn",
                        class: 1 === t.activeTab ? "btn-primary" : "btn-light",
                        attrs: { type: "button" },
                        on: {
                          click: function(e) {
                            return t.changeActiveTab(1);
                          },
                        },
                      },
                      [
                        n("i", {
                          staticClass:
                            "fas fa-exclamation-circle issue-icon issue-icon--open",
                        }),
                        t._v(
                          "\n          " +
                            t._s(t.issueCount.open) +
                            "\n          " +
                            t._s(t.$t("menu.information.forum.openedIssues")) +
                            "\n        "
                        ),
                      ]
                    ),
                    n(
                      "button",
                      {
                        staticClass: "btn",
                        class: 2 === t.activeTab ? "btn-primary" : "btn-light",
                        attrs: { type: "button" },
                        on: {
                          click: function(e) {
                            return t.changeActiveTab(2);
                          },
                        },
                      },
                      [
                        n("i", {
                          staticClass:
                            "far fa-check-circle issue-icon issue-icon--closed",
                        }),
                        t._v(
                          "\n          " +
                            t._s(t.issueCount.closed) +
                            "\n          " +
                            t._s(t.$t("menu.information.forum.closedIssues")) +
                            "\n        "
                        ),
                      ]
                    ),
                  ]
                ),
                n(
                  "select",
                  {
                    staticClass: "form-control category",
                    attrs: { placeholder: "Filter by category" },
                    on: { change: t.handleFilter },
                  },
                  [
                    n(
                      "option",
                      {
                        domProps: {
                          value: 0,
                          selected: 0 === t.activeCategoryId,
                        },
                      },
                      [t._v("All")]
                    ),
                    t._l(t.categories, function(e) {
                      return n(
                        "option",
                        {
                          key: e.id,
                          domProps: {
                            value: e.id,
                            selected: t.activeCategoryId === e.id,
                          },
                        },
                        [t._v(t._s(e.name))]
                      );
                    }),
                  ],
                  2
                ),
              ]),
              n("div", [
                n(
                  "button",
                  {
                    staticClass: "btn btn-primary new-issue",
                    attrs: { type: "button" },
                    on: {
                      click: function(e) {
                        return t.$emit("newIssue");
                      },
                    },
                  },
                  [
                    t._v(
                      "\n        " +
                        t._s(t.$t("menu.information.forum.createIssue")) +
                        "\n      "
                    ),
                  ]
                ),
              ]),
            ]),
            t.loading ? n("Loader") : t._e(),
            t.activeIssueList.length
              ? n("div", { staticClass: "card issues-card" }, [
                  n(
                    "ul",
                    { staticClass: "list-group list-group-flush" },
                    t._l(t.activeIssueList, function(e) {
                      return n(
                        "li",
                        {
                          key: e.id,
                          staticClass: "list-group-item issues-card__item",
                          on: {
                            click: function(n) {
                              return t.openIssue(e.id);
                            },
                          },
                        },
                        [
                          n("i", {
                            staticClass: "issue-icon",
                            class: t.issueIconClass,
                          }),
                          n("span", [t._v(t._s(e.title))]),
                          n("span", { staticClass: "issue__date" }, [
                            t._v(t._s(e.dateCreated)),
                          ]),
                        ]
                      );
                    }),
                    0
                  ),
                ])
              : t._e(),
          ],
          1
        );
      },
      Qn = [];
    function Yn(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function Zn(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? Yn(Object(n), !0).forEach(function(e) {
              Object(R["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : Yn(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var Wn = {
        name: "IssueList",
        data: function() {
          return { filteredIssues: { open: [], closed: [] }, loading: !1 };
        },
        methods: {
          getOpenIssues: function() {
            var t = this;
            (this.loading = !0),
              Hn.getIssues(1)
                .then(function(e) {
                  t.$store.commit("SET_OPEN_ISSUES", e),
                    (t.filteredIssues.open = e);
                })
                .catch()
                .finally(function() {
                  t.loading = !1;
                });
          },
          getClosedIssues: function() {
            var t = this;
            (this.loading = !0),
              Hn.getIssues(2)
                .then(function(e) {
                  t.$store.commit("SET_CLOSED_ISSUES", e),
                    (t.filteredIssues.closed = e);
                })
                .catch()
                .finally(function() {
                  t.loading = !1;
                });
          },
          getIssueCount: function() {
            var t = this;
            Hn.getIssueCount()
              .then(function(e) {
                t.$store.state.forum.issueCount = e;
              })
              .catch()
              .finally(function() {
                t.loading = !1;
              });
          },
          openIssue: function(t) {
            this.$emit("openIssue", t);
          },
          handleFilter: function(t) {
            this.$store.commit(
              "SET_ACTIVE_CATEGORY_ID",
              Number(t.target.value)
            ),
              this.filterList();
          },
          filterList: function() {
            var t = this;
            0 !== this.activeCategoryId
              ? ((this.filteredIssues.open = this.issues.open.filter(function(
                  e
                ) {
                  return e.categoryId === t.activeCategoryId;
                })),
                (this.filteredIssues.closed = this.issues.closed.filter(
                  function(e) {
                    return e.categoryId === t.activeCategoryId;
                  }
                )))
              : (this.filteredIssues = Zn({}, this.issues));
          },
          changeActiveTab: function(t) {
            this.$store.commit("SET_ACTIVE_TAB", t),
              1 !== t || this.issues.open.length
                ? 2 !== t || this.issues.closed.length || this.getClosedIssues()
                : this.getOpenIssues();
          },
        },
        mounted: function() {
          this.issues.open.length ? this.filterList() : this.getOpenIssues(),
            this.issueCount.open + this.issueCount.closed ||
              this.getIssueCount();
        },
        computed: {
          issues: function() {
            return this.$store.state.forum.issueList;
          },
          issueCount: function() {
            return this.$store.state.forum.issueCount;
          },
          activeTab: function() {
            return this.$store.state.forum.activeTab;
          },
          activeCategoryId: function() {
            return this.$store.state.forum.activeCategoryId;
          },
          activeIssueList: function() {
            return 1 === this.activeTab
              ? this.filteredIssues.open
              : this.filteredIssues.closed;
          },
          issueIconClass: function() {
            return 1 === this.activeTab
              ? "fas fa-exclamation-circle issue-icon--open"
              : "far fa-check-circle issue-icon--closed";
          },
          categories: function() {
            return this.$store.state.forum.categories;
          },
        },
      },
      Kn = Wn,
      Xn = (n("f60d"), Object(O["a"])(Kn, qn, Qn, !1, null, "1a8837d8", null)),
      Jn = Xn.exports,
      ta = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "div",
          [
            n(
              "button",
              {
                staticClass: "btn btn-light back-btn",
                attrs: { type: "button" },
                on: { click: t.back },
              },
              [n("i", { staticClass: "fas fa-arrow-left" }), t._v(" Back\n  ")]
            ),
            t.loading ? n("Loader") : t._e(),
            t.issue
              ? n(
                  "div",
                  { staticClass: "issue-details" },
                  [
                    n("div", { staticClass: "issue__header" }, [
                      1 === t.issue.status
                        ? n("i", {
                            staticClass:
                              "fas fa-exclamation-circle issue-icon issue-icon--open",
                          })
                        : n("i", {
                            staticClass:
                              "far fa-check-circle issue-icon issue-icon--closed",
                          }),
                      n("div", [
                        n("h3", { staticClass: "issue__title" }, [
                          t._v(
                            "\n          " +
                              t._s(t.issue.title) +
                              "\n          "
                          ),
                          n("div", { staticClass: "btn-group" }, [
                            t.showCloseBtn(t.issue)
                              ? n(
                                  "button",
                                  {
                                    staticClass: "btn btn-sm btn-success",
                                    attrs: { type: "button" },
                                    on: { click: t.closeIssue },
                                  },
                                  [t._v("\n              Close\n            ")]
                                )
                              : t._e(),
                            t.showDeleteBtn
                              ? n(
                                  "button",
                                  {
                                    staticClass: "btn btn-sm btn-light",
                                    attrs: { type: "button" },
                                    on: {
                                      click: function(e) {
                                        return t.deletePost(t.issue.id);
                                      },
                                    },
                                  },
                                  [n("i", { staticClass: "far fa-trash-alt" })]
                                )
                              : t._e(),
                          ]),
                        ]),
                        n("div", [
                          n("span", { staticClass: "issue__author" }, [
                            t._v(t._s(t.issue.user.userName)),
                          ]),
                          n(
                            "span",
                            {
                              staticClass: "issue__date",
                              attrs: { title: t.issue.dateCreated },
                            },
                            [t._v(t._s(t.issue.dateCreated))]
                          ),
                        ]),
                      ]),
                    ]),
                    n("div", {
                      staticClass: "issue__content",
                      domProps: { innerHTML: t._s(t.issue.content) },
                    }),
                    n("Comments", {
                      attrs: {
                        rawComments: t.issue.comments,
                        postId: t.issue.id,
                      },
                    }),
                  ],
                  1
                )
              : t._e(),
          ],
          1
        );
      },
      ea = [],
      na = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n("div", [
          n(
            "div",
            { staticClass: "issue__comments" },
            [
              t._l(t.comments, function(e) {
                return n("div", { key: e.id, staticClass: "issue__comment" }, [
                  n("div", { staticClass: "card" }, [
                    n("h6", { staticClass: "card-header" }, [
                      n("div", [
                        n("span", { staticClass: "issue__author" }, [
                          t._v(t._s(e.user.userName)),
                        ]),
                        n(
                          "span",
                          {
                            staticClass: "issue__date",
                            attrs: { title: e.dateCreated },
                          },
                          [t._v(t._s(e.dateCreated))]
                        ),
                      ]),
                      n("div", { staticClass: "btn-group" }, [
                        t.showDeleteBtn
                          ? n(
                              "button",
                              {
                                staticClass: "btn btn-light",
                                attrs: { type: "button" },
                                on: {
                                  click: function(n) {
                                    return t.deleteComment(e.id);
                                  },
                                },
                              },
                              [n("i", { staticClass: "far fa-trash-alt" })]
                            )
                          : t._e(),
                        n(
                          "button",
                          {
                            staticClass: "btn btn-light",
                            attrs: { type: "button" },
                            on: {
                              click: function(n) {
                                return t.setActiveReplyId(e.id);
                              },
                            },
                          },
                          [n("i", { staticClass: "fas fa-reply" })]
                        ),
                      ]),
                    ]),
                    n("div", {
                      staticClass: "card-body",
                      domProps: { innerHTML: t._s(e.content) },
                    }),
                  ]),
                  n(
                    "div",
                    { staticClass: "issue__comment_replies" },
                    [
                      n("NewComment", {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: e.id === t.activeReplyId,
                            expression: "comment.id === activeReplyId",
                          },
                        ],
                        attrs: { replyId: e.id },
                        on: { submitComment: t.submitComment },
                      }),
                      t._l(e.replies, function(e) {
                        return n(
                          "div",
                          { key: e.id, staticClass: "issue__comment" },
                          [
                            n("div", { staticClass: "card" }, [
                              n("h6", { staticClass: "card-header" }, [
                                n("div", [
                                  n("span", { staticClass: "issue__author" }, [
                                    t._v(t._s(e.user.userName)),
                                  ]),
                                  n(
                                    "span",
                                    {
                                      staticClass: "issue__date",
                                      attrs: { title: e.dateCreated },
                                    },
                                    [t._v(t._s(e.dateCreated))]
                                  ),
                                ]),
                                t.showDeleteBtn
                                  ? n(
                                      "button",
                                      {
                                        staticClass: "btn btn-light",
                                        attrs: { type: "button" },
                                        on: {
                                          click: function(n) {
                                            return t.deleteComment(e.id);
                                          },
                                        },
                                      },
                                      [
                                        n("i", {
                                          staticClass: "far fa-trash-alt",
                                        }),
                                      ]
                                    )
                                  : t._e(),
                              ]),
                              n("div", {
                                staticClass: "card-body",
                                domProps: { innerHTML: t._s(e.content) },
                              }),
                            ]),
                          ]
                        );
                      }),
                    ],
                    2
                  ),
                ]);
              }),
              t.loading ? n("Loader") : t._e(),
              n("NewComment", { on: { submitComment: t.submitComment } }),
              t._m(0),
            ],
            2
          ),
        ]);
      },
      aa = [
        function() {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n(
            "div",
            {
              staticClass: "modal show",
              attrs: { tabindex: "-1", role: "dialog" },
            },
            [
              n(
                "div",
                { staticClass: "modal-dialog", attrs: { role: "document" } },
                [
                  n("div", { staticClass: "modal-content" }, [
                    n("div", { staticClass: "modal-header" }, [
                      n("h5", { staticClass: "modal-title" }, [
                        t._v("Modal title"),
                      ]),
                      n(
                        "button",
                        {
                          staticClass: "close",
                          attrs: {
                            type: "button",
                            "data-dismiss": "modal",
                            "aria-label": "Close",
                          },
                        },
                        [
                          n("span", { attrs: { "aria-hidden": "true" } }, [
                            t._v("×"),
                          ]),
                        ]
                      ),
                    ]),
                    n("div", { staticClass: "modal-body" }, [
                      n("p", [t._v("Modal body text goes here.")]),
                    ]),
                    n("div", { staticClass: "modal-footer" }, [
                      n(
                        "button",
                        {
                          staticClass: "btn btn-secondary",
                          attrs: { type: "button", "data-dismiss": "modal" },
                        },
                        [t._v("\n              Close\n            ")]
                      ),
                      n(
                        "button",
                        {
                          staticClass: "btn btn-primary",
                          attrs: { type: "button" },
                        },
                        [t._v("\n              Save changes\n            ")]
                      ),
                    ]),
                  ]),
                ]
              ),
            ]
          );
        },
      ],
      ia = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n("div", [
          n("div", { staticClass: "issue__comment new-comment" }, [
            n("div", { staticClass: "card" }, [
              n("h6", { staticClass: "card-header" }, [
                n("div", [
                  n("span", { staticClass: "issue__author" }, [
                    t._v(t._s(t.title)),
                  ]),
                ]),
              ]),
              n(
                "div",
                { staticClass: "card-body" },
                [
                  n("quill-editor", {
                    ref: "newComment",
                    attrs: { options: t.editorOption },
                    model: {
                      value: t.content,
                      callback: function(e) {
                        t.content = e;
                      },
                      expression: "content",
                    },
                  }),
                ],
                1
              ),
            ]),
            n(
              "button",
              {
                staticClass: "btn btn-primary submit-btn",
                attrs: { type: "button", disabled: !t.content },
                on: { click: t.submitComment },
              },
              [t._v("Submit")]
            ),
          ]),
        ]);
      },
      ra = [],
      oa = {
        name: "NewComment",
        props: { replyId: { type: Number } },
        data: function() {
          return { content: "", editorOption: {} };
        },
        methods: {
          submitComment: function() {
            var t = { content: this.content, parentId: this.replyId };
            this.$emit("submitComment", t), (this.content = "");
          },
        },
        computed: {
          title: function() {
            return this.replyId ? "New reply" : "New comment";
          },
        },
      },
      sa = oa,
      ca = (n("43c8"), Object(O["a"])(sa, ia, ra, !1, null, "4fe612a4", null)),
      la = ca.exports;
    function ua(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function da(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? ua(Object(n), !0).forEach(function(e) {
              Object(R["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : ua(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var pa = {
        name: "Comments",
        components: { NewComment: la },
        props: { rawComments: { type: Array }, postId: { type: Number } },
        data: function() {
          return { comments: [], activeReplyId: null, loading: !1 };
        },
        methods: {
          setActiveReplyId: function(t) {
            this.activeReplyId === t
              ? (this.activeReplyId = null)
              : (this.activeReplyId = t);
          },
          rearrangeCommentList: function() {
            var t = this,
              e = [];
            this.rawComments.forEach(function(n) {
              n.parentId ||
                e.push(
                  da({}, n, {
                    replies: t.rawComments.filter(function(t) {
                      if (t.parentId) return t.parentId === n.id;
                    }),
                  })
                );
            }),
              (this.comments = e);
          },
          submitComment: function(t) {
            var e = this;
            this.loading = !0;
            var n = da({ parentId: null, postId: this.postId }, t);
            Hn.insertComment(n)
              .then(function(t) {
                e.rawComments.push(t), (e.activeReplyId = null);
              })
              .catch()
              .finally(function() {
                e.loading = !1;
              });
          },
          deleteComment: function(t) {
            var e = this;
            this.$swal({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: !0,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then(function(n) {
              n.value &&
                ((e.loading = !0),
                Hn.deleteComment(t)
                  .then(function(n) {
                    200 === n.status &&
                      e.rawComments.splice(
                        e.rawComments.findIndex(function(e) {
                          return e.id === t;
                        }),
                        1
                      ),
                      (e.loading = !1);
                  })
                  .catch());
            });
          },
        },
        computed: {
          showDeleteBtn: function() {
            return !1;
          },
        },
        mounted: function() {
          this.rearrangeCommentList();
        },
        watch: {
          rawComments: function() {
            this.rearrangeCommentList();
          },
        },
      },
      fa = pa,
      ma = (n("dcbe"), Object(O["a"])(fa, na, aa, !1, null, null, null)),
      ga = ma.exports,
      ha = {
        name: "IssueDetailed",
        components: { Comments: ga },
        props: { openIssueId: { type: Number } },
        data: function() {
          return { loading: !1, issue: null };
        },
        methods: {
          getIssueById: function(t) {
            var e = this;
            (this.loading = !0),
              Hn.getIssueById(t)
                .then(function(t) {
                  e.issue = t;
                })
                .catch()
                .finaly(function() {
                  e.loading = !1;
                });
          },
          closeIssue: function() {
            var t = this;
            Hn.closeIssue(this.issue.id)
              .then(function(e) {
                (t.issue = e),
                  t.$store.commit("SET_OPEN_ISSUES", []),
                  t.$store.commit("SET_CLOSED_ISSUES", []);
              })
              .catch();
          },
          back: function() {
            (this.issue = null), this.$emit("back");
          },
          showCloseBtn: function(t) {
            return !1;
          },
          deletePost: function(t) {
            var e = this;
            this.$swal({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: !0,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then(function(n) {
              n.value &&
                ((e.loading = !0),
                Hn.deleteIssue(t)
                  .then(function(t) {
                    200 === t.status &&
                      (1 === e.issue.status &&
                        e.$store.commit("SET_OPEN_ISSUES", []),
                      2 === e.issue.status &&
                        e.$store.commit("SET_CLOSED_ISSUES", []),
                      e.back()),
                      (e.loading = !1);
                  })
                  .catch());
            });
          },
        },
        computed: {
          showDeleteBtn: function() {
            return localStorage.getItem("isAdmin");
          },
        },
        mounted: function() {
          this.openIssueId && this.getIssueById(this.openIssueId);
        },
      },
      va = ha,
      ba = (n("ebd0"), Object(O["a"])(va, ta, ea, !1, null, null, null)),
      ya = ba.exports,
      Ca = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n("div", [
          n("div", [
            n("h4", { staticClass: "title" }, [
              n(
                "button",
                {
                  staticClass: "btn btn-light back-btn",
                  attrs: { type: "button" },
                  on: {
                    click: function(e) {
                      return t.$emit("back");
                    },
                  },
                },
                [
                  n("i", { staticClass: "fas fa-arrow-left" }),
                  t._v(" " + t._s(t.$t("button.back"))),
                ]
              ),
              t._v(t._s(t.$t("menu.information.forum.createIssue")) + "\n    "),
            ]),
            n("form", [
              n("div", { staticClass: "form-group" }, [
                n("label", { attrs: { for: "title" } }, [
                  t._v(t._s(t.$t("form.createIssueForm.title"))),
                ]),
                n("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: t.title,
                      expression: "title",
                    },
                  ],
                  staticClass: "form-control",
                  class: { "is-invalid": !t.titleValid },
                  attrs: {
                    id: "title",
                    placeholder: t.$t("form.createIssueForm.title"),
                    required: "",
                  },
                  domProps: { value: t.title },
                  on: {
                    input: function(e) {
                      e.target.composing || (t.title = e.target.value);
                    },
                  },
                }),
                n("div", { staticClass: "invalid-feedback" }, [
                  t._v(
                    "\n          " +
                      t._s(
                        t.$t(
                          "form.createIssueForm.validationMessages.titleRequired"
                        )
                      ) +
                      "\n        "
                  ),
                ]),
              ]),
              n("div", { staticClass: "form-group" }, [
                n("label", { attrs: { for: "category" } }, [
                  t._v(t._s(t.$t("form.createIssueForm.category"))),
                ]),
                n(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: t.selectedCategory,
                        expression: "selectedCategory",
                      },
                    ],
                    staticClass: "form-control category",
                    class: { "is-invalid": !t.categoryValid },
                    attrs: {
                      id: "category",
                      placeholder: t.$t("form.createIssueForm.title"),
                    },
                    on: {
                      change: function(e) {
                        var n = Array.prototype.filter
                          .call(e.target.options, function(t) {
                            return t.selected;
                          })
                          .map(function(t) {
                            var e = "_value" in t ? t._value : t.value;
                            return e;
                          });
                        t.selectedCategory = e.target.multiple ? n : n[0];
                      },
                    },
                  },
                  t._l(t.categories, function(e) {
                    return n(
                      "option",
                      { key: e.id, domProps: { value: e.id } },
                      [t._v(t._s(e.name))]
                    );
                  }),
                  0
                ),
                n("div", { staticClass: "invalid-feedback" }, [
                  t._v(
                    "\n          " +
                      t._s(
                        t.$t(
                          "form.createIssueForm.validationMessages.categoryRequired"
                        )
                      ) +
                      "\n        "
                  ),
                ]),
              ]),
              n(
                "div",
                { staticClass: "form-group content" },
                [
                  n("label", { attrs: { for: "content" } }, [
                    t._v(t._s(t.$t("form.createIssueForm.content"))),
                  ]),
                  n("quill-editor", {
                    ref: "myQuillEditor",
                    staticClass: "content__editor",
                    class: { "is-invalid": !t.contentValid },
                    attrs: { id: "content", options: t.editorOption },
                    model: {
                      value: t.content,
                      callback: function(e) {
                        t.content = e;
                      },
                      expression: "content",
                    },
                  }),
                  n("div", { staticClass: "invalid-feedback" }, [
                    t._v(
                      "\n          " +
                        t._s(
                          t.$t(
                            "form.createIssueForm.validationMessages.contentRequired"
                          )
                        ) +
                        "\n        "
                    ),
                  ]),
                  n(
                    "button",
                    {
                      staticClass: "btn btn-primary submit-btn",
                      attrs: {
                        type: "button",
                        disabled: t.submitButtonDisabled && !1,
                      },
                      on: { click: t.submitForm },
                    },
                    [
                      t._v(
                        "\n          " +
                          t._s(t.$t("button.submit")) +
                          "\n        "
                      ),
                    ]
                  ),
                ],
                1
              ),
            ]),
          ]),
        ]);
      },
      _a = [],
      Ea = {
        name: "NewIssue",
        data: function() {
          return {
            title: null,
            content: null,
            selectedCategory: 0,
            editorOption: {},
          };
        },
        methods: {
          submitForm: function() {
            var t = this;
            if (
              ((this.title = null !== this.title ? this.title.trim() : ""),
              (this.selectedCategory =
                0 !== this.selectedCategory ? this.selectedCategory : -1),
              (this.content = null !== this.content ? this.content.trim() : ""),
              this.titleValid && this.categoryValid && this.contentValid)
            ) {
              var e = {
                title: this.title.trim(),
                content: this.content,
                categoryId: Number(this.selectedCategory),
              };
              Hn.insertIssue(e)
                .then(function(e) {
                  t.$emit("openIssue", e.id),
                    t.$store.commit("SET_OPEN_ISSUES", []);
                })
                .catch();
            }
          },
        },
        computed: {
          submitButtonDisabled: function() {
            return !!(
              this.titleValid ||
              this.categoryValid ||
              this.contentValid
            );
          },
          titleValid: function() {
            return null === this.title || this.title.trim();
          },
          categoryValid: function() {
            return this.selectedCategory >= 0;
          },
          contentValid: function() {
            return null === this.content || this.content.trim();
          },
          categories: function() {
            return this.$store.state.forum.categories;
          },
        },
      },
      Sa = Ea,
      Oa = (n("b71e"), Object(O["a"])(Sa, Ca, _a, !1, null, "2dba77be", null)),
      Ta = Oa.exports,
      wa = {
        name: "Forum",
        components: { IssueList: Jn, IssueDetailed: ya, NewIssue: Ta },
        data: function() {
          return { activeBlock: "list", openIssueId: null };
        },
        methods: {
          openIssue: function(t) {
            (this.openIssueId = t), (this.activeBlock = "detailed");
          },
          getCategories: function() {
            var t = this;
            Hn.getCategories()
              .then(function(e) {
                t.$store.commit("SET_CATEGORIES", e);
              })
              .catch();
          },
        },
        mounted: function() {
          this.categories.length || this.getCategories();
        },
        computed: {
          categories: function() {
            return this.$store.state.forum.categories;
          },
        },
      },
      La = wa,
      ka = (n("5477"), Object(O["a"])(La, Un, zn, !1, null, null, null)),
      Ia = ka.exports,
      Aa = {
        name: "InfoModal",
        components: {
          About: En,
          FAQ: In,
          ReleaseNotes: Rn,
          Contact: Vn,
          Forum: Ia,
        },
        props: { isOpen: { required: !0, type: Boolean } },
        data: function() {
          return { activeTab: "about" };
        },
        computed: {
          tabs: function() {
            return [
              { key: "about", text: this.$t("menu.information.about.title") },
              { key: "faq", text: this.$t("menu.information.faq") },
              {
                key: "releaseNotes",
                text: this.$t("menu.information.releaseNotes"),
              },
              { key: "forum", text: this.$t("menu.information.forum.title") },
              {
                key: "contact",
                text: this.$t("menu.information.contactUs.title"),
              },
            ];
          },
        },
        methods: {
          changeTab: function(t) {
            this.activeTab = t;
          },
        },
      },
      xa = Aa,
      ja = (n("99ac"), Object(O["a"])(xa, gn, hn, !1, null, null, null)),
      Da = ja.exports,
      Ma = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "div",
          [
            n(
              "CustomModal",
              {
                attrs: {
                  name: "serviceSelectionModal",
                  title: "Services",
                  "min-width": 400,
                  minHeight: 200,
                },
                on: {
                  beforeShow: t.onModalOpen,
                  afterShow: t.onModalOpened,
                  afterHide: t.onModalClose,
                },
              },
              [
                n("div", [
                  n(
                    "ul",
                    { staticClass: "selection-list text-center" },
                    t._l(t.activeLayers, function(e, a) {
                      return n(
                        "li",
                        {
                          key: a,
                          on: {
                            click: function(n) {
                              return t.selectItem(e);
                            },
                          },
                        },
                        [
                          n("span", { staticClass: "list-item" }, [
                            n("h5", [t._v(t._s(e.name))]),
                          ]),
                        ]
                      );
                    }),
                    0
                  ),
                ]),
              ]
            ),
            t.dataModalVisibility
              ? n("DataModal", { attrs: { layerId: t.selectedLayer.id } })
              : t._e(),
          ],
          1
        );
      },
      Ra = [],
      Pa = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "div",
          [
            n(
              "CustomModal",
              {
                attrs: { name: "dataModal", minWidth: 200, minHeight: 200 },
                on: { beforeShow: t.onModalOpen },
              },
              [
                n("div", { staticClass: "row" }, [
                  n("div", { staticClass: "col-md-12" }, [
                    n(
                      "button",
                      {
                        staticClass: "btn btn-primary btn-sm float-right w-100",
                        on: { click: t.showImageUploadModal },
                      },
                      [t._v("\n          Show Files\n        ")]
                    ),
                  ]),
                ]),
                n("div", { staticClass: "row mt-2" }, [
                  n("table", { staticClass: "table  text-center" }, [
                    n("thead", [
                      n("tr", { staticClass: "fields" }, [
                        n("th", { staticClass: "paddingLeft" }, [
                          t._v("Field"),
                        ]),
                        n("th", { staticClass: "paddingRight" }, [
                          t._v("Value"),
                        ]),
                      ]),
                    ]),
                    n(
                      "tbody",
                      { staticClass: "popupTableBody" },
                      t._l(t.data, function(e, a) {
                        return n("tr", { key: a }, [
                          n("td", { staticClass: "paddingLeft" }, [
                            t._v(t._s(a)),
                          ]),
                          n("td", { staticClass: "paddingRight" }, [
                            t._v(t._s(e)),
                          ]),
                        ]);
                      }),
                      0
                    ),
                  ]),
                ]),
              ]
            ),
            n("ImageUploadModal", {
              attrs: { gid: t.gid, layerId: t.layerId },
            }),
          ],
          1
        );
      },
      Ba = [],
      Fa = {
        name: "DataModal",
        components: { ImageUploadModal: ct },
        props: { layerId: { type: Number, required: !0 } },
        methods: {
          onModalOpen: function() {},
          showImageUploadModal: function() {
            X["g"].showImageUploadModal();
          },
        },
        computed: {
          data: function() {
            return X["j"].getInfoData();
          },
          gid: function() {
            return this.data["gid"];
          },
        },
      },
      Na = Fa,
      $a = Object(O["a"])(Na, Pa, Ba, !1, null, null, null),
      Ga = $a.exports,
      Va = {
        name: "ServiceSelectionModal",
        components: { DataModal: Ga },
        data: function() {
          return { activeLayers: [], selectedLayer: null };
        },
        computed: {
          dataModalVisibility: function() {
            return null !== this.selectedLayer;
          },
          clickedCoordinate: function() {
            return X["e"].getClickedCoordinate();
          },
          clickedPixel: function() {
            return X["e"].getClickedPixel();
          },
        },
        methods: {
          onModalOpen: function() {
            this.activeLayers = X["d"].getSelectedDyanmics();
          },
          onModalOpened: function() {
            0 == this.activeLayers.length && X["g"].hideServiceSelectionModal(),
              1 == this.activeLayers.length &&
                (X["g"].hideServiceSelectionModal(),
                this.selectItem(this.activeLayers[0]));
          },
          onModalClose: function() {},
          selectItem: (function() {
            var t = Object(P["a"])(
              regeneratorRuntime.mark(function t(e) {
                var n = this;
                return regeneratorRuntime.wrap(
                  function(t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (t.next = 2),
                            X["j"]
                              .getGeometryData(e.id, this.clickedCoordinate)
                              .then(function(t) {
                                var a = t.features[0].attributes;
                                f["a"].isEmpty(a)
                                  ? K["c"].error(
                                      "Data Not Exist In This Coordinate!"
                                    )
                                  : new Promise(function(t) {
                                      (n.selectedLayer = e),
                                        X["j"].setInfoData(a),
                                        t();
                                    }).then(function(t) {
                                      X["g"].showDataModal(),
                                        X["e"].focusToServicePolygon(
                                          e.id,
                                          n.clickedPixel
                                        );
                                    }),
                                  X["g"].hideServiceSelectionModal();
                              })
                          );
                        case 2:
                          t.sent;
                        case 3:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
      },
      Ua = Va,
      za = (n("aa81"), Object(O["a"])(Ua, Ma, Ra, !1, null, "45933282", null)),
      Ha = za.exports,
      qa = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "CustomModal",
          {
            attrs: {
              name: "printModal",
              title: t.$t("form.printForm.modalTitle"),
              width: "50%",
              minHeight: 500,
            },
            on: { beforeShow: t.onModalOpen, afterHide: t.onModalClose },
          },
          [
            n("form", [
              n("div", { staticClass: "row", attrs: { id: "mapPrint" } }, [
                n("div", { staticClass: "col-md-12" }, [
                  n("h3", { staticClass: "text-center" }, [
                    t._v(t._s(t.$t("form.printForm.options"))),
                  ]),
                ]),
                n("div", { staticClass: "col-md-12" }, [
                  n(
                    "div",
                    {
                      staticClass: "row mb-3 option-content",
                      class: { "disable-content": !t.hasTitle },
                    },
                    [
                      n("div", { staticClass: "col-md-1 align-self-center" }, [
                        n("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: t.hasTitle,
                              expression: "hasTitle",
                            },
                          ],
                          staticClass: "checkbox",
                          attrs: { type: "checkbox" },
                          domProps: {
                            checked: Array.isArray(t.hasTitle)
                              ? t._i(t.hasTitle, null) > -1
                              : t.hasTitle,
                          },
                          on: {
                            change: function(e) {
                              var n = t.hasTitle,
                                a = e.target,
                                i = !!a.checked;
                              if (Array.isArray(n)) {
                                var r = null,
                                  o = t._i(n, r);
                                a.checked
                                  ? o < 0 && (t.hasTitle = n.concat([r]))
                                  : o > -1 &&
                                    (t.hasTitle = n
                                      .slice(0, o)
                                      .concat(n.slice(o + 1)));
                              } else t.hasTitle = i;
                            },
                          },
                        }),
                      ]),
                      n("div", { staticClass: "col-md-11" }, [
                        n("label", { staticClass: "d-block" }, [
                          t._v(t._s(t.$t("form.printForm.title"))),
                        ]),
                        n("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: t.title,
                              expression: "title",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            type: "text",
                            id: "title",
                            placeholder: t.$t("form.printForm.title"),
                            disabled: !t.hasTitle,
                          },
                          domProps: { value: t.title },
                          on: {
                            input: function(e) {
                              e.target.composing || (t.title = e.target.value);
                            },
                          },
                        }),
                      ]),
                    ]
                  ),
                  n(
                    "div",
                    {
                      staticClass: "row mb-3",
                      class: { "disable-content": !t.hastScale },
                    },
                    [
                      n("div", { staticClass: "col-md-1 align-self-center" }, [
                        n("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: t.hastScale,
                              expression: "hastScale",
                            },
                          ],
                          staticClass: "checkbox",
                          attrs: { type: "checkbox" },
                          domProps: {
                            checked: Array.isArray(t.hastScale)
                              ? t._i(t.hastScale, null) > -1
                              : t.hastScale,
                          },
                          on: {
                            change: function(e) {
                              var n = t.hastScale,
                                a = e.target,
                                i = !!a.checked;
                              if (Array.isArray(n)) {
                                var r = null,
                                  o = t._i(n, r);
                                a.checked
                                  ? o < 0 && (t.hastScale = n.concat([r]))
                                  : o > -1 &&
                                    (t.hastScale = n
                                      .slice(0, o)
                                      .concat(n.slice(o + 1)));
                              } else t.hastScale = i;
                            },
                          },
                        }),
                      ]),
                      n("div", { staticClass: "col-md-11" }, [
                        n("div", { staticClass: "form-group" }, [
                          n("label", { staticClass: "d-block" }, [
                            t._v(t._s(t.$t("form.printForm.scale"))),
                          ]),
                          n("span", [
                            n("small", [
                              n("strong", [
                                t._v(" " + t._s(t.currentResolution)),
                              ]),
                            ]),
                          ]),
                        ]),
                      ]),
                    ]
                  ),
                  n(
                    "div",
                    {
                      staticClass: "row mb-3",
                      class: { "disable-content": !t.hasExtent },
                    },
                    [
                      n("div", { staticClass: "col-md-1 align-self-center" }, [
                        n("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: t.hasExtent,
                              expression: "hasExtent",
                            },
                          ],
                          staticClass: "checkbox",
                          attrs: { type: "checkbox" },
                          domProps: {
                            checked: Array.isArray(t.hasExtent)
                              ? t._i(t.hasExtent, null) > -1
                              : t.hasExtent,
                          },
                          on: {
                            change: function(e) {
                              var n = t.hasExtent,
                                a = e.target,
                                i = !!a.checked;
                              if (Array.isArray(n)) {
                                var r = null,
                                  o = t._i(n, r);
                                a.checked
                                  ? o < 0 && (t.hasExtent = n.concat([r]))
                                  : o > -1 &&
                                    (t.hasExtent = n
                                      .slice(0, o)
                                      .concat(n.slice(o + 1)));
                              } else t.hasExtent = i;
                            },
                          },
                        }),
                      ]),
                      n("div", { staticClass: "col-md-11" }, [
                        n("div", { staticClass: "form-group" }, [
                          n("label", { staticClass: "d-block" }, [
                            t._v(t._s(t.$t("form.printForm.coordinate"))),
                          ]),
                          n("span", [
                            n("small", [
                              n("strong", [t._v(" " + t._s(t.currentExtent))]),
                            ]),
                          ]),
                        ]),
                      ]),
                    ]
                  ),
                ]),
                n("div", { staticClass: "col-md-12" }, [
                  n("div", { staticClass: "form-group" }, [
                    n(
                      "button",
                      {
                        staticClass: "btn btn-success float-right",
                        attrs: { type: "button" },
                        on: { click: t.print },
                      },
                      [
                        t._v(
                          "\n            " +
                            t._s(t.$t("button.print")) +
                            "\n          "
                        ),
                      ]
                    ),
                  ]),
                ]),
              ]),
            ]),
          ]
        );
      },
      Qa = [],
      Ya = (n("4917"), n("28a5"), n("8baf")),
      Za = {
        name: "PrintModal",
        data: function() {
          return {
            title: "",
            hasTitle: !0,
            hasExtent: !0,
            hastScale: !0,
            hasTime: !0,
            hasLogo: !0,
            dims: {
              a0: [1189, 841],
              a1: [841, 594],
              a2: [594, 420],
              a3: [420, 297],
              a4: [297, 210],
              a5: [210, 148],
            },
            pdfDims: { a4: [595.28, 841.89] },
            format: "a4",
            resolution: "72",
            base64img: "",
            padding: 22,
            headerFontSize: 22,
            subHeaderFontSize: 22,
            contentFontSize: 22,
            logo: dt["c"],
            compass: dt["a"],
          };
        },
        created: (function() {
          var t = Object(P["a"])(
            regeneratorRuntime.mark(function t() {
              return regeneratorRuntime.wrap(function(t) {
                while (1)
                  switch ((t.prev = t.next)) {
                    case 0:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          );
          function e() {
            return t.apply(this, arguments);
          }
          return e;
        })(),
        computed: {
          dim: function() {
            return this.dims[this.format];
          },
          currentExtent: function() {
            return X["e"].getCurrentExtent();
          },
          currentResolution: function() {
            return X["e"].getCurrentResolution().toFixed(2);
          },
          imageWidth: function() {
            return Math.round((this.dim[0] * this.resolution) / 25.4);
          },
          imageHeight: function() {
            return Math.round((this.dim[1] * this.resolution) / 25.4);
          },
          selectedDynamics: function() {
            return X["d"].getSelectedDyanmics();
          },
        },
        methods: {
          onModalOpen: function() {
            var t = this,
              e = this.imageWidth,
              n = this.imageHeight,
              a = X["e"].getMap(),
              i = a.getSize(),
              r = a.getView().getResolution();
            a.once("rendercomplete", function() {
              var o = document.createElement("canvas");
              (o.width = e), (o.height = n);
              var s = o.getContext("2d");
              Array.prototype.forEach.call(
                document.querySelectorAll(".ol-layer canvas"),
                function(t) {
                  if (t.width > 0) {
                    var e = t.parentNode.style.opacity;
                    s.globalAlpha = "" === e ? 1 : Number(e);
                    var n = t.style.transform,
                      a = n
                        .match(/^matrix\(([^\(]*)\)$/)[1]
                        .split(",")
                        .map(Number);
                    CanvasRenderingContext2D.prototype.setTransform.apply(s, a),
                      s.drawImage(t, 0, 0);
                  }
                }
              ),
                (t.base64img = o.toDataURL("image/png")),
                a.setSize(i),
                a.getView().setResolution(r),
                (document.body.style.cursor = "auto");
            });
            var o = [e, n];
            a.setSize(o);
            var s = Math.min(e / i[0], n / i[1]);
            a.getView().setResolution(r / s);
          },
          onModalClose: function() {},
          print: (function() {
            var t = Object(P["a"])(
              regeneratorRuntime.mark(function t() {
                var e,
                  n,
                  a,
                  i,
                  r,
                  o,
                  s,
                  c,
                  l,
                  u,
                  d,
                  p,
                  f,
                  m,
                  g,
                  h,
                  v,
                  b,
                  y,
                  C,
                  _,
                  E,
                  S,
                  O,
                  T,
                  w,
                  L,
                  k,
                  I,
                  A,
                  x,
                  j,
                  D,
                  M,
                  R,
                  P,
                  B,
                  F,
                  N,
                  $,
                  G,
                  V,
                  U,
                  z,
                  H,
                  q,
                  Q,
                  Y,
                  Z,
                  W;
                return regeneratorRuntime.wrap(
                  function(t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          (e = new Ya["a"]({ format: this.format })),
                            (n = e.internal.pageSize.width),
                            (a = e.internal.pageSize.height),
                            (i = n / 2),
                            (r = 20),
                            (o = 14),
                            (s = 10),
                            (c = 39),
                            (l = n - 20),
                            (u = a - 50),
                            (d = 8),
                            (p = 20),
                            (f = a - 90),
                            (m = 8),
                            (g = 20),
                            a - 100,
                            (h = 8),
                            (v = 20),
                            a - 75,
                            (b = 20),
                            (y = 70),
                            (C = 10),
                            (_ = 10),
                            (E = 40),
                            (S = 8),
                            (O = 20),
                            (T = 20),
                            (w = s + l - (10 + O)),
                            (L = 45),
                            this.hasTitle &&
                              (e.setFontSize(o),
                              e.text(this.title, i, r, {
                                align: "center",
                                maxWidth: 80,
                              })),
                            (k = f),
                            this.hasExtent &&
                              ((I = this.$t("form.printForm.coordinate")),
                              e.setFontSize(d),
                              e.text("".concat(I, " : "), p, k),
                              e.setFontSize(d - 1),
                              (A = (n - (p + e.getTextWidth(I))) / 2),
                              e.text(
                                this.currentExtent.join(" , "),
                                p + e.getTextWidth(I) + 5,
                                k,
                                { maxWidth: A }
                              ),
                              (k += 8)),
                            this.hastScale &&
                              ((x = this.$t("form.printForm.scale")),
                              e.setFontSize(m),
                              e.text(
                                "".concat(x, " : ") +
                                  this.currentResolution +
                                  " km",
                                g,
                                k
                              ),
                              (k += 5)),
                            e.setFontSize(h),
                            (j = new Date()),
                            (D = this.$t("general.date")),
                            (M = this.$t("general.time")),
                            (R =
                              "".concat(D, " : ") +
                              j.getDate() +
                              "/" +
                              (j.getMonth() + 1) +
                              "/" +
                              j.getFullYear() +
                              "  ".concat(M, " : ") +
                              j.getHours() +
                              ":" +
                              j.getMinutes() +
                              ":" +
                              j.getSeconds()),
                            e.text(R, v, k),
                            (k += 5),
                            e.rect(s, c, l, u),
                            e.addImage(this.logo, "PNG", C, _, E, S),
                            e.addImage(this.compass, "PNG", w, L, O, T),
                            (P = this.imageWidth),
                            (B = this.imageHeight),
                            (F = n / P),
                            (N = a / B),
                            ($ = F > N ? N : F),
                            (G = P * $),
                            (V = B * $),
                            (n - P) / 2,
                            (a - B) / 2,
                            e.addImage(
                              this.base64img,
                              "PNG",
                              b,
                              y,
                              G - 40,
                              V - 20
                            ),
                            this.selectedDynamics.length > 0 &&
                              ((U = n / 2 + 20),
                              (z = 10),
                              (H = 8),
                              (q = U + 10),
                              (Q = U + 5),
                              (Y = 2),
                              (Z = 2),
                              (W = a - 90),
                              this.selectedDynamics.forEach(function(t) {
                                e.setFontSize(z),
                                  e.text(t.name, U, W),
                                  (W += 5);
                                for (
                                  var n = X["d"].getLayerColorConditionList(t),
                                    a = 0;
                                  a < n.length;
                                  a++
                                ) {
                                  var i = n[a];
                                  if (W > c + u) break;
                                  var r = Object(it["e"])(i.borderColor),
                                    o = Object(it["e"])(i.fillColor);
                                  e.setDrawColor(r.r, r.g, r.b),
                                    e.setFillColor(o.r, o.g, o.b),
                                    e.rect(Q, W - Y, Y, Z, "FD"),
                                    e.setFontSize(H),
                                    e.text(i.title, q, W),
                                    (W += 5);
                                }
                                W += 5;
                              })),
                            e.autoPrint(),
                            window.open(e.output("bloburl"));
                        case 56:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e() {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
      },
      Wa = Za,
      Ka = (n("214a"), Object(O["a"])(Wa, qa, Qa, !1, null, "00a1632f", null)),
      Xa = Ka.exports,
      Ja = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "CustomModal",
          {
            attrs: {
              name: "computedLayerModal",
              title: t.$t("form.bunchLayerForm.modalTitle"),
              width: 400,
              minHeight: 300,
            },
          },
          [
            t.loading ? n("Loader") : t._e(),
            n("div", [
              n("form", [
                n("div", { staticClass: "row mt-3" }, [
                  n("div", { staticClass: "col-md-12" }, [
                    n(
                      "div",
                      { ref: "computedForm", staticClass: "form-group" },
                      [
                        n("label", { attrs: { for: "label" } }, [
                          t._v(t._s(t.$t("form.bunchLayerForm.label"))),
                        ]),
                        n("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: t.data.label,
                              expression: "data.label",
                            },
                          ],
                          staticClass: "form-control",
                          class: {
                            "is-invalid":
                              t.submitted && !t.$v.data.label.required,
                          },
                          attrs: {
                            type: "text",
                            placeholder: t.$t("form.bunchLayerForm.label"),
                            id: "label",
                          },
                          domProps: { value: t.data.label },
                          on: {
                            input: function(e) {
                              e.target.composing ||
                                t.$set(t.data, "label", e.target.value);
                            },
                          },
                        }),
                        t.submitted && !t.$v.data.label.required
                          ? n("div", { staticClass: "invalid-feedback" }, [
                              t._v(
                                "\n              " +
                                  t._s(
                                    t.$t(
                                      "form.bunchLayerForm.validationMessages.labelRequired"
                                    )
                                  ) +
                                  "\n            "
                              ),
                            ])
                          : t._e(),
                      ]
                    ),
                  ]),
                  n("div", { staticClass: "col-md-12" }, [
                    n(
                      "div",
                      { staticClass: "form-group" },
                      [
                        n("label", { attrs: { for: "layers" } }, [
                          t._v(t._s(t.$t("form.bunchLayerForm.layers"))),
                        ]),
                        n("treeselect", {
                          class: {
                            "is-invalid":
                              t.submitted && !t.$v.data.layerIds.required,
                          },
                          attrs: {
                            multiple: !0,
                            "show-count": !0,
                            options: t.dynamicOptions,
                            placeholder: t.$t("form.bunchLayerForm.layers"),
                            limit: 4,
                            "disable-branch-nodes": !0,
                            "search-nested": "",
                          },
                          model: {
                            value: t.data.layerIds,
                            callback: function(e) {
                              t.$set(t.data, "layerIds", e);
                            },
                            expression: "data.layerIds",
                          },
                        }),
                        t.submitted && !t.$v.data.layerIds.required
                          ? n("div", { staticClass: "invalid-feedback" }, [
                              t._v(
                                "\n              " +
                                  t._s(
                                    t.$t(
                                      "form.bunchLayerForm.validationMessages.layersRequired"
                                    )
                                  ) +
                                  "\n            "
                              ),
                            ])
                          : t._e(),
                      ],
                      1
                    ),
                  ]),
                  n("div", { staticClass: "col-md-12" }, [
                    n(
                      "button",
                      {
                        staticClass: "btn btn-primary float-right",
                        attrs: { type: "button", disabled: t.loading },
                        on: { click: t.add },
                      },
                      [
                        t._v(
                          "\n            " +
                            t._s(t.$t("button.add")) +
                            "\n          "
                        ),
                      ]
                    ),
                  ]),
                ]),
              ]),
            ]),
          ],
          1
        );
      },
      ti = [],
      ei = n("ca17"),
      ni = n.n(ei),
      ai =
        (n("542c"),
        {
          name: "ComputedLayersModal",
          components: { Multiselect: F.a, Treeselect: ni.a },
          updated: function() {
            this.dynamicOptons;
          },
          data: function() {
            return {
              value: null,
              loading: !1,
              submitted: !1,
              data: { label: "", layerIds: [] },
            };
          },
          validations: {
            data: {
              label: { required: Fn["required"] },
              layerIds: { required: Fn["required"] },
            },
          },
          methods: {
            resetData: function() {
              this.data = { label: "", layerIds: [] };
            },
            add: function() {
              var t = this;
              (this.submitted = !0),
                this.$v.$touch(),
                this.$v.$invalid ||
                  ((this.loading = !0),
                  ie["a"]
                    .add(this.data)
                    .then(function(e) {
                      t.$store.dispatch("fetchBunchList"),
                        t.resetData(),
                        K["c"].created(),
                        t.$moodal.computedLayerModal.hide();
                    })
                    .finally(function() {
                      t.loading = !1;
                    }));
            },
          },
          computed: {
            dynamicOptions: function() {
              var t = X["d"].getDynamicLayerAsTreeSelect();
              return t;
            },
          },
        }),
      ii = ai,
      ri = (n("7b02"), Object(O["a"])(ii, Ja, ti, !1, null, null, null)),
      oi = ri.exports,
      si = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "CustomModal",
          {
            attrs: {
              name: "changeDetectionModal",
              title: "Change detection",
              width: 800,
              minHeight: 400,
            },
            on: {
              afterHide: function(e) {
                return t.$emit("close");
              },
            },
          },
          [
            n("div", { staticClass: "row form-group" }, [
              n("div", { staticClass: "col-md-12" }, [
                n(
                  "div",
                  { staticClass: "detector" },
                  [
                    n("treeselect", {
                      attrs: {
                        multiple: !0,
                        "show-count": !0,
                        options: t.baseOptions,
                        limit: 4,
                        valueFormat: "object",
                        "disable-branch-nodes": !0,
                        "search-nested": "",
                      },
                      model: {
                        value: t.selectedLayers,
                        callback: function(e) {
                          t.selectedLayers = e;
                        },
                        expression: "selectedLayers",
                      },
                    }),
                    n(
                      "div",
                      { staticClass: "detector-list row" },
                      t._l(t.exportedImages, function(e, a) {
                        return n(
                          "div",
                          {
                            key: a,
                            staticClass: "detector-list-item col-md-4",
                          },
                          [
                            n("p", [t._v(t._s(e.label))]),
                            n("div", { staticClass: "image-wrapper" }, [
                              n("img", { attrs: { src: e.image } }),
                            ]),
                          ]
                        );
                      }),
                      0
                    ),
                  ],
                  1
                ),
              ]),
            ]),
          ]
        );
      },
      ci = [],
      li =
        (n("ac4d"),
        n("8a81"),
        {
          components: { Treeselect: ni.a },
          data: function() {
            return { selectedLayers: [], exportedImages: [] };
          },
          watch: {
            selectedLayers: (function() {
              var t = Object(P["a"])(
                regeneratorRuntime.mark(function t(e) {
                  var n, a, i, r, o, s, c, l;
                  return regeneratorRuntime.wrap(
                    function(t) {
                      while (1)
                        switch ((t.prev = t.next)) {
                          case 0:
                            for (
                              this.exportedImages = [],
                                n = nt["e"].bboxToExtent(this.bbox),
                                a = !0,
                                i = !1,
                                r = void 0,
                                t.prev = 5,
                                o = e[Symbol.iterator]();
                              !(a = (s = o.next()).done);
                              a = !0
                            )
                              (c = s.value),
                                (l = nt["h"].getImageUrl(
                                  c.label,
                                  n,
                                  pt["e"].ARCGIS
                                )),
                                this.exportedImages.push({
                                  image: l,
                                  label: c.label,
                                });
                            t.next = 13;
                            break;
                          case 9:
                            (t.prev = 9),
                              (t.t0 = t["catch"](5)),
                              (i = !0),
                              (r = t.t0);
                          case 13:
                            (t.prev = 13),
                              (t.prev = 14),
                              a || null == o.return || o.return();
                          case 16:
                            if (((t.prev = 16), !i)) {
                              t.next = 19;
                              break;
                            }
                            throw r;
                          case 19:
                            return t.finish(16);
                          case 20:
                            return t.finish(13);
                          case 21:
                          case "end":
                            return t.stop();
                        }
                    },
                    t,
                    this,
                    [
                      [5, 9, 13, 21],
                      [14, , 16, 20],
                    ]
                  );
                })
              );
              function e(e) {
                return t.apply(this, arguments);
              }
              return e;
            })(),
          },
          computed: {
            baseOptions: function() {
              var t = X["d"].getBasemapLayerAsTreeSelect();
              return t;
            },
            bbox: function() {
              return X["k"].getBbox();
            },
          },
        }),
      ui = li,
      di = Object(O["a"])(ui, si, ci, !1, null, null, null),
      pi = di.exports,
      fi = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "CustomModal",
          {
            attrs: {
              name: "ndviAssessmentModal",
              title: t.$t("form.ndviAssesmentForm.modalTitle"),
              width: "95%",
              minHeight: 400,
            },
            on: { beforeShow: t.onModalOpen, afterHide: t.onModalClose },
          },
          [
            n("form", [
              n("div", { staticClass: "row" }, [
                n("div", { staticClass: "col-md-12" }, [
                  n("div", { staticClass: "form-group" }, [
                    n("label", { attrs: { for: "ndvis" } }, [
                      t._v(t._s(t.$t("form.ndviAssesmentForm.layers"))),
                    ]),
                    n("div", { staticClass: "d-block" }, [
                      n("div", { staticClass: "row" }, [
                        n(
                          "div",
                          { staticClass: "col-md-9 p-0" },
                          [
                            n("Multiselect", {
                              staticStyle: { display: "inline-block" },
                              attrs: {
                                id: "ndvis",
                                placeholder: "Select Ndvis",
                                options: t.options,
                                multiple: !0,
                                "close-on-select": !1,
                                "custom-label": t.ndviCustomLabel,
                                label: "ndvi",
                                "track-by": "ndvi",
                              },
                              on: { input: t.onChange },
                              model: {
                                value: t.selectedNdvis,
                                callback: function(e) {
                                  t.selectedNdvis = e;
                                },
                                expression: "selectedNdvis",
                              },
                            }),
                          ],
                          1
                        ),
                        n(
                          "div",
                          {
                            staticClass: "col-md-3 p-0 ",
                            class: { active: t.isPointExist },
                          },
                          [
                            n("div", { staticClass: "text-center" }, [
                              n(
                                "div",
                                {
                                  staticClass: "btn-group-toggle",
                                  attrs: { "data-toggle": "buttons" },
                                },
                                [
                                  n(
                                    "label",
                                    {
                                      staticClass: "btn btn-info  mr-2",
                                      attrs: {
                                        title: t.$t(
                                          "form.ndviAssesmentForm.pickPoint"
                                        ),
                                      },
                                    },
                                    [
                                      n("input", {
                                        attrs: {
                                          type: "checkbox",
                                          name: "pointSelectionBtn",
                                        },
                                        domProps: {
                                          value: t.drawTypeEnum.POINT,
                                        },
                                        on: { click: t.onPointSelection },
                                      }),
                                      n("img", {
                                        attrs: { src: t.icons.point },
                                      }),
                                    ]
                                  ),
                                  n(
                                    "label",
                                    {
                                      staticClass: "btn   mr-2",
                                      class: {
                                        active: t.isPointExist,
                                        "btn-success": !t.isBasemapsShowing,
                                        "btn-danger": t.isBasemapsShowing,
                                      },
                                      attrs: {
                                        title: t.isBasemapsShowing
                                          ? t.$t(
                                              "form.ndviAssesmentForm.hideBasemaps"
                                            )
                                          : t.$t(
                                              "form.ndviAssesmentForm.showBasemaps"
                                            ),
                                      },
                                    },
                                    [
                                      n("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: t.isBasemapsShowing,
                                            expression: "isBasemapsShowing",
                                          },
                                        ],
                                        attrs: { type: "checkbox" },
                                        domProps: {
                                          checked: Array.isArray(
                                            t.isBasemapsShowing
                                          )
                                            ? t._i(t.isBasemapsShowing, null) >
                                              -1
                                            : t.isBasemapsShowing,
                                        },
                                        on: {
                                          change: function(e) {
                                            var n = t.isBasemapsShowing,
                                              a = e.target,
                                              i = !!a.checked;
                                            if (Array.isArray(n)) {
                                              var r = null,
                                                o = t._i(n, r);
                                              a.checked
                                                ? o < 0 &&
                                                  (t.isBasemapsShowing = n.concat(
                                                    [r]
                                                  ))
                                                : o > -1 &&
                                                  (t.isBasemapsShowing = n
                                                    .slice(0, o)
                                                    .concat(n.slice(o + 1)));
                                            } else t.isBasemapsShowing = i;
                                          },
                                        },
                                      }),
                                      t._v(
                                        "\n                      " +
                                          t._s(
                                            t.isBasemapsShowing
                                              ? t.$t(
                                                  "form.ndviAssesmentForm.hideBasemaps"
                                                )
                                              : t.$t(
                                                  "form.ndviAssesmentForm.showBasemaps"
                                                )
                                          ) +
                                          "\n                    "
                                      ),
                                    ]
                                  ),
                                ]
                              ),
                            ]),
                          ]
                        ),
                      ]),
                      t.isPointExist
                        ? n("small", { staticClass: "form-text text-muted" }, [
                            t._v(
                              "\n              Point Location | x : " +
                                t._s(t.pointCoordinates[0]) +
                                " , y :\n              " +
                                t._s(t.pointCoordinates[1]) +
                                "\n            "
                            ),
                          ])
                        : t._e(),
                    ]),
                  ]),
                ]),
              ]),
              n(
                "div",
                {
                  staticStyle: {
                    display: "flex",
                    "flex-direction": "row",
                    "justify-content": "space-around",
                    "align-items": "baseline",
                  },
                },
                t._l(t.selectedNdvis, function(e, a) {
                  return n(
                    "div",
                    {
                      key: a,
                      staticStyle: {
                        margin: "0 1rem",
                        padding: "1rem",
                        "background-color": "#cccccc33",
                      },
                    },
                    [
                      n("div", { staticStyle: { margin: "0.5rem 0" } }, [
                        n("h5", { staticClass: "text-center" }, [
                          t._v(t._s(e.ndvi.name)),
                        ]),
                        n("img", {
                          staticClass: "img-responsive mw-100",
                          attrs: { src: t.getImgUrl(e.ndvi) },
                        }),
                      ]),
                      n(
                        "div",
                        {
                          class: { "d-none": !t.isBasemapsShowing },
                          staticStyle: {
                            display: "flex",
                            "flex-direction": "column",
                          },
                        },
                        t._l(e.basemaps, function(e, a) {
                          return n("div", { key: a }, [
                            n("div", { staticStyle: { margin: "0.5rem 0" } }, [
                              n("h6", { staticClass: "text-center" }, [
                                t._v(t._s(e.name)),
                              ]),
                              n("img", {
                                staticClass: "img-responsive mw-100",
                                attrs: { src: t.getImgUrl(e) },
                              }),
                            ]),
                          ]);
                        }),
                        0
                      ),
                    ]
                  );
                }),
                0
              ),
              n("div", { staticClass: "row" }, [
                t.isChartVisible
                  ? n(
                      "div",
                      { staticClass: "col-md-12" },
                      [
                        n("line-chart", {
                          attrs: {
                            "chart-data": t.chartData,
                            options: t.chartOptions,
                            height: 100,
                          },
                        }),
                      ],
                      1
                    )
                  : t._e(),
              ]),
            ]),
          ]
        );
      },
      mi = [],
      gi = {
        getNdvis: function() {
          return J["a"].get(W["k"].GET_ALL);
        },
        getNdviValue: (function() {
          var t = Object(P["a"])(
            regeneratorRuntime.mark(function t(e, n, a) {
              var i, r, o, s, c, l, u, d, p;
              return regeneratorRuntime.wrap(
                function(t) {
                  while (1)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (t.next = 2), this.getNdviInfo(e);
                      case 2:
                        return (
                          (i = t.sent),
                          (r = i.data.fullExtent),
                          (o = {
                            xmin: r.xmin,
                            ymin: r.ymin,
                            xmax: r.xmax,
                            ymax: r.ymax,
                          }),
                          (s = {
                            geometry: " ".concat(n, ", ").concat(a),
                            geometryType: "esriGeometryPoint",
                            mapExtent: JSON.stringify(o),
                            tolerance: 0,
                            time: 4,
                            geometryPrecision: 4,
                            imageDisplay: 50,
                            returnGeometry: !1,
                            returnCatalogItems: !1,
                            f: "pjson",
                          }),
                          (c = ""
                            .concat(W["b"].SERVICE_URl, "/")
                            .concat(e, "/Identify?")
                            .concat(nt["h"].formatQueryString(s))),
                          (t.next = 9),
                          J["a"].get(c)
                        );
                      case 9:
                        return (
                          (l = t.sent),
                          (u = l.data.results),
                          (d = u[0].attributes),
                          (p = {
                            red: f["a"].isUndefined(d["Red"]) ? 0 : d["Red"],
                            green: f["a"].isUndefined(d["Green"])
                              ? 0
                              : d["Green"],
                            blue: f["a"].isUndefined(d["Blue"]) ? 0 : d["Blue"],
                            alpha: f["a"].isUndefined(d["Alpha"])
                              ? 0
                              : d["Alpha"],
                          }),
                          t.abrupt("return", p)
                        );
                      case 14:
                      case "end":
                        return t.stop();
                    }
                },
                t,
                this
              );
            })
          );
          function e(e, n, a) {
            return t.apply(this, arguments);
          }
          return e;
        })(),
        getNdviInfo: function(t) {
          var e = { token: K["d"].getToken(), f: "json" },
            n = ""
              .concat(W["b"].SERVICE_URl, "/")
              .concat(t, "/info?")
              .concat(nt["h"].formatQueryString(e));
          return J["a"].get(n);
        },
      },
      hi = (n("778c"), n("1fca")),
      vi = hi["b"].reactiveProp,
      bi = {
        extends: hi["a"],
        mixins: [vi],
        props: ["options"],
        mounted: function() {
          this.renderChart(this.chartData, this.options);
        },
      },
      yi = {
        components: { Multiselect: F.a, LineChart: bi },
        props: { visible: { type: Boolean } },
        data: function() {
          return {
            icons: dt["b"],
            drawTypeEnum: pt["b"],
            options: [],
            selectedNdvis: [],
            chartData: null,
            isPointValueExist: !1,
            chartOptions: { title: { display: !0, text: "Ndvi Data" } },
            pointCoordinates: null,
            isModalHidingForPoint: !1,
            isCalculating: !1,
            isBasemapsShowing: !0,
          };
        },
        mounted: function() {
          this.getNdvis();
        },
        methods: {
          resetData: function() {
            (this.selectedNdvis = []),
              (this.chartData = null),
              (this.pointCoordinates = null),
              (this.isModalHidingForPoint = !1);
          },
          getNdvis: (function() {
            var t = Object(P["a"])(
              regeneratorRuntime.mark(function t() {
                var e;
                return regeneratorRuntime.wrap(
                  function(t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (t.next = 2), gi.getNdvis();
                        case 2:
                          (e = t.sent),
                            (e = e.map(function(t) {
                              return (
                                (t.basemaps = t.basemaps.map(function(t) {
                                  return nt["d"].basemapMapping(t);
                                })),
                                (t.ndvi = nt["d"].basemapMapping(t.ndvi)),
                                t
                              );
                            })),
                            (this.options = e);
                        case 5:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e() {
              return t.apply(this, arguments);
            }
            return e;
          })(),
          onPointSelection: function(t) {
            var e = this,
              n = t.target.value;
            (this.isModalHidingForPoint = !0),
              X["g"].hideNdviAssessmentModal(),
              X["k"].pickDrawType(n, function() {
                X["g"].showNdviAssessmentModal(),
                  (e.isModalHidingForPoint = !1),
                  (e.pointCoordinates = e.bbox),
                  e.buildGraph();
              });
          },
          onChange: (function() {
            var t = Object(P["a"])(
              regeneratorRuntime.mark(function t() {
                return regeneratorRuntime.wrap(
                  function(t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          if (!this.isPointExist) {
                            t.next = 3;
                            break;
                          }
                          return (t.next = 3), this.buildGraph();
                        case 3:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e() {
              return t.apply(this, arguments);
            }
            return e;
          })(),
          calculateGraphData: function(t) {
            var e = this,
              n = [],
              a = 0;
            return new Promise(function(i, r) {
              t.forEach(
                (function() {
                  var r = Object(P["a"])(
                    regeneratorRuntime.mark(function r(o) {
                      var s, c, l;
                      return regeneratorRuntime.wrap(function(r) {
                        while (1)
                          switch ((r.prev = r.next)) {
                            case 0:
                              return (
                                (s = e.pointCoordinates[0]),
                                (c = e.pointCoordinates[1]),
                                (r.next = 4),
                                gi.getNdviValue(o.ndvi.name, s, c)
                              );
                            case 4:
                              (l = r.sent),
                                n.push({
                                  value: l,
                                  label: o.ndvi.name,
                                  service: o,
                                }),
                                a++,
                                a === t.length && i(n);
                            case 8:
                            case "end":
                              return r.stop();
                          }
                      }, r);
                    })
                  );
                  return function(t) {
                    return r.apply(this, arguments);
                  };
                })()
              );
            });
          },
          calculateNdviValue: function(t, e, n, a) {
            return (a - t) / (a + t);
          },
          orderGraphDataBySelecteds: function(t, e) {
            var n = [];
            return (
              t.forEach(function(t) {
                var a = e.find(function(e) {
                  return e.service.ndvi.name == t.ndvi.name;
                });
                a && n.push(a);
              }),
              n
            );
          },
          buildGraph: (function() {
            var t = Object(P["a"])(
              regeneratorRuntime.mark(function t() {
                var e,
                  n = this;
                return regeneratorRuntime.wrap(
                  function(t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          (this.isCalculating = !0),
                            (e = this.selectedNdvis),
                            this.calculateGraphData(e).then(function(t) {
                              var a = n.orderGraphDataBySelecteds(e, t),
                                i = [],
                                r = [];
                              a.forEach(function(t) {
                                var e = t.value,
                                  a = e.red,
                                  o = e.green,
                                  s = e.blue,
                                  c = e.alpha,
                                  l = n.calculateNdviValue(a, o, s, c);
                                i.push(l), r.push(t.label);
                              });
                              var o = {
                                label: "NDVI Index Value",
                                borderColor: "rgba(50, 115, 220, 0.5)",
                                backgroundColor: "rgba(50, 115, 220, 0.1)",
                                data: i,
                              };
                              (n.chartData = { labels: r, datasets: [o] }),
                                (n.isCalculating = !1);
                            });
                        case 3:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e() {
              return t.apply(this, arguments);
            }
            return e;
          })(),
          ndviCustomLabel: function(t) {
            return t.ndvi.name;
          },
          getImgUrl: function(t) {
            var e = nt["e"].bboxToExtent(X["h"].getNdviExtent()),
              n = nt["h"].getImageUrl(t.name, e, pt["e"].ARCGIS);
            return n;
          },
          onModalOpen: function() {
            if (!this.isModalHidingForPoint) {
              X["k"].getBbox();
              X["h"].setNdviExtent(X["k"].getBbox());
            }
          },
          onModalClose: function() {
            this.isModalHidingForPoint || this.resetData(),
              this.$emit("close"),
              X["k"].pickDrawType(pt["b"].NONE);
          },
        },
        computed: {
          bbox: function() {
            return X["k"].getBbox();
          },
          isChartVisible: function() {
            return (
              !this.isCalculating &&
              this.chartData &&
              this.chartData.labels.length > 0 &&
              this.isPointExist
            );
          },
          isPointExist: function() {
            return this.pointCoordinates && this.pointCoordinates.length > 0;
          },
        },
      },
      Ci = yi,
      _i = Object(O["a"])(Ci, fi, mi, !1, null, null, null),
      Ei = _i.exports,
      Si = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "CustomModal",
          {
            attrs: {
              name: "comparerModal",
              title: "Swap Image",
              width: "50%",
              minHeight: 500,
            },
            on: { beforeShow: t.onModalOpen, afterHide: t.onModalClose },
          },
          [
            n("form", [
              n("div", { staticClass: "row" }, [
                n(
                  "div",
                  { staticClass: "col-md-9" },
                  [
                    n("v-select", {
                      attrs: {
                        multiple: "",
                        placeholder: "Choose up to 2 basemaps!",
                        options: t.basemaps,
                        selectable: function() {
                          return t.selecteds.length < 2;
                        },
                      },
                      on: { input: t.onChange },
                      model: {
                        value: t.selecteds,
                        callback: function(e) {
                          t.selecteds = e;
                        },
                        expression: "selecteds",
                      },
                    }),
                    n(
                      "span",
                      {
                        staticClass: "text-muted form-text",
                        staticStyle: { "font-size": "1.12rem" },
                      },
                      [t._v("Extent Area : " + t._s(JSON.stringify(t.extent)))]
                    ),
                  ],
                  1
                ),
                n("div", { staticClass: "col-md-3" }, [
                  n(
                    "button",
                    {
                      staticClass: "btn btn-info btn-sm mr-2",
                      attrs: { type: "button" },
                      on: { click: t.onExtentClick },
                    },
                    [n("img", { attrs: { src: t.icons.square } })]
                  ),
                  n(
                    "button",
                    {
                      staticClass: "btn btn-info btn-sm mr-2",
                      attrs: { type: "button" },
                      on: { click: t.changeRotation },
                    },
                    [n("img", { attrs: { src: t.icons.swap } })]
                  ),
                ]),
              ]),
              n("div", { staticClass: "row juxtapose-container" }, [
                n("div", { staticClass: "col-md-12" }, [
                  t.juxtapose
                    ? n("div", {
                        staticClass: "juxtapose",
                        attrs: { id: "juxtapose" },
                      })
                    : t._e(),
                ]),
              ]),
            ]),
          ]
        );
      },
      Oi = [],
      Ti = (n("a0fb"), n("83c1")),
      wi = n.n(Ti),
      Li = {
        name: "ComparerModal",
        components: { VueCompareImage: wi.a },
        data: function() {
          return {
            drawTypeEnum: pt["b"],
            icons: dt["b"],
            extent: null,
            selecteds: [],
            leftImage: "",
            rightImage: "",
            isModalHideForExtent: !1,
            juxtapose: null,
            isVertical: !0,
            juxtaposeOptions: {
              animate: !0,
              showLabels: !1,
              showCredits: !1,
              makeResponsive: !0,
              mode: "vertical",
            },
          };
        },
        computed: {
          selectedBasemaps: function() {
            return basemaps;
          },
          basemaps: function() {
            var t = X["d"].getBaseLayersWithoutCategory().map(function(t) {
              return { code: t.id, label: t.name };
            });
            return t;
          },
          bbox: function() {
            return X["k"].getBbox();
          },
        },
        methods: {
          removeElementsByClass: function(t) {
            var e = document.getElementsByClassName(t);
            while (e.length > 0) e[0].parentNode.removeChild(e[0]);
          },
          renderJuxtapose: function() {
            (this.juxtapose = !1),
              this.removeElementsByClass("jx-slider"),
              this.leftImage &&
                this.rightImage &&
                (this.isVertical
                  ? (this.juxtaposeOptions["mode"] = "vertical")
                  : (this.juxtaposeOptions["mode"] = "horizontal"),
                (this.juxtapose = new juxtapose.JXSlider(
                  "#juxtapose",
                  [{ src: this.leftImage }, { src: this.rightImage }],
                  this.juxtaposeOptions
                )));
          },
          onExtentClick: function() {
            var t = this;
            X["g"].hideComparerModal(), (this.isModalHideForExtent = !0);
            var e = { name: "comparermodal" };
            X["k"].deleteFeatureByName("comparermodal"),
              X["k"].pickDrawType(
                pt["b"].BOX,
                function() {
                  X["g"].showComparerModal(),
                    (t.extent = nt["e"].bboxToExtent(t.bbox)),
                    (t.isModalHideForExtent = !1),
                    t.reload();
                },
                e
              );
          },
          onModalOpen: function() {
            this.isModalHideForExtent ||
              ((this.extent = X["e"].getCurrentExtent()),
              (this.selecteds = X["d"]
                .getSelectedBasemaps()
                .map(function(t) {
                  return { code: t.id, label: t.name };
                })
                .slice(0, 2)),
              this.reload());
          },
          reset: function() {
            (this.leftImage = ""), (this.rightImage = "");
          },
          changeRotation: function() {
            (this.juxtapose = !1),
              (this.isVertical = !this.isVertical),
              this.reload();
          },
          reload: function() {
            2 == this.selecteds.length
              ? ((this.leftImage = nt["h"].getImageUrl(
                  this.selecteds[0].label,
                  this.extent,
                  pt["e"].ARCGIS
                )),
                (this.rightImage = nt["h"].getImageUrl(
                  this.selecteds[1].label,
                  this.extent,
                  pt["e"].ARCGIS
                )))
              : this.reset(),
              this.renderJuxtapose(),
              this.$forceUpdate();
          },
          onModalClose: function() {},
          onChange: function(t) {
            this.reload();
          },
        },
      },
      ki = Li,
      Ii = (n("09df"), Object(O["a"])(ki, Si, Oi, !1, null, "38948f2a", null)),
      Ai = Ii.exports,
      xi = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "CustomModal",
          {
            attrs: {
              name: "blindSpotModal",
              title: "Blind Spot Detection",
              width: "50%",
              minHeight: 500,
            },
            on: { beforeShow: t.onModalOpen, afterHide: t.onModalClose },
          },
          [
            n("form", [
              n(
                "div",
                { staticClass: "form-group" },
                [
                  n("label", [t._v("Layers")]),
                  n("v-select", {
                    attrs: { clearable: !1, options: t.layerOptions },
                    on: { input: t.onChange },
                    model: {
                      value: t.selectedLayer,
                      callback: function(e) {
                        t.selectedLayer = e;
                      },
                      expression: "selectedLayer",
                    },
                  }),
                ],
                1
              ),
              n(
                "div",
                { staticClass: "form-group" },
                [
                  n("label", [t._v("Columns")]),
                  n("v-select", {
                    attrs: {
                      clearable: !1,
                      options: t.columnOptions,
                      disabled: t.isColumnDisabled,
                    },
                    on: { input: t.onColumnChange },
                    model: {
                      value: t.selectedColumn,
                      callback: function(e) {
                        t.selectedColumn = e;
                      },
                      expression: "selectedColumn",
                    },
                  }),
                  n("small", { staticClass: "form-text text-muted" }, [
                    t._v("Only numeric columns will be shown."),
                  ]),
                ],
                1
              ),
              t.chartVisibility
                ? n("div", { staticClass: "row" }, [
                    n(
                      "div",
                      { staticClass: "col-md-12" },
                      [
                        n("line-chart", {
                          attrs: {
                            "chart-data": t.chartData,
                            options: t.chartOptions,
                            height: 300,
                          },
                        }),
                      ],
                      1
                    ),
                  ])
                : t._e(),
            ]),
          ]
        );
      },
      ji = [],
      Di = {
        name: "BlindSpotModal",
        components: { LineChart: bi },
        data: function() {
          return {
            tableInfo: null,
            selectedLayer: null,
            selectedColumn: null,
            layerOptions: [],
            columnOptions: [],
            chartOptions: { title: { display: !0, text: "" } },
            chartVisibility: !1,
            chartData: null,
          };
        },
        computed: {
          isColumnDisabled: function() {
            return !(this.tableInfo && this.columnOptions.length > 0);
          },
          lineCoordinates: function() {
            return X["k"].getBbox();
          },
        },
        created: function() {},
        methods: {
          reset: function() {
            (this.tableInfo = null),
              (this.selectedLayer = null),
              (this.selectedColumn = null),
              (this.layerOptions = []),
              (this.columnOptions = []),
              (this.chartVisibility = !1),
              (this.chartData = null);
          },
          onModalOpen: function() {
            this.layerOptions = X["d"]
              .getDynamicLayersWithoutCategory()
              .map(function(t) {
                return { code: t.id, label: t.name };
              });
          },
          onModalClose: function() {
            this.reset();
          },
          onChange: function(t) {
            var e = this;
            N["a"]
              .getTableInfo(t.code)
              .then(function(t) {
                (e.tableInfo = t),
                  (e.columnOptions = e.tableInfo.columns
                    .filter(function(t) {
                      return "int" == t.valueType || "double" == t.valueType;
                    })
                    .map(function(t) {
                      return { code: t.columnName, label: t.columnName };
                    }));
              })
              .catch(function() {
                (e.tableInfo = null),
                  (e.columnOptions = []),
                  (e.chartVisibility = !1);
              })
              .finally(function() {
                (e.chartOptions.title.text = t.label + " Data"),
                  (e.selectedColumn = null),
                  (e.chartVisibility = !1);
              });
          },
          onColumnChange: (function() {
            var t = Object(P["a"])(
              regeneratorRuntime.mark(function t(e) {
                var n, a, i;
                return regeneratorRuntime.wrap(
                  function(t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (t.next = 2),
                            this.getData(
                              this.selectedLayer.code,
                              e.code,
                              this.lineCoordinates
                            )
                          );
                        case 2:
                          (n = t.sent),
                            (a = e.code),
                            n.totalCount > 0
                              ? (a,
                                (i = n.features.map(function(t) {
                                  var e = t.attributes[a.toLowerCase()];
                                  return e;
                                })),
                                this.renderGraph(a, i, i))
                              : this.renderGraph(a, [], []),
                            (this.chartVisibility = !0);
                        case 6:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
          renderGraph: function(t, e, n) {
            var a = this;
            this.chartData = {
              labels: e.map(function(t) {
                return a.stringFixed(t, 4);
              }),
              datasets: [
                {
                  label: t,
                  borderColor: "rgba(50, 115, 220, 0.5)",
                  backgroundColor: "rgba(50, 115, 220, 0.1)",
                  data: n,
                },
              ],
            };
          },
          getData: function(t, e, n) {
            var a = {
              geometryType: "linestring",
              extentCoordinates: JSON.stringify(n),
              returnGeom: !1,
              columns: [e],
              isAll: !0,
            };
            return N["a"].getData(t, a);
          },
          stringFixed: function(t, e) {
            var n = t.toString().split("."),
              a =
                n[0] +
                (void 0 != n[1] ? "." : "") +
                (void 0 != n[1]
                  ? n[1].length > e
                    ? n[1].substr(0, e)
                    : n[1]
                  : "");
            return a;
          },
        },
      },
      Mi = Di,
      Ri = Object(O["a"])(Mi, xi, ji, !1, null, null, null),
      Pi = Ri.exports,
      Bi = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "CustomModal",
          {
            attrs: {
              name: "profileModal",
              title: t.$t("menu.profile.title"),
              width: "70%",
              minHeight: 600,
            },
            on: { beforeShow: t.onModalOpen },
          },
          [
            n("div", { attrs: { id: "profileModal" } }, [
              n("div", { staticClass: "row" }, [
                n("div", { staticClass: "col-md-3" }, [
                  n(
                    "div",
                    {
                      staticClass: "nav nav-tabs flex-column nav-pills",
                      attrs: {
                        id: "v-pills-tab",
                        role: "tablist",
                        "aria-orientation": "vertical",
                      },
                    },
                    [
                      n(
                        "a",
                        {
                          staticClass: "nav-link",
                          class: { active: "account" === t.activeTab },
                          attrs: { role: "button" },
                          on: {
                            click: function() {
                              return (t.activeTab = "account");
                            },
                          },
                        },
                        [
                          t._v(
                            "\n            " +
                              t._s(t.$t("menu.profile.account.title")) +
                              "\n          "
                          ),
                        ]
                      ),
                      n(
                        "a",
                        {
                          staticClass: "nav-link",
                          class: { active: "notification" === t.activeTab },
                          attrs: { role: "button" },
                          on: {
                            click: function() {
                              return (t.activeTab = "notification");
                            },
                          },
                        },
                        [
                          t._v(
                            "\n            " +
                              t._s(t.$t("menu.profile.notifications")) +
                              "\n            "
                          ),
                          t.notificationCount > 0
                            ? n(
                                "span",
                                {
                                  staticClass: "badge badge-danger float-right",
                                },
                                [t._v(t._s(t.notificationCount))]
                              )
                            : t._e(),
                        ]
                      ),
                      n(
                        "a",
                        {
                          staticClass: "nav-link",
                          class: { active: "favoritequery" === t.activeTab },
                          attrs: { role: "button" },
                          on: {
                            click: function() {
                              return (t.activeTab = "favoritequery");
                            },
                          },
                        },
                        [
                          t._v(
                            "\n            " +
                              t._s(t.$t("menu.profile.favoriteQueries"))
                          ),
                        ]
                      ),
                      n(
                        "a",
                        {
                          staticClass: "nav-link",
                          class: { active: "favoritelayer" === t.activeTab },
                          attrs: { role: "button" },
                          on: {
                            click: function() {
                              return (t.activeTab = "favoritelayer");
                            },
                          },
                        },
                        [t._v(t._s(t.$t("menu.profile.favoriteLayers")))]
                      ),
                      n(
                        "a",
                        {
                          staticClass: "nav-link",
                          class: { active: "defaultlayer" === t.activeTab },
                          attrs: { role: "button" },
                          on: {
                            click: function() {
                              return (t.activeTab = "defaultlayer");
                            },
                          },
                        },
                        [t._v(t._s(t.$t("menu.profile.defaultLayers")))]
                      ),
                      n(
                        "a",
                        {
                          staticClass: "nav-link",
                          class: { active: "workspace" === t.activeTab },
                          attrs: { role: "button" },
                          on: {
                            click: function() {
                              return (t.activeTab = "workspace");
                            },
                          },
                        },
                        [t._v(t._s(t.$t("menu.profile.workspace.title")))]
                      ),
                    ]
                  ),
                ]),
                n("div", { staticClass: "col-md-9" }, [
                  "account" === t.activeTab
                    ? n("div", { staticClass: "tab-content" }, [
                        n(
                          "div",
                          {
                            staticClass: "tab-pane fade show ",
                            class: { active: "account" === t.activeTab },
                          },
                          [n("Account")],
                          1
                        ),
                      ])
                    : t._e(),
                  "notification" === t.activeTab
                    ? n("div", { staticClass: "tab-content" }, [
                        n(
                          "div",
                          {
                            staticClass: "tab-pane fade show ",
                            class: { active: "notification" === t.activeTab },
                          },
                          [n("Notification")],
                          1
                        ),
                      ])
                    : t._e(),
                  "favoritequery" === t.activeTab
                    ? n("div", { staticClass: "tab-content" }, [
                        n(
                          "div",
                          {
                            staticClass: "tab-pane fade show ",
                            class: { active: "favoritequery" === t.activeTab },
                          },
                          [n("FavoriteQuery")],
                          1
                        ),
                      ])
                    : t._e(),
                  "favoritelayer" === t.activeTab
                    ? n("div", { staticClass: "tab-content" }, [
                        n(
                          "div",
                          {
                            staticClass: "tab-pane fade show ",
                            class: { active: "favoritelayer" === t.activeTab },
                          },
                          [n("FavoriteLayer")],
                          1
                        ),
                      ])
                    : t._e(),
                  "defaultlayer" === t.activeTab
                    ? n("div", { staticClass: "tab-content" }, [
                        n(
                          "div",
                          {
                            staticClass: "tab-pane fade show ",
                            class: { active: "defaultlayer" === t.activeTab },
                          },
                          [n("DefaultLayer")],
                          1
                        ),
                      ])
                    : t._e(),
                  "workspace" === t.activeTab
                    ? n("div", { staticClass: "tab-content" }, [
                        n(
                          "div",
                          {
                            staticClass: "tab-pane fade show ",
                            class: { active: "workspace" === t.activeTab },
                          },
                          [n("Workspace")],
                          1
                        ),
                      ])
                    : t._e(),
                ]),
              ]),
            ]),
          ]
        );
      },
      Fi = [],
      Ni = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n("div", { staticClass: "notification-content" }, [
          t.notifications.length > 0
            ? n("div", [
                n("div", { staticClass: "row" }, [
                  n(
                    "div",
                    { staticClass: "col-md-12" },
                    [
                      n("paginate", {
                        attrs: {
                          "page-count": t.pageCount,
                          "page-range": 5,
                          "click-handler": t.onPageChange,
                          "prev-text": t.$t("button.pagination.prev"),
                          "next-text": t.$t("button.pagination.next"),
                          "container-class": "pagination",
                          "page-class": "page-item",
                        },
                      }),
                    ],
                    1
                  ),
                ]),
                n(
                  "div",
                  {
                    staticClass:
                      "row  notification-content-scroll custom-scrollbar",
                  },
                  t._l(t.notifications, function(t, e) {
                    return n(
                      "div",
                      { key: e, staticClass: "col-md-12 mt-1" },
                      [
                        n("NotificationCard", {
                          attrs: {
                            label: t.label,
                            isReaded: t.isReaded,
                            description: t.description,
                            date: t.dateCreated,
                            type: t.type,
                            createdBy: t.createdBy.userName,
                          },
                        }),
                      ],
                      1
                    );
                  }),
                  0
                ),
              ])
            : n("div", [t._m(0)]),
        ]);
      },
      $i = [
        function() {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n("div", { staticClass: "row" }, [
            n("div", { staticClass: "col-md-12" }, [
              n(
                "div",
                { staticClass: "alert alert-info", attrs: { role: "alert" } },
                [t._v("\n          You dont have any notifications.\n        ")]
              ),
            ]),
          ]);
        },
      ],
      Gi = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n("div", { staticClass: "card" }, [
          n("div", { staticClass: "card-header" }, [
            n("div", { staticClass: "float-left" }, [
              t._v("\n      " + t._s(t.label) + "\n      "),
              t.type
                ? n("span", { staticClass: "badge", class: t.typeToClass() }, [
                    t._v(t._s(t.typeToString())),
                  ])
                : t._e(),
            ]),
            n("div", { staticClass: "float-right" }, [
              t.isReaded
                ? t._e()
                : n("span", { staticClass: "badge badge-danger" }, [
                    t._v(" New "),
                  ]),
            ]),
          ]),
          n("div", { staticClass: "card-body" }, [
            n("div", { staticClass: " mb-0" }, [
              n("p", [t._v("\n        " + t._s(t.description) + "\n      ")]),
              n("footer", { staticClass: "blockquote-footer float-right" }, [
                t._v("\n        " + t._s(t.date) + "\n        "),
                n("cite", { attrs: { title: "Created By" } }, [
                  t._v(t._s(t.createdBy)),
                ]),
              ]),
            ]),
          ]),
        ]);
      },
      Vi = [],
      Ui = {
        name: "NotificationCard",
        props: {
          label: { type: String },
          description: { type: String },
          date: { type: String },
          type: { type: Number },
          isReaded: { type: Boolean },
          createdBy: { type: String },
        },
        mounted: function() {},
        methods: {
          typeToString: function() {
            return 1 == this.type ? "info" : "warning";
          },
          typeToClass: function() {
            return 1 == this.type ? "badge-info" : "badge-warning";
          },
        },
      },
      zi = Ui,
      Hi = Object(O["a"])(zi, Gi, Vi, !1, null, null, null),
      qi = Hi.exports,
      Qi = n("277f"),
      Yi = {
        name: "Notification",
        components: { NotificationCard: qi },
        data: function() {
          return {
            limitQuery: { page: 1, limit: 3 },
            notifications: [],
            totalCount: 0,
          };
        },
        mounted: (function() {
          var t = Object(P["a"])(
            regeneratorRuntime.mark(function t() {
              return regeneratorRuntime.wrap(
                function(t) {
                  while (1)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (t.next = 2), this.getNotifications();
                      case 2:
                      case "end":
                        return t.stop();
                    }
                },
                t,
                this
              );
            })
          );
          function e() {
            return t.apply(this, arguments);
          }
          return e;
        })(),
        methods: {
          getNotifications: (function() {
            var t = Object(P["a"])(
              regeneratorRuntime.mark(function t() {
                var e = this;
                return regeneratorRuntime.wrap(
                  function(t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          Qi["a"].getAll(this.limitQuery).then(
                            (function() {
                              var t = Object(P["a"])(
                                regeneratorRuntime.mark(function t(n) {
                                  return regeneratorRuntime.wrap(function(t) {
                                    while (1)
                                      switch ((t.prev = t.next)) {
                                        case 0:
                                          return (
                                            (e.totalCount = n.totalCount),
                                            (e.notifications = n.items),
                                            (t.next = 4),
                                            new Promise(
                                              (function() {
                                                var t = Object(P["a"])(
                                                  regeneratorRuntime.mark(
                                                    function t(n, a) {
                                                      var i, r;
                                                      return regeneratorRuntime.wrap(
                                                        function(t) {
                                                          while (1)
                                                            switch (
                                                              (t.prev = t.next)
                                                            ) {
                                                              case 0:
                                                                i = 0;
                                                              case 1:
                                                                if (
                                                                  !(
                                                                    i <
                                                                    e
                                                                      .notifications
                                                                      .length
                                                                  )
                                                                ) {
                                                                  t.next = 9;
                                                                  break;
                                                                }
                                                                if (
                                                                  ((r =
                                                                    e
                                                                      .notifications[
                                                                      i
                                                                    ]),
                                                                  r.isReaded)
                                                                ) {
                                                                  t.next = 6;
                                                                  break;
                                                                }
                                                                return (
                                                                  (t.next = 6),
                                                                  Qi[
                                                                    "a"
                                                                  ].setReaded(
                                                                    r.id
                                                                  )
                                                                );
                                                              case 6:
                                                                i++,
                                                                  (t.next = 1);
                                                                break;
                                                              case 9:
                                                                n();
                                                              case 10:
                                                              case "end":
                                                                return t.stop();
                                                            }
                                                        },
                                                        t
                                                      );
                                                    }
                                                  )
                                                );
                                                return function(e, n) {
                                                  return t.apply(
                                                    this,
                                                    arguments
                                                  );
                                                };
                                              })()
                                            )
                                          );
                                        case 4:
                                          e.$store.dispatch(
                                            "setNotificationCounts"
                                          );
                                        case 5:
                                        case "end":
                                          return t.stop();
                                      }
                                  }, t);
                                })
                              );
                              return function(e) {
                                return t.apply(this, arguments);
                              };
                            })()
                          );
                        case 1:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e() {
              return t.apply(this, arguments);
            }
            return e;
          })(),
          onPageChange: (function() {
            var t = Object(P["a"])(
              regeneratorRuntime.mark(function t(e) {
                return regeneratorRuntime.wrap(
                  function(t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (this.limitQuery.page = e),
                            (t.next = 3),
                            this.getNotifications()
                          );
                        case 3:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e(e) {
              return t.apply(this, arguments);
            }
            return e;
          })(),
        },
        computed: {
          pageCount: function() {
            return this.totalCount / this.limitQuery.limit;
          },
        },
      },
      Zi = Yi,
      Wi = (n("8bca"), Object(O["a"])(Zi, Ni, $i, !1, null, "4d015d62", null)),
      Ki = Wi.exports,
      Xi = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n("div", { staticClass: "favoritequery-content" }, [
          t.favoriteQueries.length > 0
            ? n("div", [
                n("div", { staticClass: "row" }, [
                  n(
                    "div",
                    { staticClass: "col-md-12" },
                    [
                      n("paginate", {
                        attrs: {
                          "page-count": t.pageCount,
                          "page-range": 5,
                          "click-handler": t.onPageChange,
                          "prev-text": t.$t("button.pagination.prev"),
                          "next-text": t.$t("button.pagination.next"),
                          "container-class": "pagination",
                          "page-class": "page-item",
                        },
                      }),
                    ],
                    1
                  ),
                ]),
                n(
                  "div",
                  {
                    staticClass:
                      "row  favoritequery-content-scroll custom-scrollbar",
                  },
                  t._l(t.favoriteQueries, function(e, a) {
                    return n(
                      "div",
                      { key: a, staticClass: "col-md-12 mt-1" },
                      [
                        n("FavoriteQueryCard", {
                          attrs: {
                            id: e.id,
                            label: e.label,
                            query: e.query,
                            layerLabel: e.layer.label,
                            applyText: t.$t("button.apply"),
                            deleteText: t.$t("button.delete"),
                            date: e.dateCreated,
                          },
                          on: {
                            onApplyClick: t.onApplyClick,
                            onDeleteClick: t.onDeleteClick,
                          },
                        }),
                      ],
                      1
                    );
                  }),
                  0
                ),
              ])
            : n("div", [
                n("div", { staticClass: "row" }, [
                  n("div", { staticClass: "col-md-12" }, [
                    n(
                      "div",
                      {
                        staticClass: "alert alert-info",
                        attrs: { role: "alert" },
                      },
                      [
                        t._v(
                          "\n          " +
                            t._s(t.$t("general.nodata")) +
                            "\n        "
                        ),
                      ]
                    ),
                  ]),
                ]),
              ]),
        ]);
      },
      Ji = [],
      tr = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n("div", { staticClass: "card" }, [
          n("div", { staticClass: "card-header" }, [
            n("div", { staticClass: "float-left" }, [t._v(t._s(t.label))]),
            n("div", { staticClass: "float-right" }, [
              t.layerLabel
                ? n("span", { staticClass: "badge badge-info" }, [
                    t._v("\n        " + t._s(t.layerLabel) + "\n      "),
                  ])
                : t._e(),
            ]),
          ]),
          n("div", { staticClass: "card-body" }, [
            n("p", [t._v("\n      " + t._s(t.query) + "\n    ")]),
            n("div", { staticClass: "float-right" }, [
              n(
                "button",
                {
                  staticClass: "btn btn-success btn-sm m-1",
                  on: { click: t.onApplyClick },
                },
                [t._v("\n        " + t._s(t.applyText) + "\n      ")]
              ),
              n(
                "button",
                {
                  staticClass: "btn btn-danger btn-sm m-1",
                  on: { click: t.onDeleteClick },
                },
                [t._v("\n        " + t._s(t.deleteText) + "\n      ")]
              ),
            ]),
          ]),
        ]);
      },
      er = [],
      nr = {
        name: "FavoriteQueryCard",
        props: {
          id: { type: Number, required: !0 },
          label: { type: String },
          layerLabel: { type: String },
          applyText: { type: String, required: !0 },
          deleteText: { type: String, required: !0 },
          query: { type: String },
          date: { type: String },
        },
        mounted: function() {},
        methods: {
          onDeleteClick: function() {
            this.$emit("onDeleteClick", this.id);
          },
          onApplyClick: function() {
            this.$emit("onApplyClick", this.id);
          },
        },
      },
      ar = nr,
      ir = Object(O["a"])(ar, tr, er, !1, null, null, null),
      rr = ir.exports,
      or = n("03d5"),
      sr = {
        name: "FavoriteQuery",
        components: { FavoriteQueryCard: rr },
        data: function() {
          return {
            limitQuery: { page: 1, limit: 1 },
            favoriteQueries: [],
            totalCount: 0,
          };
        },
        mounted: function() {
          this.getFavoriteQueries();
        },
        methods: {
          getFavoriteQueries: function() {
            var t = this;
            or["a"].getAll(this.limitQuery).then(function(e) {
              (t.totalCount = e.totalCount), (t.favoriteQueries = e.items);
            });
          },
          onApplyClick: function(t) {
            var e = this.favoriteQueries.find(function(e) {
                return e.id == t;
              }),
              n = X["d"].getDynamicLayer(e.layer.id);
            n &&
              (X["i"].setQuery(n, e.query),
              n.isSelected
                ? X["e"].refreshService(n.id)
                : X["i"].selectService(n, !0),
              X["g"].hideProfileModalModal(),
              K["c"].success("Query Successfully Applied"));
          },
          onDeleteClick: function(t) {
            var e = this;
            or["a"].delete(t).then(function(t) {
              K["c"].success("Successfully Deleted"),
                1 === e.favoriteQueries.length && (e.limitQuery.page -= 1),
                e.getFavoriteQueries();
            });
          },
          onPageChange: function(t) {
            (this.limitQuery.page = t), this.getFavoriteQueries();
          },
        },
        computed: {
          pageCount: function() {
            return this.totalCount / this.limitQuery.limit;
          },
        },
      },
      cr = sr,
      lr = (n("8af9"), Object(O["a"])(cr, Xi, Ji, !1, null, "074420ee", null)),
      ur = lr.exports,
      dr = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return t.basemaps.length > 0 || t.dynamics.length > 0
          ? n("div", { staticClass: "row" }, [
              t.dynamics.length > 0
                ? n("div", { staticClass: "col-md-6" }, [
                    n("div", { staticClass: "row" }, [
                      n("div", { staticClass: "col-md-12" }, [
                        n("h5", [
                          t._v(
                            "\n          " +
                              t._s(t.$t("menu.dynamicLayers")) +
                              "\n\n          "
                          ),
                          n(
                            "button",
                            {
                              staticClass:
                                "btn btn-danger mr-5 float-right btn-sm",
                              attrs: {
                                type: "button",
                                title: t.$t("button.reset"),
                              },
                              on: { click: t.resetDynamicTree },
                            },
                            [n("i", { staticClass: "fas fa-sync" })]
                          ),
                        ]),
                      ]),
                      n(
                        "div",
                        { staticClass: "col-md-12" },
                        [
                          n("tree", {
                            ref: "dynamicTree",
                            attrs: {
                              data: t.dynamics,
                              options: t.treeOptions,
                              checkeds: t.checkedDynamics,
                            },
                          }),
                        ],
                        1
                      ),
                    ]),
                  ])
                : t._e(),
              t.basemaps.length > 0
                ? n("div", { staticClass: "col-md-6" }, [
                    n("div", { staticClass: "row" }, [
                      n("div", { staticClass: "col-md-12" }, [
                        n("h5", [
                          t._v(
                            "\n          " +
                              t._s(t.$t("menu.baseLayers")) +
                              "\n          "
                          ),
                          n(
                            "button",
                            {
                              staticClass:
                                "btn btn-danger mr-5 float-right btn-sm",
                              attrs: {
                                type: "button",
                                title: t.$t("button.reset"),
                              },
                              on: { click: t.resetBasemapTree },
                            },
                            [n("i", { staticClass: "fas fa-sync" })]
                          ),
                        ]),
                      ]),
                      n(
                        "div",
                        { staticClass: "col-md-12" },
                        [
                          n("tree", {
                            ref: "basemapTree",
                            attrs: {
                              data: t.basemaps,
                              options: t.treeOptions,
                              checkeds: t.checkedBasemaps,
                            },
                          }),
                        ],
                        1
                      ),
                    ]),
                  ])
                : t._e(),
              n("div", { staticClass: "col-md-12 mt-5" }, [
                n("div", { staticClass: "row" }, [
                  n("div", { staticClass: "col-md-12" }, [
                    n(
                      "button",
                      {
                        staticClass: "btn btn-success  float-right btn-sm",
                        attrs: { type: "button" },
                        on: { click: t.submit },
                      },
                      [
                        t._v(
                          "\n          " +
                            t._s(t.$t("button.set")) +
                            "\n        "
                        ),
                      ]
                    ),
                  ]),
                ]),
              ]),
            ])
          : n("div", [
              n("div", { staticClass: "row " }, [
                n("div", { staticClass: "col-md-12" }, [
                  n(
                    "div",
                    {
                      staticClass: "alert alert-info",
                      attrs: { role: "alert" },
                    },
                    [
                      t._v(
                        "\n        " + t._s(t.$t("general.nodata")) + "\n      "
                      ),
                    ]
                  ),
                ]),
              ]),
            ]);
      },
      pr = [],
      fr = n("09bc"),
      mr = {
        name: "FavoriteLayer",
        components: { Tree: mn },
        data: function() {
          return {
            dynamics: [],
            basemaps: [],
            favoriteLayers: [],
            checkedDynamics: [],
            checkedBasemaps: [],
            treeOptions: {
              collapsed: !0,
              checkbox: !0,
              labels: {
                children: "children",
                items: "layers",
                name: "name",
                id: "id",
              },
              conditions: {
                isCategory: function(t) {
                  return !(!t || "category" !== t.type);
                },
                isCheckboxExist: function(t) {
                  return !(!t || "category" === t.type);
                },
              },
            },
          };
        },
        mounted: function() {
          var t = this;
          this.getFavoriteLayers().then(function(e) {
            var n = e
              .filter(function(t) {
                return "dynamic" == t.layer.mapTypeId;
              })
              .map(function(t) {
                return t.layer.id;
              });
            t.checkedDynamics = n;
            var a = e
              .filter(function(t) {
                return "basemap" == t.layer.mapTypeId;
              })
              .map(function(t) {
                return t.layer.id;
              });
            t.checkedBasemaps = a;
            var i = X["d"].getDynamicLayerList();
            t.dynamics = i;
            var r = X["d"].getBaseLayerList();
            t.basemaps = r;
          });
        },
        methods: {
          resetDynamicTree: function() {
            this.$refs.dynamicTree.setCheckeds([]);
          },
          resetBasemapTree: function() {
            this.$refs.basemapTree.setCheckeds([]);
          },
          getFavoriteLayers: function() {
            var t = this;
            return new Promise(function(e, n) {
              fr["a"].getAll().then(function(n) {
                (t.favoriteLayers = n), e(n);
              });
            });
          },
          submit: function() {
            var t = [],
              e = this.$refs.dynamicTree.getCheckeds(),
              n = this.$refs.basemapTree.getCheckeds();
            e.forEach(function(e) {
              t.push(e);
            }),
              n.forEach(function(e) {
                t.push(e);
              }),
              fr["a"].set(t).then(function(t) {
                K["c"].success("Favorite Queries Successfully Setted"),
                  X["d"].setFavoriteDynamicLayerIds(e),
                  X["d"].setFavoriteBaseLayerIds(n);
              });
          },
        },
      },
      gr = mr,
      hr = Object(O["a"])(gr, dr, pr, !1, null, null, null),
      vr = hr.exports,
      br = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return t.basemaps.length > 0 || t.dynamics.length > 0
          ? n("div", { staticClass: "row" }, [
              t.dynamics.length > 0
                ? n("div", { staticClass: "col-md-6" }, [
                    n("div", { staticClass: "row" }, [
                      n("div", { staticClass: "col-md-12" }, [
                        n("h5", [
                          t._v(
                            "\n          " +
                              t._s(t.$t("menu.dynamicLayers")) +
                              "\n          "
                          ),
                          n(
                            "button",
                            {
                              staticClass:
                                "btn btn-danger mr-5 float-right btn-sm",
                              attrs: {
                                type: "button",
                                title: t.$t("button.reset"),
                              },
                              on: { click: t.resetDynamicTree },
                            },
                            [n("i", { staticClass: "fas fa-sync" })]
                          ),
                        ]),
                      ]),
                      n(
                        "div",
                        { staticClass: "col-md-12" },
                        [
                          n("tree", {
                            ref: "dynamicTree",
                            attrs: {
                              data: t.dynamics,
                              options: t.treeOptions,
                              checkeds: t.checkedDynamics,
                            },
                          }),
                        ],
                        1
                      ),
                    ]),
                  ])
                : t._e(),
              t.basemaps.length > 0
                ? n("div", { staticClass: "col-md-6" }, [
                    n("div", { staticClass: "row" }, [
                      n("div", { staticClass: "col-md-12" }, [
                        n("h5", [
                          t._v(
                            "\n          " +
                              t._s(t.$t("menu.baseLayers")) +
                              "\n          "
                          ),
                          n(
                            "button",
                            {
                              staticClass:
                                "btn btn-danger mr-5 float-right btn-sm",
                              attrs: {
                                type: "button",
                                title: t.$t("button.reset"),
                              },
                              on: { click: t.resetBasemapTree },
                            },
                            [n("i", { staticClass: "fas fa-sync" })]
                          ),
                        ]),
                      ]),
                      n(
                        "div",
                        { staticClass: "col-md-12" },
                        [
                          n("tree", {
                            ref: "basemapTree",
                            attrs: {
                              data: t.basemaps,
                              options: t.treeOptions,
                              checkeds: t.checkedBasemaps,
                            },
                          }),
                        ],
                        1
                      ),
                    ]),
                  ])
                : t._e(),
              n("div", { staticClass: "col-md-12 mt-5" }, [
                n("div", { staticClass: "row" }, [
                  n("div", { staticClass: "col-md-6" }, [
                    n("span", [
                      n("strong", { staticClass: "text-muted" }, [
                        t._v(t._s(t.$t("general.note")) + " : "),
                      ]),
                      n("small", { staticClass: "text-muted" }, [
                        t._v(
                          t._s(t.$t("general.changesWillBeAplliedAfterRefresh"))
                        ),
                      ]),
                    ]),
                  ]),
                  n("div", { staticClass: "col-md-6" }, [
                    n(
                      "button",
                      {
                        staticClass: "btn btn-success  float-right btn-sm",
                        attrs: { type: "button" },
                        on: { click: t.submit },
                      },
                      [
                        t._v(
                          "\n          " +
                            t._s(t.$t("button.set")) +
                            "\n        "
                        ),
                      ]
                    ),
                  ]),
                ]),
              ]),
            ])
          : n("div", [
              n("div", { staticClass: "row " }, [
                n("div", { staticClass: "col-md-12" }, [
                  n(
                    "div",
                    {
                      staticClass: "alert alert-info",
                      attrs: { role: "alert" },
                    },
                    [
                      t._v(
                        "\n        " + t._s(t.$t("general.nodata")) + "\n      "
                      ),
                    ]
                  ),
                ]),
              ]),
            ]);
      },
      yr = [],
      Cr = n("8ae2"),
      _r = {
        name: "DefaultLayer",
        components: { Tree: mn },
        data: function() {
          return {
            dynamics: [],
            basemaps: [],
            defaultLayers: [],
            checkedDynamics: [],
            checkedBasemaps: [],
            treeOptions: {
              collapsed: !0,
              checkbox: !0,
              labels: {
                children: "children",
                items: "layers",
                name: "name",
                id: "id",
              },
              conditions: {
                isCategory: function(t) {
                  return !(!t || "category" !== t.type);
                },
                isCheckboxExist: function(t) {
                  return !(!t || "category" === t.type);
                },
              },
            },
          };
        },
        mounted: function() {
          var t = this;
          this.getDefaultLayers().then(function(e) {
            var n = e
              .filter(function(t) {
                return "dynamic" == t.layer.mapTypeId;
              })
              .map(function(t) {
                return t.layer.id;
              });
            t.checkedDynamics = n;
            var a = e
              .filter(function(t) {
                return "basemap" == t.layer.mapTypeId;
              })
              .map(function(t) {
                return t.layer.id;
              });
            t.checkedBasemaps = a;
            var i = X["d"].getDynamicLayerList();
            t.dynamics = i;
            var r = X["d"].getBaseLayerList();
            t.basemaps = r;
          });
        },
        methods: {
          resetDynamicTree: function() {
            this.$refs.dynamicTree.setCheckeds([]);
          },
          resetBasemapTree: function() {
            this.$refs.basemapTree.setCheckeds([]);
          },
          getDefaultLayers: function() {
            var t = this;
            return new Promise(function(e, n) {
              Cr["a"].getAll().then(function(n) {
                (t.defaultLayers = n), e(n);
              });
            });
          },
          submit: function() {
            var t = [],
              e = this.$refs.dynamicTree.getCheckeds(),
              n = this.$refs.basemapTree.getCheckeds();
            e.forEach(function(e) {
              t.push(e);
            }),
              n.forEach(function(e) {
                t.push(e);
              }),
              Cr["a"].set(t).then(function(t) {
                K["c"].success("Default Layers Successfully Setted");
              });
          },
        },
      },
      Er = _r,
      Sr = Object(O["a"])(Er, br, yr, !1, null, null, null),
      Or = Sr.exports,
      Tr = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n("div", { staticClass: "row text-center" }, [
          n("div", { staticClass: "col-md-12" }, [
            t._v(
              "\n    " +
                t._s(t.$t("menu.profile.account.username")) +
                " :\n    "
            ),
            n("strong", [t._v(t._s(t.username))]),
          ]),
          n("div", { staticClass: "col-md-12" }, [
            t._v("\n    " + t._s(t.$t("menu.profile.account.email")) + " :"),
            n("strong", [t._v(t._s(t.email))]),
          ]),
          n(
            "div",
            {
              staticClass: "col-md-12 mt-2",
              staticStyle: { display: "flex", "justify-content": "center" },
            },
            [
              n(
                "div",
                { staticClass: "text-center" },
                [
                  n("LanguageSelect", {
                    attrs: { styles: { width: "16rem" } },
                  }),
                ],
                1
              ),
            ]
          ),
        ]);
      },
      wr = [],
      Lr = {
        name: "Profile",
        components: { LanguageSelect: Ue },
        data: function() {
          return { username: "", email: "" };
        },
        mounted: function() {
          var t = X["l"].getUserInfo();
          (this.username = t.userName), (this.email = t.email);
        },
      },
      kr = Lr,
      Ir = Object(O["a"])(kr, Tr, wr, !1, null, null, null),
      Ar = Ir.exports,
      xr = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n("div", { staticClass: "row" }, [
          n("div", { staticClass: "col-md-6" }, [
            n("div", { staticClass: "row" }, [
              n("div", { staticClass: "col-md-12 text-center" }, [
                n("h5", [
                  t._v(
                    t._s(
                      t.$t("menu.profile.workspace.currentMapConfigurations")
                    )
                  ),
                ]),
              ]),
              n("div", { staticClass: "col-md-12" }, [
                n("div", { staticClass: "m-1" }, [
                  n("label", { staticClass: "font-weight-bold" }, [
                    t._v(t._s(t.$t("menu.profile.workspace.zoomLevel")) + " :"),
                  ]),
                  n("span", [
                    n("span", { staticClass: "badge badge-primary ml-1" }, [
                      t._v(t._s(t.zoomLevel)),
                    ]),
                  ]),
                ]),
                n("div", { staticClass: "m-1" }, [
                  n("label", { staticClass: "font-weight-bold" }, [
                    t._v(
                      t._s(t.$t("menu.profile.workspace.mapXCoordinate")) + " :"
                    ),
                  ]),
                  t.center && t.center[0]
                    ? n("span", [
                        n(
                          "span",
                          { staticClass: "badge badge-warning  ml-1" },
                          [t._v(t._s(t.center[0]) + "\n            ")]
                        ),
                      ])
                    : t._e(),
                ]),
                n("div", { staticClass: "m-1" }, [
                  n("label", { staticClass: "font-weight-bold" }, [
                    t._v(
                      t._s(t.$t("menu.profile.workspace.mapYCoordinate")) + " :"
                    ),
                  ]),
                  t.center && t.center[1]
                    ? n("span", [
                        n(
                          "span",
                          { staticClass: "badge badge-warning  ml-1" },
                          [t._v(" " + t._s(t.center[1]) + " ")]
                        ),
                      ])
                    : t._e(),
                ]),
                n("div", { staticClass: "m-1" }, [
                  n("label", { staticClass: "font-weight-bold" }, [
                    t._v(
                      t._s(t.$t("menu.profile.workspace.selectedLayers")) + " :"
                    ),
                  ]),
                  t.selectedLayers
                    ? n(
                        "span",
                        t._l(t.selectedLayers, function(e, a) {
                          return n("span", { key: a }, [
                            n(
                              "span",
                              { staticClass: "badge badge-info ml-1" },
                              [t._v(t._s(e.name))]
                            ),
                          ]);
                        }),
                        0
                      )
                    : t._e(),
                ]),
              ]),
            ]),
          ]),
          n("div", { staticClass: "col-md-6" }, [
            n("div", { staticClass: "row" }, [
              n("div", { staticClass: "col-md-12 text-center" }, [
                n("h5", [
                  t._v(
                    t._s(t.$t("menu.profile.workspace.savedMapConfigurations"))
                  ),
                ]),
              ]),
              t.workspace
                ? n("div", { staticClass: "col-md-12" }, [
                    n("div", { staticClass: "m-1" }, [
                      n("label", { staticClass: "font-weight-bold" }, [
                        t._v(
                          t._s(t.$t("menu.profile.workspace.zoomLevel")) + " :"
                        ),
                      ]),
                      n("span", [
                        n("span", { staticClass: "badge badge-primary ml-1" }, [
                          t._v(t._s(t.workspace.zoomLevel)),
                        ]),
                      ]),
                    ]),
                    n("div", { staticClass: "m-1" }, [
                      n("label", { staticClass: "font-weight-bold" }, [
                        t._v(
                          t._s(t.$t("menu.profile.workspace.mapXCoordinate")) +
                            " :"
                        ),
                      ]),
                      n("span", [
                        n(
                          "span",
                          { staticClass: "badge badge-warning  ml-1" },
                          [
                            t._v(
                              t._s(t.workspace.coordinateX) + "\n            "
                            ),
                          ]
                        ),
                      ]),
                    ]),
                    n("div", { staticClass: "m-1" }, [
                      n("label", { staticClass: "font-weight-bold" }, [
                        t._v(
                          t._s(t.$t("menu.profile.workspace.mapYCoordinate")) +
                            " :"
                        ),
                      ]),
                      n("span", [
                        n(
                          "span",
                          { staticClass: "badge badge-warning  ml-1" },
                          [
                            t._v(
                              "\n              " +
                                t._s(t.workspace.coordinateY) +
                                "\n            "
                            ),
                          ]
                        ),
                      ]),
                    ]),
                    n(
                      "div",
                      { staticClass: "m-1" },
                      [
                        n("label", { staticClass: "font-weight-bold" }, [
                          t._v(
                            t._s(
                              t.$t("menu.profile.workspace.selectedLayers")
                            ) + " :"
                          ),
                        ]),
                        t._l(t.workspace.activeLayers, function(e, a) {
                          return n("span", { key: a }, [
                            n(
                              "span",
                              { staticClass: "badge badge-info ml-1" },
                              [t._v(t._s(e.label))]
                            ),
                          ]);
                        }),
                      ],
                      2
                    ),
                  ])
                : n("div", [
                    n("div", { staticClass: "col-md-12" }, [
                      n(
                        "div",
                        {
                          staticClass: "alert alert-info",
                          attrs: { role: "alert" },
                        },
                        [
                          t._v(
                            "\n            " +
                              t._s(t.$t("general.nodata")) +
                              "\n          "
                          ),
                        ]
                      ),
                    ]),
                  ]),
            ]),
          ]),
          n("div", { staticClass: "col-md-12 mt-5" }, [
            n("div", { staticClass: "row" }, [
              n("div", { staticClass: "col-md-12" }, [
                n("div", { staticClass: "float-right" }, [
                  n(
                    "button",
                    {
                      staticClass: "btn btn-success m-1 btn-sm",
                      on: { click: t.saveWorkspace },
                    },
                    [
                      t._v(
                        "\n            " +
                          t._s(t.$t("button.save")) +
                          "\n          "
                      ),
                    ]
                  ),
                  t.workspace
                    ? n(
                        "button",
                        {
                          staticClass: "btn btn-info m-1 btn-sm",
                          on: { click: t.loadWorkspace },
                        },
                        [
                          t._v(
                            "\n            " +
                              t._s(t.$t("button.load")) +
                              "\n          "
                          ),
                        ]
                      )
                    : t._e(),
                  t.workspace
                    ? n(
                        "button",
                        {
                          staticClass: "btn btn-danger m-1 btn-sm",
                          on: { click: t.resetWorkspace },
                        },
                        [
                          t._v(
                            "\n            " +
                              t._s(t.$t("button.reset")) +
                              "\n          "
                          ),
                        ]
                      )
                    : t._e(),
                ]),
              ]),
            ]),
          ]),
        ]);
      },
      jr = [],
      Dr = {
        get: function() {
          return J["a"].get(W["o"].GET);
        },
        set: function(t) {
          return J["a"].post(W["o"].SET, t);
        },
        reset: function() {
          return J["a"].put(W["o"].RESET);
        },
      },
      Mr = {
        name: "Workspace",
        data: function() {
          return {
            zoomLevel: 0,
            center: [],
            rotation: 0,
            selectedLayers: [],
            workspace: null,
          };
        },
        mounted: function() {
          this.getWorkspace(), this.getCurrentConfigurations();
        },
        methods: {
          getCurrentConfigurations: function() {
            (this.zoomLevel = X["e"].getCurrentZoomLevel()),
              (this.center = X["e"].getCurrentCenter(pt["a"].GEOGRAPHIC)),
              (this.rotation = X["e"].getCurrentRotation()),
              (this.selectedLayers = X["d"].getSelectedLayers());
          },
          getWorkspace: function() {
            var t = this;
            Dr.get().then(function(e) {
              t.workspace = e || null;
            });
          },
          resetWorkspace: function() {
            var t = this;
            Dr.reset().then(function(e) {
              K["c"].success("Configurations Successfully Reseted"),
                t.getWorkspace();
            });
          },
          loadWorkspace: (function() {
            var t = Object(P["a"])(
              regeneratorRuntime.mark(function t() {
                var e, n, a, i, r;
                return regeneratorRuntime.wrap(
                  function(t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          if (!this.workspace) {
                            t.next = 13;
                            break;
                          }
                          return (
                            (e = this.workspace.zoomLevel),
                            (n = [
                              this.workspace.coordinateX,
                              this.workspace.coordinateY,
                            ]),
                            (a = this.workspace.activeLayers),
                            X["e"].setZoomLevel(e),
                            X["e"].setCenter(n, pt["a"].GEOGRAPHIC),
                            (i = X["d"].getSelectedLayers()),
                            (t.next = 9),
                            new Promise(function(t, e) {
                              i &&
                                i.length > 0 &&
                                i.forEach(
                                  (function() {
                                    var t = Object(P["a"])(
                                      regeneratorRuntime.mark(function t(e) {
                                        return regeneratorRuntime.wrap(function(
                                          t
                                        ) {
                                          while (1)
                                            switch ((t.prev = t.next)) {
                                              case 0:
                                                return (
                                                  (t.next = 2),
                                                  X["i"].selectService(e, !1)
                                                );
                                              case 2:
                                              case "end":
                                                return t.stop();
                                            }
                                        },
                                        t);
                                      })
                                    );
                                    return function(e) {
                                      return t.apply(this, arguments);
                                    };
                                  })()
                                ),
                                t(i);
                            })
                          );
                        case 9:
                          return (
                            (r = X["d"]
                              .getLayersWithoutCategory()
                              .filter(function(t) {
                                return a
                                  .map(function(t) {
                                    return t.id;
                                  })
                                  .includes(t.id);
                              })),
                            (t.next = 12),
                            new Promise(function(t, e) {
                              r.forEach(
                                (function() {
                                  var t = Object(P["a"])(
                                    regeneratorRuntime.mark(function t(e) {
                                      return regeneratorRuntime.wrap(function(
                                        t
                                      ) {
                                        while (1)
                                          switch ((t.prev = t.next)) {
                                            case 0:
                                              return (
                                                (t.next = 2),
                                                X["i"].selectService(e, !0)
                                              );
                                            case 2:
                                            case "end":
                                              return t.stop();
                                          }
                                      },
                                      t);
                                    })
                                  );
                                  return function(e) {
                                    return t.apply(this, arguments);
                                  };
                                })()
                              ),
                                t(r);
                            })
                          );
                        case 12:
                          this.getCurrentConfigurations();
                        case 13:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e() {
              return t.apply(this, arguments);
            }
            return e;
          })(),
          saveWorkspace: function() {
            var t = this,
              e = {
                zoomLevel: this.zoomLevel,
                coordinateX: this.center[0],
                coordinateY: this.center[1],
                activeLayers: this.selectedLayers.map(function(t) {
                  return t.id;
                }),
              };
            Dr.set(e).then(function(e) {
              K["c"].success("Configurations Successfully Setted"),
                t.getWorkspace();
            });
          },
        },
      },
      Rr = Mr,
      Pr = Object(O["a"])(Rr, xr, jr, !1, null, null, null),
      Br = Pr.exports,
      Fr = {
        name: "ProfileModal",
        components: {
          Notification: Ki,
          FavoriteQuery: ur,
          Account: Ar,
          FavoriteLayer: vr,
          DefaultLayer: Or,
          Workspace: Br,
        },
        data: function() {
          return { activeTab: "account" };
        },
        computed: {
          notificationCount: function() {
            return X["f"].getNotificationCount();
          },
        },
        methods: {
          onModalOpen: function() {
            this.activeTab = "account";
          },
        },
      },
      Nr = Fr,
      $r = (n("7bfc"), Object(O["a"])(Nr, Bi, Fi, !1, null, "4cedc350", null)),
      Gr = $r.exports,
      Vr =
        (n("4882"),
        {
          name: "Home",
          components: {
            ShapeColorPicker: j,
            DataTable: Bt,
            ChangeDetectionModal: pi,
            InfoModal: Da,
            Sidebar: he,
            FilterModal: ht,
            Report: Ee,
            MapControls: Ae,
            MapText: Pe,
            BunchLayerAddModal: oi,
            NdviAssessment: Ei,
            ProfileModal: Gr,
            ServiceSelectionModal: Ha,
            BlindSpotModal: Pi,
            ComparerModal: Ai,
            PrintModal: Xa,
          },
          data: function() {
            return {
              latChange: null,
              longChange: null,
              layers: [],
              token: null,
              kmlInfo: null,
              vector: null,
              vectorSource: null,
              vectorLayer: null,
              hashResolveResult: {},
              isMetricCoordinateSystem: !1,
              isMapReady: !1,
            };
          },
          mounted: function() {
            var t = new b["B"]({ source: X["e"].getBaseLayouts()[3].layout });
            new b["B"]({
              source: new b["z"]({
                projection: "EPSG:3857",
                tileGrid: new b["A"]({
                  extent: Object(b["Q"])("EPSG:3857").getExtent(),
                  resolutions: Object(b["M"])()
                    .getResolutions()
                    .slice(1),
                }),
              }),
            });
            (this.hashResolveResult = K["b"].resolveHash()),
              (this.scaleOptions = new b["u"]({ units: "metric" })),
              (this.drawSource = new b["F"]({ wrapX: !1 })),
              (this.vector = new b["E"]({
                source: this.drawSource,
                features: [],
              })),
              this.vector.setZIndex(9999),
              this.$nextTick(function() {
                var e = this,
                  n = new b["c"]({
                    formatConstructors: [
                      b["h"],
                      b["i"],
                      b["k"],
                      b["m"],
                      b["D"],
                    ],
                  });
                this.layers = [t, this.vector];
                var a =
                    null !== this.hashResolveResult
                      ? this.hashResolveResult.zoom
                      : 8,
                  i =
                    null !== this.hashResolveResult
                      ? this.hashResolveResult.center
                      : Object(b["P"])([47.82858, 40.3598414]);
                this.mapLayer = new b["p"]({
                  interactions: Object(b["O"])().extend([new b["d"](), n]),
                  controls: Object(b["N"])().extend([this.scaleOptions]),
                  target: "map",
                  layers: this.layers,
                  view: new b["I"]({
                    constrainResolution: !0,
                    center: i,
                    zoom: a,
                  }),
                });
                var r = new b["q"]({ source: this.drawSource });
                this.mapLayer.addInteraction(r);
                var o = this;
                n.on("addfeatures", function(t) {
                  this.drawSource.addFeatures(t.features),
                    o.mapLayer.getView().fit(this.drawSource.getExtent());
                }),
                  this.mapLayer.on("click", X["e"].onMapClick),
                  this.$store.dispatch("init").then(function() {
                    null !== e.hashResolveResult &&
                      X["i"].setServicesStatusByIds(
                        e.hashResolveResult.selectedLayers,
                        !0
                      );
                    var t = [].concat(
                      Object(v["a"])(e.$store.getters.defaultDynamicLayerIds),
                      Object(v["a"])(e.$store.getters.defaultBaseLayerIds)
                    );
                    X["i"].setServicesStatusByIds(t, !0),
                      o.mapLayer.on("moveend", function() {
                        X["c"].updateHistoryMap();
                      });
                  }),
                  window.addEventListener("popstate", function(t) {
                    null !== t.state &&
                      (e.mapLayer.getView().setCenter(t.state.center),
                      e.mapLayer.getView().setZoom(t.state.zoom),
                      e.mapLayer.getView().setRotation(t.state.rotation));
                  }),
                  (this.isMapReady = !0);
              });
          },
          methods: {
            setShapeColor: function() {
              (document.body.style.cursor = "crosshair"),
                this.$moodal.colorPickerModal.hide();
            },
            dragAndDropToast: function() {
              K["c"].info(
                "Drag & drop GPX, GeoJSON, IGC, KML, TopoJSON files over map"
              );
            },
          },
          computed: {
            scaleOptions: {
              get: function() {
                return this.$store.getters.scaleOptions;
              },
              set: function(t) {
                this.$store.dispatch("saveScaleOptions", t);
              },
            },
            isInformationModalVisible: {
              get: function() {
                return this.$store.getters.isInformationModalVisible;
              },
              set: function(t) {
                this.$store.dispatch("saveInformationModalVisibility", t);
              },
            },
            drawSource: {
              get: function() {
                return this.$store.getters.drawSource;
              },
              set: function(t) {
                this.$store.dispatch("saveDrawSource", t);
              },
            },
            mapLayer: {
              get: function() {
                return this.$store.getters.mapLayer;
              },
              set: function(t) {
                this.$store.dispatch("saveMap", t);
              },
            },
            sumData: function() {
              return this.$store.getters.sumData;
            },
            shapeBorderColor: function() {
              return this.$store.state.shapeBorderColor;
            },
            shapeFillColor: function() {
              return this.$store.state.shapeFillColor;
            },
            bbox: {
              get: function() {
                return X["k"].getBbox();
              },
              set: function(t) {
                X["k"].setBbox(t);
              },
            },
          },
        }),
      Ur = Vr,
      zr = Object(O["a"])(Ur, g, h, !1, null, null, null),
      Hr = zr.exports,
      qr = function() {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "div",
          { staticClass: "main" },
          [
            a("div", { attrs: { id: "color-overlay" } }),
            a("LanguageSelect", {
              attrs: {
                styles: {
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  width: "16rem",
                },
              },
            }),
            a("div", { staticClass: "form-block" }, [
              a("img", { staticClass: "logo", attrs: { src: n("c8ca") } }),
              a("form", { staticClass: "form" }, [
                a("div", { staticClass: "form-group" }, [
                  a("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: t.emailOrUsername,
                        expression: "emailOrUsername",
                      },
                    ],
                    staticClass: "form-control",
                    attrs: {
                      type: "text",
                      placeholder: t.$t("form.loginForm.username"),
                    },
                    domProps: { value: t.emailOrUsername },
                    on: {
                      input: function(e) {
                        e.target.composing ||
                          (t.emailOrUsername = e.target.value);
                      },
                    },
                  }),
                ]),
                a("div", { staticClass: "form-group" }, [
                  a("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: t.password,
                        expression: "password",
                      },
                    ],
                    staticClass: "form-control",
                    attrs: {
                      type: "password",
                      placeholder: t.$t("form.loginForm.password"),
                    },
                    domProps: { value: t.password },
                    on: {
                      input: function(e) {
                        e.target.composing || (t.password = e.target.value);
                      },
                    },
                  }),
                ]),
                a("div", { staticClass: "form-group" }),
                t.errorMessage
                  ? a("p", { staticClass: "error-message" }, [
                      t._v(t._s(t.errorMessage)),
                    ])
                  : t._e(),
                a("div", { staticClass: "form-group" }, [
                  a(
                    "button",
                    {
                      staticClass: "btn btn-primary w-100",
                      attrs: { type: "button" },
                      on: { click: t.login },
                    },
                    [
                      t._v(
                        "\n          " +
                          t._s(t.$t("auth.login")) +
                          "\n          "
                      ),
                    ]
                  ),
                ]),
              ]),
            ]),
            t._m(0),
          ],
          1
        );
      },
      Qr = [
        function() {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n("div", { staticClass: "sign-block" }, [
            n("span", { staticClass: "sign" }, [
              t._v("© 2020 Research and Development Center, Azercosmos OJSCo"),
            ]),
          ]);
        },
      ],
      Yr = (n("3786"), n("bd51")),
      Zr = n("e096"),
      Wr = {
        name: "Login",
        components: { VueRecaptcha: Zr["a"], LanguageSelect: Ue },
        data: function() {
          return {
            emailOrUsername: "",
            password: "",
            recaptchaToken: "",
            errorMessage: "",
            captchaSettings: Yr,
            failedAttemptCount: 0,
          };
        },
        mounted: function() {
          this.failedAttemptCount = K["a"].getFailedAttemptCount();
        },
        computed: {
          isRecaptchaRequired: {
            get: function() {
              return this.failedAttemptCount >= 4;
            },
            set: function(t) {
              t
                ? ((this.failedAttemptCount = 4),
                  K["a"].setFailedAttempCount(4))
                : ((this.failedAttemptCount = 0), resetFailedAttemptCount(0));
            },
          },
        },
        methods: {
          login: (function() {
            var t = Object(P["a"])(
              regeneratorRuntime.mark(function t() {
                var e,
                  n,
                  a,
                  i = this;
                return regeneratorRuntime.wrap(
                  function(t) {
                    while (1)
                      switch ((t.prev = t.next)) {
                        case 0:
                          (e = this.emailOrUsername),
                            (n = this.password),
                            (a = this.recaptchaToken),
                            this.$store
                              .dispatch("auth/login", {
                                emailOrUsername: e,
                                password: n,
                                recaptchaToken: a,
                              })
                              .then(function() {
                                i.$router.push("/"),
                                  K["a"].resetFailedAttemptCount();
                              })
                              .catch(function() {
                                K["a"].increaseFailedAttempCount(),
                                  (i.failedAttemptCount += 1);
                                var t = Object(it["getErrorMessage"])(response);
                                t.some(function(t) {
                                  return (
                                    "recaptchatoken" === t.key.toLowerCase()
                                  );
                                })
                                  ? ((i.errorMessage = "Recaptcha Is Required"),
                                    (i.isRecaptchaRequired = !0))
                                  : (i.errorMessage = t[0].message);
                              });
                        case 2:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this
                );
              })
            );
            function e() {
              return t.apply(this, arguments);
            }
            return e;
          })(),
          onCaptchaVerified: function(t) {
            this.recaptchaToken = t;
          },
          onCaptchaExpired: function() {
            this.$refs.recaptcha.reset();
          },
        },
      },
      Kr = Wr,
      Xr = (n("5f58"), Object(O["a"])(Kr, qr, Qr, !1, null, "2f251d0a", null)),
      Jr = Xr.exports;
    i["default"].use(m["a"]);
    var to = new m["a"]({
        mode: "history",
        routes: [
          { path: "/", name: "home", component: Hr },
          { path: "/login", name: "Login", component: Jr },
        ],
      }),
      eo = function() {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return t.appReady
          ? n(
              "div",
              { attrs: { id: "app" } },
              [n("router-view"), n("vue-snotify")],
              1
            )
          : t._e();
      },
      no = [],
      ao = {
        name: "app",
        data: function() {
          return { appReady: !1 };
        },
        created: function() {
          var t = this;
          this.$store.dispatch("fetchRemoteMessages").then(function() {
            t.appReady = !0;
          });
        },
      },
      io = ao,
      ro = (n("5c0b"), Object(O["a"])(io, eo, no, !1, null, null, null)),
      oo = ro.exports,
      so =
        (n("f9e3"),
        n("91a5"),
        n("8b4c"),
        n("ff9f"),
        n("062f"),
        n("fe1b"),
        n("fefb"),
        n("9560"),
        n("b007"),
        n("f855"),
        n("5bc0"),
        n("a753"),
        n("8096"),
        n("14e1"),
        n("4413"),
        n("9062")),
      co = n.n(so),
      lo = (n("e40d"), n("a65d")),
      uo = n.n(lo),
      po = n("5886"),
      fo = n("f213"),
      mo = (n("e607"), n("4a7a")),
      go = n.n(mo),
      ho = (n("6dfc"), n("1e3f"), n("0808"), n("8832")),
      vo = n.n(ho),
      bo = n("1dce"),
      yo = n.n(bo);
    function Co(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function _o(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? Co(Object(n), !0).forEach(function(e) {
              Object(R["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : Co(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var Eo = ["/login"];
    to.beforeEach(
      (function() {
        var t = Object(P["a"])(
          regeneratorRuntime.mark(function t(e, n, a) {
            var i, r;
            return regeneratorRuntime.wrap(
              function(t) {
                while (1)
                  switch ((t.prev = t.next)) {
                    case 0:
                      if (((i = K["d"].getToken()), !i)) {
                        t.next = 22;
                        break;
                      }
                      if ("/login" !== e.path) {
                        t.next = 6;
                        break;
                      }
                      a({ path: "/" }), (t.next = 20);
                      break;
                    case 6:
                      if (
                        ((r =
                          et["a"].getters.roles &&
                          et["a"].getters.roles.length > 0),
                        !r)
                      ) {
                        t.next = 11;
                        break;
                      }
                      a(), (t.next = 20);
                      break;
                    case 11:
                      return (
                        (t.prev = 11),
                        (t.next = 14),
                        et["a"]
                          .dispatch("auth/getAuthorizedUser")
                          .then(function() {})
                          .catch(
                            Object(P["a"])(
                              regeneratorRuntime.mark(function t() {
                                return regeneratorRuntime.wrap(function(t) {
                                  while (1)
                                    switch ((t.prev = t.next)) {
                                      case 0:
                                        return (
                                          (t.next = 2),
                                          et["a"].dispatch("auth/logout")
                                        );
                                      case 2:
                                        a("/login");
                                      case 3:
                                      case "end":
                                        return t.stop();
                                    }
                                }, t);
                              })
                            )
                          )
                      );
                    case 14:
                      a(_o({}, e, { replace: !0 })), (t.next = 20);
                      break;
                    case 17:
                      (t.prev = 17), (t.t0 = t["catch"](11)), a("/login");
                    case 20:
                      t.next = 23;
                      break;
                    case 22:
                      -1 !== Eo.indexOf(e.path) ? a() : a("/login");
                    case 23:
                    case "end":
                      return t.stop();
                  }
              },
              t,
              null,
              [[11, 17]]
            );
          })
        );
        return function(e, n, a) {
          return t.apply(this, arguments);
        };
      })()
    ),
      i["default"].use(fo["b"], {
        toast: {
          position: fo["a"].leftBottom,
          timeout: 2e3,
          showProgressBar: !1,
        },
      }),
      i["default"].component("Loader", en),
      i["default"].component("CustomModal", Ze),
      i["default"].component("paginate", vo.a),
      i["default"].component("v-select", go.a),
      i["default"].use(yo.a),
      i["default"].use(co.a),
      i["default"].use(F.a),
      i["default"].use(uo.a, {
        position: "bottom-left",
        duration: 2e3,
        iconPack: "custom-class",
      }),
      i["default"].use(l.a),
      i["default"].component("downloadExcel", s["a"]),
      i["default"].use(o.a),
      i["default"].use(f["b"]),
      i["default"].use(H.a),
      i["default"].use(Z.a),
      (i["default"].config.productionTip = !1),
      i["default"].use(p),
      i["default"].use(po["default"]),
      i["default"].use(d.a),
      new i["default"]({
        router: to,
        store: et["a"],
        i18n: Ne["a"],
        render: function(t) {
          return t(oo);
        },
      }).$mount("#app");
  },
  5981: function(t, e, n) {
    var a = {
      "./arrow_down.svg": "ccd8",
      "./arrow_left.svg": "cee41",
      "./arrow_right.svg": "adc4",
      "./arrow_up.svg": "eeec",
      "./blindSpot.svg": "4274",
      "./circle.svg": "fcd6",
      "./color_fill.svg": "9f3c",
      "./color_picker.svg": "1616",
      "./compass.svg": "b49e",
      "./delete.svg": "a91f",
      "./diagonal_arrow.svg": "d2f3",
      "./file_download.svg": "9565",
      "./fullscreen.svg": "3dd2",
      "./grid.svg": "5113",
      "./hamburger.svg": "a373",
      "./home.svg": "7936",
      "./information.svg": "4386",
      "./layer.svg": "fb04",
      "./line.svg": "ed85",
      "./list.svg": "a93e",
      "./map.svg": "df19",
      "./minus.svg": "f11b",
      "./mouse.svg": "1959",
      "./ndvi.svg": "3666",
      "./pencil.svg": "7576",
      "./picture.svg": "7b30",
      "./place.svg": "10e6",
      "./plus.svg": "6cf9",
      "./point.svg": "4ec0",
      "./polygon.svg": "5d2b",
      "./rectangle.svg": "16ab",
      "./reset.svg": "473a",
      "./search.svg": "f919",
      "./send.svg": "1460",
      "./square.svg": "fd79",
      "./swap.svg": "979e",
      "./text.svg": "f1f5",
      "./user.svg": "afa4",
      "./world.svg": "c5b8",
    };
    function i(t) {
      var e = r(t);
      return n(e);
    }
    function r(t) {
      if (!n.o(a, t)) {
        var e = new Error("Cannot find module '" + t + "'");
        throw ((e.code = "MODULE_NOT_FOUND"), e);
      }
      return a[t];
    }
    (i.keys = function() {
      return Object.keys(a);
    }),
      (i.resolve = r),
      (t.exports = i),
      (i.id = "5981");
  },
  "5c0b": function(t, e, n) {
    "use strict";
    var a = n("e332"),
      i = n.n(a);
    i.a;
  },
  "5cdd": function(t, e, n) {},
  "5d2b": function(t, e, n) {
    t.exports = n.p + "img/polygon.28d1159d.svg";
  },
  "5f58": function(t, e, n) {
    "use strict";
    var a = n("416c"),
      i = n.n(a);
    i.a;
  },
  6092: function(t, e, n) {
    "use strict";
    var a = n("fafe"),
      i = n.n(a);
    i.a;
  },
  "630b": function(t, e, n) {
    "use strict";
    var a = n("806c"),
      i = n.n(a);
    i.a;
  },
  6386: function(t, e, n) {},
  6511: function(t, e, n) {
    "use strict";
    var a = n("4c8e"),
      i = n.n(a);
    i.a;
  },
  6606: function(t, e, n) {
    "use strict";
    var a = n("96ca"),
      i = n.n(a);
    i.a;
  },
  6994: function(t, e, n) {
    "use strict";
    var a = n("2303"),
      i = n.n(a);
    i.a;
  },
  "6cf9": function(t, e, n) {
    t.exports = n.p + "img/plus.714a622b.svg";
  },
  "6e73": function(t, e, n) {},
  7055: function(t, e, n) {
    "use strict";
    n.d(e, "e", function() {
      return z;
    }),
      n.d(e, "d", function() {
        return g;
      }),
      n.d(e, "a", function() {
        return K;
      }),
      n.d(e, "j", function() {
        return Ct;
      }),
      n.d(e, "i", function() {
        return mt;
      }),
      n.d(e, "k", function() {
        return st;
      }),
      n.d(e, "f", function() {
        return wt;
      }),
      n.d(e, "g", function() {
        return P;
      }),
      n.d(e, "b", function() {
        return jt;
      }),
      n.d(e, "c", function() {
        return Ft;
      }),
      n.d(e, "h", function() {
        return zt;
      }),
      n.d(e, "l", function() {
        return Wt;
      });
    n("8e6e"), n("ac6a"), n("456d");
    var a = n("bd86"),
      i = (n("96cf"), n("3b8d")),
      r = n("75fc"),
      o = (n("7514"), n("07a4")),
      s = n("ce96"),
      c = n("ed08");
    function l(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function u(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? l(Object(n), !0).forEach(function(e) {
              Object(a["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : l(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var d = -1,
      p = {
        getBaseLayerList: function() {
          var t = o["a"].getters.baseLayerList;
          return Object(c["b"])(t);
        },
        getDynamicLayerList: function() {
          var t = o["a"].getters.dynamicLayerList;
          return Object(c["b"])(t);
        },
        getDynamicLayerAsTreeSelect: function() {
          var t = p.getDynamicLayerList(),
            e = s["d"].recursiveTreeMapping(t, function(t) {
              return (
                s["g"].isCategory(t)
                  ? (t.layers = t.layers.filter(function(t) {
                      return s["g"].isLocalService(t);
                    }))
                  : s["g"].isLocalService(t) || (t = null),
                t
              );
            });
          return e;
        },
        getBasemapLayerAsTreeSelect: function() {
          var t = p.getBaseLayerList(),
            e = s["d"].recursiveTreeMapping(t);
          return e;
        },
        getLayer: function(t) {
          var e = p.getDynamicLayer(t);
          return e || (e = p.getBaseLayer(t)), e;
        },
        getDynamicLayer: function(t) {
          var e = p.getDynamicLayersWithoutCategory(),
            n = e.find(function(e) {
              return e.id === t;
            });
          return n;
        },
        getBaseLayer: function(t) {
          var e = p.getBaseLayersWithoutCategory(),
            n = e.find(function(e) {
              return e.id === t;
            });
          return n;
        },
        getLayersWithoutCategory: function() {
          return [].concat(
            Object(r["a"])(this.getDynamicLayersWithoutCategory()),
            Object(r["a"])(this.getBaseLayersWithoutCategory())
          );
        },
        getBaseLayersWithoutCategory: function() {
          var t = [];
          return (
            s["d"].recursiveLayerMapping(p.getBaseLayerList(), function(e) {
              t.push(e);
            }),
            t
          );
        },
        getDynamicLayersWithoutCategory: function(t) {
          var e = [];
          return (
            s["d"].recursiveLayerMapping(p.getDynamicLayerList(), function(n) {
              var a = !t || s["g"].isDynamicFromLocal(n);
              a && e.push(n);
            }),
            e
          );
        },
        getSelectedBasemaps: function() {
          var t = p.getBaseLayersWithoutCategory().filter(function(t) {
            return t.isSelected;
          });
          return t;
        },
        getSelectedDyanmics: function() {
          var t = p.getDynamicLayersWithoutCategory().filter(function(t) {
            return t.isSelected;
          });
          return t;
        },
        getSelectedLayers: function() {
          var t = [].concat(
            Object(r["a"])(p.getSelectedDyanmics()),
            Object(r["a"])(p.getSelectedBasemaps())
          );
          return t;
        },
        getExtentCoordinates: function(t) {
          var e = p.getDynamicLayer(t);
          return e.query.extentCoordinates;
        },
        getLayerColorOrderList: function() {
          return o["a"].getters.layerColorOrderList;
        },
        getFavoriteBaseLayerIds: function() {
          return o["a"].getters.favoriteBaseLayerIds;
        },
        getFavoriteDynamicLayerIds: function() {
          return o["a"].getters.favoriteDynamicLayerIds;
        },
        getDefaultDynamicLayerIds: function() {
          return o["a"].getters.defaultDynamicLayerIds;
        },
        getDefaultBaseLayerIds: function() {
          return o["a"].getters.defaultBaseLayerIds;
        },
        getLayerColorConditionList: function(t) {
          var e = {
              id: d,
              title: "Default",
              borderColor: t.color.borderColor,
              fillColor: t.color.fillColor,
            },
            n = t.layerColor;
          if (!n) return [e];
          var a = n.conditions.map(function(t) {
            var e = s["d"].buildLayerConditionLabel(
              n.column,
              t.operator,
              t.value
            );
            return {
              id: t.id,
              title: e,
              borderColor: t.borderColor,
              fillColor: t.fillColor,
            };
          });
          return [e].concat(Object(r["a"])(a));
        },
      },
      f = {
        setSelected: function(t, e) {
          var n = [];
          s["g"].isDynamic(t)
            ? ((n = p.getDynamicLayerList()),
              (n = s["d"].recursiveLayerMapping(
                n,
                (function() {
                  var n = Object(i["a"])(
                    regeneratorRuntime.mark(function n(a) {
                      return regeneratorRuntime.wrap(function(n) {
                        while (1)
                          switch ((n.prev = n.next)) {
                            case 0:
                              null != a &&
                                a.id == t.id &&
                                ((a.isSelected = e),
                                e &&
                                  s["g"].isDynamicFromArcgis(a) &&
                                  (a.layers = t.layers.map(function(t) {
                                    return s["d"].subLayerMapping(t, t);
                                  })));
                            case 1:
                            case "end":
                              return n.stop();
                          }
                      }, n);
                    })
                  );
                  return function(t) {
                    return n.apply(this, arguments);
                  };
                })()
              )),
              f.setDynamicLayerList(n))
            : s["g"].isBasemap(t) &&
              ((n = s["d"].recursiveLayerMapping(
                p.getBaseLayerList(),
                (function() {
                  var n = Object(i["a"])(
                    regeneratorRuntime.mark(function n(a) {
                      return regeneratorRuntime.wrap(function(n) {
                        while (1)
                          switch ((n.prev = n.next)) {
                            case 0:
                              null != a && a.id == t.id && (a.isSelected = e);
                            case 1:
                            case "end":
                              return n.stop();
                          }
                      }, n);
                    })
                  );
                  return function(t) {
                    return n.apply(this, arguments);
                  };
                })()
              )),
              f.setBaseLayerList(n));
        },
        setColor: function(t, e, n) {
          var a = s["d"].recursiveLayerMapping(
            p.getDynamicLayerList(),
            (function() {
              var a = Object(i["a"])(
                regeneratorRuntime.mark(function a(i) {
                  var r;
                  return regeneratorRuntime.wrap(function(a) {
                    while (1)
                      switch ((a.prev = a.next)) {
                        case 0:
                          null != i &&
                            i.id == t.id &&
                            (n && n !== d
                              ? ((r = i.layerColor.conditions.find(function(t) {
                                  return t.id == parseInt(n);
                                })),
                                r &&
                                  ((r.fillColor = e.fillColor),
                                  (r.borderColor = e.borderColor)))
                              : (i.color = e));
                        case 1:
                        case "end":
                          return a.stop();
                      }
                  }, a);
                })
              );
              return function(t) {
                return a.apply(this, arguments);
              };
            })()
          );
          f.setDynamicLayerList(a);
        },
        setQuery: function(t, e) {
          var n = s["d"].recursiveLayerMapping(
            p.getDynamicLayerList(),
            (function() {
              var n = Object(i["a"])(
                regeneratorRuntime.mark(function n(a) {
                  return regeneratorRuntime.wrap(function(n) {
                    while (1)
                      switch ((n.prev = n.next)) {
                        case 0:
                          null != a && a.id == t.id && (a.query.where = e);
                        case 1:
                        case "end":
                          return n.stop();
                      }
                  }, n);
                })
              );
              return function(t) {
                return n.apply(this, arguments);
              };
            })()
          );
          f.setDynamicLayerList(n);
        },
        setExtentCoordinates: function(t, e) {
          var n = s["d"].recursiveLayerMapping(
            p.getDynamicLayerList(),
            (function() {
              var n = Object(i["a"])(
                regeneratorRuntime.mark(function n(a) {
                  return regeneratorRuntime.wrap(function(n) {
                    while (1)
                      switch ((n.prev = n.next)) {
                        case 0:
                          null != a &&
                            a.id == t.id &&
                            (a.query.extentCoordinates = e);
                        case 1:
                        case "end":
                          return n.stop();
                      }
                  }, n);
                })
              );
              return function(t) {
                return n.apply(this, arguments);
              };
            })()
          );
          f.setDynamicLayerList(n);
        },
        setBaseLayerList: function(t) {
          o["a"].dispatch("saveBaseLayerList", t);
        },
        setDynamicLayerList: function(t) {
          o["a"].dispatch("saveDynamicLayerList", t);
        },
        setLayerColorOrderList: function(t) {
          o["a"].dispatch("saveLayerColorOrderList", t);
        },
        setFavoriteDynamicLayerIds: function(t) {
          o["a"].dispatch("saveFavoriteDyanmicLayerIds", t);
        },
        setFavoriteBaseLayerIds: function(t) {
          o["a"].dispatch("saveFavoriteBaseLayerIds", t);
        },
        setDefaultDynamicLayerIds: function(t) {
          o["a"].dispatch("saveDefaultDynamicLayerIds", t);
        },
        setDefaultBaseLayerIds: function(t) {
          o["a"].dispatch("saveDefaultBaseLayerIds", t);
        },
      },
      m = {},
      g = u({}, p, {}, f, {}, m),
      h = (n("28a5"), n("7f7f"), n("9923")),
      v = n("0962"),
      b = n("778c"),
      y = n("36d6"),
      C = n("b85b"),
      _ =
        (n("53dc"),
        new C["w"]({
          stroke: new C["v"]({ color: "rgba(200,20,20,1)", width: 1 }),
          fill: new C["g"]({ color: "rgba(200,20,20,0.4)" }),
        })),
      E = new C["w"]({
        fill: new C["g"]({ color: "#00000000" }),
        stroke: new C["v"]({ color: "#C672F5", width: 2 }),
        image: new C["b"]({
          radius: 7,
          fill: new C["g"]({ color: "#00000000" }),
        }),
      }),
      S = new C["w"]({
        image: new C["l"]({
          anchor: [0.5, 512],
          size: [512, 512],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src: n("53dc"),
          scale: 0.1,
        }),
      }),
      O = new C["w"]({
        fill: new C["g"]({ color: "#00000000" }),
        stroke: new C["v"]({ color: "#00000000", width: 2 }),
      }),
      T = n("dde5"),
      w = n("ee13"),
      L = {
        defaultUnit: "km",
        conversions: [
          { from: "km", to: "m", value: 1e3 },
          { from: "m", to: "km", value: 0.001 },
          { from: "cm", to: "km", value: 1e-5 },
        ],
      };
    function k(t, e, n) {
      if (t === L.defaultUnit && e === L.defaultUnit) return n;
      var a = L.conversions.find(function(n) {
        return n.from == t && n.to == e;
      });
      return a ? n * a.value : 0;
    }
    var I = n("2b0e");
    function A(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function x(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? A(Object(n), !0).forEach(function(e) {
              Object(a["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : A(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var j = new I["default"](),
      D = {
        showSumResultModal: function() {
          j.$moodal.sumResultModal.show();
        },
        showFilterModal: function() {
          j.$moodal.filterModal.show();
        },
        hideFilterModal: function() {
          j.$moodal.filterModal.hide();
        },
        showNdviAssessmentModal: function() {
          j.$moodal.ndviAssessmentModal.show();
        },
        hideNdviAssessmentModal: function() {
          j.$moodal.ndviAssessmentModal.hide();
        },
        showDataAddEditModal: function() {
          j.$moodal.dataAddEditModal.show();
        },
        hideDataAddEditModal: function() {
          j.$moodal.dataAddEditModal.hide();
        },
        showGeometryModal: function() {
          j.$moodal.geometryModal.show();
        },
        hideGeometryModal: function() {
          j.$moodal.geometryModal.hide();
        },
        showColorPickerModal: function() {
          j.$moodal.colorPickerModal.show();
        },
        hideImageUploadModal: function() {
          j.$moodal.imageUploadModal.hide();
        },
        showImageUploadModal: function() {
          j.$moodal.imageUploadModal.show();
        },
        hideProfileModalModal: function() {
          j.$moodal.profileModal.hide();
        },
        showProfileModalModal: function() {
          j.$moodal.profileModal.show();
        },
        hideFavoriteQueryModal: function() {
          j.$moodal.favoriteQueryModal.hide();
        },
        showFavoriteQueryModal: function() {
          j.$moodal.favoriteQueryModal.show();
        },
        hideServiceSelectionModal: function() {
          j.$moodal.serviceSelectionModal.hide();
        },
        showServiceSelectionModal: function() {
          j.$moodal.serviceSelectionModal.show();
        },
        hideDataModal: function() {
          j.$moodal.dataModal.hide();
        },
        showDataModal: function() {
          j.$moodal.dataModal.show();
        },
        hideBlindSpotModal: function() {
          j.$moodal.blindSpotModal.hide();
        },
        showBlindSpotModal: function() {
          j.$moodal.blindSpotModal.show();
        },
        hideComparerModal: function() {
          j.$moodal.comparerModal.hide();
        },
        showComparerModal: function() {
          j.$moodal.comparerModal.show();
        },
        hideChangeDetectionModal: function() {
          j.$moodal.changeDetectionModal.hide();
        },
        showChangeDetectionModal: function() {
          j.$moodal.changeDetectionModal.show();
        },
        hidePrintModal: function() {
          j.$moodal.printModal.hide();
        },
        showPrintModal: function() {
          j.$moodal.printModal.show();
        },
        hideColorConditionInfoModal: function() {
          j.$moodal.colorConditionInfoModal.hide();
        },
        showColorConditionInfoModal: function() {
          j.$moodal.colorConditionInfoModal.show();
        },
      },
      M = {
        getMoodal: function() {
          return o["a"].getters.vm.$moodal;
        },
      },
      R = {
        setSumResultVisibility: function(t) {
          o["a"].dispatch("saveSumResultModalVisibility", t);
        },
      },
      P = x({}, D, {}, M, {}, R);
    function B(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function F(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? B(Object(n), !0).forEach(function(e) {
              Object(a["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : B(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var N = 10,
      $ = {
        addService: function(t) {
          t = mt.getServiceByObj(t);
          var e = $.buildLayer(t),
            n = mt.getZIndex(t);
          e.setZIndex(n);
          var a = U.getMap();
          a.addLayer(e), V.setMap(a);
        },
        focusToServicePolygon: function(t, e) {
          var n = U.getLayer(t);
          n.getFeatures(e).then(function(t) {
            document
              .querySelectorAll('canvas[width="256"][height="256"]')
              .forEach(function(t) {
                return t.remove();
              });
            var e = U.getSelectionLayer();
            if (!t.length) return V.setSelectedFeatureId(0), void e.changed();
            var n = t[0];
            if (n) {
              var a = n.getId();
              V.setSelectedFeatureId(a), e.changed();
            }
          });
        },
        buildSelectionLayer: function(t) {
          var e = U.getLayer(t),
            n = e.getSource(),
            a = new C["G"]({
              map: U.getMap(),
              renderMode: "vector",
              source: n,
              style: function(t) {
                if (null != t && t.getId() == U.getSelectedFeatureId())
                  return _;
              },
            });
          V.setSelectionLayer(a);
        },
        resetSelectionLayer: function() {
          V.setSelectionLayer(null), V.setSelectedFeatureId(0);
        },
        deleteService: function(t) {
          var e = U.getLayer(t.id);
          $.removeLayer(e);
        },
        refreshService: function(t) {
          $.deleteService(t), $.addService(t);
        },
        removeLayer: function(t) {
          var e = U.getMap();
          e.removeLayer(t), V.setMap(e);
        },
        removeDrawPolygons: function() {
          var t = U.getMap();
          t.getLayers().forEach(function(t) {
            "draw" === t.get("type") && $.removeLayer(t);
          }),
            V.setMap(t);
        },
        focusToGeometry: function(t) {
          var e = [];
          if (
            (void 0 !== t.x
              ? (e = [t.x, t.y])
              : void 0 !== t.rings && (e = t.rings[0]),
            e.length > 0)
          ) {
            e = e.map(function(t, e) {
              return Object(C["S"])(t, "EPSG:4326", "EPSG:3857");
            });
            var n = new C["t"]([e]),
              a = U.getMap();
            a.getView().fit(n, {
              padding: [-50, 50, 30, 150],
              size: [50, 100],
              maxZoom: 16,
            }),
              V.setMap(a);
          }
        },
        fitView: function(t) {
          var e = U.getMap();
          e.getView().fit(t), V.setMap(e);
        },
        buildLayer: function(t) {
          t = mt.getServiceByObj(t);
          var e,
            n = T["d"].getToken(),
            a = F({ id: t.id, name: t.name }, U.getResolutionOptions(t), {
              type: t.type,
            }),
            i = s["g"].isLayer(t);
          if (i) {
            var r = s["g"].isDynamic(t);
            if (r) {
              var o = null != t.layerColor;
              e = new C["G"](
                F({}, a, {
                  declutter: !0,
                  source: new C["H"]({
                    format: new C["o"]({
                      idProperty: "gid",
                      geometryName: "geom",
                    }),
                    url: s["h"].buildTileUrl(t, v["g"].LOCAL_MVT),
                  }),
                  style: o
                    ? function(e) {
                        return s["b"].renderMvtStyle(e, t);
                      }
                    : s["b"].buildVectorStyle(),
                })
              );
            } else
              e = s["g"].isGeowebcacheService(t)
                ? new C["B"](
                    F({}, a, {
                      source: new C["C"]({
                        url: s["h"].buildTileUrl(t, v["g"].WMS),
                        params: {
                          LAYERS: t.name,
                          TILED: !0,
                          transparent: !0,
                          format: "image/png",
                          srs: "EPSG:3857",
                          WIDTH: 256,
                          HEIGHT: 256,
                        },
                      }),
                    })
                  )
                : s["g"].isGeoserverService(t)
                ? new C["B"](
                    F({}, a, {
                      source: new C["C"]({
                        url: s["h"].buildTileUrl(t, v["g"].WMS),
                        params: {
                          LAYER: t.name,
                          TILED: !0,
                          format: "image/png",
                        },
                        serverType: "geoserver",
                      }),
                    })
                  )
                : s["g"].isGeoserverGwsService(t)
                ? new C["B"](
                    F({}, a, {
                      source: new C["C"]({
                        url: s["h"].buildTileUrl(t, v["g"].WMS),
                        params: {
                          LAYERS: t.name,
                          TILED: !0,
                          format: "image/png",
                          srs: "EPSG:3857",
                        },
                      }),
                    })
                  )
                : 3857 === t.spatial
                ? new C["B"](
                    F({}, a, {
                      source: new C["J"]({
                        url: s["h"].buildTileUrl(t, v["g"].XYZ),
                        projection: "EPSG:3857",
                        crossOrigin: "Anonymous",
                      }),
                    })
                  )
                : new C["B"](
                    F({}, a, {
                      source: new C["y"]({
                        url: s["h"].buildTileUrl(t, v["g"].TILE_ARCGIS_REST),
                        crossOrigin: "Anonymous",
                        params: { token: n, FORMAT: "png8" },
                      }),
                    })
                  );
          } else
            e = new C["G"](
              F({}, a, {
                source: new C["H"]({
                  format: new C["o"]({ geometryName: "geom" }),
                  url: s["h"].buildTileUrl(t, v["g"].LOCAL_MVT),
                }),
                style: function(e) {
                  var n = e.get("layerId"),
                    a = t.layers.map(function(t) {
                      return t.id;
                    }),
                    i = a.indexOf(n),
                    r = y["a"][i],
                    o = "#FFFFFF00";
                  return s["b"].buildVectorStyle(r, o);
                },
              })
            );
          return e;
        },
        transformToEPSG4326: function(t) {
          return Object(C["S"])(t, "EPSG:3857", "EPSG:4326");
        },
        transformToEPSG3857: function(t) {
          return Object(C["S"])(t, "EPSG:4326", "EPSG:3857");
        },
      },
      G = {
        onMapClick: function(t) {
          var e = Object(C["S"])(t.coordinate, "EPSG:3857", "EPSG:4326");
          if (
            (V.setClickedCoordinate(e),
            V.setClickedPixel(t.pixel),
            st.getRemoveStatus())
          ) {
            var n = U.getMap();
            n.forEachFeatureAtPixel(t.pixel, function(t, e) {
              try {
                var n = U.getDrawSource();
                n.removeFeature(t);
                var a = document.getElementsByClassName(
                  "feature-".concat(t.get("id"))
                );
                a[0].remove(), V.setDrawSource(n);
              } catch (i) {}
            });
          } else if (st.getColorPickStatus()) {
            n = U.getMap();
            n.forEachFeatureAtPixel(t.pixel, function(t, e) {
              try {
                var n = new C["w"]({
                  fill: new C["g"]({ color: self.shapeFillColor.hex8 }),
                  stroke: new C["v"]({
                    color: self.shapeBorderColor.hex8,
                    width: 2,
                  }),
                  image: new C["b"]({
                    radius: 7,
                    fill: new C["g"]({ color: self.shapeFillColor.hex8 }),
                  }),
                });
                t.setStyle(n);
              } catch (a) {}
            }),
              V.setMap(n);
          } else st.getInteractionStatus() || P.showServiceSelectionModal();
        },
      },
      V = {
        setMap: function(t) {
          o["a"].dispatch("saveMap", t);
        },
        setSelectionLayer: function(t) {
          o["a"].dispatch("saveSelectionLayer", t);
        },
        setSelectedFeatureId: function(t) {
          o["a"].dispatch("saveSelectedFeatureId", t);
        },
        setDrawSource: function(t) {
          o["a"].dispatch("saveDrawSource", t);
        },
        setSketch: function(t) {
          o["a"].dispatch("saveSketch", t);
        },
        setZIndex: function(t) {
          var e = U.getMap();
          e.getLayers().forEach(function(e) {
            void 0 != e.get("id") &&
              e.get("id") === t.id &&
              e.setZIndex(mt.getZIndex(t));
          });
        },
        setCurrentResolution: function(t) {
          var e = U.getMap(),
            n = e.getView();
          n.setResolution(t * N), V.setMap(e);
        },
        setBaseLayout: function(t) {
          var e = U.getMap(),
            n = e.getLayers().getArray();
          n[0].setSource(U.getBaseLayouts()[t].layout), V.setMap(e);
        },
        setZoomLevel: function(t) {
          var e = U.getMap();
          e.getView().setZoom(t), V.setMap(e);
        },
        setCenter: function(t, e) {
          var n = U.getMap();
          e && e == v["a"].GEOGRAPHIC && (t = $.transformToEPSG3857(t)),
            n.getView().setCenter(t),
            V.setMap(n);
        },
        setColorsArray: function(t) {
          o["a"].dispatch("SAVE_COLOR_PICKER_DYNAMIC_COLORS", t);
        },
        setClickedCoordinate: function(t) {
          o["a"].dispatch("saveClickedCoordinate", t);
        },
        setClickedPixel: function(t) {
          o["a"].dispatch("saveClickedPixel", t);
        },
      },
      U = {
        getMap: function() {
          return o["a"].getters.mapLayer;
        },
        getCurrentZoomLevel: function() {
          var t = U.getMap(),
            e = t.getView(),
            n = e.getZoom();
          return n;
        },
        getCurrentExtent: function() {
          var t = U.getMap(),
            e = t.getView().calculateExtent(t.getSize());
          return Object(C["T"])(e, "EPSG:3857", "EPSG:4326");
        },
        getCurrentResolution: function() {
          var t = U.getMap(),
            e = t.getView(),
            n = e.getResolution() / N;
          return n;
        },
        getCurrentCenter: function(t) {
          var e = U.getMap(),
            n = e.getView(),
            a = n.getCenter();
          return (
            t &&
              t == v["a"].GEOGRAPHIC &&
              (a = Object(C["S"])(a, "EPSG:3857", "EPSG:4326")),
            a
          );
        },
        getCurrentRotation: function() {
          var t = U.getMap(),
            e = t.getView(),
            n = e.getRotation();
          return n;
        },
        getSelectionLayer: function() {
          return o["a"].getters.selectionLayer;
        },
        getScaleLineOptions: function() {
          var t = o["a"].getters.scaleOptions,
            e = 0,
            n = "km",
            a = 62;
          if (t) {
            var i = t.renderedHTML_.split(" ");
            (e = i[0]), (n = i[1]), (a = t.renderedWidth_);
          }
          return { value: e, unit: n, width: a };
        },
        getSelectedFeatureId: function() {
          return o["a"].getters.selectedFeatureId;
        },
        getDrawSource: function() {
          return o["a"].getters.drawSource;
        },
        getSketch: function() {
          return o["a"].getters.sketch;
        },
        getClickedCoordinate: function() {
          return o["a"].getters.clickedCoordinate;
        },
        getClickedPixel: function() {
          return o["a"].getters.clickedPixel;
        },
        getLayer: function(t) {
          var e = U.getMap(),
            n = null;
          return (
            e.getLayers().forEach(function(e) {
              var a = e.get("id");
              e.get("type");
              void 0 !== a && a === t && (n = e);
            }),
            n
          );
        },
        getBaseLayouts: function() {
          var t = [
            {
              name: h["a"].t("menu.baseLayouts.options.none"),
              layout: new C["J"]({ crossOrigin: "Anonymous", url: "" }),
            },
            {
              name: h["a"].t("menu.baseLayouts.options.satellite"),
              layout: new C["J"]({
                name: "sat",
                url:
                  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
              }),
            },
            {
              name: h["a"].t("menu.baseLayouts.options.street"),
              layout: new C["J"]({
                url:
                  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
              }),
            },
            {
              name: h["a"].t("menu.baseLayouts.options.gray"),
              layout: new C["J"]({
                crossOrigin: "Anonymous",
                url:
                  "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
              }),
            },
          ];
          return t;
        },
        getActiveDynamicLayersColorsGetter: function() {
          return o["a"].getters.activeDynamicLayersColors;
        },
        getResolutionOptions: function(t) {
          var e = t.resolutionOption;
          if (e && s["g"].isLayer(t)) {
            var n = e.maxResolution,
              a = e.minResolution;
            if (e.type == v["d"].ZOOM)
              return {
                maxResolution: 1.01 * Object(C["M"])().getResolution(a),
                minResolution: Object(C["M"])().getResolution(n),
              };
            var i = e.scaleUnit,
              r = Object(w["a"])(i);
            return (
              (n = k(r, "km", n)),
              (a = k(r, "km", a)),
              { maxResolution: n * N, minResolution: a * N }
            );
          }
          return {
            maxResolution:
              1.01 * Object(C["M"])().getResolution(b["b"].minZoomLevel),
            minResolution: Object(C["M"])().getResolution(b["b"].maxZoomLevel),
          };
        },
      },
      z = F({}, $, {}, U, {}, V, {}, G);
    function H(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function q(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? H(Object(n), !0).forEach(function(e) {
              Object(a["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : H(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var Q = {
        get: function() {
          return o["a"].getters.bunchLayerList;
        },
        set: function(t) {
          o["a"].dispatch("saveBunchLayerList", t);
        },
      },
      Y = {
        add: function(t) {
          var e = Q.get();
          (t = s["a"].bunchMapper(t)), e.push(t), Q.set(e);
        },
        remove: function(t) {
          for (var e = Q.get(), n = 0; n < e.length; n++) {
            var a = e[n];
            if (a.id === t) {
              var i = e.indexOf(a);
              e.splice(i, 1);
            }
          }
          Q.set(e);
        },
      },
      Z = {
        getBunchLayerList: function() {
          var t = Q.get();
          return Object(c["b"])(t);
        },
        getBunch: function(t) {
          var e = Q.get().find(function(e) {
            return e.id == t;
          });
          return e;
        },
        getBunchLayer: function(t, e) {
          var n = Z.getBunch(t),
            a = n.layers.find(function(t) {
              return t.id === e;
            });
          return a;
        },
        getExtentCoordinates: function(t) {
          var e = [],
            n = Z.getBunch(t);
          return (
            n.layers.forEach(function(t) {
              e.push(t.query.extentCoordinates);
            }),
            e
          );
        },
      },
      W = {
        setBunchLayerList: function(t) {
          o["a"].dispatch("saveBunchLayerList", t);
        },
        setSelected: function(t, e) {
          var n = Q.get();
          (n = n.map(function(n, a) {
            return n.id === t.id && (n.isSelected = e), n;
          })),
            Q.set(n);
        },
        setColor: function(t, e) {
          var n = Q.get();
          (n = n.map(function(n, a) {
            return n.id === t && (n.color = e), n;
          })),
            Q.set(n);
        },
        setQuery: function(t, e, n) {
          var a = Q.get();
          (a = a.map(function(a, i) {
            if (a.id === t.id) {
              var r = t.layers;
              r.map(function(t) {
                return t.id === e && (t.query.where = n), t;
              });
            }
            return a;
          })),
            Q.set(a);
        },
        setExtentCoordinates: function(t, e) {
          var n = Q.get();
          (n = n.map(function(n, a) {
            if (n.id === t.id) {
              var i = t.layers;
              i.forEach(function(t) {
                t.query.extentCoordinates = e;
              });
            }
            return n;
          })),
            Q.set(n);
        },
      },
      K = q({}, W, {}, Y, {}, Z),
      X = (n("7540"), n("8243")),
      J = (n("20d6"), n("f2ef")),
      tt = (n("4917"), n("c5f6"), n("21a6"));
    function et(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function nt(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? et(Object(n), !0).forEach(function(e) {
              Object(a["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : et(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var at = null,
      it = {
        pickDrawType: function(t, e, n) {
          var a = z.getMap();
          ot.setDrawType(t),
            a.removeInteraction(rt.getDraw()),
            ot.setColorPickStatus(!1),
            ot.setMarkerStatus(!1),
            ot.setRemoveStatus(!1),
            t !== v["b"].NONE
              ? (ot.setInteractionStatus(!0), it.addInteraction(t, e, n))
              : ot.setInteractionStatus(!1),
            ot.addFeatureIdCounter(10),
            (document.body.style.cursor = "default");
        },
        buildGeometryFunction: function(t) {
          var e = null;
          if (t !== v["b"].NONE)
            switch (t) {
              case v["b"].SQUARE:
                e = Object(C["L"])(4);
                break;
              case v["b"].BOX:
                e = Object(C["K"])();
                break;
              case v["b"].CIRCLE:
                e = Object(C["L"])(120);
                break;
            }
          return e;
        },
        deleteFeature: function() {
          it.pickDrawType(v["b"].NONE), ot.setRemoveStatus(!0);
        },
        eyeDropper: function() {
          it.pickDrawType(v["b"].NONE),
            P.showColorPickerModal(),
            ot.setColorPickStatus(!0);
        },
        resetFeatures: function() {
          it.pickDrawType(v["b"].NONE),
            document.querySelectorAll(".maptooltip").forEach(function(t) {
              return t.remove();
            });
          var t = z.getDrawSource();
          t.clear(), z.setDrawSource(t);
        },
        exportData: function() {
          var t = z.getDrawSource();
          z.setDrawSource(t.clear());
          var e = t.getFeatures(),
            n = new C["m"]({
              maxDepth: 10,
              extractStyles: !0,
              featureProjection: "EPSG:3857",
            }).writeFeatures(e, { featureProjection: "EPSG:3857" }),
            a = new Blob([n], { type: "text/plain" }),
            i = document.createEvent("MouseEvents"),
            r = document.createElement("a");
          (r.download = "shapes.kml"),
            (r.href = window.URL.createObjectURL(a)),
            (r.dataset.downloadurl = ["text/json", r.download, r.href].join(
              ":"
            )),
            i.initEvent(
              "click",
              !0,
              !1,
              window,
              0,
              0,
              0,
              0,
              0,
              !1,
              !1,
              !1,
              !1,
              0,
              null
            ),
            r.dispatchEvent(i);
        },
        deleteFeatureTooltip: function(t) {
          var e = document.getElementsByClassName("feature-".concat(t));
          e[0].remove();
        },
        deleteServiceFeatures: function(t) {
          var e = g.getLayer(t);
          if (e) {
            var n = { id: e.id, type: e.type };
            it.deleteFeatureByCallback(function(t) {
              var e = t.get("forService"),
                a = J["a"].isMatch(e, n);
              return a && it.deleteFeatureTooltip(t.get("id")), a;
            });
          }
        },
        deleteFeatureByName: function(t) {
          it.deleteFeatureByCallback(function(e) {
            var n = e.get("name"),
              a = n == t;
            return a;
          });
        },
        deleteFeatureByCallback: function(t) {
          var e = z.getDrawSource(),
            n = e.getFeatures();
          if (!J["a"].isUndefined(t) && J["a"].isFunction(t)) {
            for (
              var a = J["a"].filter(n, function(e) {
                  return t(e);
                }),
                i = 0;
              i < a.length;
              i++
            ) {
              var r = a[i];
              e.removeFeature(r);
            }
            z.setDrawSource(e);
          }
        },
        addText: function(t, e) {
          var n = "normal",
            a = "14px",
            i = 1,
            r = "Arial",
            o = n + " " + a + "/" + i + " " + r,
            s = new C["f"]({
              geometry: new C["s"](Object(C["P"])([e[0], e[1]])),
            });
          s.setStyle(
            new C["w"]({
              image: new C["b"]({
                radius: 10,
                fill: new C["g"]({ color: "#00000000" }),
                stroke: new C["v"]({ color: "#00000000", width: 1 }),
              }),
              text: new C["x"]({
                textAlign: "center",
                textBaseline: "middle",
                font: o,
                text: Object(c["g"])(t, 16, "\n"),
                fill: new C["g"]({ color: "#aa3300" }),
                stroke: new C["v"]({ color: "#ffffff", width: 3 }),
                offsetX: 0,
                offsetY: 0,
                placement: "point",
              }),
            })
          );
          var l = z.getDrawSource();
          l.addFeature(s), z.setDrawSource(l);
        },
        addInteraction: function(t, e, n) {
          ot.setColorPickStatus(!1),
            ot.setMarkerStatus(!1),
            ot.setRemoveStatus(!1);
          var a = it.buildGeometryFunction(t),
            i = t;
          switch (t) {
            case v["b"].SQUARE:
              i = v["b"].CIRCLE;
              break;
            case v["b"].BOX:
              i = v["b"].CIRCLE;
              break;
            case v["b"].TEXT:
              i = v["b"].POINT;
              break;
            case v["b"].MARKER:
              i = v["b"].POINT;
              break;
          }
          var r = {
            source: z.getDrawSource(),
            type: i,
            freehandCondition: C["R"],
            condition: function(t) {
              return 1 === t.pointerEvent.buttons;
            },
          };
          a && (r.geometryFunction = a);
          var o = new C["e"](r);
          ot.setDraw(o);
          var c,
            l = z.getMap();
          l.addInteraction(o),
            z.setMap(l),
            it.createMeasuremaptooltip(),
            it.createHelpmaptooltip(),
            z.setSketch(null),
            o.on(
              "drawstart",
              function(t) {
                z.setSketch(t.feature);
                var e = t.coordinate,
                  n = z.getSketch();
                c = n.getGeometry().on("change", function(t) {
                  var n,
                    a = t.target;
                  a instanceof C["t"]
                    ? ((n = s["e"].formatArea(a)),
                      (e = a.getInteriorPoint().getCoordinates()))
                    : a instanceof C["n"]
                    ? ((n = s["e"].formatLength(a)),
                      (e = a.getLastCoordinate()))
                    : a instanceof C["a"] &&
                      ((n = s["e"].formatCircleRadius(a)),
                      (e = a.getLastCoordinate()));
                  var i = rt.getMeasureMapTooltipElement(),
                    r = rt.getMeasureMapTooltip();
                  try {
                    (i.innerHTML = n), r.setPosition(e);
                  } catch (o) {
                    it.createMeasuremaptooltip(),
                      (i.innerHTML = n),
                      r.setPosition(e);
                  }
                });
              },
              this
            ),
            document.removeEventListener("mousedown", at),
            (at = function(t) {
              3 == t.which && o.removeLastPoint();
            }),
            document.addEventListener("mousedown", at),
            o.on(
              "drawend",
              function(a) {
                var r = rt.getMeasureMapTooltipElement(),
                  o = rt.getMeasureMapTooltip();
                try {
                  (r.className = "maptooltip maptooltip-static feature-".concat(
                    rt.getFeatureIdCounter()
                  )),
                    o.setOffset([0, -7]);
                  var s = [];
                  if (i == v["b"].POINT || i == v["b"].MARKER)
                    (s = a.feature.getGeometry().getCoordinates()),
                      (s = Object(C["S"])(s, "EPSG:3857", "EPSG:4326"));
                  else if (i == v["b"].LINESTRING) {
                    s = a.feature.getGeometry().getCoordinates();
                    for (var l = 0; l < s.length; l++)
                      s[l] = Object(C["S"])(s[l], "EPSG:3857", "EPSG:4326");
                  } else {
                    s = a.feature.getGeometry().getCoordinates()[0];
                    for (l = 0; l < s.length; l++)
                      s[l] = Object(C["S"])(s[l], "EPSG:3857", "EPSG:4326");
                  }
                  ot.setBbox(s);
                } catch (a) {
                  it.createMeasuremaptooltip(),
                    (r.className = "maptooltip maptooltip-static feature-".concat(
                      rt.getFeatureIdCounter()
                    )),
                    o.setOffset([0, -7]);
                }
                z.setSketch(null), (r = null), Object(C["U"])(c);
                var u = { id: rt.getFeatureIdCounter(), name: "" };
                switch (
                  (!J["a"].isUndefined(n) &&
                    J["a"].isObject(n) &&
                    (u = Object.assign(u, n)),
                  a.feature.setProperties(u),
                  t)
                ) {
                  case v["b"].TEXT:
                    a.feature.setStyle(O);
                    break;
                  case v["b"].POINT:
                    break;
                  case v["b"].MARKER:
                    a.feature.setStyle(S);
                    break;
                  default:
                    a.feature.setStyle(E);
                    break;
                }
                ot.addFeatureIdCounter(10),
                  !J["a"].isUndefined(e) && J["a"].isFunction(e) && e(a);
              },
              this
            );
        },
        createHelpmaptooltip: function() {
          var t = rt.getHelpMapTooltipElement();
          t &&
            t.parentNode &&
            (t.parentNode.removeChild(t), ot.setHelpMapTooltipElement(t));
          var e = document.createElement("div");
          e.className = "maptooltip hidden";
          var n = new C["r"]({
            element: e,
            offset: [15, 0],
            positioning: "center-left",
          });
          ot.setHelpMapTooltipElement(e), ot.setHelpMapTooltip(n);
          var a = z.getMap();
          a.addOverlay(n), z.setMap(a);
        },
        createMeasuremaptooltip: function() {
          var t = rt.getMeasureMapTooltipElement();
          t &&
            t.parentNode &&
            (t.parentNode.removeChild(t), ot.setMeasureMapTooltipElement(t));
          var e = document.createElement("div");
          e.className = "maptooltip maptooltip-measure";
          var n = new C["r"]({
            element: e,
            offset: [0, -15],
            positioning: "bottom-center",
          });
          ot.setMeasureMapTooltipElement(e), ot.setMeasureMapTooltip(n);
          var a = z.getMap();
          a.addOverlay(n), z.setMap(a);
        },
        pngExport: function() {
          var t = z.getMap();
          t.once("rendercomplete", function() {
            var e = document.createElement("canvas"),
              n = t.getSize();
            (e.width = n[0]), (e.height = n[1]);
            var a = e.getContext("2d");
            Array.prototype.forEach.call(
              document.querySelectorAll(".ol-layer canvas"),
              function(t) {
                if (t.width > 0) {
                  var e = t.parentNode.style.opacity;
                  a.globalAlpha = "" === e ? 1 : Number(e);
                  var n = t.style.transform,
                    i = n
                      .match(/^matrix\(([^\(]*)\)$/)[1]
                      .split(",")
                      .map(Number);
                  CanvasRenderingContext2D.prototype.setTransform.apply(a, i),
                    a.drawImage(t, 0, 0);
                }
              }
            ),
              navigator.msSaveBlob
                ? navigator.msSaveBlob(canvas.msToBlob(), "map.png")
                : e.toBlob(function(t) {
                    Object(tt["saveAs"])(t, "map.png");
                  });
          }),
            t.renderSync();
        },
        addGraticule: function() {
          if (rt.getGraticuleVisibility()) {
            var t = rt.getGraticuleLayer();
            t.setMap(null),
              ot.setGraticuleLayer(t),
              ot.setGraticuleVisibility(!1);
          } else {
            var e = z.getMap(),
              n = new C["j"]({
                strokeStyle: new C["v"]({
                  color: "rgba(255,120,0,0.9)",
                  width: 2,
                  lineDash: [0.5, 4],
                }),
                showLabels: !0,
                map: e,
              });
            ot.setGraticuleLayer(n), ot.setGraticuleVisibility(!0);
          }
        },
        addMarker: function(t, e, n) {
          J["a"].isUndefined(n) ||
            n != v["a"].GEOGRAPHIC ||
            (t = z.transformToEPSG3857(t));
          var a = new C["f"]({ geometry: new C["s"](t) }),
            i = { id: rt.getFeatureIdCounter() };
          !J["a"].isUndefined(e) &&
            J["a"].isObject(e) &&
            (i = Object.assign(i, e)),
            a.setStyle(S),
            a.setProperties(i);
          var r = z.getDrawSource();
          r.addFeature(a), z.setDrawSource(r);
        },
        fullScreen: function() {
          if (
            window.fullScreen ||
            (window.innerWidth == screen.width &&
              window.innerHeight == screen.height)
          )
            document.exitFullscreen();
          else {
            var t = document.querySelector("body");
            t.requestFullscreen
              ? t.requestFullscreen()
              : t.mozRequestFullScreen
              ? t.mozRequestFullScreen()
              : t.webkitRequestFullscreen
              ? t.webkitRequestFullscreen()
              : t.msRequestFullscreen && t.msRequestFullscreen();
          }
        },
        showMapTextInput: function(t) {
          var e = z.getMap(),
            n = t.target.sketchCoords_,
            a = document.querySelector(".map-text"),
            i = document.querySelector(".map-text__action--close"),
            r = new C["r"]({ element: a });
          i.addEventListener("click", function() {
            return r.setPosition(void 0), a.blur(), !1;
          }),
            r.setPosition(n),
            e.addOverlay(r);
        },
      },
      rt = {
        getGraticuleVisibility: function() {
          return o["a"].getters.graticuleVisibility;
        },
        getGraticuleLayer: function() {
          return o["a"].getters.graticuleLayer;
        },
        getDraw: function() {
          return o["a"].getters.draw;
        },
        getBbox: function() {
          return o["a"].getters.bbox;
        },
        getDrawType: function() {
          return o["a"].getters.drawType;
        },
        getColorPickStatus: function() {
          return o["a"].getters.isColorPick;
        },
        getMarkerStatus: function() {
          return o["a"].getters.isMarker;
        },
        getInteractionStatus: function() {
          return o["a"].getters.isInteraction;
        },
        getRemoveStatus: function() {
          return o["a"].getters.isRemove;
        },
        getFeatureIdCounter: function() {
          return o["a"].getters.featureIdCounter;
        },
        getDrawForChangeDetectionStatus: function() {
          return o["a"].getters.isDrawForChangeDetection;
        },
        getMeasureMapTooltipElement: function() {
          return o["a"].getters.measuremaptooltipElement;
        },
        getMeasureMapTooltip: function() {
          return o["a"].getters.measuremaptooltip;
        },
        getHelpMapTooltipElement: function() {
          return o["a"].getters.helpmaptooltipElement;
        },
        getHelpMapTooltip: function() {
          return o["a"].getters.helpmaptooltip;
        },
      },
      ot = {
        setGraticuleVisibility: function(t) {
          o["a"].dispatch("saveGraticuleVisibility", t);
        },
        setGraticuleLayer: function(t) {
          o["a"].dispatch("saveGraticule", t);
        },
        setDrawForChangeDetectionStatus: function(t) {
          o["a"].dispatch("saveDrawForChangeDetectionStatus", t);
        },
        setDraw: function(t) {
          o["a"].dispatch("saveDraw", t);
        },
        setBbox: function(t) {
          o["a"].dispatch("saveBbox", t);
        },
        setColorPickStatus: function(t) {
          o["a"].dispatch("saveColorPickStatus", t);
        },
        setMarkerStatus: function(t) {
          o["a"].dispatch("saveMarkerStatus", t);
        },
        setInteractionStatus: function(t) {
          o["a"].dispatch("saveInteractionStatus", t);
        },
        setRemoveStatus: function(t) {
          o["a"].dispatch("saveRemoveStatus", t);
        },
        setDrawType: function(t) {
          o["a"].dispatch("saveDrawType", t);
        },
        setFeatureIdCounter: function(t) {
          o["a"].dispatch("saveFeatureIdCounter", t);
        },
        addFeatureIdCounter: function(t) {
          (t += rt.getFeatureIdCounter()), ot.setFeatureIdCounter(t);
        },
        setMeasureMapTooltipElement: function(t) {
          o["a"].dispatch("saveMeasuremapTooltipElement", t);
        },
        setMeasureMapTooltip: function(t) {
          o["a"].dispatch("saveMeasuremapTooltip", t);
        },
        setHelpMapTooltipElement: function(t) {
          o["a"].dispatch("saveHelpmapTooltipElement", t);
        },
        setHelpMapTooltip: function(t) {
          o["a"].dispatch("saveHelpmapTooltip", t);
        },
      },
      st = nt({}, it, {}, rt, {}, ot);
    function ct(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function lt(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? ct(Object(n), !0).forEach(function(e) {
              Object(a["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : ct(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var ut = {
        addLayerColorIndex: function(t) {
          var e = g.getLayerColorOrderList(),
            n = e.findIndex(function(t) {
              return 0 === t;
            });
          e[n] = t;
        },
        getLayerColorIndex: function(t) {
          var e = g.getLayerColorOrderList(),
            n = e.findIndex(function(e) {
              return e === t;
            });
          return n;
        },
        getServiceByObj: function(t) {
          var e = s["g"].isLayer(t),
            n = s["g"].isBunch(t);
          return e ? g.getLayer(t.id) : n ? K.getBunch(t.id) : void 0;
        },
        removeLayerColorIndex: function(t) {
          var e = g.getLayerColorOrderList(),
            n = e.findIndex(function(e) {
              return e === t;
            });
          e[n] = 0;
        },
        selectService: (function() {
          var t = Object(i["a"])(
            regeneratorRuntime.mark(function t(e, n) {
              var a, i, r, o;
              return regeneratorRuntime.wrap(function(t) {
                while (1)
                  switch ((t.prev = t.next)) {
                    case 0:
                      if (!e || e.isSelected == n) {
                        t.next = 22;
                        break;
                      }
                      if (
                        (n || z.removeDrawPolygons(),
                        (a = Ct.getTableActiveService()),
                        !n &&
                          a &&
                          s["g"].isEqual(e, a) &&
                          Ct.setTableUnvisible(),
                        s["g"].isLayer(e)
                          ? g.setSelected(e, n)
                          : K.setSelected(e, n),
                        z.resetSelectionLayer(),
                        !n)
                      ) {
                        t.next = 17;
                        break;
                      }
                      return (
                        ut.addLayerColorIndex(e.id),
                        (i = ut.getLayerColorIndex(e.id)),
                        (r = s["b"].getColorByIndex(i)),
                        (o = s["b"].buildColorObject(r)),
                        (t.next = 13),
                        ut.saveColor(e, o)
                      );
                    case 13:
                      z.addService(e),
                        s["g"].isDynamicFromLocal(e) &&
                          z.buildSelectionLayer(e.id),
                        (t.next = 21);
                      break;
                    case 17:
                      ut.removeLayerColorIndex(e.id),
                        z.deleteService(e),
                        ut.resetQuery(e.id),
                        st.deleteServiceFeatures(e.id);
                    case 21:
                      T["b"].updateHash();
                    case 22:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          );
          function e(e, n) {
            return t.apply(this, arguments);
          }
          return e;
        })(),
        setServicesStatusByIds: (function() {
          var t = Object(i["a"])(
            regeneratorRuntime.mark(function t(e, n) {
              return regeneratorRuntime.wrap(function(t) {
                while (1)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        (t.next = 2),
                        new Promise(function(t, a) {
                          e &&
                            e.length > 0 &&
                            e.forEach(
                              (function() {
                                var t = Object(i["a"])(
                                  regeneratorRuntime.mark(function t(e) {
                                    var a;
                                    return regeneratorRuntime.wrap(function(t) {
                                      while (1)
                                        switch ((t.prev = t.next)) {
                                          case 0:
                                            return (
                                              (a = g.getLayer(e)),
                                              (t.next = 3),
                                              ut.selectService(a, n)
                                            );
                                          case 3:
                                          case "end":
                                            return t.stop();
                                        }
                                    }, t);
                                  })
                                );
                                return function(e) {
                                  return t.apply(this, arguments);
                                };
                              })()
                            ),
                            t();
                        })
                      );
                    case 2:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          );
          function e(e, n) {
            return t.apply(this, arguments);
          }
          return e;
        })(),
        saveColor: function(t, e, n) {
          var a = s["g"].isLayer(t),
            i = s["g"].isBunch(t);
          return new Promise(function(r) {
            a ? g.setColor(t, e, n) : i && K.setColor(t.id, e), r();
          });
        },
        resetQuery: function(t) {
          var e = g.getLayer(t),
            n = s["g"].isBunch(e),
            a = s["g"].isDynamic(e) && s["g"].isLayer(e);
          if (n) {
            var i = e.layers;
            i.forEach(function(t) {
              var n = !J["a"].isUndefined(t.id);
              n && (pt.setQuery(e, "", t.id), pt.setExtentCoordinates(e, ""));
            });
          } else a && (pt.setQuery(e, ""), pt.setExtentCoordinates(e, ""));
        },
      },
      dt = {
        onDraggableMoveCallback: function(t) {
          switch (t) {
            case v["f"].DYNAMIC_LAYER:
              var e = g.getDynamicLayerList();
              e.map(function(t, e) {
                z.setZIndex(t);
              }),
                g.setDynamicLayerList(e);
              break;
            case v["f"].BASE_LAYER:
              e = g.getBaseLayerList();
              e.map(function(t, e) {
                z.setZIndex(t);
              }),
                g.setBaseLayerList(e);
              break;
            case v["f"].BUNCH:
              e = K.getBunchLayerList();
              e.map(function(t, e) {
                z.setZIndex(t);
              }),
                K.setBunchLayerList(e);
              break;
          }
        },
      },
      pt = {
        setQuery: function(t, e, n) {
          var a = s["g"].isBunch(t),
            i = s["g"].isDynamic(t) && s["g"].isLayer(t),
            r = !J["a"].isUndefined(n);
          a && r ? K.setQuery(t, n, e) : i && g.setQuery(t, e);
        },
        setExtentCoordinates: function(t, e) {
          var n = s["g"].isBunch(t),
            a = s["g"].isDynamic(t) && s["g"].isLayer(t);
          n ? K.setExtentCoordinates(t, e) : a && g.setExtentCoordinates(t, e);
        },
      },
      ft = {
        getDynamicService: function(t, e) {
          var n = s["g"].isBunch(t),
            a = s["g"].isDynamic(t) && s["g"].isLayer(t),
            i = !J["a"].isUndefined(e),
            r = null;
          return (
            n && i
              ? (r = K.getBunchLayer(t.id, e))
              : a && (r = g.getDynamicLayer(t.id)),
            r
          );
        },
        getZIndex: function(t) {
          var e = 0,
            n = 0;
          return (
            s["g"].isLayer(t)
              ? s["g"].isDynamic(t)
                ? ((e = b["c"].dynamicZIndex),
                  (n = ft.getOrderNumber(g.getDynamicLayerList(), t)))
                : ((e = b["c"].basemapZIndex),
                  (n = ft.getOrderNumber(g.getBaseLayerList(), t)))
              : ((e = b["c"].bunchZIndex),
                (n = ft.getOrderNumber(K.getBunchLayerList(), t))),
            e - n
          );
        },
        getOrderNumber: function(t, e) {
          var n = 0,
            a = 0;
          return (
            s["d"].recursiveLayerMapping(t, function(t) {
              n++, t.name == e.name && (a = n);
            }),
            a
          );
        },
      },
      mt = lt({}, ut, {}, ft, {}, pt, {}, dt);
    function gt(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function ht(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? gt(Object(n), !0).forEach(function(e) {
              Object(a["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : gt(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var vt = {
        buildTableData: function(t, e) {
          var n = t,
            a = n.fieldAliases,
            i = n.fieldAliases,
            r = n.fieldAliases,
            o = [],
            s = r.map(function(t, e) {
              return e;
            });
          r = r.map(function(t, e) {
            var n = t;
            for (var i in a)
              "function" !== typeof a[i] && t === i && (n = a[i]);
            return n;
          });
          var c = {
              totalCount: n.totalCount,
              tableName: e.name,
              tableHeaders: r,
              tableStackedHeaders: Object.keys(i),
              tableHeadersWithAlias: i,
              features: n.features,
              filterValues: [],
              target: a,
              checkedColumnsData: o,
              checkedColumns: s,
            },
            l = bt.getDefaultPagingOptions();
          yt.setTableData(c), yt.setTablePaging(l);
        },
        getTable: (function() {
          var t = Object(i["a"])(
            regeneratorRuntime.mark(function t(e) {
              var n, a, i, r, o;
              return regeneratorRuntime.wrap(function(t) {
                while (1)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        (e = mt.getServiceByObj(e)),
                        yt.setTableVisible(),
                        yt.setTableLoading(!0),
                        (t.next = 5),
                        vt.getTableResponse(e)
                      );
                    case 5:
                      (n = t.sent),
                        (a = bt.getIsSumFilter()),
                        (i = s["g"].isLayer(e)),
                        (r = s["g"].isLocalService(e)),
                        (o = s["g"].isBunch(e)),
                        (r || o) &&
                          (a &&
                            i &&
                            !o &&
                            (yt.setSumData(n), P.showSumResultModal()),
                          jt.getIsRequiredServiceRefresh() &&
                            z.refreshService(e)),
                        a ||
                          (yt.setTableUnvisible(),
                          vt.buildTableData(n, e),
                          yt.setTableVisible()),
                        yt.setTableActiveService(e),
                        yt.setIsSumFilter(!1),
                        yt.setTableLoading(!1);
                    case 15:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          );
          function e(e) {
            return t.apply(this, arguments);
          }
          return e;
        })(),
        getTableResponse: (function() {
          var t = Object(i["a"])(
            regeneratorRuntime.mark(function t(e) {
              var n, a, i, r, o, c, l;
              return regeneratorRuntime.wrap(function(t) {
                while (1)
                  switch ((t.prev = t.next)) {
                    case 0:
                      if (
                        ((a = {}),
                        (i = bt.getDefaultPagingOptions()),
                        (r = s["g"].isBunch(e)),
                        !r)
                      ) {
                        t.next = 11;
                        break;
                      }
                      return (
                        (o = e.id),
                        (a = e.layers.map(function(t, e) {
                          return { layerId: t.id, query: ht({}, t.query) };
                        })),
                        (t.next = 8),
                        X["a"].getIntersectedData(o, {
                          layerQueries: a,
                          paging: i,
                        })
                      );
                    case 8:
                      (n = t.sent), (t.next = 25);
                      break;
                    case 11:
                      if (
                        ((c = e.id),
                        (a = ht({}, e.query, {}, i, { returnGeom: !0 })),
                        (l = bt.getIsSumFilter()),
                        !l)
                      ) {
                        t.next = 22;
                        break;
                      }
                      return (
                        (a.isSum = l),
                        (a.ArithmeticColumnName = bt.getSumFilterColumn()),
                        (t.next = 19),
                        X["a"].getArithmeticData(a)
                      );
                    case 19:
                      (n = t.sent), (t.next = 25);
                      break;
                    case 22:
                      return (t.next = 24), X["a"].getData(c, a);
                    case 24:
                      n = t.sent;
                    case 25:
                      return t.abrupt("return", n);
                    case 26:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          );
          function e(e) {
            return t.apply(this, arguments);
          }
          return e;
        })(),
        getGeometryData: (function() {
          var t = Object(i["a"])(
            regeneratorRuntime.mark(function t(e, n) {
              var a, i, r;
              return regeneratorRuntime.wrap(function(t) {
                while (1)
                  switch ((t.prev = t.next)) {
                    case 0:
                      if (
                        ((a = null),
                        (i = g.getDynamicLayer(e)),
                        !s["g"].isLayer(i))
                      ) {
                        t.next = 8;
                        break;
                      }
                      return (
                        (r = {
                          where: i.query.where,
                          geometry: n[0] + "," + n[1],
                        }),
                        (t.next = 6),
                        X["a"].getData(e, r)
                      );
                    case 6:
                      return (a = t.sent), t.abrupt("return", a);
                    case 8:
                      throw "layer must be dynamic type!";
                    case 9:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          );
          function e(e, n) {
            return t.apply(this, arguments);
          }
          return e;
        })(),
      },
      bt = {
        getTableData: function() {
          return o["a"].getters.tableData;
        },
        getTablePaging: function() {
          return o["a"].getters.tablePaging;
        },
        getServiceData: function(t) {
          var e = bt.getTableData(),
            n = e.find(function(e) {
              return e.service.id === t;
            });
          return n;
        },
        getTableActiveService: function() {
          return o["a"].getters.tableActiveService;
        },
        getDefaultPagingOptions: function() {
          return { page: 1, limit: 25, isBusy: !1 };
        },
        getIsSumFilter: function() {
          return o["a"].getters.isSumFilter;
        },
        getSumFilterColumn: function() {
          return o["a"].getters.sumFilterColumn;
        },
        getTableVisibility: function() {
          return o["a"].getters.dataTableVisibleStatus;
        },
        getTableLoadingStatus: function() {
          return o["a"].getters.dataTableLoading;
        },
        getIsEditData: function() {
          return o["a"].getters.isEditData;
        },
        getEditDataGid: function() {
          return o["a"].getters.editDataGid;
        },
        getInfoData: function() {
          return o["a"].getters.infoData;
        },
      },
      yt = {
        setTableData: function(t) {
          o["a"].dispatch("saveDatatable", t);
        },
        setIsEditData: function(t) {
          o["a"].dispatch("saveIsEditData", t);
        },
        setEditDataGid: function(t) {
          o["a"].dispatch("saveEditDataGid", t);
        },
        setTableActiveService: function(t) {
          o["a"].dispatch("saveTableActiveService", t);
        },
        setTableTabs: function(t) {
          o["a"].dispatch("SAVE_DATATABLE_TABS", t);
        },
        setTableVisible: function() {
          o["a"].dispatch("saveDatatableVisibility", !0);
        },
        setTableUnvisible: function() {
          o["a"].dispatch("saveDatatableVisibility", !1);
        },
        setTableLoading: function(t) {
          o["a"].dispatch("saveDatatableLoading", t);
        },
        setIsSumFilter: function(t) {
          o["a"].dispatch("saveIsSumFilter", t);
        },
        setSumFilterColumn: function(t) {
          o["a"].dispatch("saveSumFilterColumn", t);
        },
        setSumData: function(t) {
          o["a"].dispatch("saveSumData", t);
        },
        setTablePaging: function(t) {
          o["a"].dispatch("saveDataTablePaging", t);
        },
        setInfoData: function(t) {
          o["a"].dispatch("saveInfoData", t);
        },
      },
      Ct = ht({}, vt, {}, bt, {}, yt),
      _t = n("aa3f");
    function Et(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function St(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? Et(Object(n), !0).forEach(function(e) {
              Object(a["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : Et(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var Ot = {
        getToolList: function() {
          return [
            {
              key: "mouse",
              label: h["a"].t("menu.tool.mouse"),
              image: _t["b"].mouse,
              click: function() {
                return st.pickDrawType(v["b"].NONE);
              },
            },
            {
              key: "addPoint",
              label: h["a"].t("menu.tool.addPoint"),
              image: _t["b"].point,
              click: function() {
                return st.pickDrawType(v["b"].POINT);
              },
            },
            {
              key: "addPlace",
              label: h["a"].t("menu.tool.addPlace"),
              image: _t["b"].place,
              click: function() {
                return st.pickDrawType(v["b"].MARKER);
              },
            },
            {
              key: "addText",
              label: h["a"].t("menu.tool.addText"),
              image: _t["b"].text,
              click: function() {
                var t = function(t) {
                  st.showMapTextInput(t);
                };
                st.pickDrawType(v["b"].TEXT, t);
              },
            },
            {
              key: "rectangle",
              label: h["a"].t("menu.tool.rectangle"),
              image: _t["b"].rectangle,
              click: function() {
                return st.pickDrawType(v["b"].BOX);
              },
            },
            {
              key: "square",
              label: h["a"].t("menu.tool.square"),
              image: _t["b"].square,
              click: function() {
                return st.pickDrawType(v["b"].SQUARE);
              },
            },
            {
              key: "circle",
              label: h["a"].t("menu.tool.circle"),
              image: _t["b"].circle,
              click: function() {
                return st.pickDrawType(v["b"].CIRCLE);
              },
            },
            {
              key: "polygon",
              label: h["a"].t("menu.tool.polygon"),
              image: _t["b"].polygon,
              click: function() {
                return st.pickDrawType(v["b"].POLYGON);
              },
            },
            {
              key: "line",
              label: h["a"].t("menu.tool.line"),
              image: _t["b"].line,
              click: function() {
                return st.pickDrawType(v["b"].LINESTRING);
              },
            },
            {
              key: "reset",
              label: h["a"].t("menu.tool.reset"),
              image: _t["b"].reset,
              click: st.resetFeatures,
            },
            {
              key: "delete",
              label: h["a"].t("menu.tool.delete"),
              image: _t["b"].delete,
              click: st.deleteFeature,
            },
            {
              key: "pickColor",
              label: h["a"].t("menu.tool.pickColor"),
              image: _t["b"].color_picker,
              click: st.eyeDropper,
            },
            {
              key: "changeDetection",
              label: h["a"].t("menu.tool.changeDetection"),
              image: _t["b"].world,
              click: function() {
                var t = function() {
                  P.showChangeDetectionModal();
                };
                st.pickDrawType(v["b"].BOX, t);
              },
            },
            {
              key: "graticule",
              label: h["a"].t("menu.tool.graticule"),
              image: _t["b"].grid,
              click: st.addGraticule,
            },
            {
              key: "ndviAssessment",
              label: h["a"].t("menu.tool.ndviAssesment"),
              image: _t["b"].ndvi,
              click: function() {
                var t = function() {
                  P.showNdviAssessmentModal();
                };
                st.pickDrawType(v["b"].BOX, t);
              },
            },
            {
              key: "blindSpot",
              label: h["a"].t("menu.tool.blindSpotDetection"),
              image: _t["b"].blindSpot,
              click: function() {
                var t = function() {
                  P.showBlindSpotModal();
                };
                st.pickDrawType(v["b"].LINESTRING, t);
              },
            },
            {
              key: "swap",
              label: h["a"].t("menu.tool.swapImage"),
              image: _t["b"].swap,
              click: function() {
                P.showComparerModal();
              },
            },
            {
              key: "print",
              label: h["a"].t("menu.tool.print"),
              image: _t["b"].ndvi,
              click: function() {
                P.showPrintModal();
              },
            },
          ];
        },
        getBottomMenu: function() {
          return [
            {
              key: "information",
              label: h["a"].t("menu.information.title"),
              image: _t["b"].information,
              click: Tt.setInformationModalVisible,
            },
            {
              key: v["c"].BASE_MAP_TYPE,
              label: h["a"].t("menu.baseLayouts.title"),
              image: _t["b"].hamburger,
              click: function() {
                Tt.setActiveMenuTab(v["c"].BASE_MAP_TYPE);
              },
            },
            {
              key: "exportPNG",
              label: h["a"].t("menu.exportPng"),
              image: _t["b"].picture,
              click: st.pngExport,
            },
            {
              key: "exportGeojson",
              label: h["a"].t("menu.exportGeojson"),
              image: _t["b"].file_download,
              click: st.exportData,
            },
            {
              key: "fullscreen",
              label: h["a"].t("menu.fullscreen"),
              image: _t["b"].fullscreen,
              click: st.fullScreen,
            },
          ];
        },
        getTopMenu: function() {
          return [
            {
              key: v["c"].PROFILE,
              label: h["a"].t("menu.profile.title"),
              image: _t["b"].user,
              click: function() {
                Tt.setActiveMenuTab(v["c"].PROFILE);
              },
            },
            {
              key: v["c"].TOOL,
              label: h["a"].t("menu.tool.title"),
              image: _t["b"].pencil,
              click: function() {
                Tt.setActiveMenuTab(v["c"].TOOL);
              },
            },
            {
              key: v["c"].DYNAMIC_LAYER,
              label: h["a"].t("menu.dynamicLayers"),
              image: _t["b"].layer,
              click: function() {
                Tt.setActiveMenuTab(v["c"].DYNAMIC_LAYER);
              },
            },
            {
              key: v["c"].BASE_LAYER,
              label: h["a"].t("menu.baseLayers"),
              image: _t["b"].map,
              click: function() {
                Tt.setActiveMenuTab(v["c"].BASE_LAYER);
              },
            },
          ];
        },
        getActiveMenuTab: function() {
          return o["a"].getters.activeMenuTab;
        },
        getNotificationCount: function() {
          return o["a"].getters.notificationCount;
        },
      },
      Tt = {
        setActiveMenuTab: function(t) {
          t === Ot.getActiveMenuTab() && (t = ""),
            o["a"].dispatch("saveActiveMenuTab", t);
        },
        setInformationModalVisible: function() {
          o["a"].dispatch("saveInformationModalVisibility", !0);
        },
        setInformationModalUnvisible: function() {
          o["a"].dispatch("saveInformationModalVisibility", !1);
        },
        setNotificationCount: function() {
          o["a"].dispatch("saveNotificationCount", !1);
        },
      },
      wt = St({}, Ot, {}, Tt);
    function Lt(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function kt(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? Lt(Object(n), !0).forEach(function(e) {
              Object(a["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : Lt(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var It = {},
      At = {
        getFilterColumnValues: (function() {
          var t = Object(i["a"])(
            regeneratorRuntime.mark(function t(e, n) {
              var a, i, r, o, s;
              return regeneratorRuntime.wrap(function(t) {
                while (1)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        (a = g.getDynamicLayer(e)),
                        (i = []),
                        (r = a.id),
                        (t.next = 5),
                        X["a"].getDistinctValues(r)
                      );
                    case 5:
                      return (
                        (o = t.sent),
                        (s = o),
                        (i =
                          s[
                            Object.keys(s).find(function(t) {
                              return t.toLowerCase() === n.toLowerCase();
                            })
                          ]),
                        t.abrupt("return", i)
                      );
                    case 9:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          );
          function e(e, n) {
            return t.apply(this, arguments);
          }
          return e;
        })(),
        getIsRequiredServiceRefresh: function() {
          return o["a"].getters.isRequiredServiceRefresh;
        },
      },
      xt = {
        setIsRequiredServiceRefresh: function(t) {
          o["a"].dispatch("saveIsRequiredServiceRefreshStatus", t);
        },
      },
      jt = kt({}, It, {}, At, {}, xt);
    function Dt(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function Mt(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? Dt(Object(n), !0).forEach(function(e) {
              Object(a["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : Dt(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var Rt = {
        historyBack: function() {
          Bt.setHistoryIsNeedUpdate(!1);
          var t = Pt.getHistoryIndex();
          (t -= 1), Bt.setHistoryIndex(t);
          var e = Pt.getHistory(),
            n = e[t - 1],
            a = z.getMap();
          a.getView().setCenter(n.center),
            a.getView().setZoom(n.zoom),
            a.getView().setRotation(n.rotation),
            z.setMap(a),
            Bt.setHistoryIsNextExist(!0),
            1 === t && Bt.setHistoryIsPreviousExist(!1);
        },
        historyNext: function() {
          var t = Pt.getHistory(),
            e = Pt.getHistoryIndex();
          e + 1 === t.length && Bt.setHistoryIsNextExist(!1),
            Bt.setHistoryIsPreviousExist(!0),
            Bt.setHistoryIsNeedUpdate(!1),
            (e += 1),
            Bt.setHistoryIndex(e);
          var n = t[e - 1],
            a = z.getMap();
          a.getView().setCenter(n.center),
            a.getView().setZoom(n.zoom),
            a.getView().setRotation(n.rotation),
            z.setMap(a);
        },
        updateHistoryMap: function() {
          var t = Pt.getHistoryIsNeedUpdate();
          if (t) {
            var e = z.getMap(),
              n = e.getView(),
              a = {
                zoom: n.getZoom(),
                center: n.getCenter(),
                rotation: n.getRotation(),
              };
            T["b"].updateHash(), Rt.addHistory(a);
            var i = Pt.getHistory();
            Bt.setHistoryIndex(i.length),
              Bt.setHistoryIsNextExist(!1),
              1 !== Pt.getHistoryIndex() && Bt.setHistoryIsPreviousExist(!0);
          } else Bt.setHistoryIsNeedUpdate(!0);
        },
        addHistory: function(t) {
          var e = Pt.getHistory();
          e.push(t), Bt.setHistory(e);
        },
      },
      Pt = {
        getHistory: function() {
          return o["a"].getters.history;
        },
        getHistoryIndex: function() {
          return o["a"].getters.historyIndex;
        },
        getHistoryIsNeedUpdate: function() {
          return o["a"].getters.historyIsNeedUpdate;
        },
        getHistoryIsNextExist: function() {
          return o["a"].getters.historyIsNextExist;
        },
        getHistoryIsPreviousExist: function() {
          return o["a"].getters.historyIsPreviousExist;
        },
      },
      Bt = {
        setHistory: function(t) {
          o["a"].dispatch("saveHistory", t);
        },
        setHistoryIsNeedUpdate: function(t) {
          o["a"].dispatch("saveHistoryIsNeedUpdate", t);
        },
        setHistoryIndex: function(t) {
          o["a"].dispatch("saveHistoryIndex", t);
        },
        setHistoryIsNextExist: function(t) {
          o["a"].dispatch("saveHistoryIsNextExist", t);
        },
        setHistoryIsPreviousExist: function(t) {
          o["a"].dispatch("saveHistoryIsPreviousExist", t);
        },
      },
      Ft = Mt({}, Pt, {}, Bt, {}, Rt);
    function Nt(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function $t(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? Nt(Object(n), !0).forEach(function(e) {
              Object(a["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : Nt(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var Gt = {},
      Vt = {
        getNdviExtent: function() {
          return o["a"].getters.ndviExtent;
        },
      },
      Ut = {
        setNdviExtent: function(t) {
          o["a"].dispatch("saveNdviExtent", t);
        },
      },
      zt = $t({}, Gt, {}, Vt, {}, Ut);
    function Ht(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function qt(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? Ht(Object(n), !0).forEach(function(e) {
              Object(a["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : Ht(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var Qt = {},
      Yt = {
        getRoles: function() {
          return o["a"].getters.roles;
        },
        getDirectivePermissions: function() {
          return o["a"].getters.directivePermissions;
        },
        getUserInfo: function() {
          return o["a"].getters.userInfo;
        },
      },
      Zt = {
        setRoles: function(t) {
          o["a"].dispatch("saveRoles", t);
        },
        setDirectivePermissions: function(t) {
          o["a"].dispatch("saveDirectivePermissions", t);
        },
        setUserInfo: function(t) {
          o["a"].dispatch("saveUserInfo", t);
        },
      },
      Wt = qt({}, Qt, {}, Yt, {}, Zt);
  },
  "72e4": function(t, e, n) {},
  7540: function(t, e, n) {
    "use strict";
    n("7f7f");
    var a = n("b775"),
      i = n("78a3");
    e["a"] = {
      getLayers: function() {
        return a["a"].get(i["j"].GET_ALL);
      },
      getData: function(t, e) {
        return a["a"].get(t, { params: e });
      },
      postData: function(t, e) {
        return a["a"].post(t, e);
      },
      getLayerColumnsDistinctData: function(t) {
        return a["a"].get(
          i["URL"] + "/api/DataTable/GetDistinctValues/" + t.id,
          { params: { f: "json" } }
        );
      },
      getLayersWithFullData: function(t) {
        return a["a"].get("/", {
          params: { token: t.token, f: "json", option: "footprints" },
        });
      },
      getLayersWithFullDataFromServer: function(t) {
        return a["a"].get(i["URL"] + "/api/Map/GetLayers");
      },
      getLayerDynamic: function(t) {
        return a["a"].get(
          i["URL"] + "/api/map/service/" + t.name + "/MapServer/layers",
          { params: { f: "json", token: t.token } }
        );
      },
      getDynamicLayers: function(t) {
        return a["a"].get(
          i["URL"] + "/api/map/service/" + t.name + "/MapServer/",
          { params: { token: t.token, f: "json" } }
        );
      },
      getIntersectLocalTableData: function(t, e) {
        return a["a"].get(
          i["URL"] + "/api/datatable/Intersect/GetData/" + t + "/",
          { params: e }
        );
      },
      getLocalArithmeticData: function(t) {
        return a["a"].get(
          i["URL"] + "/api/datatable/GetArithmeticData/" + t.layerId + "/",
          { params: t }
        );
      },
      getTableHeaders: function(t) {
        return a["a"].get(i["d"].GET_TABLE_INFO + "/".concat(t));
      },
    };
  },
  7576: function(t, e, n) {
    t.exports = n.p + "img/pencil.4d095ce0.svg";
  },
  "778c": function(t, e, n) {
    "use strict";
    n.d(e, "c", function() {
      return a;
    }),
      n.d(e, "b", function() {
        return i;
      }),
      n.d(e, "a", function() {
        return r;
      });
    var a = { dynamicZIndex: 2e3, basemapZIndex: 1e3, bunchZIndex: 3e3 },
      i = { minZoomLevel: 0, maxZoomLevel: 20 },
      r = {
        f: "image",
        format: "png",
        transparent: "true",
        size: "1024,1024",
        bbox: null,
        bboxsr: "4326",
        imagesr: "4326",
        dpi: "90",
      };
  },
  "78a3": function(t, e, n) {
    "use strict";
    n.d(e, "i", function() {
      return v;
    }),
      n.d(e, "n", function() {
        return r;
      }),
      n.d(e, "h", function() {
        return s;
      }),
      n.d(e, "g", function() {
        return l;
      }),
      n.d(e, "e", function() {
        return p;
      }),
      n.d(e, "f", function() {
        return u;
      }),
      n.d(e, "l", function() {
        return f;
      }),
      n.d(e, "o", function() {
        return d;
      }),
      n.d(e, "c", function() {
        return c;
      }),
      n.d(e, "a", function() {
        return o;
      }),
      n.d(e, "j", function() {
        return g;
      }),
      n.d(e, "d", function() {
        return h;
      }),
      n.d(e, "k", function() {
        return m;
      }),
      n.d(e, "b", function() {
        return b;
      });
    var a = n("ce96"),
      i = "https://webgis.azercosmos.az/api",
      r = { GET_INFO_URL: "/user/GetInfo", GET_URL: "/user" },
      o = { LOGIN_URL: "/gettoken" },
      s = { GET_LANGUAGE: "/language" },
      c = {
        ADD: "/bunch",
        EDIT: "/bunch",
        DELETE: function(t) {
          return "/bunch/".concat(t);
        },
        GET: function(t) {
          return "/bunch/".concat(t);
        },
        GET_ALL: "/bunch",
      },
      l = {
        ADD: "/favoritequery",
        EDIT: "/favoritequery",
        DELETE: function(t) {
          return "/favoritequery/".concat(t);
        },
        GET: function(t) {
          return "/favoritequery/".concat(t);
        },
        GET_ALL: "/favoritequery",
      },
      u = { SET: "/favoritelayer", GET_ALL: "/favoritelayer" },
      d = { SET: "/workspace", GET: "/workspace", RESET: "/workspace" },
      p = { SET: "/defaultlayer", GET_ALL: "/defaultlayer" },
      f = {
        GET_ALL: "/notification",
        SET_READED: function(t) {
          return "/notification/".concat(t, "/setreaded");
        },
        GET_UNREAD_NOTIFICATION_COUNT:
          "/notification/GetUnreadNotificationCount",
      },
      m = { GET_ALL: "/ndviassessment" },
      g = { GET_ALL: "/layer/GetCategorizedLayers" },
      h = {
        GET_TABLE_INFO: function(t) {
          return "/datatable/".concat(t, "/GetTableInfo");
        },
        CREATE_OR_UPDATE: "/datatable/CreateOrUpdate",
        GET_ITEM: function(t, e) {
          return "/datatable/".concat(t, "/").concat(e, "/GetItem");
        },
        GET_DATA: function(t) {
          return "/datatable/".concat(t, "/GetData");
        },
        GET_INTERSECT_DATA: function(t) {
          return "/datatable/".concat(t, "/GetIntersectedData");
        },
        GET_ARITHMETIC_DATA: function(t) {
          return "/datatable/".concat(t, "/GetArithmeticData");
        },
        GET_DISTINCT_VALUES: function(t) {
          return "/datatable/".concat(t, "/GetDistinctValues");
        },
      },
      v = {
        GET: function(t) {
          return "/layerdataimage/".concat(t);
        },
        GET_ALL: function(t, e) {
          return "/layerdataimage/".concat(t, "/").concat(e);
        },
        ADD: "/layerdataimage",
        GET_BASE64_FILE: function(t) {
          return "/layerdataimage/".concat(t, "/GetBase64File");
        },
        DELETE: function(t, e) {
          return "/layerdataimage/".concat(t, "/").concat(e);
        },
      },
      b = {
        EXPORT_IMAGE_URL: function(t, e) {
          var n =
            i + "/service/arcgis/" + t + "/?" + a["h"].formatQueryString(e);
          return n;
        },
        SERVICE_URl: "/service/arcgis",
      };
  },
  7936: function(t, e, n) {
    t.exports = n.p + "img/home.75d8bae7.svg";
  },
  "7b02": function(t, e, n) {
    "use strict";
    var a = n("e6e1"),
      i = n.n(a);
    i.a;
  },
  "7b30": function(t, e, n) {
    t.exports = n.p + "img/picture.60b5cd0c.svg";
  },
  "7bfc": function(t, e, n) {
    "use strict";
    var a = n("e8e0"),
      i = n.n(a);
    i.a;
  },
  "806c": function(t, e, n) {},
  8243: function(t, e, n) {
    "use strict";
    var a = n("b775"),
      i = n("78a3");
    e["a"] = {
      getTableInfo: function(t) {
        return a["a"].get(i["d"].GET_TABLE_INFO(t));
      },
      getItem: function(t, e) {
        return a["a"].get(i["d"].GET_ITEM(t, e));
      },
      addOrEditData: function(t) {
        return a["a"].post(i["d"].CREATE_OR_UPDATE, t);
      },
      getData: function(t, e) {
        return a["a"].get(i["d"].GET_DATA(t), { params: e });
      },
      getIntersectedData: function(t, e) {
        return a["a"].get(i["d"].GET_INTERSECT_DATA(t), { params: e });
      },
      getArithmeticData: function(t, e) {
        return a["a"].get(i["d"].GET_ARITHMETIC_DATA(t), { params: e });
      },
      getDistinctValues: function(t, e) {
        return a["a"].get(i["d"].GET_DISTINCT_VALUES(t));
      },
    };
  },
  "85f2": function(t, e, n) {},
  "89e4": function(t, e, n) {},
  "8a95": function(t, e, n) {
    "use strict";
    var a = n("9cf9"),
      i = n.n(a);
    i.a;
  },
  "8ae2": function(t, e, n) {
    "use strict";
    var a = n("b775"),
      i = n("78a3");
    e["a"] = {
      getAll: function() {
        return a["a"].get(i["e"].GET_ALL);
      },
      set: function(t) {
        return a["a"].post(i["e"].SET, t);
      },
    };
  },
  "8af9": function(t, e, n) {
    "use strict";
    var a = n("9522"),
      i = n.n(a);
    i.a;
  },
  "8bb0": function(t, e, n) {
    "use strict";
    var a = n("b775"),
      i = n("78a3");
    e["a"] = {
      get: function(t) {
        return a["a"].get(i["c"].GET(t));
      },
      getAll: function() {
        return a["a"].get(i["c"].GET_ALL);
      },
      add: function(t) {
        return a["a"].post(i["c"].ADD, t);
      },
      edit: function(t) {
        return a["a"].put(i["c"].ADD, t);
      },
      delete: function(t) {
        return a["a"].delete(i["c"].DELETE(t));
      },
    };
  },
  "8bca": function(t, e, n) {
    "use strict";
    var a = n("9a3a"),
      i = n.n(a);
    i.a;
  },
  "91a5": function(t, e, n) {},
  9231: function(t, e, n) {},
  9522: function(t, e, n) {},
  9560: function(t, e, n) {},
  9565: function(t, e, n) {
    t.exports = n.p + "img/file_download.1e64a110.svg";
  },
  "96ca": function(t, e, n) {},
  "979e": function(t, e, n) {
    t.exports = n.p + "img/swap.a401f5ac.svg";
  },
  9923: function(t, e, n) {
    "use strict";
    n.d(e, "b", function() {
      return o;
    });
    n("ac6a"), n("456d");
    var a = n("2b0e"),
      i = n("a925");
    a["default"].use(i["a"]);
    var r = {};
    function o() {
      var t = localStorage.getItem("language");
      if (t) return t;
      for (
        var e = (navigator.language || navigator.browserLanguage).toLowerCase(),
          n = Object.keys(r),
          a = 0,
          i = n;
        a < i.length;
        a++
      ) {
        var o = i[a];
        if (e.indexOf(o) > -1) return o;
      }
      return "az-AZ";
    }
    var s = new i["a"]({ locale: o(), messages: r });
    e["a"] = s;
  },
  "99ac": function(t, e, n) {
    "use strict";
    var a = n("9ae1"),
      i = n.n(a);
    i.a;
  },
  "9a3a": function(t, e, n) {},
  "9ae1": function(t, e, n) {},
  "9cf9": function(t, e, n) {},
  "9d64": function(t, e, n) {
    t.exports = n.p + "img/logo.584423f0.png";
  },
  "9f3c": function(t, e, n) {
    t.exports = n.p + "img/color_fill.2ff7c080.svg";
  },
  a373: function(t, e, n) {
    t.exports = n.p + "img/hamburger.84eb1648.svg";
  },
  a83c: function(t, e, n) {
    "use strict";
    var a = n("5cdd"),
      i = n.n(a);
    i.a;
  },
  a91f: function(t, e, n) {
    t.exports = n.p + "img/delete.65895fc9.svg";
  },
  a93e: function(t, e, n) {
    t.exports = n.p + "img/list.d1087ea1.svg";
  },
  aa3f: function(t, e, n) {
    "use strict";
    function a(t) {
      return n("5981")("./".concat(t, ".svg"));
    }
    n.d(e, "b", function() {
      return o;
    }),
      n.d(e, "c", function() {
        return i;
      }),
      n.d(e, "a", function() {
        return r;
      });
    var i = n("9d64"),
      r = n("3077"),
      o = {
        arrow_down: a("arrow_down"),
        arrow_left: a("arrow_left"),
        arrow_right: a("arrow_right"),
        arrow_up: a("arrow_up"),
        circle: a("circle"),
        color_fill: a("color_fill"),
        color_picker: a("color_picker"),
        compass: a("compass"),
        delete: a("delete"),
        diagonal_arrow: a("diagonal_arrow"),
        file_download: a("file_download"),
        fullscreen: a("fullscreen"),
        grid: a("grid"),
        hamburger: a("hamburger"),
        home: a("home"),
        information: a("information"),
        layer: a("layer"),
        line: a("line"),
        list: a("list"),
        map: a("map"),
        minus: a("minus"),
        mouse: a("mouse"),
        pencil: a("pencil"),
        picture: a("picture"),
        place: a("place"),
        plus: a("plus"),
        point: a("point"),
        polygon: a("polygon"),
        rectangle: a("rectangle"),
        reset: a("reset"),
        search: a("search"),
        square: a("square"),
        user: a("user"),
        world: a("world"),
        ndvi: a("ndvi"),
        swap: a("swap"),
        text: a("text"),
        blindSpot: a("blindSpot"),
        send: a("send"),
      };
  },
  aa81: function(t, e, n) {
    "use strict";
    var a = n("9231"),
      i = n.n(a);
    i.a;
  },
  adc4: function(t, e, n) {
    t.exports = n.p + "img/arrow_right.75ea6b99.svg";
  },
  afa4: function(t, e, n) {
    t.exports = n.p + "img/user.1b45938d.svg";
  },
  b007: function(t, e, n) {},
  b49e: function(t, e, n) {
    t.exports = n.p + "img/compass.a04074c1.svg";
  },
  b71e: function(t, e, n) {
    "use strict";
    var a = n("85f2"),
      i = n.n(a);
    i.a;
  },
  b775: function(t, e, n) {
    "use strict";
    var a = n("bc3a"),
      i = n.n(a),
      r = n("dde5");
    n("7f7f"), n("ac6a");
    function o(t) {
      var e = [],
        n = t.isError;
      if (n) {
        var a = t.responseException;
        if (a) {
          var i = a.validationErrors && a.validationErrors.length > 0;
          i
            ? a.validationErrors.forEach(function(t) {
                e.push({ key: t.name, reason: t.reason });
              })
            : a.exceptionMessage &&
              e.push({ key: "exceptionMessage", reason: a.exceptionMessage });
        } else
          t.message
            ? e.push({ key: "message", reason: t.message })
            : e.push({ key: "message", reason: "Error" });
      }
      return e;
    }
    var s = n("ce96"),
      c = n("9923"),
      l = i.a.create({
        baseURL: "https://webgis.azercosmos.az/api",
        withCredentials: !1,
        returnFullResponse: !1,
        popupErrorMessage: !0,
        paramsSerializer: function(t) {
          return s["h"].formatQueryString(t);
        },
      });
    l.interceptors.request.use(
      function(t) {
        var e = r["d"].getToken();
        return (
          e &&
            ((t.headers["Authorization"] = "Bearer " + e),
            (t.headers["Accept-Language"] = Object(c["b"])())),
          t
        );
      },
      function(t) {
        return Promise.reject(t);
      }
    ),
      l.interceptors.response.use(
        function(t) {
          var e = t.data,
            n = t.data.result,
            a = t.config,
            i = t.status;
          if (200 !== i) {
            var s = "";
            return (
              401 === i || 403 === i
                ? store.dispatch("user/resetToken").then(function() {
                    location.reload();
                  })
                : ((s = o(e)[0].reason),
                  a.popupErrorMessage && r["c"].error(s || "Error")),
              a.popupErrorMessage
                ? Promise.reject(new Error(s || "Error"))
                : a.returnFullResponse
                ? e
                : n
            );
          }
          return a.returnFullResponse ? e : n;
        },
        function(t) {
          var e = t.config.popupErrorMessage,
            n = t.response.data,
            a = o(n)[0].reason;
          return e && r["c"].error(a), Promise.reject(n);
        }
      );
    e["a"] = l;
  },
  b85b: function(t, e, n) {
    "use strict";
    var a = n("5eee");
    n.d(e, "p", function() {
      return a["a"];
    });
    var i = n("a2c7");
    n.d(e, "I", function() {
      return i["a"];
    });
    var r = n("0710");
    n.d(e, "r", function() {
      return r["a"];
    });
    var o = n("4cdf");
    n.d(e, "f", function() {
      return o["default"];
    });
    var s = n("7a09");
    n.d(e, "n", function() {
      return s["a"];
    });
    var c = n("5bc3");
    n.d(e, "t", function() {
      return c["b"];
    });
    var l = n("f822");
    n.d(e, "a", function() {
      return l["a"];
    });
    var u = n("f403");
    n.d(e, "s", function() {
      return u["default"];
    });
    var d = n("c807");
    n.d(e, "q", function() {
      return d["a"];
    });
    var p = n("3a39");
    n.d(e, "O", function() {
      return p["a"];
    });
    var f = n("d946");
    n.d(e, "d", function() {
      return f["a"];
    });
    var m = n("88df");
    n.d(e, "c", function() {
      return m["a"];
    });
    var g = n("793c");
    n.d(e, "z", function() {
      return g["a"];
    });
    var h = n("ce2c");
    n.d(e, "b", function() {
      return h["a"];
    });
    var v = n("8295");
    n.d(e, "x", function() {
      return v["a"];
    });
    var b = n("83a6");
    n.d(e, "g", function() {
      return b["a"];
    });
    var y = n("8682");
    n.d(e, "v", function() {
      return y["a"];
    });
    var C = n("6c77");
    n.d(e, "w", function() {
      return C["default"];
    });
    var _ = n("6cbf");
    n.d(e, "l", function() {
      return _["default"];
    });
    var E = n("480c");
    n.d(e, "B", function() {
      return E["a"];
    });
    var S = n("3e6b");
    n.d(e, "E", function() {
      return S["default"];
    });
    var O = n("97e6");
    n.d(e, "G", function() {
      return O["a"];
    });
    var T = n("78db2");
    n.d(e, "H", function() {
      return T["a"];
    });
    var w = n("fdb7");
    n.d(e, "o", function() {
      return w["a"];
    });
    var L = n("089b");
    n.d(e, "M", function() {
      return L["b"];
    });
    var k = n("78db");
    n.d(e, "A", function() {
      return k["a"];
    });
    var I = n("5043");
    n.d(e, "y", function() {
      return I["a"];
    });
    var A = n("5831");
    n.d(e, "F", function() {
      return A["default"];
    });
    var x = n("256f");
    n.d(e, "P", function() {
      return x["fromLonLat"];
    }),
      n.d(e, "S", function() {
        return x["transform"];
      }),
      n.d(e, "T", function() {
        return x["transformExtent"];
      }),
      n.d(e, "Q", function() {
        return x["get"];
      });
    var j = n("2ef1");
    n.d(e, "J", function() {
      return j["a"];
    });
    var D = n("9d47");
    n.d(e, "u", function() {
      return D["a"];
    });
    var M = n("21bc");
    n.d(e, "N", function() {
      return M["a"];
    });
    var R = n("cbcb");
    n.d(e, "h", function() {
      return R["a"];
    });
    var P = n("a2e1");
    n.d(e, "i", function() {
      return P["a"];
    });
    var B = n("8083");
    n.d(e, "k", function() {
      return B["a"];
    });
    var F = n("1ab5");
    n.d(e, "m", function() {
      return F["a"];
    });
    var N = n("b168");
    n.d(e, "D", function() {
      return N["a"];
    });
    var $ = n("962d");
    n.d(e, "j", function() {
      return $["a"];
    });
    var G = n("06f8");
    n.d(e, "R", function() {
      return G["i"];
    });
    var V = n("ac29");
    n.d(e, "e", function() {
      return V["c"];
    }),
      n.d(e, "L", function() {
        return V["b"];
      }),
      n.d(e, "K", function() {
        return V["a"];
      });
    var U = n("35a7");
    n.d(e, "U", function() {
      return U["b"];
    });
    var z = n("f2f0");
    n.d(e, "C", function() {
      return z["a"];
    });
  },
  bb3b: function(t, e, n) {},
  bd51: function(t) {
    t.exports = JSON.parse(
      '{"key":"6LfKrcUZAAAAADyuK78vK0GngnWGbFMuBQ2TsKkS"}'
    );
  },
  bf17: function(t, e, n) {
    "use strict";
    var a = n("16d2"),
      i = n.n(a);
    i.a;
  },
  bfac: function(t, e, n) {
    "use strict";
    var a = n("d01b"),
      i = n.n(a);
    i.a;
  },
  c5b8: function(t, e, n) {
    t.exports = n.p + "img/world.19e26a6b.svg";
  },
  c8ca: function(t, e, n) {
    t.exports = n.p + "img/logo-en.584423f0.png";
  },
  ccd8: function(t, e, n) {
    t.exports = n.p + "img/arrow_down.525f9aba.svg";
  },
  ce96: function(t, e, n) {
    "use strict";
    n.d(e, "e", function() {
      return l;
    }),
      n.d(e, "b", function() {
        return b;
      }),
      n.d(e, "d", function() {
        return T;
      }),
      n.d(e, "a", function() {
        return I;
      }),
      n.d(e, "g", function() {
        return M;
      }),
      n.d(e, "h", function() {
        return V;
      }),
      n.d(e, "c", function() {
        return q;
      }),
      n.d(e, "i", function() {
        return W;
      }),
      n.d(e, "f", function() {
        return tt;
      });
    n("8e6e"), n("ac6a"), n("456d");
    var a = n("bd86"),
      i = n("790a"),
      r = n("b85b");
    function o(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function s(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? o(Object(n), !0).forEach(function(e) {
              Object(a["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : o(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var c = {
        bboxToExtent: function(t) {
          var e = new r["t"]([t]).getExtent();
          return e;
        },
        formatArea: function(t) {
          var e,
            n = Object(i["a"])(t);
          return (
            (e =
              n > 1e4
                ? Math.round((n / 1e6) * 100) / 100 + " km<sup>2</sup>"
                : Math.round(100 * n) / 100 + " m<sup>2</sup>"),
            e
          );
        },
        formatLength: function(t) {
          var e,
            n = Object(i["c"])(t);
          return (
            (e =
              n > 100
                ? Math.round((n / 1e3) * 100) / 100 + " km"
                : Math.round(100 * n) / 100 + " m"),
            e
          );
        },
        formatCircleRadius: function(t) {
          var e,
            n = t.getRadius() * METERS_PER_UNIT["m"];
          return (
            (e =
              n > 100
                ? Math.round((n / 1e3) * 100) / 100 + " km"
                : Math.round(100 * n) / 100 + " m"),
            e
          );
        },
      },
      l = s({}, c),
      u = n("07a4"),
      d = n("36d6"),
      p = n("f2ef"),
      f = n("ee13");
    function m(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function g(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? m(Object(n), !0).forEach(function(e) {
              Object(a["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : m(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var h = {
        renderMvtStyle: function(t, e) {
          var n = e.layerColor,
            a = null,
            i = null,
            r = !1;
          if (n)
            for (
              var o = n.column, s = t.get(o), c = n.conditions, l = 0;
              l < c.length;
              l++
            ) {
              var u = c[l],
                d = Object(f["b"])(u.operator),
                p = q.parseByTypeString(n.columnDataType, u.value),
                m = q.checkStringArithmeticOperation(s, p, d);
              if (m) {
                (r = !0), (a = u.borderColor), (i = u.fillColor);
                break;
              }
            }
          return (
            (n && r) || ((a = e.color.borderColor), (i = e.color.fillColor)),
            h.buildVectorStyle(a, i)
          );
        },
        renderColor: function(t, e, n) {
          var a = [],
            i = [];
          (a[0] = e.rgba.r),
            (a[1] = e.rgba.g),
            (a[2] = e.rgba.b),
            (a[3] = 255 * e.rgba.a),
            (i[0] = n.rgba.r),
            (i[1] = n.rgba.g),
            (i[2] = n.rgba.b),
            (i[3] = 255 * n.rgba.a);
          var r = "[" + a[0] + "," + a[1] + "," + a[2] + "," + a[3] + "]",
            o = "[" + i[0] + "," + i[1] + "," + i[2] + "," + i[3] + "]",
            s =
              '{"id":' +
              t +
              ',"name":"","source":{"type":"mapLayer","mapLayerId": ' +
              t +
              '},"drawingInfo":{"renderer":{"type":"simple","label":"","description":"","symbol":{"color":' +
              r +
              ',"outline":{"color":' +
              o +
              ',"width":1.0,"type":"esriSLS","style":"esriSLSSolid"},"type":"esriSFS","style":"esriSFSSolid"}}},"minScale":0,"maxScale":0}';
          return s;
        },
        buildVectorStyle: function(t, e) {
          (p["a"].isNull(t) || p["a"].isUndefined(t)) &&
            (t = v.getDefaultColorObject().borderColor),
            (p["a"].isNull(e) || p["a"].isUndefined(e)) &&
              (e = v.getDefaultColorObject().fillColor);
          var n = new r["w"]({
            fill: new r["g"]({ color: e }),
            stroke: new r["v"]({ color: t, width: 0.5 }),
            image: new r["b"]({
              radius: 7,
              fill: new r["g"]({ color: e }),
              stroke: new r["v"]({ color: t, width: 0.5 }),
            }),
          });
          return n;
        },
        buildColorObject: function(t, e) {
          var n = v.getDefaultColorObject();
          return (
            (p["a"].isUndefined(t) || p["a"].isNull(t)) && (t = n.borderColor),
            (p["a"].isUndefined(e) || p["a"].isNull(e)) && (e = n.fillColor),
            { borderColor: t, fillColor: e }
          );
        },
      },
      v = {
        getDefaultColorObject: function() {
          var t = u["a"].state.colorPicker.defaultFillColor,
            e = u["a"].state.colorPicker.defaultBorderColor;
          return { fillColor: t, borderColor: e };
        },
        getColorByIndex: function(t) {
          var e = d["a"].length;
          return e - 1 < t ? d["a"][0] : d["a"][t];
        },
      },
      b = g({}, h, {}, v),
      y = (n("6762"), n("2fdb"), n("75fc")),
      C = (n("7f7f"), n("6b54"), n("0962"));
    function _(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function E(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? _(Object(n), !0).forEach(function(e) {
              Object(a["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : _(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var S = {
        basemapMapping: function(t) {
          return {
            id: t.id,
            name: t.label,
            showingLabel: t.showingLabel,
            spatial: t.spatial,
            minZoomLevel: t.minZoomLevel,
            maxZoomLevel: t.maxZoomLevel,
            extent: t.extent,
            resolutionOption: t.resolutionOption,
            resourceType: t.resourceTypeId,
            mapType: t.mapTypeId,
            type: C["f"].LAYER,
            isDisabled: t.isDisabled,
            isSelected: !1,
            layers: null,
            sourceUrl: t.sourceUrl,
          };
        },
        dynamicMapping: function(t) {
          return E(
            {
              id: t.id,
              name: t.label,
              showingLabel: t.showingLabel,
              minZoomLevel: t.minZoomLevel,
              maxZoomLevel: t.maxZoomLevel,
              extent: t.extent,
              spatial: t.spatial,
              resolutionOption: t.resolutionOption,
              resourceType: t.resourceTypeId,
              mapType: t.mapTypeId,
              type: C["f"].LAYER,
              isDisabled: t.isDisabled,
              isSelected: !1,
              isColorEnabled: !0,
              sourceUrl: t.sourceUrl,
            },
            "local" === t.resourceTypeId && {
              color: null,
              layerColor: t.layerColor,
            },
            { query: { where: "", extentCoordinates: "" }, layers: null }
          );
        },
        recursiveMap: function(t) {
          if (void 0 !== t.layers) {
            var e = {
              id: t.id,
              name: t.label,
              mapTypeId: t.mapTypeId,
              children: t.children.map(function(t, e) {
                return S.recursiveMap(t);
              }),
              type: C["f"].CATEGORY,
              layers: t.layers.map(function(e, n) {
                return M.isBasemap(t.mapTypeId)
                  ? S.basemapMapping(e)
                  : S.dynamicMapping(e);
              }),
            };
            return e;
          }
          return M.isBasemap(t.mapTypeId)
            ? S.basemapMapping(t)
            : S.dynamicMapping(t);
        },
        subLayerMapping: function(t, e) {
          return (
            (t.color = null),
            (t.type = C["f"].SUBLAYER),
            (t.isSelected = !0),
            (t.uid = parseInt(e.id.toString() + t.id.toString())),
            (t.parent = e),
            t
          );
        },
        mapLayers: function(t) {
          var e = t
              .filter(function(t) {
                return "basemap" === t.mapTypeId;
              })
              .map(function(t) {
                return S.recursiveMap(t);
              }),
            n = t
              .filter(function(t) {
                return "dynamic" === t.mapTypeId;
              })
              .map(function(t) {
                return S.recursiveMap(t);
              }),
            a = { baseLayers: e, dynamicLayers: n };
          return a;
        },
        recursiveLayerMapping: function(t, e) {
          for (var n = 0; n < t.length; n++) {
            var a = t[n];
            S.recursiveMapping(a, e);
          }
          return t;
        },
        recursiveMapping: function(t, e) {
          var n = M.isCategory(t);
          if (n) {
            if (t.children && t.children.length > 0)
              for (var a = 0; a < t.children.length; a++) {
                var i = t.children[a];
                S.recursiveMapping(i, e);
              }
            if (t.layers && t.layers.length > 0)
              for (a = 0; a < t.layers.length; a++) {
                var r = t.layers[a];
                S.recursiveMapping(r, e);
              }
          } else e && "function" === typeof e && e(t);
        },
        recursiveTreeMapping: function(t, e) {
          for (var n = [], a = 0; a < t.length; a++) {
            var i = t[a];
            i = S.recursiveTreeSelectMapping(i, e);
            i && n.push(i);
          }
          return n;
        },
        recursiveTreeSelectMapping: function(t, e) {
          if ((e && "function" === typeof e && (t = e(t)), !t)) return t;
          var n = M.isCategory(t);
          if (n) {
            for (
              var a = {
                  id: t.id,
                  label: t.name,
                  children: [].concat(
                    Object(y["a"])(t.children),
                    Object(y["a"])(t.layers)
                  ),
                },
                i = 0;
              i < a.children.length;
              i++
            )
              a.children[i] = S.recursiveTreeSelectMapping(a.children[i], e);
            return a;
          }
          return { id: t.id, label: t.name };
        },
      },
      O = {
        buildLayerConditionLabel: function(t, e, n) {
          return ""
            .concat(t, " ")
            .concat(Object(f["b"])(e), " ")
            .concat(n);
        },
        treeFilter: function(t, e) {
          var n = t.filter(function(t) {
            if (M.isCategory(t)) {
              t.children = O.treeFilter(t.children, e);
              var n = t.layers.some(function(t) {
                return t.name.toLowerCase().includes(e.toLowerCase());
              });
              return (
                t.layers &&
                  (t.layers = t.layers.filter(function(t) {
                    return t.name.toLowerCase().includes(e.toLowerCase());
                  })),
                n || t.children.length > 0
              );
            }
            return t.name.toLowerCase().includes(e.toLowerCase());
          });
          return n;
        },
      },
      T = E({}, O, {}, S);
    n("0d96");
    function w(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function L(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? w(Object(n), !0).forEach(function(e) {
              Object(a["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : w(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var k = {
        bunchMapper: function(t) {
          var e = {
            id: t.id,
            name: t.label,
            layers: t.layers.map(function(t) {
              return T.dynamicMapping(t);
            }),
            type: "bunch",
            isActive: t.isActive,
            color: null,
            isSelected: !1,
            isColorEnabled: !0,
          };
          return e;
        },
        mapBunchs: function(t) {
          var e = t.map(function(t) {
            return k.bunchMapper(t);
          });
          return e;
        },
      },
      I = L({}, k),
      A = n("dde5");
    n("7540");
    function x(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function j(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? x(Object(n), !0).forEach(function(e) {
              Object(a["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : x(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var D = {
        isLocalService: function(t) {
          return t && "local" === t.resourceType;
        },
        isArcgisService: function(t) {
          return t && "azcArcgis" === t.resourceType;
        },
        isGeoserverService: function(t) {
          return t && "geoserver" === t.resourceType;
        },
        isGeoserverGwsService: function(t) {
          return t && "geoserverGws" === t.resourceType;
        },
        isGeowebcacheService: function(t) {
          return t && "geowebcache" === t.resourceType;
        },
        isDynamic: function(t) {
          return t && "dynamic" == t.mapType;
        },
        isBasemap: function(t) {
          return t && "basemap" == t.mapType;
        },
        isDynamicFromArcgis: function(t) {
          return t && D.isArcgisService(t) && D.isDynamic(t);
        },
        isDynamicFromLocal: function(t) {
          return t && D.isLocalService(t) && D.isDynamic(t);
        },
        isCategory: function(t) {
          return t && t.type === C["f"].CATEGORY;
        },
        isLayer: function(t) {
          return t && t.type === C["f"].LAYER;
        },
        isSublayer: function(t) {
          return t && t.type === C["f"].SUBLAYER;
        },
        isBunch: function(t) {
          return t && t.type === C["f"].BUNCH;
        },
        isEqual: function(t, e) {
          return t && e && t.id == e.id && t.type == e.type;
        },
        isQueryExist: function(t) {
          return D.isLayer(t)
            ? t.query &&
                ((t.query.where &&
                  "" !== t.query.where &&
                  "1=1" !== t.query.where.trim()) ||
                  (t.query.extentCoordinates &&
                    "" !== t.query.extentCoordinates &&
                    "1=1" !== t.query.extentCoordinates.trim()))
            : !!D.isBunch(t) &&
                t.layers.some(function(t) {
                  return D.isQueryExist(t);
                });
        },
      },
      M = j({}, D),
      R = n("78a3"),
      P = n("778c"),
      B = n("4328"),
      F = n.n(B);
    function N(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function $(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? N(Object(n), !0).forEach(function(e) {
              Object(a["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : N(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var G = {
        formatQueryString: function(t) {
          return F.a.stringify(t, { arrayFormat: "indices", allowDots: !0 });
        },
        checkImageExists: function(t) {
          var e = new XMLHttpRequest();
          return e.open("HEAD", t, !1), e.send(), 404 != e.status;
        },
        buildTileUrl: function(t, e) {
          var n = "",
            a = "https://webgis.azercosmos.az/api",
            i = A["d"].getToken(),
            r = C["g"].LOCAL_MVT,
            o = C["g"].XYZ,
            s = C["g"].TILE_ARCGIS_REST,
            c = C["g"].IMAGE_ARCGIS_REST,
            l = C["g"].WMS;
          switch (e) {
            case r:
              if (M.isLayer(t)) {
                var u = t.query,
                  d = G.formatQueryString(u);
                n = ""
                  .concat(a, "/service/webgis/")
                  .concat(t.name, "/mvt/{z}/{x}/{y}/?")
                  .concat(d);
              } else {
                var p = t.layers.map(function(t, e) {
                    var n = { layerId: t.id };
                    return M.isQueryExist(t) && (n.query = t.query), n;
                  }),
                  f = G.formatQueryString({ queries: p });
                n = ""
                  .concat(a, "/service/webgis/")
                  .concat(t.name, "/intersect/mvt/{z}/{x}/{y}/?")
                  .concat(f);
              }
              break;
            case o:
              n = ""
                .concat(a, "/service/arcgis/")
                .concat(t.name, "/{z}/{y}/{x}?token=")
                .concat(i);
              break;
            case s:
              n = "".concat(a, "/service/arcgis/").concat(t.name, "/");
              break;
            case c:
              n = "".concat(a, "/service/arcgis/").concat(t.name, "/");
              break;
            case l:
              M.isGeoserverService(t)
                ? (n = "".concat(a, "/service/geoserver/").concat(t.name, "/"))
                : M.isGeoserverGwsService(t)
                ? (n = ""
                    .concat(a, "/service/geoserver/")
                    .concat(t.name, "/gwc/"))
                : M.isGeowebcacheService(t) &&
                  (n = ""
                    .concat(a, "/service/geowebcache/")
                    .concat(t.name, "/"));
              break;
          }
          return n;
        },
        getImageUrl: function(t, e, n) {
          var a = A["d"].getToken(),
            i = e.toString();
          if (n == C["e"].ARCGIS) {
            var r = P["a"];
            (r["token"] = a), (r["bbox"] = i);
            var o = R["b"].EXPORT_IMAGE_URL(t, r);
            return o;
          }
          return "";
        },
      },
      V = $({}, G);
    function U(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function z(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? U(Object(n), !0).forEach(function(e) {
              Object(a["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : U(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var H = {
        checkStringArithmeticOperation: function(t, e, n) {
          switch (n) {
            case "=":
              return t === e;
            case ">":
              return t > e;
            case "<":
              return t < e;
            case ">=":
              return t >= e;
            case "<=":
              return t <= e;
            default:
              return t === e;
          }
        },
        parseByTypeString: function(t, e) {
          switch (t) {
            case "int":
              return parseInt(e);
            case "double":
              return parseFloat(e);
            case "string":
              return e.toString();
            default:
              return parseInt(e);
          }
        },
      },
      q = z({}, H);
    function Q(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function Y(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? Q(Object(n), !0).forEach(function(e) {
              Object(a["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : Q(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var Z = {
        mapRoleObj: function(t) {
          var e = t.map(function(t) {
            var e = t.name.toLowerCase(),
              n = [];
            return (
              t.permissions &&
                t.permissions.length > 0 &&
                (n = t.permissions.map(function(t) {
                  return ""
                    .concat(t.category.label, "_")
                    .concat(t.permission.label)
                    .toLowerCase();
                })),
              { name: e, permissions: n }
            );
          });
          return e;
        },
        mapPermissionObj: function(t) {
          return t && t.length > 0
            ? t.map(function(t) {
                return t.label.toLowerCase();
              })
            : [];
        },
        mapUserInfo: function(t) {
          var e = t.userName,
            n = t.email,
            a = t.id;
          return { userName: e, email: n, id: a };
        },
      },
      W = Y({}, Z);
    function K(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(t);
        e &&
          (a = a.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, a);
      }
      return n;
    }
    function X(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? K(Object(n), !0).forEach(function(e) {
              Object(a["a"])(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
          : K(Object(n)).forEach(function(e) {
              Object.defineProperty(
                t,
                e,
                Object.getOwnPropertyDescriptor(n, e)
              );
            });
      }
      return t;
    }
    var J = {
        getRolePermissions: function(t) {
          var e = [];
          return (
            t.forEach(function(t) {
              e = e.concat(t.permissions);
            }),
            e
          );
        },
        getRoleNames: function(t) {
          return t.map(function(t) {
            return t.name;
          });
        },
      },
      tt = X({}, J);
  },
  cee41: function(t, e, n) {
    t.exports = n.p + "img/arrow_left.bd19434f.svg";
  },
  d01b: function(t, e, n) {},
  d2f3: function(t, e, n) {
    t.exports = n.p + "img/diagonal_arrow.d85732ef.svg";
  },
  dcbe: function(t, e, n) {
    "use strict";
    var a = n("6e73"),
      i = n.n(a);
    i.a;
  },
  dde5: function(t, e, n) {
    "use strict";
    n.d(e, "a", function() {
      return o;
    }),
      n.d(e, "d", function() {
        return i;
      }),
      n.d(e, "b", function() {
        return c;
      }),
      n.d(e, "c", function() {
        return y;
      });
    var a = "token",
      i = {
        getToken: function() {
          return localStorage.getItem(a);
        },
        setToken: function(t) {
          localStorage.setItem(a, t);
        },
        removeToken: function() {
          localStorage.removeItem(a);
        },
      },
      r = "loginFailedAttemptCount",
      o = {
        getFailedAttemptCount: function() {
          var t = localStorage.getItem(r);
          return t
            ? parseInt(t)
            : (this.resetFailedAttemptCount(), this.getFailedAttemptCount());
        },
        increaseFailedAttempCount: function() {
          var t = this.getFailedAttemptCount();
          localStorage.setItem(r, parseInt(t) + 1);
        },
        setFailedAttempCount: function(t) {
          localStorage.setItem(r, t);
        },
        resetFailedAttemptCount: function() {
          localStorage.setItem(r, 0);
        },
      },
      s = (n("c5f6"), n("28a5"), n("a481"), n("7055")),
      c = {
        resolveHash: function() {
          var t = window.location.hash;
          if ("" !== t) {
            var e = t.replace("#shareMap=", ""),
              n = e.split("&");
            if (4 === n.length) {
              var a = parseFloat(n[0], 10),
                i = [parseFloat(n[1]), parseFloat(n[2])],
                r = [],
                o = n[3].split(",");
              return (
                o && "" != o && (r = o.map(Number)),
                { zoom: a, center: i, selectedLayers: r }
              );
            }
          }
          return null;
        },
        setHashSelectedServices: function() {
          if (null !== this.hashResolveResult) {
            var t = this.hashResolveResult.selectedLayers;
            if (t)
              for (var e = 0; e < t.length; e++) {
                var n = t[e],
                  a = s["d"].getLayer(n);
                a && serviceController.selectService(a, !0);
              }
          }
        },
        updateHash: function() {
          var t = s["e"].getMap(),
            e = t.getView(),
            n = {
              zoom: e.getZoom(),
              center: e.getCenter(),
              rotation: e.getRotation(),
            },
            a = s["d"].getSelectedLayers(),
            i = a.map(function(t) {
              return t.id;
            }),
            r =
              "#shareMap=" +
              e.getZoom() +
              "&" +
              Math.round(100 * e.getCenter()[0]) / 100 +
              "&" +
              Math.round(100 * e.getCenter()[1]) / 100 +
              "&" +
              i;
          window.history.pushState(n, "map", r);
        },
      },
      l = n("2b0e"),
      u = new l["default"](),
      d = function(t) {
        u.$snotify.success(t);
      },
      p = function(t) {
        u.$snotify.error(t);
      },
      f = function(t) {
        u.$snotify.info(t);
      },
      m = function() {
        d("Record Created Successfully!");
      },
      g = function() {
        d("Record Updated Successfully!");
      },
      h = function() {
        d("Record Deleted Successfully!");
      },
      v = function(t, e, n) {
        u.$swal
          .fire({
            icon: "warning",
            title: t,
            showCancelButton: !0,
            confirmButtonText: e,
          })
          .then(function(t) {
            n(t);
          });
      },
      b = function(t) {
        v("Do you want to delete this record?", "Delete", t);
      },
      y = {
        success: d,
        error: p,
        info: f,
        created: m,
        updated: g,
        deleted: h,
        areYouSureAlert: v,
        areYouSureDeleteRecord: b,
      };
  },
  de50: function(t, e, n) {
    "use strict";
    var a = n("bb3b"),
      i = n.n(a);
    i.a;
  },
  df19: function(t, e, n) {
    t.exports = n.p + "img/map.1a740cbd.svg";
  },
  e332: function(t, e, n) {},
  e6e1: function(t, e, n) {},
  e8e0: function(t, e, n) {},
  ebd0: function(t, e, n) {
    "use strict";
    var a = n("03fd"),
      i = n.n(a);
    i.a;
  },
  ed08: function(t, e, n) {
    "use strict";
    n.d(e, "f", function() {
      return i;
    }),
      n.d(e, "d", function() {
        return r;
      }),
      n.d(e, "g", function() {
        return o;
      }),
      n.d(e, "b", function() {
        return s;
      }),
      n.d(e, "a", function() {
        return c;
      }),
      n.d(e, "e", function() {
        return l;
      });
    n("456d"), n("ac6a");
    var a = n("7618");
    n("34ef"), n("6b54"), n("a481"), n("f2ef");
    function i(t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
        a = e ? 1e3 : 1024;
      if (Math.abs(t) < a) return t + " B";
      var i = e
          ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
          : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"],
        r = -1,
        o = Math.pow(10, n);
      do {
        (t /= a), ++r;
      } while (Math.round(Math.abs(t) * o) / o >= a && r < i.length - 1);
      return t.toFixed(n) + " " + i[r];
    }
    function r() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function(
        t
      ) {
        return (
          t ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (t / 4)))
        ).toString(16);
      });
    }
    function o(t, e, n) {
      if (t.length > e) {
        var a = e;
        while (a > 0 && " " != t[a] && "-" != t[a]) a--;
        if (a > 0) {
          var i;
          i =
            "-" == t.substring(a, a + 1)
              ? t.substring(0, a + 1)
              : t.substring(0, a);
          var r = t.substring(a + 1);
          return i + n + o(r, e, n);
        }
      }
      return t;
    }
    function s(t) {
      if (!t && "object" !== Object(a["a"])(t))
        throw new Error("error arguments", "deepClone");
      var e = t.constructor === Array ? [] : {};
      return (
        Object.keys(t).forEach(function(n) {
          t[n] && "object" === Object(a["a"])(t[n])
            ? (e[n] = s(t[n]))
            : (e[n] = t[n]);
        }),
        e
      );
    }
    function c(t) {
      return t.charAt(0).toUpperCase() + t.slice(1);
    }
    function l(t) {
      var e = parseInt(t.slice(1, 3), 16),
        n = parseInt(t.slice(3, 5), 16),
        a = parseInt(t.slice(5, 7), 16),
        i = 1;
      return (
        t.length > 7 && (i = parseInt(t.slice(7, 9), 16)),
        { r: e, g: n, b: a, a: i }
      );
    }
  },
  ed85: function(t, e, n) {
    t.exports = n.p + "img/line.96dbd02a.svg";
  },
  ee13: function(t, e, n) {
    "use strict";
    function a(t) {
      switch (t) {
        case 1:
          return "=";
        case 2:
          return ">";
        case 3:
          return "<";
        case 4:
          return ">=";
        case 5:
          return "<=";
      }
    }
    function i(t) {
      switch (t) {
        case 1:
          return "km";
        case 2:
          return "m";
        case 3:
          return "cm";
        default:
          return "km";
      }
    }
    n.d(e, "b", function() {
      return a;
    }),
      n.d(e, "a", function() {
        return i;
      });
  },
  eeec: function(t, e, n) {
    t.exports = n.p + "img/arrow_up.b54cfac9.svg";
  },
  f035: function(t, e, n) {
    "use strict";
    var a = n("89e4"),
      i = n.n(a);
    i.a;
  },
  f11b: function(t, e, n) {
    t.exports = n.p + "img/minus.7dc2f5e2.svg";
  },
  f1f5: function(t, e, n) {
    t.exports = n.p + "img/text.edff9ac3.svg";
  },
  f60d: function(t, e, n) {
    "use strict";
    var a = n("1c73"),
      i = n.n(a);
    i.a;
  },
  f919: function(t, e, n) {
    t.exports = n.p + "img/search.e990092e.svg";
  },
  fafe: function(t, e, n) {},
  fb04: function(t, e, n) {
    t.exports = n.p + "img/layer.a6f973ff.svg";
  },
  fcd6: function(t, e, n) {
    t.exports = n.p + "img/circle.ca606f64.svg";
  },
  fd79: function(t, e, n) {
    t.exports = n.p + "img/square.0fe06184.svg";
  },
  fe1b: function(t, e, n) {},
  fefb: function(t, e, n) {},
  ff9f: function(t, e, n) {},
});
//# sourceMappingURL=app.3a6ca340.js.map
