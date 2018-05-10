document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");

  new Vue({
    el: "#app",
    data: {
      loading: false,
      phrases: []
    },
    mounted() {},
    methods: {
      getNewPhrase() {
        this.loading = true;
        fetch("/new_phrase")
          .then(resp => resp.json())
          .then(data => {
            this.phrases.push(data);
            this.loading = false;
          });
      }
    }
  });
});
