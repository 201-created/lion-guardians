import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';
import FakeServer from './helpers/fake-server';
import { clearSession } from '../torii-adapters/lion-guardians';

setResolver(resolver);

QUnit.testStart(function(){
  clearSession();
  FakeServer.start();
});

QUnit.testDone(function(){
  FakeServer.stop();
});
