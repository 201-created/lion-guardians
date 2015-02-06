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
  }.property().volatile()
});
