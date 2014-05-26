JQUERY DIALOG
==========

jquery dialog plugin 

Version
----

0.1.1

How to use
--------------

Connect jQuery library and jquery.dialog.js script files

```sh
<script src="jquery.min.js"></script>
<script src="jquery.dialog.js"></script>
```

Connect CSS file dialog.css

```sh
<link rel="styleshet" href="dialog.css" />
```

HTML part
```sh
    <a href="" data-dialog="#dialog" id="button">dialog</a>
    <div id="dialog">Jquery Dialog plugin</a>
```

JavaScript part

```sh
<script>
	$(function() {
			$('#vutton').dialog({
				show: "fade",
				showSpeed: 500
			});
		});
</script>
```

Options

|  Option    | Values           | Description                     |
|------------|------------------|---------------------------------|
|  show      | none  <br/> fade | appear animation type           |
|  showSpeed | int              | animation speed                 |
|  hide      | none  <br/> fade | disappear animation type        |
|  hideSpeed | int              | animation speed                 |



License
----

MIT
