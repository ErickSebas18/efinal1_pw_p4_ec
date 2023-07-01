<template>
  <div class="contenedor">
    <div class="imagen">
      <img :src="imagenes[0]" alt="no se pudo cargar la imagen" />
      <h2>{{ nombres[0] }}</h2>
    </div>
    <div class="imagen">
      <img :src="imagenes[1]" alt="no se pudo cargar la imagen" />
      <h2>{{ nombres[1]}}</h2>
    </div>
    <div class="imagen">
      <img :src="imagenes[2]" alt="no se pudo cargar la imagen" />
      <h2>{{ nombres[2] }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imagenes: {
      type: Array,
      required: false,
    },
    nombres: {
      type: Array,
      required: false,
    },
  },
};
</script>

<style scoped>
.contenedor {
  display: flex;
  flex-direction: row;
  width: 750px;
  height: 350px;
  padding: 10px;
  gap: 20px;
}
.imagen {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  height: 100%;
}
img {
  border: solid red;
  border-radius: 10px;
  padding: 5px;
  width: 200px;
  height: 300px;
}
</style>
