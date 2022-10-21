<template>
  	<v-container>
		  
		<v-row  align="center" justify="space-around">
      <v-col cols="=9">
        <!-- <img :src="imageUrl"  width="600" id="holiwi" v-show="predictedImage">
        <canvas id="myCanvas"></canvas> -->

        <div class="outsideWrapper">
            <div class="insideWrapper">
                <img :src="imageUrl" id="holiwi" class="coveredImage">
                <canvas id="myCanvas" class="coveringCanvas"></canvas>
            </div>
        </div>

        <div class="text-center">
          <v-btn 
            
            rounded
            raised
            dark
            color="#4CAF50"
            @click="onPickFile"
             
          >
            Subir Imagen
             <v-icon
          dark
          right
        >
          mdi-camera
        </v-icon>
          </v-btn>
        </div>

		  </v-col>

      <v-col cols="=3">
        <v-card
          max-width="450"
          max-height="600"
          class="mx-auto"
          
        >
          <v-toolbar
            color="#4CAF50"
            dark
          >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>Historial de Emociones</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>
          
          <v-list three-line style="overflow-y: scroll;" max-height="536">
            <template v-for="(item, index) in viewEmotionList">
              <v-list-item :key="item.id">
                  <v-list-item-content>
                    <v-list-item-title> Emoción detectada: {{item.verbose}}</v-list-item-title>

                    <v-list-item-subtitle> {{item.ts | date}}</v-list-item-subtitle>
                  </v-list-item-content>
              </v-list-item>

              <v-divider
                v-if="index < viewEmotionList.length - 1"
                :key="index"
              ></v-divider>
            </template>
          </v-list>
        </v-card>

      </v-col>
		</v-row>		
		
		<v-row>
      <v-col cols="=4">
        <input type="file"
          style="display:none"
          ref="fileInput"
          accept="image/*"
          @change="onFilePicked"
        >
      </v-col>
		</v-row>

    <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="#3E7C17"
        dark
        height = "35"
      >
        <v-card-text>
          Cargando modelos, porfavor espere
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    
     <v-snackbar
       v-model="notification"
      :timeout="3000"
      :value="true"
      color="#EA4C4C"
      absolute
      right
      rounded="pill"
      bottom
    >
      Emoción de connotación negativa detectada
    </v-snackbar>
  </v-container>
</template>

<script>
import modelsasd from '../services/models'
import moment from 'moment'

