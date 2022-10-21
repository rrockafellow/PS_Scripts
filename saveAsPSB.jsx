

function main()
{ 

    var Name = app.activeDocument.name.replace(/\.[^\.]+$/, ''); 
    var Ext = decodeURI(app.activeDocument.name).replace(/^.*\./,''); 
   // if(Ext.toLowerCase() != 'psd') return;

    // assumes the file has already been saved
    var Path = app.activeDocument.path; 

    // Save as PSD
    var SaveFile = File(Path + "/" + Name +".psb"); 
    if(SaveFile.exists) SaveFile.remove(); 
    saveAsPSB(SaveFile);
}

function SavePSD(saveFile)
{
  var psdFile = new File(saveFile);
  psdSaveOptions = new PhotoshopSaveOptions();
  psdSaveOptions.embedColorProfile = true;
  psdSaveOptions.alphaChannels = true;  
  activeDocument.saveAs(psdFile, psdSaveOptions, false, Extension.LOWERCASE);
}

function saveAsPSB( filePath ) {  
  function cTID(s) { return app.charIDToTypeID(s); };  
  //function sTID(s) { return app.stringIDToTypeID(s); };  
  
  var desc7 = new ActionDescriptor();  
  var desc8 = new ActionDescriptor();  
  desc7.putObject( cTID('As  '), cTID('Pht8'), desc8 );  
  desc7.putPath( cTID('In  '), new File( filePath ) );  
  desc7.putBoolean( cTID('LwCs'), true );  
  executeAction( cTID('save'), desc7, DialogModes.NO );  
};  


main(); 