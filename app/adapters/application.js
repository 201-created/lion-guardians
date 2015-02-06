import HalAdapter from "ember-data-hal-9000/adapter";
import config from '../config/environment';

export default HalAdapter.extend({
  host: config.apiURL
});
