# Snurra
Snurra - A JS spinner

[Demo and documentation.](http://www.tomasgreen.se/snurra/)


## P.S

Apparently this library does not work with IE, at all. I'll get to the JS bugs at some point but for now the biggest issue is animated SVG-files, they simply won't work in IE or Edge. However, the original spinner does work with edge since I've ported it to HTML, if you want to use your own spinner I'd suggest you do the same.


### Snurra and destroy!

Requires no setup of fancy classes or containers and leaves nothing behind once destroyd.

```js
var btn = document.getElementById('myButton');
var s = Snurra(btn);
/* do something useful */
get('my api call',function(data){
    /* finish up and destroy*/
    s.destroy();
    /* all done */
});
```

### Want to do it the hard way?

Pass an element or string as first argument and an object with your options in the other.

```js
var btn = Snurra('#myButton',{
    autoStart: false
});
btn.start();
get('my api call',function(data){
    /* finish up and save your instance for later use */
    btn.stop();
});
```

### How about...
The built in tap-event works well with desktop and touch devices.

```js
Snurra.globals.autoStart = false;
var btn = Snurra('#myButton');
btn.onTap(function(ev){
    get('my api call',function(data){
        btn.stop();
    });
});
```

### Custom SVGs
Add your own image to the stack and use it as a default.

```js
Snurra.addSpinner('static/bubbles.svg',true);
Snurra.gobals.maxSize = 40;
```

### Style with CSS
Change colors and more with CSS.

```css
.btn-red .snurra-img {
    fill: yellow
}
```
