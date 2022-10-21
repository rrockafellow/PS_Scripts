// Dialog box  - Tile Size  - resolution #Tiles Horz  Vertical   #Create Slices




/*
docWidthInInches = 4
docHeightInInches= 4
resolution = 300
docName = "Tile Test"
*/
w = new UnitValue(4,"in");

var dlg = new Window('dialog', "Tile Image Slicer");



var myTpanel = dlg.add('panel', undefined, "Number of Tiles:");
var myTileXlbl = myTpanel.add('statictext', undefined, "Tile in X:");
var myTileX = myTpanel.add('edittext', undefined, "6");
var myTileYlbl = myTpanel.add('statictext', undefined, "Tile in Y:");
var myTileY = myTpanel.add('edittext', undefined, "6");

var myPanel = dlg.add('panel', undefined, "Tile Size:");
var myTileSizelbl = myPanel.add('statictext', undefined, "unit size:");
var myTileSize = myPanel.add('edittext', undefined, "1200");
myTileSize.characters = 10;
myTileSize.active = true;
var myUnitslbl = myPanel.add('statictext', undefined, "units:");
var myUnits = myPanel.add('dropdownlist', undefined, ['px', 'in']);
myUnits.selection = 0;
var myReslbl = myPanel.add('statictext', undefined, "DPI Resolution:");
var myRes = myPanel.add('edittext', undefined, "300");
var myGroup = dlg.add("group")
myGroup.alignment = "right"
var btnCreate = myGroup.add("button",undefined,"Create Document");
myGroup.add("button",undefined,"Close");
btnCreate.addEventListener("click", function(k) {onCreate (k) });

//dlg.panel.alignChildren = "fill";
function newSlice( top, right, bottom, left ) {

    // =======================================================
    var idMk = charIDToTypeID( "Mk  " );
        var desc9 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref3 = new ActionReference();
            var idslice = stringIDToTypeID( "slice" );
            ref3.putClass( idslice );
        desc9.putReference( idnull, ref3 );
        var idUsng = charIDToTypeID( "Usng" );
            var desc10 = new ActionDescriptor();
            var idType = charIDToTypeID( "Type" );
            var idsliceType = stringIDToTypeID( "sliceType" );
            var iduser = stringIDToTypeID( "user" );
            desc10.putEnumerated( idType, idsliceType, iduser );
            var idAt = charIDToTypeID( "At  " );
                var desc11 = new ActionDescriptor();
                var idTop = charIDToTypeID( "Top " );
                var idPxl = charIDToTypeID( "#Pxl" );
                desc11.putUnitDouble( idTop, idPxl, top );
                var idLeft = charIDToTypeID( "Left" );
                var idPxl = charIDToTypeID( "#Pxl" );
                desc11.putUnitDouble( idLeft, idPxl, left );
                var idBtom = charIDToTypeID( "Btom" );
                var idPxl = charIDToTypeID( "#Pxl" );
                desc11.putUnitDouble( idBtom, idPxl, bottom );
                var idRght = charIDToTypeID( "Rght" );
                var idPxl = charIDToTypeID( "#Pxl" );
                desc11.putUnitDouble( idRght, idPxl, right );
            var idRctn = charIDToTypeID( "Rctn" );
            desc10.putObject( idAt, idRctn, desc11 );
        var idslice = stringIDToTypeID( "slice" );
        desc9.putObject( idUsng, idslice, desc10 );
    executeAction( idMk, desc9, DialogModes.NO );

}
function onCreate(k) {
    builddoc(Number (myTileSize.text), Number (myRes.text),Number (myTileX.text),Number (myTileY.text), myUnits.selection.text)

    }

function builddoc (tsize,res,tileX,tileY,tunits){
    var wsize = tileX * tsize;
    var hsize = tileY * tsize;
    var w = new UnitValue(wsize,tunits);
    var h =  new UnitValue(hsize,tunits);
   app.documents.add(w,h,res,"TileImage")
   
   doc = app.activeDocument;  
    for ( var i=0; i < tileX; i++ ) {
        
        for ( var j=0; j <  tileX; j++ ) {
             var top = j*tsize,
                    right = (i+1)*tsize,
                    bottom =  (j+1)*tsize,
                    left = i*tsize;
             newSlice( top, right, bottom, left );
   
    }
}
}

dlg.show();






if (dlg.show == 1){
    // ok    

 








    }







// app.documents.add(w,w,resolution,"HiThere")

