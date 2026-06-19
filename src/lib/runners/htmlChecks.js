// Declarative checks for HTML/CSS exercises, evaluated against the live-preview
// iframe's document. Each check: { desc, selector, text?, minCount?, style? }.
export function runHtmlChecks(doc, checks) {
  return checks.map((c) => {
    let pass = false
    try {
      const els = doc.querySelectorAll(c.selector)
      const el = els[0]
      if (c.minCount != null) {
        pass = els.length >= c.minCount
      } else if (!el) {
        pass = false
      } else if (c.style) {
        const cs = (doc.defaultView || window).getComputedStyle(el)
        pass = cs[c.style.prop] === c.style.value
      } else if (c.text != null) {
        pass = (el.textContent || '').toLowerCase().includes(String(c.text).toLowerCase())
      } else {
        pass = !!el
      }
    } catch {
      pass = false
    }
    return { desc: c.desc, pass }
  })
}
