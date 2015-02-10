import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('lg-image-gallery', 'LgImageGalleryComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
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

test('makeMainImage sets main image on model', function(){
  expect(2);

  var imageSet = Ember.Object.create({}),
      image = Ember.Object.create({url: 'lg.org'}),
      component = this.subject({imageSet: imageSet});

  equal(component.get('imageSet.mainImage'), null);
  component.send('makeMainImage', image);
  equal(component.get('imageSet.mainImage'), image);
});

test('deleteImage removes image from image set', function() {
  expect(4);

  var img1 = Ember.Object.create({
    destroyRecord: function() {
      ok(true, 'image object destroyed');
    }
  }),
      img2 = Ember.Object.create(),
      imageSet = Ember.Object.create({
        images: [img1, img2],
        mainImage: img1
      }),
      component = this.subject({imageSet: imageSet});

  equal(imageSet.get('images.length'), 2);

  Ember.run(component, function(){
    component.send('deleteImage', img1);
    deepEqual(imageSet.get('images'), [img2]);
    equal(imageSet.get('mainImage'), null, 'unsets main image on image deletion');
  });
});
