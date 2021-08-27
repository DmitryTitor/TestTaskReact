import React from 'react';
import './datapicker.css';

import DatapickerHeader from '../datapicker-header/datapicker-header';
import DatapickerMain from '../datapicker-main/datapicker-main';

export default class Datapicker extends React.Component {
  render() {
    const { data, changeYear, updateCalendar, changeMonth, changeDay } =
      this.props;

    return (
      <div id='calendar'>
        <DatapickerHeader
          minYear={data.minYear}
          maxYear={data.maxYear}
          selectedDate={data.selectedDate}
          state={this.state}
          changeYear={changeYear}
          updateCalendar={updateCalendar}
          changeMonth={changeMonth}
        />
        <DatapickerMain
          daysArray={data.daysArray}
          currentDayIndex={data.currentDayIndex}
          selectedDate={data.selectedDate}
          dateEvents={data.dateEvents}
          changeDay={changeDay}
        />
      </div>
    );
  }
}
