
doc = app.activeDocument;  
 var Path = app.activeDocument.path; 


var baseName = doc.name
   var srcsplit = baseName.split("_");  
    if (srcsplit.length>2) {
     
           baseName = (srcsplit[0]+"_"+srcsplit[1]);
            }
baseName = baseName.split(".")[0];

ludoc = app.activeDocument;  

doc.duplicate()
mudoc =  app.activeDocument;  

mudoc.layerSets.getByName("LU").visible = false;
mudoc.layerSets.getByName("MU").visible = true;





function flatdoc() {
try {deleteHiddenLayers();} catch(e){}
        
try{  
    activeDocument.mergeVisibleLayers();  
    }catch(e){}  

convertBitDepth(8)
}

function main()
{ 
    var Name = ""
    face = ""
    if (app.activeDocument == ludoc ){
        Name = baseName + face
       ludoc.layers[0].name = Name
        }
     if (app.activeDocument == mudoc ){
          face = "_MU"
          Name = baseName + face
        mudoc.layers[0].name = Name
        }

  
   
   

    // Save as PSD
    var SaveFile = File(Path + "/" + Name +".psd"); 
    if(SaveFile.exists) SaveFile.remove(); 
    SavePSD(SaveFile);
    SaveFile = File(Path + "/" + Name +".png"); 
    if(SaveFile.exists) SaveFile.remove(); 
     sfwPNG24(SaveFile);
    
     SaveFile = File(Path + "/" + Name +".jpg"); 
    if(SaveFile.exists) SaveFile.remove(); 
    SaveJPG(SaveFile);
    
}

function SavePSD(saveFile)
{
  var psdFile = new File(saveFile);
  psdSaveOptions = new PhotoshopSaveOptions();
  psdSaveOptions.embedColorProfile = true;
  psdSaveOptions.alphaChannels = true;  
  activeDocument.saveAs(psdFile, psdSaveOptions, false, Extension.LOWERCASE);
}

function sfwPNG24(saveFile){  
var pngOpts = new ExportOptionsSaveForWeb;  
pngOpts.format = SaveDocumentType.PNG  
pngOpts.PNG8 = false;  
pngOpts.transparency = true;  
pngOpts.interlaced = false;  
pngOpts.quality = 100;  
activeDocument.exportDocument(new File(saveFile),ExportType.SAVEFORWEB,pngOpts);  

}   


function SaveJPG(saveFile)
{
  var jpgFile = new File(saveFile);
  jpgSaveOptions = new JPEGSaveOptions();
  jpgSaveOptions.quality = 12;
  jpgSaveOptions.embedColorProfile = true;   
  jpgSaveOptions.matte = MatteType.NONE; 
  jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;  
  
  activeDocument.saveAs(jpgFile, jpgSaveOptions, false, Extension.LOWERCASE);
}


function convertBitDepth(bitdepth)
{
   var id1 = charIDToTypeID( "CnvM" );
   var desc1 = new ActionDescriptor();
   var id2 = charIDToTypeID( "Dpth" );
   desc1.putInteger( id2, bitdepth );
   executeAction( id1, desc1, DialogModes.NO );
}



function deleteHiddenLayers() {
   function cTID(s) { return app.charIDToTypeID(s); };
   function sTID(s) { return app.stringIDToTypeID(s); };
   
      var desc9 = new ActionDescriptor();
      var ref8 = new ActionReference();
   ref8.putEnumerated( cTID('Lyr '), cTID('Ordn'), sTID('hidden') );
   desc9.putReference( cTID('null'), ref8 );
   executeAction( cTID('Dlt '), desc9, DialogModes.NO );
};



flatdoc()
main()
 app.activeDocument = ludoc  
 
ludoc.layerSets.getByName("LU").visible = true;
ludoc.layerSets.getByName("MU").visible = false;
flatdoc()
main()