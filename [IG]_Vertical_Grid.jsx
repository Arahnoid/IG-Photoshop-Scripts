// [IG]_Vertical_Grid - Adobe Photoshop Script
// Requirements: Adobe Photoshop CS5, or higher
// Recommendations: To use this script in together with [IG]_Guides_Hide script
// Description: Create horizontal lines to serve as guides for vertical
//              spacing alignment.
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
// 3. Choose File > Scripts > [IG]_Vertical_Grid
// ============================================================================


// Setup script appearance in File > Scripts menu
<javascriptresource>
	<name>$$$/JavaScripts/[IG]_Vertical_Grid/Menu=[IG] Vertical Grid</name>
	<category>IG</category>
	<enableinfo>true</enableinfo>
</javascriptresource>

#target photoshop
app.bringToFront();

///////////////////////////////////////////////////////////////////////////////
// Save current preferences
///////////////////////////////////////////////////////////////////////////////

var startRulerUnits = app.preferences.rulerUnits;
var startTypeUnits = app.preferences.typeUnits;
var startDisplayDialogs = app.displayDialogs;

// Set Adobe Photoshop to use pixels and display no dialogs
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
app.displayDialogs = DialogModes.NO;

///////////////////////////////////////////////////////////////////////////////
// Script initial settings
///////////////////////////////////////////////////////////////////////////////

try{ var doc = app.activeDocument; }
	catch(e){ throw new Error ( alert("You need to have opened at least one document \n" + e.message )); }

// Get initial settings
actLayer = doc.activeLayer;
var docH = doc.height.value,
    docW = doc.width.value;

// User settings
var gridCol, layerOp, pr, gridLead;
    gridCol = "ff0000";             // Grid color
    layerOp = 20;                   // Grid layer opacity
    // distance between lines
    gridLead = prompt("Set leading for vertical guides:", 20);
    gridLead = parseInt(gridLead);  // convert string to integer

// Calculate line length what must have 80% of document width
// Calculate padding what must have 10% of document width
var lineLen = parseInt((docW / 100) * 80);
var leftPad = parseInt((docW / 100) * 10);

///////////////////////////////////////////////////////////////////////////////
// Create Grid Folder - Grid layer - Selection - Fill selection
///////////////////////////////////////////////////////////////////////////////

var gGroup, gLayer;

try{ // Check if  Guides Group exists
    gGroup = doc.layerSets.getByName("[guides]");
    }catch(e){
    // Create Guides Group
    gGroup = doc.layerSets.add();
    gGroup.name = "[guides]";
}

// check if Grid Group is locked
    var gLock = gGroup.allLocked;
    if (gLock){gGroup.allLocked = false;}

try{ // Check if Guide Layer exists
    gLayer = gGroup.artLayers.getByName("Vertical Spacing Grid");
    // try clear Guide Layer
    doc.selection.selectAll();
    try{gLayer.clear();}catch(e){}
    }catch(e){
    // create Grid Layer
    var gLayer         = doc.artLayers.add();
        gLayer.name    = "Vertical Spacing Grid";
        gLayer.opacity = layerOp;
        // move grid layer to guides group
        gLayer.move( gGroup, ElementPlacement.PLACEATEND );
}


// Create a set of 1px selections
// from top to bottom of document
for (i = gridLead; i < docH; i += gridLead) {
    // define a square selection
    // selection Height 1px selection Width 80%
    // selection alignment center
    var shapeRef = [
        [leftPad, (i - 1)],
        [leftPad, i],
        [(leftPad + lineLen), i],
        [(leftPad + lineLen), (i - 1)]
    ];

    // if this is first selection make normal selection
    // else append selection to existing one
    if (i == gridLead) {
            doc.selection.select(shapeRef);
        } else {
        doc.selection.select(shapeRef, SelectionType.EXTEND);
    }
}

// Fill the current selection with color
var fillColor = new SolidColor();
    fillColor.rgb.hexValue = gridCol;
    // set active layer to Grid Layer
    doc.activeLayer = gLayer;
    // Fill
    doc.selection.fill(fillColor);
    // Clear the selection
    doc.selection.deselect();
    // restore active layer
    doc.activeLayer = actLayer;

    // restore locked status of Grid Group
    if (gLock)(gGroup.allLocked = gLock);
///////////////////////////////////////////////////////////////////////////////
// Restore preferences
///////////////////////////////////////////////////////////////////////////////
app.preferences.rulerUnits = startRulerUnits;
app.preferences.typeUnits = startTypeUnits;
app.displayDialogs = startDisplayDialogs;