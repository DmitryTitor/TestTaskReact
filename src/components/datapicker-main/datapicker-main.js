import React from 'react';
import './datapicker-main.css';

export default class DatapickerMain extends React.Component {
  render() {
    const { daysArray, selectedDate, currentDayIndex, changeDay } = this.props;
    const testArrSeparatedWeeks = [];
    let currentDayIndexSeparated = 0;

    for (let index = 0; index < daysArray.length; index++) {
      if (index % 7 === 0) {
        testArrSeparatedWeeks.push([]);
        testArrSeparatedWeeks[testArrSeparatedWeeks.length - 1].push(
          daysArray[index]
        );
      } else {
        testArrSeparatedWeeks[testArrSeparatedWeeks.length - 1].push(
          daysArray[index]
        );
      }

      if (index === currentDayIndex) {
        currentDayIndexSeparated = testArrSeparatedWeeks.length - 1;
      }
    }

    return (
      <main className='calendar__main'>
        <table className='calendar__table'>
          <thead>
            <tr>
              <td>Пн</td>
              <td>Вт</td>
              <td>Ср</td>
              <td>Чт</td>
              <td>Пт</td>
              <td>Сб</td>
              <td>Вс</td>
            </tr>
          </thead>
          <tbody>
            {testArrSeparatedWeeks.map((weekArray, index) => {
              return (
                <tr key={index}>
                  {weekArray.map((item, indexWeek) => {
                    if (
                      currentDayIndexSeparated === index &&
                      item === daysArray[currentDayIndex]
                    ) {
                      return (
                        <td
                          key={indexWeek}
                          className='currentDay'
                          onClick={(e) => changeDay(e)}
                        >
                          {item}
                        </td>
                      );
                    }
                    return (
                      <td
                        key={indexWeek}
                        onClick={(e) => changeDay(e, indexWeek + index * 7)}
                      >
                        {item}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    );
  }
}
