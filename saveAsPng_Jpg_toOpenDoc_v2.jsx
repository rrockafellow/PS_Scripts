

function main()
{ 


	pngSaveOptions = new PNGSaveOptions()
	
    var Name = app.activeDocument.name.replace(/\.[^\.]+$/, ''); 
    var Ext = decodeURI(app.activeDocument.name).replace(/^.*\./,''); 
   // if(Ext.toLowerCase() != 'psd') return;

    // assumes the file has already been saved
    var Path = app.activeDocument.path; 

    // Save as PSD
   // var SaveFile = File(Path + "/" + Name +".psd"); 
    //if(SaveFile.exists) SaveFile.remove(); 
 //   SavePSD(SaveFile);
	// Save as Png
	  var SaveFile = File(decodeURI(Path) + "/" + Name +".png"); 
    sfwPNG24(SaveFile); 
	
	 var SaveFile = new File(decodeURI(Path) + "/" + Name +".jpg"); 
	
	 saveJPEG( app.activeDocument, SaveFile, 10 );

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

function SavePSD(saveFile)
{
  var psdFile = new File(saveFile);
  psdSaveOptions = new PhotoshopSaveOptions();
  psdSaveOptions.embedColorProfile = true;
  psdSaveOptions.alphaChannels = true;  
  activeDocument.saveAs(psdFile, psdSaveOptions, false, Extension.LOWERCASE);
}

function saveJPEG( doc, saveFile, qty ) {
     var saveOptions = new JPEGSaveOptions( );
     saveOptions.embedColorProfile = true;
     saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
     saveOptions.matte = MatteType.NONE;
     saveOptions.quality = qty; 
     doc.saveAs( saveFile, saveOptions, true );
}

while (documents.length > 0) {

main(); 

app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
	 
}



