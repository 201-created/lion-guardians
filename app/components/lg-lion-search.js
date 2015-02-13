import Ember from 'ember';
import {searchGenders} from 'lion-guardians/utils/units';

export default Ember.Component.extend({
  store: null,
  genders: searchGenders,
  selectedGender: searchGenders[0],
  defaultGender: Ember.computed.alias('genders.firstObject'),
  organizations: null,
  selectedOrganization: null,
  selectedName: null,
  action: null,
  searchModel: 'lion',

  defaultOrganization: function(){
    return Ember.Object.create({
      name: 'all',
      id: -1
    });
  }.property(),

  searchOrganizations: function() {
    var organizations = this.get('organizations'),
        defaultOrganization = this.get('defaultOrganization');

    if (!organizations) {
      return [];
    }

    var searchOptions = Ember.A([defaultOrganization]);
    organizations.forEach(function(org) {
      searchOptions.pushObject(org);
    });

    return searchOptions;
  }.property('organizations', 'defaultOrganization'),

  params: function(){
    var params = {},
        selectedGender = this.get('selectedGender'),
        defaultGender = this.get('defaultGender'),
        selectedOrganization = this.get('selectedOrganization'),
        selectedName = this.get('selectedName');

    if (selectedGender !== defaultGender){
      params['gender'] = selectedGender;
    }

    if (selectedOrganization && selectedOrganization.get('id') !== -1) {
      params['organization_id'] = selectedOrganization.get('id');
    }

    if (selectedName && !Ember.isBlank(selectedName)) {
      params['name'] = selectedName;
    }

    return params;
  }.property('selectedGender', 'defaultGender', 'selectedOrganization',
             'selectedName'),

  actions: {
    search: function() {
      var params = this.get('params'),
          store = this.get('store'),
          component = this,
          searchModel = this.get('searchModel');

      store.find(searchModel, params).then(function(results){
        component.sendAction('action', results);
      }, function() {
        alert("There was an error searching.");
      });
    }
  }
});
