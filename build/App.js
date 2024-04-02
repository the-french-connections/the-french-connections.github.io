function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
import * as React from 'react';
import { Alert, AlertIcon, Button, ChakraProvider, Circle, Flex, HStack, Heading, ListItem, Modal, ModalBody, ModalContent, ModalCloseButton, ModalHeader, ModalOverlay, Stack, Text, UnorderedList } from '@chakra-ui/react';
import { useState } from 'react';
import useMethods from 'use-methods';
import { TODAY } from './constants.js';
var difficultyColor = function difficultyColor(difficulty) {
  return {
    1: '#fbd400',
    2: '#b5e352',
    3: '#729eeb',
    4: '#bc70c4'
  }[difficulty];
};
var chunk = function chunk(list, size) {
  var chunkCount = Math.ceil(list.length / size);
  return new Array(chunkCount).fill(null).map(function (_c, i) {
    return list.slice(i * size, i * size + size);
  });
};
var _shuffle = function shuffle(list) {
  return list.sort(function () {
    return Math.random() - 0.5;
  });
};
var methods = function methods(state) {
  return {
    toggleActive: function toggleActive(item) {
      state.oneAway = false;
      if (state.activeItems.includes(item)) {
        state.activeItems = state.activeItems.filter(function (i) {
          return i !== item;
        });
      } else if (state.activeItems.length < 4) {
        state.activeItems.push(item);
      }
    },
    shuffle: function shuffle() {
      _shuffle(state.items);
    },
    deselectAll: function deselectAll() {
      state.activeItems = [];
    },
    submit: function submit() {
      var foundGroup = state.incomplete.map(function (group) {
        return {
          group: group,
          matchingItems: group.items.filter(function (item) {
            return state.activeItems.includes(item);
          })
        };
      });
      var _iterator = _createForOfIteratorHelper(foundGroup),
        _step;
      try {
        var _loop = function _loop() {
            var next_group = _step.value;
            console.log(next_group);
            if (next_group.matchingItems.length === 4) {
              state.complete.push(next_group.group);
              var incomplete = state.incomplete.filter(function (group) {
                return group !== next_group.group;
              });
              state.incomplete = incomplete;
              state.items = incomplete.flatMap(function (group) {
                return group.items;
              });
              state.activeItems = [];
              return {
                v: void 0
              };
            } else {
              if (next_group.matchingItems.length === 3) {
                state.oneAway = true;
              }
            }
          },
          _ret;
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _ret = _loop();
          if (_ret) return _ret.v;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      state.mistakesRemaining -= 1;
      state.activeItems = [];
      if (state.mistakesRemaining === 0) {
        state.complete = state.complete.concat(state.incomplete);
        state.incomplete = [];
        state.items = [];
      }
    }
  };
};
var useGame = function useGame(options) {
  var initialState = {
    incomplete: options.groups,
    complete: [],
    items: _shuffle(options.groups.flatMap(function (g) {
      return g.items;
    })),
    activeItems: [],
    mistakesRemaining: 4,
    oneAway: false
  };
  var _useMethods = useMethods(methods, initialState),
    _useMethods2 = _slicedToArray(_useMethods, 2),
    state = _useMethods2[0],
    fns = _useMethods2[1];
  return _objectSpread(_objectSpread({}, state), fns);
};
export var App = function App() {
  var game = useGame({
    groups: TODAY
  });
  var _useState = useState(true),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    setIsOpen = _useState2[1];
  var handleClose = function handleClose() {
    return setIsOpen(false);
  };
  return /*#__PURE__*/React.createElement(ChakraProvider, null, /*#__PURE__*/React.createElement(Flex, {
    h: "100vh",
    w: "100vw",
    align: "center",
    justify: "center"
  }, /*#__PURE__*/React.createElement(Stack, {
    spacing: 4,
    align: "center"
  }, /*#__PURE__*/React.createElement(Heading, {
    size: "3xl",
    fontFamily: "Georgia",
    fontWeight: "light"
  }, "The French Connections"), /*#__PURE__*/React.createElement(Text, {
    fontWeight: "semibold"
  }, "Cr\xE9e 4 groupes de 4 mots !"), game.oneAway && /*#__PURE__*/React.createElement(Alert, {
    status: "info",
    variant: "left-accent"
  }, /*#__PURE__*/React.createElement(AlertIcon, null), "Presque..."), /*#__PURE__*/React.createElement(Modal, {
    isOpen: isOpen,
    onClose: handleClose
  }, /*#__PURE__*/React.createElement(ModalOverlay, null), /*#__PURE__*/React.createElement(ModalContent, null, /*#__PURE__*/React.createElement(ModalHeader, null, "R\xE8gles du jeu"), /*#__PURE__*/React.createElement(ModalCloseButton, null), /*#__PURE__*/React.createElement(ModalBody, null, /*#__PURE__*/React.createElement(Text, {
    fontWeight: "bold",
    mb: "1rem"
  }, "Trouve des groupes de 4 mots qui partagent quelque chose en commun !"), /*#__PURE__*/React.createElement(UnorderedList, null, /*#__PURE__*/React.createElement(ListItem, null, "S\xE9lectionne 4 mots puis appuie sur le bouton \"Valider\" pour v\xE9rifier si tu as raison."), /*#__PURE__*/React.createElement(ListItem, null, "Trouve les groupes en faisant moins de 4 erreurs."))))), /*#__PURE__*/React.createElement(Stack, null, game.complete.map(function (group) {
    return /*#__PURE__*/React.createElement(Stack, {
      spacing: 1,
      lineHeight: 1,
      rounded: "lg",
      align: "center",
      justify: "center",
      h: "80px",
      w: "624px",
      bg: difficultyColor(group.difficulty)
    }, /*#__PURE__*/React.createElement(Text, {
      fontSize: "xl",
      fontWeight: "extrabold",
      textTransform: "uppercase"
    }, group.category), /*#__PURE__*/React.createElement(Text, {
      fontSize: "xl",
      textTransform: "uppercase"
    }, group.items.join(', ')));
  }), chunk(game.items, 4).map(function (row) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(HStack, null, row.map(function (item) {
      return /*#__PURE__*/React.createElement(Button, {
        w: "150px",
        h: "80px",
        bg: "#efefe6",
        fontSize: "16px",
        fontWeight: "extrabold",
        textTransform: "uppercase",
        onClick: function onClick() {
          return game.toggleActive(item);
        },
        isActive: game.activeItems.includes(item),
        _active: {
          bg: '#5a594e',
          color: 'white'
        }
      }, item);
    })));
  })), /*#__PURE__*/React.createElement(HStack, {
    align: "baseline"
  }, /*#__PURE__*/React.createElement(Text, null, "Essais restants :"), _toConsumableArray(Array(game.mistakesRemaining).keys()).map(function () {
    return /*#__PURE__*/React.createElement(Circle, {
      bg: "gray.800",
      size: "12px"
    });
  })), /*#__PURE__*/React.createElement(HStack, null, /*#__PURE__*/React.createElement(Button, {
    colorScheme: "black",
    variant: "outline",
    rounded: "full",
    borderWidth: "2px",
    onClick: game.shuffle
  }, "M\xE9langer"), /*#__PURE__*/React.createElement(Button, {
    colorScheme: "black",
    variant: "outline",
    rounded: "full",
    borderWidth: "2px",
    onClick: game.deselectAll
  }, "D\xE9selectionner tout"), /*#__PURE__*/React.createElement(Button, {
    colorScheme: "black",
    variant: "outline",
    rounded: "full",
    borderWidth: "2px",
    isDisabled: game.activeItems.length !== 4,
    onClick: game.submit
  }, "Valider")))));
};