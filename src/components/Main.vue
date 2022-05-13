<template>
    <main>
        <TodoHandlerComponent />
    </main>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import TodoHandlerComponent from "./TodoHandler.vue";

@Options({
    components: {
        TodoHandlerComponent,
    },
})
export default class Main extends Vue {}
</script>

<style lang="scss">
main {
    flex-grow: 1;
    background: linear-gradient(
        to bottom,
        Colors.$purple-dark,
        Colors.$blue-dark
    );

    display: flex;
    flex-direction: column;
}
</style>
