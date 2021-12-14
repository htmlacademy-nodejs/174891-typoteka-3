"use strict";

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../lib/init-db`);
const article = require(`./article`);
const ArticleService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);
const {HttpCode} = require(`../../constants`);

const mockCategories = [
  `Деревья`,
  `За жизнь`,
  `Музыка`,
  `Программирование`,
  `Экономия`
];

const mockData = [
  {
    title: `Лучшие рок-музыканты 20-века`,
    announce: `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Про рок-н-ролл я правда наврал, разве что в процессе разработки его в том числе слушал, но в статье про него больше ничего не будет. Из под его пера вышло 8 платиновых альбомов. Многие стали говорить о профессиональном выгорание, хотя этот термин не очень точен.`,
    fullText: `Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Программировать не настолько сложно, как об этом говорят. Нет ничего более приятного, чем опыты над людьми, особенно когда тебе за это платят... Золотое сечение — соотношение двух величин, гармоническая пропорция. В связи с желанием апгрейдить свое рабочее место, появилась потребность в мониторе. Многие стали говорить о профессиональном выгорание, хотя этот термин не очень точен. Это один из лучших рок-музыкантов. Из под его пера вышло 8 платиновых альбомов. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Ёлки — это не просто красивое дерево. Это прочная древесина. Эта статья компиляция личного опыта и перевода удивительно ценной ветки. Собрать камни бесконечности легко, если вы прирожденный герой. Про рок-н-ролл я правда наврал, разве что в процессе разработки его в том числе слушал, но в статье про него больше ничего не будет. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Как начать действовать? Для начала просто соберитесь. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Он написал больше 30 хитов. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Достичь успеха помогут ежедневные повторения. Разве может быть что-то более незыблемое и постоянное, чем проверка «свой-чужой» с помощью кодового слова? Простые ежедневные упражнения помогут достичь успеха. Первая большая ёлка была установлена только в 1938 году. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
    createdDate: `2021-09-25T15:09:06.475Z`,
    categories: [`Деревья`],
    comments: [
      {
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Хочу такую же футболку :-)`,
      },
      {
        text: `Хочу такую же футболку :-) Плюсую, но слишком много буквы! Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`,
      },
    ],
  },
  {
    title: `Лучшие рок-музыканты 20-века`,
    announce: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Многие стали говорить о профессиональном выгорание, хотя этот термин не очень точен. Ёлки — это не просто красивое дерево. Это прочная древесина. Собрать камни бесконечности легко, если вы прирожденный герой.`,
    fullText: `Золотое сечение — соотношение двух величин, гармоническая пропорция. Нет ничего более приятного, чем опыты над людьми, особенно когда тебе за это платят... Простые ежедневные упражнения помогут достичь успеха. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Это один из лучших рок-музыкантов. Ёлки — это не просто красивое дерево. Это прочная древесина. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Достичь успеха помогут ежедневные повторения. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Про рок-н-ролл я правда наврал, разве что в процессе разработки его в том числе слушал, но в статье про него больше ничего не будет. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Собрать камни бесконечности легко, если вы прирожденный герой. Первая большая ёлка была установлена только в 1938 году. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Из под его пера вышло 8 платиновых альбомов. Как начать действовать? Для начала просто соберитесь. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? В связи с желанием апгрейдить свое рабочее место, появилась потребность в мониторе. Он написал больше 30 хитов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Программировать не настолько сложно, как об этом говорят. Многие стали говорить о профессиональном выгорание, хотя этот термин не очень точен. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Хорошим программистом быть нетрудно — надо всего лишь постоянно учиться. Разве может быть что-то более незыблемое и постоянное, чем проверка «свой-чужой» с помощью кодового слова?`,
    createdDate: `2021-08-28T15:38:45.805Z`,
    categories: [`За жизнь`],
    comments: [
      {
        text: `Совсем немного...`,
      },
      {
        text: `Плюсую, но слишком много буквы! Согласен с автором!`,
      },
    ],
  },
  {
    title: `Борьба с прокрастинацией`,
    announce: `Программировать не настолько сложно, как об этом говорят. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Про рок-н-ролл я правда наврал, разве что в процессе разработки его в том числе слушал, но в статье про него больше ничего не будет.`,
    fullText: `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Хорошим программистом быть нетрудно — надо всего лишь постоянно учиться. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Достичь успеха помогут ежедневные повторения. Простые ежедневные упражнения помогут достичь успеха. Собрать камни бесконечности легко, если вы прирожденный герой. Разве может быть что-то более незыблемое и постоянное, чем проверка «свой-чужой» с помощью кодового слова? Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Первая большая ёлка была установлена только в 1938 году. Про рок-н-ролл я правда наврал, разве что в процессе разработки его в том числе слушал, но в статье про него больше ничего не будет. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Нет ничего более приятного, чем опыты над людьми, особенно когда тебе за это платят... В связи с желанием апгрейдить свое рабочее место, появилась потребность в мониторе. Из под его пера вышло 8 платиновых альбомов. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Эта статья компиляция личного опыта и перевода удивительно ценной ветки. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Ёлки — это не просто красивое дерево. Это прочная древесина. Многие стали говорить о профессиональном выгорание, хотя этот термин не очень точен. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Программировать не настолько сложно, как об этом говорят. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Это один из лучших рок-музыкантов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
    createdDate: `2021-07-09T03:12:25.396Z`,
    categories: [`За жизнь`],
    comments: [
      {
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Согласен с автором! Хочу такую же футболку :-) Совсем немного... Мне кажется или я уже читал это где-то? Это где ж такие красоты? Планируете записать видосик на эту тему? Плюсую, но слишком много буквы!`
      },
      {
        text: `Плюсую, но слишком много буквы! Хочу такую же футболку :-) Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Это где ж такие красоты? Планируете записать видосик на эту тему? Согласен с автором! Совсем немного... Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Мне кажется или я уже читал это где-то?`
      }
    ]
  }
];

