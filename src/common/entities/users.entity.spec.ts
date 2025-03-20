import { UsersEntity } from './users.entity';

describe('UsersEntity', () => {
    it('should create a user instance correctly', () => {
        const user = new UsersEntity();
        user.id = 1;
        user.name = 'Aman SInghal';
        user.mobile = '9876543210';
        user.password = 'hashed_password';

        expect(user).toBeDefined();
        expect(user.name).toBe('Aman SInghal');
        expect(user.mobile).toBe('9876543210');
    });
});