import Ember from 'ember';
import DS from 'ember-data';
import HalAdapter from 'ember-data-hal-9000/adapter';
import storage from '../utils/storage';
import config from "../config/environment";

export default HalAdapter.extend({
  host: config.apiHost,

  headers: function(){
    let headers = {};
    let token = storage.read(config.authTokenKey);
    if (token) {
      // For rails token authorization
      headers['Authorization'] =
        `Token token=${token.token}, email=${token.email}`;
    }

    return headers;
  }.property().volatile(),

  ajaxError: function(jqXHR) {
    var error = this._super(jqXHR);
    if (jqXHR && jqXHR.status === 422) {
      var response = Ember.$.parseJSON(jqXHR.responseText),
          errors = {};

      if (response.errors) {
        var jsonErrors = response.errors;
        Ember.keys(jsonErrors).forEach(function(key) {
          errors[Ember.String.camelize(key)] = key + ' ' + jsonErrors[key];
        });

        return new DS.InvalidError(errors);
      } else {
        return error;
      }
    } else {
      return error;
    }
  }
});
