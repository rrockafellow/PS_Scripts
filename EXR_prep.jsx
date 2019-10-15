// // Written by Randall Rockafellow

/*
@@@BUILDINFO@@@ EXR prep.jsx 1.0.0.3
*/

// Built to Extract RGB channels of Puzzle Matte Layers into Masked Groups and into Channels
// Will remove ".rgba" from layer names
// Added because some EXR channels were coming in with that added to the layer names
// Puzzle mattes must be name with two underscores Ex. "metal_Red_wings "  -> Red channel extracted to "metal" Green Channel extracted to "Red" etc.
// If there is no red blue or green in the puzzle matte then no layers or channels wll be created for that color
// if 3D render passes are named "DiffuseLighting" , "Reflections" "SpecularLighting" ,"Refractions" that will be set to corresponding blend mode and organized as such to rebuild a 3D render beauty

var doc = activeDocument;

var startRulerUnits = app.preferences.rulerUnits;
var startTypeUnits = app.preferences.typeUnits;
var startDisplayDialogs = app.displayDialogs;


app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
app.displayDialogs = DialogModes.NO;

//  hide all layers create black layer, Needed because some layers were transparent and exposing incorrect values
hideAll()
makeSolidFill (0, 0, 0);
var blklyr = doc.activeLayer; 
blklyr.name = "BlackLayer";
blklyr.blendMode = BlendMode.NORMAL;






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
    if (lyrname.match(".RGBA")) {
        var fixname = lyrname.split(".RGBA");
        lyr.name = fixname[0];
        lyrname = fixname[0];
         lyr.visible = false;
        }
 
  
    if (lyrname.match("_")) {
        // move matte layer as last layer
        // lyr.move(doc.artLayers[doc.artLayers.length-1],ElementPlacement.PLACEAFTER);
         // move black layer underneath matte layer
         blklyr.move( lyr,ElementPlacement.PLACEAFTER);
         lyr.visible = true;
         
        var mattes = lyrname.split("_");
        
        for (var k=0 ; k < mattes.length; k++)
            {
                doc.activeChannels = aChannelArray;
                
                    // if channel is not black then create new Channel and Masked Grouped
                    if (aChannelArray[k].histogram[0] != totalCount){
                       
                      
                                   
                        doc.selection.load(aChannelArray[k],SelectionType.REPLACE);
                        
                        grp1 = doc.layerSets.add()
                        grp1.name = mattes[k];
                        AddMaskToGroup()
                        doc.selection.load(aChannelArray[k],SelectionType.REPLACE);
                        var chanRef = doc.channels.add() ;
                        chanRef.name = mattes[k];
                        chanRef.kind = ChannelType.MASKEDAREA;

                        doc.selection.store(chanRef, SelectionType.REPLACE);
                        doc.activeLayer = lyr;
                        doc.selection.selectAll();
                        doc.selection.invert();
                        }
             
               
            }
        lyr.visible = false;
        }
   
    }

MoveMattes();
arrangeLayers()
 blklyr.visible = false;
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


function arrangeLayers() {
    
	btyLyr = doc.artLayers.getByName("RGBA");
	dLyr = doc.artLayers.getByName("DiffuseLighting");
	rflLyr = doc.artLayers.getByName("Reflections");
	sLyr = doc.artLayers.getByName("SpecularLighting");
	rfrLyr = doc.artLayers.getByName("Refractions");
	
	rfrLyr.move( dLyr,ElementPlacement.PLACEBEFORE);
	rflLyr.move( rfrLyr,ElementPlacement.PLACEBEFORE);
	sLyr.move( rflLyr,ElementPlacement.PLACEBEFORE);
	
	rfrLyr.blendMode = BlendMode.LINEARDODGE;
	rflLyr.blendMode = BlendMode.LINEARDODGE;
	sLyr.blendMode = BlendMode.LINEARDODGE;
	btyLyr.visible = true;
	dLyr.visible = true;
    }
	
	

function MoveMattes() {
    for (var i =doc.artLayers.length -1 ; i > 0 ; i--){
         
          var last = doc.artLayers.length -1;
          var lastLyr = doc.artLayers[last];
          var mlyr = doc.artLayers[i];
           var mname = mlyr.name;

      
                if (mname.match("_")) {
                
                     mlyr.move( lastLyr,ElementPlacement.PLACEAFTER);
                }    
        
        }
    }

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

function renameLayer(newName){  
    // Renames a Layer
var idsetd = charIDToTypeID( "setd" );
    var desc1 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref1 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref1.putEnumerated( idLyr, idOrdn, idTrgt );
    desc1.putReference( idnull, ref1 );
    var idT = charIDToTypeID( "T   " );
        var desc2 = new ActionDescriptor();
        var idNm = charIDToTypeID( "Nm  " );
        desc2.putString( idNm,newName );
    var idLyr = charIDToTypeID( "Lyr " );
    desc1.putObject( idT, idLyr, desc2 );
executeAction( idsetd, desc1, DialogModes.NO );
}


function makeSolidFill(redC,greenC,blueC){  
  // =======================================================  
    var idMk = charIDToTypeID( "Mk  " );  
        var desc15 = new ActionDescriptor();  
        var idnull = charIDToTypeID( "null" );  
            var ref4 = new ActionReference();  
            var idcontentLayer = stringIDToTypeID( "contentLayer" );  
            ref4.putClass( idcontentLayer );  
        desc15.putReference( idnull, ref4 );  
        var idUsng = charIDToTypeID( "Usng" );  
            var desc16 = new ActionDescriptor();  
            var idType = charIDToTypeID( "Type" );  
                var desc17 = new ActionDescriptor();  
                var idClr = charIDToTypeID( "Clr " );  
                    var desc18 = new ActionDescriptor();  
                    var idRd = charIDToTypeID( "Rd  " );  
                    desc18.putDouble( idRd, redC);//Red variable  
                    var idGrn = charIDToTypeID( "Grn " );  
                    desc18.putDouble( idGrn, greenC);//green variable  
                    var idBl = charIDToTypeID( "Bl  " );  
                    desc18.putDouble( idBl, blueC );//blue variable  
                var idRGBC = charIDToTypeID( "RGBC" );  
                desc17.putObject( idClr, idRGBC, desc18 );  
            var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );  
            desc16.putObject( idType, idsolidColorLayer, desc17 );  
        var idcontentLayer = stringIDToTypeID( "contentLayer" );  
        desc15.putObject( idUsng, idcontentLayer, desc16 );  
    executeAction( idMk, desc15, DialogModes.NO );    
    
    }  