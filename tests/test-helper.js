import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';
import FakeServer from './helpers/fake-server';
import { clearSession } from '../torii-adapters/lion-guardians';

setResolver(resolver);

document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

QUnit.config.urlConfig.push({ id: 'nocontainer', label: 'Hide container' });
var containerVisibility = QUnit.urlParams.nocontainer ? 'hidden' : 'visible';
document.getElementById('ember-testing-container').style.visibility = containerVisibility;

QUnit.testStart(function(){
  clearSession();
  FakeServer.start();
});

QUnit.testDone(function(){
  FakeServer.stop();
});
