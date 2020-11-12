<template>
    <label class="toggle-switch">
        <input type="checkbox" @change="onChange" :checked="value" />
        <span class="slider"></span>
    </label>
</template>

<script>
    export default {
        name: "ToggleSwitch",
        props: {
            value: {
                type: Boolean,
            },
        },
        methods: {
            onChange(e) {
                this.$emit("input", e);
            },
        },
    };
</script>

<style lang="scss">
    .toggle-switch {
        margin: 0;
        position: relative;
        display: inline-block;
        width: 2.4rem;
        height: 1.2rem;
        border: 0.2rem solid #fff;
        border-radius: 1.2rem;
        input

    {
        opacity: 0;
        width: 0;
        height: 0;
        &:checked + .slider

    {
        background-color: #7aff6f;
    }

    &:focus + .slider {
        box-shadow: 0 0 0.1rem #7aff6f;
    }

    &:checked + .slider:before {
        transform: translateX(1.2rem);
    }

    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 1.2rem;
        background-color: var(--primary-color-lighten-100);
        -webkit-transition: 0.4s;
        transition: 0.4s;
        &:before

    {
        position: absolute;
        content: "";
        height: 1rem;
        width: 1rem;
        left: -0.1rem;
        bottom: -0.1rem;
        border-radius: 50%;
        background-color: white;
        box-shadow: 0 0 0.2rem #333;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    }
    }
    // watch?v=7k07j7LcLqw
</style>
