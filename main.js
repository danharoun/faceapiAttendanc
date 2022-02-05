

const video = document.getElementById("video");
//const labeled = {};
const labeled = {
  "Sundar Raman": [
    "https://media-exp1.licdn.com/dms/image/C4D03AQFJvQHUUnloiQ/profile-displayphoto-shrink_200_200/0/1542029964239?e=1649289600&v=beta&t=_T4Rb9OE0MBGJO0BCqJMDrOC0bH-AH8c8YtGkW1KS-8",
  ],
  "Adnan Haroun": [
    "https://res.cloudinary.com/dq3npvyjj/image/upload/v1585813139/Rikhil_jfr93h.jpg",
  ],

};

function stopCamera() {
  stopMediaTracks(video.srcObject);
}

function stopMediaTracks(stream) {
  stream.getTracks().forEach((track) => {
    track.stop();
  });
}

function TrainModels() {
  console.log("TrainModels started");
  var i;
  for (i = 0; i < app.persons.length; i++) {
    if (name in labeled) {
      labeled[app.persons[i].name].push(app.persons[i].image);
    } else {
      labeled[app.persons[i].name] = [app.persons[i].image];
    }
  }
  start();

  console.log(labeled);
}

function reloadImages() {
  start();
}

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
  faceapi.nets.faceExpressionNet.loadFromUri("./models"),
  faceapi.nets.ssdMobilenetv1.loadFromUri("./models"),
]).then(startVideo);

function startVideo() {
  navigator.getUserMedia(
    {
      video: {},
    },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err)
  );
}

video.addEventListener("play", () => {
  start();
});

async function start() {
  markAttendance.__vue__.isHidden = true;
  markAttendance.__vue__.Training = "Training....";
  const canvas = faceapi.createCanvasFromMedia(video);

  const labeledFaceDescriptors = await loadLabeledImages();





  const canvass = faceapi.createCanvasFromMedia(video);

  markAttendance.__vue__.Training = "Training Done!";
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.8);
  document.getElementById("videoContainer").append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);
  markAttendance.__vue__.isHidden = false;
  markAttendance.__vue__.start = "Attend";

  setInterval(async () => {

    const detections = await faceapi
      .detectAllFaces(video)
      .withFaceLandmarks()
      .withFaceDescriptors();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    const results = resizedDetections.map((d) =>
      faceMatcher.findBestMatch(d.descriptor)
    );

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, {
        label: result.toString(),
      });
      drawBox.draw(canvas);
      app.identifiedPerson = result._label;
    });
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
  }, 100);
}

function loadLabeledImages() {
  return Promise.all(
    Object.keys(labeled).map(async (label) => {
      const descriptions = [];
      for (let i = 0; i < labeled[label].length; i++) {
        //console.log('Anand::'+labeled[label][i]);
        const img = await faceapi.fetchImage(labeled[label][i]);
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }

      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
}
