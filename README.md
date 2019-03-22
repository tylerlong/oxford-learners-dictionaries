# Oxford Learners Dictionaries

https://www.oxfordlearnersdictionaries.com

![](./screenshot.png)

### [Download](https://github.com/tylerlong/oxford-learners-dictionaries/releases)


---

### Below is for maintainers and contributors

---


## Setup & Run

```
yarn install
yarn start
```


## Release

```
rm -rf dist
yarn build -p
GH_TOKEN=<GH_TOKEN> yarn release
```

`GH_TOKEN` is your [GitHub Personal access token](https://github.com/settings/tokens).


## Todo

- keyboard shortcut
- macOS application code signing
