import Ember from 'ember';
import DS from 'ember-data';
import OrganizationRouteMixin from 'lion-guardians/mixins/organization-route';
import RequireUserMixin from 'lion-guardians/mixins/require-user';

export default Ember.Route.extend(OrganizationRouteMixin, RequireUserMixin, {
  actions: {
    createLion: function(imageSet, lionName){
      var lion = this.store.createRecord('lion', {
        primaryImageSet: imageSet,
        name: lionName
      });

      // Bind lion to controller so that we can show errors
      var controller = this.get('controller');
      controller.set('newLion', lion);

      lion.save().then(function(){
        return;
      }, function(error){
        if (!(error instanceof DS.InvalidError)) {
          alert("There was an error saving");
        }
      });
    }
  }
});
