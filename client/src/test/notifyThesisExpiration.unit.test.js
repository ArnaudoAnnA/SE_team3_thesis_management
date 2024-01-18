import { describe, expect, test } from '@jest/globals';
import API from '../API.js';
import dayjs from 'dayjs';
import { TESTAPI } from '../API.js';

describe('testing notifyThesisExpiration', () => {
    test('should send email notifications to teachers for expiring theses', async () => {
        const activeThesis = await TESTAPI.getOneActiveThesis();
        // set today exactly one week before the expiration date
        const today = dayjs(activeThesis.expirationDate).subtract(1, 'week').format('YYYY-MM-DD');
        const response = await API.notifyThesisExpiration(today);
        expect(response.status).toBe(200);
    });
});
 