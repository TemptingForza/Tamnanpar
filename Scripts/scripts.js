document.addEventListener('DOMContentLoaded', function () {
    // Set the initial language based on the URL parameter or local storage
    setLanguageFromURL();

    // Add an event listener for language change
    document.getElementById('languageSelect').addEventListener('change', function () {
      setLanguage();
    });
  });

  function setLanguage() {
    // Get the selected language
    var selectedLanguage = document.getElementById('languageSelect').value;

    // Update the URL with the selected language parameter
    updateURL(selectedLanguage);

    // Store the selected language in local storage
    storeLanguage(selectedLanguage);

    //Store in session storage???????
    sessionStorage(selectedLanguage);

    // Update the content based on the selected language
    translateMenu(selectedLanguage);
  }

  function setLanguageFromURL() {
    // Get the language from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const selectedLanguage = urlParams.get("lang");

    if (selectedLanguage) {
      // Set the language based on the URL parameter
      document.getElementById('languageSelect').value = selectedLanguage;

      // Store the selected language in local storage
      storeLanguage(selectedLanguage);

      // Update the content based on the selected language
      translateMenu(selectedLanguage);
    } else {
      // If no language parameter in the URL, try to get from local storage
      const storedLanguage = getStoredLanguage();
      if (storedLanguage) {
        // Set the language based on the stored value
        document.getElementById('languageSelect').value = storedLanguage;

        // Update the content based on the stored value
        translateMenu(storedLanguage);
      }
    }
    function updateURL(selectedLanguage) {
      // Update the URL with the selected language parameter
      const currentPage = window.location.pathname;
      const newURL = `${currentPage}?lang=${selectedLanguage}`;
  
      // Update all links with the new language parameter
      document.querySelectorAll('ul#menu a').forEach(function (link) {
        const href = link.getAttribute('href').split('?')[0];
        link.setAttribute('href', `${href}?lang=${selectedLanguage}`);
      });
  
      // Update the browser history
      history.replaceState(null, '', newURL);
    }
  
    function storeLanguage(language) {
      // Store the selected language in local storage
      localStorage.setItem('selectedLanguage', language);
    }
  
    function getStoredLanguage() {
      // Retrieve the selected language from local storage
      return localStorage.getItem('selectedLanguage');
    }
  
    function translateMenu(language) {
      var menuItems = document.querySelectorAll('#menu li a u');
  
      switch (language) {
        case 'th':
          translateToThai(menuItems);
          break;
        case 'en':
          translateToEnglish(menuItems);
          break;
        case 'ch':
          translateToChinese(menuItems);
          break;
        // Add more cases as needed
        default:
          break;
      }
    }
     function translateToThai(menuItems) {
      menuItems[0].innerText = 'หน้าแรก';
      menuItems[1].innerText = 'ตำนานป่า รีสอร์ท';
      menuItems[2].innerText = 'ร้านอาหารตำนานป่า';
      menuItems[3].innerText = 'จอง';
      menuItems[4].innerText = 'แกลเลอรี';
      menuItems[5].innerText = 'เกี่ยวกับเรา';
    }
    
    function translateToEnglish(menuItems) {
      menuItems[0].innerText = 'Home';
      menuItems[1].innerText = 'Tamnanpar Resort';
      menuItems[2].innerText = 'Tamnanpar Restaurant';
      menuItems[3].innerText = 'Booking';
      menuItems[4].innerText = 'Gallery';
      menuItems[5].innerText = 'About Us';
    }
    
    function translateToChinese(menuItems) {
      menuItems[0].innerText = '首页';
      menuItems[1].innerText = '绿光森林酒店';
      menuItems[2].innerText = '绿光森林餐厅';
      menuItems[3].innerText = '预订';
      menuItems[4].innerText = '画廊';
      menuItems[5].innerText = '关于我们';
    }
    
  }

  