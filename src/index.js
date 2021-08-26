import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Datapicker from './components/datapicker/datapicker';

class App extends React.Component {
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

      while (i < 42) {
        if (i === 0) {
          for (let k = 0; k < prevDaysShow; k++) {
            arr.unshift(prevDays - k);
            i++;
          }

          for (let k = 0; k < days; k++) {
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
        currentDate: new Date(),
        selectedDate: new Date(),
        daysArray: [
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        ],
        // daysArray: [
        //   26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        //   15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1,
        //   2, 3, 4, 5,
        // ],
        minYear: 1970,
        maxYear: 2050,
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

  changeMonth = (e, arrowData) => {
    const newMonth = arrowData === undefined ? e.target.value : arrowData;

    this.setState(
      (state) =>
        (state.data.selectedDate = new Date(
          state.data.selectedDate.getFullYear(),
          newMonth,
          state.data.selectedDate.getDate()
        ))
    );
    this.updateCalendar();
  };

  render() {
    return (
      <div className='container'>
        <header className='header'>
          <h1>Страница для выбора даты</h1>
        </header>
        <main className='main'>
          <input onClick={() => this.updateCalendar()} />
          <Datapicker
            data={this.state.data}
            updateCalendar={this.updateCalendar}
            changeYear={this.changeYear}
            changeMonth={this.changeMonth}
          />
        </main>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
