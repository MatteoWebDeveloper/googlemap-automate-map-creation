# Get started 

## setup `.env` file
create on the root project a file `.env` and the following line:
```
CHROME_EXE_PATH = "{executable path}"
```
replace the `"{executable path}"` with the relevant browser executable path.
You can easily find if you open the on chrome `chrome://version/` they show it under `Executable Path`

## start program
```
npm start
```

# Problem definition
When you use chronium or *launch* your chrome browser is not possible to login to google map.
<img width="300" src="./docs/screenshot-user.png" />

Google has also some security against automation tool.
<img width="300" src="./docs/screenshot-google-sign-in.png" />

If you run your browser with `remote-debugging-port` flag is possible to connect pupeeter and chrome with websocket.