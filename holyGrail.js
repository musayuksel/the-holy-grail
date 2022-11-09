const allData = {
  recursiveCount: 0,
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
      allData['holyGrailLocation'] = objectData.location;
    }
    if (typeof value === 'object') {
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

holyGrail(
  'https://e0f5e8673c64491d8cce34f5.z35.web.core.windows.net/treasure.json'
);

function returnHolyGrailLocation() {
  console.log({ allData });
  return allData.holyGrailLocation;
}
// console.log({allData});
