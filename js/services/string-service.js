MainModule.factory('stringService', function() {
  return {
    formatToAscii: function(str) {
      var charsTable = {ä: 'a', Ä: 'A', á: 'a', Á: 'A', č: 'c', Č: 'C', ď: 'd', Ď: 'D', ě: 'e', Ě: 'E', é: 'e', É: 'E', ë: 'e', Ë: 'E', í: 'i', Í: 'I', ľ: 'l', Ľ: 'L', ĺ: 'l', Ĺ: 'L', ň: 'n', Ň: 'N', ó: 'o', Ó: 'O', ö: 'o', Ö: 'O', ô: 'o', Ô: 'O', ř: 'r', Ř: 'R', ŕ: 'r', Ŕ: 'R', š: 's', Š: 'S', ť: 't', Ť: 'T', ú: 'u', Ú: 'U', ü: 'u', Ü: 'U', ý: 'y', Ý: 'Y', ž: 'z', Ž: 'Z'};
      var chars = str.split('');
      var newStr = '';

      chars.forEach(function(value) {
        if (charsTable.hasOwnProperty(value)) {
          newStr += charsTable[value];
        } else {
          newStr += value;
        }
      });
      return newStr;
    }
  };
});