const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];
const typeToAdd = process.argv[3];

if (!filePath || !typeToAdd) {
  console.error('Usage: node add_tsconfig_type.cjs <tsconfig_path> <type_to_add>');
  process.exit(1);
}

try {
  const tsconfigPath = path.resolve(filePath);
  const tsconfigContent = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));

  let targetOptions = tsconfigContent.compilerOptions;
  if (!targetOptions) {
    if (tsconfigContent.references) {
      // This might be a root tsconfig that references other tsconfigs
      // We'll assume the type needs to be added to tsconfig.app.json
      console.error('This appears to be a root tsconfig. Please specify tsconfig.app.json directly.');
      process.exit(1);
    } else {
      targetOptions = {};
      tsconfigContent.compilerOptions = targetOptions;
    }
  }

  if (!targetOptions.types) {
    targetOptions.types = [];
  }

  if (!targetOptions.types.includes(typeToAdd)) {
    targetOptions.types.push(typeToAdd);
  }

  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfigContent, null, 2), 'utf8');
  console.log(`Successfully added type "${typeToAdd}" to ${tsconfigPath}`);
} catch (error) {
  console.error(`Error updating tsconfig.json: ${error.message}`);
  process.exit(1);
}
