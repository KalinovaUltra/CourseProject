export const UserData = {
  name: 'Иванов Иван',
  group: '4321-21',
  faculty: 'Математическое обеспечение'
};

export const Documents = [
  {
    id: 1,
    title: 'Заявление на материальную помощь',
    category: 'Материальная помощь',
    comment: '',
    status: 'Завершено',
    statusClass: 'status-completed'
  },
  {
    id: 2,
    title: 'Заявление в профком',
    category: 'Профком',
    comment: 'Подписать как можно быстрее',
    status: 'На рассмотрении',
    statusClass: 'status-pending'
  },
  {
    id: 3,
    title: 'Заявление в профком',
    category: 'Профком',
    comment: 'Заявка на вступление',
    status: 'Завершено',
    statusClass: 'status-completed'
  },
  {
    id: 4,
    title: 'Заявление в профком',
    category: 'Профком',
    comment: '',
    status: 'Отклонено',
    statusClass: 'status-rejected'
  }
];

export const Categories = [
  { value: '', text: 'Выберите тип документа' },
  { value: 'material-help', text: 'Материальная помощь' },
  { value: 'profcom', text: 'Профком' },
  { value: 'doc1', text: 'Документ' },
  { value: 'doc2', text: 'Документ' },
];