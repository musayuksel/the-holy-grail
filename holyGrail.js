const allData = {
  'Dead spiders': 0,
  'Total chest value': 0,
  bootSizes: {},
  recursiveCount: 0,
};

async function holyGrail(jsonLink) {
  const response = await fetch(jsonLink);
  const data = await response.json();
  await checkObjectRecursively(data);
  allData.recursiveCount--;
}

function checkObjectRecursively(objectData) {
  allData.recursiveCount++;

  Object.entries(objectData).forEach(([key, value]) => {
    if (objectData?.contents?.hasOwnProperty('holy-grail')) {
      allData['Holy Grail location'] = objectData.location;
    }

    if (key === 'spider') {
      countDeadSpiders(value);
    } else if (key === 'sapphire' || key === 'ruby' || key === 'diamond') {
      findTotalChestValue(key, value);
    } else if (key === 'boots') {
      countBootSizes(value);
    } else if (typeof value === 'object') {
      return checkObjectRecursively(value);
    } else if (typeof value === 'string' && value.includes('http')) {
      const [first] = value.split('json');
      const [_, end] = first.split('https://');
      const newLink = 'https://' + end + 'json';
      allData.recursiveCount++;
      return holyGrail(newLink);
    }
  });
  allData.recursiveCount--;
  if (allData.recursiveCount === 0) {
    return returnHolyGrailLocation();
  }
}

function countDeadSpiders(spider) {
  if (!spider.alive) {
    allData['Dead spiders']++;
  }
}

function findTotalChestValue(key, value) {
  if (key === 'sapphire') {
    allData['Total chest value'] += value.count * 200;
  } else if (key === 'ruby') {
    allData['Total chest value'] += value.count * 250;
  } else if (key === 'diamond') {
    allData['Total chest value'] += value.count * 400;
  }
}

function countBootSizes(boots) {
  if (boots.size in allData.bootSizes) {
    allData.bootSizes[boots.size]++;
  } else {
    allData.bootSizes[boots.size] = 1;
  }
}

function returnHolyGrailLocation() {
  allData['Most common boot size'] = Object.entries(allData.bootSizes).sort(
    (a, b) => b[1] - a[1]
  )[0][0]; //find the most common boot size
  delete allData.bootSizes;//delete the bootSizes object
  delete allData.recursiveCount;//delete the recursiveCount property
  console.log(allData);
  return allData;
}

holyGrail(
  'https://e0f5e8673c64491d8cce34f5.z35.web.core.windows.net/treasure.json'
);

// Holy Grail location: 20.19 -19.83
// Total chest value: 25600 doubloons
// Dead spiders: 27
// Most common boot size: 8
