<template>
    <!-- <div class="loader">
        <i class="fas fa-crosshairs fa-spin"></i>
    </div>-->
    <div class="loader">
        <img src="@/assets/loading.svg" alt />
    </div>
</template>

<script>
export default {
    name: "Loader"
};
</script>

<style lang="scss">
.loader {
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;

    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    position: absolute;
    img {
        width: 60px;
    }
}
</style>