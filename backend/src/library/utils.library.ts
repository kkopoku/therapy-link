import { glob } from 'glob';
import path from 'path';

async function loadModels() {
  const models: { [key: string]: any } = {};

//   const files = glob.sync(path.join(__dirname, '**/*.model.ts'));
  const files = glob.sync(path.join(__dirname, '../models/*.model.ts'));

  for (const file of files) {
    const model = await import(file);
    const modelName = path.basename(file, path.extname(file));
    models[modelName] = model.default || model;
  }

  return models;
}

console.log(loadModels())

export {loadModels}
