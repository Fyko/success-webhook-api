# 🏆 Success Webhook API
Instead of packaging your success webhook URL with you application, have your program post to this success webhook API to prevent your success webhook being exposed and spammed by douchebags.

## Usage
> Let this repo be an inspiration. It should give you the rough idea of how to make a success endpoint on your API.
### Authentication
Authentication is handled in [authentication.ts](https://github.com/Fyko/success-webhook-api/blob/master/src/app/util/authentication.ts). Here, you can manage some sort of connection to your database and request provided `Authorization` header every request.
### Embeds
[Embeds](https://discordapp.com/developers/docs/resources/channel#embed-object) are recived from the POST request body.
I strongly reccomend you send the checkout data to the endpoint and build it here instead of sending the embed itself.

## Demo
The package manager for this project is [pnpm](https://pnpm.js.org/), but the same commands will work with `npm` or `yarn`
1) Run `pnpm install` to install dependencies
2) Rename `.env.example` to `.env` and update all the variables (LICENSE_KEY is what you'll set your header to in the test file)
4) Input your LICENSE_KEY from above into the request header on line 27 of [tests/index.js](https://github.com/Fyko/success-webhook-api/blob/master/tests/index.js#L27)
5) Run `pnpm start` to start the webserver
6) Run `node tests/index.js` to start spamming the API with success requests

## Contributing
1. [Fork](https://github.com/fyko/success-webhook-api/fork)!
2. Clone! - `git clone https://github.com/johndoe/success-webhook-api`
3. Make new branch! - `git checkout -b my-feature`
4. Commit! - `git commit -am 'I did something!'`  
\- ensure your commit message follows the [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)
5. Push it! - `git push origin my-feature`
6. [Pull it](https://github.com/fyko/success-webhook-api/compare)!
7. Shake it!  

## Author
**Success Webhook API** by Carter "Fyko" Himmel
> Fyko#0001

## License
Licensed under the Apache 2.0 License
