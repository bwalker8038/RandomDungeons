var RoomType = {
    Normal: 0,
    Entrance: 1,
    Boss: 2,
    Empty: 3
};
var TileType = {
    Floor: 0,
    Wall: 1,
    Door: 2,
    Pillar: 3
};

var MapHeight = 10;
var MapWidth = 10;
var RoomHeight = 10;
var RoomWidth = 10;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function GenerateRoom(options)
{
	var room = {};
	if(options && options.type)
	{
		room.type = options.type;
	}
	else
	{
		room.type = getRandomInt(0,3);
	}
	room.tiles = [];

	for(var i = 0; i < RoomWidth * RoomHeight; i++)
	{
		room.tiles[i] = {};
		room.tiles[i].type = getRandomInt(0,4);
		room.tiles[i].col = i % RoomWidth;
		room.tiles[i].row = Math.floor(i/RoomWidth)
	}
	return room;
}
function GenerateBranch(map, startCol, startRow)
{
	if(map.rooms[startRow * MapWidth + startCol].type != RoomType.Empty)
	{
		return;
	}
	else
	{
		map.rooms[startRow * MapWidth + startCol] = GenerateRoom();
		var decision = getRandomInt(0,4);

		switch(decision) 
		{
			case 0:
				GenerateBranch(map, startCol--, startRow);
				break;
			case 1:
				GenerateBranch(map, startCol, startRow--);
				break;
			case 2:
				GenerateBranch(map, startCol++, startRow);
				break;
			case 3:
				GenerateBranch(map, startCol, startRow++);
				break;
		}
	}
}
function GenerateMap()
{
    var map = {};
    map.rooms = [];

    for(var i = 0; i <= MapHeight * MapWidth; i++)
    {
    	var options = {type: RoomType.Empty}
    	var room = GenerateRoom(options);
    	room.col = i % MapWidth;
    	room.row = Math.floor(i/MapWidth);
    	room.type = RoomType.Empty;

    	map.rooms[room.row * MapWidth + room.col] = room;
    }

    entranceCol = MapWidth/2;
    entranceRow = MapHeight;
    var options = {type: RoomType.Entrance};
    map.rooms[entranceRow * MapWidth + entranceCol] = GenerateRoom(options);

    GenerateBranch(map, entranceCol, entranceRow - 1);

    return map;
}

var map = GenerateMap();
alert(JSON.stringify(map));