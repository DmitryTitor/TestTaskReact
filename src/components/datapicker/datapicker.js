import React from 'react';
import './datapicker.css';

import DatapickerHeader from '../datapicker-header/datapicker-header';
import DatapickerMain from '../datapicker-main/datapicker-main';

export default class Datapicker extends React.Component {
  render() {
    const { data, changeYear, updateCalendar, changeMonth } = this.props;

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
        <DatapickerMain daysArray={data.daysArray} />
      </div>
    );
  }
}
