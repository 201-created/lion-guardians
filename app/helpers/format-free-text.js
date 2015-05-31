import Ember from 'ember';

function sanitize(text){
  return text.replace(/</g, '&lt;').
              replace(/>/g, '&gt;');
}

function replaceNewlines(text){
  return text.replace(/\n/g, '<br>');
}

export function formatFreeText(text) {
  if (!text) { return; }

  const html = replaceNewlines(sanitize(text));
  return Ember.String.htmlSafe(html);
}

export default Ember.Handlebars.makeBoundHelper(formatFreeText);
