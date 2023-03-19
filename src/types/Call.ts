export interface IPartnerData {
  id: string;
  name: string;
  phone: string;
}

export interface IAnswer {
  message: string;
  from_support: number;
  support_read_status: number;
  person_read_status: number;
}

export interface IAbuse {
  date: string;
  person_name: string;
  message: string;
  support_read_status: number;
  support_answer_status: number;
  answers: IAnswer[];
}

export interface IResult {
  type: 'is_new' | 'message' | 'order' | 'preorder'
  title: string
  tooltip: string
}

export interface IStage {
  person_name: string;
  person_surname: string;
  person_mango_phone: string;
  duration: string;
  disconnect_reason: string;
}

export type GradeUnion = 'no-script' | 'unknown' | 'great' | 'good' | 'bad'
export type SourceUnion = 'yandex' | 'google' | 'opera' | 'firefox'

export enum CallTypes {
  Incoming = 0,
  Outcoming = 1
}

export type CallTypeUnion = keyof typeof CallTypes

export interface ICall {
  id: number;
  partnership_id: string;
  partner_data: IPartnerData;
  date: string;
  date_notime: string;
  time: number;
  from_number: string;
  from_extension: string;
  to_number: string;
  to_extension: string;
  is_skilla: number;
  status: 'Не дозвонился' | 'Дозвонился';
  record: string; //* id записи звонка
  line_number: string;
  in_out: CallTypes;  //* входящий / исходящий
  from_site: number;

  errors: string[];
  disconnect_reason: string;
  results: IResult[];
  stages: IStage[];
  abuse: IAbuse;
  contact_name: string;
  contact_company: string;
  person_id: number;
  person_name: string;
  person_surname: string;
  person_avatar: string;

  //* Кастомное свойство для тестовой фильтрации (с api они не приходят)
  grade: GradeUnion;

  //* Смешанное свойство для тестовой фильтрации
  source: SourceUnion;
}

export type FilterByCriteria = {
  callType: 'all' | CallTypeUnion
  source: 'all' | SourceUnion
  grade: 'all' | GradeUnion
}

export type FilterDateTitle = 'days3' | 'week' | 'month' | 'year' | 'input'

export type FilterByDate = {
  title: FilterDateTitle
  startDate: string
  endDate: string
}


