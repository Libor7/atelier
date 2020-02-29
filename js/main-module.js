var MainModule = angular.module('mainModule', ['ui.router']);

MainModule.controller('mainController', ['$state', function($state) {
  var vm = this;
  vm.menuDisplayed = false;
  vm.submenuDisplayed = false;
  vm.areMenusSticky = false;
  var menu = document.getElementsByClassName('menu')[0];
  var submenu = document.getElementsByClassName('submenu')[0];
  var pageCover = document.getElementById('pageCover');

  var stickyMenusElement = document.createElement('div');
  document.body.appendChild(stickyMenusElement);
  var stickyMenusText = document.createTextNode('Prilepiť menu');
  stickyMenusElement.appendChild(stickyMenusText);
  stickyMenusElement.classList.add('stick-menus', 'stick-menus-on');
  stickyMenusElement.style.display = 'none';
  vm.stickyMenusElementDisplayed = false;

  stickyMenusElement.addEventListener('click', function(){
    vm.toggleStickyMenus();
    stickyMenusElement.innerHTML = stickyMenusElement.innerHTML == 'Prilepiť menu' ? 'Odlepiť menu' : 'Prilepiť menu';
    if (stickyMenusElement.classList.contains('stick-menus-on')) {
      stickyMenusElement.classList.remove('stick-menus-on');
      stickyMenusElement.classList.add('stick-menus-off');
    } else {
      stickyMenusElement.classList.remove('stick-menus-off');
      stickyMenusElement.classList.add('stick-menus-on');
    }
  });

  function closeMenus() {
    vm.menuDisplayed = false;
    vm.submenuDisplayed = false;
    pageCover.style.zIndex = -1;
    menu.classList.add('hide');
    submenu.classList.add('hide');
    vm.hideStickyMenusElement();
  }

  pageCover.addEventListener('click', closeMenus);

  vm.toggleMenu = function() {
    vm.showStickyMenusElement();
    menu.classList.remove('hide');
    vm.menuDisplayed = !vm.menuDisplayed;

    if (vm.menuDisplayed) {
      pageCover.style.zIndex = 1;
    } else {
      pageCover.style.zIndex = -1;
    }

    if (!vm.menuDisplayed && vm.submenuDisplayed) {
      vm.submenuDisplayed = false;
    }

    if (!vm.menuDisplayed) {
      vm.hideStickyMenusElement();
    }
  };

  vm.toggleSubmenu = function() {
    vm.submenuDisplayed = !vm.submenuDisplayed;
    submenu.classList.remove('hide');
  };

  vm.changeState = function(state) {
    $state.go(state);
    vm.menuDisplayed = false;
    vm.submenuDisplayed = false;
    vm.hideStickyMenusElement();
    pageCover.style.zIndex = -1;
  };

  vm.toggleStickyMenus = function() {
    vm.areMenusSticky = !vm.areMenusSticky;
    menu.style.position = vm.areMenusSticky ? 'fixed' : 'absolute';
    submenu.style.position = vm.areMenusSticky ? 'fixed' : 'absolute';
  };

  vm.showStickyMenusElement = function() {
    stickyMenusElement.style.display = 'block';
    vm.stickyMenusElementDisplayed = true;
  };

  vm.hideStickyMenusElement = function() {
    stickyMenusElement.style.display = 'none';
    vm.stickyMenusElementDisplayed = false;
  };


}]);

