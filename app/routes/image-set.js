import Ember from 'ember';
import OrganizationRouteMixin from 'lion-guardians/mixins/organization-route';
export default Ember.Route.extend( OrganizationRouteMixin, {
  model: function(params) {
    return this.store.find('imageSet', params.image_set_id);
  }
});
