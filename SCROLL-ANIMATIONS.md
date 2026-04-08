# Scroll Animation System

This project includes a powerful scroll animation system that automatically triggers animations when elements come into view as users scroll down the page.

## Overview

The scroll animation system uses the Intersection Observer API for optimal performance and provides several pre-built animation styles that you can apply to any element.

## Available Animation Classes

### 1. `.scroll-animate` - Fade Up (Default)
Elements fade in and slide up from below.

**Use case**: General content sections, cards, text blocks

```html
<section class="scroll-animate">
  <h2>This will fade in from bottom</h2>
  <p>Content here...</p>
</section>
```

**Animation**: 
- Starts: `opacity: 0`, `translateY(30px)`
- Ends: `opacity: 1`, `translateY(0)`
- Duration: `0.6s`

---

### 2. `.scroll-fade-left` - Slide from Left
Elements slide in from the left side.

**Use case**: Left-aligned content, images on the left, alternating layouts

```html
<div class="scroll-fade-left">
  <img src="image.jpg" alt="Description" />
</div>
```

**Animation**:
- Starts: `opacity: 0`, `translateX(-50px)`
- Ends: `opacity: 1`, `translateX(0)`
- Duration: `0.8s`

---

### 3. `.scroll-fade-right` - Slide from Right
Elements slide in from the right side.

**Use case**: Right-aligned content, images on the right, alternating layouts

```html
<div class="scroll-fade-right">
  <div class="content">
    <h3>Title</h3>
    <p>Description</p>
  </div>
</div>
```

**Animation**:
- Starts: `opacity: 0`, `translateX(50px)`
- Ends: `opacity: 1`, `translateX(0)`
- Duration: `0.8s`

---

### 4. `.scroll-scale` - Scale Up
Elements scale up from 90% to 100%.

**Use case**: Cards, buttons, featured items, call-to-action boxes

```html
<div class="scroll-scale">
  <div class="card">
    <h3>Featured Service</h3>
    <p>Details here...</p>
  </div>
</div>
```

**Animation**:
- Starts: `opacity: 0`, `scale(0.9)`
- Ends: `opacity: 1`, `scale(1)`
- Duration: `0.6s`

---

### 5. `.scroll-stagger` - Staggered Children
Child elements animate sequentially with delays.

**Use case**: Lists, grids, feature cards, service items

```html
<div class="scroll-stagger">
  <div class="item">Item 1 (delays 0.1s)</div>
  <div class="item">Item 2 (delays 0.2s)</div>
  <div class="item">Item 3 (delays 0.3s)</div>
  <div class="item">Item 4 (delays 0.4s)</div>
  <div class="item">Item 5 (delays 0.5s)</div>
  <div class="item">Item 6 (delays 0.6s)</div>
</div>
```

**Animation**:
- Each child: `opacity: 0`, `translateY(20px)` → `opacity: 1`, `translateY(0)`
- Duration: `0.5s` per child
- Delay: Increments by `0.1s` for each child (up to 6 children)

---

## How It Works

### Intersection Observer
The system uses the Intersection Observer API to detect when elements enter the viewport:

```javascript
const observerOptions = {
    threshold: 0.1,           // Trigger when 10% of element is visible
    rootMargin: '0px 0px -100px 0px'  // Trigger 100px before element enters viewport
};
```

### Automatic Detection
The script automatically finds and observes all elements with animation classes:
- `.scroll-animate`
- `.scroll-fade-left`
- `.scroll-fade-right`
- `.scroll-scale`
- `.scroll-stagger`

When an element enters the viewport, the `animate-in` class is added, triggering the CSS transition.

---

## Usage Examples

### Example 1: Simple Section
```html
<section class="py-16 scroll-animate">
  <div class="container">
    <h2>Our Services</h2>
    <p>We provide professional electrical services...</p>
  </div>
</section>
```

### Example 2: Alternating Layout
```html
<section class="py-16">
  <div class="container">
    <!-- Left content -->
    <div class="flex items-center gap-8 mb-12">
      <div class="flex-1 scroll-fade-left">
        <img src="service-1.jpg" alt="Service 1" />
      </div>
      <div class="flex-1 scroll-fade-right">
        <h3>Residential Services</h3>
        <p>Expert electrical solutions for your home...</p>
      </div>
    </div>
    
    <!-- Right content (reversed) -->
    <div class="flex items-center gap-8">
      <div class="flex-1 scroll-fade-left">
        <h3>Commercial Services</h3>
        <p>Professional solutions for businesses...</p>
      </div>
      <div class="flex-1 scroll-fade-right">
        <img src="service-2.jpg" alt="Service 2" />
      </div>
    </div>
  </div>
</section>
```