export default {
    data: () => ({
      dialog: false,
      emotions: [],
      image: null,
      imageUrl:'',
      faceModel: null,
      emotionModel: null,
      arrayCanvasFaces: [],
      predictedImage: true,
      notification: false
  }),

	methods:{

		onPickFile(){
			this.$refs.fileInput.click()
		},

		onFilePicked (event) {
      this.predictedImage = true
			const files = event.target.files
			let filename = files[0].name;
			
      if (filename.lastIndexOf('.')<= 0)
				return alert('Ingresar un archivo valido!')

			const fileReader= new FileReader()
			
      fileReader.addEventListener('load', ()=>{
				this.imageUrl = fileReader.result
			})

      fileReader.addEventListener('loadend', ()=>{
        this.getPredictions()
			})

			fileReader.readAsDataURL(files[0])
			this.image = files[0]

		},
    
    createCanvas (id) {
        let canvas = document.createElement('canvas')
        canvas.id = `canvas_face_${id}`
        canvas.width = 48
        canvas.height = 48
        
        let body = document.getElementsByTagName("body")[0]
        body.appendChild(canvas)

        return canvas.id
    },

    saveRecord (record) {
      this.emotions.unshift(record)
      let save = JSON.stringify(this.emotions)
      localStorage.setItem('record', save);
    },

    async getPredictions () {
        const image = document.getElementById("holiwi")

        const width = image.clientWidth
        const height = image.clientHeight

        let c = document.getElementById("myCanvas")
        let ctx = c.getContext("2d")

        ctx.canvas.width = width
        ctx.canvas.height = height
        ctx.drawImage(image,0,0, width, height)

        let arrayCanvasFaces = []
        const predictions = await modelsasd.facePrediction(image)

        if (predictions.length > 0) {
            for (let i = 0; i < predictions.length; i++) {
                //calcula las dimenciones de la cara detectada
                const start = predictions[i].topLeft
                const end = predictions[i].bottomRight
                const size = [end[0] - start[0], end[1] - start[1]]
                const squareSize = size[0] > size[1] ? size[0] : size[1]
                
                // Crea el canvas con cada cara para detectar sus emociones
                let canvas = document.createElement('canvas')
                let faceCanvasID = `canvas_face_${i}`
                canvas.id = faceCanvasID
                canvas.width = 48
                canvas.height = 48
                // Para ocultar el canvas de las caras
                canvas.classList.toggle('smallcanvas')

                let body = document.getElementsByTagName("body")[0]
                body.appendChild(canvas)

                // Dibuja las caras detectadas
                let faceCanvas = document.getElementById(faceCanvasID)
                let ctx_ = faceCanvas.getContext("2d")
                ctx_.drawImage(c, start[0], start[1], squareSize, squareSize, 0, 0, 48, 48)

                const faceDetected = {
                    canvas: faceCanvasID,
                    start: start,
                    end: end,
                    size: size,
                    squareSize: squareSize
                }

                arrayCanvasFaces.push(faceDetected)
            }
        }

        this.predictedImage = false
          for (let j = 0; j < arrayCanvasFaces.length; j++) {
            let faceCanvas = document.getElementById(arrayCanvasFaces[j].canvas)
            let ctxf = faceCanvas.getContext("2d")

            var imgData = ctxf.getImageData(0,0,48,48)
            
            var arr = [] //El arreglo completo
            var arr28 = [] //Al llegar a 28 posiciones se pone en 'arr' como un nuevo indice
            
            for (var p=0, i=0; p < imgData.data.length; p+=4) {
                var grayscale = (imgData.data[p] + imgData.data[p+1] + imgData.data[p+2]) / 3;
    
                imgData.data[p] = grayscale
                imgData.data[p+1] = grayscale
                imgData.data[p+2] = grayscale
    
                var valor = grayscale/255
   
                arr28.push([valor]); //Agregar al arr28 y normalizar a 0-1. Aparte queda dentro de un arreglo en el indice 0... again
                if (arr28.length == 48) {
                    arr.push(arr28)
                    arr28 = []
                }
            }
            
            arr = [arr]; //Meter el arreglo en otro arreglo por que si no tio tensorflow se enoja >:(

            const prediction2 = modelsasd.emotionPrediction(arr)
            this.saveRecord(prediction2)

            if (prediction2.hasAlarm){
              this.notification = true
            }

            ctx.strokeStyle = "#FF0000"
            ctx.strokeRect(arrayCanvasFaces[j].start[0], arrayCanvasFaces[j].start[1], arrayCanvasFaces[j].squareSize, arrayCanvasFaces[j].squareSize)
            ctx.fillStyle = "red"
            ctx.font = '15px serif'
            ctx.fillText(prediction2.verbose, arrayCanvasFaces[j].start[0], arrayCanvasFaces[j].start[1] - 5)
        }
    }
	},
  
  computed: {
    viewEmotionList () {
      return this.emotions.sort((a,b) => moment(b.ts).format() - moment(a.ts).format())
    },
  },

  filters: {
    date (val) {
      return moment(val).format('LLL')
    }
  },

	async created(){
    this.dialog = true
    moment.locale('es-cl')
    await modelsasd.load()
    let storage = localStorage.getItem('record')

    if (storage != null) {
      this.emotions = JSON.parse(storage)
    }

    this.dialog = false
	}

}
</script>


<style>
  .outsideWrapper{ 
    height:400px;
    width: 680px;
    margin:20px 60px; 
  }

  .insideWrapper{ 
    width:100%; height:100%; 
    position:relative;
  }

  .coveredImage{ 
    width:100%; height:100%;
    position:absolute; top:0px; left:0px;
  }

  .coveringCanvas{ 
    width:100%; height:100%; 
    position:absolute; top:0px; left:0px;
  }

  .smallcanvas {
    display: none;
  }
</style>