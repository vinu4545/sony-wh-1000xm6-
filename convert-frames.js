const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const frameDir = path.join(__dirname, 'ezgif-split');
const outputDir = path.join(__dirname, 'public', 'frames');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all GIF files and sort them numerically
const files = fs.readdirSync(frameDir)
  .filter(file => file.endsWith('.gif'))
  .sort((a, b) => {
    const aNum = parseInt(a.match(/frame_(\d+)/)[1]);
    const bNum = parseInt(b.match(/frame_(\d+)/)[1]);
    return aNum - bNum;
  });

console.log(`Found ${files.length} frames to convert...`);

// Check if ImageMagick is available
try {
  execSync('which convert', { stdio: 'ignore' });
  console.log('Using ImageMagick for conversion...');
  
  files.forEach((file, index) => {
    const inputPath = path.join(frameDir, file);
    const match = file.match(/frame_(\d+)/);
    const frameNum = match ? match[1] : String(index).padStart(3, '0');
    const outputPath = path.join(outputDir, `frame_${frameNum}.png`);
    
    try {
      execSync(`convert "${inputPath}" "${outputPath}"`, { stdio: 'pipe' });
      console.log(`✓ Converted frame ${frameNum}`);
    } catch (err) {
      console.error(`✗ Failed to convert frame ${frameNum}:`, err.message);
    }
  });
} catch {
  console.log('ImageMagick not found, trying ffmpeg...');
  
  try {
    execSync('which ffmpeg', { stdio: 'ignore' });
    console.log('Using ffmpeg for conversion...');
    
    files.forEach((file, index) => {
      const inputPath = path.join(frameDir, file);
      const match = file.match(/frame_(\d+)/);
      const frameNum = match ? match[1] : String(index).padStart(3, '0');
      const outputPath = path.join(outputDir, `frame_${frameNum}.png`);
      
      try {
        execSync(`ffmpeg -i "${inputPath}" "${outputPath}" -y`, { stdio: 'pipe' });
        console.log(`✓ Converted frame ${frameNum}`);
      } catch (err) {
        console.error(`✗ Failed to convert frame ${frameNum}:`, err.message);
      }
    });
  } catch {
    console.error('Neither ImageMagick nor ffmpeg found. Installing via apt...');
    try {
      execSync('sudo apt-get update && sudo apt-get install -y imagemagick', { stdio: 'inherit' });
      // Retry conversion
      require('child_process').execSync('node ' + __filename, { stdio: 'inherit' });
    } catch (err) {
      console.error('Failed to install ImageMagick. Please install manually.');
      process.exit(1);
    }
  }
}

console.log('Conversion complete!');
