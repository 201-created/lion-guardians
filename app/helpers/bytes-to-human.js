import Ember from 'ember';

// From http://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable
export function bytesToHuman(bytes) {
  if (bytes === 0 ) { return '0 bytes'; }

  var i = Math.floor( Math.log(bytes) / Math.log(1024) );
  return ( bytes / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}

export default Ember.Handlebars.makeBoundHelper(bytesToHuman);
