const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];
const scriptName = process.argv[3];
const scriptCommand = process.argv[4];

if (!filePath || !scriptName || !scriptCommand) {
  console.error('Usage: node set_package_script.cjs <package_json_path> <script_name> <script_command>');
  process.exit(1);
}

try {
  const packageJsonPath = path.resolve(filePath);
  const packageJsonContent = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  if (!packageJsonContent.scripts) {
    packageJsonContent.scripts = {};
  }

  packageJsonContent.scripts[scriptName] = scriptCommand;

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJsonContent, null, 2), 'utf8');
  console.log(`Successfully updated script "${scriptName}" in ${packageJsonPath}`);
} catch (error) {
  console.error(`Error updating package.json: ${error.message}`);
  process.exit(1);
}
