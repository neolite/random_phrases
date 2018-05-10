document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");

  new Vue({
    el: "#app",
    data: {
      loading: false,
      phrases: [],
      remaining: 10
    },
    computed: {
      cannotGetNewPhrases: function() {
        return this.loading || this.remaining < 1;
      }
    },
    mounted() {},
    methods: {
      const ids = this.phrases.reduce((acc, el) => acc.concat(el.id), [])
      const params = new URLSearchParams(Object.entries({ ids })).toString()
      getNewPhrase() {
        this.loading = true;
        fetch(`/new_phrase?${params}`)
          .then(resp => resp.json())
          .then(data => {
            this.phrases.push(data);
            this.loading = false;
            this.remaining--;
          });
      },
      clearPhrases() {
        fetch("/reset", {
          method: "POST"
        }).then(() => {
          this.phrases = [];
          this.loading = false;
        });
      }
    }
  });
});
