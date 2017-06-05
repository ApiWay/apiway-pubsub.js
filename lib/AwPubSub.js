/**
 * @file
 * @copyright
 * @license
 *
 */
/* eslint valid-jsdoc: ["error", {"requireReturnDescription": false}] */

// import User from './User';
// import Project from './Project';
// import Instance from './Instance';
var mqtt = require('mqtt')
var bunyan = require('bunyan')

var log = bunyan.createLogger({name:'AwPubSub'})
// var mqttClient

/**
 * AwPubSub encapsulates the functionality to create various API wrapper objects.
 */
class AwPubSub {
   /**
    * Create a new AwPubSub.
    */
   constructor(host = 'apiway-pubsub', protocol = 'mqtt', port = '1883') {
      this.__url = `${protocol}://${host}`
      this._this = this
      this.onConnect = this.onConnect.bind(this);
      this.onError = this.onError.bind(this);
   }

   connect () {
      this.mqttClient = mqtt.connect(this.__url)
      this.mqttClient.on('connect', this.onConnect);
      this.mqttClient.on('error', this.onError);
   }

   isConnected () {
      return this.mqttClient.connected;
   }

   onConnect () {
      log.info('onConnect')
      this.mqttClient.publish(this.topic, this.message)
      this.resolve()
   }

   onError (error) {
      log.info(`onError: ${error}`)
      this.reject(error)
   }

   publish (topic, message) {
      log.info('publish')
      return new Promise((resolve, reject) => {
         this.resolve = resolve
         this.reject= reject
         this.topic = topic
         this.message = message
         this.connect()
      })
   }
}

module.exports = AwPubSub;
