import fs from 'node:fs';

const srcPath = 'public/assets/aistudio/WhatsApp_Audio_2026-11-11_at_12.25.10_AM_0fb249b7.mpeg';

if (fs.existsSync(srcPath)) {
  const buf = fs.readFileSync(srcPath);

  // Calculate ID3v2 header length
  const id3Size =
    ((buf[6] & 0x7f) << 21) |
    ((buf[7] & 0x7f) << 14) |
    ((buf[8] & 0x7f) << 7) |
    (buf[9] & 0x7f);
  const id3End = 10 + id3Size; // 133

  // Skip the 208-byte Lavf Info/encoder-delay frame (bytes 133..341) so decoders never trim initial samples,
  // and keep 100% of the actual audio frames starting from byte 341.
  const audioFrames = buf.subarray(id3End + 208);

  // Create 22 pure silent MPEG-1 Layer 3 frames (~0.57s of clean silence pre-buffer) so mobile speakers wake up before word 1
  const silentFrame = Buffer.alloc(208, 0);
  silentFrame[0] = 0xff;
  silentFrame[1] = 0xfb;
  silentFrame[2] = 0x50;
  silentFrame[3] = 0x00;

  const silentPad = Buffer.concat(Array.from({ length: 22 }, () => silentFrame));
  const outBuf = Buffer.concat([buf.subarray(0, id3End), silentPad, audioFrames]);

  fs.mkdirSync('src/assets/audio', { recursive: true });
  fs.writeFileSync('src/assets/audio/valentine_song.mp3', outBuf);
  fs.writeFileSync('public/assets/aistudio/valentine_song.mp3', outBuf);
  console.log('Prepared 0.57s pre-buffered valentine_song.mp3:', outBuf.length, 'bytes');
}
