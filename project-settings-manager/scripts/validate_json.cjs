const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: node validate_json.cjs <json_file_path>');
  process.exit(1);
}

try {
  const jsonPath = path.resolve(filePath);
  const jsonContent = fs.readFileSync(jsonPath, 'utf8');

  JSON.parse(jsonContent);

  console.log(`Successfully validated JSON file: ${jsonPath}`);
} catch (error) {
  console.error(`Error validating JSON file ${jsonPath}: ${error.message}`);
  process.exit(1);
}
