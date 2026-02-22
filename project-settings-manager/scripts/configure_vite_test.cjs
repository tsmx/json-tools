const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];
const configOptions = process.argv.slice(3);

if (!filePath || configOptions.length === 0) {
  console.error('Usage: node configure_vite_test.cjs <vite_config_path> <key1=value1> <key2=value2>...');
  process.exit(1);
}

try {
  const viteConfigPath = path.resolve(filePath);
  let viteConfigContent = fs.readFileSync(viteConfigPath, 'utf8');

  let testConfig = {};
  configOptions.forEach(option => {
    const [key, value] = option.split('=');
    testConfig[key] = JSON.parse(value); // Assuming values are JSON-parseable (e.g., true, "jsdom")
  });

  const testConfigString = JSON.stringify(testConfig, null, 2).replace(/"([^\"]+)":/g, '$1:'); // Remove quotes from keys

  const newTestBlock = `  test: ${testConfigString.trim().replace(/\n/g, '\n  ')}`;

  // Regex to find the entire defineConfig block
  const defineConfigRegex = /(export default defineConfig\(\{[\s\S]*?\n\}\))/;

  viteConfigContent = viteConfigContent.replace(defineConfigRegex, (match) => {
    // Check if a 'test' block already exists within this defineConfig
    const existingTestBlockRegex = /  test: \{[\s\S]*?},?\n/;
    if (existingTestBlockRegex.test(match)) {
      // Replace existing test block
      return match.replace(existingTestBlockRegex, `${newTestBlock},\n`);
    } else {
      // Insert new test block after 'plugins'
      const pluginsRegex = /(plugins: \[react\(\)\](,?))/;
      if (pluginsRegex.test(match)) {
        return match.replace(pluginsRegex, `$1\n${newTestBlock},`);
      } else {
        // If no plugins, insert before the closing brace of defineConfig
        return match.replace(/\n\}\)/, `,\n${newTestBlock}\n\})`);
      }
    }
  });

  fs.writeFileSync(viteConfigPath, viteConfigContent, 'utf8');
  console.log(`Successfully updated test configuration in ${viteConfigPath}`);
} catch (error) {
  console.error(`Error updating vite.config.ts: ${error.message}`);
  process.exit(1);
}