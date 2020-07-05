# Technical challenges

## Biggest hurdles
The biggest challenge I encountered was the Google account login process. I tried first to use puppeteer to *launch* Chronium browser and then Chrome too. But in both cases I was unable to access my Google account:

<img width="300" src="./screenshot-user.png" />

Google has also some security against automation tool. 

<img width="300" src="./screenshot-google-sign-in.png" />

## Technical solutions
- Use [puppeteer](https://github.com/puppeteer/puppeteer/) to control Chrome browser actions 
- I can have access to Google Account profile if I start the browser with `remote-debugging-port` flag, it open a Web Socket I can then connect to with Puppeteer `connect` method
- Use [express](https://expressjs.com/), [preact](https://preactjs.com/) to serve and render the interface to prepare the automation work
- Use [pkg](https://github.com/vercel/pkg) to package the application into an executable for MacOs and Windows 
