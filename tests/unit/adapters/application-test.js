import {
  moduleFor,
  test
} from 'ember-qunit';

import storage from '../../../utils/storage';
import config from '../../../config/environment';

moduleFor('adapter:application', 'ApplicationAdapter', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

// Replace this with your real tests.
test('it adds Authorization header when there is a token', function() {
  let token = {
    token: 'abcdef',
    email: 'abc@example.com'
  };

  var adapter = this.subject();
  deepEqual(adapter.get('headers'), {});

  storage.write(config.authTokenKey, token);

  equal(adapter.get('headers')['Authorization'],
        `Token token=${token.token}, email=${token.email}`);
});
