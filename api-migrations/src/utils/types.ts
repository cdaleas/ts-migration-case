export type MyMigrationsUp = (
  url: string,
  headers: AuthorizationHeader
) => Promise<void>;

export type MyMigrations = {
  version?: string | undefined;
  name?: string | undefined;
  timestamp?: string | null | undefined;
};

export type MigrationFile = Pick<
  MyMigrations,
  'name' | 'version'
> & {
  /** format: <YYYYMMDDHHMM-used-as-version>-<name-with-dashes>.js, e.g.: "202301201123-create-permissions-on-observation.js" */
  file: string;
  completed: boolean;
};

export type AuthorizationHeader = {
  Authorization: string;
};
export interface components {
  schemas: {
    Rights: {
      /** Unique identifier for the role. */
      id?: string;
      /** Name of the role. */
      name?: string;
      /** The role's icon. */
      icon?: string;
      users?: (string | components['schemas']['Users'])[];
    };
    Users: {
      /** Unique identifier for the user. */
      id?: string;
      /** First name of the user. */
      firstname?: string;
      /** Last name of the user. */
      lastname?: string;
      /** Unique email address for the user. */
      mail?: string;
      /** Password of the user. */
      pwd?: string;
      /** The user's location. */
      location?: string | null;
      /** The user's title. */
      title?: string | null;
      language?: string;
      /** Unique identifier of the role of this user. */
      right?: string | components['schemas']['Rights'];
      /** What theme the user is using. */
      theme?: 'light' | 'dark' | 'auto';
      /** Status of the user. */
      status?: 'active' | 'invited' | 'draft' | 'suspended' | 'deleted';
    };
  }
}

export type MyUsers = components['schemas']['Users'];