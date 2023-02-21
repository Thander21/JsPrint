// aimsPrint.js
/*
* JavaScript template file for ArcIMS HTML Viewer
* dependent on aimsXML.js, ArcIMSparam.js, aimsCommon.js, aimsMap.js,
* aimsLayers.js, aimsDHTML.js
* aimsClick.js, aimsNavigation.js,
* aimsLegend.js
*/

var printDPI = 300; // BB: printer DPI--may be overridden by print form
var printHeight = 0; // BB: default print dimensions
var printWidth = 0; // BB
var printScale = 0; // BB: RF scale (1:x number) for printing
var INCH_TO_MAP_UNITS = 69 * 63360 // BB: inches in one map unit -- converts DPI to scale
// NOTE that for decimal-degree map, scale is only correct in x or y
// due to convergence of meridians toward the poles!

aimsPrintPresent=true;
var printTitle = titleList[4];
var printMapURL="";
var printOVURL="";
var printLegURL="";
var legVis2=false;
//Print functions

// display print form
function printIt() {
hideLayer("measureBox");
if (useTextFrame) {
parent.TextFrame.document.location = "printform.htm";
} else {
var Win1 = open("printform.htm","PrintFormWindow","width=575,height=150,scrollbars=yes,resizable=yes");
}
}

// create web page for printing
// first get Map
function getPrintMap(title, w, h) {
var tLeft, tRight, tBottom, tTop;
showRetrieveMap();
printTitle=title;

legVis2=legendVisible;
if (aimsLegendPresent) legendVisible=true;

// BB: set print size to input values
if (w != "") printWidth = parseInt(w);
if (h != "") printHeight = parseInt(h);

// BB: set map extent if scale specified
tLeft = eLeft;
tRight = eRight;
tBottom = eBottom;
tTop = eTop;


//BB: set XMLMode so get print res.
XMLMode = 101;
// BB: enlarge legend in proportion to map
var tempLegW = legWidth;
var tempLegH = legHeight;
legWidth = parseInt(printWidth/4);
legHeight = parseInt(printWidth/3);


if (printWidth == 1000){

legLayerfontsize=12;
legSwatchheight=16;
legSwatchwidth=20;

}

if (printWidth == 2200){

legLayerfontsize=14;
legSwatchheight=18;
legSwatchwidth=22;

}

if (printWidth == 3000){

legLayerfontsize=16;
legSwatchheight=20;
legSwatchwidth=24;

}

var theString = writeXML();

eLeft = tLeft;
eRight = tRight;
eBottom = tBottom;
eTop = tTop;
legWidth = tempLegW; // BB: restore default leg vars
legHeight = tempLegH; // BB
legendVisible = legVis2;
sendToServer(imsURL,theString,101);
theString=null;
}

// second, get OVMap
function getPrintOV() {
var tempWidth = i2Width;
var tempHeight = i2Height;
i2Width=parseInt(printWidth/4); //BB: scale to print
i2Height=parseInt(printHeight/4); // BB: scale to print
var tempDraw=drawOVExtentBox;
drawOVExtentBox=true;
XMLMode = 102;
var theString = writeOVXML();
drawOVExtentBox=tempDraw;
i2Width=tempWidth;
i2Height = tempHeight;
sendToServer(imsOVURL,theString,102);
tempWidth=null;
tempHeight=null;
theString=null;
}
// third, get Legend
function getPrintLegend() {
if (printLegURL=="") printLegURL = "images/nolegend.gif";
writePrintPage();
}

// fourth, write the web page
function writePrintPage() {
var Win1 = open("","PrintPage");
Win1.document.writeln('<html><meta http-equiv="Content-Type" content="text/html; charset=' + charSet + '"><head>');
Win1.document.writeln(' <title>' + titleList[5] + '</title>');
Win1.document.writeln('</head>');
Win1.document.writeln('<body BGCOLOR="White" TEXT="Black" LEFTMARGIN=0 TOPMARGIN=0>');
Win1.document.writeln('<FONT FACE="Arial"><B>');

Win1.document.writeln('<TABLE BORDER="3" CELLSPACING="0" CELLPADDING="0" NOWRAP>'); //BB: omit width
Win1.document.writeln(' <TR>');
Win1.document.writeln(' <TH COLSPAN="2" style="font-size:' + parseInt(printWidth/20) + 'px">' + printTitle + '</TH>'); // BB: scale title
Win1.document.writeln(' </TR>');
Win1.document.writeln(' <TR>');
Win1.document.write(' <TD');
if (hasOVMap) Win1.document.write(' ROWSPAN="2"');
Win1.document.writeln('>');
Win1.document.writeln(' <IMG SRC="' + printMapURL + '" WIDTH=' + printWidth + ' HEIGHT=' + printHeight + ' HSPACE=0 VSPACE=0 BORDER=0 ALT="Main map">'); //BB: set size
Win1.document.writeln(' </TD>');
if (hasOVMap) {
Win1.document.writeln(' <TD height="' + parseInt(printHeight/4) + '" valign="top">'); //BB: set size
Win1.document.writeln(' <IMG SRC="' + printOVURL + '" WIDTH=' + parseInt(printWidth/4) + ' HEIGHT=' + parseInt(printHeight/4) + ' HSPACE=0 VSPACE=0 BORDER=0 ALT="Overview">'); // BB: set size
Win1.document.writeln(' </TD>');
}
Win1.document.writeln(' </TR>');
Win1.document.writeln(' <TR>');
Win1.document.writeln(' <TD ALIGN="CENTER" VALIGN="TOP">');
Win1.document.write(' <span style="font-size:' + parseInt(printWidth/40) + 'px">');
Win1.document.writeln(legTitle + '</span><br><br> '); // BB: add Legend title, set size
Win1.document.write(' <IMG SRC="' + printLegURL + '" HSPACE=0 VSPACE=0 BORDER=0 ALT="Legend"');
Win1.document.writeln(' width="' + parseInt(printWidth/4) + '" >'); // BB: set size
Win1.document.writeln(' </TD>');
Win1.document.writeln(' </TR>');

Win1.document.writeln('</TABLE>');
Win1.document.writeln('</B></FONT>');
Win1.document.writeln('</body></html>');
Win1.document.close();

legendVisible=legVis2;
Win1=null;
hideRetrieveMap();
printWidth = 0;
printScale = 0;

} 