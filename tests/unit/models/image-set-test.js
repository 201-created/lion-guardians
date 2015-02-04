import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('image-set', 'ImageSet', {
  needs: ['model:image', 'model:organization']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});

test('addImage adds an image', function(){
  var model = this.subject();

  Ember.run(model, function() {
    model.addImage('url1', true, 'whiskers');
    equal(model.get('images.length'), 1);
    equal(model.get('mainImage'), null, "doesn't change mainImage");
  });
});