const createAPI = async () => {
  const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
  await initDB(mockDB, {categories: mockCategories, articles: mockData});
  const app = express();
  app.use(express.json());
  article(app, new ArticleService(mockDB), new CommentService(mockDB));
  return app;
};

describe(`Все статьи в массиве`, () => {
  let response;
  let app;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).get(`/articles`);
  });

  test(`Status code 200`, () =>
    expect(response.statusCode).toBe(HttpCode.OK));
  test(`Возврашает 3 статьи`, () => expect(response.body.length).toBe(3));
  test(`Заголовок первой статьи - "Лучшие рок-музыканты 20-века"`, () =>
    expect(response.body[0].title).toBe(`Лучшие рок-музыканты 20-века`));
});

describe(`Статья с заданным id`, () => {
  let response;
  let app;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).get(`/articles/1`);
  });

  test(`Status code 200`, () =>
    expect(response.statusCode).toBe(HttpCode.OK));
  test(`Заголовок статьи "Лучшие рок-музыканты 20-века"`, () =>
    expect(response.body.title).toBe(`Лучшие рок-музыканты 20-века`));
});

describe(`Сохранить новую статью, если данные валидны`, () => {
  const newArticle = {
    "categories": [1, 2, 3],
    "announce": `Анонс`,
    "fullText": `Оченьдлинныйтекст`,
    "title": `Оченьдлинныйзаголовок`
  };

  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Количество статей стало 4`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(4))
  );
});

describe(`Статья не создается, если данные невалидны`, () => {
  const newArticle = {
    "category": [`Категория`],
    "announce": `Анонс`,
    "fullText": `Оченьдлинныйтекст`,
    "title": `Оченьдлинныйзаголовок`
  };

  let app;

  beforeAll(async () => {
    app = await createAPI();
  });

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`Редактирование статьи`, () => {
  const newArticle = {
    "categories": [3, 4],
    "announce": `Анонс`,
    "fullText": `Оченьдлинныйтекст`,
    "title": `Оченьдлинныйзаголовок`
  };

  let response;
  let app;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .put(`/articles/3`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Проверяем изменения на заголовке статьи`, () => request(app)
    .get(`/articles/3`)
    .expect((res) => expect(res.body.title).toBe(`Оченьдлинныйзаголовок`))
  );
});

