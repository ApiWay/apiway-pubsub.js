'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var mqtt = require('mqtt');
var bunyan = require('bunyan');

var log = bunyan.createLogger({ name: 'AwPubSub' });
// var mqttClient

/**
 * AwPubSub encapsulates the functionality to create various API wrapper objects.
 */

var AwPubSub = function () {
   /**
    * Create a new AwPubSub.
    */
   function AwPubSub() {
      var host = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'apiway-pubsub';
      var protocol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'mqtt';
      var port = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '1883';

      _classCallCheck(this, AwPubSub);

      this.__url = protocol + '://' + host;
      this._this = this;
      this.onConnect = this.onConnect.bind(this);
      this.onError = this.onError.bind(this);
   }

   _createClass(AwPubSub, [{
      key: 'connect',
      value: function connect() {
         this.mqttClient = mqtt.connect(this.__url);
         this.mqttClient.on('connect', this.onConnect);
         this.mqttClient.on('error', this.onError);
      }
   }, {
      key: 'isConnected',
      value: function isConnected() {
         return this.mqttClient.connected;
      }
   }, {
      key: 'onConnect',
      value: function onConnect() {
         log.info('onConnect');
         // mqttClient.publish(this.topic, this.message)
         this.mqttClient.publish(this.topic, this.message);
         this.resolve();
      }
   }, {
      key: 'onError',
      value: function onError(error) {
         log.info('onError: ' + error);
         this.reject(error);
      }
   }, {
      key: 'publish',
      value: function publish(topic, message) {
         var _this = this;

         console.log('publish');
         return new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
            _this.topic = topic;
            _this.message = message;
            _this.connect();
         });
      }
   }]);

   return AwPubSub;
}();

