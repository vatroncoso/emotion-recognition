<template>
	<v-container>

        <v-row>
            <v-col
            cols="12"
            md="3"
            >

<v-hover>
        <v-card
    class="mx-auto"
    color="#26c6da"
    dark
    max-width="400"
  >
    <v-card-title>
      <v-icon
        large
        left
      >
        mdi-twitter
      </v-icon>
      <span class="text-h6 font-weight-light">Twitter</span>
    </v-card-title>

    <v-card-text class="text-h5 font-weight-bold">
      "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Evan You</v-list-item-title>
        </v-list-item-content>

        <v-row
          align="center"
          justify="end"
        >
          <v-icon class="mr-1">
            mdi-heart
          </v-icon>
          <span class="subheading mr-2">256</span>
          <span class="mr-1">·</span>
          <v-icon class="mr-1">
            mdi-share-variant
          </v-icon>
          <span class="subheading">45</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</v-hover>

</v-col>

 <v-col
            cols="12"
            md="3"
            >

<v-hover>
        <v-card
          :elevation="hover ? 16 : 2"
          :class="{ 'on-hover': hover }"
          class="mx-auto"
          height="200"
          max-width="350"
        >
          <v-card-text class="font-weight-medium mt-12 text-center text-subtitle-1">
            Felicidad
          </v-card-text>
        </v-card>
</v-hover>

</v-col>

 <v-col
            cols="12"
            md="3"
            >

<v-hover>
        <v-card
          :elevation="hover ? 16 : 2"
          :class="{ 'on-hover': hover }"
          class="mx-auto"
          height="200"
          max-width="350"
        >
          <v-card-text class="font-weight-medium mt-12 text-center text-subtitle-1">
            Enojo
          </v-card-text>
        </v-card>
</v-hover>

</v-col>

 <v-col
            cols="12"
            md="3"
            >

<v-hover>
        <v-card
          :elevation="hover ? 16 : 2"
          :class="{ 'on-hover': hover }"
          class="mx-auto"
          height="200"
          max-width="350"
        >
          <v-card-text class="font-weight-medium mt-12 text-center text-subtitle-1">
            Disgusto
          </v-card-text>
        </v-card>
</v-hover>

</v-col>
        </v-row>


    
    <v-row>
    
     <v-col
     cols="12"      
    >

    <v-card
    class="mx-auto text-center"
    color="red"
    dark
    max-width="600"
  >
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="value"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item">
            {{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="text-h4 font-weight-thin">
        Alertas
      </div>
    </v-card-text>

    <v-divider></v-divider>

    
  </v-card>


    </v-col>
</v-row>

<v-row>
   <v-col
     cols="6"
      
    >

    <v-card
    class="mx-auto text-center"
    color="green"
    dark
    max-width="600"
  >
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="value"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item">
            {{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="text-h4 font-weight-thin">
        Felicidad
      </div>
    </v-card-text>

    <v-divider></v-divider>

    
  </v-card>


    </v-col>

       <v-col
     cols="6"
      
    >

    <v-card
    class="mx-auto text-center"
    color="green"
    dark
    max-width="600"
  >
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="value"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item">
            {{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="text-h4 font-weight-thin">
        Enojo
      </div>
    </v-card-text>

    <v-divider></v-divider>

    
  </v-card>


    </v-col>

  </v-row>
     
     <v-row>
		<v-col cols="=6">
    
             <v-card
    class="mx-auto text-center"
    color="green"
    dark
    max-width="600"
  >
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="value"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item">
            {{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="text-h4 font-weight-thin">
        Disgusto
      </div>
    </v-card-text>

    <v-divider></v-divider>

    
  </v-card>


 </v-col>
    <v-col cols="=6">
 <v-card
    class="mx-auto text-center"
    color="green"
    dark
    max-width="600"
  >
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="value"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item">
            {{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="text-h4 font-weight-thin">
        Neutro
      </div>
    </v-card-text>

    <v-divider></v-divider>

   
  </v-card>

    </v-col>
  </v-row>
   </v-container>
</template>


<script>
  export default {
    data: () => ({
      value: [
        423,
        446,
        675,
        510,
        590,
        610,
        760,
      ],
    }),
  }
</script>