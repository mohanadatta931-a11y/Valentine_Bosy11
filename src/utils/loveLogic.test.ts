import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SONG_LYRICS,
  BOUQUET_OPTIONS,
  getActiveLyricIndex,
  formatTimeMMSS,
  filterBouquetsByPalette,
  createBloomingRoseAt,
  isStudioBackdropPixel,
} from './loveLogic';

test('getActiveLyricIndex matches correct lyric segment by timestamp', () => {
  assert.equal(getActiveLyricIndex(SONG_LYRICS, 0), 0);
  assert.equal(getActiveLyricIndex(SONG_LYRICS, 4.2), 0);
  assert.equal(getActiveLyricIndex(SONG_LYRICS, 8.0), 1);
  assert.equal(getActiveLyricIndex(SONG_LYRICS, 18.5), 2);
  assert.equal(getActiveLyricIndex(SONG_LYRICS, 25.0), 3);
  assert.equal(getActiveLyricIndex(SONG_LYRICS, 32.0), 4);
  assert.equal(getActiveLyricIndex(SONG_LYRICS, 41.0), 5);
});

test('formatTimeMMSS formats seconds cleanly into MM:SS', () => {
  assert.equal(formatTimeMMSS(0), '00:00');
  assert.equal(formatTimeMMSS(9.4), '00:09');
  assert.equal(formatTimeMMSS(44), '00:44');
  assert.equal(formatTimeMMSS(65), '01:05');
  assert.equal(formatTimeMMSS(-5), '00:00');
});

test('filterBouquetsByPalette filters accurately', () => {
  const all = filterBouquetsByPalette(BOUQUET_OPTIONS, 'all');
  assert.equal(all.length, 3);

  const crimsonBouquets = filterBouquetsByPalette(BOUQUET_OPTIONS, 'crimson');
  assert.equal(crimsonBouquets.length, 1);
  assert.equal(crimsonBouquets[0].title, 'Pure Heart Valentine');
});

test('createBloomingRoseAt clamps coordinates within garden bounds and assigns a vow', () => {
  const rose = createBloomingRoseAt(98, 4, 'blush', 2);
  assert.equal(rose.xPercent, 90);
  assert.equal(rose.yPercent, 15);
  assert.equal(rose.paletteTag, 'blush');
  assert.ok(rose.vowText.length > 0);
});

test('isStudioBackdropPixel identifies dark maroon backdrop while preserving bouquet wrapping', () => {
  assert.equal(isStudioBackdropPixel(68, 8, 12), true);
  assert.equal(isStudioBackdropPixel(240, 238, 235), false); // White wrapping paper
  assert.equal(isStudioBackdropPixel(58, 58, 62), false); // Matte charcoal wrapping paper
});

