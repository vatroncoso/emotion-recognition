<template>
	<v-container>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="6"
      >
        <p   style="color:#424242" class="display-1" v-if="this.modeView === 'daily'"><font size="5">
          Vista Diaria: {{ dateDay | dateDayFormat}}
          </font>
        </p>
        <p style="color:#424242" class="display-1" v-else><font size="5">
          Vista Mensual: {{ dateMonth | dateMonthFormat}}
               </font>
        </p>
      </v-col>
      
      <v-spacer></v-spacer>
      
      <v-col
        cols="12"
        sm="4"
        md="2"
      >
        <v-dialog
          ref="dialoga"
          v-model="modalDay"
          :return-value.sync="dateDay"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              color="#4CAF50
"
              dark
            >
              Seleccionar dia
            </v-btn>
          </template>
          <v-date-picker
            v-model="dateDay"
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="#368B85"
              @click="modalDay = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.dialoga.save(dateDay)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>
      <v-col
        cols="12"
        sm="4"
        md="2"
      >
        <v-dialog
          ref="dialogb"
          v-model="modalMonth"
          :return-value.sync="dateMonth"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="#4CAF50"
              v-bind="attrs"
              v-on="on"
              dark
            >
              Seleccionar mes
            </v-btn>
          </template>
          <v-date-picker
            v-model="dateMonth"
            type="month"
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="#368B85"
              @click="modalMonth = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="#368B85"
              @click="$refs.dialogb.save(dateMonth)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="2"
      >
        <v-card
          class="mx-auto"
          color="#FBC02D"
          dark
          max-width="400"
        >
          <v-card-title>
            <v-icon
              large
              left
            >
              mdi-sticker-plus
            </v-icon>
            <span class="text-h6 font-weight-light">Total</span>
          </v-card-title>

          <v-card-text class="text-h2 font-weight-bold text-center">
            {{totalEmotions}}
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="2"
      >

        <v-card
          class="mx-auto"
          color="#FBC02D"
          dark
          max-width="400"
        >
          <v-card-title>
            <v-icon
              large
              left
            >
              mdi-alarm-light
            </v-icon>
            <span class="text-h6 font-weight-light">Alarmas</span>
          </v-card-title>

          <v-card-text class="text-h2 font-weight-bold text-center">
            {{alarmEmotions.length}}
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="2"
      >

        <v-card
          class="mx-auto"
          color="#FBC02D"
          dark
          max-width="400"
        >
          <v-card-title>
            <v-icon
              large
              left
            >
              mdi-emoticon
            </v-icon>
            <span class="text-h6 font-weight-light">Felicidad</span>
          </v-card-title>

          <v-card-text class="text-h2 font-weight-bold text-center">
            {{happyEmotions.length}}
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="2"
      >

        <v-card
          class="mx-auto"
          color="#FBC02D"
          dark
          max-width="400"
        >
          <v-card-title>
            <v-icon
              large
              left
            >
              mdi-emoticon-angry
            </v-icon>
            <span class="text-h6 font-weight-light">Enojo</span>
          </v-card-title>

          <v-card-text class="text-h2 font-weight-bold text-center">
            {{angryEmotions.length}}
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="2"
      >

        <v-card
          class="mx-auto"
          color="#FBC02D"
          dark
          max-width="400"
        >
          <v-card-title>
            <v-icon
              large
              left
            >
              mdi-emoticon-frown
            </v-icon>
            <span class="text-h6 font-weight-light">Miedo</span>
          </v-card-title>

          <v-card-text class="text-h2 font-weight-bold text-center">
            {{disgustedEmotions.length}}
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="2"
      >

        <v-card
          class="mx-auto"
          color="#FBC02D"
          dark
          max-width="400"
        >
          <v-card-title>
            <v-icon
              large
              left
            >
              mdi-emoticon-neutral
            </v-icon>
            <span class="text-h6 font-weight-light">Neutro</span>
          </v-card-title>

          <v-card-text class="text-h2 font-weight-bold text-center">
            {{neutralEmotions.length}}
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>

    <v-row>
      <v-col
        cols="12"
      >
        <v-card
          class="mx-auto text-center"
          color="#B4B897"
          dark
          max-width="600"
        >
          <v-card-text>
            <v-sheet color="rgba(0, 0, 0, .12)">
              <v-sparkline
                :labels="labels"
                :value="alarmCharts"
                color="rgba(255, 255, 255, .7)"
                height="100"
                padding="24"
                stroke-linecap="round"
                smooth
              ></v-sparkline>
            </v-sheet>
          </v-card-text>

          <v-card-text>
            <div class="text-h4 font-weight-thin">
              Alarmas
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
          color="#B4B897"
          dark
          max-width="600"
        >
          <v-card-text>
            <v-sheet color="rgba(0, 0, 0, .12)">
              <v-sparkline
                :labels="labels"
                :value="happyCharts"
                color="rgba(255, 255, 255, .7)"
                height="100"
                padding="24"
                stroke-linecap="round"
                smooth
              ></v-sparkline>
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
          color="#B4B897"
          dark
          max-width="600"
        >
          <v-card-text>
            <v-sheet color="rgba(0, 0, 0, .12)">
              <v-sparkline
                :labels="labels"
                :value="angryCharts"
                color="rgba(255, 255, 255, .7)"
                height="100"
                padding="24"
                stroke-linecap="round"
                smooth
              ></v-sparkline>
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
      <v-col
        cols="6"
      >
        <v-card
          class="mx-auto text-center"
          color="#B4B897"
          dark
          max-width="600"
        >
          <v-card-text>
            <v-sheet color="rgba(0, 0, 0, .12)">
              <v-sparkline
                :labels="labels"
                :value="disgustedCharts"
                color="rgba(255, 255, 255, .7)"
                height="100"
                padding="24"
                stroke-linecap="round"
                smooth
              ></v-sparkline>
            </v-sheet>
          </v-card-text>

          <v-card-text>
            <div class="text-h4 font-weight-thin">
              Miedo
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
          color="#B4B897"
          dark
          max-width="600"
        >
          <v-card-text>
            <v-sheet color="rgba(0, 0, 0, .12)">
              <v-sparkline
                :labels="labels"
                :value="neutralCharts"
                color="rgba(255, 255, 255, .7)"
                height="100"
                padding="24"
                stroke-linecap="round"
                smooth
              ></v-sparkline>
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
  import moment from 'moment'
  
  export default {
    data: () => ({
      dateDay: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateMonth: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      modalMonth: false,
      modalDay: false,
      modeView: 'daily',
      selectDate: null,
      labels: [
        '8am',
        '9am',
        '10am',
        '11am',
        '12pm',
        '1pm',
        '2pm',
        '3pm',
        '4pm',
        '5pm',
        '6pm',
        '7pm',
        '8pm',
        '9pm',
        '10pm',
        '11pm',
        '12pm',
      ],
      alarmCharts: {},
      angryCharts: {},
      happyCharts: {},
      disgustedCharts: {},
      neutralCharts: {},
      emotions: [],
    }),

    methods: {
      makeAlarmCharts () {
        let data = new Array(12).fill(0)

        this.alarmEmotions.forEach (entry => {
          const ts = moment(entry.ts).format("ha")
          const index = +moment(entry.ts).format("HH") - 8

          if (index < 0 || index > data.length)
            return

          data[index] = ++data[index]
        })

        return data
      },

      makeAngryCharts () {
        let data = new Array(12).fill(0)

        this.angryEmotions.forEach (entry => {
          const ts = moment(entry.ts).format("ha")
          const index = +moment(entry.ts).format("HH") - 8

          if (index < 0 || index > data.length)
            return
          
          data[index] = ++data[index]
        })

        return data
      },

      makeHappyCharts () {
        let data = new Array(12).fill(0)

        this.happyEmotions.forEach (entry => {
          const ts = moment(entry.ts).format("ha")
          const index = +moment(entry.ts).format("HH") - 8

          if (index < 0 || index > data.length)
            return

          data[index] = ++data[index]
        })

        return data
      },

      makeDisgustedCharts () {
        let data = new Array(12).fill(0)

        this.disgustedEmotions.forEach (entry => {
          const ts = moment(entry.ts).format("ha")
          const index = +moment(entry.ts).format("HH") - 8

          if (index < 0 || index > data.length)
            return

          data[index] = ++data[index]
        })

        return data
      },

      makeNeutralCharts () {
        let data = new Array(12).fill(0)

        this.neutralEmotions.forEach (entry => {
          const ts = moment(entry.ts).format("ha")
          const index = +moment(entry.ts).format("HH") - 8

          if (index < 0 || index > data.length)
            return

          data[index] = ++data[index]
        })

        return data
      },

    },

    computed: {
      filterDateEmotions () {
        let filter = this.modeView === 'daily' ? 'day' : 'month'
        let filterDay = this.modeView === 'daily' ? this.dateDay : this.dateMonth

        return this.emotions.filter(e => moment(e.ts).isSame(filterDay, filter))
      },

      totalEmotions () {
        return this.filterDateEmotions.length
      },

      angryEmotions () {
        return this.filterDateEmotions.filter (e => e.emotion == "angry")
      },

      happyEmotions () {
        return this.filterDateEmotions.filter (e => e.emotion == "happy")
      },

      disgustedEmotions () {
        return this.filterDateEmotions.filter (e => e.emotion == "fear")
      },

      neutralEmotions () {
        return this.filterDateEmotions.filter (e => e.emotion == "neutral")
      },

      alarmEmotions () {
        return this.filterDateEmotions.filter (e => e.emotion == "angry" || e.emotion == "disgusted")
      },

    },

    watch: {
      dateDay (val) {
        console.log("🚀 ~ file: ParteUno.vue ~ line 518 ~ dateDay ~ val", val)
        this.modeView = 'daily'

        this.alarmCharts = this.makeAlarmCharts()
        this.angryCharts = this.makeAngryCharts()
        this.happyCharts = this.makeHappyCharts()
        this.disgustedCharts = this.makeDisgustedCharts()
        this.neutralCharts = this.makeNeutralCharts()
      },
      dateMonth (val) {
        console.log("🚀 ~ file: ParteUno.vue ~ line 579 ~ dateMonth ~ val", val)
        this.modeView = 'monthly'
        this.alarmCharts = this.makeAlarmCharts()
        this.angryCharts = this.makeAngryCharts()
        this.happyCharts = this.makeHappyCharts()
        this.disgustedCharts = this.makeDisgustedCharts()
        this.neutralCharts = this.makeNeutralCharts()
      }
    },

    filters: {
      dateDayFormat (val) {
        return moment(val).format('LL')
      },
      dateMonthFormat (val) {
        return moment(val).format('MMMM YYYY')
      }
    },

    created () {
      moment.locale('es-cl')

      let storage = localStorage.getItem('record')

      if (storage != null) {
        this.emotions = JSON.parse(storage)
      }

      this.alarmCharts = this.makeAlarmCharts()
      this.angryCharts = this.makeAngryCharts()
      this.happyCharts = this.makeHappyCharts()
      this.disgustedCharts = this.makeDisgustedCharts()
      this.neutralCharts = this.makeNeutralCharts()
    }
  }
</script>