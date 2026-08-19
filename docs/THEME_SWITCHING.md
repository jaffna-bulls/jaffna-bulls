# Theme Switching

This project uses a small React state layer and CSS custom properties to support light and dark mode.

## Behavior

- The default theme is `light`.
- The selected theme is saved in browser `localStorage`.
- Reloading the page keeps the previous selection.
- The header switch shows the current theme.
- Clicking the switch changes between `light` and `dark`.
- The Navbar, Home hero, PageHero, and Footer keep their original dark branded colors in both themes.

## How the Theme Is Controlled

Theme state is owned by `src/App.jsx`:

```jsx
const [theme, setTheme] = useState(() => {
  const savedTheme = window.localStorage.getItem("jaffna-bulls-theme");
  return savedTheme === "dark" ? "dark" : "light";
});
```

The initializer reads the saved value. Any value other than `dark` falls back to `light`.

After the theme changes, an effect performs two actions:

```jsx
useEffect(() => {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem("jaffna-bulls-theme", theme);
}, [theme]);
```

This produces one of these HTML states:

```html
<html data-theme="light">
  <html data-theme="dark"></html>
</html>
```

The `data-theme` attribute is the connection between React and CSS.

## Header Toggle

`App.jsx` passes two props to `Navbar`:

```jsx
<Navbar
  theme={theme}
  onToggleTheme={() =>
    setTheme((current) => (current === "dark" ? "light" : "dark"))
  }
/>
```

`Navbar.jsx` uses the current theme to:

- Display `Light` or `Dark`.
- Add the `is-dark` CSS class in dark mode.
- Set the accessible label to the theme that will be selected next.
- Set `aria-pressed` so assistive technology can identify the active state.

The bronze switch thumb moves with CSS:

```css
.navbar__theme-toggle.is-dark .navbar__theme-thumb {
  transform: translateX(16px);
}
```

## CSS Theme Tokens

The light theme is defined in `src/index.css` under `:root`:

```css
:root {
  --color-surface: #ffffff;
  --color-cream: #f4f1ea;
  --color-text: #1c1a17;
  --color-text-muted: #6b645b;
}
```

The dark theme overrides only the tokens that should change:

```css
:root[data-theme="dark"] {
  --color-surface: #211d19;
  --color-cream: #171411;
  --color-cream-dark: #2a241f;
  --color-text: #f4f1ea;
  --color-text-muted: #c5bdb1;
}
```

Components use these variables instead of duplicating theme-specific styles. For example:

```css
body {
  color: var(--color-text);
  background: var(--color-surface);
}
```

This lets ordinary page sections change background and text colors automatically when `data-theme` changes.

## Fixed Branded Sections

The following sections must not change when the theme switches:

- `src/components/navbar.css` - `.navbar`
- `src/components/pageHero.css` - `.page-hero`
- `src/pages/home.css` - `.hero`
- `src/components/footer.css` - `.footer`

Each section defines local values for the dark design tokens, for example:

```css
.hero {
  --color-black: #0d0d0d;
  --color-white: #ffffff;
  --color-text-on-dark: #f4f1ea;
  --color-text-on-dark-muted: #b9b2a6;
}
```

CSS custom properties are inherited by descendants. Defining these values on the section root prevents the global dark theme from changing the branded section's colors.

## Adding Theme-Aware UI

For a normal page section:

1. Use `var(--color-surface)` for a panel or card background.
2. Use `var(--color-cream)` for a light neutral section background.
3. Use `var(--color-text)` for primary text.
4. Use `var(--color-text-muted)` for secondary text.
5. Avoid hardcoded light-theme colors when the element should react to the toggle.

Example:

```css
.example-section {
  background: var(--color-cream);
  color: var(--color-text);
}

.example-card {
  background: var(--color-surface);
  color: var(--color-text);
}
```

For a section that must stay visually fixed, define the required tokens locally on its root, as done for Navbar, PageHero, Home hero, and Footer.

## Changing the Storage Key

The key is currently:

```text
jaffna-bulls-theme
```

If this key changes, update both the `localStorage.getItem` and `localStorage.setItem` calls in `src/App.jsx`. Existing users would otherwise lose their saved preference.

## Testing Checklist

- Start the app with `npm run dev`.
- Select dark mode and verify ordinary page sections change.
- Verify Navbar colors do not change.
- Verify the Home hero does not change.
- Open a page using PageHero and verify it does not change.
- Verify Footer colors do not change.
- Reload the page and confirm the selected theme remains active.
- Select the toggle with a keyboard and confirm it has a visible focus outline.
- Check the mobile layout to confirm the compact switch remains visible.
