import {
  ROLE_ONE_ID,
  ROLE_THREE_ID,
} from '../utils/constants';
import { AuthorizationHeader } from '../utils/types';
import axios from 'axios';

export async function up(url: string, headers: AuthorizationHeader) {
  // Post multiple permissions
  await axios.post(
    `${url}/permissions`,
    [
      {
        role: ROLE_ONE_ID,
        collection: 'collection_name',
        action: 'read',
        fields: '*',
        permissions: {},
        validation: {},
      },
      {
        role: ROLE_ONE_ID,
        collection: 'collection_name',
        action: 'create',
        fields: '*',
        permissions: {},
        validation: {},
      },
      {
        role: ROLE_ONE_ID,
        collection: 'collection_name',
        action: 'update',
        fields: '*',
        permissions: {},
        validation: {},
      },
      {
        role: ROLE_ONE_ID,
        collection: 'collection_name',
        action: 'delete',
        fields: '*',
        permissions: {},
        validation: {},
      },
      {
        role: ROLE_ONE_ID,
        collection: 'collection_name',
        action: 'share',
        fields: '*',
        permissions: {},
        validation: {},
      },
      {
        role: ROLE_THREE_ID,
        collection: 'collection_name',
        action: 'read',
        fields: '*',
        permissions: {},
        validation: {},
      },
    ],
    { headers: headers }
  );
}
