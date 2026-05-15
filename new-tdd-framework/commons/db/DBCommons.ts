/**
 * Optional DB layer placeholder. Wire `pg` (or your driver) here when database checks are required;
 * keep credentials in environment variables only.
 */
export class DBCommons {
  async getData(_query: string): Promise<Record<string, unknown>[]> {
    throw new Error(
      'DBCommons is not configured in this project. Add a driver (e.g. pg) and implement getData using process.env for connection settings.',
    );
  }
}
