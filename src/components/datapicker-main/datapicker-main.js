import React from 'react';
import './datapicker-main.css';

export default class DatapickerMain extends React.Component {
  showEvents = () => {
    let tooltipElem;

    document.onmouseover = function (event) {
      let target = event.target;
      let tooltipHtml = target.dataset.tooltip;

      if (!tooltipHtml) {
        return undefined;
      }

      tooltipElem = document.createElement('div');
      tooltipElem.className = 'tooltip';
      tooltipElem.innerHTML = tooltipHtml;
      document.body.append(tooltipElem);

      let coords = target.getBoundingClientRect();
      let left =
        coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;

      if (left < 0) {
        left = 0;
      }

      let top = coords.top - tooltipElem.offsetHeight - 5;

      if (top < 0) {
        top = coords.top + target.offsetHeight + 5;
      }

      tooltipElem.style.left = left + 'px';
      tooltipElem.style.top = top + 'px';
    };

    document.onmouseout = function (e) {
      if (tooltipElem) {
        tooltipElem.remove();
        tooltipElem = null;
      }
    };
  };

  getEventTitle = (item, index) => {
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
    const getEventTitleFromArray = (array) => {
      result = array.find((element) => element.date.getDate() === item);

      if (result === undefined) {
        return '';
      }

      return `${months[result.date.getMonth()]}, ${result.date.getDate()}: ${
        result.title
      }`;
    };

    const { dateEvents, selectedDate } = this.props;
    const prevMonthEvents = dateEvents.filter((element) => {
      const prevMonth =
        selectedDate.getMonth() === 0 ? 11 : selectedDate.getMonth() - 1;
      return element.date.getMonth() === prevMonth;
    });
    const monthEvents = dateEvents.filter(
      (element) => element.date.getMonth() === selectedDate.getMonth()
    );
    const nextMonthEvents = dateEvents.filter((element) => {
      const nextMonth =
        selectedDate.getMonth() === 11 ? 0 : selectedDate.getMonth() + 1;
      return element.date.getMonth() === nextMonth;
    });
    let result;

    if (index < 6 && item > 20) {
      return getEventTitleFromArray(prevMonthEvents);
    }

    if (index > 27 && item < 20) {
      return getEventTitleFromArray(nextMonthEvents);
    }

    return getEventTitleFromArray(monthEvents);
  };

  getCurrentDayStyle = (item, index) => {
    const { selectedDate } = this.props;

    if (!(index < 6 && item > 20) && !(index > 27 && item < 20)) {
      return +item === +selectedDate.getDate();
    }

    return false;
  };

  render() {
    // При клике на день из соседнего месяца с событием окно с текстом события должно удаляться
    const eventDiv = document.querySelector('.tooltip');
    if (eventDiv) {
      eventDiv.remove();
    }
    const currentDayStyle = document.querySelector('.currentDay');
    if (currentDayStyle) {
      currentDayStyle.classList.remove('currentDay');
    }

    const { daysArray, selectedDate, currentDayIndex, changeDay } = this.props;
    const testArrSeparatedWeeks = [];
    // let currentDayIndexSeparated = 0;

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
    }

    this.showEvents();

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
                    let eventTitle = this.getEventTitle(
                      item,
                      indexWeek + index * 7
                    );
                    let classes = eventTitle === '' ? '' : 'eventDay';
                    classes += this.getCurrentDayStyle(
                      item,
                      indexWeek + index * 7
                    )
                      ? ' currentDay'
                      : '';
                    return (
                      <td
                        data-tooltip={eventTitle}
                        key={indexWeek}
                        className={classes}
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
