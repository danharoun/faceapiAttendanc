Vue.component("registration", {
  data: function () {
    return {
      greetings: "Please enter your name and Email address below to register.",
      name: "",
      URL: "ss",
      email:"",
      timeStamp: new Date(),
    };
  },
  methods: {
    RegisterNewMember: function (status, entryTime, exitTime) {
      if (!this.name || !this.URL) {
        swal({
          title: "Oops...",
          text:
            "Registration Error!",
          icon: "error",
          button: "OK",
        });
        return false;
      }

      const canvass = faceapi.createCanvasFromMedia(video);



      app.persons.push({
        name: this.name,
        image: canvass.toDataURL('image/webp'),
        entry: entryTime,
        exit: exitTime,
        status: status,
        email: this.email,
      });
      this.name = "";
      this.URL = "";
      trainModels();
    },
  },
  template: `
    <div class="rounded  mt-4 p-4">
                        <p class="h5">{{greetings}}</p>
                        <form class="mt-5" onsubmit="return false">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" required placeholder="Please enter you name."
                                class="form-control"
                                    id="name" v-model="name">
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" required placeholder="Please enter email address."
                                    class="form-control" id="email" v-model="email">
                            </div>

                            <button v-on:click="RegisterNewMember('enter',new Date(),'')"
                                class="btn btn-dark">Register</button>
                        </form>
                    </div>
    `,
});
