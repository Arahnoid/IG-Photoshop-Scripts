// [IG]_Save_For_Web - Adobe Photoshop Script
// Requirements: Adobe Photoshop CS5, or higher
// Description: Save selected region
// Version: 1.0, July 29, 2014
// Author: Igor Grinchesku
// Website:
//
// ============================================================================
// Installation:
// 1.For x86 bit OS place script in
//          "C:\Program Files\Adobe\Adobe Photoshop #\Presets\Scripts\"
//   For x64 bit OS depending of Photoshop bit version path may be
//      Photoshop x86 - "C:\Program Files (x86)\Adobe\Adobe Photoshop #\Presets\Scripts\"
//      Photoshop x64 - "C:\Program Files\Adobe\Adobe Photoshop #\Presets\Scripts\"
// 2. Restart Photoshop
// 3. Choose File > Scripts > [IG] Save For Web
// ============================================================================

<javascriptresource>
	<name>$$$/JavaScripts/[IG]_Save_For_Web/Menu=[IG] Save For Web</name>
	<category>IG</category>
	<enableinfo>true</enableinfo>
</javascriptresource>


//Save image for web
try
{
    app.displayDialogs  = DialogModes.NO;
    var docRef = app.activeDocument; // Refference document
        docRef.selection.copy(true); // Copy mereged

    var bounds = []; // Take selection bounds
        bounds = activeDocument.selection.bounds;

    //get with and height of  image
    var xtop = bounds[0],
        ytop = bounds[1],
        xbot = bounds[2],
        ybot = bounds[3],
        nDocWidth =xbot - xtop,
        nDocHeigh =ybot - ytop;

    //create new document
    var newDoc = app.documents.add(nDocWidth, nDocHeigh, 72, "TempDoc", NewDocumentMode.RGB, DocumentFill.TRANSPARENT);

    //Paste
    newDoc.paste();

    //trim
    newDoc.trim(TrimType.TRANSPARENT, true, true, true, true);

    //display dialog windows
    displayDialogs = DialogModes.ALL;

    //create default file name does not metter but metod bellow ask for it
    WEBFile = new File( "file");

    //SaveForWeb
    app.activeDocument.exportDocument(WEBFile, ExportType.SAVEFORWEB);
    //Hide dialog windows
    app.displayDialogs  = DialogModes.NO;

    //Close Temp document without saving
    newDoc.close(SaveOptions.DONOTSAVECHANGES);

}
catch(e)
{
    try
    {
	    //display dialog windows
	    displayDialogs = DialogModes.ALL;

	    //create default file name does not metter but metod bellow ask for it
	    WEBFile = new File( "file");

	    //SaveForWeb
	    app.activeDocument.exportDocument(WEBFile, ExportType.SAVEFORWEB);
	    //Hide dialog windows
	    app.displayDialogs  = DialogModes.NO;

	    //Close Temp document without saving
	    newDoc.close(SaveOptions.DONOTSAVECHANGES);
	    }catch(er){}
}
//End of script