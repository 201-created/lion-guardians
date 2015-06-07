import Ember from 'ember';
import nicelyFormattedError from 'lion-guardians/utils/nicely-formatted-error';

export default Ember.Route.extend({
  setupController(controller, error){
    let formattedError = nicelyFormattedError(error);

    controller.set('model', formattedError);
  }
});
