import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';
import { stubGetSearchOptions } from '../../helpers/fake-requests';

moduleForComponent('lg-lion-search', 'LgLionSearchComponent', {
  // specify the other units that are required for this test
  needs: ['component:lg-dob-search-selector'],

  setup: function() {
    stubGetSearchOptions();
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

test('tags', function() {
  var component = this.subject();
  deepEqual(component.get('params'), {});

  var nullOption = component.get('nullOption');
  component.set('selectedEarMarking', nullOption);
  deepEqual(component.get('params'), {});

  component.set('selectedEarMarking', 'EAR_LEFT');
  deepEqual(component.get('params'), {tags: ['EAR_LEFT']});

  component.set('selectedEyeDamage', 'EYE_RIGHT');
  deepEqual(component.get('params'), {tags: ['EAR_LEFT', 'EYE_RIGHT']});

  component.set('selectedEarMarking', nullOption);
  deepEqual(component.get('params'), {tags: ['EYE_RIGHT']});

  component.setProperties({
    selectedEarMarking: 'EAR_LEFT',
    selectedMouthMarking: 'MOUTH_FRONT',
    selectedNoseColour: 'NOSE_PINK',
    selectedTailMarking: 'TAIL_TUFT',
    selectedTeeth: 'BROKEN_CANINE_LEFT',
    selectedScar: 'SCAR_BODY_LEFT'
  });

  deepEqual(component.get('params'), {tags: [
    'EAR_LEFT', 'EYE_RIGHT', 'MOUTH_FRONT', 'NOSE_PINK', 'TAIL_TUFT',
    'BROKEN_CANINE_LEFT', 'SCAR_BODY_LEFT'
  ]});
});
