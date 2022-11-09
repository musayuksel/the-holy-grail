const allData = {
  recursiveCount: 0,
  'Dead spiders': 0,
};

async function holyGrail(jsonLink) {
  const response = await fetch(jsonLink);
  const data = await response.json();
  spreadObject(data);
}

function spreadObject(objectData) {
  allData.recursiveCount++;
  Object.entries(objectData).forEach(([key, value]) => {
    if (objectData?.contents?.hasOwnProperty('holy-grail')) {
      allData['Holy Grail location'] = objectData.location;
    }
    if(key === 'spider'){
      countDeadSpiders(value);
    }else if (typeof value === 'object') {
      spreadObject(value);
    } else if (typeof value === 'string' && value.includes('http')) {
      const [first] = value.split('json');
      const [_, end] = first.split('https://');
      const newLink = 'https://' + end + 'json';
      holyGrail(newLink);
    }
  });
  allData.recursiveCount--;
  if (allData.recursiveCount === 0) {
    returnHolyGrailLocation();
  }
}

function countDeadSpiders(spider){
  if(!spider.alive){
    allData['Dead spiders']++;
  }
}

holyGrail(
  'https://e0f5e8673c64491d8cce34f5.z35.web.core.windows.net/treasure.json'
);

function returnHolyGrailLocation() {
  console.log({ allData });
  return allData.holyGrailLocation;
}
// Holy Grail location: 20.19 -19.83
// Total chest value: 25600 doubloons
// Dead spiders: 27
// Most common boot size: 8