// **************************** Photoshop Script *************************//

// ***********************************************************************//
//
// ** [IG]_Baseline_Grid
// ** @description    Create a baseline grid for better alignment of graphic and
//                    text elements in your layout.
//                    Read following for better understanding of baseline
//                    grid concept
//                    http://alistapart.com/article/settingtypeontheweb/
//                    http://www.teehanlax.com/blog/designing-faster-with-a-baseline-grid/
//
// **
// ** @author         Igor Grinchesku <igor.grinchesku@gmail.com>
// ** @github         https://github.com/Arahnoid/IG-Photoshop-Scripts
// ** @date           July 29, 2014
// ** @require        Adobe Photoshop CS5, or higher
// ** @instalation    https://github.com/Arahnoid/IG-Photoshop-Scripts
//
// ***********************************************************************//

<javascriptresource> // Setup script appearance in File > Scripts menu
    <name>$$$/JavaScripts/[IG]_Baseline_Grid/Menu=[IG] Baseline Grid</name>
    <category>IG</category>
    <enableinfo>true</enableinfo>
</javascriptresource>

#target photoshop
app.bringToFront();

// ********************************** START ******************************//

/** Store Units Settings ================================================**/
var startRulerUnits            = app.preferences.rulerUnits,
    startTypeUnits             = app.preferences.typeUnits,
    startDisplayDialogs        = app.displayDialogs;
// Set Adobe Photoshop to use pixels and display no dialogs
    app.preferences.rulerUnits = Units.PIXELS;
    app.preferences.typeUnits  = TypeUnits.PIXELS;
    app.displayDialogs         = DialogModes.NO;
/** End - Store Units Settings =============================================**/

//////////////////////////////////////////////////////////////////////////////////
// Script initial settings                                                      //
//////////////////////////////////////////////////////////////////////////////////

try{ var doc = app.activeDocument; }
	catch(e){ throw new Error ( alert('You need to have opened at least one document \n' + e.message )); }

// Get initial settings
var actLayer = doc.activeLayer,
    docH     = doc.height.value,
    docW     = doc.width.value;

// User settings
var gridCol = 'ff0000', // Grid color
    layerOp = 20,       // Grid layer opacity
    // Distance between lines
    gridLead = parseInt( prompt('Set leading for vertical guides:', 20) );

if (isNaN(gridLead)) {
    alert('Wrong value. Pleas inset a number.');
    throw { name: 'Wrong value', message: 'Pleas inset a number.' };
}
// Calculate line length what must have 80% of document width
// Calculate padding what must have 10% of document width
var lineLen = parseInt((docW / 100) * 80),
    leftPad = parseInt((docW / 100) * 10);

//////////////////////////////////////////////////////////////////
// Create Grid Folder - Grid layer - Selection - Fill selection //
//////////////////////////////////////////////////////////////////
var gGroup, gLayer;

// Check if  Guides Group exists
try{
    gGroup = doc.layerSets.getByName('[guides]');
    }catch(e){
    // Create Guides Group
    gGroup = doc.layerSets.add();
    gGroup.name = '[guides]';
}

// Check if Grid Group is locked
var gLock = gGroup.allLocked;
if (gLock){gGroup.allLocked = false;}

// Check if Guide Layer exists
try{
    gLayer = gGroup.artLayers.getByName('Vertical Spacing Grid');
    // Try clear Guide Layer
    doc.selection.selectAll();
    try{gLayer.clear();}catch(e){}
    }catch(e){
    // Create Grid Layer
    var gLayer         = doc.artLayers.add();
        gLayer.name    = 'Vertical Spacing Grid';
        gLayer.opacity = layerOp;
        // Move grid layer to guides group
        gLayer.move( gGroup, ElementPlacement.PLACEATEND );
}

// Create a set of 1px selections from top to bottom of document
for (i = gridLead; i < docH; i += gridLead) {
    // Define a square selection
    // Selection Height 1px selection Width 80%
    // Selection alignment center
    var shapeRef = [
        [leftPad, (i - 1)],
        [leftPad, i],
        [(leftPad + lineLen), i],
        [(leftPad + lineLen), (i - 1)]
    ];

    // If this is first selection make normal selection
    // Else append selection to existing one
    if (i == gridLead) {
            doc.selection.select(shapeRef);
        } else {
        doc.selection.select(shapeRef, SelectionType.EXTEND);
    }
}

// Fill the current selection with color
var fillColor = new SolidColor();
    fillColor.rgb.hexValue = gridCol;
    doc.activeLayer = gLayer;             // Set active layer to Grid Layer
    doc.selection.fill(fillColor);        // Fill
    doc.selection.deselect();             // Clear the selection
    doc.activeLayer = actLayer;           // Restore active layer
    if (gLock)(gGroup.allLocked = gLock); // Restore locked status of Grid Group

// ************************************* END ********************************//

/** Restore Units Settings ================================================ **/
    app.preferences.rulerUnits = startRulerUnits;
    app.preferences.typeUnits  = startTypeUnits;
    app.displayDialogs         = startDisplayDialogs;
/** End - Restored Units Settings ========================================= **/