<template>
  <div id="app">
    <div class="splash" v-if="beginSplash">
      <button class="roundbutton" @click="init_game">Начать</button>
    </div>
    <div class="header">
      <a class="reload" href="#" @click.prevent="init_game" title="reload"></a>
      <!--a href="#" @click.prevent="get_info"><img src="" alt="info"></a-->
    </div>
    <div class="game">
      <div id="attempts">
        <div class="inner">
          <div class="item" v-for="num in user_num">
            <div class="u_step">{{ num.step }}.</div>
            <div class="u_num">{{ num.num.join('') }}</div>
            <div class="bc">
              <span v-for="n in num.bulls" class="bulls"></span><span v-for="n in num.cows" class="cows"></span><span v-for="n in (4 - num.bulls - num.cows)"></span>
            </div>
          </div>
        </div>
      </div>

      <div class="controls">
        <div class="win-info" v-if="doYouWin">
          <p>{{ win_msg }}</p>
          <p>Загаданное число {{ computer_num.join('') }}</p>
          <button class="roundbutton" @click="init_game">Повторить</button>
        </div>
        
        <div v-if="!doYouWin">
          <app-klava @trynum="tryNum($event)"></app-klava>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppKlava from './components/Klava.vue'

export default {
  data () {
    return {
      step: 0,
      computer_num: [],
      user_num: [],
      beginSplash:false,
      doYouWin: false,
      win_msg: 'Вы угадали!'
    }
  },
  computed: {

  },
  created: function(){
    this.beginSplash = true;
  },
  updated: function(){
    var elem = this.$el.querySelector("#attempts");
    elem.scrollTop = elem.clientHeight;
  },
  mounted: function () {
    // add an event listener for keypress
    window.addEventListener('keypress', this.handleKeyPress);
  },
  methods: {
    handleKeyPress(e) {
      // console.log(e.key);
      if (e.key === 'F2'){
        this.init_game();
      }
    },
    tryNum(e) {
      this.compare(Array.from(e.value), this.computer_num);
    },
    compare(num, computer_num) {
      let attempt = {
        step: ++this.step,
        num: num,
        bulls: 0,
        cows: 0
      }
      for(let i = 0; i < 4; i++){
        if(num[i] === computer_num[i]){
          attempt.bulls++;
        }else if(computer_num.indexOf(num[i]) !== -1){
          attempt.cows++;
        }
      }
      this.user_num.push(attempt);
      if(attempt.bulls == 4){
        this.doYouWin = true;
      }
    },
    trigger() {
      this.$refs.sendNum.click();
    },
    reset_data() {
      Object.assign(this.$data, this.$options.data());
    },
    init_game() {
      this.reset_data();
      for(var i = 0; i < 4; i++){
        while(true){
          let n = (Math.floor(Math.random() * (9 - 0 + 1)) + 0).toString();
          if( this.computer_num.indexOf(n) === -1 && (i != 0 || n != 0)){
            this.computer_num.push(n);
            break
          } 
        }
      }
    }
  },
  components: {
    AppKlava
  }
}
</script>

<style>
body{background: #eee url('/assets/img/bg.jpg') -150px 0;}
button{
  border:1px solid #B2B475;
  background:#B2B475;
  color:#fff;
  font-size:16px;
  line-height:44px;
}
#app{
  position: relative;
  max-width:320px;
  margin:20px auto;
  /*display:flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-end;*/
}
.splash{
  position: absolute;
  background:#fff;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 99;
  display:flex;
  justify-content: space-around;
  align-items: center;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
/*  -webkit-filter: blur(2px); 
  -moz-filter: blur(2px); 
  filter: blur(2px); */
}
button.roundbutton{
  border:1px solid #f75151;
  color:#fff;
  background:#f75151;
  padding:0 20px;
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  border-radius: 25px;
  cursor:pointer;
}
.header{
  position:absolute;top:0;left:0;right:0;height:52px;background:#8d8e4e;text-align:right;padding:0 4px;
  -webkit-border-top-left-radius: 10px;
  -webkit-border-top-right-radius: 10px;
  -moz-border-radius-topleft: 10px;
  -moz-border-radius-topright: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  z-index:2;
}
.header a{display:inline-block;width:44px;height:44px;margin-top:4px;}
.header a.reload{background: url('/assets/img/icons8-reset-32.png') 50% 50% no-repeat;}
.game{
  position: relative;
  height:calc(100vh - 40px);
  min-height:500px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  padding:72px 20px 20px 20px;
  background:#fff;
  z-index:1;
}

#attempts{
  height:calc(100vh - 380px);
  overflow: auto;
}
#attempts .inner{width:calc(100% - 16px);}

.bc{
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  border-radius: 25px;
  background:#ffddaa;
  padding:10px 20px;
  line-height:12px;
}
.bc>span{
  display:inline-block;
  width:12px;
  height:12px;
  margin:0 3px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  border:1px solid #fff;
  background:#fff;
}
.bc>span.bulls{background: #8d8e4e;border-color:#8d8e4e;}
.bc>span.cows{background: #f75151;border-color:#f75151;}

.item{
  /*-webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  border-radius: 30px;
  background: #33a2e8;
  padding:10px 30px;*/
  margin:0 0 10px 0;
  display:flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  color:#000;
  font-weight:bold;
}
.item .u_step{width:30px;text-align:right;}


#userInput{background:#fff;padding:10px 20px;
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  border-radius: 25px;
  border:1px solid #33a2e8;
}
.controls{
  position:absolute;
  bottom:0;
  left:0;
  right:0;
  padding:20px 20px 15px 20px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  background:#fff;
}
button.try{
  border:1px solid #f75151;
  color:#fff;
  background:#f75151;
  padding:0 20px;
  line-height:44px;
  color:#fff;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

.num_key{
  display:flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
}

.num_key button.mini{
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  border:1px solid #B2B475;
  background:#B2B475;
  padding:0;
  margin:0 0 5px 0;
  line-height:44px;
  color:#fff;
  font-size:1.5em;
  font-weight:700;
  width:30%;
}
button.backspace{
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  border:1px solid #B2B475;
  background:#B2B475;
  padding:0;
  line-height:44px;
  color:#fff;
  width:44px;
}
.input-num{position:relative;text-align:center;font-size:18px;line-height:26px;font-weight:700;}
.input-num div.message{
  position:absolute;width:75%;font-size:12px;line-height:1.2em;font-weight:400;top:-40px;left:50%;margin-left:-37%;
  background: #ffddaa;border:1px solid #B29A8E;
}
.win-info{text-align:center;}
.win-info p{font-size:18px;}
.win-info button{margin-bottom:30px;}

@media (max-width: 480px) {
  #app{margin:0;max-width: 100%;}
  .header, .splash{
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
    border-radius: 0px;
  }
  .game{
    height:100vh;
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
    border-radius: 0px;
  }
  #attempts{height:calc(100vh - 340px);}
}
</style>
