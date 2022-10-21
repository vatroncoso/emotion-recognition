<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="12">
               <p class="display-1"> Tercera parte </p>
            </v-col>
            <v-col cols="12">
               Aparte de methods existen otros tipo de (no se como llamarlos) muy interesantes como el computed, que basicamente se calcula cada vez que hay un cambio en una variable, ejemplo:
            </v-col>
            <v-col cols="12">
               	<p>Mensaje original: "{{ message }}"</p>
  				<p>Mensaje en mayusculas: "{{ upperMessage }}"</p>
            </v-col>
            <v-col cols="12">
               En este caso la variable <i>message</i> es utilizada/modificada y retornada por el computed <i>upperMessage</i>
            </v-col>
			<v-col cols="12">
               computed tambien es usado para hacer filtros de arrays por ejemplo:
            </v-col>
			<v-col cols="12">
               	<p>Array original: "{{ arrayDelMal }}"</p>
  				<p>Array mayores que 5: "{{ arrayDelMalFiltrado }}"</p>
            </v-col>
			<v-col cols="12">
               Para demostrar la maravilla del computed se hara un metodo que agregue al array de arriba un numero random del 0 - 10 
            </v-col>
			<v-col cols="12">
				<v-btn depressed color="red" @click="agregarNumero">
					Agregar
				</v-btn>
            </v-col>
			-
            <v-col cols="12">
               Otro asd interesante es el watch, que lo que hace es llamar a la watch cada vez que una variable es modificada
            </v-col>
			<v-col cols="12">
                Escribe en el input y va en la consola
                <v-text-field
                    v-model="varibleInput"
                    label="Text field"
                ></v-text-field>
            </v-col>
			-
			<v-col cols="12">
               Por ultimo tenemos el filter, que lo que hace es modificar la variable con la que se encuentra es para propocitos mas generales que el computed y se usa principalmente para fines esteticos o de normalizacion (de fecha por ejemplo)
			   para usarse se tiene el {nombre de variable | nombre del filtro}
            </v-col>
			<v-col cols="12">
               {{message | upper}}
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  export default {
    name: 'ParteTres',

    data: () => ({
		message: "hola mundo",
		arrayDelMal: [1,2,3,4,5,6,7,8,9],
		varibleInput: ""
    }),

	methods: {
		agregarNumero () {
			this.arrayDelMal.push(Math.floor(Math.random() * 11))
		}
	},

	computed: {
		upperMessage () {
			return this.message.toUpperCase()
		},
		arrayDelMalFiltrado () {
			//No olvidar que esto funciona como una "nueva" varible no modifica nada de lo que se llama aca, en este caso arrayDelMal seguira tal cual
			return this.arrayDelMal.filter(e => {return e > 5})
		}
	},

	watch: {
		varibleInput (val) {
			console.log("call from watch:", val)
		}
	},

	filters: {
		upper (val) {
			return val.toUpperCase()
		}
	}
  }
</script>
