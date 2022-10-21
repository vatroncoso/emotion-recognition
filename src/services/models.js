require('@tensorflow/tfjs-backend-cpu')
require('@tensorflow/tfjs-backend-webgl')
const blazeface = require('@tensorflow-models/blazeface')
const tf = require('@tensorflow/tfjs')
const moment = require('moment') //en que maneja cosa de fechas
const { v4: uuidv4 } = require('uuid') //crea id unicas 

let faceModel
let emotionModel
// const verbose = ["😠 Enojo", "😣 Disgusto", "😊 Alegría", "😐 Neutro"]
// const emotion = ["angry", "disgusted", "happy", "neutral"]

const verbose = ["😠 Enojo", "😣 Miedo", "😊 Alegría", "😐 Neutro"]
const emotion = ["angry", "fear", "happy", "neutral"]
const alarmEmotion = ["angry","fear"]

async function load () {
    faceModel = await blazeface.load()
    emotionModel = await tf.loadGraphModel('/model/model.json')
}

async function facePrediction (image) {
    const returnTensors = false
    const predictions = await faceModel.estimateFaces(image, returnTensors)

    return predictions
}

function emotionPrediction (arr) {
    let tensor4 = tf.tensor4d(arr)
    const predictions = emotionModel.predict(tensor4).dataSync()
    const prediction = predictions.indexOf(Math.max.apply(null, predictions))

    const hasAlarm = alarmEmotion.includes(emotion[prediction])

    return {
        id: uuidv4(),
        prediction: prediction,
        verbose: verbose[prediction],
        emotion: emotion[prediction],
        ts: moment().format(),
        hasAlarm: hasAlarm
    }
}

const models = {
    load,
    facePrediction,
    emotionPrediction
}

export default models