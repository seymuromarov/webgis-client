<template>
  <div class="" :style="styles">
    <v-select
      label="label"
      v-model="lang"
      class="language__select"
      :options="languages"
      :searchable="false"
      :clearable="false"
      auto
    />
  </div>
</template>

<script>
import { getLanguage, getLanguageLabels } from "@/lang/index";
export default {
  name: "LanguageSelect",
  props: {
    className: {
      type: String,
    },
    styles: {
      type: Object,
    },
  },

  computed: {
    languages() {
      var keys = Object.keys(this.$i18n.messages);
      var options = keys.map((c) => {
        return {
          code: c,
          label: c,
        };
      });
      return options;
    },
    lang: {
      get() {
        var lang = this.$store.getters.language;
        return lang;
      },
      set(lang) {
        this.$i18n.locale = lang.code;
        this.$store.dispatch("saveLanguage", lang.code);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .language__select {
  border-radius: 0.625rem;
  background-color: var(--primary-color);
  width: 100%;
  color: white;
  .vs__selected {
    color: white;
  }
  .vs__search::placeholder,
  .vs__dropdown-toggle,
  .vs__dropdown-menu {
    background-color: var(--primary-color);
    color: white;
    min-width: 6.25rem;
  }
  .vs__selected,
  .vs__dropdown-option {
    color: white;
  }
  .vs__clear,
  .vs__open-indicator {
    fill: var(--primary-color-lighten-200);
  }
}
</style>