### Example 3: Feature Grid with Stagger
```html
<section class="py-16">
  <div class="container">
    <h2 class="scroll-animate">Why Choose Us</h2>
    
    <div class="grid grid-cols-3 gap-6 scroll-stagger">
      <div class="card">
        <h3>Licensed & Insured</h3>
        <p>Fully certified professionals</p>
      </div>
      <div class="card">
        <h3>24/7 Emergency</h3>
        <p>Always available when you need us</p>
      </div>
      <div class="card">
        <h3>Satisfaction Guaranteed</h3>
        <p>100% quality workmanship</p>
      </div>
    </div>
  </div>
</section>
```

### Example 4: Call-to-Action
```html
<section class="py-16 bg-primary">
  <div class="container text-center scroll-scale">
    <h2>Ready to Get Started?</h2>
    <p>Contact us today for a free quote</p>
    <button class="btn-primary">Get Free Quote</button>
  </div>
</section>
```

### Example 5: Service Cards
```html
<section class="py-16">
  <div class="container">
    <h2 class="text-center scroll-animate">Our Services</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 scroll-stagger">
      <div class="service-card">
        <div class="icon">⚡</div>
        <h3>Panel Upgrades</h3>
        <p>Modernize your electrical panel</p>
      </div>
      <div class="service-card">
        <div class="icon">🔌</div>
        <h3>Wiring Services</h3>
        <p>Complete rewiring solutions</p>
      </div>
      <div class="service-card">
        <div class="icon">💡</div>
        <h3>Lighting Design</h3>
        <p>Custom lighting installations</p>
      </div>
    </div>
  </div>
</section>
```

---

## Best Practices

### 1. Don't Overuse
- Use animations strategically on important sections
- Too many animations can be distracting
- Consider user preferences (some users prefer reduced motion)

### 2. Combine with Other Styles
```html
<section class="py-16 bg-gray-50 scroll-animate">
  <!-- Combines padding, background, and animation -->
</section>
```

### 3. Nested Animations
You can nest different animation types:
```html
<section class="scroll-animate">
  <h2>Section Title</h2>
  <div class="grid grid-cols-3 gap-6 scroll-stagger">
    <!-- Children will stagger after section fades in -->
  </div>
</section>
```

### 4. Performance
- The system automatically observes elements on page load
- Animations are CSS-based for smooth 60fps performance
- Intersection Observer is efficient and doesn't impact scroll performance

---

## Customization

### Adjust Timing
Edit `src/styles/global.css` to customize animation timing:

```css
.scroll-animate {
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    /* Change 0.6s to your preferred duration */
}
```

### Adjust Trigger Point
Edit `src/layouts/BaseLayout.astro` to change when animations trigger:

```javascript
const observerOptions = {
    threshold: 0.1,  // Change to 0.5 for 50% visibility
    rootMargin: '0px 0px -100px 0px'  // Change -100px to adjust trigger distance
};
```

### Add New Animation Types
Add new classes to `src/styles/global.css`:

```css
.scroll-rotate {
    opacity: 0;
    transform: rotate(-10deg);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.scroll-rotate.animate-in {
    opacity: 1;
    transform: rotate(0deg);
}
```

Then update the observer in `BaseLayout.astro`:
```javascript
const animatedElements = document.querySelectorAll(
    '.scroll-animate, .scroll-fade-left, .scroll-fade-right, .scroll-scale, .scroll-stagger, .scroll-rotate'
);
```

---

## Troubleshooting

### Animations Not Working?
1. Check that the element has the correct class name
2. Ensure the element is not already visible on page load (animations only trigger on scroll)
3. Verify JavaScript is enabled
4. Check browser console for errors

### Animations Too Fast/Slow?
Adjust the `transition` duration in `global.css`

### Animations Trigger Too Early/Late?
Adjust the `rootMargin` in `BaseLayout.astro`

---

## Browser Support

The scroll animation system works in all modern browsers:
- Chrome 51+
- Firefox 55+
- Safari 12.1+
- Edge 15+

For older browsers, elements will simply appear without animation (graceful degradation).

---

## Summary

The scroll animation system provides an easy way to add professional animations to your site:

1. **Add a class** to any element (`.scroll-animate`, `.scroll-fade-left`, etc.)
2. **Scroll down** - animations trigger automatically
3. **Customize** timing and behavior in CSS/JS as needed

Use animations to guide user attention, create visual interest, and improve the overall user experience!
