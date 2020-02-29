MainModule.factory('imageService', function($http) {
  return {
    getPictures: function(portraits = true, book = '/') {
      var result = [];

      $http({
        method: 'GET',
        url: 'serverside/displayimages.php',
        params: {
          portraits: portraits,
          book: book
        }
      }).then(function successCallback(response) {
        for (let [key, value] of Object.entries(response.data)) {
          result.push(value);
        }
      }, function errorCallback(response) {
        // Todo 
      });

      return result;
    },
    resizeImage: function(index,imgResized, paintings) {
      var clickedImage = document.getElementById('item' + index);
      var images = document.getElementsByTagName('img');
      var imagesLength = images.length;

      if (!imgResized) {
        var text = this.setImageInfo(paintings, index);
        clickedImage.style.width = '100%';
        for (var i = 0; i < imagesLength; i++) {
          if (i == index) continue;
          document.getElementById('item' + i).style.display = 'none';
        }
        return text;
      } else {
        clickedImage.style.width = '50%';
        for (var i = 0; i < imagesLength; i++) {
          if (i == index) continue;
          document.getElementById('item' + i).style.display = 'inline';
        }
        return 'Môžete vybrať iný obrázok, alebo sa vrátiť naspäť tlačítkom Späť.';
      }
    },
    setImageInfo: function(paintings, index) {
      return paintings[index].name + ' - ' + paintings[index].description;
    }
  };
});