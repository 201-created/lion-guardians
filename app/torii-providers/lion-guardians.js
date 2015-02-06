import Ember from 'ember';
import config from '../config/environment';
import ajax from '../utils/ajax';

var sessionUrl = config.apiHost + config.tokenPath;

export default Ember.Object.extend({
  open: function(credentials){
    let ajaxOptions = {
      type: 'POST',
      data: {user: credentials}
    };
    return ajax(sessionUrl, ajaxOptions);
  }
});
