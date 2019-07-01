var last_kw = '';
var max_sug_len = 1;

function get_suggest() {
	var kw = document.getElementById('search_input').value;
	var clear = document.getElementById('clear');
	if (kw) clear.style.display = 'block';
	else clear.style.display = 'none';
	if (kw == last_kw) return;
	last_kw = kw;
	if (!kw || kw.length < max_sug_len) {
		close_sug();
		return;
	}
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'http://sugs.m.sm.cn/web?t=w&uc_param_str=dnnwnt&scheme=http&fr=android&bid=1&q=' + encodeURIComponent(kw) + '&_=' + new Date().getTime() + '&callback=jsonp3';
	var head = document.querySelector('head');
	script.onload = function() {
	head.removeChild(script);
	};
	head.appendChild(script);
}
function jsonp3(res) {
	var suggest = document.getElementById('suggest');
	if (!res.r || !res.r.length) {
		suggest.style.display = 'none';
		return;
	}
	var html = '';
	res.r.forEach(function(v) {
		html += '<li>' + v.w + '<b></b></li>';
	});
	document.getElementById('suglist').innerHTML = html;
	suggest.style.display = 'block';
}
function close_sug() {
	last_kw = '';
	document.getElementById('suggest').style.display = 'none';
}
function move_input() {
	document.body.scrollTop = document.getElementById('search_form').offsetTop - 2;
}
function clear_seach() {
	var input = document.getElementById('search_input');
	input.value = '';
	document.getElementById('clear').style.display = 'none';
	close_sug();
	input.focus();
}
function search(){if(document.getElementById("search_input").value != ""){window.location.href = "https://cn.bing.com/search?q="+ encodeURIComponent(document.getElementById("search_input").value) + "&from=smor&safe=1&snum=1";
document.getElementById("search_input").value = "";}return false;}
document.getElementById('suglist').addEventListener('click', function(e) {
	var input = document.getElementById('search_input');
	if (e.target.tagName == 'B') {
		input.value = e.target.parentNode.firstChild.textContent;
		input.focus();
	} else if (e.target.tagName == 'LI') {
		input.value = e.target.firstChild.textContent;
		close_sug();
		search();
	}
});
window.addEventListener('resize', move_input);


/*解密bgn*/
const app = new Vue({
  el: '#app',
  data () {
    const encryptionChars = ['乾', '坤', '屯', '蒙', '需', '訟', '師', '比', '小畜', '履', '泰', '否', '同人', '大有', '謙', '豫', '隨', '蠱', '臨', '觀', '噬嗑', '賁', '剝', '復', '無妄', '大畜', '頤', '大過', '坎', '離', '鹹', '恒', '遯', '大壯', '晉', '明夷', '家人', '睽', '蹇', '解', '損', '益', '夬', '姤', '萃', '升', '困', '井', '革', '鼎', '震', '艮', '漸', '歸妹', '豐', '旅', '巽', '兌', '渙', '節', '中孚', '小過', '既濟', '未濟']
    const dict = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/']
    const strEncoded = ''
    return {
      encryptionChars,
      dict,
      strEncoded,
      strOrigin: ''
    }
  },
  computed: {
    strEncrypted () {
      const strOrigin = this.strOrigin
      const dict = this.dict
      const encryptionChars = this.encryptionChars
      let str = strOrigin
      str = Array.prototype.join.call(str, '\x00')
      str = btoa(str).replace(/=/g, 'A')
      dict.forEach((char, index) => {
        const charCode = char.charCodeAt().toString(16)
        const pattern = new RegExp(`\\x${charCode}`, 'g')
        const replacement = encryptionChars[index]
        str = str.replace(pattern, replacement)
      })
      return str
    },
    strDecoded () {
      const strEncoded = this.strEncoded
      const encryptionChars = this.encryptionChars
      const dict = this.dict
      let str = strEncoded
      encryptionChars.forEach((o, index) => {
        const pattern = new RegExp(o, 'g')
        const replacement = dict[index] ? dict[index] : ''
        str = str.replace(pattern, replacement)
      })
      str = atob(str)
      str = str.replace(/\x00/g, '')
      return str
    }
  }
})
/*end*/