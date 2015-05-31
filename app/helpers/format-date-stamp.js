import Ember from 'ember';

function lpad(val, length=2, padding='0'){
  val = val + ''; // coerce to string
  while (val.length  < length) {
    val = padding + val;
  }

  return val;
}

export function formatDateStamp(date){
  if (date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${lpad(month)}-${lpad(day)}`;
  } else {
    return "not set";
  }
}

export default Ember.Handlebars.makeBoundHelper(formatDateStamp);
