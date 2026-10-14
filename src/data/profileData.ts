export interface BusinessProfile {
  fullName: string;
  email: string;
  industry: string;
  phone: string;
  businessName: string;
  website: string;
  accountHolder: string;
  updatedAt?: string;
}

export const INITIAL_BUSINESS_PROFILE: BusinessProfile = {
  fullName: 'Auisha Jubeen',
  email: 'payments@propellonline.com',
  industry: 'IT services / Software, platform, and app development',
  phone: '+92 3014286334',
  businessName: 'Propello',
  website: 'https://propello.online',
  accountHolder: 'Auisha Jubeen',
  updatedAt: new Date().toISOString()
};

export const BANKING_DETAILS = {
  bankName: 'Citibank',
  bankAddress: '111 Wall Street, New York, NY 10043, USA',
  routingNumber: '031100209',
  swiftCode: 'CITIUS33',
  accountNumber: '70580410002685339',
  accountType: 'CHECKING',
  beneficiaryName: 'Auisha Jubeen'
};
