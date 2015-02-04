import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('lg-lion-search', 'LgLionSearchComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']

  setup: function() {
    this.container.register('view:select', Ember.Select);
  }
});

test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');
});

test('it sets params for gender', function(){
  expect(3);
  var component = this.subject();
  equal(component.get('selectedGender'), 'all');
  deepEqual(component.get('params'), {});

  component.set('selectedGender', 'female');
  deepEqual(component.get('params'), {gender: 'female'});
});

test('it sets params for organization', function(){
  expect(3);
  var organization = Ember.Object.create({id: 1, name: 'LG'}),
      component = this.subject({
        organizations: [organization]
      });

  var expectedOrgs = [component.get('defaultOrganization'), organization];
  deepEqual(component.get('searchOrganizations'), expectedOrgs);

  deepEqual(component.get('params'), {});

  component.set('selectedOrganization', organization);
  deepEqual(component.get('params'), {organization_id: organization.get('id')});
});

test('it sets params for name', function(){
  var component = this.subject();
  deepEqual(component.get('params'), {});

  component.set('selectedName', '');
  deepEqual(component.get('params'), {});

  component.set('selectedName', 'Simba');
  deepEqual(component.get('params'), {name: 'Simba'});
});
