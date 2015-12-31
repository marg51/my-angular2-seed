import {provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
var _ = require('lodash');
var Redux = require('redux')

import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {AppCmp} from './components/app/app';

bootstrap(AppCmp, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy })
]);
