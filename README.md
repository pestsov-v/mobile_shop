# Интернет-магазин электроники

Простой проект, который имеет всего одну задачу: раскрыть базовые функции Sequelize.

Проект развёрнут на следующем стэке:
- express.js
- sequelize
- postgreSQL

## Оглавление

- [Интернет-магазин электроники](#интернет-магазин-электроники)
  - [Оглавление](#оглавление)
  - [Sequelize](#sequelize)
    - [Определение моделей:](#определение-моделей)
    - [Синхронизация моделей](#синхронизация-моделей)
    - [Типы данных:](#типы-данных)
      - [Строки](#строки)
      - [Булевое значение](#булевое-значение)
      - [Числа](#числа)
      - [Даты](#даты)
      - [UUID](#uuid)
    - [Связи между таблицы](#связи-между-таблицы)
      - [Одним ко многим / один к одному](#одним-ко-многим--один-к-одному)
      - [Многие ко многим](#многие-ко-многим)


## Sequelize

Перед тем, как создавать схемы, нужно сперва определить базовые сущности - элементы системы. Таким образом первым этапом
является проектирование базы данных - какие таблицы должны будут быть, взаимосвязи между ними.

Установка Sequelize и PostgreSQL:
```javascript
npm install --save sequelize

npm install --save pg pg-hstore
```

### Определение моделей:

Модель определяется следующим образом:
```javascript
const User = sequelize.define('User', {})
```
Где:
- `define` - метод определяющий модель.
- `User` - название модели.
- `{}` - опции модели.

### Синхронизация моделей
Синхронизация необходима на этапе разработки, она позволяет "на лету" добавлять, изменять или удалять - колонки и таблицы в базе данных.

Синхронизация всей базы данных:
```javascript
await sequelize.sync({ force: true })
```

Синхронизация отдельной таблицы:
```javascript
User.sync({ force: true })
```

### Типы данных:

#### Строки
```javascript
DataTypes.STRING       
DataTypes.STRING(1234)  
DataTypes.STRING.BINARY  
DataTypes.TEXT
DataTypes.CITEXT           
DataTypes.TSVECTOR
```

#### Булевое значение
```javascript
DataTypes.BOOLEAN
```

#### Числа
```javascript
DataTypes.INTEGER          
DataTypes.BIGINT          
DataTypes.BIGINT(11)
DataTypes.FLOAT            
DataTypes.FLOAT(11)          
DataTypes.FLOAT(11, 10)
DataTypes.REAL                      
DataTypes.REAL(11)                  
DataTypes.REAL(11, 12)
DataTypes.DECIMAL          
DataTypes.DECIMAL(10, 2)
```

#### Даты
```javascript
DataTypes.DATE
```

#### UUID
```javascript
{
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV1
}
```

### Связи между таблицы
Существует три типа связей:
- одним ко многим
- один к одному
- многие к многим

#### Одним ко многим / один к одному 
Связь реализовывается добавлением внешнего ключа, который Sequelize добавляет автоматически. Этот ключ ссылается на другую
таблицу - другими словами является Join.

Синтаксис связи:
```javascript
Product.User = Product.belongsTo(User);
User.Addresses = User.hasMany(Address);
```
Где?
- `Product` - модель продуктов.
  - `User` - поле модели продуктов.
  - `belongsTo(User)` - является одним значением модели пользователя.
- `User` - модель пользователя.
  - `Addresses` - поле адреса у модели пользователя.
  - `User.hasMany(Address)` - пользователь может иметь несколько адресов.

#### Многие ко многим

Связь реализовывается созданием сторонней таблицы, которая хранит лишь внешние ключи двух таблиц. Эти таблицы соединяются по схеме 
многие ко многим.

Синтаксис связи:
```javascript
User.belongsToMany(Profile, { through: User_Profile });
Profile.belongsToMany(User, { through: User_Profile });
```
Где:
- `User - модель пользователя 
  - `belongsToMany` - метод установления связи между таблицей пользователя и профиля (у пользователя может быть несколько профилей, у профиля могут быть несколько пользователей)
  - `Profile` - ссылка на модель профиля.
  - `through: User_Profile` - установление названия новой, внешней, соединяющей таблицы.