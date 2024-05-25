// user.model.ts

interface Property {
  property_id: string;
  field_name: string;
  id: string;
  value: string;
  status: string;
}

export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  image: string;
  udid: string;
  qr: string;
  qr_text: string;
  date_joined: string;
  first_discount: string;
  anniversary: string;
  birthday: string;
  phone_verification_code: string;
  phone_verified: string;
  status_birthday: string;
  status_anniversary: string;
  player_id: string;
  cust_stripe: string;
  email_verification_code: string;
  email_verified: string;
  orders_count: string;
  user_from: string;
  business_id: string;
  subscribed: string;
  status: string;
  profile_complete: string;
  customer_type: string;
  unsubscribe: string;
  nickname: string;
  exclusive_member: string;
  spending_limit: string;
  time_limit: string;
  business_tax_id: string | null;
  business_name: string;
  category_id: string | null;
  waiver_data: any[];
  group_name: string;
  points: string;
  properties: Property[];
}
