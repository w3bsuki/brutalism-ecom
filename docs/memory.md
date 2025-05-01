# Project Memory Document

This document serves as our project memory, recording key decisions, learnings, troubleshooting solutions, and important information that needs to be preserved throughout the project lifecycle.

## Component Architecture Decisions

- **Atomic Design Implementation**: Our component structure follows atomic design principles with atoms, molecules, organisms, and templates. Components are organized in their respective folders based on complexity and composition.
  
- **Naming Conventions**: Components follow PascalCase (e.g., `BrutalistNavbar`). Props interfaces are named as `ComponentNameProps` and placed in the same file as the component.
  
- **Props Patterns**: We standardized on a pattern where shared props are extended from base interfaces (e.g., `ButtonBaseProps`) with more specific variants extending them.

## Styling Approach

- **Tailwind Implementation**: We use Tailwind CSS with custom configuration in `tailwind.config.js` for brutalist design aesthetic. Brutalist-specific classes are prefixed with `brutalist-`.
  
- **CSS Variables**: Custom properties are defined in the theme configuration and accessible via Tailwind. Key color schemes are stored as CSS variables in the root to enable theming.
  
- **Animation Guidelines**: For consistency, we use a limited set of animations defined in the animation utility classes. Custom animations should be added to the shared configuration.

## Common Issues & Solutions

- **Next.js Image Optimization**: Resolved issues with image optimization by ensuring proper Image component usage with width/height props set and implementing next/legacy/image for specific cases where dynamic sizing was needed.

- **Mobile Navigation**: Fixed z-index conflicts in the mobile navigation by implementing a standardized z-index system documented in the theme configuration.

- **Performance Bottlenecks**: Identified and fixed rerendering issues in the product listing by implementing proper memo and useMemo hooks for filtered product lists.

- **Z-index Management**: Implemented a z-index management system with predefined layers to avoid conflicts between overlays, modals, and navigation elements.

## Accessibility Considerations

- **Brutalist Design Challenges**: Given our brutalist aesthetic, we've had to balance visual impact with accessibility. Solutions include:
  - Ensuring sufficient color contrast while maintaining the brutalist look
  - Adding focus states that are visible but on-brand
  - Using ARIA attributes consistently across interactive components
  
- **Keyboard Navigation**: All interactive elements are keyboard navigable and follow a logical tab order, with special attention to the product filtering system.

- **Screen Reader Testing**: Regular testing with NVDA and VoiceOver confirms our components are properly announced and navigable.

## Browser Compatibility Notes

| Browser | Version | Status | Known Issues |
|---------|---------|--------|--------------|
| Chrome  | 90+     | ✅     | None         |
| Firefox | 88+     | ✅     | Minor animation timing differences |
| Safari  | 14+     | ✅     | Text rendering quirks on some headings |
| Edge    | 90+     | ✅     | None         |
| IE      | All     | ❌     | Not supported |

## Development Workflow Reminders

- **Branch Strategy**: Feature branches named `feature/feature-name` merged to develop branch. Release branches named `release/vX.X.X`.

- **Code Review Checklist**:
  - Component follows atomic design principles
  - Responsive behavior checked on mobile, tablet, and desktop
  - Accessibility checks completed
  - Browser compatibility verified
  - Unit tests updated/added

- **Testing Requirements**: All new components must have:
  - Basic render tests
  - Event handler tests where applicable
  - Accessibility tests for interactive elements

## UI Pattern Library

- **Implemented Patterns**:
  - Brutalist typography system
  - Offset borders and shadows
  - High contrast color blocks
  - Raw HTML-inspired form elements
  - "Glitchy" transition effects

- **Pending Patterns**:
  - Pixelated image treatment
  - Monospace code block styling
  - Diagonal layout sections
  - "Error message" aesthetic for notifications

## Third-Party Integrations

- **Current Integrations**:
  - Shopping cart functionality using local storage
  - Mock payment processing (to be replaced with Stripe)
  - Product data from static JSON (to be replaced with commerce API)

- **Planned Integrations**:
  - Stripe for payment processing
  - Sanity.io for CMS
  - Customer authentication system

## Important Design Decisions

- **Intentional "Roughness"**: The brutalist design intentionally embraces imperfection, including:
  - Asymmetrical layouts
  - Visibly stacked elements
  - Harsh color transitions
  - Pixelated or "broken" images in strategic places

- **User Experience Priorities**:
  - Despite the brutalist aesthetic, core e-commerce functionality remains intuitive
  - Shopping cart and checkout flow follow conventional patterns
  - Product discovery employs familiar filtering methods, even if visually unconventional

## Deployment Checklist

- **Pre-Deployment Verification**:
  - All images optimized and WebP versions generated
  - Bundle size analyzed and unnecessary imports removed
  - Environment variables configured for production
  - Placeholder content replaced with final content

- **Post-Deployment Monitoring**:
  - Lighthouse performance scores recorded
  - Core Web Vitals checked in Google Search Console
  - Cross-browser functionality verified on production

## Key Project Contacts

- **Development Team**:
  - Lead Developer: [Name] - [email]
  - UX Designer: [Name] - [email]
  - Project Manager: [Name] - [email]
  
- **Stakeholders**:
  - Product Owner: [Name] - [email]
  - Client Representative: [Name] - [email]

## References & Resources

- **Design Principles**:
  - [Brutalist Web Design](https://brutalistwebsites.com/)
  - [Principles of New Brutalism in Digital Interfaces](https://www.smashingmagazine.com/2020/03/brutalist-web-design/)

- **Technical Documentation**:
  - [Next.js Documentation](https://nextjs.org/docs)
  - [Tailwind CSS Documentation](https://tailwindcss.com/docs)
  - [React Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)

- **E-commerce Best Practices**:
  - [E-commerce UX Research Articles](https://baymard.com/blog)
  - [Web Accessibility for E-commerce](https://www.w3.org/WAI/business-case/)

## Change Log

| Date | Change | Decision/Reasoning | Lessons Learned |
|------|--------|-------------------|----------------|
| YYYY-MM-DD | Switched from CSS Modules to Tailwind | Needed more consistent design system and faster development | Tailwind's utility-first approach significantly reduced CSS complexity |
| YYYY-MM-DD | Implemented atomic design structure | Better component organization and reusability | Start with atoms first, then build up; don't try to retrofit |
| YYYY-MM-DD | Added brutalist design system | Client pivot to more distinctive visual identity | Balancing distinctive design with usability requires constant testing |

## Lessons Learned

- Start with a strong component foundation before building complex pages
- Document component API early to maintain consistency
- Test responsive behavior from the start, not as an afterthought
- Maintain a living style guide that evolves with the project
- Performance optimization is easier when considered from the beginning 