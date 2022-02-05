Vue.component("mark-attendance", {
  data: function () {
    return {
      isHidden: false,
      Training: "Training...",
      start: "Loading...",
    };
  },
props:['place'],
  methods: {
    MarkAttendance: function () {
      var BreakLoop = {};
      try {
        app.persons.forEach(function (item) {
          if (item.name === app.identifiedPerson) {

            if (item.status === "enter") {
              console.log("Marking exit");
              item.status = "exit";
              app.status = "exit";
              item.exit = new Date();
            } else {
              console.log("Marking entry");
              item.status = "enter";
              app.status = "enter";
              item.entry = new Date();

            }
            throw BreakLoop; // Breaking foreach.
          }
        });
      } catch (e) {
        if (e !== BreakLoop) throw e;
      }
      swal({
        title: app.identifiedPerson,
        text: "You have been successfully " + app.status + "!",
        icon: "success",
        button: "OK",
      });
    },
  },
  template: `
    <div class="rounded mt-3 p-3 ">
    <p class="h4 animated ">Punch In / Out</p>
    <div class="d-flex">
        <div class="p-2">
            <button v-if="!isHidden" v-on:click="MarkAttendance()"
                class="btn btn-success animated wobble delay-5s btn-black">{{start}}</button>
        </div>
        <div class="p-2">
            <div v-if="isHidden" class="spinner-border text-warning"></div>
            <p v-if="isHidden" class="small" id="status">{{Training}}</p>
        </div>
    </div>
</div>
      `,
});
