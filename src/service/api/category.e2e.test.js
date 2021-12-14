"use strict";

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const category = require(`./category`);
const CategoryService = require(`../data-service/category`);
const initDB = require(`../lib/init-db`);
const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    title: `Новый запуск курса`,
    announce: `Хорошим программистом быть нетрудно — надо всего лишь постоянно учиться. Программировать не настолько сложно, как об этом говорят. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
    fullText: `Он написал больше 30 хитов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Как начать действовать? Для начала просто соберитесь. Из под его пера вышло 8 платиновых альбомов. Это один из лучших рок-музыкантов. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Ёлки — это не просто красивое дерево. Это прочная древесина. Программировать не настолько сложно, как об этом говорят. Эта статья компиляция личного опыта и перевода удивительно ценной ветки. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Разве может быть что-то более незыблемое и постоянное, чем проверка «свой-чужой» с помощью кодового слова? Достичь успеха помогут ежедневные повторения. Хорошим программистом быть нетрудно — надо всего лишь постоянно учиться. Про рок-н-ролл я правда наврал, разве что в процессе разработки его в том числе слушал, но в статье про него больше ничего не будет. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Простые ежедневные упражнения помогут достичь успеха. Первая большая ёлка была установлена только в 1938 году. В связи с желанием апгрейдить свое рабочее место, появилась потребность в мониторе. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Многие стали говорить о профессиональном выгорание, хотя этот термин не очень точен. Собрать камни бесконечности легко, если вы прирожденный герой. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
    createdDate: `2021-08-26T06:44:31.294Z`,
    categories: [`Научпоп`],
    comments: [
      {
        text: `Плюсую, но слишком много буквы!`
      }
    ]
  },
  {
    title: `Лучшие рок-музыканты 20-века`,
    announce: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Многие стали говорить о профессиональном выгорание, хотя этот термин не очень точен. Ёлки — это не просто красивое дерево. Это прочная древесина. Собрать камни бесконечности легко, если вы прирожденный герой.`,
    fullText: `Золотое сечение — соотношение двух величин, гармоническая пропорция. Нет ничего более приятного, чем опыты над людьми, особенно когда тебе за это платят... Простые ежедневные упражнения помогут достичь успеха. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Это один из лучших рок-музыкантов. Ёлки — это не просто красивое дерево. Это прочная древесина. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Достичь успеха помогут ежедневные повторения. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Про рок-н-ролл я правда наврал, разве что в процессе разработки его в том числе слушал, но в статье про него больше ничего не будет. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Собрать камни бесконечности легко, если вы прирожденный герой. Первая большая ёлка была установлена только в 1938 году. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Из под его пера вышло 8 платиновых альбомов. Как начать действовать? Для начала просто соберитесь. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? В связи с желанием апгрейдить свое рабочее место, появилась потребность в мониторе. Он написал больше 30 хитов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Программировать не настолько сложно, как об этом говорят. Многие стали говорить о профессиональном выгорание, хотя этот термин не очень точен. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Хорошим программистом быть нетрудно — надо всего лишь постоянно учиться. Разве может быть что-то более незыблемое и постоянное, чем проверка «свой-чужой» с помощью кодового слова?`,
    createdDate: `2021-08-28T15:38:45.805Z`,
    categories: [`За жизнь`],
    comments: [
      {
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Согласен с автором! Хочу такую же футболку :-) Совсем немного... Мне кажется или я уже читал это где-то? Это где ж такие красоты? Планируете записать видосик на эту тему? Плюсую, но слишком много буквы!`
      },
      {
        text: `Плюсую, но слишком много буквы! Хочу такую же футболку :-) Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Это где ж такие красоты? Планируете записать видосик на эту тему? Согласен с автором! Совсем немного... Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Мне кажется или я уже читал это где-то?`
      }
    ]
  },
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
];

const mockCategories = [`Деревья`, `За жизнь`, `Научпоп`];

const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});

const app = express();
app.use(express.json());

beforeAll(async () => {
  await initDB(mockDB, {categories: mockCategories, articles: mockData});
  category(app, new CategoryService(mockDB));
});

describe(`API returns category list`, () => {

  let response;
  beforeAll(async () => {
    response = await request(app)
      .get(`/category`);
  });
  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 3 categories`, () => expect(response.body.length).toBe(3));

  test(`Category names are "Деревья", "За жизнь", "Научпоп"`,
      () => expect(response.body.map((it) => it.name)).toEqual(
          expect.arrayContaining([`Деревья`, `За жизнь`, `Научпоп`])
      )
  );
});