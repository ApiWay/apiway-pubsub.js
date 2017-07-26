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

         log.info('publish');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkF3UHViU3ViLmpzIl0sIm5hbWVzIjpbIm1xdHQiLCJyZXF1aXJlIiwiYnVueWFuIiwibG9nIiwiY3JlYXRlTG9nZ2VyIiwibmFtZSIsIkF3UHViU3ViIiwiaG9zdCIsInByb3RvY29sIiwicG9ydCIsIl9fdXJsIiwiX3RoaXMiLCJvbkNvbm5lY3QiLCJiaW5kIiwib25FcnJvciIsIm1xdHRDbGllbnQiLCJjb25uZWN0Iiwib24iLCJjb25uZWN0ZWQiLCJpbmZvIiwicHVibGlzaCIsInRvcGljIiwibWVzc2FnZSIsInJlc29sdmUiLCJlcnJvciIsInJlamVjdCIsIlByb21pc2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBTUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsT0FBT0MsUUFBUSxNQUFSLENBQVg7QUFDQSxJQUFJQyxTQUFTRCxRQUFRLFFBQVIsQ0FBYjs7QUFFQSxJQUFJRSxNQUFNRCxPQUFPRSxZQUFQLENBQW9CLEVBQUNDLE1BQUssVUFBTixFQUFwQixDQUFWO0FBQ0E7O0FBRUE7Ozs7SUFHTUMsUTtBQUNIOzs7QUFHQSx1QkFBc0U7QUFBQSxVQUExREMsSUFBMEQsdUVBQW5ELGVBQW1EO0FBQUEsVUFBbENDLFFBQWtDLHVFQUF2QixNQUF1QjtBQUFBLFVBQWZDLElBQWUsdUVBQVIsTUFBUTs7QUFBQTs7QUFDbkUsV0FBS0MsS0FBTCxHQUFnQkYsUUFBaEIsV0FBOEJELElBQTlCO0FBQ0EsV0FBS0ksS0FBTCxHQUFhLElBQWI7QUFDQSxXQUFLQyxTQUFMLEdBQWlCLEtBQUtBLFNBQUwsQ0FBZUMsSUFBZixDQUFvQixJQUFwQixDQUFqQjtBQUNBLFdBQUtDLE9BQUwsR0FBZSxLQUFLQSxPQUFMLENBQWFELElBQWIsQ0FBa0IsSUFBbEIsQ0FBZjtBQUNGOzs7O2dDQUVVO0FBQ1IsY0FBS0UsVUFBTCxHQUFrQmYsS0FBS2dCLE9BQUwsQ0FBYSxLQUFLTixLQUFsQixDQUFsQjtBQUNBLGNBQUtLLFVBQUwsQ0FBZ0JFLEVBQWhCLENBQW1CLFNBQW5CLEVBQThCLEtBQUtMLFNBQW5DO0FBQ0EsY0FBS0csVUFBTCxDQUFnQkUsRUFBaEIsQ0FBbUIsT0FBbkIsRUFBNEIsS0FBS0gsT0FBakM7QUFDRjs7O29DQUVjO0FBQ1osZ0JBQU8sS0FBS0MsVUFBTCxDQUFnQkcsU0FBdkI7QUFDRjs7O2tDQUVZO0FBQ1ZmLGFBQUlnQixJQUFKLENBQVMsV0FBVDtBQUNBLGNBQUtKLFVBQUwsQ0FBZ0JLLE9BQWhCLENBQXdCLEtBQUtDLEtBQTdCLEVBQW9DLEtBQUtDLE9BQXpDO0FBQ0EsY0FBS0MsT0FBTDtBQUNGOzs7OEJBRVFDLEssRUFBTztBQUNickIsYUFBSWdCLElBQUosZUFBcUJLLEtBQXJCO0FBQ0EsY0FBS0MsTUFBTCxDQUFZRCxLQUFaO0FBQ0Y7Ozs4QkFFUUgsSyxFQUFPQyxPLEVBQVM7QUFBQTs7QUFDdEJuQixhQUFJZ0IsSUFBSixDQUFTLFNBQVQ7QUFDQSxnQkFBTyxJQUFJTyxPQUFKLENBQVksVUFBQ0gsT0FBRCxFQUFVRSxNQUFWLEVBQXFCO0FBQ3JDLGtCQUFLRixPQUFMLEdBQWVBLE9BQWY7QUFDQSxrQkFBS0UsTUFBTCxHQUFhQSxNQUFiO0FBQ0Esa0JBQUtKLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGtCQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDQSxrQkFBS04sT0FBTDtBQUNGLFVBTk0sQ0FBUDtBQU9GOzs7Ozs7QUFHSlcsT0FBT0MsT0FBUCxHQUFpQnRCLFFBQWpCIiwiZmlsZSI6IkF3UHViU3ViLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZVxuICogQGNvcHlyaWdodFxuICogQGxpY2Vuc2VcbiAqXG4gKi9cbi8qIGVzbGludCB2YWxpZC1qc2RvYzogW1wiZXJyb3JcIiwge1wicmVxdWlyZVJldHVybkRlc2NyaXB0aW9uXCI6IGZhbHNlfV0gKi9cblxuLy8gaW1wb3J0IFVzZXIgZnJvbSAnLi9Vc2VyJztcbi8vIGltcG9ydCBQcm9qZWN0IGZyb20gJy4vUHJvamVjdCc7XG4vLyBpbXBvcnQgSW5zdGFuY2UgZnJvbSAnLi9JbnN0YW5jZSc7XG52YXIgbXF0dCA9IHJlcXVpcmUoJ21xdHQnKVxudmFyIGJ1bnlhbiA9IHJlcXVpcmUoJ2J1bnlhbicpXG5cbnZhciBsb2cgPSBidW55YW4uY3JlYXRlTG9nZ2VyKHtuYW1lOidBd1B1YlN1Yid9KVxuLy8gdmFyIG1xdHRDbGllbnRcblxuLyoqXG4gKiBBd1B1YlN1YiBlbmNhcHN1bGF0ZXMgdGhlIGZ1bmN0aW9uYWxpdHkgdG8gY3JlYXRlIHZhcmlvdXMgQVBJIHdyYXBwZXIgb2JqZWN0cy5cbiAqL1xuY2xhc3MgQXdQdWJTdWIge1xuICAgLyoqXG4gICAgKiBDcmVhdGUgYSBuZXcgQXdQdWJTdWIuXG4gICAgKi9cbiAgIGNvbnN0cnVjdG9yKGhvc3QgPSAnYXBpd2F5LXB1YnN1YicsIHByb3RvY29sID0gJ21xdHQnLCBwb3J0ID0gJzE4ODMnKSB7XG4gICAgICB0aGlzLl9fdXJsID0gYCR7cHJvdG9jb2x9Oi8vJHtob3N0fWBcbiAgICAgIHRoaXMuX3RoaXMgPSB0aGlzXG4gICAgICB0aGlzLm9uQ29ubmVjdCA9IHRoaXMub25Db25uZWN0LmJpbmQodGhpcyk7XG4gICAgICB0aGlzLm9uRXJyb3IgPSB0aGlzLm9uRXJyb3IuYmluZCh0aGlzKTtcbiAgIH1cblxuICAgY29ubmVjdCAoKSB7XG4gICAgICB0aGlzLm1xdHRDbGllbnQgPSBtcXR0LmNvbm5lY3QodGhpcy5fX3VybClcbiAgICAgIHRoaXMubXF0dENsaWVudC5vbignY29ubmVjdCcsIHRoaXMub25Db25uZWN0KTtcbiAgICAgIHRoaXMubXF0dENsaWVudC5vbignZXJyb3InLCB0aGlzLm9uRXJyb3IpO1xuICAgfVxuXG4gICBpc0Nvbm5lY3RlZCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5tcXR0Q2xpZW50LmNvbm5lY3RlZDtcbiAgIH1cblxuICAgb25Db25uZWN0ICgpIHtcbiAgICAgIGxvZy5pbmZvKCdvbkNvbm5lY3QnKVxuICAgICAgdGhpcy5tcXR0Q2xpZW50LnB1Ymxpc2godGhpcy50b3BpYywgdGhpcy5tZXNzYWdlKVxuICAgICAgdGhpcy5yZXNvbHZlKClcbiAgIH1cblxuICAgb25FcnJvciAoZXJyb3IpIHtcbiAgICAgIGxvZy5pbmZvKGBvbkVycm9yOiAke2Vycm9yfWApXG4gICAgICB0aGlzLnJlamVjdChlcnJvcilcbiAgIH1cblxuICAgcHVibGlzaCAodG9waWMsIG1lc3NhZ2UpIHtcbiAgICAgIGxvZy5pbmZvKCdwdWJsaXNoJylcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICB0aGlzLnJlc29sdmUgPSByZXNvbHZlXG4gICAgICAgICB0aGlzLnJlamVjdD0gcmVqZWN0XG4gICAgICAgICB0aGlzLnRvcGljID0gdG9waWNcbiAgICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2VcbiAgICAgICAgIHRoaXMuY29ubmVjdCgpXG4gICAgICB9KVxuICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEF3UHViU3ViO1xuIl19
//# sourceMappingURL=AwPubSub.js.map
