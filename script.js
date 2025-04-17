


// Theme toggle
document.getElementById('themeToggle').addEventListener('change', function () {
    document.body.classList.toggle('light');
  });
  
  
  
  // Save and load theme preference
  function saveTheme() {
    const isLight = document.body.classList.contains("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  }
  
  function loadTheme() {
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      document.body.classList.add("light");
      document.getElementById("themeToggle").checked = true;
    }
  }
  loadTheme();
  
 
  

  let resetDisplay = false;

  // Switch Tabs
  function switchTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  
    document.querySelector(`.tab[onclick="switchTab('${tabId}')"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
  }
  
  // Append value
  function append(value) {
    const display = getActiveDisplay();
    if (!display) return;
  
    if (resetDisplay || display.innerText === "0" || display.innerText === "Error") {
      display.innerText = value;
      resetDisplay = false;
    } else {
      display.innerText += value;
    }
  }
  
  // Clear display
  function clearDisplay() {
    const display = getActiveDisplay();
    if (display) display.innerText = "0";
    resetDisplay = false;
  }
  
  // Backspace
  function backspace() {
    const display = getActiveDisplay();
    if (!display) return;
  
    let text = display.innerText;
    if (text.length <= 1 || text === "Error") {
      display.innerText = "0";
      resetDisplay = true;
    } else {
      display.innerText = text.slice(0, -1);
    }
  }
  
  // Calculate expression
  function calculate() {
    const display = getActiveDisplay();
    if (!display) return;
  
    try {
      const expression = display.innerText;
      const result = eval(expression);
      display.innerText = parseFloat(result.toFixed(10)).toString();
      addToHistory(`${expression} = ${result}`);
      resetDisplay = true;
    } catch {
      display.innerText = "Error";
      resetDisplay = true;
    }
  }
  
  // History
  function addToHistory(entry) {
    const list = document.getElementById("historyList");
    const item = document.createElement("li");
    item.textContent = entry;
    list.prepend(item);
  }
  
  // Get current active display
  function getActiveDisplay() {
    const active = document.querySelector('.tab-content.active');
    return active ? active.querySelector('.display') : null;
  }
  
  document.addEventListener("keydown", function (e) {
    if (e.repeat) return; // ✅ Prevent holding key from repeating
    const keys = "0123456789.+-*/";
  
    if (keys.includes(e.key)) {
      append(e.key);
    } else if (e.key === "Enter") {
      e.preventDefault();
      calculate();
    } else if (e.key === "Backspace") {
      e.preventDefault();
      backspace();
    } else if (e.key === "Escape") {
      clearDisplay();
    }
  });
  
  


  document.addEventListener("keydown", function (e) {
    if (e.key === "Backspace") {
      e.preventDefault(); // avoid browser navigation
      backspace();
    }
  });
  
  


  
  

  function clearHistory() {
    document.getElementById("historyList").innerHTML = '';
    localStorage.removeItem("calcHistory");
  }
  

  function activateTyping() {
    document.getElementById('hiddenKeyboardInput').focus();
  }
  

  document.querySelector('.calculator').addEventListener('click', () => {
    document.getElementById('hiddenKeyboardInput').focus();
  });
  
