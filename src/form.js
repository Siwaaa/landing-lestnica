import IMask from 'imask';
/*
* Обработка ввода номера в поля формы
*/
const maskOptions = {
  mask: '+{7}(000)000-00-00'
};

const elements = document.querySelectorAll('input[type="tel"]');
elements.forEach(e => {
  IMask(e, maskOptions);
})

/*
* Обработка формы и отправка в Битрикс24
*/
const bitrix_api = 'https://avirent.bitrix24.ru/rest/3213/nwob5jfa6b5yeqn2/'
const bitrix_method = 'crm.lead.add.json'

const forms = document.querySelectorAll('form')
forms.forEach(el => {
  el.addEventListener('submit', async (e) => {
    e.preventDefault();

    const input = e.target.elements[0];
    const btn = e.target.elements[1];

    const dataForm = {
      fields:
      {
        "TITLE": "Новая заявка с сайта",
        "OPENED": "Y",
        "ASSIGNED_BY_ID": 3589,
        "SOURCE_DESCRIPTION": `Заполненная форма: ${btn.textContent == 'Скачать прайс-лист' ? input.placeholder + '. Отправить прайс' : btn.textContent}`,
        "PHONE": [{ "VALUE": input.value, "VALUE_TYPE": "WORK" }]
      },
      params: { "REGISTER_SONET_EVENT": "Y" }
    }

    sendForm(dataForm)
      .then((data) => {
        console.log(data);
        if(btn.textContent != 'Скачать прайс-лист') {
          window.location.href = "https://crm.avirent.ru/company/register";
        } else {
          openModal(3) // открываем модальное окно, если запросили прайс
        }
      })
      .catch(er => alert('Ошибка отправки данных\n' + er))
  })
})

async function sendForm(data) {
  const res = await fetch(bitrix_api + bitrix_method, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return await res.json()
}