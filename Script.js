document.addEventListener('DOMContentLoaded', function () {
    // Set the initial language
    setLanguage();
  
    // Add an event listener for language change
    document.getElementById('languageSelect').addEventListener('change', function () {
      setLanguage();
    });
  });
  
  function setLanguage() {
    // Get the selected language
    var selectedLanguage = document.getElementById('languageSelect').value;
  
    // Update the content based on the selected language
    translateMenu(selectedLanguage);
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