// **************************** Photoshop Script *************************//

// ***********************************************************************//
//
// ** [IG]_Save_For_Web
// ** @description    Save for web portion of document what is selected with
//                    marquee tool. Berore it will be saved the trimm operation
//                    will be aplyed to transparent pixelsx. If no selection
//                    then entire document will be saved.
// **
// ** @author         Igor Grinchesku <igor.grinchesku@gmail.com>
// ** @github         www.
// ** @date           August 6, 2014
// ** @require        Adobe Photoshop CS5, or higher
// ** @instalation    www.
//
// ***********************************************************************//

<javascriptresource> // Setup script appearance in File > Scripts menu
<name>$$$/JavaScripts/[IG] _Save_For_Web/Menu=[IG] Save For Web</name>
    <category>IG</category>
	<enableinfo>true</enableinfo>
</javascriptresource>;

#target photoshop
app.bringToFront();

// ********************************** START ******************************//

if (app.documents.length) { // Document exists
	var doc = app.activeDocument;
	try { // Selection exists
		var bounds = app.activeDocument.selection.bounds;
		// Get with and height of  image
		var xtop = bounds[0],
			ytop = bounds[1],
			xbot = bounds[2],
			ybot = bounds[3],
			nDocWidth = xbot - xtop,
			nDocHeigh = ybot - ytop;

		// Create new document
		var newDoc = app.documents.add(
			nDocWidth,
			nDocHeigh,
			72,
			'TempDoc',
			NewDocumentMode.RGB,
			DocumentFill.TRANSPARENT);

		// Paste image from clipboard into new document
		newDoc.paste();
		// Trim transparent pixels
		newDoc.trim(TrimType.TRANSPARENT, true, true, true, true);
		// Display dialog windows
		displayDialogs = DialogModes.ALL;

		// Create default file object and open save for web dialog
		WEBFile = new File('file');
		app.activeDocument.exportDocument(WEBFile, ExportType.SAVEFORWEB);
		app.displayDialogs = DialogModes.NO; // Hide dialog windows

		// Close Temp document without saving
		newDoc.close(SaveOptions.DONOTSAVECHANGES);

	} catch (e) { // No selection
		displayDialogs = DialogModes.ALL; // Display dialog windows

		// Create default file object and open save for web dialog
		WEBFile = new File('file');
		app.activeDocument.exportDocument(WEBFile, ExportType.SAVEFORWEB);
		app.displayDialogs = DialogModes.NO; // Hide dialog windows

		// Close Temp document without saving
		newDoc.close(SaveOptions.DONOTSAVECHANGES);
	}
} else { // No document
	alert('No opened document to work with.');
}
//** End of script ====================================================== **//