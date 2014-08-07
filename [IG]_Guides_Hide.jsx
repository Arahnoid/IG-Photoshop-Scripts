// **************************** Photoshop Script *************************//

// ***********************************************************************//
//
// ** [IG]_Guides_Hide
// ** @description    Show / Hide group named [guides]. If group doesn't
// **                 exist it will be created.
// **
// ** @author         Igor Grinchesku <igor.grinchesku@gmail.com>
// ** @github         https://github.com/Arahnoid/IG-Photoshop-Scripts
// ** @date           August 5, 2014
// ** @require        Adobe Photoshop CS5, or higher
// ** @instalation    https://github.com/Arahnoid/IG-Photoshop-Scripts
//
// ***********************************************************************//

<javascriptresource> // Setup script appearance in File > Scripts menu
<name>$$$/JavaScripts/[IG] _Guides_Hide/Menu=[IG] Guides Hide</name>
    <category>IG</category>
	<enableinfo>true</enableinfo>
</javascriptresource>;

// ********************************** START ******************************//

var doc = app.activeDocument;

try {
	var gridLayer = doc.layers.getByName('[guides]');
	gridLayer.visible = !(gridLayer.visible);
} catch (e) {
	// Create  Guides Group
	gGroup = doc.layerSets.add();
	gGroup.name = '[guides]';
}