import Vue from 'vue'
import HomePage from './components/homePage/HomePage';

new Vue({
    el: '#homepage',
    comments: { HomePage },
    template: '<HomePage/>',
	data:{
		quote: '',
		random: false,
		loader: false,
		errorMessage: '',
		randomQuote: '',
		snackbar: false,
    backgrounds: [
      'blue-yellow',
      'orange-yellow',
      'purple-blue',
      'sky-blue',
      'green-blue',
      'pink'
    ],
    selectedBackground: 'pink'
	},
	methods:{
    refreshQuote() {
      this.quote = ''
      this.randomBackground()
      this.loader = true
			this.$http.get('https://random-quote-generator.herokuapp.com/api/quotes/random').
			then(response => {
        this.quote = response.body
				this.loader = false
			}).
			catch(error => {
				this.errorMessage = 'Sorry, we can\'t get new quote right now'
				this.snackbar = true
			})
    },
    randomBackground() {
      this.selectedBackground = this.backgrounds[Math.floor(Math.random() * this.backgrounds.length)]
    },
    clearRandomQuote(){
      this.random = false
      clearInterval(this.randomQuote)
    }
	},
	created (){
		this.refreshQuote()
	},
	watch: {
		random(val){
      if (val) {
        this.sliderTime = true
				this.refreshQuote()
				this.randomQuote = setInterval(this.refreshQuote, 3000)
			} else {
       this.clearRandomQuote()
			}
		}
	}
})