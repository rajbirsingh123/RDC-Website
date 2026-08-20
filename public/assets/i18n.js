/* Royal Den Capital - lightweight client-side language switcher (EN / FR / PA)
   English is the original markup (no data needed for it). French and Punjabi
   text lives in assets/i18n-data.js as window.RDC_I18N = { fr: {...}, pa: {...} }.
   Elements opt in with data-i18n="key" (textContent) or data-i18n-html="key"
   (innerHTML, for text that contains inline tags like <span>). */
(function () {
  "use strict";

  var STORAGE_KEY = "rdc_lang";
  var DEFAULT_LANG = "en";
  var LANGS = {
    en: { label: "English", short: "EN" },
    fr: { label: "Français", short: "FR" },
    pa: { label: "ਪੰਜਾਬੀ", short: "PA" }
  };

  function getStoredLang() {
    try {
      var v = window.localStorage.getItem(STORAGE_KEY);
      return LANGS[v] ? v : DEFAULT_LANG;
    } catch (e) {
      return DEFAULT_LANG;
    }
  }

  function storeLang(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* ignore storage failures (private browsing etc.) */
    }
  }

  function dictFor(lang) {
    if (lang === DEFAULT_LANG) return null;
    return (window.RDC_I18N && window.RDC_I18N[lang]) || null;
  }

  function applyLang(lang) {
    var dict = dictFor(lang);

    // Plain text nodes
    var textEls = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < textEls.length; i++) {
      var el = textEls[i];
      if (!el.hasAttribute("data-i18n-orig")) {
        el.setAttribute("data-i18n-orig", el.textContent);
      }
      if (dict && dict[el.getAttribute("data-i18n")] != null) {
        el.textContent = dict[el.getAttribute("data-i18n")];
      } else {
        el.textContent = el.getAttribute("data-i18n-orig");
      }
    }

    // Inner-HTML nodes (contain inline markup such as <span>)
    var htmlEls = document.querySelectorAll("[data-i18n-html]");
    for (var j = 0; j < htmlEls.length; j++) {
      var elh = htmlEls[j];
      if (!elh.hasAttribute("data-i18n-orig-html")) {
        elh.setAttribute("data-i18n-orig-html", elh.innerHTML);
      }
      var key = elh.getAttribute("data-i18n-html");
      if (dict && dict[key] != null) {
        elh.innerHTML = dict[key];
      } else {
        elh.innerHTML = elh.getAttribute("data-i18n-orig-html");
      }
    }

    // Attributes: data-i18n-attr='{"placeholder":"key1","aria-label":"key2"}'
    var attrEls = document.querySelectorAll("[data-i18n-attr]");
    for (var k = 0; k < attrEls.length; k++) {
      var ela = attrEls[k];
      var map;
      try {
        map = JSON.parse(ela.getAttribute("data-i18n-attr"));
      } catch (e) {
        map = null;
      }
      if (!map) continue;
      for (var attrName in map) {
        if (!Object.prototype.hasOwnProperty.call(map, attrName)) continue;
        var origAttr = "data-i18n-orig-attr-" + attrName;
        if (!ela.hasAttribute(origAttr)) {
          ela.setAttribute(origAttr, ela.getAttribute(attrName) || "");
        }
        var attrKey = map[attrName];
        if (dict && dict[attrKey] != null) {
          ela.setAttribute(attrName, dict[attrKey]);
        } else {
          ela.setAttribute(attrName, ela.getAttribute(origAttr));
        }
      }
    }

    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll(".lang-switcher-current").forEach(function (el) {
      el.textContent = LANGS[lang].short;
    });
    document.querySelectorAll(".lang-option").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
    });
  }

  function setLang(lang) {
    if (!LANGS[lang]) lang = DEFAULT_LANG;
    storeLang(lang);
    applyLang(lang);
  }

  function wireSwitcher() {
    document.querySelectorAll(".lang-option").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang"));
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    wireSwitcher();
    applyLang(getStoredLang());
  });
})();
