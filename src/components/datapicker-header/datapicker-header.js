import React from 'react';
import './datapicker-header.css';

export default class DatapickerHeader extends React.Component {
  constructor() {
    super();

    this.getPreviousMonthDaysNumber = (dayWeek) => {
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

    this.nextMonth = () => {
      const month = document.querySelector('.calendar__month-picker');
      month.selectedIndex = +month.value === 11 ? 0 : +month.value + 1;
      this.props.changeMonth(null, +month.value);
    };

    this.prevMonth = () => {
      const month = document.querySelector('.calendar__month-picker');
      month.selectedIndex = +month.value === 0 ? 11 : +month.value - 1;
      this.props.changeMonth(null, +month.value);
    };

    this.getPreviousMonthDays = (year, month, dayWeek) => {
      const arr = [];
      const daysOutputNumber = this.getPreviousMonthDaysNumber();
      const prevMonth = month === 1 ? 12 : month - 1;
      let daysNumber = new Date(year, prevMonth, 0).getDate();

      for (let i = 0; i < daysOutputNumber; i++) {
        arr.push(daysNumber);
        daysNumber--;
      }

      return arr;
    };
  }

  render() {
    const {
      minYear,
      maxYear,
      selectedDate,
      state,
      changeYear,
      updateCalendar,
      changeMonth,
    } = this.props;
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const yearsSelect = [];
    const months = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ];

    for (let i = minYear; i < maxYear + 1; i++) {
      yearsSelect.push(i);
    }

    return (
      <header className='calendar__header'>
        <select
          className='calendar__year-picker'
          defaultValue={year}
          onChange={(e) => changeYear(e)}
          // onChange={() => updateCalendar()}
        >
          {yearsSelect.map((item) => {
            return (
              <option className='calendar__year-option' key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>

        <select
          className='calendar__month-picker'
          defaultValue={month}
          onChange={(e) => changeMonth(e)}
        >
          {months.map((item, index) => {
            return (
              <option
                className='calendar__month-option'
                value={index}
                key={index}
              >
                {item}
              </option>
            );
          })}
        </select>

        <div className='calendar__arrows-div'>
          <span
            className='calendar__arrow-down'
            onClick={() => this.prevMonth()}
          >
            🠋
          </span>

          <span className='calendar__arrow-up' onClick={() => this.nextMonth()}>
            🠉
          </span>
        </div>
      </header>
    );
  }
}
