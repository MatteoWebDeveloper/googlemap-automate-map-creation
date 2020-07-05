# CSV To Google map

## Problem definition
Google offer a service to create maps with location mark, having such map may be useful for instance to see where your customers are mostly concentrated in a region. When one needs to create and update 200+ location marks on a google map. It can be repetitive and error prone. Many may use Google Sheets to record customer contact information including the address data. Since one already maintains the spreadsheet, a tool that can automate the update of location record from a spreadsheet on Google Map may be a time-saver. And that's what has sparked my interest in creating a tool to address this problem. 

<div style="text-align:center;">
    <img width="300" src="./docs/screenshot-google-map.png" />
</div>

## Product proposition
I created a program which opens a browser with an interface where users can instruct the program to select and position the desired location data on Google map. It then starts the automation process using the CSV data the user provided to add the locations on google map.

<div style="text-align:center;">
    <img width="600" src="./docs/screenshot-ui-setup.png" />
</div>

## Biggest hurdles
The biggest challenge I encountered was the Google account login process. I tried first to use puppeteer to *launch* Chronium browser and then Chrome too. But in both cases I was unable to access my Google account:

<div style="text-align:center;">
<img width="300" src="./docs/screenshot-user.png" />
</div>

Google has also some security against automation tool. 

<div style="text-align:center;">
<img width="300" src="./docs/screenshot-google-sign-in.png" />
</div>

## Technical solutions
- Use [puppeteer](https://github.com/puppeteer/puppeteer/) to control Chrome browser actions 
- I can have access to Google Account profile if I start the browser with `remote-debugging-port` flag, it open a Web Socket I can then connect to with Puppeteer `connect` method
- Use [express](https://expressjs.com/), [preact](https://preactjs.com/) to serve and render the interface to prepare the automation work
- Use [pkg](https://github.com/vercel/pkg) to package the application into an executable for MacOs and Windows 

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
- Compass Vectors by <a href="https://www.vecteezy.com/free-vector/compass">Vecteezy</a>
