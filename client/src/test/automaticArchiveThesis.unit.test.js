// Import necessary dependencies and functions
const { notifyThesisExpiration } = require('../automaticArchiveThesis');

// Mock the necessary dependencies
jest.mock('../automaticArchiveThesis', () => ({
    getActiveThesis: jest.fn(() => Promise.resolve([
        {
            archiveDate: '2022-01-01',
            expirationDate: '2022-01-08',
            teacherId: '123',
            title: 'Sample Thesis 1',
            id: '456'
        },
        {
            archiveDate: '2022-01-01',
            expirationDate: '2022-01-15',
            teacherId: '789',
            title: 'Sample Thesis 2',
            id: '012'
        }
    ])),
    getUserById: jest.fn((teacherId) => Promise.resolve({
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com'
    })),
    sendEmail: jest.fn()
}));

describe('notifyThesisExpiration', () => {
    it('should send email notifications to teachers for expiring theses', async () => {
        // Set the virtual date to be 1 week before the expiration date
        const today = '2022-01-01';

        // Call the function
        await notifyThesisExpiration(today);

        // Check if the necessary functions are called with the correct arguments
        expect(getActiveThesis).toHaveBeenCalled();
        expect(getUserById).toHaveBeenCalledWith('123');
        expect(getUserById).toHaveBeenCalledWith('789');
        expect(sendEmail).toHaveBeenCalledWith(
            'john.doe@example.com',
            'Thesis proposal expiration',
            'Dear Professor John Doe,\n\nWe are writing you to inform you that the thesis proposal with title Sample Thesis 1 is about to expire.\n\nBest regards,\nStudent Secretariat.',
            {
                name: '',
                surname: '',
                email: 'Student Secretariat',
                id: ''
            },
            'Sample Thesis 1',
            '456',
            null,
            null
        );
        expect(sendEmail).toHaveBeenCalledWith(
            'john.doe@example.com',
            'Thesis proposal expiration',
            'Dear Professor John Doe,\n\nWe are writing you to inform you that the thesis proposal with title Sample Thesis 2 is about to expire.\n\nBest regards,\nStudent Secretariat.',
            {
                name: '',
                surname: '',
                email: 'Student Secretariat',
                id: ''
            },
            'Sample Thesis 2',
            '012',
            null,
            null
        );
    });

    it('should return an error if the user is not logged in', async () => {
        // Mock the currentUser to be null
        auth.currentUser = null;

        // Call the function
        const result = await notifyThesisExpiration('2022-01-01');

        // Check if the result is as expected
        expect(result).toEqual({ status: 401, error: 'User not logged in' });
    });
});
 