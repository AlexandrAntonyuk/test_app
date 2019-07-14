import { notification } from 'antd'

export const openNotificationWithIcon = (type, title, description) => {
  notification[type]({
    message: title,
    description: description,
  })
}



export const rolesSide = {
  0: [
    //admin
    {
      title: 'Тести',
      path: '/dashboard',
      iconType: 'area-chart',
    },
    {
      title: 'Створення тесту',
      path: '/create',
      iconType: 'safety-certificate',
    },
    {
      title: 'Запущені тести',
      path: '/',
      iconType: 'user-add',
    },
    {
      title: 'Користувачі',
      path: '/',
      iconType: 'user-add',
    },
  ],
  1: [
    //user
    {
      title: 'Тести',
      path: '/tests',
      iconType: 'area-chart',
    },
    {
      title: 'Статистика',
      path: '/',
      iconType: 'safety-certificate',
    },
  ],
}

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}
export const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}
