import {
  moduleFor,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:image-set', 'ImageSetController', {
  // needs: []
});

test('it exists', function() {
  var controller = this.subject();
  ok(controller);
});

test('addImage', function(){
  expect(1);
  var model = Ember.Object.create({
    addImage: function(url, isPublic, imageType) {
      ok(true, 'addImage called from controller');
    }
  });

  var upload = Ember.Object.create({
    url: 'url1',
    deleteRecord: function(){}
  }),
      controller = this.subject({model: model});

  Ember.run(controller, function() {
    controller.send('addImage', upload);
  });
});
