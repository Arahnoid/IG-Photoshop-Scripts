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

try{ var doc = app.activeDocument; }
    catch(e){ throw new Error ( alert('You need to have opened at least one document \n' + e.message )); }

// ********************************** START **********************************//

/** Create Dialog ===========================================================**/
function numericVal (str) {
    var regex = /[^0-9]/g;
        str   = parseInt(str.replace(regex, ''));
        if (str > 100) {str = 100;}
         //else if (isNaN(str)) {str = 20;}
    return str;
}

function selectedRadoButton (radioButtons) {
    for (var i = 0; i < radioButtons.children.length; i++) {
        if (radioButtons.children[i].value === true){
        var radioboxColor = radioButtons.children[i].text;
        switch (radioboxColor) {
            case 'Red':{
                radioboxColor = 'ff0000';
                break;
            }
            case 'Green':{
                radioboxColor = '00ff00';
                break;
            }
            case 'Blue':{
                radioboxColor = '0000ff';
                break;
            }
            case 'Black':{
                radioboxColor = '000000';
                break;
            }
        }
        return radioboxColor;
        }
    }
}

var w = new Window ('dialog', 'Create basegrid.');
    w.alignChildren = 'left';

// Baseline panel -----------------------------------------------------------
var baselinePanel  = w.add ('panel', undefined, 'Interline spacing (px)');
var leadGrp = baselinePanel.add ('group');
var leadSla = leadGrp.add ('slider', undefined, 20, 0, 100);
var leadVal = leadGrp.add ('edittext', [0, 0, 30, 20], leadSla.value, {multiline: false, scrolling: false});

leadSla.onChanging = function () {
    leadSla.value = parseInt(leadSla.value);
    leadVal.text  = leadSla.value;
};

leadVal.onChanging = function () {
    var leadingInteger = numericVal(leadVal.text);
    leadSla.value = leadingInteger;
    leadVal.text  = leadingInteger;
};

// Opacity panel ------------------------------------------------------------
var opacityPanel = w.add ('panel', undefined, 'Grid opacity (%)');
var opGrp  = opacityPanel.add ('group');
var opSla  = opGrp.add ('slider', undefined, 20, 0, 100);
var opVal  = opGrp.add ('edittext', [0, 0, 30, 20], opSla.value, {multiline: false, scrolling: false});

opSla.onChanging = function () {
    opSla.value = parseInt(opSla.value);
    opVal.text  = opSla.value;
};

opVal.onChanging = function () {
    var opacityInteger = numericVal(opVal.text);
    opSla.value = opacityInteger;
    opVal.text  = opacityInteger;
};

// Color panel --------------------------------------------------------------
var colorPanel = w.add ('panel', undefined, 'Grid color');
var colorGrp  = colorPanel.add ('group');
colorGrp.orientation = 'column';
colorGrp.align = 'left';
colorGrp.alignChildren = 'left';
colorGrp.add ('radiobutton', undefined, 'Red');
colorGrp.add ('radiobutton', undefined, 'Green');
colorGrp.add ('radiobutton', undefined, 'Blue');
colorGrp.add ('radiobutton', undefined, 'Black');
colorGrp.children[0].value = true;

// Buttons
var buttonGroup = w.add ('group');
    buttonGroup.alignment = 'right';
var ok_btn     = buttonGroup.add ('button', undefined, 'Create', {name:'ok'});
var cancel_btn = buttonGroup.add ('button', undefined, 'Cancel', {name:'cancel'});

ok_btn.onClick = function () {
    var gridColor = selectedRadoButton (colorGrp);
    w.close( );
    main(leadSla.value, opSla.value, gridColor);
};
w.show ( );

/** End - Dialog ============================================================**/

