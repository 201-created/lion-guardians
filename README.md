# LG

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

[![Build Status](https://travis-ci.org/201-created/lion-guardians.svg?branch=master)](https://travis-ci.org/201-created/lion-guardians)

[Trello board](https://trello.com/b/Yeyso57t/lion-guardians)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

The project front end is hosted on Google App Engine at: https://console.developers.google.com/project/apps~lion-guardians

If you don't have access follow the following steps:

1. Request an email invitation from a developer on the team.
2. Accept the invitation.
3. Install the SDK from here [google.com](https://developers.google.com/appengine/downloads#Google_App_Engine_SDK_for_Python)

To deploy run `./deploy.sh` or `ember build --environment production && appcfg.py --oauth2 update .`

Then, go here: http://lion-guardians.appspot.com/

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
