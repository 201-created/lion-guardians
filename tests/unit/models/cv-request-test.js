import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('cv-request', 'CvRequest', {
  needs: ['model:image-set', 'model:image', 'model:lion',
          'model:user', 'model:organization', 'model:cv-result']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