function main(gridLead, layerOp, gridCol){
    /** Store Units Settings ================================================**/
    var startRulerUnits            = app.preferences.rulerUnits,
        startTypeUnits             = app.preferences.typeUnits,
        startDisplayDialogs        = app.displayDialogs;
    // Set Adobe Photoshop to use pixels and display no dialogs
        app.preferences.rulerUnits = Units.PIXELS;
        app.preferences.typeUnits  = TypeUnits.PIXELS;
        app.displayDialogs         = DialogModes.NO;
    /** End - Store Units Settings ==========================================**/

    // Get document properties
    var actLayer = doc.activeLayer,
        docH     = doc.height.value,
        docW     = doc.width.value;

    if (isNaN(gridLead)) {
        alert('Wrong interline value. Pleas inset a number.');
        throw { name: 'Wrong interline value', message: 'Pleas inset a number.' };
    }
    if (isNaN(layerOp)) {
        alert('Wrong opacity value. Pleas inset a number.');
        throw { name: 'Wrong opacity value', message: 'Pleas inset a number.' };
    }
    // Calculate line length what must be 80% of document width
    // Calculate padding what must be 10% of document width
    var lineLenght = parseInt((docW / 100) * 80),
        leftPadding = parseInt((docW / 100) * 10);

    // - Create guides folder
    // - Create grid layer
    // - Create selection
    // - Fill selection
    var guideGroup, guideLayer;

    // Check if Guides Group exists
    try{
        guideGroup = doc.layerSets.getByName('[guides]');
        }catch(e){
        // Create Guides Group
        guideGroup = doc.layerSets.add();
        guideGroup.name = '[guides]';
    }

    // Check if Grid Group is locked
    var guideGroupLocked = guideGroup.allLocked;
    if (guideGroupLocked){guideGroup.allLocked = false;}

    // Collect layers with matching name using regular expression
    var nameEXP = /\bBaseline Grid\s-\s[0-9]{2}\spx/g;
    var layersCollection = [];
    for (var l = 0; l < guideGroup.artLayers.length; l++) {
        if (nameEXP.test(guideGroup.artLayers[l].name)) {
            layersCollection.push(guideGroup.artLayers[l].name);
        }
    }

    // If 'Baseline Grid - %n px' layer exists
    if(layersCollection[0] !== undefined) {
        guideLayer = guideGroup.artLayers.getByName(layersCollection[0]);
        guideLayer.opacity = layerOp;
        guideLayer.name = 'Baseline Grid - ' + gridLead +' px';
        // Try clear Guide Layer
         doc.selection.selectAll();
        try{guideLayer.clear();}catch(e){}
    } else {
        // If 'Baseline Grid - %n px' layer not found
        // create 'Baseline Grid - %n px' layer
        guideLayer         = doc.artLayers.add();
        guideLayer.name    = 'Baseline Grid - ' + gridLead +' px';
        guideLayer.opacity = layerOp;
        // Move grid layer to guides group
        guideLayer.move( guideGroup, ElementPlacement.PLACEATEND );
    }

    // Create a set of 1px selections from top to bottom of document
    for (i = gridLead; i < docH; i += gridLead) {
        // Define a square selection
        // Selection Height 1px selection Width 80%
        // Selection alignment center
        var shapeRef = [
            [leftPadding, (i - 1)],
            [leftPadding, i],
            [(leftPadding + lineLenght), i],
            [(leftPadding + lineLenght), (i - 1)]
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
        doc.activeLayer = guideLayer;      // Set active layer to Grid Layer
        doc.selection.fill(fillColor);     // Fill
        doc.selection.deselect();          // Clear the selection
        doc.activeLayer = actLayer;        // Restore active layer
        // Restore locked status of Grid Group
        if (guideGroupLocked)(guideGroup.allLocked = guideGroupLocked);

    // ********************************** END ********************************//

    /** Restore Units Settings ============================================= **/
        app.preferences.rulerUnits = startRulerUnits;
        app.preferences.typeUnits  = startTypeUnits;
        app.displayDialogs         = startDisplayDialogs;
    /** End - Restored Units Settings ====================================== **/
}