var doc = app.activeDocument;

var startRulerUnits = app.preferences.rulerUnits;
var startTypeUnits = app.preferences.typeUnits;
var startDisplayDialogs = app.displayDialogs;


app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
app.displayDialogs = DialogModes.NO;

//  hide all layers create black layer move blk layer behind layer show layer select channel create group Add layer mask, hide layer, repeat for  next layer
hideAll()

var blklyr = doc.artLayers.add();
blklyr.name = "BlackLayer";
blklyr.blendMode = BlendMode.NORMAL;
doc.selection.selectALL

//blklyr.move(doc.artLayers.getByName("Layer 1"),ElementPlacement.PLACEAFTER)
var colorRef = new SolidColor();
colorRef.rgb.red = 0;
colorRef.rgb.green = 0;
colorRef.rgb.blue = 0;
doc.selection.fill(colorRef, ColorBlendMode.NORMAL, 100, false);



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
     if (lyrname.match(".RGB")) {
        var fixname = lyrname.split(".RGB");
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

LUspecLyr = doc.artLayers.getByName("SpecLU");
MUspecLyr = doc.artLayers.getByName("SpecMU");
    aoLyr = doc.artLayers.getByName("AO");
    nrmLyr = doc.artLayers.getByName("N");
	giLyr = doc.artLayers.getByName("GI");
	btyLyr = doc.artLayers.getByName("RGBA");
	dLyr = doc.artLayers.getByName("DiffuseLighting");
	rflLyr = doc.artLayers.getByName("Reflections");	
	sLyr = doc.artLayers.getByName("SpecularLighting");
	
	dLyr.move( doc.artLayers[0],ElementPlacement.PLACEBEFORE);
	giLyr.move( dLyr,ElementPlacement.PLACEBEFORE);
	aoLyr.move( giLyr,ElementPlacement.PLACEBEFORE);
	sLyr.move( aoLyr,ElementPlacement.PLACEBEFORE);
	rflLyr.move( sLyr,ElementPlacement.PLACEBEFORE);
	LUspecLyr.move( sLyr,ElementPlacement.PLACEBEFORE);
	btyLyr.move( dLyr,ElementPlacement.PLACEAFTER);
	
	
	sLyr.opacity = 80;
	MUspecLyr.blendMode = BlendMode.LINEARDODGE;
	LUspecLyr.blendMode = BlendMode.LINEARDODGE;
	rflLyr.blendMode = BlendMode.LINEARDODGE;
	sLyr.blendMode = BlendMode.LINEARDODGE;
	giLyr.blendMode = BlendMode.LINEARDODGE;
	aoLyr.blendMode = BlendMode.MULTIPLY;
	
	dLyr.visible = true;
	giLyr.visible = true;
	aoLyr.visible = true;
	sLyr.visible = true;
	rflLyr.visible = true;
	LUspecLyr.visible = true;
	btyLyr.visible = true;
	
	nLyr = doc.artLayers.getByName("N");
	LUmatLyr  = doc.artLayers.getByName("LU+Outline_LU+Ribbing_LU+Details");
	MUmatLyr  = doc.artLayers.getByName("MU+Outline_MU+Ribbing_MU+Details");
	objmatLyr  = doc.artLayers.getByName("Tread_Tire_Wheel");
	MatMatteLyr  = doc.artLayers.getByName("WheelInner_mat2_mat3");
	
	
	 nLyr.visible =false;
	// LUmatLyr.visible = false;
	// MUmatLyr.visible = false;
	 MUspecLyr.visible = false;
	// Tread_Tire_Wheel.visible = false;
	// WheelInner_mat2_mat3.visible = false;
	
	mylayerSet = doc.layerSets.add();
    mylayerSet.name = "Mattes"
   
		
	LUmatLyr.move (mylayerSet, ElementPlacement.PLACEATEND);
	MUmatLyr.move (mylayerSet, ElementPlacement.PLACEATEND);
	MatMatteLyr.move (mylayerSet, ElementPlacement.PLACEATEND);
	objmatLyr.move (mylayerSet, ElementPlacement.PLACEATEND);
	nLyr.move (mylayerSet, ElementPlacement.PLACEATEND);
	//LUmatLyr.move(doc.layerSets[1], ElementPlacement.INSIDE)
	//MUmatLyr.move(doc.layerSets[1], ElementPlacement.INSIDE)
	
	//objmatLyr.move(doc.layerSets[1], ElementPlacement.INSIDE)


    mylayerSet.moveAfter(btyLyr);
	mylayerSet.visible = false;
	
    mulayerSet = doc.layerSets.add();
    mulayerSet.name = "MU"
    
    lulayerSet = doc.layerSets.add();
    lulayerSet.name = "LU"
    
     LUspecLyr.move (lulayerSet, ElementPlacement.PLACEATEND);
      MUspecLyr.move (mulayerSet, ElementPlacement.PLACEATEND);
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