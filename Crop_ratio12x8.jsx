// Get the active document and make a new selection.

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// in case we double clicked the file
// app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

var origUnits = app.preferences.rulerUnits;

app.preferences.rulerUnits = Units.PIXELS;

 var docRef = app.activeDocument;
 var WidthRatio = 12;
 var HeightRatio = 8;
 var boundTop;
 var boundLeft;
 var boundRight;
 var boundBottom;

  
// Image's aspect ratio is greater than the desired ratio
// so crop out left and right areas of the Image
if ((docRef.width / docRef.height) > (WidthRatio/ HeightRatio))
{
 boundTop = 0;
 boundLeft = ((docRef.width - (docRef.height * (WidthRatio/HeightRatio))) / 2);
 boundBottom = docRef.height;
 boundRight = ((docRef.width + (docRef.height * (WidthRatio/HeightRatio))) / 2);
 bounds = new Array(boundLeft,boundTop,boundRight,boundBottom);
 docRef.crop(bounds);
}

// Image's aspect ratio is less than the desired ratio
// so crop out top and bottom areas of the Image
if ((docRef.width / docRef.height) < (WidthRatio/ HeightRatio))
{
 boundTop = ((docRef.height - (docRef.width * (HeightRatio/WidthRatio))) / 2);
 boundLeft = 0;
 boundBottom = ((docRef.height + (docRef.width * (HeightRatio/WidthRatio))) / 2);
 boundRight = docRef.width;
 bounds = new Array(boundLeft,boundTop,boundRight,boundBottom);
 docRef.crop(bounds);
}

// bounds = new Array(10, 10, app.activeDocument.width - 10, app.activeDocument.height - 10);
// docRef.crop(bounds);

 boundTop = null;
 boundLeft = null;
 boundRight = null;
 boundBottom = null;
 WidthRatio = null;
 HeightRatio = null;
 docRef = null;

app.preferences.rulerUnits = origUnits;