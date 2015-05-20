import Ember from 'ember';
import OrganizationRouteMixin from 'lion-guardians/mixins/organization-route';
import RequireUserMixin from 'lion-guardians/mixins/require-user';

export default Ember.Route.extend(OrganizationRouteMixin, RequireUserMixin, {

  setupController: function(controller, model) {
    this._super(controller, model);

    var currentUser = this.get('toriiSession.currentUser');
    controller.set('currentUser', currentUser);
  }
});
