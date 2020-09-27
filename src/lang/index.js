import Vue from "vue";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);

let messages = {};
let languageLabels = [];
export function getLanguage() {
  const chooseLanguage = localStorage.getItem("language");
  if (chooseLanguage) return chooseLanguage;

  // if has not choose language
  const language = (
    navigator.language || navigator.browserLanguage
  ).toLowerCase();
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }
  // axios.defaults.headers.common["Accept-Language"] = lang;
  return "az-AZ";
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: getLanguage(),
  // set locale messages
  messages,
});
export function getRemoteMessages() {}

export function getLanguageLabels() {
  return languageLabels;
}
// mergeRemoteMessages();

export default i18n;
