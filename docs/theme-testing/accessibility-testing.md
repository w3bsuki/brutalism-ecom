# Accessibility Testing for Theme Implementation

## Color Contrast Checks

### Automated Tools:
- [ ] Run WebAIM's WAVE extension on all key pages in both themes
- [ ] Test with axe DevTools Chrome extension
- [ ] Use Lighthouse accessibility audit

### Manual Contrast Testing:
- [ ] Text on background contrast meets WCAG AA standard (4.5:1 for normal text, 3:1 for large text)
- [ ] UI controls and graphical objects have sufficient contrast (3:1)

| Element | Light Theme | Dark Theme | Meets WCAG AA |
|---------|-------------|------------|---------------|
| Body text on background | | | |
| Header text on background | | | |
| Button text on button background | | | |
| Links against background | | | |
| Form input text and borders | | | |
| Focus indicators | | | |

## Theme-Specific Accessibility Checks

### Visual Information
- [ ] No information is conveyed through color alone (affects both themes)
- [ ] Focus indicators are visible in both themes
- [ ] Active/hover states are perceivable in both themes

### Text Readability
- [ ] Text remains readable in both themes
- [ ] No text disappears or becomes too faint when theme changes
- [ ] Font size remains consistent between themes

### Interactive Elements
- [ ] All interactive elements remain perceivable and operable in both themes
- [ ] Form fields have visible borders/backgrounds in both themes
- [ ] Theme toggle is accessible via keyboard and screen readers

## Screen Reader Testing

### With Default (Light) Theme:
- [ ] Screen reader announces all important content
- [ ] Navigation is clear and logical
- [ ] Form elements are properly labeled

### With Alternate (Dark) Theme:
- [ ] Same screen reader experience is maintained in alternate theme
- [ ] No content becomes inaccessible in alternate theme

## Theme Switch Mechanism

- [ ] Theme toggle has appropriate accessible name
- [ ] Toggle state is programmatically determinable
- [ ] Current theme status is available to assistive technology
- [ ] No rapid flashing content when switching themes (prevents seizures)

## Reduced Motion Consideration

- [ ] Respect user's reduced motion preferences when switching themes
- [ ] Theme transitions are disabled when reduced motion is enabled

## Keyboard Navigation

- [ ] Theme toggle is reachable via keyboard
- [ ] All functionality remains keyboard accessible in both themes
- [ ] Focus states are clearly visible in both themes

## Automated Testing Results

| Tool | Light Theme Score | Dark Theme Score | Issues to Address |
|------|-------------------|------------------|-------------------|
| WAVE | | | |
| axe DevTools | | | |
| Lighthouse | | | |

## Action Items

- [ ] List accessibility issues that need to be fixed
- [ ] Prioritize by severity (Critical, High, Medium, Low)
- [ ] Assign ownership and due dates 