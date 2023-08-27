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