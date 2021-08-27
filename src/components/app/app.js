import React from 'react';

import Datapicker from '../datapicker/datapicker';

import './app.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.getDaysArray = () => {
      const arr = [];
      const year = this.state.data.selectedDate.getFullYear();
      const month = this.state.data.selectedDate.getMonth() + 1;
      const days = new Date(year, month, 0).getDate();
      const dayWeek = new Date(year, month - 1, 1).getDay();
      const prevYear = year - 1;
      const prevMonth = month === 1 ? 12 : month - 1;
      const prevDays = new Date(prevYear, prevMonth, 0).getDate();
      const nextYear = year + 1;
      const nextMonth = month === 12 ? 1 : month + 1;
      const nextDays = new Date(nextYear, nextMonth, 0).getDate();
      const prevDaysShow = this.getPrevDays(dayWeek);

      let i = 0;
      let j = 1;
      let n;
      this.setState((state) => {
        return (state.data.currentDayIndex = 42);
      });

      while (i < 42) {
        if (i === 0) {
          for (let k = 0; k < prevDaysShow; k++) {
            arr.unshift(prevDays - k);
            i++;
          }

          for (let k = 0; k < days; k++) {
            if (
              k === this.state.data.selectedDate.getDate() &&
              this.state.data.selectedDate.getMonth() ===
                new Date().getMonth() &&
              this.state.data.selectedDate.getFullYear() ===
                new Date().getFullYear()
            ) {
              n = i - 1;
              this.setState((state) => {
                return (state.data.currentDayIndex = n);
              });
            }
            arr.push(k + 1);
            i++;
          }
        }

        arr.push(j);
        j++;
        i++;
      }

      return arr;
    };

    this.getPrevDays = (dayWeek) => {
      switch (dayWeek) {
        case 0: {
          return 6;
        }
        case 1: {
          return 0;
        }
        case 2: {
          return 1;
        }
        case 3: {
          return 2;
        }
        case 4: {
          return 3;
        }
        case 5: {
          return 4;
        }
        default: {
          return 5;
        }
      }
    };

    this.updateCalendar = () => {
      this.setState((state) => {
        return (state.data.daysArray = this.getDaysArray());
      });
    };

    this.state = {
      data: {
        isShowCalendar: false,
        currentDate: new Date(),
        selectedDate: new Date(),
        daysArray: [],
        currentDayIndex: 42,
        minYear: 1970,
        maxYear: 2050,
        dateEvents: [
          {
            date: new Date(1700, 1, 1),
            title: 'Новый год',
          },
          {
            date: new Date(1922, 2, 23),
            title: 'День защитника Отечества',
          },
          {
            date: new Date(1975, 3, 8),
            title: 'Международный женский день',
          },
          {
            date: new Date(1686, 4, 1),
            title: 'День смеха',
          },
          {
            date: new Date(1945, 5, 9),
            title: 'День Победы в Великой Отечественной войне',
          },
          {
            date: new Date(1889, 5, 1),
            title: 'День труда',
          },
          {
            date: new Date(1999, 6, 29),
            title: 'День рождения разработчика этого календаря',
          },
          {
            date: new Date(1799, 6, 6),
            title: 'День рождения Пушкина',
          },
          {
            date: new Date(1990, 6, 12),
            title: 'День России',
          },
          {
            date: new Date(1966, 7, 20),
            title: 'Международный день шахмат',
          },
          {
            date: new Date(1930, 8, 2),
            title: 'День ВДВ',
          },
          {
            date: new Date(1984, 9, 1),
            title: 'День знаний',
          },
          {
            date: new Date(1994, 10, 5),
            title: 'Всемирный день учителей',
          },
          {
            date: new Date(2005, 11, 4),
            title: 'День народного единства',
          },
          {
            date: new Date(1999, 11, 19),
            title: 'Международный мужской день',
          },
        ],
      },
    };
  }

  changeYear = (e) => {
    this.setState(
      (state) =>
        (state.data.selectedDate = new Date(
          e.target.value,
          state.data.selectedDate.getMonth(),
          state.data.selectedDate.getDate()
        ))
    );
    this.updateCalendar();
  };

  changeMonth = (e, arrowDataMonth, arrowDataYear) => {
    const yearElem = document.querySelector('.calendar__year-picker');
    const newMonth =
      arrowDataMonth === undefined ? e.target.value : arrowDataMonth;
    const newYear =
      arrowDataYear === undefined ? +yearElem.value : arrowDataYear;
    console.log('yearElem.value =', yearElem.value);
    console.log('newYear=', newYear);
    console.log('this.state.data.selectedDate =', this.state.data.selectedDate);

    this.setState(
      (state) =>
        (state.data.selectedDate = new Date(
          newYear,
          newMonth,
          state.data.selectedDate.getDate()
        ))
    );
    this.updateCalendar();
  };

  changeDay = (e, index) => {
    const day = e.target.textContent;
    let diffYear = 0;
    let diffMonth = 0;

    if (index < 6 && day > 20) {
      diffMonth = -1;
    }

    if (index > 27 && day < 20) {
      diffMonth = 1;
    }

    this.setState((state) => {
      return (state.data.selectedDate = new Date(
        state.data.selectedDate.getFullYear(),
        state.data.selectedDate.getMonth() + diffMonth,
        day
      ));
    });
    this.changeMonth(null, this.state.data.selectedDate.getMonth() + diffMonth);
    const month = document.querySelector('.calendar__month-picker');

    if (+month.value === 0) {
      if (diffMonth !== -1) {
        month.selectedIndex =
          this.state.data.selectedDate.getMonth() + diffMonth;
      } else {
        month.selectedIndex = 11;
      }
    }

    if (+month.value === 11) {
      if (diffMonth !== 1) {
        month.selectedIndex =
          this.state.data.selectedDate.getMonth() + diffMonth;
      } else {
        month.selectedIndex = 1;
      }
    }

    month.selectedIndex = this.state.data.selectedDate.getMonth() + diffMonth;

    this.updateCalendar();
  };

  showCalendar = () => {
    this.setState((state) => {
      return (state.data.isShowCalendar = !state.data.isShowCalendar);
    });
  };

  formatSelectedDate = () => {
    const day = this.state.data.selectedDate.getDate();
    const month =
      this.state.data.selectedDate.getMonth() + 1 > 9
        ? this.state.data.selectedDate.getMonth() + 1
        : `${'0' + +(this.state.data.selectedDate.getMonth() + 1)}`;
    const year = this.state.data.selectedDate.getFullYear();
    return `${day}.${month}.${year}`;
  };

  componentDidMount() {
    this.updateCalendar();
  }

  render() {
    return (
      <div className='container'>
        <header className='header'>
          <h1>Страница для выбора даты</h1>
        </header>
        <main className='main'>
          <input
            type='text'
            id='datapicker__input'
            onClick={() => this.showCalendar()}
            value={this.formatSelectedDate()}
            readOnly
          />
          {this.state.data.isShowCalendar ? (
            <Datapicker
              data={this.state.data}
              updateCalendar={this.updateCalendar}
              changeYear={this.changeYear}
              changeMonth={this.changeMonth}
              changeDay={this.changeDay}
            />
          ) : null}
        </main>
      </div>
    );
  }
}
