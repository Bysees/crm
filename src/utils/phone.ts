//* Функция заточена конкретно под телефонный номер с апи.
//* На нормальном номере телефона она не сработает.

export const transformPhone = (phone: string) => {
  if (phone.startsWith('79') && phone.length === 9) {
    const [n1, n2, n3, n4, n5, n6, n7, n8, n9] = phone.split('')

    return `+${n1} (${n2}${n3}${n4}) ${n5}${n6}${n7}-${n8}${n9}-**`
  }

  return phone
}