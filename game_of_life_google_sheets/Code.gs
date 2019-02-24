var WIDTH = 50;
var HEIGHT = 25;

function makeArray(d1, d2) {
    var arr = [];
    for(i = 0; i < d2; i++) {
        arr.push(new Array(d1));
    }
    return arr;
}

function getCell(backgrounds, x, y)
{
  if (x<0 || x>=WIDTH || y<0 || y>=HEIGHT)
    return 0;
  
  if (backgrounds[y][x] == "#000000")
    return 1;
  
  return 0;
}

function play() {
  var sheet = SpreadsheetApp.getActiveSheet();

  var gameState = makeArray(WIDTH, HEIGHT);

  var backgrounds = sheet.getRange(1, 1, HEIGHT, WIDTH).getBackgrounds();

  for(var i=0; i<1000000; i++)
  {

    for(var y=0; y<HEIGHT; y++)
      for(var x=0; x<WIDTH; x++)
      {
        var neighbours = 0;
        neighbours += getCell(backgrounds, x-1, y-1);
        neighbours += getCell(backgrounds, x, y-1);
        neighbours += getCell(backgrounds, x+1, y-1);
        
        neighbours += getCell(backgrounds, x-1, y);
        neighbours += getCell(backgrounds, x+1, y);
        
        neighbours += getCell(backgrounds, x-1, y+1);
        neighbours += getCell(backgrounds, x, y+1);
        neighbours += getCell(backgrounds, x+1, y+1);
        
        if (backgrounds[y][x] == '#000000' && (neighbours < 2 || neighbours > 3))
        {
          gameState[y][x] = '#ffffff';
          sheet.getRange(y+1, x+1).setBackground('#ffffff');
        }
        else if (backgrounds[y][x] == '#ffffff' && neighbours == 3)
        {
          gameState[y][x] = '#000000';
          sheet.getRange(y+1, x+1).setBackground('#000000');
        }
        else
          gameState[y][x] = backgrounds[y][x];
      }

    for(var y=0; y<HEIGHT; y++)
      for(var x=0; x<WIDTH; x++)
      {
        backgrounds[y][x] = gameState[y][x];
      }
    
    SpreadsheetApp.flush();
    
  }
  


}

