# Basic express/svelte app

## Todo

- Look into structuring your app similarly to this
  - [How I structure Express apps](https://kentcdodds.com/blog/how-i-structure-express-apps)
- Displaying images stored in gridfs
  - [stackoverflow answer](https://stackoverflow.com/questions/31197463/nodejs-display-image-stored-in-gridfs-to-html)

```js
app.get('/images/:name', function(req, res) {
    var readstream = gfs.createReadStream({
        filename: req.param('name');
    });
    res.pipe(readstream);
})
```


## Docs to remember

[multer-gridfs-storage](https://www.npmjs.com/package/multer-gridfs-storage)

[gridfs](https://www.npmjs.com/package/gridfs)

