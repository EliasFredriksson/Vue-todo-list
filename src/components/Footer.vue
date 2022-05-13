<template>
    <footer><p>Author: Elias Fredriksson</p></footer>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class Footer extends Vue {}
</script>

<style lang="scss">
footer {
    padding: Vars.$spacing-large;
    background: linear-gradient(to bottom, Colors.$blue, Colors.$purple);
    z-index: 2;
}
</style>
