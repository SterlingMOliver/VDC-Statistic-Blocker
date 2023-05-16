// Function to toggle the visibility of the selected elements
function toggleSelectedElements(selectedElements) {
    const elements = document.querySelectorAll('.stat-column'); // Select all the elements with class 'stat-column'
    elements.forEach(element => {
      const title = element.querySelector('.stat-title').textContent; // Get the text content of the 'stat-title' element
      if (selectedElements.includes(title)) {
        element.style.display = 'none'; // Hide the element
      } else {
        element.style.display = ''; // Show the element
      }
    });
  }
  
  // Function to load the selected elements from storage and apply them
  function loadSelectedElementsAndApply() {
    chrome.storage.sync.get({ selectedElements: [] }, function (data) {
      const selectedElements = data.selectedElements;
      toggleSelectedElements(selectedElements);
    });
  }
  
  // Listen for messages from the extension popup
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.toggleSelectedElements) {
      toggleSelectedElements(request.selectedElements);
    }
  });
  
  // Load the selected elements and apply them when the page is loaded
  loadSelectedElementsAndApply();
  