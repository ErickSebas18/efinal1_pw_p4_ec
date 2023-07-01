<template>
  <div v-if="!mostrar" class="contenedor-juego">
    <div class="texto">
      <div class="contenedor-puntaje">
        Puntaje: <span>{{ puntaje }}</span>
      </div>
      <div class="contenedor-intentos">
        Intentos: <span>{{ intentos }}</span>
      </div>
    </div>
    <PokemonImagen :imagenes="imagenes" :nombres="nombres" />
    <button class="jugar" v-on:click="mostrarImagen">JUGAR</button>
  </div>
  <div v-if="mostrar" class="contenedor-resultado">
    <div v-if="!ganar" class="contenedor-res1">
      <h1>Haz utilizado tus 5 intentos</h1>
      <h1>El juego ha terminado, inténtalo nuevamente</h1>
    </div>
    <div v-if="ganar" class="contenedor-res2">
      <h1>
        Puntaje: <span>{{ puntaje }}</span>
      </h1>
      <h1>Felicitaciones has ganado un premio de $10.000,00</h1>
    </div>
    <button class="nuevo-juego" v-on:click="reiniciar">NUEVO JUEGO</button>
  </div>
</template>

<script>
import PokemonImagen from "../components/PokemonImagen.vue";
import fachadaObtenerPokemon from "../helpers/PokemonApi";

