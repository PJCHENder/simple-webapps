# Simple-webapps README

## Note

### Express
- 慣例上會把 run server 的指令放在 `./bin/www` 這支檔案



## dependencies

### cross-env
用來解決跨系統（windows） `NODE_ENV` 的問題

在 shell 中使用 `cross-env` 關鍵字

```shell
cross-env NODE_ENV=production
```

### debug

用來在 terminal 中標示訊息，類似 `console.error()` 的效果

```jsx
// app.js
const debug = require('debug')('<VAR>')
debug('hello Debugger')
```

在 shell 中

```shell
DEBUG=<VAR>,<VAR2> node app.js
```

### morgan

express 中使用的 logger，可在伺服器運作時於 terminal 中顯示 req 和 res 的紀錄。

### serve-favicon

將 favicon.ico 儲存在記憶體中，避免每次 request 時都要讀檔。

```jsx
// app.js
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
```
