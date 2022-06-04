# How to run localserver

`npm run serverstart`

**If there is an error with Port already being in use**
1. go to bin
2. go to www file
3. find `var port = normalizePort(process.env.PORT || '3001');` 
4. change ```3001``` to another port