module.exports = AwPubSub;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkF3UHViU3ViLmpzIl0sIm5hbWVzIjpbIm1xdHQiLCJyZXF1aXJlIiwiYnVueWFuIiwibG9nIiwiY3JlYXRlTG9nZ2VyIiwibmFtZSIsIkF3UHViU3ViIiwiaG9zdCIsInByb3RvY29sIiwicG9ydCIsIl9fdXJsIiwiX3RoaXMiLCJvbkNvbm5lY3QiLCJiaW5kIiwib25FcnJvciIsIm1xdHRDbGllbnQiLCJjb25uZWN0Iiwib24iLCJjb25uZWN0ZWQiLCJpbmZvIiwicHVibGlzaCIsInRvcGljIiwibWVzc2FnZSIsInJlc29sdmUiLCJlcnJvciIsInJlamVjdCIsImNvbnNvbGUiLCJQcm9taXNlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztBQU1BOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUlBLE9BQU9DLFFBQVEsTUFBUixDQUFYO0FBQ0EsSUFBSUMsU0FBU0QsUUFBUSxRQUFSLENBQWI7O0FBRUEsSUFBSUUsTUFBTUQsT0FBT0UsWUFBUCxDQUFvQixFQUFDQyxNQUFLLFVBQU4sRUFBcEIsQ0FBVjtBQUNBOztBQUVBOzs7O0lBR01DLFE7QUFDSDs7O0FBR0EsdUJBQXNFO0FBQUEsVUFBMURDLElBQTBELHVFQUFuRCxlQUFtRDtBQUFBLFVBQWxDQyxRQUFrQyx1RUFBdkIsTUFBdUI7QUFBQSxVQUFmQyxJQUFlLHVFQUFSLE1BQVE7O0FBQUE7O0FBQ25FLFdBQUtDLEtBQUwsR0FBZ0JGLFFBQWhCLFdBQThCRCxJQUE5QjtBQUNBLFdBQUtJLEtBQUwsR0FBYSxJQUFiO0FBQ0EsV0FBS0MsU0FBTCxHQUFpQixLQUFLQSxTQUFMLENBQWVDLElBQWYsQ0FBb0IsSUFBcEIsQ0FBakI7QUFDQSxXQUFLQyxPQUFMLEdBQWUsS0FBS0EsT0FBTCxDQUFhRCxJQUFiLENBQWtCLElBQWxCLENBQWY7QUFDRjs7OztnQ0FFVTtBQUNSLGNBQUtFLFVBQUwsR0FBa0JmLEtBQUtnQixPQUFMLENBQWEsS0FBS04sS0FBbEIsQ0FBbEI7QUFDQSxjQUFLSyxVQUFMLENBQWdCRSxFQUFoQixDQUFtQixTQUFuQixFQUE4QixLQUFLTCxTQUFuQztBQUNBLGNBQUtHLFVBQUwsQ0FBZ0JFLEVBQWhCLENBQW1CLE9BQW5CLEVBQTRCLEtBQUtILE9BQWpDO0FBQ0Y7OztvQ0FFYztBQUNaLGdCQUFPLEtBQUtDLFVBQUwsQ0FBZ0JHLFNBQXZCO0FBQ0Y7OztrQ0FFWTtBQUNWZixhQUFJZ0IsSUFBSixDQUFTLFdBQVQ7QUFDQTtBQUNBLGNBQUtKLFVBQUwsQ0FBZ0JLLE9BQWhCLENBQXdCLEtBQUtDLEtBQTdCLEVBQW9DLEtBQUtDLE9BQXpDO0FBQ0EsY0FBS0MsT0FBTDtBQUNGOzs7OEJBRVFDLEssRUFBTztBQUNickIsYUFBSWdCLElBQUosZUFBcUJLLEtBQXJCO0FBQ0EsY0FBS0MsTUFBTCxDQUFZRCxLQUFaO0FBQ0Y7Ozs4QkFFUUgsSyxFQUFPQyxPLEVBQVM7QUFBQTs7QUFDdEJJLGlCQUFRdkIsR0FBUixDQUFZLFNBQVo7QUFDQSxnQkFBTyxJQUFJd0IsT0FBSixDQUFZLFVBQUNKLE9BQUQsRUFBVUUsTUFBVixFQUFxQjtBQUNyQyxrQkFBS0YsT0FBTCxHQUFlQSxPQUFmO0FBQ0Esa0JBQUtFLE1BQUwsR0FBYUEsTUFBYjtBQUNBLGtCQUFLSixLQUFMLEdBQWFBLEtBQWI7QUFDQSxrQkFBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0Esa0JBQUtOLE9BQUw7QUFDRixVQU5NLENBQVA7QUFPRjs7Ozs7O0FBR0pZLE9BQU9DLE9BQVAsR0FBaUJ2QixRQUFqQiIsImZpbGUiOiJBd1B1YlN1Yi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVcbiAqIEBjb3B5cmlnaHRcbiAqIEBsaWNlbnNlXG4gKlxuICovXG4vKiBlc2xpbnQgdmFsaWQtanNkb2M6IFtcImVycm9yXCIsIHtcInJlcXVpcmVSZXR1cm5EZXNjcmlwdGlvblwiOiBmYWxzZX1dICovXG5cbi8vIGltcG9ydCBVc2VyIGZyb20gJy4vVXNlcic7XG4vLyBpbXBvcnQgUHJvamVjdCBmcm9tICcuL1Byb2plY3QnO1xuLy8gaW1wb3J0IEluc3RhbmNlIGZyb20gJy4vSW5zdGFuY2UnO1xudmFyIG1xdHQgPSByZXF1aXJlKCdtcXR0JylcbnZhciBidW55YW4gPSByZXF1aXJlKCdidW55YW4nKVxuXG52YXIgbG9nID0gYnVueWFuLmNyZWF0ZUxvZ2dlcih7bmFtZTonQXdQdWJTdWInfSlcbi8vIHZhciBtcXR0Q2xpZW50XG5cbi8qKlxuICogQXdQdWJTdWIgZW5jYXBzdWxhdGVzIHRoZSBmdW5jdGlvbmFsaXR5IHRvIGNyZWF0ZSB2YXJpb3VzIEFQSSB3cmFwcGVyIG9iamVjdHMuXG4gKi9cbmNsYXNzIEF3UHViU3ViIHtcbiAgIC8qKlxuICAgICogQ3JlYXRlIGEgbmV3IEF3UHViU3ViLlxuICAgICovXG4gICBjb25zdHJ1Y3Rvcihob3N0ID0gJ2FwaXdheS1wdWJzdWInLCBwcm90b2NvbCA9ICdtcXR0JywgcG9ydCA9ICcxODgzJykge1xuICAgICAgdGhpcy5fX3VybCA9IGAke3Byb3RvY29sfTovLyR7aG9zdH1gXG4gICAgICB0aGlzLl90aGlzID0gdGhpc1xuICAgICAgdGhpcy5vbkNvbm5lY3QgPSB0aGlzLm9uQ29ubmVjdC5iaW5kKHRoaXMpO1xuICAgICAgdGhpcy5vbkVycm9yID0gdGhpcy5vbkVycm9yLmJpbmQodGhpcyk7XG4gICB9XG5cbiAgIGNvbm5lY3QgKCkge1xuICAgICAgdGhpcy5tcXR0Q2xpZW50ID0gbXF0dC5jb25uZWN0KHRoaXMuX191cmwpXG4gICAgICB0aGlzLm1xdHRDbGllbnQub24oJ2Nvbm5lY3QnLCB0aGlzLm9uQ29ubmVjdCk7XG4gICAgICB0aGlzLm1xdHRDbGllbnQub24oJ2Vycm9yJywgdGhpcy5vbkVycm9yKTtcbiAgIH1cblxuICAgaXNDb25uZWN0ZWQgKCkge1xuICAgICAgcmV0dXJuIHRoaXMubXF0dENsaWVudC5jb25uZWN0ZWQ7XG4gICB9XG5cbiAgIG9uQ29ubmVjdCAoKSB7XG4gICAgICBsb2cuaW5mbygnb25Db25uZWN0JylcbiAgICAgIC8vIG1xdHRDbGllbnQucHVibGlzaCh0aGlzLnRvcGljLCB0aGlzLm1lc3NhZ2UpXG4gICAgICB0aGlzLm1xdHRDbGllbnQucHVibGlzaCh0aGlzLnRvcGljLCB0aGlzLm1lc3NhZ2UpXG4gICAgICB0aGlzLnJlc29sdmUoKVxuICAgfVxuXG4gICBvbkVycm9yIChlcnJvcikge1xuICAgICAgbG9nLmluZm8oYG9uRXJyb3I6ICR7ZXJyb3J9YClcbiAgICAgIHRoaXMucmVqZWN0KGVycm9yKVxuICAgfVxuXG4gICBwdWJsaXNoICh0b3BpYywgbWVzc2FnZSkge1xuICAgICAgY29uc29sZS5sb2coJ3B1Ymxpc2gnKVxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgIHRoaXMucmVzb2x2ZSA9IHJlc29sdmVcbiAgICAgICAgIHRoaXMucmVqZWN0PSByZWplY3RcbiAgICAgICAgIHRoaXMudG9waWMgPSB0b3BpY1xuICAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZVxuICAgICAgICAgdGhpcy5jb25uZWN0KClcbiAgICAgIH0pXG4gICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQXdQdWJTdWI7XG4iXX0=
//# sourceMappingURL=AwPubSub.js.map
