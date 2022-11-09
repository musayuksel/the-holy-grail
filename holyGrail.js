const allData = {};

async function holyGrail(jsonLink) {
  console.log('recursion<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,');
  const response = await fetch(jsonLink);
  const data = await response.json();
  spreadObject(data);
}

function spreadObject(objectData) {
  Object.entries(objectData).forEach(([key, value]) => {
    if (objectData?.contents?.hasOwnProperty('holy-grail')) {
      console.log(
        'holy grail found>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
        objectData.location
      );
    }
    if (typeof value === 'object') {
      spreadObject(value);
    } else if (typeof value === 'string' && value.includes('http')) {
      const [first] = value.split('json');
      const [_, end] = first.split('https://');
      const newLink = 'https://' + end + 'json';
      holyGrail(newLink);
      console.log(newLink, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    }
  });
}

holyGrail(
  'https://e0f5e8673c64491d8cce34f5.z35.web.core.windows.net/treasure.json'
);

