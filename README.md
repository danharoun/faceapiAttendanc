# Vuejs And Face Api Attendance Tracking

Modified Script from  https://github.com/anandmt/ats_Vuejs 


# modifications :

*           1 -falling emoji's balls with collision physics based on webcam  human face expressions
*           2 - More attendance data added (Current Timestamp and email address (binded in the html) )
*           3 - Upon registration the photo is taken from the device camera instead of (image URL)
*           4 - small Css changes
*           5 - My own backend server   

ATS web is a Vuejs Progressive web application, which work on any machine which is having camera inbuilt including mobile devices, it is powered with TensorflowJs Face identification library trained by  for face tracking and Azure API for accuret Face matching.


# Features!

 


### Tech

ATS uses a number of open source projects:

faceRecognition Attendance System

 * Modified Script from  https://github.com/anandmt/ats_Vuejs
* https://codepen.io/asha23/pen/NWoZVL  falling balls physics animation 
* [vuejs](https://vuejs.org/) - The Progressive JavaScript Framework
* [TensorflowJs- face-api.js](https://itnext.io/face-api-js-javascript-api-for-face-recognition-in-the-browser-with-tensorflow-js-bcc2a6c4cf07) - For face tracking and matching! and emoji based animations
* [bootstrap Design](https://getbootstrap.com/docs/4.0/getting-started/introduction/) - An awesome and the world’s most popular framework for building responsive, mobile-first sites.
* [Animate.js](https://daneden.github.io/animate.css/) - For animation's, must have library!
* [SweetAlert.js](https://lipis.github.io/bootstrap-sweetalert/) - SweetAlert for Bootstrap a beautiful replacement for JavaScript's "alert"
* [axios](https://github.com/axios/axios) - axios a promise based HTTP client for the browser and node.js
* [github](https://anandmt.github.io/) - Hosting this project on github.
* [JsonAPI](https://my-json-server.typicode.com/anandmt/jsondb/users) - My JSON Server an instant Json API server for app's

And of course ATS itself is an open source [ats](https://github.com/anandmt/ats_Vuejs) on GitHub.

### Installation

- [Fake Online REST server for teams](https://my-json-server.typicode.com/anandmt/jsondb/users)
- ATS web requires face-api.min.js and it's modules to be vailable in source directory.
- Any Json based API to pull user details.

### Sample Json API response
```sh
[
  {
    "id": "5e830aa31c9d440000b91e06",
    "name": "Anand Tiwari",
    "email": "email@email.com", 
    "image": "https://res.cloudinary.com/dq3npvyjj/image/upload/v1585571840/anand_lnkdn_yzmu5g.jpg",
    "entry": "",
    "exit": "",
    "status": "enter"
  }
  ]
```

```sh
<!-- production version, optimized for size and speed -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

```

```sh
<!-- production version, optimized for size and speed -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

```

License
----

MIT
