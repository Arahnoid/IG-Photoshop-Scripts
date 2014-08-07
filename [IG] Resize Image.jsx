// **************************** Photoshop Script ************************* //

// *********************************************************************** //
//
// ** [IG]_Resize_Image
// ** @description    Scale image down if its maximum height or width is
//                    bigger than user defined.
//                    Script will:
//                    - Preserve image proportions
//                    - Trim transparent pixels
//                    - Trim image by top left color
//
// ** @author         Igor Grinchesku <igor.grinchesku@gmail.com>
// ** @github         www.
// ** @date           August 7, 2014
// ** @require        Adobe Photoshop CS5, or higher
// ** @instalation    www.
//
// *********************************************************************** //

<javascriptresource> // Setup script appearance in File > Scripts menu
    <name>$$$/JavaScripts/[IG]_Resize_Image/Menu=[IG] Resize_Image</name>
    <category>IG</category>
    <enableinfo>true</enableinfo>
</javascriptresource>;

// #target photoshop
app.bringToFront();
// ********************************** START ****************************** //

// Define here maximum Width and Height of image
var maxW = 40, //px
	maxH = 50, //px
    trimImage = true; // true | false

/** Store Units Settings ===================================================**/
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

var doc = app.activeDocument,
    file = getFileNameAndExtension(doc.name),
	ext = file[1];

/** Trim and resize images ================================================ **/

// convert gif color mode to rgb
if (doc.mode == DocumentMode.INDEXEDCOLOR && ext.toLowerCase() == 'gif') {
    doc.changeMode(ChangeMode.RGB);
}
if (trimImage) {
    trim();
}
scaleDownW(maxW);
scaleDownH(maxW);

/** Save For Web ========================================================== **/

switch (ext.toLowerCase()) {
    case 'png':
        {
            savePNG(file[0]);
            break;
        }
    case 'jpg':
        {
            saveJPG(file[0]);
            break;
        }
    case 'gif':
        {
            saveGIF(file[0]);
            break;
        }
}

// ********************************** END ******************************** //

/** Restore Units Settings ================================================ **/
if (docUnits !== undefined) {
    app.preferences.rulerUnits = startRulerUnits;
    // app.preferences.typeUnits  = startTypeUnits;
    app.displayDialogs         = startDisplayDialogs;
}
/** End - Restored Units Settings ========================================= **/


///////////////////////////////////////////////////////////////////////////////
// Functions                                                                 //
///////////////////////////////////////////////////////////////////////////////

function trim() {
	try { // Trim transparent pixel
		doc.trim(TrimType.TRANSPARENT, true, true, true, true);
	} catch (e) {}
	try { // Trim by color of top left pixel
		doc.trim(TrimType.TOPLEFT, true, true, true, true);
	} catch (e) {}
}

function scaleDownH(maxH) {
	// Scale down by Height
	var dHeith = doc.height.value;
	if (dHeith > maxH) {
		doc.resizeImage(undefined, maxH, undefined, ResampleMethod.BICUBIC);
	}
}

function scaleDownW(maxW) {
	// Scale down by Width
	var dWidth = doc.width.value;
	if (dWidth > maxW) {
		doc.resizeImage(maxW, undefined, undefined, ResampleMethod.BICUBIC);
	}
}

function getFileNameAndExtension(filename) {
	return filename.split('.');
}

function savePNG(filename) {
	var path, folder, savefile, opts;
    	path = doc.path;
	    folder = Folder(path + '/assets/');

	if (!folder.exists) {
		folder.create();
	}

	var saveFile = File(folder + '/' + filename + '.png');
	// Options
	opts = new ExportOptionsSaveForWeb();
	opts.format = SaveDocumentType.PNG;
	opts.PNG8 = false;
	opts.transparency = true;
	opts.interlaced = false;
	opts.quality = 100;
	opts.includeProfile = false;
	// Export
	doc.exportDocument(saveFile, ExportType.SAVEFORWEB, opts);
	// Close document
	doc.close(SaveOptions.DONOTSAVECHANGES);
}

function saveGIF(filename) {
	var path, folder, savefile, opts;
	path = doc.path;
	folder = Folder(path + '/assets/');

	if (!folder.exists) {
		folder.create();
	}

	var saveFile = File(folder + '/' + filename + '.gif');
	// Options
	opts = new ExportOptionsSaveForWeb();
	opts.format = SaveDocumentType.COMPUSERVEGIF;
	opts.colors = 128;
	opts.dither = Dither.PATTERN;
	opts.ditherAmount = 100;
	opts.interlaced = false;
	opts.matte = MatteType.NONE;
	opts.palette = Palette.LOCALSELECTIVE;
	opts.transparency = true;
	// Export
	doc.exportDocument(saveFile, ExportType.SAVEFORWEB, opts);
	// Close document
	doc.close(SaveOptions.DONOTSAVECHANGES);
}

function saveJPG(filename) {
	var path, folder, savefile, opts;
	path = doc.path;
	folder = Folder(path + '/assets/');

	if (!folder.exists) {
		folder.create();
	}

	var saveFile = File(folder + '/' + filename + '.jpg');
	// Options
	opts = new ExportOptionsSaveForWeb();
	opts.format = SaveDocumentType.JPEG;
	opts.PNG8 = false;
	opts.interlaced = false;
	opts.quality = 66;
	opts.includeProfile = false;
	// Export
	doc.exportDocument(saveFile, ExportType.SAVEFORWEB, opts);
	// Close document
	doc.close(SaveOptions.DONOTSAVECHANGES);
}