<template>
<PokemonPage></PokemonPage>
</template>

<script>
import PokemonPage from './modules/pokemon/page/PokemonPage.vue';

export default {
  name: 'App',
  components: {
    PokemonPage,
  }
}
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
