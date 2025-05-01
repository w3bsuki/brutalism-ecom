# Theme Implementation Testing Script

## Testing Environment Setup
- Open the application in Chrome (latest version)
- Open Developer Tools (F12)
- Select the "Console" tab to watch for any errors
- Make sure cache is disabled in Network tab

## Test Case 1: Initial Theme Load
1. Clear browser local storage and cookies
2. Navigate to the home page (/)
3. **Expected Result**: The site should load with the default theme based on the system preference
4. Check console for any theme-related errors

## Test Case 2: Theme Toggle Basic Functionality
1. Locate the theme toggle button in the navbar
2. Click the theme toggle button
3. **Expected Result**: Theme should switch (yellow to pink or vice versa)
4. Click the theme toggle button again
5. **Expected Result**: Theme should switch back to the original theme
6. Check console for any errors during theme switching

## Test Case 3: Theme Persistence
1. Set the theme to your preference
2. Refresh the page
3. **Expected Result**: The selected theme should persist after refresh
4. Navigate to another page (e.g., /shop)
5. **Expected Result**: The selected theme should persist across navigation
6. Close the browser and reopen the application
7. **Expected Result**: The selected theme should persist after browser restart

## Test Case 4: Component-Specific Theme Tests

### Home Page Components
1. Navigate to the home page (/)
2. Toggle between themes
3. **Check**: 
   - Navbar colors change
   - Hero section background/text colors change
   - Featured collections colors change
   - Call-to-action buttons change
   - Footer colors change

### Shop Page Components
1. Navigate to the shop page (/shop)
2. Toggle between themes
3. **Check**:
   - Product filters show correct theme colors
   - Product card colors and hover states change
   - Product sort dropdown changes colors

### Product Page Components
1. Navigate to a product page (e.g., /product/flat-brim-classic)
2. Toggle between themes
3. **Check**:
   - Product breadcrumb colors change
   - Product pricing section colors change
   - Size/color options use theme colors
   - Add to cart button hover state changes
   - Recently viewed section colors change

### Cart Page Components
1. Add a product to cart
2. Navigate to the cart page (/cart)
3. Toggle between themes
4. **Check**:
   - Cart items display with theme colors
   - Quantity selectors use theme colors
   - Order summary background changes
   - Checkout button hover state changes

### Checkout Flow
1. Go from cart to checkout (/checkout)
2. Toggle between themes during checkout process
3. **Check**:
   - Form inputs use theme focus states
   - Payment options follow theme
   - Order summary uses theme colors
4. Complete the checkout process
5. On confirmation page, toggle theme
6. **Check**:
   - Order confirmation uses theme colors
   - Success elements use theme colors

## Test Case 5: Edge Cases

1. **Rapid Theme Switching**:
   - Click the theme toggle button rapidly multiple times
   - **Expected Result**: No visual glitches or console errors

2. **Navigation During Theme Change**:
   - Click theme toggle and immediately click a navigation link
   - **Expected Result**: The new page should load with the correct theme

3. **Third-Party Components**:
   - Check any third-party components or widgets
   - **Expected Result**: They should either adopt the theme or maintain usability

## Test Case 6: Accessibility Check

1. **Keyboard Navigation**:
   - Use Tab key to navigate to the theme toggle
   - Press Enter/Space to activate
   - **Expected Result**: Theme should toggle

2. **Screen Reader**:
   - Enable a screen reader
   - Navigate to the theme toggle
   - **Expected Result**: Toggle should have a clear descriptive name

3. **Contrast Ratio**:
   - Use an eyedropper tool to sample text and background colors
   - Calculate contrast ratio using a tool like WebAIM's contrast checker
   - **Expected Result**: Text should meet WCAG AA standards (4.5:1 for normal text)

## Issue Reporting Template

If you encounter issues, document them in this format:

```
### Issue Description:
[Describe the issue]

### Steps to Reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Expected Result:
[What should happen]

### Actual Result:
[What actually happened]

### Screenshots:
[Attach relevant screenshots]

### Environment:
- Browser: [Browser name and version]
- OS: [Operating system]
- Screen size: [Viewport dimensions]

### Severity:
[Critical/High/Medium/Low] 