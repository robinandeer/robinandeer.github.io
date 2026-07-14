import packageJson from '../package.json';

export const sitePackageVersion = packageJson.version;

/** Set at `next build` via `next.config.ts` (fallback for unusual runtimes). */
export const siteBuiltAtIso =
	process.env.SITE_BUILD_TIME_ISO ?? new Date().toISOString();
