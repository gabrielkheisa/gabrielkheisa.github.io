const app = new Vue({
    el: '.btc-badge',
    data: {
        btcUSD: '0.00',
        upDown: 'up',
        num: 0,
    },
    mounted() {
        this.getInfo();
//milisecond
        setInterval(()=> {
            this.getInfo();
        }, 1000*60);
    },
    methods: {
        getInfo() {
          axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then(response => {
              const oldPrice = this.btcUSD
              const newPrice = parseFloat(response.data.bpi.USD.rate_float).toFixed(2)
              
                  this.num = (newPrice - oldPrice).toPrecision(4);
     
              
              if (newPrice > oldPrice) {
                  this.upDown = 'up'
              } else {
                  this.upDown = 'down'
              }
              this.btcUSD = newPrice
          });
        }
    },
});
