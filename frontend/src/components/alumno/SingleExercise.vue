<template>
  <tr>
    <th scope="row">{{index + 1}}</th>
    <td>{{ejercicio.DESCRIPCION}}</td>
    <td>{{ejercicio.SERIES}}</td>
    <td>{{ejercicio.REPETICIONES}}</td>
    <td class="link-ejercicio" @click="buscarEjercicio()">
      (click)
    </td>
  </tr>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SingleExercise',
  data(){
    return {
       apiKey: "AIzaSyBodY7OXwHTF18DiA1ISSPBu_ieqZJs6XU",
       link: ""
    }
  },
  props:{
    ejercicio: undefined,
    index: Number
  },
  methods:{
    buscarEjercicio(){
      axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.ejercicio.DESCRIPCION}&type=video&key=${this.apiKey}`)
      .then(async response => {    
          if (response.data.items.length > 0) {
              const videoId = response.data.items[0].id.videoId;
              this.link = `https://www.youtube.com/watch?v=${videoId}`;
              window.open(this.link, '_blank')
          }
      })
      .catch(error => {
          console.error('Error al buscar el video:', error);
      });
    },
  }
}

</script>

<style>
.link-ejercicio{
  cursor: pointer;
  transition: 0.2s;
}

.link-ejercicio: hover{
  text-decoration: underline;
}
</style>