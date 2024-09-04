import { glob } from 'glob';
import path from 'path';
import { Response } from 'express';
import { ApiResponse } from '../types/api.types';

export async function loadModels() {
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

export async function sendResponse<T>(res: Response, response: ApiResponse<T>, statusCode: number = 200){
  if (typeof response.status !== "string" || typeof response.message !== "string") {
    throw new Error("Response does not match the ApiResponse contract");
  }
  if (response.data && typeof(response.data) === "object" && "password" in response.data){
      delete response.data.password
  }

  if (!response.data) response.data = null
  return res.status(statusCode).json(response);
}



