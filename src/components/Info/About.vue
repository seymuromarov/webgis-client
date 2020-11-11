<template>
  <div class="about">
    <h3>{{ $t("menu.information.about.whatIsWebgis") }}</h3>
    <p>
      {{ $t("menu.information.about.whatIsWebgisContent") }}
    </p>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style>
.about {
  font-size: 2rem;
  margin: 1.6rem 3.2rem;
}

h3 {
  margin-bottom: 3.2rem;
}
</style>
