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

// BEGIN__HARVEST_EXCEPTION_ZSTRING

<javascriptresource>
<name>$$$/JavaScripts/[IG]_Guides_Hide/Menu=[IG] Guides Hide</name>
    <category>IG</category>
	<enableinfo>true</enableinfo>
	<eventid>8cc65895-ba76-4b45-8ea9-04c1e7023112</eventid>
</javascriptresource>

// END__HARVEST_EXCEPTION_ZSTRING

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
