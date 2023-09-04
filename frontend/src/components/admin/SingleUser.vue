<template>
  <tr>
    <th scope="row">{{index + 1}}</th>
    <td>{{user.DNI}}</td>
    <td>{{user.NOMBRE}}</td>
    <td>{{user.APELLIDO}}</td>
    <td>{{user.ID_ROL == 0 ? 'ADMINISTRADOR' : user.ID_ROL == 1 ? "ALUMNO" : "PROFESOR"}}</td>
    <td :class="{textvencido: vencido}">{{user.ID_ROL == 0 ? '-' : user.ID_ROL == 1 ? vencimiento : "-"}}</td>
    <td @click="renewMembership(event)" class="trash-icon"><i class="fa fa-retweet" aria-hidden="true"></i></td>
    <td @click="deleteUser(event)" class="trash-icon"><i class="fa fa-trash" aria-hidden="true"></i></td>
  </tr>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: 'SingleUser',
  props:{
    user: undefined,
    index: Number
  },
  emits: ["refresh"],
  methods: {
    deleteUser(){
      Swal.fire({
                title: `Está seguro que desea eliminar al usuario: ${this.user.NOMBRE} ${this.user.APELLIDO}`,
                text: "Esta acción no podrá deshacerse",
                icon: "warning",
                showCloseButton: true,
                confirmButtonColor: "#FF0000",
                confirmButtonText: `ELIMINAR`,
                preConfirm: async () => {
                    Swal.showLoading()
                    axios.delete(process.env.VUE_APP_API_URL + "/deleteUser/" + this.user.ID_USER)
                    .then(() => {
                      Swal.fire('Exito!','Usuario Eliminado', 'success').then(()=> this.$emit("refresh"))
                    })
                    .catch(() => console.log)
                },
            })
    },
    async renewMembership(){
        axios.put(process.env.VUE_APP_API_URL + '/membership/' + this.user.ID_USER, null)
        .then(resp => {
            let user = JSON.parse(localStorage.getItem("user"));
            user.VENCIMIENTO = resp.data[0].VENCIMIENTO; 
            localStorage.setItem("user", JSON.stringify(user));
            this.fecha = resp.data[0].VENCIMIENTO.split('T')[0]
            Swal.fire('Exito','La cuota fue pagada exitosamente','success').then(()=> this.$emit("refresh"))
        })
        .catch(err=> console.log(err))
      }
  },
  computed:{
    vencido: function (){
      return new Date(this.user.VENCIMIENTO) < new Date() && this.user.ID_ROL == 1
    },
    vencimiento: function (){
      return this.user.VENCIMIENTO.split('T')[0]
    }
  }
}

</script>

<style>
.textvencido{
  color:red
}
.trash-icon{
  cursor:pointer;
  transition:0.2s;
}
.trash-icon:hover{
  transform: scale(1.3)
}
</style>