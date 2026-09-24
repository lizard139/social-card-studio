const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const elements = new Map();
const context = vm.createContext({
  assert,
  console,
  localStorage: { getItem: () => null, setItem: () => {} },
  document: { getElementById: id => {
    if (!elements.has(id)) elements.set(id, {});
    return elements.get(id);
  } },
  setTimeout: () => 1,
  clearTimeout: () => {}
});
const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8').replace(/init\(\);\s*$/, '');
const markup = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const styles = fs.readFileSync(path.join(__dirname, '..', 'styles.css'), 'utf8');
assert.match(markup, /id="introScreen"/);
assert.match(markup, /id="introTypingText"/);
assert.match(markup, /id="startCreatingButton"/);
assert.match(markup, /Start creating/);
assert.match(markup, /assets\/github-fill\.svg/);
assert.match(markup, /assets\/xiaohongshu\.png/);
assert.match(styles, /@keyframes intro-grid-pulse/);
assert.match(styles, /@keyframes intro-expand/);
assert.match(styles, /grid-area:1\/1/);
assert.match(styles, /translateY\(-50%\) rotateX\(90deg\)/);
assert.match(styles, /translateY\(50%\) rotateX\(90deg\)/);
assert.match(styles, /border-color:transparent/);
assert.match(styles, /58% \{ width:54vmax/);
assert.match(styles, /intro-cover-fade \.5s ease \.42s/);
vm.runInContext(source, context);
vm.runInContext(`
  renderAll = () => {}; persist = () => {}; toast = () => {};

  history = []; historyIndex = -1; pushHistory();
  deck.pages[0].components.find(c => c.type === 'title').data.text = '第一版'; pushHistory();
  deck.pages[0].components.find(c => c.type === 'title').data.text = '第二版'; scheduleSnapshot();
  travelHistory(-1);
  assert.equal(deck.pages[0].components.find(c => c.type === 'title').data.text, '第一版');

  deck = normalizeDeck(sampleDeck); selectedIndex = 0;
  currentPage().components.find(c => c.type === 'title').data.text = '新标题';
  switchRecipe('S02');
  assert.equal(currentPage().components.find(c => c.type === 'title').data.text, '新标题');

  assert.equal(validDeckFile({ foo: 'bar' }), false);
  assert.equal(validDeckFile(sampleDeck), true);
  assert.equal(normalizeDeck({ ...sampleDeck, pageStart: 0, footerLeft: '' }).pageStart, 0);
  assert.equal(normalizeDeck({ ...sampleDeck, pageStart: 0, footerLeft: '' }).footerLeft, '');

  const chartPage = { items: [{ title: '零', value: '0' }, { title: '百', value: '100' }] };
  assert.deepEqual(Array.from(numericValues(chartPage, 2)), [0, 100]);
  assert.match(renderComponent({ id: 'test', type: 'bars', data: { items: chartPage.items } }, chartPage), /width:0%/);
  assert.equal(normalizeEditableText('胡u\\n哈哈哈uu', 'title', true), '胡u 哈哈哈uu');
  assert.equal(normalizeEditableText('第一行\\n第二行', 'title', false), '第一行\\n第二行');
  assert.equal(logicalDistance(100, 114, 0.5), 28, 'screen distance should be restored to poster coordinates');

  const compareItems = Array.from({ length: 6 }, (_, index) => ({ title: '比较' + index, text: '', value: '' + index }));
  assert.match(renderComponent({ id: 'compare', type: 'compare', data: { items: compareItems } }, chartPage), /compare-grid-dense/);

  for (const recipe of RECIPES) {
    const page = createPageForRecipe(recipe.id);
    assert.equal(isStrictPage(page), true, recipe.id + ' should start in strict mode');
    const markup = renderComponentPage(page, 0);
    assert.match(markup, /strict-poster/, recipe.id);
    const rule = STRICT_RECIPE_ITEMS[recipe.id];
    const count = page.components.find(component => component.type === rule.type).data.items.length;
    assert.ok(count >= rule.min && count <= rule.max, recipe.id + ' item count');
  }
  assert.match(renderComponentPage(createPageForRecipe('S01'), 0), /s01-thesis/);
  assert.equal((renderComponentPage(createPageForRecipe('S02'), 0).match(/class="compare-col/g) || []).length, 2);
  assert.equal((renderComponentPage(createPageForRecipe('S03'), 0).match(/class="property-row/g) || []).length, 4);
  assert.match(renderComponentPage(createPageForRecipe('S04'), 0), /interface-action/);
  assert.equal((renderComponentPage(createPageForRecipe('S05'), 0).match(/class="warning-row/g) || []).length, 3);
  assert.equal((renderComponentPage(createPageForRecipe('S06'), 0).match(/class="pipeline-stage/g) || []).length, 3);
  assert.equal((renderComponentPage(createPageForRecipe('S09'), 0).match(/class="tower-col/g) || []).length, 4);
  assert.equal((renderComponentPage(createPageForRecipe('S10'), 0).match(/class="bar-row/g) || []).length, 6);
  assert.equal((renderComponentPage(createPageForRecipe('S09'), 0).match(/data-chart-drag="y"/g) || []).length, 4);
  assert.equal((renderComponentPage(createPageForRecipe('S10'), 0).match(/data-chart-drag="x"/g) || []).length, 6);
  const draggableBars = createPageForRecipe('S10');
  const barsComponent = draggableBars.components.find(component => component.type === 'bars');
  const originalBarValues = Array.from(numericValues({ ...draggableBars, items: barsComponent.data.items }, barsComponent.data.items.length));
  enablePercentChartScale(barsComponent, draggableBars);
  assert.equal(barsComponent.data.chartScale, 'percent');
  assert.deepEqual(Array.from(chartValues(barsComponent, draggableBars, barsComponent.data.items.length)), originalBarValues);
  assert.ok(barsComponent.data.items.every(entry => /%$/.test(entry.value)));
  assert.equal((renderComponentPage(createPageForRecipe('S11'), 0).match(/class="ledger-icon/g) || []).length, 4);
  assert.match(renderComponentPage(createPageForRecipe('S12'), 0), /matrix-total/);
  assert.equal((renderComponentPage(createPageForRecipe('S12'), 0).match(/class="matrix-cell/g) || []).length, 8);
  const expandedCompare = createPageForRecipe('S02');
  expandedCompare.components.find(component => component.type === 'compare').data.items.push({ title: '第三列', value: '03', text: '' });
  assert.equal(isStrictPage(expandedCompare), false);
  expandedCompare.layoutMode = 'custom';
  assert.match(renderComponentPage(expandedCompare, 0), /custom-poster/);

  const restoredTemplate = createPageForRecipe('S10');
  const temporaryComponent = normalizeComponent({ type: 'text', span: 12 }, restoredTemplate);
  restoredTemplate.components.push(temporaryComponent);
  syncLayoutMode(restoredTemplate);
  assert.equal(isStrictPage(restoredTemplate), false, 'added component should enter custom mode');
  restoredTemplate.components.pop();
  syncLayoutMode(restoredTemplate);
  assert.equal(isStrictPage(restoredTemplate), true, 'removing temporary component should restore template mode');

  const persistedCustomTemplate = createPageForRecipe('S01');
  persistedCustomTemplate.layoutMode = 'custom';
  assert.equal(isStrictPage(normalizePage(persistedCustomTemplate)), true, 'loading an exact recipe structure should restore template mode');

  const oldHero = createPageForRecipe('S08');
  oldHero.components = oldHero.components.filter(component => component.type !== 'meta');
  const migratedHero = normalizePage(oldHero);
  assert.equal(isStrictPage(migratedHero), true);
  assert.equal(migratedHero.components[1].type, 'meta');

  const imagePage = { components: [
    { id: 'a', type: 'image', data: { image: 'first' } },
    { id: 'b', type: 'image', data: { image: 'second' } }
  ] };
  selectedComponentId = 'b';
  assert.equal(selectedImageComponent(imagePage).id, 'b');
`, context);
console.log('Regression checks passed');
