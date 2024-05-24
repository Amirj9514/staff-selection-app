export interface StaffFilter {
  filter_id: string;
  filter_name: string;
  options: staffFilterOption[];
}

export interface staffFilterOption {
  option_id: string;
  option_name: string;
}

export interface FilterCriteria {
  [key: string]: staffFilterOption;
}

export interface Staff {
  name: string;
  image: string;
  id: string;
  filters: StaffFilter[];
}
