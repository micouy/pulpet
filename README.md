# pulpet color mixer / picker

inspired by [poulette](https://github.com/grgrdvrt/poulette).

to run just open `index.html`. checkout two different versions by un/commenting the lines:

```html
<!-- <script src="main-one-over.js"></script> -->
<script src="main-subtract.js"></script>
```


### `main-one-over.js`

in this version, the edges are sharper and the colors in the areas around points are more saturated. the downside is that the colors don't blend very well - the resulting color looks "dirty".


### `main-subtract.js`

in this version the transitions are very smooth. the colors in areas between points are not dirty at all. the downside (?) is that around each point the colors somewhat differ from the point's color (they are not as saturated with the picked color).
