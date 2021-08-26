import React from 'react';
import './datapicker.css';

import DatapickerHeader from '../datapicker-header/datapicker-header';
import DatapickerMain from '../datapicker-main/datapicker-main';

export default class Datapicker extends React.Component {
  render() {
    const { data, changeYear } = this.props;
    console.log('data=', this.props.data);
    return (
      <div>
        <input type='text' id='datapicker__input' readOnly />
        <div id='calendar'>
          <DatapickerHeader
            minYear={data.minYear}
            maxYear={data.maxYear}
            selectedDate={data.selectedDate}
            state={this.state}
            changeYear={changeYear}
          />
          <DatapickerMain daysArray={data.daysArray} />
        </div>
      </div>
    );
  }
}
