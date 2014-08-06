// **************************** Photoshop Script *************************//

// ***********************************************************************//
//
// ** [IG]_Cleanup_document
// ** @description    Remove from document:
//                    - Guides
//                    - Layer comps
//                    - Alpha Chanels
//                    - Patch items
//
// **
// ** @author         Igor Grinchesku <igor.grinchesku@gmail.com>
// ** @github         www.
// ** @date           August 7, 2014
// ** @require        Adobe Photoshop CS5, or higher
// ** @instalation    www.
//
// ***********************************************************************//

<javascriptresource> // Setup script appearance in File > Scripts menu
    <name>$$$/JavaScripts/[IG]_Cleanup_document/Menu=[IG] Cleanup_document</name>
    <category>IG</category>
    <enableinfo>true</enableinfo>
</javascriptresource>;

// #target photoshop
// app.bringToFront();

// ********************************** START ******************************//
/** Store Units Settings ===================================================**/
var startRulerUnits            = app.preferences.rulerUnits,
    startTypeUnits             = app.preferences.typeUnits,
    startDisplayDialogs        = app.displayDialogs;
// Set Adobe Photoshop to use pixels and display no dialogs
    app.preferences.rulerUnits = Units.PIXELS;
    app.preferences.typeUnits  = TypeUnits.PIXELS;
    app.displayDialogs         = DialogModes.NO;
/** End - Store Units Settings =============================================**/


// Setting doc variable
try {
    var doc = app.activeDocument;
} catch (e) {
    throw new Error(alert('You need to have opened at least one document'));
}
///////////////////////////////////////////////////////////////////////////////
// Script
///////////////////////////////////////////////////////////////////////////////

if (app.documents.length > 0) { // If any document is opened
    var doc = app.activeDocument;
    var answer = confirm('This script woll remove: \n Cayer Comps,\n All Guides, Aditionsl Alpha canels in Chanels palette,\n Path Items', false, 'Clean document!');

    // If user agree do
    if (answer) {
        doc.layerComps.removeAll(); // Remove Layer Comps
        doc.chanels.removeAll();    // Remove all chanels
        doc.pathItems.removeAll();  // Remove Path items
        clearGuides();
    }
}

//===========================================================================//
// Functions
//===========================================================================//

function clearGuides() { // Remove Guides
    var idDlt = charIDToTypeID('Dlt ');
    var desc5 = new ActionDescriptor();
    var idnull = charIDToTypeID('null');
    var ref1 = new ActionReference();
    var idGd = charIDToTypeID('Gd  ');
    var idOrdn = charIDToTypeID('Ordn');
    var idAl = charIDToTypeID('Al  ');
    ref1.putEnumerated(idGd, idOrdn, idAl);
    desc5.putReference(idnull, ref1);
    executeAction(idDlt, desc5, DialogModes.NO);
}
/** Restore Units Settings ================================================ **/
    app.preferences.rulerUnits = startRulerUnits;
    app.preferences.typeUnits  = startTypeUnits;
    app.displayDialogs         = startDisplayDialogs;
/** End - Restored Units Settings ========================================= **/