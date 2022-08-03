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
const link = 'https://okbmetallceh.envycrm.com/crm/api/v1/lead/workset/?api_key=e3933159a9027843400f789236a6997abb608dff';

const forms = document.querySelectorAll('form')
forms.forEach(el => {
  el.addEventListener('submit', async (e) => {
    e.preventDefault();

    const input = e.target.querySelector('input');
    if (input.value.length < 16) {
      alert('Введите корректный номер')
      return false
    } 

    const dataForm = {
      request: {
        method: "create",
        values: {
          "phone": input.value,
          "comment": "Заявка с сайта лид-магнита"
        }
      }
    }

    await sendToTelegram(input)
    sendForm(dataForm)
      .then((data) => {
        console.log(data);
        window.location.href = "https://lestnicamy.ru/thanks-katalog/";
      })
      .catch(er => alert('Ошибка отправки данных\n' + er))
    
  })
})

async function sendForm(data) {
  const res = await fetch(link, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return await res
}

async function sendToTelegram(tel) {
  const token = "5594300094:AAEHLSNb-mGIWJ8t5Zz-MRJw9MsMZrB7yEU";  
  const telegramUrl = "https://api.telegram.org/bot" + token;  
  const id = "-1001746821085";
  const text = "<u> НОВАЯ ЗАЯВКА</u> \n" + 
            "Телефон: " + "<b>" + tel.value + "</b> \n" + 
            "Источник заявки: " + "<b>" + "сайт Лид-магнит" + "</b> \n";  
  const url = telegramUrl + "/sendMessage?chat_id=" + id + "&parse_mode=html&text=" + text;

  const res = await fetch(encodeURI(url), {
    method: 'GET',
  })
  return await res
}