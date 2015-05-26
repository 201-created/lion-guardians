import {
  moduleForModel,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('image-set', 'ImageSet', {
  needs: ['model:image', 'model:organization', 'model:user',
          'model:cv-result', 'model:lion', 'model:cv-request']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});

test('addImage adds an image', function(){
  var model = this.subject();

  Ember.run(function() {
    model.addImage('url1', true, 'whiskers');
  });

  equal(model.get('images.length'), 1);
  equal(model.get('mainImage'), null, "doesn't change mainImage");
});
