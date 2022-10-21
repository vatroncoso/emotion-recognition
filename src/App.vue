<template>
	<v-app>
	<v-card>
    <v-tabs
      v-model="tab"
      background-color="#125C13"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab @click="view = 'part2'">
        Home
        <v-icon>
           
        right
        dark
      >
        mdi-home
      
        </v-icon>
      </v-tab>

      <v-tab @click="view = 'part1'">
        Historial
          <v-icon>
           
        right
        dark
      >
        mdi-chart-line
      
        </v-icon><v-icon></v-icon>
      </v-tab>

      
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="i in 3"
        :key="i"
        :value="'tab-' + i"
      >
        <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>



		<v-main>
			<ParteUno v-if="view == 'part1'"/>
			<ParteDos v-if="view == 'part2'" />
			<ParteTres v-if="view == 'part3'" />
		</v-main>
	</v-app>
</template>

<script>
import ParteUno from './components/ParteUno';
import ParteDos from './components/ParteDos';
import ParteTres from './components/ParteTres';

export default {
	name: 'App',

	components: {
		ParteUno,
		ParteDos,
		ParteTres,
	},

	data: () => ({
		view: 'part2',
    tab: null,
    text: "text"
	}),
};


</script>
