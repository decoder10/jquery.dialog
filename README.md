JQUERY DIALOG
==========

jquery dialog plugin 

Version
----

0.2.0

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
    <div id="dialog">Jquery Dialog plugin</div>
```

JavaScript part

```sh
<script>
	$(function() {
			$('#button').dialog({
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


Events

|  Event             | Description     |
|--------------------|-----------------|
|  dialog.beforeShow | call befor show |
|  dialog.afterShow  | call after show |
|  dialog.beforHide  | call befor hide |
|  dialog.afterHide  | call after hide |


License
----

MIT
