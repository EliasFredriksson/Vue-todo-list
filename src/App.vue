<template>
    <body>
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
    </body>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import Footer from "./components/Footer.vue";

@Options({
    components: {
        Header,
        Main,
        Footer,
    },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
}

*::after,
*::before,
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

html,
body {
    padding: 0;
    margin: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
