import DS from 'ember-data';
import HalSerializer from "ember-data-hal-9000/serializer";
export default HalSerializer.extend(DS.EmbeddedRecordsMixin);
