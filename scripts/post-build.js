const fse = require('fs-extra');
const path = require('path');
const replace = require('replace-in-file');

const outDir = 'out';
const nextDir = path.join(outDir, '_next');
const newNextDir = path.join(outDir, 'next');

async function postBuild() {
  try {
    // 1. Rename _next to next
    if (await fse.pathExists(nextDir)) {
      console.log('Renaming _next directory to next...');
      await fse.move(nextDir, newNextDir);
    } else {
       console.log('_next directory not found, skipping rename.');
       return;
    }

    // 2. Replace all occurrences of /_next/ with /next/ in all files
    console.log('Replacing references from /_next/ to /next/...');
    const options = {
      files: `${outDir}/**/*.{html,css,js}`,
      from: /\/_next\//g,
      to: '/next/',
    };
    const results = await replace(options);
    console.log('Replacement results:', results.filter(r => r.hasChanged).map(r => r.file));

    console.log('Post-build script finished successfully!');
  } catch (error) {
    console.error('Error during post-build script:', error);
    process.exit(1);
  }
}

postBuild();
