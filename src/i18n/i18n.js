import i18n from "i18next";
import { Platform } from "react-native";
import { reactI18nextModule } from "react-i18next";

// Language Folders
import en from "./en";
import fr from "./fr";

/**
 * @todo Android/iOS/WindowsPhone language detection
 * @body Need to find a way to detect language on mobile devices to make the translation system working everywhere.
 */
let defaultLanguage = "en";
if (Platform.OS === "web") {
  // Won't work on the real web.
  defaultLanguage = navigator.language.substr(0, 2);
} else if (Platform.OS === "android") {
  const { NativeModules } = require("react-native");
  defaultLanguage = NativeModules.I18nManager.localeIdentifier.substr(0, 2);
} else if (Platform.OS === "ios") {
  const { NativeModules } = require("react-native");
  defaultLanguage = NativeModules.SettingsManager.settings.AppleLocale.substr(
    0,
    2
  );
}

const isDev = require("electron-is-dev");
const moment = require("moment");

i18n.use(reactI18nextModule).init({
  lng: defaultLanguage,
  fallbackLng: "en",
  debug: isDev,
  defaultNS: "login",
  resources: {
    en,
    fr
  },
  interpolation: {
    function(value, format, lng) {
      if (value instanceof Date) return moment(value).format(format);
      return value;
    }
  },
  react: {
    wait: false,
    bindI18n: false,
    bindStore: false,
    nsMode: false
  }
});

i18n.on("languageChanged", currentLang => {
  moment.locale(currentLang);
});

export default i18n;
