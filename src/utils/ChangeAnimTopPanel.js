

//вспомогательная функция для отображения или не отображения меню разделов в категории "Портфолио" (localStarage позволяет хранить данные наподобии coocies)
export const noChangeAnimTopPanel = () => {
   window.localStorage.setItem('animTopPanel', 'no');
}

export const yesChangeAnimTopPanel = () => {
   window.localStorage.setItem('animTopPanel', 'yes');
}