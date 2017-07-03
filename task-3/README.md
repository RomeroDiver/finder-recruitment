# Interactive table

> Front End Code Test (Advanced JavaScript)

This test should provide you with the opportunity to demonstrate your JavaScript skills, as well as some capabilities
with UI layout and functionality.

Depending upon whether you are already comfortable with [React](https://facebook.github.io/react/), it will also allow
you to demonstrate either your level of mastery, or, your ability to pick up the basics of something new. Your starting
level of familiarity will be taken into consideration.

You may make use of any additional technologies you feel are appropriate.

## The Brief

You are to consume a [mock service](#mock-service), and use it to produce an HTML table displaying rows of pets. The
table should be interactive, with controls to *Filter* and *Sort*.

* **Table:**
  * Columns: Animal, Colour, Pattern, Rating, Price
* **Filter By:**
  * Animals: Checkboxes
  * Price: Slider
* **Sort By:**
  * Rating
  * Price

## Setup

#### `npm install`

Fire up a minimal React setup.

#### `npm start`

Launch a local dev server.

## To Get You Started...

To help you focus on the task at hand, you have been provided with a bit of a kickstart. Please feel free to modify or
extend any of the included starting files in order to demonstrate your skills and fulfil the brief.

#### Mock Service

A mock service is provided by `service.js`. A `Promise` is returned by `petService.fetch()`, which will randomly
resolve with either a varying array of pet objects, or reject with an error string. View `Table.js` for example usage.

While in development, if you find the service returns errors too regularly to allow you to focus, please feel free to adjust the provided mock code, and adjust back once you are happy with your solution.