MainModule.config(function($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {
  $urlMatcherFactoryProvider.caseInsensitive(true);
  $urlMatcherFactoryProvider.strictMode(false);
  $urlRouterProvider.otherwise('/home');
$locationProvider.html5Mode(false);

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html'
    })
    .state('about', {
      url: '/about',
      controller: 'aboutController',
      controllerAs: 'aboutCtrl',
      templateUrl: 'templates/about.html',
      onExit: function() {
        document.body.style.height = '100%';
      }
    })
    .state('book', {
      url: '/book',
      controller: 'bookController',
      controllerAs: 'bookCtrl',
      templateUrl: 'templates/book.html',
    })
    .state('exposition', {
      url: '/expo',
      controller: 'expositionController',
      controllerAs: 'expoCtrl',
      templateUrl: 'templates/exposition.html',
    })
    .state('gallery', {
      url: '/gallery',
      abstract: true
    })
    .state('gallery.portraits', {
      url: '/portraits',
      templateUrl: 'templates/gallery.portraits.html',
      controller: 'portraitsController',
      controllerAs: 'portCtrl'
    })
    .state('gallery.pictures', {
      url: '/pictures',
      templateUrl: 'templates/gallery.pictures.html',
      controller: 'picturesController',
      controllerAs: 'pictCtrl'
    })
    .state('contact', {
      url: '/contact',
      abstract: true,
      template: '<ui-view />',
    })
    .state('contact.form', {
      url: '/form',
      templateUrl: 'templates/contact.form.html',
      controller: 'contactController',
      controllerAs: 'conCtrl'
    })
    .state('contact.success', {
      url: '/success',
      templateUrl: 'templates/contact.success.html',
      params: {
        sender: ''
      },
      controller: 'contactSuccessController',
      controllerAs: 'conSucCtrl'
    })
    .state('contact.failure', {
      url: '/failure',
      templateUrl: 'templates/contact.failure.html',
      params: {
        sender: ''
      },
      controller: 'contactFailureController',
      controllerAs: 'conFailCtrl'
    });
})
.controller('aboutController', function() {
  var vm = this;        
  document.body.style.height = 'min-content';

  vm.calculateAge = function() {
    var birthday = new Date(2000, 7, 30);
    var today = Date.now();
    var difference = today - birthday;
    return Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
  };

  vm.authorLogin = function() {
    
  };

  vm.closeLoginForm = function() {
    
  };

})
.controller('bookController', function(imageService) {
  var vm = this;
  var imgResized = false;
  vm.bookCover = {
    name: 'Obálka knihy',
    description: 'Predná strana knihy, v ktorej sa nachádzajú moje ilustrácie',
    desktop: 'images/kniha/desktop/obálka_knihy_desktop.jpg',
    laptop: 'images/kniha/laptop/obálka_knihy_laptop.jpg',
    tablet: 'images/kniha/tablet/obálka_knihy_tablet.jpg',
    mobile: 'images/kniha/mobile/obálka_knihy_mobile.jpg'
  };
  vm.text = 'Obrázky sa po kliknutí zväčšia, po ďalšom kliknutí sa zmenšia na pôvodnú veľkosť. Kliknutím zobrazí k obrázku tiež jeho popisné informácie.';
  vm.bookPaintings = imageService.getPictures(false, 'kniha');
  vm.bookPaintings.unshift(vm.bookCover);

  vm.resizeImage = function(index) {
    vm.text = imageService.resizeImage(index, imgResized, vm.bookPaintings);
    imgResized = !imgResized;
  };
})
.controller('expositionController', function() {
  
})
.controller('portraitsController', function($scope, imageService, $filter, stringService) {
  var vm = this;
  vm.imageFilter = '';
  vm.noImageFound = false;
  vm.filterPlaceholder = 'Hľadať podľa názvu...';
  vm.searchType = 'Hľadať v názve diela';
  vm.nameSearch = true;
  vm.images = imageService.getPictures();
  vm.returnedImages = vm.images;

  vm.toggleSearchType = function() {
    vm.nameSearch = !vm.nameSearch;
    vm.imageFilter = '';
  };

  $scope.$watch(angular.bind(vm, function () {
    return {
      imageFilter: vm.imageFilter,
      nameSearch: vm.nameSearch
    }
  }), function (newFilterVal) {
    if (vm.returnedImages.length > 0) {
      vm.images = $filter('filter')(vm.returnedImages, function(value) {
        if (newFilterVal.nameSearch) {
          vm.filterPlaceholder = 'Hľadať podľa názvu...';
          vm.searchType = 'Hľadať v názve diela';
          var nameCopy = stringService.formatToAscii(value.name);
          var filterValCopy = stringService.formatToAscii(newFilterVal.imageFilter);
          return nameCopy.toLowerCase().indexOf(filterValCopy.toLowerCase()) != -1;
        } else {
          vm.filterPlaceholder = 'Hľadať podľa opisu...';
          vm.searchType = 'Hľadať v opise diela';
          var descriptionCopy = stringService.formatToAscii(value.description);
          var filterValCopy = stringService.formatToAscii(newFilterVal.imageFilter);
          return descriptionCopy.toLowerCase().indexOf(filterValCopy.toLowerCase()) != -1;
        }
      });

      vm.noImageFound = vm.images.length == 0 ? true : false;
    }
  }, true);
})
.controller('picturesController', function($scope, imageService, $filter, stringService) {
  var vm = this;
  vm.imageFilter = '';
  vm.noImageFound = false;
  vm.filterPlaceholder = 'Hľadať podľa názvu...';
  vm.searchType = 'Hľadať v názve diela';
  vm.nameSearch = true;
  vm.images = imageService.getPictures(false, 'images/mobile');
  vm.returnedImages = vm.images;

  vm.toggleSearchType = function() {
    vm.nameSearch = !vm.nameSearch;
    vm.imageFilter = '';
  };

  $scope.$watch(angular.bind(vm, function () {
    return {
      imageFilter: vm.imageFilter,
      nameSearch: vm.nameSearch
    }
  }), function (newFilterVal) {
    if (vm.returnedImages.length > 0) {
      vm.images = $filter('filter')(vm.returnedImages, function(value) {
        if (newFilterVal.nameSearch) {
          vm.filterPlaceholder = 'Hľadať podľa názvu...';
          vm.searchType = 'Hľadať v názve diela';
          var nameCopy = stringService.formatToAscii(value.name);
          var filterValCopy = stringService.formatToAscii(newFilterVal.imageFilter);
          return nameCopy.toLowerCase().indexOf(filterValCopy.toLowerCase()) != -1;
        } else {
          vm.filterPlaceholder = 'Hľadať podľa opisu...';
          vm.searchType = 'Hľadať v opise diela';
          var descriptionCopy = stringService.formatToAscii(value.description);
          var filterValCopy = stringService.formatToAscii(newFilterVal.imageFilter);
          return descriptionCopy.toLowerCase().indexOf(filterValCopy.toLowerCase()) != -1;
        }
      });

      vm.noImageFound = vm.images.length == 0 ? true : false;
    }
  }, true);
})
.controller('contactController', function($state, $http) {
  var vm = this;
  var message = document.getElementById('messageText');
  var name = document.getElementById('name');
  var email = document.getElementById('email');
  var result = document.getElementById('result');
  var sendBtn = document.getElementById('send');

  function generateFormula() {
    var a = Math.floor(Math.random() * (10 - 1)) + 1;
    var b = Math.floor(Math.random() * (10 - 1)) + 1;
    var formula = a + ' + ' + b + ' = ';
    var result = a + b;

    return {
      formula: formula,
      result: result
    }
  };

  vm.example = generateFormula();

  vm.enterMessage = function() {
    message.innerHTML = '';
    message.style.display = 'inline-block';
    message.style.alignItems = 'unset';
    message.style.justifyContent = 'unset';
    message.style.padding = '12px';
    message.style.color = '#000';
  };

  vm.leaveMessage = function() {
    if (message.innerHTML == '') {
      message.innerHTML = 'Text správy';
      message.style.display = 'flex';
      message.style.alignItems = 'center';
      message.style.justifyContent = 'center';
      message.style.color = '#989898';
    } else {
      message.style.color = '#000';
    }
  };

  vm.sendMessage = function() {
    var sender = name.value;
    var senderEmail = email.value;
    var messageBody = message.innerHTML.trim();
    var exampleResult = result.value;

    if (exampleResult == vm.example.result) {
      sendBtn.value = 'Správa sa odosiela...';
      sendBtn.style.width = '100%';

      $http({
        method: 'POST',
        url: 'serverside/sendmessage.php',
        data: {
          sender: sender,
          email: senderEmail,
          message: messageBody
        }
      }).then(function successCallback(response) {
        var senderName = response.config.data.sender;
        $state.go('contact.success', {sender: senderName});
      }, function errorCallback(response) {
        var senderName = response.config.data.sender;
        $state.go('contact.failure', {sender: senderName});
      });
    } else {
      // Todo 
    }
  };
})
.controller('contactSuccessController', function($stateParams) {
  var vm = this;
  vm.day = new Date().toLocaleDateString();
  vm.sender = $stateParams.sender;
})
.controller('contactFailureController', function($stateParams) {
  var vm = this;
  vm.sender = $stateParams.sender;
});
