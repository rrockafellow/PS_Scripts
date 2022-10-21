var doc = app.activeDocument;

var startRulerUnits = app.preferences.rulerUnits;
var startTypeUnits = app.preferences.typeUnits;
var startDisplayDialogs = app.displayDialogs;

 var docname = app.activeDocument.name;
         docname = docname.split(".")[0];

app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
app.displayDialogs = DialogModes.NO;

var LayersforExport = new Array();

for (var i=0 ; i < doc.artLayers.length; i++){
   //  go through all layers
    var lyrname = doc.artLayers[i].name;
    var lyr = doc.artLayers.getByName(lyrname)
    // remove .RGBA from layer names
    if (lyrname.match(".RGBA")) {
        var fixname = lyrname.split(".RGBA");
        lyr.name = fixname[0];
        lyrname = fixname[0];
         lyr.visible = false;
        }
    }
	
for (var i=0 ; i < doc.artLayers.length; i++){
   //  go through all layers
    var lyrname = doc.artLayers[i].name;
    var lyr = doc.artLayers.getByName(lyrname)
    // remove .RGBA from layer names
    if (lyrname.match("RGBMatte")) {
       
        lyr.name  = docname + "_" +lyrname;
        LayersforExport[0] = lyr
        }
	if (lyrname.match("Spec_lu")) {
       
        lyr.name  = docname + "_LUspec";
         LayersforExport[1] = lyr
        }	
		if (lyrname.match("Spec_mu")) {
       
        lyr.name  = docname + "_MUspec";
         LayersforExport[2] = lyr
        }	
		
    }
	
	hideAll()
var blklyr = doc.artLayers.add();
blklyr.name = "BlackLayer";
blklyr.blendMode = BlendMode.NORMAL;
doc.selection.selectALL

//blklyr.move(doc.artLayers.getByName("Layer 1"),ElementPlacement.PLACEAFTER)
var colorRef = new SolidColor
colorRef.rgb.red = 0;
colorRef.rgb.green = 0;
colorRef.rgb.blue = 0;
doc.selection.fill(colorRef);
	blklyr.move(doc.artLayers[doc.artLayers.length-1],ElementPlacement.PLACEAFTER)

	
	pngSaveOptions = new PNGSaveOptions()
	
	
	
	for (m in LayersforExport)
	{
		LayersforExport[m].visible = true
		var destFileName = LayersforExport[m].name + ".png";
	    var Path = decodeURI(activeDocument.path);  
		var SaveFile = File(Path + "/" + destFileName); 
        sfwPNG24(SaveFile);  
		LayersforExport[m].visible = false
	}
	
	
function hideAll(){
    
for (var i=0 ; i < doc.artLayers.length; i++){
       doc.artLayers[i].visible = false;
    }
    }
	
function sfwPNG24(saveFile){  
var pngOpts = new ExportOptionsSaveForWeb;  
pngOpts.format = SaveDocumentType.PNG  
pngOpts.PNG8 = false;  
pngOpts.transparency = false;  
pngOpts.interlaced = false;  
pngOpts.quality = 100;  
activeDocument.exportDocument(new File(saveFile),ExportType.SAVEFORWEB,pngOpts);  

}   