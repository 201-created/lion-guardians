import Ember from 'ember';
import config from '../config/environment';
import OrganizationRouteMixin from 'lion-guardians/mixins/organization-route';
import RequireUserMixin from 'lion-guardians/mixins/require-user';

export default Ember.Route.extend( OrganizationRouteMixin, RequireUserMixin, {
  beforeModel: function() {
    var route = this;
    return this._super().then(function() {
      if (config.showMaps) {
        return route.loadGoogleMap();
      }
    });
  },

  model: function(params) {
    return this.store.find('imageSet', params.image_set_id);
  }
});
