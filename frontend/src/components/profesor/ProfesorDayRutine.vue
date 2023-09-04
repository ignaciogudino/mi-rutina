<template>
  <!-- LUNES -->
  <div class="col-xl-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{dia}}</h5>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">EJERCICIO</th>
              <th scope="col">SERIES</th>
              <th scope="col">REPETICIONES</th>
              <th scope="col">-</th>
            </tr>
          </thead>
          <tbody>
            <SingleRutineExercise v-bind:key="item" v-for="item in rutinaDiaria" :ejercicio="item"></SingleRutineExercise>
         
            <!-- AGREGAR EJERCICIO -->
            <select class="form-control" name="servicios" v-model="ejercicio">
              <option value="" selected disabled hidden>SELECCIONAR</option>
              <optgroup label="Pecho">
                <option v-for="item in pecho" :key="item">{{item}}</option>
              </optgroup>
              <optgroup label="Hombros">
                <option v-for="item in hombros" :key="item">{{item}}</option>
              </optgroup>
              <optgroup label="Biceps">
                <option v-for="item in biceps" :key="item">{{item}}</option>
              </optgroup>
              <optgroup label="Triceps">
                <option v-for="item in triceps" :key="item">{{item}}</option>
              </optgroup>
               <optgroup label="Espalda">
                <option v-for="item in espalda" :key="item">{{item}}</option>
              </optgroup>
              <optgroup label="Piernas">
                <option v-for="item in piernas" :key="item">{{item}}</option>
              </optgroup>
            </select>
            
            <td class="col input-col">
              <input class="form-control" type="text" placeholder="Series" maxlength="2" minlength="1" v-model="series">
            </td>
            <td class="col input-col">
              <input class="form-control" type="text" placeholder="Repeticiones" maxlength="2" minlength="1" v-model="repeticiones">
            </td>
            <td class="col input-col add-user" @click="agregarEjercicio()"><strong>AGREGAR</strong></td>

         </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
import SingleRutineExercise from './SingleRutineExercise.vue'
import Swal from 'sweetalert2'

export default {
    name: 'UserInfo',
    data(){
      return{
        pecho: [
          "Press Plano",
          "Press Militar",
          "Press Declinado",
          "Fondos Paralelas",
          "Aperturas Inclinadas",
          "Pull-over con mancuerna",
          "Flexiones",
          "Pulldown en polea alta",
          "Flys en máquina"
        ],
        biceps: [
          "Curl de Biceps con Barra",
          "Curl de Biceps Inverso",
          "Curl martillo",
          "Curl de bíceps con mancuernas",
          "Curl 21s",
          "Curl con barra Z"
        ],
        triceps: [
          "Extension de Triceps",
          "Press de tríceps en polea alta",
          "Fondos en máquina para tríceps",
          "Tríceps en polea con cuerda",
          "Tríceps en polea invertido"
        ],
        hombros: [
          "Elevaciones Laterales",
          "Press militar con mancuernas",
          "Press Arnold",
          "Elevaciones frontales",
          "Press de hombros en máquina"
        ],
        piernas: [
          "Sentadillas",
          "Peso Muerto Rumano",
          "Zancadas",
          "Prensa a una Pierna",
          "Curl Femoral",
          "Gemelo en Prensa",
          "Gemelo Sentado",
          "Extensiones de cuádriceps en máquina",
          "Prensa de piernas",
          "Sentadillas búlgaras",
          "Hip Thrusts",
          "Curl de piernas acostado"
        ],
        espalda: [
          "Dominadas",
          "Remo con Mancuernas",
          "Jalon en Polea Alta",
          "Remo en Polea Baja",
          "Facepull",
          "Pulldown en polea baja",
          "Hiperextensiones",
          "Pulldown tras nuca",
          "Encogimientos de hombros con barra"
        ],
        ejercicio: '',
        series: '',
        repeticiones: '',
        rutinaDiaria: []
      }
    },
    components:{
      SingleRutineExercise
    },
    emits: ['agregarEjercicio'],
    props: {
      dia: undefined,
      index: Number
    },
    created(){
      console.log(this.rutinaDiaria)
    },
    methods:{
      agregarEjercicio(){
        if(!this.ejercicio || !this.series || !this.repeticiones){
          return Swal.fire('Error', 'Campo incompleto', 'error')
        }

        let element = {ejercicio: this.ejercicio, series: this.series, repeticiones: this.repeticiones, dia: this.index + 1 }
        console.log(element)
        this.rutinaDiaria.push(element)
        this.$emit('agregarEjercicio', element)
      }
    }
}

</script>

<style scoped>

.form-control{
  text-align:center;
  width: 80%;
  margin: 10px 0 0 20px
}

.add-user{
  display:flex;
  justify-content:center;
  align-items:center;
  margin-top:10px;
  cursor:pointer;
  transition:0.2s
}

.add-user:hover{
  text-decoration: underline
}
</style>