const app = Vue.createApp({
  data() {
    return {
      fact: '',
      cityName: 'London, Ontario',
      Temperature: '',
      Wind: '',
      Description: '',
      word: '',
      Word: '',
      Phonetic: '',
      PartOfSpeech: '',
      Definition: ''
    };
  },
  created() {
    this.NewFact();
    this.GetWeather();
  },
  methods: {
    NewFact() {
      fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
        .then(response => response.json())
        .then(data => {
          this.fact = data.text;
        });
    },
    GetWeather() {
      fetch(`https://goweather.herokuapp.com/weather/London%20Ontario/${this.cityName}`)
        .then(response => response.json())
        .then(data => {
          this.Temperature = data.temperature;
          this.Wind = data.wind;
          this.Description = data.description;
        });
    },
    Define() {
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/Bottle/${this.word}`)
        .then(response => response.json())
        .then(data => {
          const entry = data[0];
          this.Word = entry.word;
          this.Phonetic = entry.phonetic;
          this.PartOfSpeech = entry.meanings[0].partOfSpeech;
          this.Definition = entry.meanings[0].definitions[0].definition;
        });
    }
  }
});
app.mount('#app');