// Session Storage
function sessionStorageLanguage(selectedLanguage) {
    // Set the selected language in session storage
    sessionStorage.setItem('selectedLanguage', selectedLanguage);
   }
   
   function getStoredSessionLanguage() {
    // Retrieve the selected language from session storage
    return sessionStorage.getItem('selectedLanguage');
   }
   
   // Cookie
   function setlanguageCookie(selectedLanguage) {
    // Set the selected language in a cookie
    document.cookie = "selectedLanguage=" + selectedLanguage + ";path=/";
   }
   
   function getlanguageCookie() {
    // Get the selected language from the cookie
    var name = "selectedLanguage=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
       var c = ca[i];
       while (c.charAt(0) == ' ') {
         c = c.substring(1);
       }
       if (c.indexOf(name) == 0) {
         return c.substring(name.length, c.length);
       }
    }
    return "";
   }
   
   function changeLanguage(selectedLanguage) {
    // Set the selected language in session storage
    sessionStorageLanguage(selectedLanguage);
   
    // Set the selected language in a cookie
    setlanguageCookie(selectedLanguage);
   
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
   
       // Store the selected language in session storage and a cookie
       changeLanguage(selectedLanguage);
    } else {
       // If no language parameter in the URL, try to get from session storage or cookie
       const storedSessionLanguage = getStoredSessionLanguage();
       const storedCookieLanguage = getlanguageCookie();
   
       if (storedSessionLanguage) {
         // Set the language based on the stored value
         document.getElementById('languageSelect').value = storedSessionLanguage;
   
         // Update the content based on the stored value
         translateMenu(storedSessionLanguage);
       } else if (storedCookieLanguage) {
         // Set the language based on the stored value
         document.getElementById('languageSelect').value = storedCookieLanguage;
   
         // Update the content based on the stored value
         translateMenu(storedCookieLanguage);
       }
    }
    function setLanguageFromURL() {
        // ... (previous code)
      
        var menuItems = document.querySelectorAll('#menu li a u');
      
        let selectedLanguage = getStoredSessionLanguage() || getlanguageCookie() || 'th'; // Set a default language if none is found;

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
   
   // Rest of the code remains the same
}