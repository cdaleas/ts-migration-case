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
    Roles: {
      /** Unique identifier for the role. */
      id?: string;
      /** Name of the role. */
      name?: string;
      /** The role's icon. */
      icon?: string;
      /** Description of the role. */
      description?: string | null;
      super_user?: boolean;
      users?: (string | components['schemas']['Users'])[];
    };
    Users: {
      /** Unique identifier for the user. */
      id?: string;
      /** First name of the user. */
      first_name?: string;
      /** Last name of the user. */
      last_name?: string;
      /** Unique email address for the user. */
      email?: string;
      /** Password of the user. */
      password?: string;
      /** The user's location. */
      location?: string | null;
      /** The user's title. */
      title?: string | null;
      /** The user's description. */
      description?: string | null;
      /** The user's tags. */
      tags?: string[] | null;
      language?: string;
      /** Unique identifier of the role of this user. */
      role?: string | components['schemas']['Roles'];
      /** What theme the user is using. */
      theme?: 'light' | 'dark' | 'auto';
      /** Status of the user. */
      status?: 'active' | 'invited' | 'draft' | 'suspended' | 'deleted';
      /** Static token for the user. */
      token?: string | null;
      last_access?: string | null;
      /** Last page that the user was on. */
      last_page?: string | null;
      provider?: string;
      email_notifications?: boolean | null;
      trigram?: string | null;
      preferences_divider?: string;
      admin_divider?: string;
    };
  }
}

export type MyUsers = components['schemas']['Users'];