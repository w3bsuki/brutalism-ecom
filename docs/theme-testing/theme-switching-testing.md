# Theme Switching Testing Checklist

## Theme Toggle Functionality

- [ ] Theme toggle button is visible and accessible in the navigation bar
- [ ] Initial theme loads correctly based on user's system preference or previous selection
- [ ] Clicking the theme toggle button successfully switches between themes
- [ ] Theme selection persists after page refresh
- [ ] Animation/transition is smooth when switching themes

## Component Specific Tests

### Navigation & Headers
- [ ] Navbar background color changes correctly
- [ ] Navbar text and icons remain visible in both themes
- [ ] Page headers/titles use theme variables correctly

### Heroes & Banners
- [ ] Hero background color adapts to theme
- [ ] Hero text remains readable in both themes
- [ ] Featured banners use theme colors correctly

### Product Cards & Listings
- [ ] Product cards use theme variables correctly
- [ ] Hover states work as expected in both themes
- [ ] Price and badge colors are properly themed

### Product Detail Page
- [ ] Product details page uses theme variables for backgrounds
- [ ] Product options (size, color) are themed correctly
- [ ] Add to cart button changes appearance with theme
- [ ] Recently viewed section follows theme

### Cart & Checkout
- [ ] Cart summary uses theme variables properly
- [ ] Cart items display correctly in both themes
- [ ] Checkout form inputs are styled with theme variables
- [ ] Order summary in checkout uses theme colors
- [ ] Confirmation page uses theme colors

### User Interface Elements
- [ ] Buttons use theme variables for hover/active states
- [ ] Form inputs show the correct focus state based on theme
- [ ] Icons remain visible in both themes
- [ ] Tooltips and modals use theme variables

## Common Issues to Watch For
- [ ] No hardcoded yellow/pink colors appearing when switching themes
- [ ] No flash of wrong theme on page load or navigation
- [ ] Text remains readable in both themes (check contrast)
- [ ] Interactive elements remain distinguishable in both themes
- [ ] No elements disappear or become invisible when switching themes
- [ ] CSS variables correctly apply to all themed components

## Additional Tests
- [ ] Test on different screen sizes (responsive design with theme)
- [ ] Theme preferences saved to local storage correctly
- [ ] Theme selection integrated with system preference changes 