export default {
  components: { PokemonImagen },
  data() {
    return {
      mostrar: false,
      ganar: false,
      puntaje: 0,
      intentos: 0,
      nombres: ["xxxxxxxx", "xxxxxxxx", "xxxxxxxx"],
      imagenes: [
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDw8PDw8VFRUVDxUPFRUPFRUPFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDisZFRkrKys3Ny0rKysrNysrNysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMIBAwMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQcC/8QAFhABAQEAAAAAAAAAAAAAAAAAAAER/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDERFAQAAAAAAACigioIqooAioqCoAoCKogCiKACAACACgqKg5FRQAABQQAAAABBQBQgKACCCoIogCgCgAACgAiACgoIICKAAKmCgigKigCGKgKAgAACKAACCoIogqqAgACACgCooIoIAqIKIIAooCKiooCKgAAKIoAACoAqACCoIAAAAKigAAKgAAKAAgqKgAKAIAAAqAAAoigAAAAVKoCAKEFEQABFBQBUVA0AAAAUQBAVAAAFQAAAABBUBVAAEUAAAAAAAAAFBAADAAAARcFEFRAAAAAAAAEAAFQFUAAIAIoACAqoAAoIAqACKAAAAgoCACAAoAIAAAKACCiAqgAAAAAAAoiggCgAAqQQAFUwBEQVAABAAABQAQAAAFFEVFAAAAAAAAAVQRUQFQBagUABQRUQAFQAAAQAAABQAQVAVUUAAAAAVFBFEUUEQAAAAAAQBUAAAAAAAEAAUFRQARFEUUAAVFBFAEAUAAAAAEQQFAAAAABAAUAEBUUUAAAAAAABQAFQAAUQAAAQqRQEhQAUARYAJQAWEAABAAFIAotQEBYAJVACigEAUf/2Q==",
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDw8PDw8VFRUVDxUPFRUPFRUPFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDisZFRkrKys3Ny0rKysrNysrNysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMIBAwMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQcC/8QAFhABAQEAAAAAAAAAAAAAAAAAAAER/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDERFAQAAAAAAACigioIqooAioqCoAoCKogCiKACAACACgqKg5FRQAABQQAAAABBQBQgKACCCoIogCgCgAACgAiACgoIICKAAKmCgigKigCGKgKAgAACKAACCoIogqqAgACACgCooIoIAqIKIIAooCKiooCKgAAKIoAACoAqACCoIAAAAKigAAKgAAKAAgqKgAKAIAAAqAAAoigAAAAVKoCAKEFEQABFBQBUVA0AAAAUQBAVAAAFQAAAABBUBVAAEUAAAAAAAAAFBAADAAAARcFEFRAAAAAAAAEAAFQFUAAIAIoACAqoAAoIAqACKAAAAgoCACAAoAIAAAKACCiAqgAAAAAAAoiggCgAAqQQAFUwBEQVAABAAABQAQAAAFFEVFAAAAAAAAAVQRUQFQBagUABQRUQAFQAAAQAAABQAQVAVUUAAAAAVFBFEUUEQAAAAAAQBUAAAAAAAEAAUFRQARFEUUAAVFBFAEAUAAAAAEQQFAAAAABAAUAEBUUUAAAAAAABQAFQAAUQAAAQqRQEhQAUARYAJQAWEAABAAFIAotQEBYAJVACigEAUf/2Q==",
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDw8PDw8VFRUVDxUPFRUPFRUPFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDisZFRkrKys3Ny0rKysrNysrNysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMIBAwMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQcC/8QAFhABAQEAAAAAAAAAAAAAAAAAAAER/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDERFAQAAAAAAACigioIqooAioqCoAoCKogCiKACAACACgqKg5FRQAABQQAAAABBQBQgKACCCoIogCgCgAACgAiACgoIICKAAKmCgigKigCGKgKAgAACKAACCoIogqqAgACACgCooIoIAqIKIIAooCKiooCKgAAKIoAACoAqACCoIAAAAKigAAKgAAKAAgqKgAKAIAAAqAAAoigAAAAVKoCAKEFEQABFBQBUVA0AAAAUQBAVAAAFQAAAABBUBVAAEUAAAAAAAAAFBAADAAAARcFEFRAAAAAAAAEAAFQFUAAIAIoACAqoAAoIAqACKAAAAgoCACAAoAIAAAKACCiAqgAAAAAAAoiggCgAAqQQAFUwBEQVAABAAABQAQAAAFFEVFAAAAAAAAAVQRUQFQBagUABQRUQAFQAAAQAAABQAQVAVUUAAAAAVFBFEUUEQAAAAAAQBUAAAAAAAEAAUFRQARFEUUAAVFBFAEAUAAAAAEQQFAAAAABAAUAEBUUUAAAAAAABQAFQAAUQAAAQqRQEhQAUARYAJQAWEAABAAFIAotQEBYAJVACigEAUf/2Q==",
      ],
    };
  },
  methods: {
    async mostrarImagen() {
      const pokemones = await fachadaObtenerPokemon();
      this.nombres[0] = pokemones[0].name;
      this.nombres[1] = pokemones[1].name;
      this.nombres[2] = pokemones[2].name;

      this.imagenes[0] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemones[0].id}.svg`;
      this.imagenes[1] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemones[1].id}.svg`;
      this.imagenes[2] = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemones[2].id}.svg`;

      this.jugabilidad(pokemones[0].id, pokemones[1].id, pokemones[2].id);
      this.ganador();
    },
    jugabilidad(id1, id2, id3) {
      if (id1 == id2 && id2 == id3) {
        this.puntaje += 5;
      }
      if (id1 == id2 || id2 == id3 || id1 == id3) {
        this.puntaje += 2;
      }
      this.intentos++;
    },
    ganador() {
      if (this.intentos < 5) {
        if (this.puntaje >= 10) {
          this.mostrar = true;
          this.ganar = true;
        }
      } else {
        this.mostrar = true;
        this.ganar = false;
      }
    },
    reiniciar() {
      this.mostrar = false;
      this.ganar = false;
      this.puntaje = 0;
      this.intentos = 0;
      this.nombres = ["xxxxxxxx", "xxxxxxxx", "xxxxxxxx"];
      this.imagenes = [
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDw8PDw8VFRUVDxUPFRUPFRUPFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDisZFRkrKys3Ny0rKysrNysrNysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMIBAwMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQcC/8QAFhABAQEAAAAAAAAAAAAAAAAAAAER/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDERFAQAAAAAAACigioIqooAioqCoAoCKogCiKACAACACgqKg5FRQAABQQAAAABBQBQgKACCCoIogCgCgAACgAiACgoIICKAAKmCgigKigCGKgKAgAACKAACCoIogqqAgACACgCooIoIAqIKIIAooCKiooCKgAAKIoAACoAqACCoIAAAAKigAAKgAAKAAgqKgAKAIAAAqAAAoigAAAAVKoCAKEFEQABFBQBUVA0AAAAUQBAVAAAFQAAAABBUBVAAEUAAAAAAAAAFBAADAAAARcFEFRAAAAAAAAEAAFQFUAAIAIoACAqoAAoIAqACKAAAAgoCACAAoAIAAAKACCiAqgAAAAAAAoiggCgAAqQQAFUwBEQVAABAAABQAQAAAFFEVFAAAAAAAAAVQRUQFQBagUABQRUQAFQAAAQAAABQAQVAVUUAAAAAVFBFEUUEQAAAAAAQBUAAAAAAAEAAUFRQARFEUUAAVFBFAEAUAAAAAEQQFAAAAABAAUAEBUUUAAAAAAABQAFQAAUQAAAQqRQEhQAUARYAJQAWEAABAAFIAotQEBYAJVACigEAUf/2Q==",
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDw8PDw8VFRUVDxUPFRUPFRUPFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDisZFRkrKys3Ny0rKysrNysrNysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMIBAwMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQcC/8QAFhABAQEAAAAAAAAAAAAAAAAAAAER/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDERFAQAAAAAAACigioIqooAioqCoAoCKogCiKACAACACgqKg5FRQAABQQAAAABBQBQgKACCCoIogCgCgAACgAiACgoIICKAAKmCgigKigCGKgKAgAACKAACCoIogqqAgACACgCooIoIAqIKIIAooCKiooCKgAAKIoAACoAqACCoIAAAAKigAAKgAAKAAgqKgAKAIAAAqAAAoigAAAAVKoCAKEFEQABFBQBUVA0AAAAUQBAVAAAFQAAAABBUBVAAEUAAAAAAAAAFBAADAAAARcFEFRAAAAAAAAEAAFQFUAAIAIoACAqoAAoIAqACKAAAAgoCACAAoAIAAAKACCiAqgAAAAAAAoiggCgAAqQQAFUwBEQVAABAAABQAQAAAFFEVFAAAAAAAAAVQRUQFQBagUABQRUQAFQAAAQAAABQAQVAVUUAAAAAVFBFEUUEQAAAAAAQBUAAAAAAAEAAUFRQARFEUUAAVFBFAEAUAAAAAEQQFAAAAABAAUAEBUUUAAAAAAABQAFQAAUQAAAQqRQEhQAUARYAJQAWEAABAAFIAotQEBYAJVACigEAUf/2Q==",
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDw8PDw8VFRUVDxUPFRUPFRUPFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDisZFRkrKys3Ny0rKysrNysrNysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMIBAwMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQcC/8QAFhABAQEAAAAAAAAAAAAAAAAAAAER/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDERFAQAAAAAAACigioIqooAioqCoAoCKogCiKACAACACgqKg5FRQAABQQAAAABBQBQgKACCCoIogCgCgAACgAiACgoIICKAAKmCgigKigCGKgKAgAACKAACCoIogqqAgACACgCooIoIAqIKIIAooCKiooCKgAAKIoAACoAqACCoIAAAAKigAAKgAAKAAgqKgAKAIAAAqAAAoigAAAAVKoCAKEFEQABFBQBUVA0AAAAUQBAVAAAFQAAAABBUBVAAEUAAAAAAAAAFBAADAAAARcFEFRAAAAAAAAEAAFQFUAAIAIoACAqoAAoIAqACKAAAAgoCACAAoAIAAAKACCiAqgAAAAAAAoiggCgAAqQQAFUwBEQVAABAAABQAQAAAFFEVFAAAAAAAAAVQRUQFQBagUABQRUQAFQAAAQAAABQAQVAVUUAAAAAVFBFEUUEQAAAAAAQBUAAAAAAAEAAUFRQARFEUUAAVFBFAEAUAAAAAEQQFAAAAABAAUAEBUUUAAAAAAABQAFQAAUQAAAQqRQEhQAUARYAJQAWEAABAAFIAotQEBYAJVACigEAUf/2Q==",
      ];
    },
  },
};
</script>

<style scoped>
.contenedor-juego,
.contenedor-resultado {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.contenedor-juego {
  border: solid black;
  width: 800px;
  padding: 10px;
}
.texto {
  display: flex;
  gap: 40px;
  font-size: 25px;
  margin: 5px;
}

button {
  width: 150px;
  height: 30px;
}
.jugar,
.nuevo-juego {
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}

.jugar:hover,
.nuevo-juego:hover {
  background-color: #fa2b2b;
  color: white;
}

.contenedor-res1,
.contenedor-res2 {
  border: solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  color: red;
}

.contenedor-res2 {
  color: blue;
}
</style>
