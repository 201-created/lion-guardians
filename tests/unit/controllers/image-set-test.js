import {
  moduleFor,
  test
} from 'ember-qunit';

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

test('makeMainImage sets main image on model', function(){
  expect(2);

  var model = Ember.Object.create({}),
      image = Ember.Object.create({url: 'lg.org'}),
      controller = this.subject({model: model});

  equal(controller.get('model.mainImage'), null);
  controller.send('makeMainImage', image);
  equal(controller.get('model.mainImage'), image);
});

test('deleteImage removes image from image set', function() {
  expect(3);

  var img1 = Ember.Object.create(),
      img2 = Ember.Object.create(),
      model = Ember.Object.create({
        images: [img1, img2],
        mainImage: img1
      }),
      controller = this.subject({model: model});

  equal(model.get('images.length'), 2);

  Ember.run(controller, function(){
    controller.send('deleteImage', img1);
    deepEqual(model.get('images'), [img2]);
    equal(model.get('mainImage'), null, 'unsets main image on image deletion');
  });
});