describe(`Вернет 404, если статьи не существует`, () => {
  const validArticle = {
    "categories": [1, 3],
    "announce": `Анонс`,
    "fullText": `Оченьдлинныйтекст`,
    "title": `Оченьдлинныйзаголовок`
  };

  let response;
  let app;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .put(`/articles/100`)
      .send(validArticle);
  });

  test(`Status code 404`, () => expect(response.statusCode).toBe(HttpCode.NOT_FOUND));
});

describe(`Удалить статью с невалидными данными`, () => {
  const invalidArticle = {
    "title": `Оченьдлинныйзаголовок`,
    "announce": `Анонс`,
    "categories": [1, 3],
  };

  let response;
  let app;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .put(`/articles/3`)
      .send(invalidArticle);
  });

  test(`Status code 400`, () => expect(response.statusCode).toBe(HttpCode.BAD_REQUEST));
});

describe(`Удаление существующей статьи`, () => {

  let response;
  let app;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .delete(`/articles/3`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Статей теперь 2`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(2))
  );
});

describe(`Удалить несуществующую статью`, () => {

  test(`Status code 404`, async () => {
    const app = await createAPI();

    return request(app)
      .delete(`/articles/200`)
      .expect(HttpCode.NOT_FOUND);
  });
});

describe(`Все комментарии к статье`, () => {
  let response;
  let app;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .get(`/articles/1/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Возвращается массив из 2 комментариев`, () => expect(response.body.length).toBe(2));
  test(`Текст первого комментария - "Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Хочу такую же футболку :-)"`,
      () => expect(response.body[0].text).toBe(`Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Хочу такую же футболку :-)`));
});

describe(`Создаем комментарий, если данные в запросе валидны`, () => {
  const newComment = {
    text: `Данные в запросе валидны`
  };

  let response;
  let app;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
      .post(`/articles/2/comments`)
      .send(newComment);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Изменилось число комментариев к статье`, () => request(app)
    .get(`/articles/2/comments`)
    .expect((res) => expect(res.body.length).toBe(3))
  );
});

describe(`Возвращаем 404 если пытаемся создать комментарий к несуществующей статье`, () => {

  test(`Status code 404`, async () => {
    const app = await createAPI();

    return request(app)
      .post(`/articles/300/comments`)
      .send({
        text: `Какой-то текст`
      })
      .expect(HttpCode.NOT_FOUND);
  });
});

describe(`Код 400 для попытки создать комментарий с невалидными данными`, () => {
  const invalidComment = {
    noValidProp: `Невалидный объект для создания комментария`
  };

  test(`Status code 400`, async () => {
    const app = await createAPI();

    return request(app)
      .post(`/articles/2/comments`)
      .send(invalidComment)
      .expect(HttpCode.BAD_REQUEST);
  });
});

describe(`Успешное удаление комментрия`, () => {
  let response;
  let app;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).delete(`/articles/1/comments/1`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Количество комментов теперь 1`, () => request(app)
    .get(`/articles/1/comments`)
    .expect((res) => expect(res.body.length).toBe(1))
  );
});

describe(`404 при попытке удалить несуществующий комментарий`, () => {
  test(`Status code 404`, async () => {
    const app = await createAPI();

    return request(app)
      .delete(`/articles/2/comments/75`)
      .expect(HttpCode.NOT_FOUND);
  });
});

describe(`404 для попытки удаления комментрия у несуществующей статьи`, () => {
  test(`Status code 404`, async () => {
    const app = await createAPI();

    return request(app)
      .delete(`/articles/250/comments/1`)
      .expect(HttpCode.NOT_FOUND);
  });
});