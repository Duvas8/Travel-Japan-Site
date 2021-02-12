const cards = document.querySelectorAll(".card");

const mapInfo = [
  { curessTitle: "Big City", mapLat: 51.505, mapLon: 10 },
  { curessTitle: "Food", mapLat: 51.505, mapLon: 0 },
  { curessTitle: "Nature", mapLat: 51.505, mapLon: 0 },
  { curessTitle: "Culture", mapLat: 51.505, mapLon: 0 },
  { curessTitle: "Pepole", mapLat: 51.505, mapLon: 0 },
];

cards.forEach((cards) => {
  let i = 0  ;
  ++i
  let cardDataPage = cards.dataset.page;
  let mapId = "mapid-" + cardDataPage

  
  console.log(mapId)
  console.log(typeof(mapId));

  
      const mymap = L.map(mapId).setView(
[mapInfo[i].mapLat, mapInfo[i].mapLon],
13
  );

  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
attribution:
  '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mymap);

  console.log("finish loop");
});
  
  
 
