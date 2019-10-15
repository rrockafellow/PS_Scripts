// // Written by Randall Rockafellow

/*
@@@BUILDINFO@@@ EXR CyptoMatte prep.jsx 1.0.0.0
*/


// Extracts CryptoMatte EXR File Layers into Masked Groups and Channels
// Requires EXR-IO CryptoMatte PS plugin to be able to load a CryptoMatte EXR file properly


var doc = activeDocument;

var startRulerUnits = app.preferences.rulerUnits;
var startTypeUnits = app.preferences.typeUnits;
var startDisplayDialogs = app.displayDialogs;


app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
app.displayDialogs = DialogModes.NO;

//  hide all layers
hideAll()







var totalCount = doc.width.value * doc.height.value;

var aChannelArray = new Array();
aChannelArray[0] = doc.channels.getByName("Red");
aChannelArray[1] = doc.channels.getByName("Green");
aChannelArray[2] = doc.channels.getByName("Blue");


for (var i=0 ; i < doc.artLayers.length; i++){
   //  go through all layers
    var lyrname = doc.artLayers[i].name;
    var lyr = doc.artLayers.getByName(lyrname)
    // remove .RGBA from layer names
    if (lyrname.match("CryptoMaterial")) {
        var fixname = lyrname.split(".");
        lyr.name = fixname[1];
        lyrname = fixname[1];
    
        }
    lyr.visible = true;
      doc.activeChannels = aChannelArray;
        if (aChannelArray[0].histogram[0] != totalCount){
            
    // start to create masked group based on crypto layer
	
    doc.selection.load(aChannelArray[0],SelectionType.REPLACE);
	grp1 = doc.layerSets.add() ;
	grp1.name = lyrname;
	AddMaskToGroup()

  }
	lyr.visible = false;
   
    }


app.preferences.rulerUnits = startRulerUnits;
app.preferences.typeUnits = startTypeUnits;
app.displayDialogs = startDisplayDialogs;



//  doc.artLayers.add()

//grp1 = doc.layerSets.add()
//grp1.enabledChannels



//var chanRef = doc.channels.add()
//chanRef.name = "My Channel"
//chanRef.kind = ChannelType.SELECTEDAREA
//doc.selection.store(chanRef, SelectionType.EXTEND)
//doc.selection.load(doc.channels.getByName("My Channel"),SelectionType.REPLACE);

//AddMaskToGroup()



	
	

function printHisto(){
    for (a=0; a<3 ; a++){
        $.writeln(aChannelArray[a].name);
        $.writeln(aChannelArray[a].histogram );
        
        }
    }

function addMask(){

    var idMk = charIDToTypeID( "Mk  " );
        var desc2 = new ActionDescriptor();
        var idNw = charIDToTypeID( "Nw  " );
        var idChnl = charIDToTypeID( "Chnl" );
        desc2.putClass( idNw, idChnl );
        var idAt = charIDToTypeID( "At  " );
            var ref1 = new ActionReference();
            var idChnl = charIDToTypeID( "Chnl" );
            var idChnl = charIDToTypeID( "Chnl" );
            var idMsk = charIDToTypeID( "Msk " );
            ref1.putEnumerated( idChnl, idChnl, idMsk );
        desc2.putReference( idAt, ref1 );
        var idUsng = charIDToTypeID( "Usng" );
        var idUsrM = charIDToTypeID( "UsrM" );
        var idHdAl = charIDToTypeID( "HdAl" );
        desc2.putEnumerated( idUsng, idUsrM, idHdAl );
    executeAction( idMk, desc2, DialogModes.NO );

    }

function AddMaskToGroup() {
    var id42 = charIDToTypeID( "Mk  " );
    var desc8 = new ActionDescriptor();
    var id43 = charIDToTypeID( "Nw  " );
    var id44 = charIDToTypeID( "Chnl" );
    desc8.putClass( id43, id44 );
    var id45 = charIDToTypeID( "At  " );
        var ref10 = new ActionReference();
        var id46 = charIDToTypeID( "Chnl" );
        var id47 = charIDToTypeID( "Chnl" );
        var id48 = charIDToTypeID( "Msk " );
        ref10.putEnumerated( id46, id47, id48 );
    desc8.putReference( id45, ref10 );
    var id49 = charIDToTypeID( "Usng" );
    var id50 = charIDToTypeID( "UsrM" );
    var id51 = charIDToTypeID( "RvlS" );
    desc8.putEnumerated( id49, id50, id51 );
executeAction( id42, desc8, DialogModes.NO );
}

function hideAll(){
    
for (var i=0 ; i < doc.artLayers.length; i++){
       doc.artLayers[i].visible = false;
    }
    }