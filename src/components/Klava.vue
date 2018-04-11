<template>
    <div>
      <div class="input-num">
        {{inputNum}}
        <div class="message" v-if="msg">{{ msg }}</div>
      </div>
      <div class="num_key">
        <button class="mini" @click="addNum(n % 10)" v-for="n in 10">{{ n % 10 }}</button>
        <button ref="sendNum" @click="submit" class="try">Попробовать</button>
        <button class="backspace" @click="backspace"><<</button>
      </div>
    </div>
</template>

<script>
	export default {
	  data() {
	    return {
	      inputNum: '',
	      msg: ''
	    };
	  },
	  methods: {
	    handleKeyPress(e) {
	    	e.preventDefault();
	      // console.log(e.key);
	      if (+e.key || e.key === '0'){
	        this.addNum(parseInt(e.key));
	      } else if (e.key === 'Enter') {
	        this.submit();
	      } else if (e.key === 'Backspace'){
	        this.backspace();
	      }
	    },
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
	        if(Array.from(num).reduce((a,b) => {if(a.indexOf(b)<0)a.push(b);return a;}, []).length == 4){
	          return true;
	        }          
	      }
	      return false;
	    }
	  },
	  mounted() {
	    // add an event listener for keypress
	    window.addEventListener('keypress', this.handleKeyPress);
	  }
	}
</script>

<style>
</style>