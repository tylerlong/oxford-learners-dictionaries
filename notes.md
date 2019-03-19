# notes

## window.webPreferences.nodeIntegration

```js
mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
        nodeIntegration: false
    }
})
```

If you set this to `true`, you app might not be able to display online web page properly.

Because online web pages are designed to be run in browser instead of node.

I tried to set it to `true` and https://www.oxfordlearnersdictionaries.com complains that it could not resolve `$`.


## webpack.config.babel.js & @babel/register

If you want to use ES6 features in your webpack config file, you can name it `webpack.config.babel.js`

Pay attention that it won't work if you don't install `@babel/register`.

And you should also have `.babelrc`:

```js
{
  "presets": [
    "@babel/preset-env"
  ]
}
```
