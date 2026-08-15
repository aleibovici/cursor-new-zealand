export type AccountStatus = 'has_cursor' | 'will_register';

export type CreditRegistration = {
	email: string;
	chapter: string;
	accountStatus: AccountStatus;
	createdAt: string;
};

export type RegisterResult = { status: 'success' } | { status: 'error'; message: string } | { status: 'rate_limited' };
