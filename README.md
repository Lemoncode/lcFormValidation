# lcFormValidation
![build status](https://travis-ci.org/Lemoncode/lcFormValidation.svg?branch=master "Build Status")

LcFormValidation is a small JavaScript library that provides you form validation. Validate your viewmodel either on client or server side with Node.js.
It is third party / framework agnostic, so you can easily add it in your stack, but it integrates quite well with libraries like React / Redux.

- Heavily based on JavaScript (no html attributes annotations).
- Full async, all validations are processed as async using native [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) (LcFormValidation already gives you a polyfill for browsers that do not support promises).

# Why another form library? #

Form validation is a complex issue, usually we can find solutions that cover the simple scenarios and are focused on building RAD development just by adding some attributes / annotations to given fields or HTML fields (e.g. input), the disadvantage that we have found to this approach:

* There are different approaches for each scenario: sometimes you have to add some tweaking for async validations, some other take care of special scenarios (like validations that depends on more than one field).

* Usually you can easily unit test one validation (directive / annotation), but testing the whole form is a complex task (directives are coupled to e.g. HTML).

* Validations are tightly coupled to e.g. directives or markup is not easy to reuse this validation code in e.g. server side (universal javascript).

## Overview

## Examples

### React examples

#### Simple form

A simple form with fullname and password fields. Applied validations:

- Both fullname and password fields are mandatory (required validator + custom validator).
[View source code](./samples/react/00%20SimpleForm)

#### Signup form

A sign up form with username, password and confirm password fields with the next validation constraints:

- username is mandatory and has to not exist on GitHub (required validator + custom validator).
- password is mandatory and has to be minimum 4 characters length (minLength validator).
- confirm password is mandatory and has to be the same value as password field (custom validator).
[View source code](./samples/react/01%20SignupForm)

#### Quiz form

A simple quiz with three options where there has to be at least one checked option to pass the validation (custom global validation).
[View source code](./samples/react/02%20QuizForm)


### jQuery examples

#### Shopping form

A little shopping form where the user has to select a product with a version and optionally apply a discount code and enter its NIF. Validations applied:

- The brand and product fields are mandatory (required validator).
- The discount code is optional but needs to have a valid format if fulfilled (pattern validator).
- NIF field is mandatory with a valid format (required validator + custom validator
[View source code](./samples/jquery/Shopping%20form)

We are looking for contributors to implement samples and support for libraries such as Angularjs, Ember... if you would like to cooperate don't hesitate contacting us.
