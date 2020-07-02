# CSV To Google map

## Problem definition
When you have to create and keep up to date 200+ locations on a google map, it is not a fun task. It's repetitive, error prone and boring.
We were already using Google spreadsheet to keep customers business informations and location inside a Google spreadsheet. Because we were already maintaining the spreadsheet data, it felt like we were doing double work when updating Google map and that's why I started to build a solution to this problem.

## Product proposition
I created a program which opens your browser, start an interface where you instract the program what data it should use and where it should do the work on google map. It then start the automation process using the CSV data you provided to add your locations on google map.

<img width="300" src="./docs/screenshot-ui-setup.png" /> 
<img height="239" src="./docs/screenshot-google-map.png" />

## Biggest hardles
Where I faced most problems was to login to a google account.
I tried first to use pupeteer to *launch* chronium browser and then chrome too. But on both cases I did not have access to Google account information:

<img width="300" src="./docs/screenshot-user.png" />

Google has also some security against automation tool. 

<img width="300" src="./docs/screenshot-google-sign-in.png" />

## Technical solutions
- [puppeteer](https://github.com/puppeteer/puppeteer/) to control chrome browser actions 
- puppeteer *connect* to have access to Google account and I start the browser with `remote-debugging-port` flag to allow puppeteer to communicate with my browser through websocket.
- [express](https://expressjs.com/), [preact](https://preactjs.com/) to serve and render the interface to prepare the automation work
- [pkg](https://github.com/vercel/pkg) to package the application into an executable for MacOs and Windows 

## Setup interface
When you start the application it will render a UI in the browser

### Change google map page
Please provide a URL where you want to create the map, here a sample
`https://www.google.com/maps/d/edit?hl=en&mid=19u4WApZGuJwJGfk4_iiWQNGC8TlEXbYG&ll=54.83361322148431%2C-3.4359725000000108&z=5`

### Change data and mappings
The program is decouple from its data source, 
on the setup interfacte you can provide a **data source csv** and **data map csv**.

if you need sample data you can find them inside `./sample_data/data.csv` and you can define your mappings in `./sample_data/map.csv`.

`data map csv` uses [string-template](https://www.npmjs.com/package/string-template) to do the interpolation, follow the library template to take full advatange of the mapping functionality.

**data.csv**
```csv
Name, Surname, Postcode
Luca, Ferrari, AA00AAA
```

**map.csv**
```csv
locationName,      locationDescription
{Name} {Surname},  this is the {address}
```

**output**
```csv
locationName,  locationDescription
Luca Ferrari,  this is the AA00AAA
```

### Start program
install depedencies and start program
```
npm i
npm run build:ui # if you have UI changes
npm run app
```

### Build executable
```
npm run build
```

## Credits
Compass SVG <a href="https://www.vecteezy.com/free-vector/compass">Compass Vectors by Vecteezy</a>
