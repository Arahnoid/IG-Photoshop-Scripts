// **************************** Photoshop Script ************************* //

// *********************************************************************** //
//
// ** [IG]_Sprite_CSS_Generator
// ** @description    Script is useful for making CSS for sprites.
// 					  Script displays a prompt window with information about
//                    layer or selection:
//                    - Position Top left X Y
//                    - Width and Height
//                    Information is displayed copy-past ready for *.css
// **
// ** @author         Igor Grinchesku <igor.grinchesku@gmail.com>
// ** @contributor    Markiyan Pyts
// ** @github         https://github.com/Arahnoid/IG-Photoshop-Scripts
// ** @date           August 7, 2014
// ** @require        Adobe Photoshop CS5, or higher
// ** @instalation    https://github.com/Arahnoid/IG-Photoshop-Scripts
//
// *********************************************************************** //

<javascriptresource> // Setup script appearance in File > Scripts menu
    <name>$$$/JavaScripts/[IG]_Sprite_CSS_Generator/Menu=[IG] Sprite CSS Generator</name>
    <category>IG</category>
    <enableinfo>true</enableinfo>
</javascriptresource>;

#target photoshop
app.bringToFront();

// ********************************** START ****************************** //

/** Store Units Settings ================================================== **/
var docUnits;
if (preferences.rulerUnits != Units.PIXELS) {
    var startRulerUnits            = app.preferences.rulerUnits,
        // startTypeUnits             = app.preferences.typeUnits,
        startDisplayDialogs        = app.displayDialogs;
    // Set Adobe Photoshop to use pixels and display no dialogs
        app.preferences.rulerUnits = Units.PIXELS;
        // app.preferences.typeUnits  = TypeUnits.PIXELS;
        app.displayDialogs         = DialogModes.NO;
}
/** End - Store Units Settings ============================================ **/

try {
	try {
		var bounds = app.activeDocument.selection.bounds.length;
		getSelectionInfo();
	} catch (e) {
		getLayerInfo();
	}
} catch (e) {
	alert(e);
}


/** Restore Units Settings ================================================ **/
if (docUnits !== undefined) {
    app.preferences.rulerUnits = startRulerUnits;
    // app.preferences.typeUnits  = startTypeUnits;
    app.displayDialogs         = startDisplayDialogs;
}
/** End - Restored Units Settings ========================================= **/


/////////////////////////////////////////////////////////////////////////////
// Functions
/////////////////////////////////////////////////////////////////////////////

// Get size and position of selected layer
function getLayerInfo() {
	var doc = app.activeDocument.activeLayer,
		xtop = doc.bounds[0].value,
		ytop = doc.bounds[1].value,
		xbot = doc.bounds[2].value,
		ybot = doc.bounds[3].value,
		layerHeight = ybot - ytop,
		layerWidth = xbot - xtop;
	prompt(
		// Prompt text
		'Layer name: ' + doc.name +
		'\nLayer \t\tW: ' + layerWidth + '\t\tH: ' + layerHeight +
		'\nPosition\t\tX: ' + xtop +     '\t\tY: ' + ytop,
		// Prompt input box text
		'width: '  + layerWidth  + 'px; ' +
		'height: ' + layerHeight + 'px; ' +
		'background-position: -'+xtop+'px -'+ytop+'px; ' +
		'top: '    + ytop +'px; ' +
		'left: '   + xtop + 'px;');
}

// Get size and position of selection
function getSelectionInfo() {
	var selectionRef = app.activeDocument.selection,
		xtop = selectionRef.bounds[0].value,
		ytop = selectionRef.bounds[1].value,
		xbot = selectionRef.bounds[2].value,
		ybot = selectionRef.bounds[3].value,
		selectionHeight = ybot - ytop,
		selectionWidth = xbot - xtop;
	prompt(
		// Prompt text
		'Selection properties: \n' +
		'Size \t\tW:' + selectionWidth + '\t\tH:' + selectionHeight +
		'\nPosition\t\tX:' + xtop + '\t\tY:' + ytop,
		// Prompt input box text
		'width: '  + selectionWidth + 'px; ' +
		'height: ' + selectionHeight + 'px; ' +
		'background-position: -' + xtop+'px -'+ytop+'px; ' +
		'top: '    + ytop +'px; ' +
		'left: '   + xtop + 'px;');
}