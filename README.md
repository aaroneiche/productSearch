# Aaron's Product Search Demo!

Welcome to my product search demo repository.

## Setup

A few things to do before you can get started/run locally:

* Get a Walmart Open API key. (Try here: https://developer.walmartlabs.com/page)
* `npm install`: This will install the dependencies.
* Setup an `app-settings` file for API key - this keeps the API key out of the repo.
    * Create a file called `app-settings` in the root directory
    * Put the contents in the section below in your file, and replace with a valid API key.
    * Bring the file into your dev environment. In a terminal, type:  `source app-settings`

### Configuration file contents

This is a template of environment settings that should go into the `app-settings`
file noted above.

```BASH
export APIKEY="YOURKEYHERE"
export RATEMIN="300"
```

## Running

You should be able to run the application with the command `npm start`.
