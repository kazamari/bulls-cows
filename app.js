Vue.component('klava', {
  template: "#klava",
  data() {
    return {
      inputNum: '',
      msg: ''
    };
  },
  methods: {
    addNum(num){
      if (this.inputNum.length < 4){
        this.inputNum += num.toString();
      }else{
        this.msg = 'Число не должно содержать более 4 цифр';
        setTimeout(() => { this.msg = '' }, 2000);
      }
    },
    backspace(){
      this.inputNum = this.inputNum.substr(0, this.inputNum.length-1);
    },
    submit(){
      // Сначала необходимо проверить введенное число
      if(this.check(this.inputNum)){
        this.$emit('trynum', {value: this.inputNum});
        this.inputNum = '';
      }else{
        this.msg = 'Число должно состоять из 4-х неповторяющихся цифр';
        setTimeout(() => { this.msg = '' }, 2000);
      }
    },
    check(num){
      // num - 4-хзначное число
      if(!isNaN(num) && num.toString().length == 4){
        // num - 4-хзначное число без повторяющихся цифр
        if(Array.from(num).reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]).length == 4){
          return true;
        }          
      }
      return false;
    }

  }
});


var app = new Vue({
  el: '#app',
  data: function(){
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
  methods: {
    tryNum(e){
      this.compare(Array.from(e.value), this.computer_num);
    },
    compare: function(num, computer_num){
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
    trigger () {
      this.$refs.sendNum.click();
    },
    reset_data () {
      Object.assign(this.$data, this.$options.data());
    },
    init_game: function(){
      this.reset_data();
      for(var i = 0; i < 4; i++){
        while(true){
          n = (Math.floor(Math.random() * (9 - 0 + 1)) + 0).toString();
          if( this.computer_num.indexOf(n) === -1 && (i != 0 || n != 0)){
            this.computer_num.push(n);
            break
          } 
        }
      }
    }
  }
});
