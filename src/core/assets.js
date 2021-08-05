import fs from "fs";
import { resolve as pathResolve } from "path";

const resultCache = {};

export default function getStaticAsset(path, pathOnly) {
  if (process.env.NODE_ENV === 'production' && resultCache[path]) {
    return resultCache[path];
  }

  const assetsPath = pathResolve(process.cwd(), path);

  if (!fs.existsSync(assetsPath)) {
    throw new Error(
      `We could not find the "${assetsPath}" file, which contains a list of the assets of the client bundle.  Please ensure that the client bundle has been built.`,
    );
  }

  if (pathOnly) {
    return assetsPath;
  }

  const readAssetsFile = () => JSON.parse(fs.readFileSync(assetsPath, 'utf8'));
  const assetsJson = readAssetsFile();

  if (typeof assetsJson === 'undefined') {
    throw new Error('No asset data found for client bundle.');
  }
  
  resultCache[path] = assetsJson;

  return resultCache[path];
}