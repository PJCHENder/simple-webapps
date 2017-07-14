###### tags: `readme`, `simple-webapps`, `api-server`

# [README] API-SERVER @ Simple-webapps

## Note

### Express
- 慣例上會把 run server 的指令放在 `./bin/www` 這支檔案


## dependencies

### body-parser

#### 說明

`body-parser` 會根據配在 `Header` 配對到的 `Content-Type` 將傳入的 request bodies 解析，並存入 `req.body` 中以供使用；當沒有 body 被解析、沒有配對到的 `Content-Type` 或者發生錯誤時，則 `req.body` 會是空物件(`{}`)。

如果沒有使用這個套件，則 `req.body` 會是 `undefined`。

#### 使用方式

在特定的路由使用特定的 parser（官方建議使用方式）：

```jsx
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
 
// create application/json parser 
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies 
app.post('/login', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  res.send('welcome, ' + req.body.username)
})
 
// POST /api/users gets JSON bodies 
app.post('/api/users', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  // create user in req.body 
})
```

#### bodyParser.json(options)

會去解析 Header 的 Content-Type 為 `application/json` 的內容，並放到 `req.body` 中。

預設限制大小是 100kb。

#### bodyParser.urlencoded(options)

會去解析 Header 的 Content-Type 為 `application/x-www-form-urlencoded` 的內容，並放到 `req.body` 中。

在 `extended` 選項中，如果設為 `true` 會使用 `qs library`；設為 `false` 則會使用 `querystring library`。預設限制大小是 100kb。

### cookie-parser

會解析 Cookie header 並將內容存在 `req.cookies` 中


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

### nodemon

nodemon 會監控資料夾中的檔案，當檔案改變時會自動重新啟動 node app；若需要手動重新啟動，則在 terminal 中輸入 `rs`(restart)。

nodemon 在 cli 中使用時就類似使用 `node`

```shell
nodemon app.js
```

### serve-favicon

將 favicon.ico 儲存在記憶體中，避免每次 request 時都要讀檔。

```jsx
// app.js
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
```

### linebot

可以用來串接 line bot 的套件 

- [linebot](https://www.npmjs.com/package/linebot) @ npm
