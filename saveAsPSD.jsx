

function main()
{ 

    var Name = app.activeDocument.name.replace(/\.[^\.]+$/, ''); 
    var Ext = decodeURI(app.activeDocument.name).replace(/^.*\./,''); 
   // if(Ext.toLowerCase() != 'psd') return;

    // assumes the file has already been saved
    var Path = app.activeDocument.path; 

    // Save as PSD
    var SaveFile = File(Path + "/" + Name +".psd"); 
    if(SaveFile.exists) SaveFile.remove(); 
    SavePSD(SaveFile);
}

function SavePSD(saveFile)
{
  var psdFile = new File(saveFile);
  psdSaveOptions = new PhotoshopSaveOptions();
  psdSaveOptions.embedColorProfile = true;
  psdSaveOptions.alphaChannels = true;  
  activeDocument.saveAs(psdFile, psdSaveOptions, false, Extension.LOWERCASE);
}

main(); 