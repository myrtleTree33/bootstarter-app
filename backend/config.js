import yaml from 'js-yaml';
import fs from 'fs';

const configType = process.env.CONFIG || 'dev'; // default to development environment
const configFilepath = './config.' + configType + '.yaml';
export default yaml.safeLoad(fs.readFileSync(configFilepath, 'utf8'));
