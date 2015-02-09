import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('lg-file-upload', 'LgFileUploadComponent', {
  // specify the other units that are required for this test
  needs: ['component:lg-progress-bar', 'helper:round-number']
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
