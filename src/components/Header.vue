<template>
    <header>
        <h1>Todos</h1>
    </header>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class Header extends Vue {}
</script>

<style lang="scss">
header {
    padding: Vars.$spacing-large;
    background: linear-gradient(to bottom, Colors.$blue, Colors.$purple);
    z-index: 2;
}
</style>
