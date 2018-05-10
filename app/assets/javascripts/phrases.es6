document.addEventListener("DOMContentLoaded", function(event) {
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
    mounted() {
      const savedPhrases = localStorage.getItem("phrases");
      if (savedPhrases.length) {
        this.phrases = JSON.parse(savedPhrases);
      }
      const remaining = localStorage.getItem("remaining");
      if (remaining.length) {
        this.remaining = +remaining;
      }
    },
    methods: {
      getNewPhrase() {
        const ids = this.phrases.reduce((acc, el) => acc.concat(el.id), []);
        const params = new URLSearchParams(Object.entries({ ids })).toString();
        this.loading = true;
        fetch(`/new_phrase?${params}`)
          .then(resp => resp.json())
          .then(data => {
            this.phrases.push(data);
            this.loading = false;
            this.remaining--;
            localStorage.setItem("phrases", JSON.stringify(this.phrases));
            localStorage.setItem("remaining", JSON.stringify(this.remaining));
          });
      },
      clearPhrases() {
        this.phrases = [];
        this.remaining = 10;
        localStorage.removeItem("phrases");
        localStorage.removeItem("remaining");
      }
    }
  });
});
