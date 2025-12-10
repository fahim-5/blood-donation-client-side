// Run this in browser console to find the issue
(() => {
  const invalidElements = [];
  
  document.querySelectorAll('*').forEach(el => {
    const computedStyle = window.getComputedStyle(el);
    const visibility = computedStyle.visibility;
    const validValues = ['visible', 'hidden', 'collapse', 'inherit', 'initial', 'unset'];
    
    if (visibility && !validValues.includes(visibility)) {
      invalidElements.push({
        element: el,
        visibility,
        tagName: el.tagName,
        className: el.className,
        id: el.id,
        style: el.getAttribute('style')
      });
    }
  });
  
  if (invalidElements.length > 0) {
    console.log('Found elements with invalid visibility:');
    invalidElements.forEach(item => {
      console.log(item);
    });
  } else {
    console.log('No invalid visibility values found.');
  }
})();