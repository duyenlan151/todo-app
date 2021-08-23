export interface FilterButton{
  type: Filter;
  label: string;
  isAtive: boolean;
}

export enum Filter{
  All,
  Active,
  Completed
}
