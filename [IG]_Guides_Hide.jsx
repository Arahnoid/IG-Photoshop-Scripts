// [IG]_Guides_Hide - Adobe Photoshop Script
// Requirements: Adobe Photoshop CS5, or higher
// Description: Hide / Unhide [guides] group if group is missing it will be created
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
// 3. Choose File > Scripts > [IG]_Guides_Hide
// ============================================================================

// Setup script appearance in File > Scripts menu 
<javascriptresource>
	<name>$$$/JavaScripts/[IG]_Guides_Hide/Menu=[IG] Guides Hide</name>
	<category>IG</category>
	<enableinfo>true</enableinfo>
</javascriptresource>

var doc = app.activeDocument;

try{
	var gridLayer = doc.layers.getByName ("[guides]");
		gridLayer.visible = !(gridLayer.visible);
}catch(e){
	// Create  Guides Group
    gGroup = doc.layerSets.add();
    gGroup.name = "[guides]";
}