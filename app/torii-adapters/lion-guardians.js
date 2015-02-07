import Ember from "ember";
import storage from '../utils/storage';
import config from "../config/environment";

export function clearSession(){
  storage.remove(config.authTokenKey);
}

function persistSession(token){
  storage.write(config.authTokenKey, {
    token: Ember.get(token, 'token'),
    email: Ember.get(token, 'email'),
    user:  Ember.get(token, 'user.id')
  });
}

export default Ember.Object.extend({
  fetch: function(){
    var store = this.store;

    return new Ember.RSVP.Promise(function(resolve){
      var tokenPayload = storage.read(config.authTokenKey);

      if (!tokenPayload) {
        throw new Error('Token not found');
      }

      if (!tokenPayload.id) {
        // for ember-data's store
        tokenPayload.id = 'auth-token';
      }
      resolve(store.push('token', tokenPayload));
    }).then(function(token){
      return Ember.RSVP.hash({
        currentUser: token.get('user')
      });
    }).catch(function(e){
      clearSession();
      throw e;
    });
  },

  open: function(tokenPayload){
    var store = this.store;

    return new Ember.RSVP.Promise(function(resolve){
      resolve(store.push('token', {
        id: 'auth-token',
        token: tokenPayload.token,
        email: tokenPayload.email,
        user:  tokenPayload.user
      }));
    }).then(function(token){
      persistSession(token);

      return Ember.RSVP.hash({
        currentUser: token.get('user')
      });
    }).catch(function(e){
      clearSession();
      throw e;
    });
  },

  close: function(){
    return new Ember.RSVP.Promise(function(resolve){
      clearSession();
      resolve();
    });
  }
});
